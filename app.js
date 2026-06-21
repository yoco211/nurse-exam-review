const defaultPastQuestions = [
  ["115", "2026", "必修", "標準", "成人の安静時の正常な脈拍数に最も近いのはどれか。", ["20〜30回/分", "60〜100回/分", "120〜160回/分", "180〜220回/分"], 1, "成人の安静時脈拍は一般に60〜100回/分である。", "確認ポイント：安静時、成人、正常な脈拍数。"],
  ["115", "2026", "人体構造", "標準", "心臓から全身へ血液を送り出す主な血管はどれか。", ["大動脈", "肺静脈", "上大静脈", "門脈"], 0, "左心室から拍出された血液は大動脈を通って全身へ送られる。", "体循環と肺循環の流れを図で確認する。"],
  ["115", "2026", "疾病看護", "応用", "慢性閉塞性肺疾患の患者にみられやすい症状はどれか。", ["労作時呼吸困難", "多尿", "徐脈", "黄疸"], 0, "COPDでは気流制限により労作時呼吸困難、咳嗽、喀痰などがみられやすい。", "禁煙支援、呼吸リハビリ、増悪予防も重要。"],
  ["114", "2025", "人体構造", "基礎", "血液中で酸素運搬を主に担う成分はどれか。", ["血小板", "白血球", "赤血球", "血漿"], 2, "赤血球に含まれるヘモグロビンが酸素運搬を担う。", "赤血球とヘモグロビンの働きをセットで覚える。"],
  ["114", "2025", "必修", "基礎", "医療安全におけるインシデント報告の目的で適切なのはどれか。", ["再発防止に役立てる", "個人を罰する", "記録を残さない", "患者に説明しない"], 0, "インシデント報告は原因分析と再発防止に活用するための仕組みである。", "医療安全では個人責任だけでなくシステム改善を考える。"],
  ["114", "2025", "在宅看護", "標準", "訪問看護で初回訪問時に優先して確認する内容はどれか。", ["療養環境と本人の希望", "近隣住民の趣味", "家具の購入価格", "テレビ番組の好み"], 0, "初回訪問では療養環境、生活状況、本人・家族の希望、緊急時対応などを確認する。", "在宅では生活の場を理解する視点が必要。"],
  ["113", "2024", "疾病看護", "標準", "糖尿病患者への生活指導で優先度が高い内容はどれか。", ["水分摂取を完全に制限する", "足部の観察を習慣化する", "運動はすべて避ける", "食事回数を1日1回にする"], 1, "糖尿病では末梢神経障害や足病変が起こりやすいため、足部観察、清潔、適切な靴の選択が重要である。", "糖尿病看護ではフットケアが頻出。"],
  ["113", "2024", "社会保障", "標準", "成年後見制度の説明で適切なのはどれか。", ["判断能力が不十分な人を支援する", "医療者だけが利用できる", "未成年者だけを対象とする", "本人の意思確認を不要にする"], 0, "成年後見制度は判断能力が不十分な人の権利や生活を支援する制度である。", "権利擁護と意思決定支援を関連づける。"],
  ["113", "2024", "必修", "基礎", "バイタルサインに含まれる項目はどれか。", ["体温", "視力", "身長", "血液型"], 0, "バイタルサインには体温、脈拍、呼吸、血圧、意識状態などが含まれる。", "正常値と測定時の注意点を合わせて覚える。"],
  ["112", "2023", "社会保障", "標準", "介護保険制度の保険者はどれか。", ["国", "都道府県", "市町村および特別区", "医療機関"], 2, "介護保険制度の保険者は市町村および特別区である。", "保険者、被保険者、給付の関係を整理する。"],
  ["112", "2023", "疾病看護", "標準", "褥瘡予防の看護で適切なのはどれか。", ["定期的に体位変換を行う", "皮膚を湿ったままにする", "栄養状態を確認しない", "圧迫部位を放置する"], 0, "褥瘡予防では体位変換、圧迫除去、皮膚観察、栄養管理が重要である。", "リスク評価にはブレーデンスケールなどが用いられる。"],
  ["112", "2023", "人体構造", "標準", "インスリンを分泌する主な臓器はどれか。", ["膵臓", "肝臓", "脾臓", "腎臓"], 0, "インスリンは膵臓のランゲルハンス島β細胞から分泌され、血糖を下げる。", "インスリンとグルカゴンの作用を対比する。"],
  ["111", "2022", "在宅看護", "応用", "在宅酸素療法を受ける利用者への説明で適切なのはどれか。", ["火気を近づけない", "流量は自由に増減してよい", "外出は必ず禁止する", "加湿器の水は交換しなくてよい"], 0, "酸素は燃焼を助けるため、火気を近づけてはならない。酸素流量は医師の指示に従って使用する。", "在宅酸素療法では火気厳禁が基本。"],
  ["111", "2022", "社会保障", "基礎", "日本の国民皆保険制度の特徴で適切なのはどれか。", ["原則として全ての国民が公的医療保険に加入する", "医療保険は任意加入のみである", "高齢者は制度の対象外である", "保険料は医療機関が全額負担する"], 0, "日本では国民皆保険により、原則としてすべての国民が公的医療保険に加入する。", "医療保険、介護保険、年金を分けて整理する。"],
  ["111", "2022", "在宅看護", "標準", "在宅療養者の災害対策で適切なのはどれか。", ["非常時の連絡先と必要物品を確認する", "医療機器の電源対策は不要である", "避難先を決めない", "家族への説明を避ける"], 0, "在宅療養では災害時の連絡先、避難方法、薬剤、医療機器の電源確保を確認する。", "酸素療法や人工呼吸器使用者では停電時の対応が重要。"]
].map((item, index) => ({
  id: `past-${item[0]}-${index + 1}`,
  source: "過去問対策",
  exam: `第${item[0]}回`,
  year: item[1],
  yearKey: item[0],
  category: item[2],
  difficulty: item[3],
  question: item[4],
  options: item[5],
  answer: item[6],
  explanation: item[7],
  note: item[8]
}));

