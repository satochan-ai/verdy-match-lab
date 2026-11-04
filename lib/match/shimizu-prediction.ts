import type { PredictionPlayer } from "./prediction";

export const shimizuFormation = "4-4-2";

/** 前線からGK、各ラインは画面左から右。Verdy Match Labの独自予想（公式発表のスタメンではない）。
 * 長崎戦の公式開始時配置（染野左・一美右、平川左・齋藤右）を基準に、齋藤功佑→森田晃樹の1人変更。
 */
export const shimizuPredictionRows: PredictionPlayer[][] = [
  [{ name: "染野唯月", role: "FW" }, { name: "一美和成", role: "FW" }],
  [{ name: "新井悠太", role: "LM" }, { name: "平川怜", role: "CM" }, { name: "森田晃樹", role: "CM" }, { name: "藤本寛也", role: "RM" }],
  [{ name: "溝口修平", role: "LB" }, { name: "チョ ユミン", role: "CB", nameBreak: "チョ " }, { name: "林尚輝", role: "CB" }, { name: "内田陽介", role: "RB" }],
  [{ name: "マテウス", role: "GK" }],
];

// 背番号はJリーグ公式記録（長崎戦・福岡戦）で照合。
export const shimizuPredictionNumbers: Record<string, number> = {
  "マテウス": 1, "溝口修平": 18, "チョ ユミン": 96, "林尚輝": 4,
  "内田陽介": 22, "新井悠太": 40, "平川怜": 16, "森田晃樹": 10,
  "藤本寛也": 19, "染野唯月": 9, "一美和成": 33,
};

export const shimizuPredictionSources = [
  { label: "Jリーグ公式：清水戦の試合情報", url: "https://www.jleague.jp/match/j1/2026/110706/" },
  { label: "Jリーグ公式記録：長崎戦の先発・交代", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34641" },
  { label: "Jリーグ公式記録：福岡戦の交代", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34628" },
  { label: "Jリーグ公式記録：横浜FM戦の交代", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34619" },
];

export function shouldShowShimizuPrediction(fixture: { id: string; status: string } | null | undefined) {
  return fixture?.id === "sched-shimizu" && ["scheduled", "live", "half_time"].includes(fixture.status);
}
