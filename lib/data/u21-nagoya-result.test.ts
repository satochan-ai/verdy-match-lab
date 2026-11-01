import assert from "node:assert/strict";
import test from "node:test";
import { u21NagoyaMatch as match, u21NagoyaGoals as goals, u21NagoyaCards as cards, u21NagoyaSubstitutions as substitutions, u21NagoyaHomeOfficialLineup as home, u21NagoyaAwayOfficialLineup as away, u21NagoyaStats as stats } from "../mock/u21-nagoya-result.ts";
import { u21Fixtures } from "./u21-fixtures.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";

test("Nagoya goals preserve chronological scores and Kawamura brace", () => {
  assert.deepEqual(goals.map(g => [g.minute, g.scorer]), [["7'","川村 楽人"],["12'","小島 蒼斗"],["30'","千賀 翔大郎"],["37'","川村 楽人"],["40'","杉浦 駿吾"],["48'","大藤 颯太"],["84'","神田 奏真"]]);
  let h = 0, a = 0;
  assert.deepEqual(goals.map(g => { if (g.team === match.homeTeamName) h++; else a++; return `${h}-${a}`; }), ["1-0","1-1","1-2","2-2","2-3","3-3","4-3"]);
  assert.deepEqual([h,a], [match.homeScore,match.awayScore]);
});

test("official squads have 11 starters each, 6/5 bench and valid substitution membership", () => {
  for (const [squad,count] of [[home,6],[away,5]] as const) {
    assert.equal(Object.values(squad.starters).flat().length,11);
    assert.equal(Object.values(squad.bench).flat().length,count);
    const numbers = [...Object.values(squad.starters).flat(),...Object.values(squad.bench).flat()].map(p => p.split(" ")[0]);
    assert.equal(new Set(numbers).size,11+count);
    assert.equal("formation" in squad,false);
  }
  assert.deepEqual(substitutions.map(s => [s.minute,s.playerOut,s.playerIn]), [["13'","鮫島 充輝","水野 優人"],["18'","仲山 獅恩","田邉 秀斗"],["67'","菊地 泰智","成瀬 楓悟"],["89'","オディケ チソン太地","足立 惺洋"]]);
  for (const s of substitutions) {
    const squad = s.team === match.homeTeamName ? home : away;
    assert.ok(Object.values(squad.starters).flat().some(p => p.endsWith(s.playerOut)));
    assert.ok(Object.values(squad.bench).flat().some(p => p.endsWith(s.playerIn)));
  }
});

test("cards match official minutes, counts and verified stats", () => {
  assert.deepEqual(cards.map(c => [c.minute,c.player,c.type]), [["4'","竹内 悠三","yellow"],["28'","井上 竜太","red"],["39'","松田 陸","yellow"],["40'","川村 楽人","yellow"],["73'","成瀬 楓悟","yellow"],["85'","杉浦 駿吾","yellow"],["90+1'","成瀬 楓悟","red"]]);
  assert.deepEqual(stats.map(s => [s.home,s.away]), [[11,13],[3,2],[5,6],[18,8],[2,3],[1,1]]);
});

test("Nagoya LAST, G Osaka NEXT and all six historical results retain IDs", () => {
  const now = new Date("2026-11-01T17:00:00+09:00");
  assert.equal(getLatestFinishedFixture(u21Fixtures)?.id,match.id);
  const next = getNextFixture(u21Fixtures,now)!;
  assert.equal(next.id,"u21-next-6");
  assert.equal(next.kickoffAt,"2026-11-22T14:00:00+09:00");
  assert.equal(next.venue,"パナソニック スタジアム 吹田");
  assert.equal(getSeasonHistory(u21Fixtures).length,6);
  assert.deepEqual(getUpcomingFixtures(u21Fixtures,now,5).map(f => f.id),["u21-next-6","u21-next-7","u21-next-8","u21-next-9"]);
  assert.equal(u21Fixtures.filter(f => f.id === match.id).length,1);
  assert.equal(u21Fixtures.find(f => f.id === match.id)?.detailMatchId,match.id);
});
