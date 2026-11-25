import type { ActualLineup, Match, PredictedLineup } from "@/types/domain";
import { mitoStrategies } from "../match/mito-preview.ts";

const homeTeam = { id: "mito-hollyhock", name: "水戸ホーリーホック", isVerdy: false };
const awayTeam = { id: "verdy", name: "東京ヴェルディ", isVerdy: true };
const summaryUrl = "https://www.jleague.jp/match/j1/2026/112501/";
const recordUrl = "https://data.j-league.or.jp/SFMS02/?match_card_id=34666";
const profile = { formation: "4-4-2", characteristics: { attack: "", defense: "" }, keyPlayers: [], recentTrend: "" };

const homeStarters = {
  GK: ["27 ヤクブ スウォビィク"],
  DF: ["25 真瀬 拓海", "15 木本 恭生", "17 板倉 健太", "3 大崎 航詩"],
  MF: ["20 舩橋 佑", "19 仙波 大志", "16 田村 遊吏", "44 西原 源樹"],
  FW: ["9 根本 凌", "30 奥村 仁"],
};
const awayStarters = {
  GK: ["1 マテウス"],
  DF: ["35 田邉 秀斗", "4 林 尚輝", "29 佐古 真礼", "18 溝口 修平"],
  MF: ["14 福田 湧矢", "10 森田 晃樹", "16 平川 怜", "40 新井 悠太"],
  FW: ["9 染野 唯月", "25 熊取谷 一星"],
};
const homeBench = {
  GK: ["34 西川 幸之介"],
  DF: ["2 フォファナ マリック", "6 岡本 一真"],
  MF: ["8 加藤 千尋", "11 鳥海 芳樹", "22 谷口 海斗", "39 山本 隼大"],
  FW: ["10 渡邉 新太", "18 内野 航太郎"],
};
const awayBench = {
  GK: ["21 長沢 祐弥"],
  DF: ["15 鈴木 海音", "22 内田 陽介"],
  MF: ["7 松橋 優安", "8 齋藤 功佑", "30 川村 楽人"],
  FW: ["11 山見 大登", "33 一美 和成", "45 寺沼 星文"],
};

const planReviews = [
  { result: "miss", resultComment: "新井が17分に退場し、熊取谷が左へ。新井・溝口・平川を軸にした試合前の案は継続できなかった。" },
  { result: "partial", resultComment: "10人で前半を無失点で終えた。失点は68分のFKから。クロス対応の成否は個別のプレーを追加確認する必要がある。" },
  { result: "partial", resultComment: "69分に染野から一美、熊取谷から松橋へ交代。前線と左サイドの組み合わせを変えたが、得点には至らなかった。" },
] as const;

export const mitoResult = {
  id: "sched-mito",
  homeTeam,
  awayTeam,
  isVerdyHome: false,
  kickoffAt: "2026-11-25T19:03:00+09:00",
  venue: "水戸信用金庫スタジアム",
  status: "finished",
  homeScore: 1,
  awayScore: 0,
  timeSegment: null,
  fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第16節" },
  verdyProfile: profile,
  opponentProfile: profile,
  matchNotes: ["前半0–0、後半1–0。東京Vは17分の新井悠太の退場後、10人で戦った。"],
  focusPoints: ["東京Vの10人での配置変更", "水戸のセットプレーと交代後の配置"],
  strategies: mitoStrategies.map((strategy, index) => ({ ...strategy, ...planReviews[index] })),
  officialRecord: {
    kickoff: "19:03", attendance: 5083, weather: "晴", temperature: "5.2℃", humidity: "74%",
    referee: "先立 圭吾", assistantReferees: ["船橋 昭次", "赤阪 修"], fourthOfficial: "中村 太",
    varReferee: "木村 博之", assistantVarReferee: "平間 亮",
    sourceUrl: recordUrl,
  },
  goals: [{ minute: "68'", scorer: "木本 恭生", assist: "舩橋 佑", team: homeTeam.name }],
  cards: [
    { minute: "17'", player: "新井 悠太", team: awayTeam.name, type: "red" },
    { minute: "20'", player: "舩橋 佑", team: homeTeam.name, type: "yellow" },
    { minute: "67'", player: "熊取谷 一星", team: awayTeam.name, type: "yellow" },
  ],
  substitutions: [
    { minute: "46'", team: awayTeam.name, playerOut: "田邉 秀斗", playerIn: "内田 陽介" },
    { minute: "57'", team: homeTeam.name, playerOut: "田村 遊吏", playerIn: "谷口 海斗" },
    { minute: "69'", team: awayTeam.name, playerOut: "染野 唯月", playerIn: "一美 和成" },
    { minute: "69'", team: awayTeam.name, playerOut: "熊取谷 一星", playerIn: "松橋 優安" },
    { minute: "73'", team: homeTeam.name, playerOut: "西原 源樹", playerIn: "渡邉 新太" },
    { minute: "73'", team: homeTeam.name, playerOut: "根本 凌", playerIn: "内野 航太郎" },
    { minute: "73'", team: homeTeam.name, playerOut: "舩橋 佑", playerIn: "岡本 一真" },
    { minute: "82'", team: awayTeam.name, playerOut: "平川 怜", playerIn: "齋藤 功佑" },
    { minute: "82'", team: awayTeam.name, playerOut: "福田 湧矢", playerIn: "川村 楽人" },
    { minute: "87'", team: homeTeam.name, playerOut: "真瀬 拓海", playerIn: "加藤 千尋" },
  ],
  actualLineups: {
    home: { starters: homeStarters, bench: homeBench, manager: "森 直樹" },
    away: { starters: awayStarters, bench: awayBench, manager: "相馬 直樹" },
  },
  // Jリーグ試合サマリーのJ STATS。データサイト公式記録のSHは水戸11、東京V2。
  matchStats: {
    sourceUrl: summaryUrl,
    home: { shots: 15, shotsOnTarget: 6, possession: "65%", passSuccessRate: "85%", distance: "119.2km", sprints: 122, offsides: 3, corners: 6, freeKicks: 12, yellowCards: 1, redCards: 0 },
    away: { shots: 6, shotsOnTarget: 0, possession: "35%", passSuccessRate: "72%", distance: "113.2km", sprints: 106, offsides: 0, corners: 2, freeKicks: 13, yellowCards: 1, redCards: 1 },
  },
} satisfies Match;

