import type { PredictionPlayer } from "../match/prediction.ts";
import { matches } from "../mock/matches.ts";

/**
 * SPECIAL ANALYSIS「城福体制から相馬体制へ。4試合で何が変わったのか？」の記事データ。
 * 先発はJリーグ公式記録ベースの既存試合データ（lib/mock）から集計し、記事内で数え直さない。
 * シュート・ゴール期待値・総移動距離・スプリント・ボール保持率は、8試合とも同一基準のFootball LAB試合レポート
 * （2026-10-26確認）。Jリーグ公式スタッツや公式記録とは集計基準が異なり、数値が一致しない項目がある。
 * ボール奪取位置・AS・MSは観戦分析用に集計した当サイトのデータで、公式データとの照合はしていない。
 */
export const ANALYSIS_SLUG = "jofuku-soma-transition";
export const ANALYSIS_PATH = `/top/analysis/${ANALYSIS_SLUG}`;
export const analysisTitle = "城福体制から相馬体制へ。4試合で何が変わったのか？";
export const analysisCard = {
  eyebrow: "SPECIAL ANALYSIS｜特別分析",
  title: "城福体制から相馬体制へ。何が変わったのか？",
  summary: "基本スタメン、運動量、ボール奪取位置、選手起用の変化を比較",
  href: ANALYSIS_PATH,
};
export const ANALYSIS_DISCLAIMER = "※本記事はVerdy Match Labによる非公式の独自分析です。戦術の意図や今後の起用を示す公式情報ではありません。";

export type Era = "jofuku" | "soma";
export type Tier = "上位" | "中位" | "下位";
export type AnalysisMatch = {
  id: string; era: Era; date: string; opponent: string; short: string; homeAway: "H" | "A";
  goalsFor: number; goalsAgainst: number; tier: Tier;
  xg: number; shots: number; distanceKm: number; sprints: number; possession: number;
  /** 平均値の計算から外す試合（理由つき）。 */
  excludedReason?: string;
  jleagueUrl: string; footballLabUrl: string;
};

const fl = (month: string, date: string) => `https://www.football-lab.jp/tk-v/report?year=2026&month=${month}&date=${date}`;
export const analysisMatches: AnalysisMatch[] = [
  { id: "match-10", era: "jofuku", date: "09.02", opponent: "ヴィッセル神戸", short: "神戸", homeAway: "H", goalsFor: 0, goalsAgainst: 2, tier: "上位", xg: 0.672, shots: 6, distanceKm: 117.036, sprints: 132, possession: 55.4, jleagueUrl: "https://www.jleague.jp/match/j1/2026/090218/", footballLabUrl: fl("09", "02") },
  { id: "match-11", era: "jofuku", date: "09.06", opponent: "セレッソ大阪", short: "C大阪", homeAway: "A", goalsFor: 0, goalsAgainst: 0, tier: "中位", xg: 0.827, shots: 5, distanceKm: 120.428, sprints: 152, possession: 36.9, jleagueUrl: "https://www.jleague.jp/match/j1/2026/090608/", footballLabUrl: fl("09", "06") },
  { id: "match-13", era: "jofuku", date: "09.13", opponent: "ジェフユナイテッド千葉", short: "千葉", homeAway: "H", goalsFor: 1, goalsAgainst: 1, tier: "下位", xg: 2.031, shots: 21, distanceKm: 112.765, sprints: 111, possession: 58.9, jleagueUrl: "https://www.jleague.jp/match/j1/2026/091302/", footballLabUrl: fl("09", "13") },
  { id: "match-14", era: "jofuku", date: "09.19", opponent: "浦和レッズ", short: "浦和", homeAway: "A", goalsFor: 1, goalsAgainst: 3, tier: "中位", xg: 0.199, shots: 5, distanceKm: 112.316, sprints: 100, possession: 52.4, jleagueUrl: "https://www.jleague.jp/match/j1/2026/091904/", footballLabUrl: fl("09", "19") },
  { id: "sched-hiroshima", era: "soma", date: "10.11", opponent: "サンフレッチェ広島", short: "広島", homeAway: "H", goalsFor: 0, goalsAgainst: 2, tier: "上位", xg: 0.715, shots: 7, distanceKm: 122.227, sprints: 117, possession: 31.9, jleagueUrl: "https://www.jleague.jp/match/j1/2026/101103/", footballLabUrl: fl("10", "11") },
  { id: "sched-fc-tokyo", era: "soma", date: "10.17", opponent: "FC東京", short: "FC東京", homeAway: "H", goalsFor: 0, goalsAgainst: 4, tier: "上位", xg: 0, shots: 0, distanceKm: 108.472, sprints: 110, possession: 23.1, excludedReason: "18分に染野唯月が退場し、ほぼ全時間を10人で戦ったため", jleagueUrl: "https://www.jleague.jp/match/j1/2026/101708/", footballLabUrl: fl("10", "17") },
  { id: "sched-yokohama-fm", era: "soma", date: "10.21", opponent: "横浜F・マリノス", short: "横浜FM", homeAway: "A", goalsFor: 2, goalsAgainst: 2, tier: "中位", xg: 0.953, shots: 12, distanceKm: 117.569, sprints: 161, possession: 41.5, jleagueUrl: "https://www.jleague.jp/match/j1/2026/102107/", footballLabUrl: fl("10", "21") },
  { id: "sched-fukuoka", era: "soma", date: "10.24", opponent: "アビスパ福岡", short: "福岡", homeAway: "H", goalsFor: 3, goalsAgainst: 1, tier: "下位", xg: 0.907, shots: 12, distanceKm: 124.537, sprints: 163, possession: 50.8, jleagueUrl: "https://www.jleague.jp/match/j1/2026/102408/", footballLabUrl: fl("10", "24") },
];

