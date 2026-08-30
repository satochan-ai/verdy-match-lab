import type { Match, ScheduleMatch } from "../../types/domain";

export type TopConsistencyIssue = {
  fixtureId: string;
  detailMatchId?: string;
  field: string;
  severity: "error" | "warning";
  scheduleValue?: unknown;
  matchValue?: unknown;
  message: string;
};

const competitionNames: Record<ScheduleMatch["competition"], string> = {
  j1: "2026 J1リーグ",
  levain_cup: "ルヴァン",
  emperor_cup: "天皇杯 JFA 第106回全日本サッカー選手権大会",
};

const opponentAliases: Record<string, string> = {
  神戸: "ヴィッセル神戸", C大阪: "セレッソ大阪", 浦和: "浦和レッズ", 千葉: "ジェフユナイテッド千葉",
  柏: "柏レイソル", 川崎: "川崎フロンターレ", 岡山: "ファジアーノ岡山", 鹿島: "鹿島アントラーズ", 群馬: "ザスパ群馬",
};
const canonicalOpponent = (name: string) => opponentAliases[name] ?? name;

const issue = (schedule: ScheduleMatch, field: string, severity: "error" | "warning", scheduleValue: unknown, matchValue: unknown, message: string): TopConsistencyIssue => ({
  fixtureId: schedule.id, detailMatchId: schedule.detailMatchId, field, severity, scheduleValue, matchValue, message,
});

export const validateTopFixtureConsistency = (schedules: readonly ScheduleMatch[], matches: readonly Match[]): TopConsistencyIssue[] => {
  const byId = new Map(matches.map((match) => [match.id, match]));
  const issues: TopConsistencyIssue[] = [];
  schedules.forEach((schedule) => {
    if (!schedule.detailMatchId) return;
    const match = byId.get(schedule.detailMatchId);
    if (!match) {
      issues.push(issue(schedule, "detailMatchId", "error", schedule.detailMatchId, undefined, "detailMatchId does not resolve to a Match"));
      return;
    }
    const matchOpponent = match.isVerdyHome ? match.awayTeam.name : match.homeTeam.name;
    const checks: [string, unknown, unknown, boolean, "error" | "warning"][] = [
      ["kickoffAt", schedule.kickoffAt, match.kickoffAt, schedule.kickoffAt === match.kickoffAt, "error"],
      ["opponent", canonicalOpponent(schedule.opponentName), canonicalOpponent(matchOpponent), canonicalOpponent(schedule.opponentName) === canonicalOpponent(matchOpponent), "warning"],
      ["isVerdyHome", schedule.isVerdyHome, match.isVerdyHome, schedule.isVerdyHome === match.isVerdyHome, "error"],
      ["venue", schedule.venue, match.venue, schedule.venue === match.venue, "warning"],
      ["competition", competitionNames[schedule.competition], match.fixtureMeta?.competition, competitionNames[schedule.competition] === match.fixtureMeta?.competition, "warning"],
      ["round", schedule.round, match.fixtureMeta?.roundLabel, schedule.round === match.fixtureMeta?.roundLabel, "warning"],
      ["status", schedule.status, match.status, schedule.status === match.status, "error"],
    ];
    checks.forEach(([field, scheduleValue, matchValue, equal, severity]) => {
      if (!equal) issues.push(issue(schedule, field, severity, scheduleValue, matchValue, `${field} differs between schedule and Match`));
    });
    if (schedule.status === "finished" && match.status === "finished" && schedule.homeScore != null && schedule.awayScore != null && (schedule.homeScore !== match.homeScore || schedule.awayScore !== match.awayScore)) {
      issues.push(issue(schedule, "score", "error", { home: schedule.homeScore, away: schedule.awayScore }, { home: match.homeScore, away: match.awayScore }, "finished score differs between schedule and Match"));
    }
  });
  return issues;
};
