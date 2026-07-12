# サブネットマスク電卓

IPアドレスとサブネットマスク(CIDR表記)を入力すると、ネットワークアドレス・ブロードキャストアドレス・利用可能ホスト範囲・アドレス数・IPアドレスクラスを即座に算出する、[Next.js](https://nextjs.org)製のサブネット電卓です。計算はすべてクライアントサイドで完結し、サーバーへの通信は発生しません。

## 主な機能

- IPv4アドレス入力 + CIDR(`/1`〜`/32`)選択によるリアルタイム計算
- ネットワークアドレス・ブロードキャストアドレス・利用可能ホスト範囲・アドレス総数・利用可能ホスト数・IPアドレスクラス(A〜E)の算出
- `/31`・`/32`の特例ルール(RFC 3021準拠のポイントツーポイント、ホスト単体アドレス)に対応
- 計算結果の10進数・2進数・16進数表示切り替え
- 入力バリデーションとエラーメッセージ表示
- キーボード操作のみで完結する、レスポンシブなリッチUI([Headless UI](https://headlessui.com)のComboboxによるCIDR選択)
- `output: "export"`による完全静的サイト出力(サーバーランタイム不要)

## 技術スタック

| レイヤー | 採用技術 |
|----------|----------|
| フレームワーク | Next.js 16 (App Router) / React 19 |
| 言語 | TypeScript (strict mode) |
| スタイリング | Tailwind CSS v4 |
| UIコンポーネント | Headless UI (Combobox) |
| テスト | Vitest / React Testing Library / Playwright |

## Getting Started

依存パッケージをインストールします。

```bash
npm install
```

開発サーバーを起動します。

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開くと画面が表示されます。`app/page.tsx` を編集すると自動的に反映されます。

## スクリプト

| コマンド | 内容 |
|----------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 静的サイトをビルド(`out/`に出力) |
| `npm run start` | ビルド済みアプリの起動(確認用) |
| `npm run lint` | ESLintを実行 |
| `npm run test` | Vitestによるユニット・結合テストを実行 |
| `npm run test:watch` | Vitestをウォッチモードで実行 |
| `npm run e2e` | PlaywrightによるE2Eテストを実行 |

## ディレクトリ構成

```
app/                        # App Router: ページ・レイアウト・アイコン/OG画像生成
components/subnet-calculator/  # プレゼンテーションコンポーネント
hooks/                       # 状態管理フック(useSubnetCalculator)
lib/                         # 検証・計算・整形ロジック(純粋関数)とアイコン共通パーツ
public/                      # 静的アセット(icon.svgなど)
tests/                       # Vitest(lib/components/hooks)・Playwright(e2e)テスト
.kiro/                       # Kiro Spec-Driven Developmentの仕様書一式
```

計算ロジック(`lib/validation.ts` / `lib/subnet.ts` / `lib/format.ts`)はUIから独立した純粋関数として実装されており、`tests/lib/`配下で単体テストされています。

## アイコン・OGP

- ファビコン・アプリアイコン(`app/icon.tsx` / `app/apple-icon.tsx` / `app/favicon.ico`)およびOG画像(`app/opengraph-image.tsx`)は`next/og`の`ImageResponse`でビルド時に生成しています。
- アイコンのSVG版は[`public/icon.svg`](public/icon.svg)に配置しています。
- OGP・Twitterカード用のメタデータは`app/layout.tsx`で設定しており、`metadataBase`に本番ドメイン(`https://subnet.snackpan.app`)を設定済みです。デプロイ先ドメインを変更する場合は`app/layout.tsx`の`SITE_URL`を更新してください。

## Spec-Driven Development

本プロジェクトは[Kiro-style Spec-Driven Development](.kiro/specs/subnet-mask-calculator)に基づいて実装されています。要件定義・設計・タスク分解は`.kiro/specs/subnet-mask-calculator/`配下を参照してください。

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Headless UI Documentation](https://headlessui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