const aiTemplates = [
  {
    category: "必修",
    stems: ["感染予防の標準予防策で正しいのはどれか。", "転倒リスクの高い患者への対応で最も適切なのはどれか。"],
    options: [
      ["手指衛生をケアの前後に行う", "手袋をすれば手洗いは不要である", "発熱時のみ標準予防策を行う", "血液に触れなければ防護具は不要である"],
      ["ベッド周囲の障害物を取り除く", "夜間は照明を完全に消す", "歩行補助具を遠ざける", "ナースコールを手の届かない場所に置く"]
    ],
    answers: [0, 0],
    points: ["標準予防策はすべての患者を対象とし、手指衛生が基本である。", "転倒予防では環境整備、動線確保、呼び出し手段の確保が重要である。"]
  },
  {
    category: "人体構造",
    stems: ["腎臓の主な働きとして正しいのはどれか。", "肺胞で主に行われる働きはどれか。"],
    options: [["尿を生成し体液を調整する", "胆汁を貯蔵する", "血糖を直接分解する", "食物を機械的に粉砕する"], ["ガス交換", "胆汁生成", "尿濃縮", "血球産生"]],
    answers: [0, 0],
    points: ["腎臓は尿生成、電解質調整、酸塩基平衡の維持に関わる。", "肺胞は酸素と二酸化炭素のガス交換が行われる部位である。"]
  },
  {
    category: "疾病看護",
    stems: ["心不全患者の観察項目で重要なのはどれか。", "脳梗塞急性期の看護で優先される観察はどれか。"],
    options: [["体重増加と浮腫", "爪の長さのみ", "髪色の変化", "嗜好品の銘柄"], ["意識レベルと麻痺の変化", "趣味の変化", "食器の好み", "病室の方角"]],
    answers: [0, 0],
    points: ["心不全では体重増加、浮腫、呼吸困難、尿量の変化を観察する。", "脳梗塞急性期では意識、瞳孔、麻痺、バイタルサインの変化を観察する。"]
  },
  {
    category: "社会保障",
    stems: ["地域包括ケアシステムで重視される考え方はどれか。", "医療保険制度に関する説明で適切なのはどれか。"],
    options: [["住み慣れた地域で生活を支える", "病院だけで生活支援を完結する", "家族支援を制度から除外する", "予防活動を行わない"], ["公的医療保険により医療費負担を支える", "全額を常に自己負担する", "保険証は介護施設だけで使う", "予防接種は制度と無関係である"]],
    answers: [0, 0],
    points: ["地域包括ケアは医療、介護、予防、住まい、生活支援を一体的に提供する考え方である。", "公的医療保険は医療費負担を社会全体で支える制度である。"]
  },
  {
    category: "在宅看護",
    stems: ["訪問看護で利用者の自己決定を支える対応はどれか。", "在宅療養者の家族支援で適切なのはどれか。"],
    options: [["選択肢を説明し意思を確認する", "看護師がすべて決定する", "本人の希望を聞かない", "家族の都合のみを優先する"], ["介護負担と休息状況を確認する", "家族の訴えを聞かない", "介護方法を説明しない", "相談先を知らせない"]],
    answers: [0, 0],
    points: ["在宅看護では本人の生活目標、意思決定、多職種連携を重視する。", "家族介護者の負担や休息状況を把握し、必要な支援につなげる。"]
  }
];

