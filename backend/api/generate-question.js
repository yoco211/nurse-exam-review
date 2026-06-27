module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const provider = body.provider === "deepseek" ? "deepseek" : "gemini";
    const category = String(body.category || "必修");
    const difficulty = String(body.difficulty || "標準");
    const count = normalizeQuestionCount(body.count);
    const prompt = buildQuestionPrompt(category, difficulty, count);

    const result = await generateQuestion(provider, prompt, count);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "AI generation failed" });
  }
};

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

async function generateQuestion(provider, prompt, count) {
  if (provider === "deepseek") {
    const generated = await generateWithDeepSeek(prompt, count);
    return count > 1 ? { provider: "deepseek", questions: generated } : { provider: "deepseek", question: generated };
  }

  try {
    const generated = await generateWithGemini(prompt, count);
    return count > 1 ? { provider: "gemini", questions: generated } : { provider: "gemini", question: generated };
  } catch (error) {
    if (!process.env.DEEPSEEK_API_KEY) throw error;
    console.warn(`Gemini failed, falling back to DeepSeek: ${error.message}`);
    const generated = await generateWithDeepSeek(prompt, count);
    return {
      provider: "deepseek",
      fallbackFrom: "gemini",
      ...(count > 1 ? { questions: generated } : { question: generated })
    };
  }
}

function buildQuestionPrompt(category, difficulty, count = 1) {
  const isBatch = count > 1;
  return [
    "あなたは日本の看護師国家試験対策に詳しい講師です。",
    `指定条件に合わせて、著作権のある実在過去問をコピーせず、完全に新しい四択問題を${count}問作成してください。`,
    `分野: ${category}`,
    `難易度: ${difficulty}`,
    "出力はJSONのみ、Markdownや説明文は不要。",
    "JSON schema:",
    isBatch
      ? '{"questions":[{"category":"必修","difficulty":"標準","question":"問題文","options":["A","B","C","D"],"answer":"A","explanation":"解説","note":"復習ポイント"}]}'
      : '{"category":"必修","difficulty":"標準","question":"問題文","options":["A","B","C","D"],"answer":"A","explanation":"解説","note":"復習ポイント"}',
    "answerは必ず options のいずれかと一致する文字列、または A/B/C/D のどれかにしてください。",
    "問題文、選択肢、解説、復習ポイントはすべて日本語で書いてください。",
    "同じ観点の問題を重複させず、各問題の問い方と正答を分散してください。"
  ].join("\n");
}

async function generateWithGemini(prompt, count = 1) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      model,
      system_instruction: "Return only valid JSON.",
      input: prompt,
      generation_config: { temperature: 0.7, thinking_level: "low" }
    })
  }).finally(() => clearTimeout(timeout));

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Gemini API error ${response.status}`);
  const text = data.output_text || extractText(data);
  return count > 1 ? parseModelQuestions(text, count) : parseModelQuestion(text);
}

async function generateWithDeepSeek(prompt, count = 1) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not set");

  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "Return only valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      stream: false,
      temperature: 0.7
    })
  }).finally(() => clearTimeout(timeout));

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `DeepSeek API error ${response.status}`);
  const text = data.choices?.[0]?.message?.content || extractText(data);
  return count > 1 ? parseModelQuestions(text, count) : parseModelQuestion(text);
}

function normalizeQuestionCount(rawCount) {
  const count = Number(rawCount);
  if (!Number.isFinite(count)) return 1;
  return Math.max(1, Math.min(5, Math.trunc(count)));
}

function parseModelQuestions(text, expectedCount) {
  const jsonText = extractJsonText(String(text || ""));
  const parsed = JSON.parse(jsonText);
  const rawQuestions = Array.isArray(parsed.questions) ? parsed.questions : (Array.isArray(parsed) ? parsed : []);
  const questions = rawQuestions.map(parseQuestionObject).slice(0, expectedCount);

  if (questions.length < expectedCount) {
    throw new Error("Model returned too few questions");
  }

  return questions;
}

function parseModelQuestion(text) {
  const jsonText = extractJsonText(String(text || ""));
  return parseQuestionObject(JSON.parse(jsonText));
}

function parseQuestionObject(parsed) {
  const options = Array.isArray(parsed.options) ? parsed.options.map(String).slice(0, 6) : [];
  const answer = normalizeAnswer(parsed.answer, options);

  if (!parsed.question || options.length < 2 || answer === null) {
    throw new Error("Model returned invalid question JSON");
  }

  return {
    category: String(parsed.category || "AI"),
    difficulty: String(parsed.difficulty || "標準"),
    question: String(parsed.question),
    options,
    answer,
    explanation: String(parsed.explanation || "AI生成問題です。"),
    note: String(parsed.note || "復習ポイントを確認してください。")
  };
}

function normalizeAnswer(rawAnswer, options) {
  if (Number.isInteger(rawAnswer)) return options[rawAnswer] ?? null;
  if (typeof rawAnswer !== "string") return null;
  const trimmed = rawAnswer.trim();
  const letterIndex = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(trimmed.toUpperCase());
  if (letterIndex >= 0) return options[letterIndex] ?? null;
  return options.includes(trimmed) ? trimmed : null;
}

function extractJsonText(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) return text.slice(start, end + 1);
  return text.trim();
}

function extractText(value) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  if (Array.isArray(value)) return value.map(extractText).filter(Boolean).join("\n");
  return Object.values(value).map(extractText).filter(Boolean).join("\n");
}
