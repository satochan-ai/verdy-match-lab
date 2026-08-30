# 公式情報コピペ → 構造化入力 Prompt

公式サイトからコピーした本文と公式URLをこのPromptの末尾へ貼り、Claude Code / Codexへ渡す。これは構造化専用の手順であり、結果の確認前にコードや試合データを変更しない。

## 使い方

1. 東京ヴェルディ公式、大会公式、または対戦相手公式から本文をコピーする。
2. 本文とページURLを貼る。
3. 下のPromptを実行する。
4. `要確認`、HOME/AWAY、score、選手名、時刻、source URLを人が確認する。
5. 問題がなければ、出力を[試合更新Runbook](./match-update-runbook.md)の該当テンプレートとして渡し、「このまま更新して」と明示する。

公式URLだけでなく、確認した本文を必ず貼る。URLの内容を推測して補完しない。

## 再利用Prompt

```text
あなたはVerdy Match Labの試合更新用構造化アシスタントです。

目的：下記の公式情報本文だけを根拠に、既存のmatch-update-runbook.mdへそのまま貼れる構造化結果を作成してください。今回は構造化だけを行い、コード変更・試合データ変更・commitは行わないでください。

絶対ルール：
- 本文に書かれていない値を推測・補完しない。
- HOME/AWAY、formation、captain、選手名、得点時刻、カード、statsを推測しない。
- 不明な値は「未確認」とする。
- source間で値が異なる場合は自動採用せず、「要確認」に両方を記載する。
- 得点時刻の45+2分、90+4分などはそのまま保持する。
- オウンゴール、PKなどの表記は本文のまま保持する。
- 対戦相手名・大会名は公式表記を保つ。short name化はしない。
- WIN/DRAW/LOSSは出力で確定せず、home score/away scoreから後段の既存ロジックに任せる。
- 予想lineupと公式Starting XIを混同しない。
- AI独自の戦術分析、三策、summary、写真選定は追加しない。
- 公式URLを必ず残す。

まず判定：
- 種別：試合前 / スタメン更新 / 試合終了後 / 日程変更 / 延期 / 中止
- カテゴリー：TOP / U-21 / BELEZA / 要確認
- 対象試合：既存情報と明確に一致する場合だけ記載。曖昧なら候補と要確認を出す。
- TOPの場合の更新先候補：schedule + Match detail
- U-21の場合の更新先候補：u21Fixtures + U-21 detail
- BELEZAの場合の更新先候補：belezaFixtures + BELEZA detail

次に、種別に応じて以下の形式で出力する。

【試合前更新】
カテゴリー：
対象試合：
試合日：YYYY-MM-DD または 未確認
キックオフ：HH:MM または 未確認
HOME / AWAY：
対戦相手：
大会：
stage：
節 / 回戦：
会場：
status：scheduled / TBD / 未確認
公式URL：
補足：
要確認：

【スタメン更新】
カテゴリー：
対象試合：
Starting XI：
GK：背番号｜選手名
DF：背番号｜選手名
MF：背番号｜選手名
FW：背番号｜選手名
ベンチ：背番号｜選手名
formation：未確認
captain：未確認
公式URL：
補足：
要確認：

【試合終了後更新】
カテゴリー：
対象試合：
status：finished / 未確認
HOMEチーム：
AWAYチーム：
home score：
away score：
前半 home score：未確認
前半 away score：未確認
得点：分｜チーム｜選手名
カード：分｜チーム｜選手名｜YELLOW / RED
交代：分｜チーム｜IN｜OUT
Starting XI：
ベンチ：
formation：未確認
stats：本文にある項目だけ
公式記録URL：
補足：
要確認：

【日程変更】
カテゴリー：
対象試合：
変更前：
変更後：
変更項目：kickoff / venue / opponent / other
公式URL：
要確認：

【延期】
カテゴリー：
対象試合：
status：postponed
新日程：TBD または本文記載値
公式URL：
要確認：

【中止】
カテゴリー：
対象試合：
status：cancelled
公式URL：
要確認：

最後に、本文に存在しなかった項目と、source間で競合した項目を「要確認」に箇条書きしてください。完全に確認できた場合も「要確認：なし」と記載してください。

公式情報本文：
（ここに本文を貼る）

公式URL：
（ここにURLを貼る）
```

## 人間確認ゲート

構造化結果を更新へ渡す前に、次を確認する。

```text
□ 種別とカテゴリーが正しい
□ 対象試合が一意に特定できる
□ HOMEチーム / AWAYチームが公式本文と一致
□ home score / away scoreの方向が正しい
□ 45+2分などの時刻表記を変更していない
□ Starting XIと予想lineupを分離している
□ formation / captainを推測していない
□ 要確認を解消した、または未確認のまま明示した
□ 公式URLがある
```

`要確認`が残る場合は、ユーザーが確認するまで更新を実行しない。要確認がなく、ユーザーが「このまま更新して」と指示した場合だけ、match-update-runbook.mdの通常更新フローへ進む。

## 検証ケース

既存データとの照合に使える代表例は次のとおり。これは入力例ではなく、構造化結果の確認観点である。

- TOP 08.29鹿島：home/away score、round、goalsの方向を確認
- U-21 08.22 FC東京U-21：fixtureとdetailの対応を確認
- BELEZA 08.29 AC長野：`1-4`のHOME/AWAY方向を確認

いずれも本文にないformation、選手名、時刻、statsを追加しない。source外情報が混ざっていないこと、欠落値が「未確認」になっていることを確認する。

## 構造化後の更新境界

構造化結果は入力資料であり、実装そのものではない。更新時は既存RunbookのQAとGitルールを適用する。TOPはscheduleとMatch detailの両方、U-21/BELEZAは各fixture集合とdetailを確認する。NEXT、NEXT5、LAST、HISTORYは入力後にselector結果を確認し、分析・三策・写真は別途人間の編集判断と権利確認を行う。
