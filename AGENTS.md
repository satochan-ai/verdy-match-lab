<!-- BEGIN:nextjs-agent-rules -->

# これは、あなたが知っているNext.jsとは異なる

このversionにはbreaking changeがあり、API、規約、ファイル構成が学習データと異なる場合がある。コードを書く前に、`node_modules/next/dist/docs/`の関連guideを読むこと（このファイルのdirectoryから解決する。monorepoでは`next` packageがrepository rootから見えない場合がある）。deprecation noticeに従うこと。

このblockは`next dev`が書き込み、再追加する。`node_modules/next/dist/server/lib/generate-agent-files.js`で確認すること。diffから削除しても未commit変更が再作成されるだけなので、作業とともにcommitするとtreeをcleanに保てる。

<!-- END:nextjs-agent-rules -->

## Projectの目的と非公式positioning

このrepositoryは、戦術・観戦の視点で東京ヴェルディの試合を楽しむための非公式fan projectである。TOP TEAM、U-21、BELEZAの試合情報、予想、live context、analysisを扱う。official factと独自のeditorial viewを明確に区別すること。

東京ヴェルディ株式会社、J.League、WE League、競技会主催者との関係を示唆しないこと。架空のofficial comment、manager statement、player statement、club announcementを生成しないこと。`components/ui/Footer.tsx`と`app/layout.tsx`の「unofficial fan site」という表現を維持すること。

## Source of truthとdata architecture

dataの管理元はcategoryごとに異なる。

- TOP TEAM details use `lib/data/matches.ts` and Neon PostgreSQL when `DATABASE_URL` is configured, with the existing `lib/mock/matches.ts` fallback when it is not configured or returns no rows.
- TOP TEAM schedule currently uses `lib/mock/schedule.ts`; do not assume it is database-backed.
- U-21 uses `lib/mock/u21.ts` and BELEZA uses `lib/mock/beleza.ts`; neither should be treated as having the TOP TEAM database structure.
- Shared domain types are in `types/domain.ts`; database mapping is in `lib/data/mappers.ts`.

"mock"というfilenameだけで、すべての値が架空だとは判断しないこと。match dataを公開・変更する前に、code comment、source、contextを確認すること。seed dataやplaceholderを検証済みの事実として扱わないこと。

## TOP TEAM / U-21 / BELEZAの境界

UIが似ているというだけで、あるcategoryのdata model、schedule、analysis depth、lineup representation、match historyを別categoryへ適用しないこと。shared componentを変更する場合は3 categoryすべてを確認すること。真にsharedな要件が確立されない限り、category-specific componentとdataは分離しておくこと。

## Match dataとofficial source

matchを変更する場合は、該当するmatch ID、team、opponent、date、kickoff、venue、competition、fixture metadata、status、score、route、schedule visibility、archive visibility、表示されるPRE/LIVE/HALF_TIME/POST stateを確認すること。

利用可能な場合は、事実記録にclub、league、competitionのofficial sourceを使うこと。未確認のdate、opponent、venue、score、player information、statistic、source linkを推測しないこと。このファイルにcurrent match resultやtemporary match IDをhard-codeしないこと。

## PRE / LIVE / HALF_TIME / POSTの意味

既存の`scheduled`、`live`、`half_time`、`finished` status modelと、`lib/match/status.ts`および`lib/match/display.ts`のlogicを維持すること。

PRE_MATCH prediction、LIVE context、HALF_TIME analysis、POST_MATCH resultを意味上分離すること。matchがfinishedになる前にfinal result、official statistic、confirmed post-match conclusionを表示しないこと。

## Predictedとofficial lineupの区別

`predictedLineups`と`actualLineups`は別の概念である。predicted starter、formation、shirt number、position、availabilityをofficial informationとして表示しないこと。official lineupはconfirmed sourceからのみ更新し、actual lineupを追加する際にpredictionを上書き・削除しないこと。

## Official recordとeditorial analysis

