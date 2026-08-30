# 試合更新 Runbook

このRunbookは、東京ヴェルディの非公式ファンサイトを更新するときの共通手順です。通常は、下のテンプレートを埋めてClaude Codeへ渡してください。確認できない値は推測せず、空欄または「未確認」とします。

## Quick Start

1. 公式情報本文を貼る場合は、先に[公式情報コピペ → 構造化入力Prompt](./match-source-structuring-prompt.md)を使う。
2. 対象カテゴリーと試合を特定する。
3. 公式URLを添えて、試合前・スタメン・試合終了後の該当テンプレートを渡す。
4. Claude Codeが既存fixture、detailMatchId、status、score、表示先を確認する。
5. 変更後にselector、validation、test、typecheck、lint、build、diffを確認する。
6. 問題がなければ、専用branch、commit、push、PR、merge、master同期、Production確認まで進める。

## 試合前

日程発表、キックオフ・会場・対戦相手の確定時に使います。

```text
【試合前更新】

カテゴリー：TOP / U-21 / BELEZA
対象試合：
試合日：YYYY-MM-DD または TBD
キックオフ：HH:MM または TBD
HOME / AWAY：
対戦相手：
大会：
stage：
節 / 回戦：
会場：
status：scheduled / TBD
公式URL：

補足：
```

更新後に、対象カテゴリーのNEXT、NEXT5、HOMEカードを確認します。日程未定は単一の日付や時刻へ変換しません。

## スタメン発表後

公式Starting XI発表後に使います。予想lineupを削除・上書きせず、actualLineupsとして分離します。

```text
【スタメン更新】

カテゴリー：TOP / U-21 / BELEZA
対象試合：

Starting XI：
GK：背番号｜選手名
DF：背番号｜選手名
MF：背番号｜選手名
FW：背番号｜選手名

ベンチ：背番号｜選手名
formation：
captain：
公式URL：

補足：
```

TOPは`Match`の`actualLineups`、U-21/BELEZAは各カテゴリーの既存detail構造へ、実際のデータ形状を確認して追加します。未確認のformationやcaptainは入力しません。

## 試合終了後

公式結果が確定した後に使います。scoreはHOME/AWAYを必ず分けます。

```text
【試合終了後更新】

カテゴリー：TOP / U-21 / BELEZA
対象試合：
status：finished

HOMEチーム：
AWAYチーム：
home score：
away score：
前半 home score：
前半 away score：

得点：
分｜チーム｜選手名

カード：
分｜チーム｜選手名｜yellow / red

交代：
分｜チーム｜IN｜OUT

Starting XI：
ベンチ：
formation：

stats：
公式記録URL：

補足：
```

最低必須項目は対象試合、`status = finished`、home score、away scoreです。finished化後はNEXTから消え、最新試合がLASTになり、U-21/BELEZAではHISTORYへ反映されることを確認します。TOPはArchiveとdetailも確認します。

## 緊急テンプレート

### 日程・会場変更

```text
【日程変更】
カテゴリー：
対象試合：
変更前：
変更後：
変更項目：kickoff / venue / opponent / other
公式URL：
```

### 延期

```text
【延期】
カテゴリー：
対象試合：
status：postponed
新日程：TBD または YYYY-MM-DD HH:MM
公式URL：
```

### 中止

```text
【中止】
カテゴリー：
対象試合：
status：cancelled
公式URL：
```

延期・中止は既存status modelに合わせ、未確認の再試合日を作りません。

## カテゴリー別の更新場所

| カテゴリー | fixtureの基本source | detail | 更新時の注意 |
|---|---|---|---|
| TOP | `lib/mock/schedule.ts` → `topFixtures` | `lib/mock/matches.ts` / DB `Match` | scheduleとMatch detailの2層。`detailMatchId === Match.id`を維持し、fixtureMetaはadapterで補完 |
| U-21 | `lib/mock/u21.ts` → `u21Fixtures` | U-21 detail data | fixture集合を基準にNEXT/NEXT5/LAST/HISTORYを導出 |
| BELEZA | `lib/mock/beleza.ts` → `belezaFixtures` | BELEZA detail data | fixture集合を基準にNEXT/NEXT5/LAST/HISTORYを導出 |

TOPのNEXT/NEXT5/HOMEはschedule/CommonFixtureが一次sourceです。TOPの結果・分析・Archive・DetailはMatch層を更新し、両者の整合性をvalidatorで確認します。U-21/BELEZAのdetailはTOPのDB構造へ寄せません。