export const mitoDaznStats = {
  source: "DAZN試合終了時表示",
  home: { xg: 1.53, shots: 15, shotsOnTarget: 12, possession: "64%", passes: 662, passSuccessRate: "85%", offsides: 0, corners: 6, fouls: 13, yellowCards: 1, redCards: 0 },
  away: { xg: 0.40, shots: 5, shotsOnTarget: 4, possession: "36%", passes: 360, passSuccessRate: "73%", offsides: 3, corners: 2, fouls: 10, yellowCards: 1, redCards: 1 },
};

function buildPhases(
  { starters, bench }: ActualLineup,
  phases: { label: string; formation: string; rows: number[][] }[],
): { label: string; lineup: PredictedLineup }[] {
  const roster = new Map(
    (["GK", "DF", "MF", "FW"] as const).flatMap((position) =>
      [...starters[position], ...bench[position]].map((player) => {
        const [number, ...name] = player.split(" ");
        return [Number(number), { number: Number(number), name: name.join(" "), position }] as const;
      }),
    ),
  );
  return phases.map(({ label, formation, rows }) => ({
    label,
    lineup: { formation, starters: rows.flat().map((number) => roster.get(number)!) },
  }));
}

// GKから前線の順。各行は攻撃方向を上にしたときのチーム視点の左から右。
export const mitoFormationPhases = {
  home: buildPhases(mitoResult.actualLineups.home, [
    { label: "開始", formation: "4-4-2", rows: [[27], [3, 17, 15, 25], [44, 19, 20, 16], [30, 9]] },
    { label: "57分", formation: "4-4-2", rows: [[27], [3, 17, 15, 25], [44, 19, 20, 30], [22, 9]] },
    { label: "73分", formation: "4-4-2", rows: [[27], [6, 17, 15, 25], [22, 3, 19, 30], [10, 18]] },
    { label: "87分", formation: "4-4-2", rows: [[27], [3, 17, 15, 6], [22, 19, 8, 30], [10, 18]] },
  ]),
  away: buildPhases(mitoResult.actualLineups.away, [
    { label: "開始", formation: "4-4-2", rows: [[1], [18, 29, 4, 35], [40, 16, 10, 14], [9, 25]] },
    { label: "17分", formation: "4-2-2-1", rows: [[1], [18, 29, 4, 35], [10, 16], [25, 14], [9]] },
    { label: "46分", formation: "4-2-2-1", rows: [[1], [18, 29, 4, 22], [10, 16], [25, 14], [9]] },
    { label: "69分", formation: "4-2-2-1", rows: [[1], [18, 29, 4, 22], [10, 16], [7, 14], [33]] },
    { label: "82分", formation: "4-2-2-1", rows: [[1], [18, 29, 4, 22], [10, 8], [30, 7], [33]] },
  ]),
};
