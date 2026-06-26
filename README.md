# 看護師国家試験対策

静的フロントエンドと Node.js 後端で構成された復習アプリです。

## ローカル起動

```bash
cp .env.example .env
# .env に GEMINI_API_KEY / DEEPSEEK_API_KEY を設定
npm start
```

起動後、`http://127.0.0.1:8787` を開きます。

## AI 出題 API

フロントエンドは `/api/generate-question` にリクエストします。

- `provider: "gemini"` の場合、後端が Gemini API を呼び出します。
- `provider: "deepseek"` の場合、後端が DeepSeek API を呼び出します。

API キーはブラウザに置かず、後端の環境変数で管理します。

## デプロイ

GitHub Pages は静的ファイルのみ対応しているため、AI 出題を本番で使うには `server.js` を Vercel、Render、Railway などの Node.js 対応ホスティングへデプロイしてください。

その後、画面左側の `Backend URL` にデプロイ先 URL を入力します。