const IMPORT_STORAGE_KEY = "nurseExamImportedQuestions";
const BUILT_IN_YEARS = [
  ["all", "直近5回すべて"],
  ["115", "第115回（2026年）"],
  ["114", "第114回（2025年）"],
  ["113", "第113回（2024年）"],
  ["112", "第112回（2023年）"],
  ["111", "第111回（2022年）"]
];

const state = {
  mode: "past",
  category: "all",
  yearFilter: "all",
  difficulty: "基礎",
  pastPosition: 0,
  importedQuestions: readImportedQuestions(),
  aiHistory: [],
  aiPosition: -1,
  current: null,
  answers: new Map(),
  mistakes: []
};

const els = {
  modePast: document.querySelector("#modePast"),
  modeAi: document.querySelector("#modeAi"),
  categorySelect: document.querySelector("#categorySelect"),
  yearSelect: document.querySelector("#yearSelect"),
  importFileInput: document.querySelector("#importFileInput"),
  pdfFileInput: document.querySelector("#pdfFileInput"),
  importStatus: document.querySelector("#importStatus"),
  sampleJsonBtn: document.querySelector("#sampleJsonBtn"),
  clearImportedBtn: document.querySelector("#clearImportedBtn"),
  difficultyButtons: document.querySelectorAll("[data-difficulty]"),
  prevQuestionBtn: document.querySelector("#prevQuestionBtn"),
  newQuestionBtn: document.querySelector("#newQuestionBtn"),
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

function readImportedQuestions() {
  try {
    const raw = localStorage.getItem(IMPORT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveImportedQuestions() {
  localStorage.setItem(IMPORT_STORAGE_KEY, JSON.stringify(state.importedQuestions));
}

function getAllPastQuestions() {
  return [...defaultPastQuestions, ...state.importedQuestions];
}

function getFilteredPastQuestions() {
  return getAllPastQuestions().filter((item) => {
    const categoryMatches = state.category === "all" || item.category === state.category;
    const yearMatches = state.yearFilter === "all" || item.yearKey === state.yearFilter;
    return categoryMatches && yearMatches;
  });
}

function renderYearOptions() {
  const importedYears = state.importedQuestions
    .map((item) => [item.yearKey, item.exam ? `${item.exam}${item.year ? `（${item.year}年）` : ""}` : item.yearKey])
    .filter(([key]) => key && !BUILT_IN_YEARS.some(([builtInKey]) => builtInKey === key));
  const uniqueImportedYears = [...new Map(importedYears).entries()].map(([key, label]) => [key, `${label}・取込`]);
  const options = [...BUILT_IN_YEARS, ...uniqueImportedYears];

  els.yearSelect.innerHTML = "";
  options.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    els.yearSelect.appendChild(option);
  });

  if (!options.some(([value]) => value === state.yearFilter)) state.yearFilter = "all";
  els.yearSelect.value = state.yearFilter;
}

function updateImportStatus(message) {
  const count = state.importedQuestions.length;
  els.importStatus.textContent = message || `取込済み: ${count}問`;
}

function normalizeImportedQuestion(item, index) {
  const options = Array.isArray(item.options) ? item.options.map(String) : [];
  if (!item.question || options.length < 2) return null;

  const answer = normalizeAnswer(item.answer ?? item.answerIndex ?? item.correctIndex ?? item.correctAnswer, options);
  if (answer !== null && (answer < 0 || answer >= options.length)) return null;

  const examRaw = String(item.exam || item.examNumber || item.yearKey || "取込");
  const exam = item.exam ? String(item.exam) : examRaw.startsWith("第") ? examRaw : `第${examRaw}回`;
  const year = item.year ? String(item.year) : "";
  const yearKey = String(item.yearKey || item.examNumber || year || examRaw || "imported");

  return {
    id: `import-${Date.now()}-${index}`,
    source: item.source ? String(item.source) : "取込過去問",
    exam,
    year,
    yearKey,
    category: item.category ? String(item.category) : "取込",
    difficulty: item.difficulty ? String(item.difficulty) : "標準",
    question: String(item.question),
    options,
    answer,
    explanation: item.explanation ? String(item.explanation) : "解説はインポート元の資料を確認してください。",
    note: item.note ? String(item.note) : "インポートした問題です。出典と利用条件を確認してください。"
  };
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

function handleImportFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const source = Array.isArray(parsed) ? parsed : parsed.questions;
      if (!Array.isArray(source)) throw new Error("questions array missing");

      const normalized = source.map(normalizeImportedQuestion).filter(Boolean);
      if (!normalized.length) throw new Error("valid questions missing");

      state.importedQuestions = normalized;
      state.pastPosition = 0;
      saveImportedQuestions();
      renderYearOptions();
      updateImportStatus(`${normalized.length}問を取り込みました`);
      if (state.mode === "past") renderQuestion(getCurrentQuestion());
    } catch {
      updateImportStatus("JSON形式を確認してください");
    } finally {
      els.importFileInput.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

async function handlePdfFile(file) {
  updateImportStatus("PDFを読み取っています...");
  try {
    const text = await extractPdfText(file);
    const parsed = parsePdfQuestions(text, file.name);
    if (!parsed.length) throw new Error("No questions parsed");

    state.importedQuestions = parsed;
    state.pastPosition = 0;
    saveImportedQuestions();
    renderYearOptions();
    updateImportStatus(`${parsed.length}問をPDFから取り込みました`);
    if (state.mode === "past") renderQuestion(getCurrentQuestion());
  } catch (error) {
    console.error(error);
    updateImportStatus("PDFを解析できませんでした。文字選択できるPDFか確認してください");
  } finally {
    els.pdfFileInput.value = "";
  }
}

async function extractPdfText(file) {
  const pdfjsLib = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const lines = content.items.map((item) => item.str).filter(Boolean);
    pages.push(lines.join("\n"));
  }

  return pages.join("\n\n");
}

function parsePdfQuestions(text, fileName) {
  const normalized = text
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/([問題]\s*\d+)/g, "\n$1")
    .replace(/([1-9][0-9]?)[\.\)]\s*/g, "\n$1. ");

  const chunks = normalized
    .split(/\n(?=問題\s*\d+|問\s*\d+|\d{1,3}\s*[\.．]\s*)/g)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 30);

  const examInfo = inferPdfExamInfo(`${fileName}\n${text.slice(0, 500)}`);

  return chunks
    .map((chunk, index) => parsePdfQuestionChunk(chunk, index, examInfo))
    .filter(Boolean);
}

