import type { UpcomingFixture } from "../../types/domain";
import { belezaOmiyaLeagueMatch } from "../mock/beleza-omiya-league.ts";
import { belezaElfenLeagueMatch } from "../mock/beleza-elfen-league.ts";
import { belezaCerezoLeagueMatch } from "../mock/beleza-cerezo-league.ts";
import { belezaReginaLeagueMatch } from "../mock/beleza-regina-league.ts";
import { belezaStellaLeagueMatch } from "../mock/beleza-stella-league.ts";
import type { CommonFixture } from "../types/fixture";
import { belezaMatch, belezaMatch1, belezaMatch2, belezaMatch3, belezaMatch4, belezaMatch5, belezaUrawaCupMatch, belezaReginaMatch, belezaTeam, belezaUpcomingMatches } from "../mock/beleza.ts";

/** 11/14以降の確定日程の出典（WEリーグ公式試合ページ、2026-11-09確認）。 */
const weLeagueMatchPages: Record<string, string> = {
  "beleza-next-14": "https://weleague.jp/matches/2026111411/",
  "beleza-next-15": "https://weleague.jp/matches/2026111804/",
  "beleza-next-16": "https://weleague.jp/matches/2026112304/",
};

export const belezaFixtures: CommonFixture[] = [
  {
    // 第1節（ジェフ千葉）アーカイブ。/beleza/matches/beleza-match-1 で個別に描画される。
    id: belezaMatch1.id, category: "beleza", teamName: belezaTeam.name,
    opponentName: "ジェフユナイテッド市原・千葉レディース", competition: { name: "2026/27 WEリーグ", round: "第1節" },
    kickoffAt: belezaMatch1.kickoffAt, kickoffStatus: "confirmed", dateLabel: belezaMatch1.dateLabel,
    venue: belezaMatch1.venue, isHome: true, status: "finished", score: { home: belezaMatch1.homeScore, away: belezaMatch1.awayScore },
    detailMatchId: belezaMatch1.id,
  },
  {
    // 第2節（AC長野）アーカイブ。/beleza/matches/beleza-match-2 で個別に描画される。
    id: belezaMatch2.id, category: "beleza", teamName: belezaTeam.name,
    opponentName: belezaMatch2.homeTeamName, competition: { name: "2026/27 WEリーグ", round: "第2節" },
    kickoffAt: belezaMatch2.kickoffAt, kickoffStatus: "confirmed", dateLabel: belezaMatch2.dateLabel,
    venue: belezaMatch2.venue, isHome: belezaMatch2.isBelezaHome, status: "finished",
    score: { home: belezaMatch2.homeScore, away: belezaMatch2.awayScore },
    sourceUrl: "https://weleague.jp/matches/2026082925/",
    detailMatchId: belezaMatch2.id,
  },
  {
    // 第3節（浦和）アーカイブ。/beleza/matches/beleza-match-3 で個別に描画される。
    id: belezaMatch3.id, category: "beleza", teamName: belezaTeam.name,
    opponentName: belezaMatch3.homeTeamName, competition: { name: "2026/27 WEリーグ", round: "第3節" },
    kickoffAt: belezaMatch3.kickoffAt, kickoffStatus: "confirmed", dateLabel: belezaMatch3.dateLabel,
    venue: belezaMatch3.venue, isHome: belezaMatch3.isBelezaHome, status: "finished",
    score: { home: belezaMatch3.homeScore, away: belezaMatch3.awayScore },
    sourceUrl: "https://www.verdy.co.jp/beleza/match/info/12026090516/result",
    detailMatchId: belezaMatch3.id,
  },
  {
    // クラシエカップ第1節・INAC神戸戦の公式確定結果（Season History）。
    id: "beleza-next-3", category: "beleza", teamName: belezaTeam.name,
    opponentName: "INAC神戸レオネッサ", competition: { name: "2026/27 WEリーグ クラシエカップ", round: "第1節" },
    kickoffAt: "2026-09-12T18:00:00+09:00", kickoffStatus: "confirmed", dateLabel: "09.12 SAT",
    venue: "味の素フィールド西が丘", isHome: true, status: "finished", score: { home: 3, away: 2 },
  },
  {
    // クラシエカップ第2節・EL埼玉戦の公式確定結果。
    id: belezaMatch.id, category: "beleza", teamName: belezaTeam.name,
    opponentName: belezaMatch.isBelezaHome ? belezaMatch.awayTeamName : belezaMatch.homeTeamName,
    competition: { name: belezaMatch.fixtureMeta.competition, round: belezaMatch.fixtureMeta.roundLabel },
    kickoffAt: belezaMatch.kickoffAt, kickoffStatus: "confirmed", dateLabel: belezaMatch.dateLabel,
    venue: belezaMatch.venue, isHome: belezaMatch.isBelezaHome, status: belezaMatch.status,
    score: { home: belezaMatch.homeScore, away: belezaMatch.awayScore },
    detailMatchId: belezaMatch.id,
  },
  {
    // クラシエカップ第3節・新潟L戦の公式確定結果。/beleza/matches/beleza-match-4 で個別に描画される。
    id: belezaMatch4.id, category: "beleza", teamName: belezaTeam.name,
    opponentName: belezaMatch4.isBelezaHome ? belezaMatch4.awayTeamName : belezaMatch4.homeTeamName,
    competition: { name: belezaMatch4.fixtureMeta.competition, round: belezaMatch4.fixtureMeta.roundLabel },
    kickoffAt: belezaMatch4.kickoffAt, kickoffStatus: "confirmed", dateLabel: belezaMatch4.dateLabel,
    venue: belezaMatch4.venue, isHome: belezaMatch4.isBelezaHome, status: belezaMatch4.status,
    score: { home: belezaMatch4.homeScore, away: belezaMatch4.awayScore },
    detailMatchId: belezaMatch4.id,
  },
  {
    // クラシエカップ第4節・C大阪戦の公式確定結果。/beleza/matches/beleza-match-5 で個別に描画される。
    id: belezaMatch5.id, category: "beleza", teamName: belezaTeam.name,
    opponentName: belezaMatch5.isBelezaHome ? belezaMatch5.awayTeamName : belezaMatch5.homeTeamName,
    competition: { name: belezaMatch5.fixtureMeta.competition, round: belezaMatch5.fixtureMeta.roundLabel },
    kickoffAt: belezaMatch5.kickoffAt, kickoffStatus: "confirmed", dateLabel: belezaMatch5.dateLabel,
    venue: belezaMatch5.venue, isHome: belezaMatch5.isBelezaHome, status: belezaMatch5.status,
    score: { home: belezaMatch5.homeScore, away: belezaMatch5.awayScore },
    detailMatchId: belezaMatch5.id,
  },
  {
    // 皇后杯2回戦はベレーザの出場が確定。相手は1回戦No.8の勝者。
    id: "beleza-empress-2026-2", category: "beleza", teamName: belezaTeam.name,
    opponentName: "1回戦No.8の勝者", competition: { name: "皇后杯 JFA 第48回全日本女子サッカー選手権大会", round: "2回戦" },
    kickoffAt: "2026-11-28T14:00:00+09:00", kickoffStatus: "confirmed", dateLabel: "11.28 SAT",
    venue: "Axisバードスタジアム", isHome: true, hideHomeAwayLabel: true, status: "scheduled",
    sourceUrl: "https://www.jfa.jp/match/empressscup_2026/match_page/m24.html",
  },
  {
    // 開催候補日であり、正式な開催日・キックオフ・会場は未定。
    id: "beleza-league-2026-12", category: "beleza", teamName: belezaTeam.name,
    opponentName: "ジェフユナイテッド市原・千葉レディース", competition: { name: "2026/27 WEリーグ", round: "第12節" },
    kickoffStatus: "date_range", dateLabel: "2027.02.06 or 02.07（開催日未定）",
    isHome: false, status: "scheduled", sourceUrl: "https://www.verdy.co.jp/beleza/news/15003",
  },
  ...belezaUpcomingMatches.slice(1).map((fixture, index) => ({
    id: fixture.id, category: "beleza" as const, teamName: belezaTeam.name, opponentName: fixture.opponentName,
    competition: { name: fixture.fixtureMeta.competition, round: fixture.fixtureMeta.roundLabel },
    kickoffAt: ["2026-10-03T14:00:00+09:00", "2026-10-11T12:00:00+09:00", "2026-10-18T14:00:00+09:00", "2026-10-24T12:00:00+09:00", "2026-10-28T18:00:00+09:00", "2026-10-31T15:00:00+09:00", "2026-11-07T14:00:00+09:00", "2026-11-14T15:00:00+09:00", "2026-11-18T14:00:00+09:00", "2026-11-23T15:00:00+09:00"][index],
    kickoffStatus: "confirmed" as const, dateLabel: fixture.dateLabel, venue: fixture.venue, isHome: fixture.isHome, status: "scheduled" as const,
    ...(fixture.id === belezaUrawaCupMatch.id ? {} : { sourceUrl: "https://www.verdy.co.jp/beleza/calendar/" }),
    ...(weLeagueMatchPages[fixture.id] ? { sourceUrl: weLeagueMatchPages[fixture.id] } : {}),
    ...(fixture.id === belezaStellaLeagueMatch.id ? {
      detailMatchId: fixture.id, kickoffAt: belezaStellaLeagueMatch.kickoffAt,
      status: belezaStellaLeagueMatch.status,
      score: { home: belezaStellaLeagueMatch.homeScore, away: belezaStellaLeagueMatch.awayScore },
      sourceUrl: belezaStellaLeagueMatch.sourceUrl,
    } : {}),
    ...(fixture.id === belezaUrawaCupMatch.id ? {
      detailMatchId: fixture.id,
      kickoffAt: belezaUrawaCupMatch.kickoffAt,
      status: belezaUrawaCupMatch.status,
      score: { home: belezaUrawaCupMatch.homeScore, away: belezaUrawaCupMatch.awayScore },
    } : {}),
    ...(fixture.id === belezaReginaMatch.id ? {
      detailMatchId: fixture.id, kickoffAt: belezaReginaMatch.kickoffAt,
      status: belezaReginaMatch.status,
      score: { home: belezaReginaMatch.homeScore, away: belezaReginaMatch.awayScore },
      sourceUrl: "https://www.verdy.co.jp/beleza/match/info/12026101115/result",
    } : {}),
    ...(fixture.id === belezaOmiyaLeagueMatch.id ? {
      detailMatchId: fixture.id, kickoffAt: belezaOmiyaLeagueMatch.kickoffAt,
      status: belezaOmiyaLeagueMatch.status,
      score: { home: belezaOmiyaLeagueMatch.homeScore, away: belezaOmiyaLeagueMatch.awayScore },
      sourceUrl: "https://weleague.jp/matches/2026103135/",
    } : {}),
    ...(fixture.id === belezaCerezoLeagueMatch.id ? {
      detailMatchId: fixture.id, kickoffAt: belezaCerezoLeagueMatch.kickoffAt,
      status: belezaCerezoLeagueMatch.status,
      score: { home: belezaCerezoLeagueMatch.homeScore, away: belezaCerezoLeagueMatch.awayScore },
      sourceUrl: "https://weleague.jp/files/2026/match_pdf_jp/2026102805.pdf",
    } : {}),
    ...(fixture.id === belezaElfenLeagueMatch.id ? {
      detailMatchId: fixture.id, kickoffAt: belezaElfenLeagueMatch.kickoffAt,
      status: belezaElfenLeagueMatch.status,
      score: { home: belezaElfenLeagueMatch.homeScore, away: belezaElfenLeagueMatch.awayScore },
      sourceUrl: "https://weleague.jp/files/2026/match_pdf_jp/2026102420.pdf",
    } : {}),
    ...(fixture.id === belezaReginaLeagueMatch.id ? {
      detailMatchId: fixture.id, kickoffAt: belezaReginaLeagueMatch.kickoffAt,
      status: belezaReginaLeagueMatch.status,
      score: { home: belezaReginaLeagueMatch.homeScore, away: belezaReginaLeagueMatch.awayScore },
      sourceUrl: "https://weleague.jp/matches/2026101811/",
    } : {}),
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
  fixtureMeta: toMeta(fixture), isHome: fixture.isHome, hideHomeAwayLabel: fixture.hideHomeAwayLabel, opponentName: fixture.opponentName, venue: fixture.venue,
});

export type BelezaSeasonHistoryView = {
  id: string; dateLabel: string; round: string; homeTeamName: string; awayTeamName: string; homeScore: number; awayScore: number; result: "win" | "draw" | "loss"; detailMatchId?: string;
};

export const toBelezaSeasonHistoryEntry = (fixture: CommonFixture): BelezaSeasonHistoryView => {
  const score = fixture.score!; const opponent = fixture.opponentName;
  const homeTeamName = fixture.isHome ? fixture.teamName : opponent; const awayTeamName = fixture.isHome ? opponent : fixture.teamName;
  const own = fixture.isHome ? score.home : score.away; const other = fixture.isHome ? score.away : score.home;
  return { id: fixture.id, dateLabel: fixture.dateLabel ?? "TBD", round: fixture.competition.round ?? "", homeTeamName, awayTeamName, homeScore: score.home, awayScore: score.away, result: own === other ? "draw" : own > other ? "win" : "loss", detailMatchId: fixture.detailMatchId };
};
