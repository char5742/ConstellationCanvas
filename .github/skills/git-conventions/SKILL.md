---
name: git-conventions
description: Git workflow conventions combining Conventional Comments (code review), Conventional Commits (commit messages), and Conventional Branch (branch naming). Use when (1) writing code review comments, (2) creating commit messages, (3) naming branches, (4) user asks about git conventions, or (5) user requests "/git-conventions" or similar git workflow guidance.
---

# Git規約

一貫したGitワークフローのための3つの統一規約: コメント、コミット、ブランチ。

## 1. Conventional Comments（コードレビュー）

> https://conventionalcomments.org/

フォーマット: `<label> [decorations]: <subject>`

### ラベル一覧

| ラベル | 用途 | ブロッキング |
|--------|------|--------------|
| **praise** | 良い点を称賛 | No |
| **nitpick** | 些細な好みの指摘 | No |
| **suggestion** | 改善提案 | No |
| **issue** | 問題点の指摘 | Yes |
| **todo** | 必須の小さな変更 | Yes |
| **question** | 確認・質問 | No |
| **thought** | アイデアの共有（メンタリング） | No |
| **chore** | 共通プロセスへの参照 | Yes |
| **note** | 情報の強調 | No |

### 装飾子

- `(non-blocking)` - 承認を妨げるべきではない
- `(blocking)` - 承認前に解決必須
- `(if-minor)` - 変更が軽微な場合のみ対応

### 例

```
praise: 関心の分離がきれいにできています！

nitpick (non-blocking): letの代わりにconstを使うことを検討してください。

suggestion: このロジックを再利用性のためにヘルパー関数に抽出してください。
これによりコードがテストしやすく、保守しやすくなります。

issue (blocking): userがundefinedの場合、NullPointerExceptionが発生します。

question: APIが空の配列を返した場合、期待される動作は何ですか？

todo: ネットワークリクエストのエラーハンドリングを追加してください。
```

## 2. Conventional Commits（コミットメッセージ）

> https://www.conventionalcommits.org/

フォーマット: `<type>[scope]: <description>`

### タイプ一覧

| タイプ | 用途 | SemVer |
|--------|------|--------|
| **feat** | 新機能 | MINOR |
| **fix** | バグ修正 | PATCH |
| **docs** | ドキュメント | - |
| **style** | フォーマット（コード変更なし） | - |
| **refactor** | コードのリファクタリング | - |
| **perf** | パフォーマンス改善 | - |
| **test** | テストの追加・修正 | - |
| **build** | ビルドシステムの変更 | - |
| **ci** | CI設定の変更 | - |
| **chore** | メンテナンスタスク | - |

### 破壊的変更

コロンの前に `!` を付けるか、フッターに `BREAKING CHANGE:` を記載。

### 例

```bash
feat: ユーザー認証を追加

fix(api): サーバーからのnullレスポンスを処理

feat(auth)!: ログインAPIのレスポンス形式を変更

BREAKING CHANGE: ログインがセッションIDではなくJWTを返すようになりました

docs: READMEにインストール手順を追加

refactor(utils): 日付フォーマットロジックを簡素化

test: 決済モジュールのユニットテストを追加
```

### 完全なフォーマット

```
<type>[scope]: <description>

[body]

[footer(s)]
```

## 3. Conventional Branch（ブランチ命名）

> https://conventional-branch.github.io/

フォーマット: `<type>/<description>`

### タイプ一覧

| タイプ | 用途 | 例 |
|--------|------|-----|
| **main/master** | メインブランチ | `main` |
| **feature/** または **feat/** | 新機能 | `feature/add-login` |
| **bugfix/** または **fix/** | バグ修正 | `bugfix/null-pointer` |
| **hotfix/** | 緊急の本番修正 | `hotfix/security-patch` |
| **release/** | リリース準備 | `release/v1.2.0` |
| **chore/** | コード以外の作業 | `chore/update-deps` |

### 命名ルール

1. **小文字のみ** - `a-z`、`0-9`、`-`（ハイフン）を使用
2. **特殊文字禁止** - `_`、スペース、特殊文字は避ける
3. **連続・末尾ハイフン禁止** - `feature/add--login-` は無効

### 例

```bash
feature/user-authentication
feat/dark-mode
bugfix/fix-header-overflow
fix/login-redirect
hotfix/critical-security-patch
release/v2.0.0
chore/update-dependencies
```

## クイックリファレンス

| コンテキスト | 規約 | フォーマット |
|--------------|------|--------------|
| コードレビュー | Comments | `label [decoration]: subject` |
| コミット | Commits | `type[scope]: description` |
| ブランチ | Branch | `type/description` |

## ワークフロー統合例

```bash
# 1. ブランチを作成
git checkout -b feature/add-search

# 2. 変更してコミット
git commit -m "feat(search): 全文検索機能を追加"

# 3. コードレビューコメントはConventional Comments形式で
# suggestion: 過剰なAPI呼び出しを防ぐためにデバウンスの追加を検討してください。

# 4. フィードバックに対応
git commit -m "perf(search): 検索入力にデバウンスを追加"
```