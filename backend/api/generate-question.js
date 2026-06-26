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
    const prompt = buildQuestionPrompt(category, difficulty);

    const question = provider === "deepseek"
      ? await generateWithDeepSeek(prompt)
      : await generateWithGemini(prompt);

    res.status(200).json({ provider, question });
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

function buildQuestionPrompt(category, difficulty) {
  return [
    "あなたは日本の看護師国家試験対策に詳しい講師です。",
    "指定条件に合わせて、著作権のある実在過去問をコピーせず、完全に新しい四択問題を1問作成してください。",
    `分野: ${category}`,
    `難易度: ${difficulty}`,
    "出力はJSONのみ。Markdownや説明文は不要。",
    "JSON schema:",
    '{"category":"必修","difficulty":"標準","question":"問題文","options":["A","B","C","D"],"answer":"A","explanation":"解説","note":"復習ポイント"}',
    "answerは必ず options のいずれか1つと一致する文字列、または A/B/C/D のどれかにしてください。",
    "問題文、選択肢、解説、復習ポイントはすべて日本語で書いてください。"
  ].join("\n");
}

async function generateWithGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      model,
      system_instruction: "Return only valid JSON.",
      input: prompt,
      generation_config: { temperature: 0.8 }
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Gemini API error ${response.status}`);
  return parseModelQuestion(data.output_text || extractText(data));
}

async function generateWithDeepSeek(prompt) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not set");

  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
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
      temperature: 0.8
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `DeepSeek API error ${response.status}`);
  return parseModelQuestion(data.choices?.[0]?.message?.content || extractText(data));
}

function parseModelQuestion(text) {
  const jsonText = extractJsonText(String(text || ""));
  const parsed = JSON.parse(jsonText);
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