`officialRecord`、`goals`、`cards`、`substitutions`、`matchStats`、`actualLineups`、confirmed resultを事実記録として扱うこと。prediction、tactical analysis、three plans、post-match interpretationをeditorial contentとして扱うこと。AI生成または独自analysisをofficial-record fieldに混在させないこと。

## Databaseとenvironmentの安全

`DATABASE_URL`はserver-onlyである。`NEXT_PUBLIC_` variable、browser code、client bundle、log、このファイルを通じて公開しないこと。明示的なarchitecture変更の依頼がない限り、`isDbConfigured()` guardと既存のDB/mock fallbackを維持すること。

External AI APIは現行の必須architectureに含まれない。analysisをより権威あるものに見せるだけの理由で、これらやnew dependencyを追加しないこと。

## Photo、logo、copyrightの安全

source、rights、publication permissionの明示的な確認なしに、web由来のplayer photo、official logo、club crest、press image、third-party match photoを追加しないこと。指示なしに既存の`public/images/` assetを変更、置換、削除しないこと。`Pictures/`はユーザー所有のuntracked local materialとして扱い、明示的な指示なしに削除、移動、clean、stageしないこと。

ユーザー提供またはユーザー撮影の画像について、所有権を独自に推測しないこと。承認済みのmaskingを維持し、隠された名前、顔、confidential informationを復元しないこと。

## Visual identityとresponsive UX

designではVerdyに結びつくgreenをidentity anchorとして使いつつ、match information、tactical content、readability、hierarchyを優先すること。siteを装飾的なcolor exerciseにしないこと。

UI変更ではdesktopとmobileのnavigation、match card、lineup、formation、schedule、table、image、Hero content、sidebarを考慮すること。desktop reviewだけでvisual changeを完了と判断しないこと。

## SEOとmetadata

routeやmetadataを変更する場合は、title、description、teamとmatchのmetadata、canonical、sitemap、robots、OGPをまとめて確認すること。SEOを理由にofficial affiliationを示唆したり、未確認のpredictionを事実として広めたりしないこと。temporary match data、production URL、project identifierをここにhard-codeしないこと。

## `.claude/launch.json`とlocal asset

`.claude/launch.json`はtracked local launch configurationで、現在は既存の未commit変更がある。明示的に依頼されない限り、edit、restore、reset、stash、clean、stage、commitしないこと。

`Pictures/`は現在untrackedのlocal materialである。明示的に依頼されない限り、edit、削除、移動、rename、clean、stage、commitしないこと。working treeをcleanにすることが目的でも、この保護を適用すること。

## validationと検証

変更内容に応じて確認を選ぶこと。

- match data: source、opponent、date、venue、competition、status、result、route、schedule、archive visibilityを確認
- lineup: predictedとactualのstatus、confirmed player、number、position、formation dataを確認
- shared component: TOP TEAM、U-21、BELEZAを確認
- UI: desktopとmobileのlayoutを確認
- image: source、copyright、permission、maskingの保持を確認
- metadata: unofficial positioningとSEO semanticsを確認
- code変更: 必要に応じて`npm run lint`と`npm run build`を実行
- すべてのdiff: `git diff --check`を実行

実際に実施していないtest、responsive review、source check、link checkを報告しないこと。

## 完了時の確認

このrepositoryで作業した場合は、unofficial positioning、official factとprediction/analysisの分離、category境界、DB/mock source、lineupの意味、match status、image rights、`.claude/launch.json`、`Pictures/`、mobile behavior、deploymentへの関連する影響を報告すること。明示的に依頼されない限り、deployやexternal setting変更を行わないこと。

## GitHub delivery safety

- 通常の変更は最新の `origin/master` から新しいbranchで行い、対象ファイルだけをcommitする。MERGED / CLOSED branchは再利用しない。
- `master` への反映はPR経由とし、merge後は `git fetch origin` と `git merge --ff-only origin/master` で同期する。reset、rebase、force pushは禁止する。
- 既存WIP（特に `.claude/launch.json`、`Pictures/`、未コミットのAGENTS.md差分）をstage・commitへ混入させない。
- PRとmergeはrepository権限・ユーザー指示の範囲で行い、PR diffとQAを確認してから実行する。
