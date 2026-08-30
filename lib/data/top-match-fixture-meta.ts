import type { Match } from "@/types/domain";
import type { CommonFixture } from "@/lib/types/fixture";

/**
 * Match側に大会メタデータがない場合だけ、明示的なdetailMatchIdで補完する。
 * 日付・対戦相手による推測matchingは行わず、入力も変更しない。
 */
export function enrichMatchFixtureMeta(match: Match, fixtures: readonly CommonFixture[]): Match {
  if (match.fixtureMeta) return match;

  const fixture = fixtures.find((item) => item.detailMatchId === match.id);
  if (!fixture) return match;

  return {
    ...match,
    fixtureMeta: {
      competition: fixture.competition.name,
      roundLabel: fixture.competition.round,
    },
  };
}

export function enrichMatchesFixtureMeta(matches: readonly Match[], fixtures: readonly CommonFixture[]): Match[] {
  return matches.map((match) => enrichMatchFixtureMeta(match, fixtures));
}
