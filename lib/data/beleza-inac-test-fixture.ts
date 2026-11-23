import { belezaInacLeagueMatch } from "../mock/beleza-inac-league.ts";
import type { CommonFixture } from "../types/fixture";

export function beforeBelezaInacResult(fixtures: CommonFixture[]): CommonFixture[] {
  return fixtures.map((fixture) => fixture.id === belezaInacLeagueMatch.id ? {
    ...fixture,
    kickoffAt: `2026-11-23T${belezaInacLeagueMatch.scheduledKickoff}:00+09:00`,
    status: "scheduled",
    score: undefined,
    detailMatchId: undefined,
  } : fixture);
}