function inferPdfExamInfo(sourceText) {
  const examMatch = sourceText.match(/第\s*(\d{2,3})\s*回/);
  const yearMatch = sourceText.match(/(20\d{2}|令和\s*\d+)\s*年/);
  const examNumber = examMatch ? examMatch[1] : "PDF";
  const year = yearMatch ? yearMatch[1].replace(/\s+/g, "") : "";
  return {
    exam: examNumber === "PDF" ? "PDF取込" : `第${examNumber}回`,
    year,
    yearKey: examNumber === "PDF" ? `pdf-${Date.now()}` : examNumber
  };
}

function parsePdfQuestionChunk(chunk, index, examInfo) {
  const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
  const options = [];
  const questionParts = [];

  for (const line of lines) {
    const optionMatch = line.match(/^(?:([1-9])[\.\)．、 ]+|[①②③④⑤⑥])(.{1,120})$/);
    if (optionMatch) {
      options.push(cleanPdfLine(optionMatch[2] || line.replace(/^[①②③④⑤⑥]/, "")));
    } else if (!/^(午前|午後|必修問題|一般問題|状況設定問題|看護師国家試験)/.test(line)) {
      questionParts.push(cleanPdfLine(line));
    }
  }

  if (options.length < 2 || questionParts.length < 1) return null;

  const question = questionParts.join(" ").replace(/^(問題|問)?\s*\d+\s*[\.．、]?\s*/, "").trim();
  if (!question) return null;

  return {
    id: `pdf-${Date.now()}-${index}`,
    source: "PDF取込",
    exam: examInfo.exam,
    year: examInfo.year,
    yearKey: examInfo.yearKey,
    category: "PDF取込",
    difficulty: "標準",
    question,
    options: options.slice(0, 8),
    answer: null,
    explanation: "このPDFからは正答を自動判定できませんでした。正答表がある場合はJSON形式で取り込むと採点できます。",
    note: "PDFから自動抽出した問題です。文字化けや分割ミスがある場合は元PDFを確認してください。"
  };
}

