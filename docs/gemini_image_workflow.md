# Gemini（CLI）で画像を作ってLPに載せる手順（手動トリガ）

前提:
- `gemini` でGemini CLIが起動できる（あなたの環境では `op run` をラップ済み）
- 画像の置き場は `app-web/public/generated/`（Next.jsから `/generated/...` で参照）
- プロンプト置き場は `prompts/images/`

## 1) プロンプトを書く（Cursor側）

- `prompts/images/hero.md` などを編集して、欲しい絵の条件を具体化する

## 2) Geminiに実行させる（手動）

Gemini CLIで以下のように投げる:
- `@prompts/images/hero.md`

（ワンショットなら `gemini "@prompts/images/hero.md"` でもOK）

## 3) 生成物を配置

採用した画像をこの場所に置く:
- `app-web/public/generated/hero.webp`
- `app-web/public/generated/ogp.png`
- `app-web/public/generated/sections/...`

## 4) LPで表示

LP（Next.js）からは `/generated/...` のURLで参照する。

例:
- `/generated/hero.webp`

## 重要（運用メモ）

- `op://...` の秘密参照は **日本語名を弾くことがある**ため、必要なら **Vault/ItemのID参照**にする
- APIキーをターミナルに直書きしない（履歴/ログに残りやすい）


