import type { UpcomingFixture } from "../../types/domain";
import type { CommonFixture } from "../types/fixture";
import { belezaMatch, belezaMatch1, belezaTeam, belezaUpcomingMatches } from "../mock/beleza.ts";

export const belezaFixtures: CommonFixture[] = [
  {
    id: belezaMatch1.id, category: "beleza", teamName: belezaTeam.name,
    opponentName: "ジェフユナイテッド市原・千葉レディース", competition: { name: "2026/27 WEリーグ", round: "第1節" },
    kickoffAt: belezaMatch1.kickoffAt, kickoffStatus: "confirmed", dateLabel: belezaMatch1.dateLabel,
    venue: belezaMatch1.venue, isHome: true, status: "finished", score: { home: belezaMatch1.homeScore, away: belezaMatch1.awayScore },
  },
  {
    id: belezaMatch.id, category: "beleza", teamName: belezaTeam.name,
    opponentName: belezaMatch.homeTeamName, competition: { name: "2026/27 WEリーグ", round: "第2節" },
    kickoffAt: belezaMatch.kickoffAt, kickoffStatus: "confirmed", dateLabel: belezaMatch.dateLabel,
    venue: belezaMatch.venue, isHome: belezaMatch.isBelezaHome, status: "finished",
    score: { home: belezaMatch.homeScore, away: belezaMatch.awayScore }, detailMatchId: belezaMatch.id,
    sourceUrl: "https://weleague.jp/matches/2026082925/",
  },
  ...belezaUpcomingMatches.map((fixture, index) => ({
    id: fixture.id, category: "beleza" as const, teamName: belezaTeam.name, opponentName: fixture.opponentName,
    competition: { name: fixture.fixtureMeta.competition, round: fixture.fixtureMeta.roundLabel },
    kickoffAt: ["2026-09-05T18:00:00+09:00", "2026-09-12T18:00:00+09:00", "2026-09-19T16:00:00+09:00", "2026-09-23T14:00:00+09:00", "2026-09-27T18:00:00+09:00"][index],
    kickoffStatus: "confirmed" as const, dateLabel: fixture.dateLabel, venue: fixture.venue, isHome: fixture.isHome, status: "scheduled" as const,
  })),
];

const toMeta = (fixture: CommonFixture) => ({
  competition: fixture.competition.name,
  stage: fixture.competition.name.includes("カップ") ? "リーグステージ" : undefined,
  roundLabel: fixture.competition.round,
});

export const toBelezaUpcomingMatch = (fixture: CommonFixture): UpcomingFixture => ({
  id: fixture.id, dateLabel: fixture.dateLabel ?? "TBD",
  kickoffLabel: fixture.kickoffAt ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(fixture.kickoffAt)) : "TBD",
  fixtureMeta: toMeta(fixture), isHome: fixture.isHome, opponentName: fixture.opponentName, venue: fixture.venue,
});

export type BelezaSeasonHistoryView = {
  id: string; dateLabel: string; round: string; homeTeamName: string; awayTeamName: string; homeScore: number; awayScore: number; result: "win" | "draw" | "loss";
};

export const toBelezaSeasonHistoryEntry = (fixture: CommonFixture): BelezaSeasonHistoryView => {
  const score = fixture.score!; const opponent = fixture.opponentName;
  const homeTeamName = fixture.isHome ? fixture.teamName : opponent; const awayTeamName = fixture.isHome ? opponent : fixture.teamName;
  const own = fixture.isHome ? score.home : score.away; const other = fixture.isHome ? score.away : score.home;
  return { id: fixture.id, dateLabel: fixture.dateLabel ?? "TBD", round: fixture.competition.round ?? "", homeTeamName, awayTeamName, homeScore: score.home, awayScore: score.away, result: own === other ? "draw" : own > other ? "win" : "loss" };
};
