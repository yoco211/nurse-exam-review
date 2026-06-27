const defaultPastQuestions = [];

const APP_STORAGE_KEYS = {
  aiProvider: "nurseExamAiProvider",
  backendUrl: "nurseExamBackendUrl",
  studyState: "nurseExamStudyState"
};
const DEFAULT_BACKEND_URL = "https://nurse-exam-review-backend.vercel.app";
const AI_BATCH_SIZE = 5;
const PAST_QUESTION_REFERENCE_URL = "https://nurse.kakomonn.com/list";

const savedStudyState = loadStudyState();

const state = {
  mode: "past",
  category: "all",
  difficulty: "基礎",
  aiProvider: localStorage.getItem(APP_STORAGE_KEYS.aiProvider) || "deepseek",
  backendUrl: getStoredBackendUrl(),
  pastPosition: savedStudyState.pastPosition,
  aiHistory: savedStudyState.aiHistory,
  aiPosition: savedStudyState.aiPosition,
  aiRefreshing: false,
  aiSerial: savedStudyState.aiSerial,
  current: null,
  answers: new Map(savedStudyState.answers),
  mistakes: savedStudyState.mistakes
};

const els = {
  modePast: document.querySelector("#modePast"),
  modeAi: document.querySelector("#modeAi"),
  categorySelect: document.querySelector("#categorySelect"),
  aiProviderSelect: document.querySelector("#aiProviderSelect"),
  backendStatus: document.querySelector("#backendStatus"),
  difficultyButtons: document.querySelectorAll("[data-difficulty]"),
  prevQuestionBtn: document.querySelector("#prevQuestionBtn"),
  newQuestionBtn: document.querySelector("#newQuestionBtn"),
  aiRefreshBtn: document.querySelector("#aiRefreshBtn"),
  shuffleBtn: document.querySelector("#shuffleBtn"),
  resetBtn: document.querySelector("#resetBtn"),
  sourceBadge: document.querySelector("#sourceBadge"),
  categoryBadge: document.querySelector("#categoryBadge"),
  difficultyBadge: document.querySelector("#difficultyBadge"),
  totalBadge: document.querySelector("#totalBadge"),
  questionNumber: document.querySelector("#questionNumber"),
  questionText: document.querySelector("#questionText"),
  optionsList: document.querySelector("#optionsList"),
  showAnswerBtn: document.querySelector("#showAnswerBtn"),
  saveMistakeBtn: document.querySelector("#saveMistakeBtn"),
  explanationBox: document.querySelector("#explanationBox"),
  explanationText: document.querySelector("#explanationText"),
  jpNote: document.querySelector("#jpNote"),
  doneCount: document.querySelector("#doneCount"),
  accuracyRate: document.querySelector("#accuracyRate"),
  mistakeCount: document.querySelector("#mistakeCount"),
  streakCount: document.querySelector("#streakCount"),
  mistakeList: document.querySelector("#mistakeList"),
  clearMistakesBtn: document.querySelector("#clearMistakesBtn"),
  studyTipText: document.querySelector("#studyTipText")
};

function getAllPastQuestions() {
  return [];
}

function getFilteredPastQuestions() {
  return [];
}

function loadStudyState() {
  const fallback = {
    pastPosition: 0,
    aiHistory: [],
    aiPosition: -1,
    aiSerial: 0,
    answers: [],
    mistakes: []
  };

  try {
    const parsed = JSON.parse(localStorage.getItem(APP_STORAGE_KEYS.studyState) || "{}");
    const aiHistory = Array.isArray(parsed.aiHistory) ? parsed.aiHistory : [];
    const mistakes = Array.isArray(parsed.mistakes) ? parsed.mistakes.filter((item) => item && !String(item.id || "").startsWith("past-")) : [];
    const answers = Array.isArray(parsed.answers)
      ? parsed.answers.filter((item) => Array.isArray(item) && item.length === 2 && !String(item[0]).startsWith("past-"))
      : [];

    return {
      pastPosition: Number.isInteger(parsed.pastPosition) ? parsed.pastPosition : fallback.pastPosition,
      aiHistory,
      aiPosition: Number.isInteger(parsed.aiPosition) ? parsed.aiPosition : (aiHistory.length ? 0 : -1),
      aiSerial: Number.isInteger(parsed.aiSerial) ? parsed.aiSerial : fallback.aiSerial,
      answers,
      mistakes
    };
  } catch {
    return fallback;
  }
}