function cleanPdfLine(line) {
  return line.replace(/\s+/g, " ").replace(/^[①②③④⑤⑥]/, "").trim();
}

function downloadSampleJson() {
  const sample = {
    questions: [
      {
        source: "取込過去問",
        exam: "第114回",
        year: "2025",
        yearKey: "114",
        category: "必修",
        difficulty: "標準",
        question: "サンプル問題の本文をここに入れます。",
        options: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
        answer: "A",
        explanation: "解説文をここに入れます。",
        note: "出典やメモをここに入れます。"
      }
    ]
  };
  const blob = new Blob([JSON.stringify(sample, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nurse-exam-sample.json";
  link.click();
  URL.revokeObjectURL(url);
}

function createAiQuestion() {
  const pool = state.category === "all" ? aiTemplates : aiTemplates.filter((item) => item.category === state.category);
  const template = pool[Math.floor(Math.random() * pool.length)];
  const variantIndex = Math.floor(Math.random() * template.stems.length);
  return {
    id: `ai-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    source: "AI出題",
    category: template.category,
    difficulty: state.difficulty,
    question: `${template.stems[variantIndex]}（${state.difficulty}）`,
    options: template.options[variantIndex],
    answer: template.answers[variantIndex],
    explanation: `${template.points[variantIndex]} この問題はローカルのAI出題サンプルです。必要に応じて実際のAI APIに接続できます。`,
    note: "解答後は、同じ知識を過去問で確認すると定着しやすい。"
  };
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

function ensureAiQuestion() {
  if (state.aiHistory.length) return;
  state.aiHistory.push(createAiQuestion());
  state.aiPosition = 0;
}

function clampPastPosition() {
  const list = getFilteredPastQuestions();
  state.pastPosition = list.length ? Math.min(state.pastPosition, list.length - 1) : 0;
}

function goNextQuestion() {
  if (state.mode === "past") {
    const list = getFilteredPastQuestions();
    if (!list.length) return;
    state.pastPosition = (state.pastPosition + 1) % list.length;
  } else if (state.aiPosition < state.aiHistory.length - 1) {
    state.aiPosition += 1;
  } else {
    state.aiHistory.push(createAiQuestion());
    state.aiPosition = state.aiHistory.length - 1;
  }
  renderQuestion(getCurrentQuestion());
}

function goPrevQuestion() {
  if (state.mode === "past") {
    const list = getFilteredPastQuestions();
    if (!list.length) return;
    state.pastPosition = (state.pastPosition - 1 + list.length) % list.length;
  } else if (state.aiPosition > 0) {
    state.aiPosition -= 1;
  }
  renderQuestion(getCurrentQuestion());
}

function goRandomQuestion() {
  if (state.mode === "past") {
    const list = getFilteredPastQuestions();
    if (!list.length) return;
    state.pastPosition = Math.floor(Math.random() * list.length);
  } else {
    state.aiHistory.push(createAiQuestion());
    state.aiPosition = state.aiHistory.length - 1;
  }
  renderQuestion(getCurrentQuestion());
}

function getProgressLabel() {
  const total = getCurrentList().length;
  if (!total) return "0 / 0";
  return `${getCurrentPosition() + 1} / ${total}`;
}

function renderQuestion(question) {
  if (!question) {
    els.sourceBadge.textContent = "問題なし";
    els.categoryBadge.textContent = "-";
    els.difficultyBadge.textContent = "-";
    els.totalBadge.textContent = "0 / 0";
    els.questionNumber.textContent = "Q0 / 0";
    els.questionText.textContent = "条件に合う問題がありません。分野または年度を変更してください。";
    els.optionsList.innerHTML = "";
    els.explanationBox.hidden = true;
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
  els.explanationBox.hidden = !hasAnswered;
  els.explanationText.textContent = question.explanation;
  els.jpNote.textContent = question.note;
  els.prevQuestionBtn.disabled = state.mode === "ai" && state.aiPosition <= 0;

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
  renderQuestion(state.current);
}

function addMistake(question) {
  const exists = state.mistakes.some((item) => item.id === question.id);
  if (!exists) state.mistakes.unshift(question);
  renderMistakes();
}

function renderStats() {
  const allQuestions = [...getAllPastQuestions(), ...state.aiHistory];
  const answers = [...state.answers.entries()];
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
  const allQuestions = [...getAllPastQuestions(), ...state.aiHistory];
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
    els.studyTipText.textContent = "まず過去問で出題傾向を確認し、AI出題で弱点を補強しましょう。";
  } else if (state.mistakes.length >= 3) {
    els.studyTipText.textContent = "苦手問題が増えています。同じ分野に絞って10分だけ復習しましょう。";
  } else if (getCurrentStreak() >= 3) {
    els.studyTipText.textContent = "調子が良いです。難易度を上げて、問題文を読む速度も鍛えましょう。";
  } else {
    els.studyTipText.textContent = "解答後すぐに解説を読み、根拠となる語句を確認しましょう。";
  }
}

function setMode(mode) {
  state.mode = mode;
  els.modePast.classList.toggle("active", mode === "past");
  els.modeAi.classList.toggle("active", mode === "ai");
  els.modePast.setAttribute("aria-selected", String(mode === "past"));
  els.modeAi.setAttribute("aria-selected", String(mode === "ai"));
  if (mode === "ai") ensureAiQuestion();
  if (mode === "past") clampPastPosition();
  renderQuestion(getCurrentQuestion());
}

function resetPastPosition() {
  state.pastPosition = 0;
  renderQuestion(getCurrentQuestion());
}

els.modePast.addEventListener("click", () => setMode("past"));
els.modeAi.addEventListener("click", () => setMode("ai"));

els.categorySelect.addEventListener("change", (event) => {
  state.category = event.target.value;
  resetPastPosition();
});

els.yearSelect.addEventListener("change", (event) => {
  state.yearFilter = event.target.value;
  resetPastPosition();
});

els.importFileInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) handleImportFile(file);
});

els.pdfFileInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) handlePdfFile(file);
});

els.sampleJsonBtn.addEventListener("click", downloadSampleJson);

els.clearImportedBtn.addEventListener("click", () => {
  state.importedQuestions = [];
  localStorage.removeItem(IMPORT_STORAGE_KEY);
  state.answers.clear();
  state.mistakes = [];
  state.pastPosition = 0;
  renderYearOptions();
  updateImportStatus("取込データを削除しました");
  renderMistakes();
  renderQuestion(getCurrentQuestion());
});

els.difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.difficulty = button.dataset.difficulty;
    els.difficultyButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    if (state.mode === "ai") {
      state.aiHistory.push(createAiQuestion());
      state.aiPosition = state.aiHistory.length - 1;
      renderQuestion(getCurrentQuestion());
    }
  });
});

els.prevQuestionBtn.addEventListener("click", goPrevQuestion);
els.newQuestionBtn.addEventListener("click", goNextQuestion);
els.shuffleBtn.addEventListener("click", goRandomQuestion);
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
  renderStats();
});

els.clearMistakesBtn.addEventListener("click", () => {
  state.mistakes = [];
  renderMistakes();
  renderStats();
});

els.resetBtn.addEventListener("click", () => {
  state.answers.clear();
  state.mistakes = [];
  state.aiHistory = [];
  state.aiPosition = -1;
  state.pastPosition = 0;
  if (state.mode === "ai") ensureAiQuestion();
  renderMistakes();
  renderQuestion(getCurrentQuestion());
});

renderYearOptions();
updateImportStatus();
renderMistakes();
renderQuestion(getCurrentQuestion());
