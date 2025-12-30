# ConstellationCanvas - Copilot コーディングエージェント指示書

## 概要

ConstellationCanvasは、システムエンジニアのための個人成長・ブログサイトです。**Astro 5.x**（SSG + SSR ハイブリッド）で構築され、**Cloudflare Pages**にデプロイされています。MDXブログ記事、タグベースのナビゲーション、RSSフィード、カスタムリンクカードコンポーネントを特徴としています。

**技術スタック:** Astro 5, TypeScript, MDX, Cloudflare adapter, LightningCSS
**Node.js:** 23.11.0（`.node-version`で指定）

## ビルド＆検証コマンド

**必ずリポジトリのルートからこれらのコマンドを実行してください。**

### 依存関係のインストール
```bash
npm install
```

### ビルド（型チェック含む）
```bash
npm run build
```
- `astro check`（TypeScript検証）を実行後、`astro build`を実行
- ビルド時間: 約5〜10秒
- 出力先: `dist/` ディレクトリ
- **注意:** ビルド中の「Entry blog → X was not found」警告は、関連記事の参照が見つからない場合に想定される動作です

### 開発サーバー
```bash
npm run dev
```
- `http://localhost:4321` で起動
- ホットリロード有効

### リンティング

**Biome**（JS/TSのフォーマットとリンティング）:
```bash
npx @biomejs/biome check .
npx @biomejs/biome check --write .  # 自動修正付き
```
- 設定ファイル: `biome.json`
- CSSファイルは除外
- インデントはタブ、クォートはダブルクォートを使用

**Stylelint**（`.css`と`.astro`ファイル内のCSS）:
```bash
npx stylelint "src/**/*.{css,astro}"
```
- 設定ファイル: `.stylelintrc.cjs`
- カスタムプロパティは `src/styles/tokens/tokens.css` で定義

### 本番ビルドのプレビュー
```bash
npm run preview
```

## プロジェクト構成

```
src/
├── components/          # Astroコンポーネント
│   ├── linkcard/        # カスタムリンクカード（remarkLinkCard.tsx + LinkCard.astro）
│   └── *.astro          # UIコンポーネント
├── content/
│   ├── blog/            # MDXブログ記事（年/日付フォルダで整理）
│   └── config.ts        # コンテンツコレクションスキーマ（Zodバリデーション）
├── layouts/
│   ├── BaseLayout.astro # メインサイトレイアウト
│   └── BlogPost.astro   # ブログ記事レイアウト
├── pages/
│   ├── blog/[...slug].astro  # 動的ブログルート
│   ├── tags/[tag].astro      # タグページ
│   ├── api/                  # APIルート
│   └── *.astro               # 静的ページ
├── styles/
│   ├── tokens/tokens.css     # デザイントークン（色、フォント、スペーシング）
│   ├── globals.css           # グローバルスタイル
│   └── reset.css             # CSSリセット
└── consts.ts            # サイト全体の定数（タイトル、説明）

public/                  # 静的アセット（フォント、ファビコン）
astro.config.mjs         # Astro設定
```

## 主要な設定ファイル

| ファイル | 目的 |
|---------|------|
| `astro.config.mjs` | Astro設定（MDX、サイトマップ、Cloudflareアダプター、LightningCSS） |
| `biome.json` | JS/TSのリンティングとフォーマット |
| `.stylelintrc.cjs` | CSSリンティング |
| `tsconfig.json` | TypeScript設定（`@/*`パスエイリアスを`./src/*`にマッピング） |
| `components.json` | shadcn/ui設定（使用している場合） |

## コンテンツスキーマ

`src/content/blog/`のブログ記事には以下のフロントマターが必要です（`src/content/config.ts`で定義）:

```yaml
---
title: string (必須)
description: string (必須)
pubDate: date (必須)
updatedDate: date (任意)
tags: string[] (必須)
relatedPosts: reference[] (任意)
prevPost: reference (任意)
nextPost: reference (任意)
---
```

## インポートエイリアス

`src/`からのインポートには`@/`プレフィックスを使用:
```typescript
import BaseLayout from "@/layouts/BaseLayout.astro";
import { SITE_TITLE } from "@/consts";
```

## Git規約

`.github/skills/git-conventions/SKILL.md`の規約に従ってください:
- **コミット:** `<type>[scope]: <description>`（例: `feat(blog): add new post`）
- **ブランチ:** `<type>/<description>`（例: `feature/add-search`）
- **タイプ:** feat, fix, docs, style, refactor, perf, test, build, ci, chore

## 検証チェックリスト

変更を提出する前に:

1. **型チェック:** `npm run build`（`astro check`を含む）
2. **Biomeリント:** `npx @biomejs/biome check .`
3. **Stylelint:** `npx stylelint "src/**/*.{css,astro}"`
4. **開発サーバーテスト:** `npm run dev`を実行し、localhost:4321で確認

## 既知の問題と注意事項

- **Biomeスキーマ警告:** `biome.json`はスキーマバージョン1.9.4を使用していますが、Biome 2.3.10がインストールされています。必要に応じて`npx @biomejs/biome migrate`を実行してください。
- **Stylelint警告:** 既存のCSSにはいくつかの軽微な違反があります（降順の詳細度、非推奨の`clip`プロパティ）- これらは既存のものです。
- **Cloudflareアダプターメッセージ:** 「Enabling sessions with Cloudflare KV」やsharpの警告は想定される動作であり、無視できます。
- **関連記事の欠落:** 「Entry blog → X was not found」というビルド警告は、記事のフロントマターで参照が壊れていることを示しています。

## この指示書を信頼してください

これらの指示は実際のリポジトリに対して検証されています。以下の場合にのみ追加の調査を行ってください:
- コマンドが予期せず失敗した場合
- ここに記載されていない特定の実装詳細を見つける必要がある場合
- 情報が古いか不正確と思われる場合
