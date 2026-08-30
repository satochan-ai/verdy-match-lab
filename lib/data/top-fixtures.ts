import type { UpcomingFixture } from "../../types/domain";
import type { CommonFixture } from "../types/fixture";
import { scheduleMatches } from "../mock/schedule.ts";

const competitionNames = { j1: "2026 J1リーグ", emperor_cup: "天皇杯 JFA 第106回全日本サッカー選手権大会", levain_cup: "ルヴァン" } as const;

export const topFixtures: CommonFixture[] = scheduleMatches.map((item) => ({
  id: item.id, category: "top", teamName: "東京ヴェルディ", opponentName: item.opponentTbd ? "対戦相手未定" : item.opponentName,
  competition: { name: competitionNames[item.competition], round: item.round }, kickoffAt: item.kickoffAt,
  kickoffStatus: "confirmed", venue: item.venue, isHome: item.isVerdyHome, status: item.status,
  score: item.homeScore != null && item.awayScore != null ? { home: item.homeScore, away: item.awayScore } : undefined,
  detailMatchId: item.detailMatchId,
}));

const toMeta = (fixture: CommonFixture) => ({ competition: fixture.competition.name, roundLabel: fixture.competition.round });
const dateLabel = (iso: string) => new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Tokyo", month: "2-digit", day: "2-digit", weekday: "short" }).formatToParts(new Date(iso)).reduce((label, part) => part.type === "month" ? `${part.value}.` : part.type === "day" ? `${label}${part.value}` : part.type === "weekday" ? `${label} ${part.value.toUpperCase()}` : label, "");
const kickoffLabel = (iso: string) => new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(iso));

export const toTopUpcomingFixture = (fixture: CommonFixture): UpcomingFixture => ({ id: fixture.id, dateLabel: dateLabel(fixture.kickoffAt!), kickoffLabel: kickoffLabel(fixture.kickoffAt!), fixtureMeta: toMeta(fixture), isHome: fixture.isHome, opponentName: fixture.opponentName, venue: fixture.venue });