export const eraLabel: Record<Era, string> = { jofuku: "城福体制", soma: "相馬体制" };
const round = (value: number, digits: number) => Math.round(value * 10 ** digits) / 10 ** digits;
/** 単純平均（試合ごとの値を等しく扱う）。除外試合は含めない。 */
export function eraAverage(era: Era, key: "xg" | "shots" | "distanceKm" | "sprints" | "possession", digits = 2) {
  const values = analysisMatches.filter((m) => m.era === era && !m.excludedReason).map((m) => m[key]);
  return round(values.reduce((sum, v) => sum + v, 0) / values.length, digits);
}
export function eraRecord(era: Era) {
  const list = analysisMatches.filter((m) => m.era === era);
  return {
    wins: list.filter((m) => m.goalsFor > m.goalsAgainst).length,
    draws: list.filter((m) => m.goalsFor === m.goalsAgainst).length,
    losses: list.filter((m) => m.goalsFor < m.goalsAgainst).length,
    goalsFor: list.reduce((s, m) => s + m.goalsFor, 0),
    goalsAgainst: list.reduce((s, m) => s + m.goalsAgainst, 0),
  };
}

/** 観戦分析用に集計したボール奪取データ（当サイト集計・公式データ未照合）。AS・MSは全奪取回数に占める割合。 */
export type RecoveryRow = { era: Era; short: string; avgPosition: number; as: number; ms: number };
export const recoveryRows: RecoveryRow[] = [
  { era: "jofuku", short: "神戸", avgPosition: 33.3, as: 13, ms: 27 },
  { era: "jofuku", short: "C大阪", avgPosition: 32.6, as: 4, ms: 40 },
  { era: "jofuku", short: "千葉", avgPosition: 37.1, as: 12, ms: 27 },
  { era: "jofuku", short: "浦和", avgPosition: 30.8, as: 11, ms: 41 },
  { era: "soma", short: "広島", avgPosition: 38.0, as: 10, ms: 38 },
  { era: "soma", short: "横浜FM", avgPosition: 31.6, as: 4, ms: 35 },
  { era: "soma", short: "福岡", avgPosition: 37.8, as: 9, ms: 45 },
];
/** 試合単位の単純平均。奪取回数が未集計のため、回数による加重平均は算出しない。 */
export function recoveryAverage(era: Era, key: "avgPosition" | "as" | "ms") {
  const rows = recoveryRows.filter((r) => r.era === era);
  return round(rows.reduce((s, r) => s + r[key], 0) / rows.length, 2);
}

