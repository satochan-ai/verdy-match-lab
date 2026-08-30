@AGENTS.md

# verdy-match-lab プロジェクトルール

## GitHub / PR / Vercel delivery flow

通常の変更は、最新の `origin/master` を確認してから新しい `claude/` branchで実装し、QA、対象ファイルだけのcommit、push、`gh pr create`、PR diff確認、`gh pr merge --merge --delete-branch`、masterのff-only同期、Production確認までClaude Code側で進める。ユーザーへPR作成やmergeを依頼して停止しない。

- 作業前に現在branchと既存PRを確認し、MERGED / CLOSED branchは再利用しない。
- `gh auth status` が未認証の場合は認証切れを報告し、ユーザーのブラウザ認証が必要なら復旧を依頼する。
- PR作成前に同一headの既存OPEN PRを再利用し、既存PRがなければ作成する。
- PRのbase、head、changed files、diff、QA結果を確認してからmergeする。明示的にPRのみ・mergeなしと指定された場合は従う。
- merge後は `git fetch origin` と `git merge --ff-only origin/master` でmasterを同期する。reset、rebase、force pushは行わない。
- merge後は `https://verdy-match-lab.vercel.app/` を確認し、`vercel deploy` / `vercel --prod` は原則実行しない。
- `.claude/launch.json`、`Pictures/`、その他の既存WIPをcommitへ混入させない。

東京ヴェルディの試合を戦術視点で楽しむ非公式ファンサイト（β版）。
Next.js + Neon Postgres（`DATABASE_URL`）+ mockフォールバック。外部AI APIは使用しない。

## Git・ローカル保護対象
- `.claude/launch.json`はGit管理対象であり、現在ローカルに未コミット差分が存在する。
  明示的な指示なく、reset / restore / stash / clean / checkoutによる復元等でこの差分を破棄しない。
  今回のようなドキュメント整備作業でも、このファイル自体は変更しない。
- `Pictures/`はGit未追跡のローカル素材ディレクトリとして扱う。`public/images/home/`に同一内容の
  画像が存在していても、明示的な指示なく削除・移動・cleanしない。撮影者や素材の所有関係を
  コードだけから断定しない。

## 非公式ファンサイト表記
- Footer（`components/ui/Footer.tsx`）・metadata（`app/layout.tsx`）の「非公式ファンサイト」表記を
  削除・弱化しない。
- 東京ヴェルディ株式会社・Jリーグ等との公式関係を誤認させる表現に変更しない。
- 独自にクラブロゴ・エンブレム素材を追加しない。

## 写真
- `public/images/home/`の既存写真を、明示的な指示なく削除・加工・置換しない。
- 外部由来の新規画像・ロゴ素材を追加する場合は、追加前にユーザーへ確認する。

## TOP TEAM / U-21 / BELEZAのデータ構造
- TOP TEAMは`lib/data/matches.ts`/`schedule.ts`経由でNeon DB（`DATABASE_URL`設定時）を参照し、
  DB未設定またはDB結果が0件の場合は`lib/mock/matches.ts`等へフォールバックする（DB＋mock fallback）。
- U-21・BELEZAには対応するDB連携ファイルが存在せず、`app/u21/page.tsx`・`app/beleza/page.tsx`
  から`lib/mock/u21.ts`・`lib/mock/beleza.ts`を直接参照する、現在mockデータのみの構成である。
- この3カテゴリーを同一構成だと仮定して一括変更しない。mockデータの削除やDB化は、カテゴリーごとに
  現状を確認してから行う。

## DATABASE_URL
- サーバー専用として扱い、`NEXT_PUBLIC_`を付けてクライアントへ公開しない。
- ブラウザから直接利用しない。
- `lib/db/server.ts`の`isDbConfigured()`による既存ガード（呼び出し前に設定有無を確認する
  パターン）を維持する。

## 外部AI API
- 現在未使用。新規導入は方針変更になるため、ユーザー確認なく追加しない。

## 参照ドキュメント
- README.md（プロジェクト概要・技術構成）
- `components/ui/Footer.tsx` / `app/layout.tsx`（非公式表記の正本）