function saveStudyState() {
  localStorage.setItem(APP_STORAGE_KEYS.studyState, JSON.stringify({
    pastPosition: state.pastPosition,
    aiHistory: state.aiHistory,
    aiPosition: state.aiPosition,
    aiSerial: state.aiSerial,
    answers: [...state.answers.entries()],
    mistakes: state.mistakes
  }));
}

function normalizeAnswer(rawAnswer, options) {
  if (rawAnswer === undefined || rawAnswer === null || rawAnswer === "") return null;
  if (Number.isInteger(rawAnswer)) return rawAnswer;
  if (typeof rawAnswer === "number") return Math.trunc(rawAnswer);
  if (typeof rawAnswer !== "string") return null;

  const trimmed = rawAnswer.trim();
  const letterIndex = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(trimmed.toUpperCase());
  if (letterIndex >= 0) return letterIndex;

  const numeric = Number(trimmed);
  if (Number.isInteger(numeric)) return numeric >= 1 ? numeric - 1 : numeric;

  const optionIndex = options.findIndex((option) => option === trimmed);
  return optionIndex >= 0 ? optionIndex : null;
}

async function createAiQuestions() {
  setBackendStatus(`${providerLabel(state.aiProvider)}でAI問題を5問生成中...`);
  try {
    const data = await requestAiQuestion();
    const provider = data.provider || state.aiProvider;
    const fallbackText = data.fallbackFrom ? `（${providerLabel(data.fallbackFrom)}から切替）` : "";
    setBackendStatus(`${providerLabel(provider)}で生成しました${fallbackText}`);
    const rawQuestions = Array.isArray(data.questions) ? data.questions : [data.question || data];
    const questions = rawQuestions.slice(0, AI_BATCH_SIZE).map((item) => normalizeAiQuestion(item, provider));
    if (questions.length < AI_BATCH_SIZE) throw new Error("AI response has too few questions");
    return questions;
  } catch (error) {
    console.error(error);
    setBackendStatus(`生成失敗: ${error.message}`);
    state.aiSerial += 1;
    return [{
      id: `ai-error-${Date.now()}-${state.aiSerial}`,
      source: "AI出題",
      category: state.category === "all" ? "AI" : state.category,
      difficulty: state.difficulty,
      question: "AI出題サーバーに接続できませんでした。少し待って再試行するか、出題APIを切り替えてください。",
      options: ["もう一度試す", "出題APIを切り替える"],
      answer: null,
      explanation: "GitHub PagesだけではAPIキーを安全に使えないため、Gemini / DeepSeekは後端サーバーから呼び出す必要があります。",
      note: error.message
    }];
  }
}

async function requestAiQuestion() {
  const payload = {
    provider: state.aiProvider,
    category: state.category === "all" ? "必修・人体構造・疾病看護・社会保障・在宅看護" : state.category,
    difficulty: state.difficulty,
    count: AI_BATCH_SIZE
  };

  try {
    return await fetchAiQuestion(getBackendEndpoint(state.backendUrl), payload);
  } catch (error) {
    if (normalizeBackendUrl(state.backendUrl) === DEFAULT_BACKEND_URL) throw error;

    state.backendUrl = DEFAULT_BACKEND_URL;
    localStorage.removeItem(APP_STORAGE_KEYS.backendUrl);
    setBackendStatus("正式Backendで再試行中...");
    return fetchAiQuestion(getBackendEndpoint(DEFAULT_BACKEND_URL), payload);
  }
}