/** 先発（背番号を除いた氏名）。Jリーグ公式記録ベースの既存試合データから取得する。 */
const normalize = (player: string) => player.replace(/^\d+\s+/, "").replace(/^マテウス ヴィドット$/, "マテウス");
export function startersOf(matchId: string): string[] {
  const match = matches.find((m) => m.id === matchId);
  const side = match && (match.isVerdyHome ? match.actualLineups?.home : match.actualLineups?.away);
  if (!side) throw new Error(`starters not found: ${matchId}`);
  return Object.values(side.starters).flat().map(normalize);
}
export type StartCount = { name: string; jofuku: number; soma: number };
export function startCounts(): StartCount[] {
  const counts = new Map<string, StartCount>();
  for (const m of analysisMatches) {
    for (const name of startersOf(m.id)) {
      const entry = counts.get(name) ?? { name, jofuku: 0, soma: 0 };
      entry[m.era] += 1;
      counts.set(name, entry);
    }
  }
  return [...counts.values()].sort((a, b) => b.jofuku + b.soma - (a.jofuku + a.soma) || b.soma - a.soma || a.name.localeCompare(b.name, "ja"));
}

// 代表スタメン。rowsは上段＝FW、下段＝GK、各行は画面左→右（左サイドが左）。配置はJリーグ公式フォーメーション「前半0分」。
/** 城福体制：直近4試合で3試合以上先発した11人。千葉戦・浦和戦はこの11人が同じ配置で先発した。 */
export const jofukuRepresentative = {
  formation: "3-4-2-1",
  basisMatchIds: ["match-13", "match-14"],
  reason: "直近4試合で3試合以上先発した選手がちょうど11人。千葉戦と浦和戦は、この11人が同じ配置（Jリーグ公式フォーメーション「前半0分」）で先発しています。",
  rows: [
    [{ name: "染野 唯月", role: "CF" }],
    [{ name: "福田 湧矢", role: "シャドー" }, { name: "平尾 勇人", role: "シャドー" }],
    [{ name: "溝口 修平", role: "左WB" }, { name: "平川 怜", role: "中央MF" }, { name: "齋藤 功佑", role: "中央MF" }, { name: "新井 悠太", role: "右WB" }],
    [{ name: "井上 竜太", role: "左CB" }, { name: "林 尚輝", role: "CB" }, { name: "鈴木 海音", role: "右CB" }],
    [{ name: "マテウス", role: "GK" }],
  ] as PredictionPlayer[][],
  numbers: { "染野 唯月": 9, "福田 湧矢": 14, "平尾 勇人": 71, "溝口 修平": 18, "平川 怜": 16, "齋藤 功佑": 8, "新井 悠太": 40, "井上 竜太": 5, "林 尚輝": 4, "鈴木 海音": 15, "マテウス": 1 } as Record<string, number>,
};
/** 相馬体制：初勝利の福岡戦。横浜FM戦から1人だけの変更で、直近の選考を最もよく表す。 */
export const somaRepresentative = {
  formation: "4-4-2",
  basisMatchIds: ["sched-fukuoka"],
  reason: "横浜FM戦で先発5人を入れ替えた後、福岡戦は変更1人（鈴木海音→内田陽介）。10人が2試合続けて先発しており、現時点の選考を最もよく表すと判断しました。ただし両試合とも染野唯月は出場停止で、広島戦・FC東京戦は染野・キム ヒョンウの2トップでした。",
  rows: [
    [{ name: "熊取谷 一星", role: "FW" }, { name: "一美 和成", role: "FW" }],
    [{ name: "新井 悠太", role: "左MF" }, { name: "平川 怜", role: "中央MF" }, { name: "齋藤 功佑", role: "中央MF" }, { name: "藤本 寛也", role: "右MF" }],
    [{ name: "溝口 修平", role: "左SB" }, { name: "チョ ユミン", role: "CB" }, { name: "林 尚輝", role: "CB" }, { name: "内田 陽介", role: "右SB" }],
    [{ name: "マテウス", role: "GK" }],
  ] as PredictionPlayer[][],
  numbers: { "熊取谷 一星": 25, "一美 和成": 33, "新井 悠太": 40, "平川 怜": 16, "齋藤 功佑": 8, "藤本 寛也": 19, "溝口 修平": 18, "チョ ユミン": 96, "林 尚輝": 4, "内田 陽介": 22, "マテウス": 1 } as Record<string, number>,
};

/** 先発回数の変化の分類。出場停止による欠場は選考による変更と分けて扱う。 */
export const lineupChanges = {
  continued: ["マテウス", "林 尚輝", "溝口 修平", "平川 怜", "齋藤 功佑", "新井 悠太"],
  increased: ["藤本 寛也", "熊取谷 一星", "一美 和成", "チョ ユミン", "柴戸 海", "キム ヒョンウ"],
  dropped: ["井上 竜太", "平尾 勇人", "福田 湧矢", "鈴木 海音"],
  suspended: ["染野 唯月"],
};
