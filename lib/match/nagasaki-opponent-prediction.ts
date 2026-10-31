import type { PredictionPlayer } from "./prediction";

export const nagasakiOpponentFormation = "3-4-2-1";

/** 東京V戦の独自予想。前線からGK、各ラインは画面左→右。公式配置とは区別する。 */
export const nagasakiOpponentRows: PredictionPlayer[][] = [
  [{ name: "ジョナタン ジュニオール", role: "FW", nameBreak: "ジョナタン " }],
  [{ name: "松本天夢", role: "ST", alternative: "候補：澤田崇" }, { name: "マテウス ジェズス", role: "ST", nameBreak: "マテウス " }],
  [{ name: "翁長聖", role: "LWB" }, { name: "長谷川元希", role: "CM" }, { name: "山口蛍", role: "CM" }, { name: "米田隼也", role: "RWB" }],
  [{ name: "江川湧清", role: "CB", alternative: "候補：大南拓磨" }, { name: "新井一耀", role: "CB" }, { name: "土肥幹太", role: "CB" }],
  [{ name: "後藤雅明", role: "GK" }],
];

// Jリーグ公式記録の氏名・背番号を2026-11-01に照合（外国籍選手の区切りは公式表記の空白）。
export const nagasakiOpponentNumbers: Record<string, number> = {
  "後藤雅明": 1, "江川湧清": 6, "新井一耀": 29, "土肥幹太": 31,
  "翁長聖": 22, "長谷川元希": 41, "山口蛍": 5, "米田隼也": 23,
  "松本天夢": 34, "マテウス ジェズス": 10, "ジョナタン ジュニオール": 99,
};

export const nagasakiOpponentSources = [
  { label: "Jリーグ公式記録：長崎の千葉戦", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34601" },
  { label: "Jリーグ公式記録：長崎の鹿島戦", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34613" },
  { label: "Jリーグ公式記録：長崎の広島戦", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34625" },
  { label: "Jリーグ公式記録：長崎の浦和戦", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34631" },
  { label: "Jリーグ公式サイト：浦和戦の配置図（前半0分を選択）", url: "https://www.jleague.jp/match/j1/2026/102503/#lineup" },
];
