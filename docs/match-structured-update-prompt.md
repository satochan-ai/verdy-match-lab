# 構造化結果 → コード更新 Prompt

このPromptは、[公式情報構造化Prompt](./match-source-structuring-prompt.md)で作成し、人間が確認したRunbook形式の結果を実装へ渡すためのものです。構造化だけの段階では使用せず、確認済みの入力に対してのみ使用してください。

## 使い方

次のように貼り付けます。

```text
以下の構造化結果で更新してください。

（人間確認済みの試合前／スタメン／試合終了後／変更情報）

要確認：なし
```

`要確認`が残っている場合、HOME/AWAY・対象試合・必須score・source競合が未解決の場合は、コードを変更せず不足項目だけを報告します。任意項目（formation、captain、statsなど）だけが未確認の場合は、確定部分のみ更新できるかを判断します。

## 再利用Prompt

```text
あなたはVerdy Match Labの更新担当です。以下の確認済み構造化結果を、既存のmatch-update-runbook.mdとプロジェクトのdata architectureに従って実装してください。

開始前：
1. 現在branch、status、HEAD、origin/masterを確認する。
2. 最新origin/masterから今回専用の新branchを作成する。merge済みbranchを再利用しない。
3. 対象カテゴリー、対象fixture、detailMatchIdを既存データと照合する。
4. 変更対象fixture、detail、変更しないfieldを整理してから編集する。

実装開始条件：
- カテゴリーが確定している。
- 対象試合が一意に確定している。
- HOME/AWAYが確定している。
- 試合終了後の場合、status=finished、home score、away scoreが確定している。
- 要確認が解消されている。

停止条件：
- 対象試合が曖昧。
- HOME/AWAYまたはscore方向が不明。
- 必須情報が未確認。
- source間の競合が残っている。
- 入力にない値を追加しないと実装できない。

更新routing：
- TOPの試合前・日程変更：schedule source（lib/mock/schedule.ts）とtopFixtures/CommonFixtureの関係を確認する。
- TOPの試合後・スタメン・detail：Match detail層（lib/mock/matches.tsまたはDB-compatible Match）を確認する。scheduleのstatus/scoreと一致させ、detailMatchIdを維持する。
- U-21：u21FixturesとU-21 detailを確認する。
- BELEZA：belezaFixturesとBELEZA detailを確認する。
- 入力に含まれない既存field、予想lineup、三策、独自analysis、summary、写真は変更しない。
- actual lineupはpredicted lineupを上書きせず、actualLineupsへ入れる。
- WIN/DRAW/LOSSは重複保存せず、既存ロジックから導出する。
- TOPのNEXT/NEXT5/HOMEはschedule/CommonFixtureが一次sourceであり、DB基準へ変更しない。

種別ごとの変更：
- 試合前：fixtureの日時、会場、対戦相手、大会、stage、round、statusなど、入力にあるfixture項目だけ。
- スタメン：公式Starting XI、bench、公式に明記されたformation/captain、officialRecordだけ。
- 試合終了後：status、HOME/AWAY score、得点、カード、交代、actual lineup、stats、officialRecordのうち提供された項目だけ。
- 日程変更：該当するkickoff、venue、opponentなどだけ。NEXT/NEXT5の追随を確認する。
- 延期・中止：既存status modelの値を使う。新日程未定を推測しない。

安全確認：
- scoreはHOME/AWAYの方向を保つ。東京V視点へ勝手に変換しない。
- 45+2分、90+4分などの時刻を通常分へ変換しない。
- 得点者、カード、交代、formation、statsを本文にない場合は作らない。
- officialRecord/sourceUrlは公式URLを保持する。
- 写真はsource、権利、maskingを確認できない限り変更しない。

更新後：
1. TOPはCommonFixture validationとvalidateTopFixtureConsistencyを実行し、errors/warningsを報告する。
2. U-21/BELEZAはvalidateFixturesを実行し、error=0を確認する。
3. NEXT、NEXT5、LAST、HISTORY、HOME、detail routeをカテゴリーに応じて確認する。
4. npm test、npx tsc --noEmit、npm run lint、npm run build、git diff --checkを実行する。
5. 別試合・別カテゴリー・Editorial Layer・保護WIPがdiffに入っていないことを確認する。
6. 問題がなければ対象ファイルだけをcommitし、push、PR、PR diff確認、通常merge、master同期、Production確認を行う。
7. Vercel CLIで直接deployしない。GitHub merge後の自動deployだけを使う。

最終報告には、対象fixture、変更ファイル、変更しなかったfield、validation結果、QA、Git/PR、Production、未確認事項を含める。
```

## Routingのdry-run基準

実データを変更せず、次のように変更先だけを確認できます。

| 入力 | fixture側 | detail側 | 更新後の確認 |
|---|---|---|---|
| TOP 08.29鹿島 | `schedule.ts` / `topFixtures` | `matches.ts`の`match-9` | scheduleとMatch、Archive、detail |
| U-21 08.22 FC東京U-21 | `u21Fixtures` | U-21 detail | fixture validation、LAST、HISTORY、HOME |
| BELEZA 08.29 AC長野 | `belezaFixtures` | BELEZA detail | fixture validation、HOME/AWAY score方向、LAST、HISTORY |

このdry-runはrouting確認用であり、現在のfixtureや公式記録を変更しません。

## Human gate

確認済み入力でも、実装直前に次を再確認します。

```text
□ 要確認：なし、または任意項目だけ
□ 対象試合が一意
□ HOME/AWAYとscore方向が確定
□ TOPならscheduleとMatch detailの両方を特定
□ 入力にないfieldを変更しない計画になっている
□ predicted / actualを分離している
□ 公式URLがある
```

## 更新しないもの

このPromptはデータ更新用であり、次の編集判断は自動化しません。

- 軍師の三策
- 独自の戦術分析・summary
- 公式情報にないformation、選手、stats
- 写真の選定・権利確認
- DB schema、migration、seed、Production環境変数