async function fetchAiQuestion(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

function getBackendEndpoint(backendUrl = state.backendUrl) {
  const base = normalizeBackendUrl(backendUrl).replace(/\/$/, "");
  return base ? `${base}/api/generate-question` : "/api/generate-question";
}

function getStoredBackendUrl() {
  return normalizeBackendUrl(localStorage.getItem(APP_STORAGE_KEYS.backendUrl));
}

function normalizeBackendUrl(value) {
  const url = String(value || "").trim();
  if (!url || url.includes("localhost") || url.includes("127.0.0.1")) {
    return DEFAULT_BACKEND_URL;
  }
  return url;
}

function normalizeAiQuestion(raw, provider) {
  const options = Array.isArray(raw.options) ? raw.options.map(String).slice(0, 6) : [];
  const answer = normalizeAnswer(raw.answer ?? raw.correctAnswer ?? raw.answerIndex, options);
  if (!raw.question || options.length < 2 || answer === null) {
    throw new Error("AI response format is invalid");
  }

  state.aiSerial += 1;
  return {
    id: `ai-${provider}-${Date.now()}-${state.aiSerial}`,
    source: `AI出題｜${providerLabel(provider)}`,
    category: raw.category ? String(raw.category) : (state.category === "all" ? "AI" : state.category),
    difficulty: raw.difficulty ? String(raw.difficulty) : state.difficulty,
    question: String(raw.question),
    options,
    answer,
    explanation: raw.explanation ? String(raw.explanation) : "AIが生成した解説です。",
    note: raw.note ? String(raw.note) : "後端APIから生成された問題です。"
  };
}

function providerLabel(provider) {
  return provider === "deepseek" ? "DeepSeek" : "Gemini";
}

function setBackendStatus(message) {
  els.backendStatus.textContent = message;
}

function getCurrentList() {
  return state.mode === "past" ? getFilteredPastQuestions() : state.aiHistory;
}

function getCurrentPosition() {
  return state.mode === "past" ? state.pastPosition : state.aiPosition;
}

function getCurrentQuestion() {
  const list = getCurrentList();
  if (!list.length) return null;
  return list[getCurrentPosition()];
}

function updateAiRefreshControl() {
  if (!els.aiRefreshBtn) return;
  const isAiMode = state.mode === "ai";
  els.aiRefreshBtn.disabled = !isAiMode || state.aiRefreshing;
  els.aiRefreshBtn.textContent = state.aiRefreshing ? "生成中..." : "出題";
  els.categorySelect.disabled = !isAiMode;
  els.shuffleBtn.disabled = !isAiMode || state.aiRefreshing || state.aiHistory.length < 2;
  if (isAiMode) {
    els.prevQuestionBtn.disabled = state.aiRefreshing || state.aiHistory.length < 2;
    els.newQuestionBtn.disabled = state.aiRefreshing || state.aiHistory.length < 2;
  } else {
    els.prevQuestionBtn.disabled = true;
    els.newQuestionBtn.disabled = true;
  }
}

async function refreshAiQuestions() {
  if (state.aiRefreshing) return;
  state.aiRefreshing = true;
  updateAiRefreshControl();

  try {
    state.aiHistory = await createAiQuestions();
    state.aiPosition = 0;
    setBackendStatus(`${state.aiHistory.length}問のAI問題を更新しました`);
    saveStudyState();
  } finally {
    state.aiRefreshing = false;
    updateAiRefreshControl();
  }
}

async function ensureAiQuestionBatch() {
  if (state.aiHistory.length) {
    state.aiPosition = Math.max(0, Math.min(state.aiPosition, state.aiHistory.length - 1));
    return;
  }
}

function clampPastPosition() {
  const list = getFilteredPastQuestions();
  state.pastPosition = list.length ? Math.min(state.pastPosition, list.length - 1) : 0;
}

async function goNextQuestion() {
  if (state.mode === "past") {
    const list = getFilteredPastQuestions();
    if (!list.length) return;
    state.pastPosition = (state.pastPosition + 1) % list.length;
  } else {
    await ensureAiQuestionBatch();
    if (!state.aiHistory.length) return;
    state.aiPosition = (state.aiPosition + 1) % state.aiHistory.length;
  }
  saveStudyState();
  renderQuestion(getCurrentQuestion());
}

function goPrevQuestion() {
  if (state.mode === "past") {
    const list = getFilteredPastQuestions();
    if (!list.length) return;
    state.pastPosition = (state.pastPosition - 1 + list.length) % list.length;
  } else if (state.aiHistory.length) {
    state.aiPosition = (state.aiPosition - 1 + state.aiHistory.length) % state.aiHistory.length;
  }
  saveStudyState();
  renderQuestion(getCurrentQuestion());
}

async function goRandomQuestion() {
  if (state.mode === "past") {
    const list = getFilteredPastQuestions();
    if (!list.length) return;
    state.pastPosition = Math.floor(Math.random() * list.length);
  } else {
    await ensureAiQuestionBatch();
    if (!state.aiHistory.length) return;
    state.aiPosition = Math.floor(Math.random() * state.aiHistory.length);
  }
  saveStudyState();
  renderQuestion(getCurrentQuestion());
}

function getProgressLabel() {
  const total = getCurrentList().length;
  if (!total) return "0 / 0";
  return `${getCurrentPosition() + 1} / ${total}`;
}

function renderQuestion(question) {
  if (!question) {
    const isAiMode = state.mode === "ai";
    state.current = null;
    els.sourceBadge.textContent = isAiMode ? "AI出題" : "過去問対策";
    els.categoryBadge.textContent = isAiMode ? "-" : "外部リンク";
    els.difficultyBadge.textContent = isAiMode ? "-" : "参照";
    els.totalBadge.textContent = isAiMode ? "0 / 0" : "リンク";
    els.questionNumber.textContent = isAiMode ? "AI 0 / 0" : "外部サイト";
    els.questionText.textContent = isAiMode ? "「出題」を押すとAI問題を5問生成します。" : "過去問対策は外部サイトで確認できます。";
    els.optionsList.innerHTML = isAiMode ? "" : `
      <div class="external-question-card">
        <p>過去問本文と解説はこのサイトにコピーせず、過去問.comの年度一覧ページを外部リンクとして表示します。</p>
        <a class="external-link-button" href="${PAST_QUESTION_REFERENCE_URL}" target="_blank" rel="noreferrer">過去問.comで年度一覧を開く</a>
      </div>
    `;
    els.showAnswerBtn.hidden = !isAiMode;
    els.saveMistakeBtn.hidden = !isAiMode;
    els.explanationBox.hidden = true;
    updateAiRefreshControl();
    renderStats();
    return;
  }

  state.current = question;
  const savedAnswer = state.answers.get(question.id);
  const hasAnswered = savedAnswer !== undefined;

  els.sourceBadge.textContent = question.exam ? `${question.source}｜${question.exam}${question.year ? `（${question.year}年）` : ""}` : question.source;
  els.categoryBadge.textContent = question.category;
  els.difficultyBadge.textContent = question.difficulty;
  els.totalBadge.textContent = getProgressLabel();
  els.questionNumber.textContent = state.mode === "ai" ? `AI ${getProgressLabel()}` : `Q${getProgressLabel()}`;
  els.questionText.textContent = question.question;
  els.showAnswerBtn.hidden = false;
  els.saveMistakeBtn.hidden = false;
  els.explanationBox.hidden = !hasAnswered;
  els.explanationText.textContent = question.explanation;
  els.jpNote.textContent = question.note;
  updateAiRefreshControl();

  els.optionsList.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.innerHTML = `<span class="option-key">${String.fromCharCode(65 + index)}</span><span>${option}</span>`;
    button.addEventListener("click", () => chooseAnswer(index));

    if (hasAnswered && question.answer !== null) {
      if (index === question.answer) button.classList.add("correct");
      if (index === savedAnswer && savedAnswer !== question.answer) button.classList.add("wrong");
    } else if (hasAnswered && index === savedAnswer) {
      button.classList.add("correct");
    }

    els.optionsList.appendChild(button);
  });

  renderStats();
}

