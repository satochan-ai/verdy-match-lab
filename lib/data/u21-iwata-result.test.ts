import assert from "node:assert/strict";
import test from "node:test";
import { u21IwataMatch as match, u21IwataGoals, u21IwataCards, u21IwataSubstitutions, u21IwataHomeOfficialLineup, u21IwataAwayOfficialLineup, u21IwataOfficialRecord } from "../mock/u21-iwata-result.ts";
import { toU21SeasonHistoryEntry, u21Fixtures } from "./u21-fixtures.ts";
import { getLatestFinishedFixture, getNextFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { resolveMatchStatus } from "../match/status.ts";

test("Iwata official result uses the existing ID, AWAY score direction and valid detail", () => {
  assert.equal(match.id, "u21-next-4");
  assert.deepEqual([match.homeScore, match.awayScore], [3, 5]);
  const fixture = u21Fixtures.find(f => f.id === match.id)!;
  assert.equal(u21Fixtures.filter(f => f.id === match.id).length, 1);
  assert.equal(fixture.detailMatchId, match.id);
  assert.equal(fixture.kickoffAt, match.kickoffAt);
  assert.equal(fixture.venue, "ヤマハ大久保グラウンド");
  assert.equal(toU21SeasonHistoryEntry(fixture).result, "win");
  assert.equal(u21IwataOfficialRecord.kickoff, "15:03");
  assert.equal(u21IwataOfficialRecord.attendance, 197);
  assert.equal(u21IwataOfficialRecord.referee, "田原 愼乃介");
  assert.equal(fixture.sourceUrl, "https://www.jleague.jp/match/u-21/2026/101734/");
});

test("Iwata goals, squads, yellow cards and six HOME substitutions match official records", () => {
  assert.deepEqual(u21IwataGoals.map(g => [g.minute, g.scorer]), [["31'", "佐久間 心輝"], ["38'", "佐久間 心輝"], ["39'", "大藤 颯太"], ["43'", "神田 奏真"], ["69'", "中谷 桜太朗"], ["82'", "川村 楽人"], ["83'", "仲山 獅恩"], ["85'", "川村 楽人"]]);
  assert.equal(u21IwataGoals.filter(g => g.team === match.homeTeamName).length, 3);
  assert.equal(u21IwataGoals.filter(g => g.team === match.awayTeamName).length, 5);
  assert.deepEqual(u21IwataCards.map(c => [c.minute, c.player, c.type]), [["55'", "縣 真汰", "yellow"], ["59'", "食野 壮磨", "yellow"]]);
  assert.equal(u21IwataSubstitutions.length, 6);
  assert.ok(u21IwataSubstitutions.every(s => s.team === match.homeTeamName));
  for (const [lineup, benchCount] of [[u21IwataHomeOfficialLineup, 7], [u21IwataAwayOfficialLineup, 5]] as const) {
    assert.equal(Object.values(lineup.starters).flat().length, 11);
    assert.equal(Object.values(lineup.bench).flat().length, benchCount);
    assert.equal("formation" in lineup, false);
    const players = [...Object.values(lineup.starters).flat(), ...Object.values(lineup.bench).flat()];
    assert.equal(new Set(players.map(p => p.split(" ")[0])).size, 11 + benchCount);
  }
});

test("Iwata finished: no LIVE, LAST is Iwata, NEXT is Nagoya, Next5 excludes all finished matches", () => {
  const now = new Date("2026-10-18T12:00:00+09:00");
  assert.equal(resolveMatchStatus(match, now), "finished");
  assert.equal(getLatestFinishedFixture(u21Fixtures)?.id, match.id);
  assert.equal(getNextFixture(u21Fixtures, now)?.id, "u21-next-5");
  assert.deepEqual(getUpcomingFixtures(u21Fixtures, now, 5).map(f => f.id), ["u21-next-5", "u21-next-6", "u21-next-7", "u21-next-8", "u21-next-9"]);
  assert.ok(getUpcomingFixtures(u21Fixtures, now, 5).every(f => f.status === "scheduled"));
});
