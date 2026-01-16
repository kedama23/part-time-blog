# アルバイト体験談記事

このリポジトリは、Next.jsとSupabaseを利用して作成した、アルバイトの体験談を投稿・管理するためのシンプルなブログアプリケーションです。

## ✨ 主な機能

-   記事の作成、閲覧、更新、削除 (CRUD)
-   緑を基調とした、目に優しいデザイン

## 🛠️ 技術スタック

-   **フレームワーク**: [Next.js](https://nextjs.org/)
-   **言語**: [TypeScript](https://www.typescriptlang.org/)
-   **バックエンド & DB**: [Supabase](https://supabase.com/)
-   **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)

## 📁 ディレクトリ構成

```
.
├── app/                  # Next.jsのApp Router。アプリケーションの主要なページとロジック
│   ├── api/              # APIエンドポイント
│   ├── globals.css       # グローバルなCSSスタイル
│   ├── layout.tsx        # アプリケーションの共通レイアウト
│   └── page.tsx          # トップページのコンポーネント
├── public/               # 画像などの静的ファイル
├── utils/                # 共通の関数など
│   └── supabase/         # Supabaseクライアントの設定
├── .env.example          # 環境変数のサンプルファイル
├── next.config.ts        # Next.jsの設定ファイル
├── package.json          # プロジェクトの依存関係とスクリプト
├── README.md             # このファイル
├── supabase_schema.md    # Supabaseのテーブル定義
└── tsconfig.json         # TypeScriptの設定ファイル
```

## 🚀 はじめに (開発環境のセットアップ)

このアプリケーションをあなたのローカル環境で動かすための手順です。

### 1. 前提条件

-   [Node.js](https://nodejs.org/) (v18以降を推奨)
-   [Supabase](https://supabase.com/)のアカウント

### 2. リポジリのクローンと依存関係のインストール

まず、このリポジトリをクローンし、必要なパッケージをインストールします。

```bash
git clone https://github.com/your-username/part-time-blog.git
cd part-time-blog
npm install
```

### 3. Supabaseのセットアップ

次に、バックエンドとなるSupabaseのプロジェクトを準備します。

1.  **Supabaseプロジェクトの作成**
    -   [Supabaseのダッシュボード](https://app.supabase.com)にアクセスし、「New project」から新しいプロジェクトを作成します。

2.  **データベーススキーマの適用**
    -   プロジェクトのダッシュボードで、「SQL Editor」に移動します。
    -   このリポジトリのルートにある `supabase_schema.md` ファイルの中身をコピーし、SQL Editorに貼り付けて「RUN」ボタンを押します。これにより、`articles`テーブルと必要なポリシーが作成されます。

3.  **APIキーの取得**
    -   プロジェクトのダッシュボードで、「Settings」 > 「API」に移動します。
    -   「Project URL」と「Project API keys」セクションにある `anon` `public` と書かれたキーを控えておきます。

### 4. 環境変数の設定

プロジェクトのルートに`.env.local`という名前のファイルを作成し、Supabaseの情報を設定します。`.env.example`を参考にしてください。

```.env.local
NEXT_PUBLIC_SUPABASE_URL="ここにSupabaseのProject URLを貼り付け"
NEXT_PUBLIC_SUPABASE_ANON_KEY="ここにSupabaseのanon publicキーを貼り付け"
```

### 5. 開発サーバーの起動

すべての準備が整ったら、開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスすると、アプリケーションが表示されます。

## 🌳 Gitの基本的な使い方

このプロジェクトで開発を進める上で役立つ、基本的なGitコマンドです。

### 1. 変更の確認

作業ディレクトリでの変更内容を確認します。

```bash
git status
```

### 2. 変更のステージング

コミットしたい変更をステージングエリアに追加します。

```bash
git add .
# または特定のファイルのみ追加
# git add src/components/YourComponent.tsx
```

### 3. 変更のコミット

ステージングした変更をローカルリポジトリに保存します。コミットメッセージは、何を変更したのか簡潔に記述します。

```bash
git commit -m "feat: 新しい機能を追加しました"
```

### 4. リモートリポジトリへのプッシュ

ローカルリポジトリの変更をGitHubなどのリモートリポジトリにアップロードします。

```bash
git push origin main
# または作業中のブランチにプッシュ
# git push origin your-feature-branch
```

### 5. 最新の変更の取得

リモートリポジトリの最新の変更をローカルリポジトリにダウンロードします。

```bash
git pull origin main
```

### 6. ブランチの管理

新しい機能開発などでメインのコードに影響を与えないように、ブランチを作成して作業します。

#### 新しいブランチの作成と切り替え

```bash
git checkout -b your-feature-branch
```

#### ブランチの切り替え

```bash
git checkout main
```

#### ブランチ一覧の表示

```bash
git branch
```

#### ブランチのマージ

作業中のブランチの変更を別のブランチ（例: `main`）に取り込みます。

```bash
git checkout main
git merge your-feature-branch
```

#### ブランチの削除

マージ済みで不要になったブランチを削除します。

```bash
git branch -d your-feature-branch
```