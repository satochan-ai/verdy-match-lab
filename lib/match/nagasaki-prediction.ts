import type { PredictionPlayer } from "./prediction";

export const nagasakiFormation = "4-4-2";

/** 前線からGK、各ラインは画面左から右。観戦者提供の独自予想。 */
export const nagasakiPredictionRows: PredictionPlayer[][] = [
  [{ name: "一美和成", role: "FW" }, { name: "熊取谷一星", role: "FW" }],
  [{ name: "新井悠太", role: "LM" }, { name: "平川怜", role: "CM" }, { name: "齋藤功佑", role: "CM" }, { name: "藤本寛也", role: "RM" }],
  [{ name: "溝口修平", role: "LB" }, { name: "佐古真礼", role: "CB" }, { name: "チョ ユミン", role: "CB", nameBreak: "チョ " }, { name: "内田陽介", role: "RB" }],
  [{ name: "マテウス", role: "GK" }],
];

export const nagasakiPredictionNumbers: Record<string, number> = {
  "マテウス": 1, "溝口修平": 18, "佐古真礼": 29, "チョ ユミン": 96,
  "内田陽介": 22, "新井悠太": 40, "平川怜": 16, "齋藤功佑": 8,
  "藤本寛也": 19, "一美和成": 33, "熊取谷一星": 25,
};

export const nagasakiPredictionSources = [
  { label: "Jリーグ公式：長崎戦の日程・試合情報", url: "https://www.jleague.jp/match/j1/2026/110103/" },
  { label: "Jリーグ公式記録：福岡戦の出場選手・背番号", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34628" },
];

export function shouldShowNagasakiPrediction(fixture: { id: string; status: string } | null | undefined) {
  return fixture?.id === "sched-nagasaki" && ["scheduled", "live", "half_time"].includes(fixture.status);
}