function chooseAnswer(index) {
  if (!state.current || state.answers.has(state.current.id)) return;
  state.answers.set(state.current.id, index);
  if (state.current.answer !== null && index !== state.current.answer) addMistake(state.current);
  saveStudyState();
  renderQuestion(state.current);
}

function addMistake(question) {
  const exists = state.mistakes.some((item) => item.id === question.id);
  if (!exists) state.mistakes.unshift(question);
  saveStudyState();
  renderMistakes();
}

function renderStats() {
  const allQuestions = state.aiHistory;
  const knownIds = new Set(allQuestions.map((item) => item.id));
  const answers = [...state.answers.entries()].filter(([id]) => knownIds.has(id));
  const done = answers.length;
  const correct = answers.filter(([id, selected]) => {
    const question = allQuestions.find((item) => item.id === id);
    return question && question.answer !== null && selected === question.answer;
  }).length;
  const rate = done ? Math.round((correct / done) * 100) : 0;

  els.doneCount.textContent = done;
  els.accuracyRate.textContent = `${rate}%`;
  els.mistakeCount.textContent = state.mistakes.length;
  els.streakCount.textContent = getCurrentStreak();
  updateTip(done);
}

function getCurrentStreak() {
  const allQuestions = state.aiHistory;
  let streak = 0;
  for (const question of allQuestions.slice().reverse()) {
    if (!state.answers.has(question.id)) continue;
    if (question.answer === null) continue;
    if (state.answers.get(question.id) === question.answer) streak += 1;
    else break;
  }
  return streak;
}

