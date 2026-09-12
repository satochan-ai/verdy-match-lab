import type { UpcomingFixture } from "../../types/domain";
import type { CommonFixture } from "../types/fixture";
import { u21Match, u21Match1, u21UpcomingMatches } from "../mock/u21.ts";

const TEAM_NAME = "東京ヴェルディU-21";
const competition = "2026/27 U-21 Jリーグ";

export const u21Fixtures: CommonFixture[] = [
  {
    // EAST 第1節（FC東京U-21）アーカイブ。詳細ページはu21Matchの1件のみを描画するため、
    // 昇格後はdetailMatchIdを設定しない（BELEZAのbelezaMatch1と同じ既知の制約）。
    id: u21Match1.id,
    category: "u21",
    teamName: TEAM_NAME,
    opponentName: u21Match1.awayTeamName,
    competition: { name: competition, round: "EAST 第1節" },
    kickoffAt: u21Match1.kickoffAt,
    kickoffStatus: "confirmed",
    dateLabel: "08.22",
    venue: u21Match1.venue,
    isHome: true,
    status: "finished",
    score: { home: u21Match1.homeScore, away: u21Match1.awayScore },
    sourceUrl: "https://www.jleague.jp/match/u-21/2026/082229/",
  },
  {
    // 現在表示中の1試合（東西リーグラウンド第2節・U-21浦和レッズ戦）。公式結果確認済みの
    // ためstatus/scoreはu21Matchの値をそのまま反映する（finished時のみscoreを設定）。
    id: u21Match.id,
    category: "u21",
    teamName: TEAM_NAME,
    opponentName: u21Match.isVerdyHome ? u21Match.awayTeamName : u21Match.homeTeamName,
    competition: { name: u21Match.fixtureMeta.competition, round: u21Match.fixtureMeta.roundLabel },
    kickoffAt: u21Match.kickoffAt,
    kickoffStatus: "confirmed",
    dateLabel: "09.12",
    venue: u21Match.venue,
    isHome: u21Match.isVerdyHome,
    status: u21Match.status,
    score: u21Match.status === "finished" && u21Match.homeScore !== undefined && u21Match.awayScore !== undefined
      ? { home: u21Match.homeScore, away: u21Match.awayScore }
      : undefined,
    sourceUrl: "https://www.jleague.jp/match/u-21/2026/091225/",
    detailMatchId: u21Match.id,
  },
  ...u21UpcomingMatches.map((fixture, index) => ({
    id: fixture.id,
    category: "u21" as const,
    teamName: TEAM_NAME,
    opponentName: fixture.opponentName,
    competition: { name: fixture.fixtureMeta.competition, round: fixture.fixtureMeta.roundLabel },
    kickoffAt: ["2026-09-20T14:00:00+09:00", "2026-10-03T15:00:00+09:00", "2026-10-17T15:00:00+09:00", undefined][index],
    kickoffStatus: index === 3 ? "date_range" as const : "confirmed" as const,
    dateLabel: fixture.dateLabel,
    isHome: fixture.isHome,
    status: "scheduled" as const,
  })),
];

const toMeta = (fixture: CommonFixture) => ({
  competition: fixture.competition.name,
  stage: fixture.id === "u21-next-5" ? "交流戦ラウンド" : "東西リーグラウンド",
  roundLabel: fixture.competition.round,
});

const kickoffLabel = (fixture: CommonFixture) => {
  if (!fixture.kickoffAt) return "TBD";
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(fixture.kickoffAt));
};

export const toU21UpcomingMatch = (fixture: CommonFixture): UpcomingFixture => ({
  id: fixture.id,
  dateLabel: fixture.dateLabel ?? "TBD",
  kickoffLabel: kickoffLabel(fixture),
  fixtureMeta: toMeta(fixture),
  isHome: fixture.isHome,
  opponentName: fixture.opponentName,
  venue: fixture.venue,
});

export type U21SeasonHistoryView = {
  id: string;
  dateLabel: string;
  round: string;
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  result: "win" | "draw" | "loss";
};

export const toU21SeasonHistoryEntry = (fixture: CommonFixture): U21SeasonHistoryView => {
  const score = fixture.score!;
  const homeTeamName = fixture.isHome ? TEAM_NAME : fixture.opponentName;
  const awayTeamName = fixture.isHome ? fixture.opponentName : TEAM_NAME;
  const verdyScore = fixture.isHome ? score.home : score.away;
  const opponentScore = fixture.isHome ? score.away : score.home;
  return {
    id: fixture.id,
    dateLabel: fixture.dateLabel ?? "TBD",
    round: fixture.competition.round ?? "",
    homeTeamName,
    awayTeamName,
    homeScore: score.home,
    awayScore: score.away,
    result: verdyScore === opponentScore ? "draw" : verdyScore > opponentScore ? "win" : "loss",
  };
};
