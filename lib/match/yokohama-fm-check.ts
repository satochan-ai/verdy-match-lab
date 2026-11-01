import type { ActualLineup, MatchSubstitution } from "../../types/domain";
import { fcTokyoResult } from "../mock/top-fc-tokyo-result.ts";
import { yokohamaFmResult } from "../mock/top-yokohama-fm-result.ts";
import { marinosFormation, marinosYokohamaRows, verdyFormation, verdyYokohamaRows } from "./yokohama-fm-content.ts";

/**
 * 10/21 横浜FM戦の予想スタメンと公式先発の答え合わせ。予想データ（yokohama-fm-content.ts）は変更せず、
 * 公式結果（top-yokohama-fm-result.ts）と突き合わせるだけの純関数。ピッチ上の役割（SH・ボランチ等）は
 * 開始時フォーメーションが公式で確認できないため判定せず、選手単位で判定する。
 */
export type Appearance = "先発" | "途中出場" | "ベンチ入り（出場なし）" | "メンバー外";

// 横浜FM公式 10/17千葉戦の先発11名（入れ替え予想の基準）。試合データには追加しない。
const marinosPreviousXi = ["朴 一圭", "木村 卓斗", "ジェイソン・キニョーネス", "諏訪間 幸成", "鈴木 冬一", "山根 陸", "松村 晃助", "天野 純", "近藤 友喜", "谷村 海那", "宮市 亮"];

const norm = (name: string) => name.replace(/^\d+\s+/, "").replace(/[\s・･]/g, "");
const names = (groups: ActualLineup["starters"]) => Object.values(groups).flat().map((p) => p.replace(/^\d+\s+/, ""));

export type TeamCheck = {
  teamName: string;
  predictedFormation: string;
  /** 公式で確認できた開始時フォーメーション。未確認ならundefined。 */
  actualFormation?: string;
  formationVerdict: "一致" | "不一致" | "判定保留";
  matched: string[];
  predictedNotStarted: { name: string; appearance: Appearance }[];
  startedNotPredicted: string[];
  changes: { entrants: { name: string; started: boolean }[]; leavers: { name: string; started: boolean }[]; correct: number; total: number };
  keyPlayers: { name: string; appearance: Appearance }[];
};

function appearanceOf(name: string, lineup: ActualLineup, subs: MatchSubstitution[], teamName: string): Appearance {
  const key = norm(name);
  if (names(lineup.starters).some((n) => norm(n) === key)) return "先発";
  if (subs.some((s) => s.team === teamName && norm(s.playerIn) === key)) return "途中出場";
  if (names(lineup.bench).some((n) => norm(n) === key)) return "ベンチ入り（出場なし）";
  return "メンバー外";
}

function buildTeamCheck(args: {
  teamName: string; predicted: string[]; previousXi: string[]; lineup: ActualLineup; subs: MatchSubstitution[];
  predictedFormation: string; keyPlayers: string[];
}): TeamCheck {
  const { teamName, predicted, previousXi, lineup, subs, predictedFormation, keyPlayers } = args;
  const started = names(lineup.starters);
  const startedKeys = new Set(started.map(norm));
  const predictedKeys = new Set(predicted.map(norm));
  const previousKeys = new Set(previousXi.map(norm));
  const entrants = predicted.filter((n) => !previousKeys.has(norm(n)));
  const leavers = previousXi.filter((n) => !predictedKeys.has(norm(n)));
  const entrantRows = entrants.map((name) => ({ name, started: startedKeys.has(norm(name)) }));
  const leaverRows = leavers.map((name) => ({ name, started: startedKeys.has(norm(name)) }));
  const actualFormation = lineup.formation;
  return {
    teamName, predictedFormation, actualFormation,
    formationVerdict: actualFormation === undefined ? "判定保留" : actualFormation === predictedFormation ? "一致" : "不一致",
    matched: predicted.filter((n) => startedKeys.has(norm(n))),
    predictedNotStarted: predicted.filter((n) => !startedKeys.has(norm(n))).map((name) => ({ name, appearance: appearanceOf(name, lineup, subs, teamName) })),
    startedNotPredicted: started.filter((n) => !predictedKeys.has(norm(n))),
    // 入れ替え予想：新たに起用すると予想した選手が先発、外すと予想した選手が非先発なら的中。
    changes: {
      entrants: entrantRows, leavers: leaverRows,
      correct: entrantRows.filter((r) => r.started).length + leaverRows.filter((r) => !r.started).length,
      total: entrantRows.length + leaverRows.length,
    },
    keyPlayers: keyPlayers.map((name) => ({ name, appearance: appearanceOf(name, lineup, subs, teamName) })),
  };
}

const subs = yokohamaFmResult.substitutions ?? [];
const verdyPreviousXi = names(fcTokyoResult.actualLineups!.home.starters);

export const yokohamaFmPredictionCheck: { verdy: TeamCheck; marinos: TeamCheck } = {
  verdy: buildTeamCheck({
    teamName: "東京ヴェルディ", predicted: verdyYokohamaRows.flat().map((p) => p.name), previousXi: verdyPreviousXi,
    lineup: yokohamaFmResult.actualLineups!.away, subs, predictedFormation: verdyFormation,
    keyPlayers: ["長沢 祐弥", "内田 陽介", "平川 怜", "熊取谷 一星", "一美 和成"],
  }),
  marinos: buildTeamCheck({
    teamName: "横浜F・マリノス", predicted: marinosYokohamaRows.flat().map((p) => p.name), previousXi: marinosPreviousXi,
    lineup: yokohamaFmResult.actualLineups!.home, subs, predictedFormation: marinosFormation,
    keyPlayers: ["知念 慶", "ジョルディ・クルークス", "谷村 海那"],
  }),
};
