const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = Number(process.env.PORT || 8787);
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (req.method === "POST" && url.pathname === "/api/generate-question") {
      try {
        await handleGenerateQuestion(req, res);
      } catch (error) {
        console.error(error);
        sendJson(res, 500, { error: error.message || "AI generation failed" });
      }
      return;
    }

    if (req.method === "GET") {
      await serveStatic(url.pathname, res);
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Nurse exam review server running at http://127.0.0.1:${PORT}`);
});

async function handleGenerateQuestion(req, res) {
  const body = await readJson(req);
  const provider = body.provider === "deepseek" ? "deepseek" : "gemini";
  const category = String(body.category || "必修");
  const difficulty = String(body.difficulty || "標準");
  const prompt = buildQuestionPrompt(category, difficulty);

  const result = await generateQuestion(provider, prompt);

  sendJson(res, 200, result);
}

async function generateQuestion(provider, prompt) {
  if (provider === "deepseek") {
    return { provider: "deepseek", question: await generateWithDeepSeek(prompt) };
  }

  try {
    return { provider: "gemini", question: await generateWithGemini(prompt) };
  } catch (error) {
    if (!process.env.DEEPSEEK_API_KEY) throw error;
    console.warn(`Gemini failed, falling back to DeepSeek: ${error.message}`);
    return {
      provider: "deepseek",
      fallbackFrom: "gemini",
      question: await generateWithDeepSeek(prompt)
    };
  }
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 22000);
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
  return parseModelQuestion(data.output_text || extractText(data));
}

async function generateWithDeepSeek(prompt) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not set");

  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 22000);
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

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function serveStatic(pathname, res) {
  const safePath = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const filePath = path.normalize(path.join(ROOT, safePath));

  if (!filePath.startsWith(ROOT) || filePath.includes("cloudflared.exe")) {
    sendText(res, 403, "Forbidden");
    return;
  }

  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(data);
  } catch {
    sendText(res, 404, "Not found");
  }
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function sendText(res, status, body) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(body);
}
