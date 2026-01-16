# アルバイト体験談記事

このリポジトリは、Next.jsとSupabaseを利用して作成した、アルバイトの体験談を投稿・管理するためのシンプルなブログアプリケーションです！

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

### 2. リポジトリのクローンと依存関係のインストール

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