function renderMistakes() {
  els.mistakeList.innerHTML = "";
  if (!state.mistakes.length) {
    const empty = document.createElement("li");
    empty.textContent = "まだ苦手問題はありません。";
    els.mistakeList.appendChild(empty);
    return;
  }

  state.mistakes.slice(0, 6).forEach((item) => {
    const li = document.createElement("li");
    const label = item.exam ? `${item.exam}｜` : "";
    li.textContent = `${label}${item.category}｜${item.question}`;
    els.mistakeList.appendChild(li);
  });
}

function updateTip(done) {
  if (done === 0) {
    els.studyTipText.textContent = "過去問対策は外部サイトで確認し、AI出題で弱点を補強しましょう。";
  } else if (state.mistakes.length >= 3) {
    els.studyTipText.textContent = "苦手問題が増えています。同じ分野に絞って10分だけ復習しましょう。";
  } else if (getCurrentStreak() >= 3) {
    els.studyTipText.textContent = "調子が良いです。難易度を上げて、問題文を読む速度も鍛えましょう。";
  } else {
    els.studyTipText.textContent = "解答後すぐに解説を読み、根拠となる語句を確認しましょう。";
  }
}

async function setMode(mode) {
  state.mode = mode;
  els.modePast.classList.toggle("active", mode === "past");
  els.modeAi.classList.toggle("active", mode === "ai");
  els.modePast.setAttribute("aria-selected", String(mode === "past"));
  els.modeAi.setAttribute("aria-selected", String(mode === "ai"));
  updateAiRefreshControl();
  if (mode === "past") clampPastPosition();
  updateAiRefreshControl();
  renderQuestion(getCurrentQuestion());
}

function rerenderCurrentMode() {
  state.pastPosition = 0;
  saveStudyState();
  renderQuestion(getCurrentQuestion());
}

els.modePast.addEventListener("click", () => {
  void setMode("past");
});
els.modeAi.addEventListener("click", () => {
  void setMode("ai");
});

els.categorySelect.addEventListener("change", (event) => {
  state.category = event.target.value;
  if (state.mode === "ai") {
    const categoryLabel = state.category === "all" ? "すべての分野" : state.category;
    setBackendStatus(`分野を「${categoryLabel}」に変更しました。「出題」を押すと新しい5問に反映されます。`);
  }
  rerenderCurrentMode();
});

els.aiProviderSelect.value = state.aiProvider;
localStorage.removeItem(APP_STORAGE_KEYS.backendUrl);

els.aiProviderSelect.addEventListener("change", (event) => {
  state.aiProvider = event.target.value;
  localStorage.setItem(APP_STORAGE_KEYS.aiProvider, state.aiProvider);
  setBackendStatus(`${providerLabel(state.aiProvider)}を使用します。「出題」を押すと新しい5問に反映されます。`);
});

els.difficultyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    state.difficulty = button.dataset.difficulty;
    els.difficultyButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    if (state.mode === "ai") {
      setBackendStatus("難易度を変更しました。「出題」を押すと新しい5問に反映されます。");
    }
  });
});

els.prevQuestionBtn.addEventListener("click", goPrevQuestion);
els.newQuestionBtn.addEventListener("click", () => {
  void goNextQuestion();
});
els.aiRefreshBtn.addEventListener("click", async () => {
  await refreshAiQuestions();
  renderQuestion(getCurrentQuestion());
});
els.shuffleBtn.addEventListener("click", () => {
  void goRandomQuestion();
});
els.showAnswerBtn.addEventListener("click", () => {
  if (!state.current) return;
  els.explanationBox.hidden = false;
  [...els.optionsList.children].forEach((button, index) => {
    if (state.current.answer !== null && index === state.current.answer) button.classList.add("correct");
  });
});

els.saveMistakeBtn.addEventListener("click", () => {
  if (!state.current) return;
  addMistake(state.current);
  saveStudyState();
  renderStats();
});

els.clearMistakesBtn.addEventListener("click", () => {
  state.mistakes = [];
  saveStudyState();
  renderMistakes();
  renderStats();
});

els.resetBtn.addEventListener("click", async () => {
  state.answers.clear();
  state.mistakes = [];
  state.pastPosition = 0;
  saveStudyState();
  renderMistakes();
  renderQuestion(getCurrentQuestion());
});

clampPastPosition();
setBackendStatus("AI出題モードで「出題」を押すと5問生成します");
updateAiRefreshControl();
renderMistakes();
renderQuestion(getCurrentQuestion());


