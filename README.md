# Verdy Match Lab

東京ヴェルディの試合を、戦術の視点で楽しむための非公式観戦支援Webアプリです。現在はモックMVP / β版として試験運用しています。

## 機能

- PRE_MATCH：見どころ、注目ポイント、キーマン、軍師の三策、予想スタメン
- LIVE：スコア状況・時間帯・特殊状況に応じた戦術軍師 βの分析
- HALF_TIME：前半の整理、後半の注目ポイント、修正案
- POST_MATCH：試合総括、三策の答え合わせ
- Archive：過去試合一覧

## 技術構成

- Next.js
- TypeScript
- Tailwind CSS

現在は`DATABASE_URL`未設定時のmock fallbackで動作します。外部AI APIは使用していません。

## Local起動

```bash
npm run dev
```

## Build

```bash
npm run build
```

Verdy Match Labは非公式ファンプロジェクトであり、東京ヴェルディ株式会社およびJリーグとは無関係です。
