# 看護師国家試験対策

日本の看護師国家試験対策向けの復習アプリです。GitHub Pages で配信する静的フロントエンドと、Vercel で動かす AI 出題 API で構成されています。

## 公開 URL

- フロントエンド: https://yoco211.github.io/nurse-exam-review/
- AI 後端: https://nurse-exam-review-backend.vercel.app
- GitHub Pages の公開元: `docs/`

## 主な機能

- 過去問対策リンクと AI 出題の切り替え
- 過去問対策では外部の過去問.com 年度一覧を表示
- AI 出題の分野・難易度の絞り込み
- AI 出題は `出題` ボタンを押したときに 5 問まとめて生成
- 答題記録、正答率、苦手問題、AI 生成済み問題をブラウザの `localStorage` に保存
- Gemini / DeepSeek のプロバイダー切り替え
- Gemini 失敗時は後端で DeepSeek に fallback

## ローカル起動

```bash
cp .env.example .env
# .env に GEMINI_API_KEY / DEEPSEEK_API_KEY を設定
npm start
```

起動後、`http://127.0.0.1:8787` を開きます。

PowerShell の実行ポリシーで `npm start` が止まる場合は、Windows では次を使えます。

```bash
npm.cmd start
```

## AI 出題 API

フロントエンドは次の API を呼び出します。

```http
POST /api/generate-question
Content-Type: application/json
```

リクエスト例:

```json
{
  "provider": "deepseek",
  "category": "必修",
  "difficulty": "基礎",
  "count": 5
}
```

`count` は `1` から `5` まで対応します。`count: 5` の場合、後端は 1 回のモデル呼び出しで 5 問をまとめて生成し、`questions` 配列で返します。`count` を省略した場合は従来通り 1 問を `question` として返します。

## ファイル同期

GitHub Pages は `docs/` から配信します。フロントエンドを変更した場合は、次のファイルを同期してください。

- `index.html` -> `docs/index.html`
- `styles.css` -> `docs/styles.css`
- `app.js` -> `docs/app.js`

後端は次のファイルを同期して運用しています。

- `backend/api/generate-question.js`
- `api/generate-question.js`
- `server.js`（ローカル確認用）

## 公式真題について

現在の「過去問対策」は、問題本文を内蔵せず、過去問.com の年度一覧ページを外部リンクとして表示します。以前の復習用模擬問題は、公式原題と誤認されないよう画面上の出題機能から外しています。

公式真題に差し替えることは技術的には可能ですが、次のどちらかが必要です。

- 厚生労働省など公式サイトで公開され、利用条件を確認できる PDF / データ
- ユーザーが提供する、利用許諾のある題庫テキスト

公式原題を使う場合は、出典、年度、問題番号、利用条件を明記して取り込む必要があります。出典が確認できない問題文を「公式真題」として掲載することは避けてください。

### 真題化の進め方

このプロジェクトでは、第三者サイトの問題文・解説を直接コピーしません。過去問.com などは年度や分野の確認用リンクとして扱い、将来問題本文を掲載する場合は次の流れで取り込みます。

1. 厚生労働省の公式ページ、公式 PDF、または利用許諾のある題庫テキストを確認する。
2. 問題ごとに `exam`、`year`、`yearKey`、問題番号、出典 URL、利用条件を記録する。
3. 公式資料を加工した場合は、画面または README に「厚生労働省資料を加工して作成」などの注記を付ける。
4. 正答 PDF だけでは問題本文を復元しない。問題本文の出典が確認できたものだけを真題として掲載する。

参考リンク:

- 厚生労働省 資格・試験情報: https://www.mhlw.go.jp/kouseiroudoushou/shikaku_shiken/
- 第115回 看護師国家試験 合格発表・正答: https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken03_04_05/about.html
- 厚生労働省 利用規約・リンク・著作権等: https://www.mhlw.go.jp/chosakuken/index.html
- 過去問.com 看護師試験 年度一覧（参照用）: https://nurse.kakomonn.com/list