## 更新チェックリスト

### 全カテゴリー共通

```text
□ 対象category / fixtureを特定
□ 公式URLを確認
□ kickoff / venue / HOME-AWAY / opponent
□ competition / stage / round
□ status
□ score（終了後のみ、HOME/AWAYを分離）
□ NEXT / NEXT5
□ HOMEカード
□ detail route
□ test / tsc / lint / build / diff check
```

### スタメン・試合後

```text
□ predictedLineupsとactualLineupsを混同していない
□ Starting XI / bench
□ formation / captain（公式確認時のみ）
□ goals
□ cards
□ substitutions
□ officialRecord / stats
□ analysisはeditorialとして分離
□ 写真のsource・権利・maskingを確認
```

### カテゴリー別追加確認

```text
TOP：□ scheduleとMatchのdetailMatchId対応 □ consistency errors=0 / warnings=0 □ Archive
U-21：□ fixture validation errors=0 □ LAST □ HISTORY
BELEZA：□ fixture validation errors=0 □ LAST □ HISTORY
```

## Claude Codeの標準動作

入力を受けたら、現在branch・status・HEADを確認し、最新`origin/master`から専用branchを作成します。対象fixtureと既存detailを調査し、公式URLと入力値を照合したうえで必要なファイルだけ変更します。

変更後はselector、validation、`npm test`、`npx tsc --noEmit`、`npm run lint`、`npm run build`、`git diff --check`を実行します。問題がなければ、対象ファイルだけをcommitしてpushし、PR差分を確認してから通常mergeします。merge済みbranchは再利用せず、force push、reset、restore、stash、cleanは行いません。`.claude/launch.json`、`AGENTS.md`、`Pictures/`はstageしません。

Vercel CLIで直接deployせず、GitHub merge後の自動deployを使用します。

## 情報の扱い

公式情報の優先順位は、東京ヴェルディ公式、Jリーグ・WEリーグ・JFA公式、対戦相手公式の順です。速報と確定記録が異なる場合は、確定後に更新します。

fixture、lineup、score、stats、写真、analysisを入力情報なしに補完しません。三策、戦術分析、独自summaryはeditorialであり、公式記録へ混在させません。

## Troubleshooting

- NEXTが変わらない：status、kickoffAt、fixtureのカテゴリー、過去fixture除外を確認する。
- LASTが変わらない：`finished`、home/away score、kickoffAtが揃っているか確認する。
- detailが404：`detailMatchId`と対象Match IDの一致、routeのカテゴリーを確認する。
- validator error：Match ID、field、schedule値、Match値を確認し、データを勝手に修正しない。
- validator warning：competition/roundや表記差を確認する。TOPはscheduleとMatchの役割を分ける。
- TBD：未確定の日時・会場・対戦相手を確定値に変換しない。
- postponed / cancelled：既存status modelとselectorの除外条件を確認する。

## 現在の次戦を使った入力例

以下は更新データを捏造しないための記入例です。未確定値はplaceholderのままにします。

```text
【試合終了後更新】

カテゴリー：TOP
対象試合：09.02 ヴィッセル神戸
status：finished

HOMEチーム：東京ヴェルディ
AWAYチーム：ヴィッセル神戸
home score：<公式確定値>
away score：<公式確定値>
前半 home score：<公式確認時のみ>
前半 away score：<公式確認時のみ>

得点：<公式試合速報から転記>
カード：<公式試合速報から転記>
交代：<公式試合速報から転記>
Starting XI：<公式発表から転記>
ベンチ：<公式発表から転記>
formation：<公式確認時のみ>
stats：<公式記録から転記>
公式記録URL：<URL>
補足：
```

この例は入力形式の確認用であり、placeholderを実データへ置き換えるまで試合データを変更しません。

## 手入力と自動反映の境界

人が確認・入力するものは、fixture情報、公式記録、lineup、goals、cards、substitutions、stats、analysis、写真です。入力後のNEXT、NEXT5、LAST、HISTORY、カード表示、fixtureMeta変換、TOP cross-source validationは既存基盤が自動導出します。

このサイトは非公式ファンプロジェクトです。公式発表と独自分析を明確に分け、クラブ・リーグ・大会との公式関係を示唆しない表現を維持します。
