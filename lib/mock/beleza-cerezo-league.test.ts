import assert from "node:assert/strict";
import test from "node:test";
import {
  belezaCerezoLeagueMatch as match, belezaCerezoLeagueGoals as goals, belezaCerezoLeagueSubstitutions as subs,
  belezaCerezoLeagueCards as cards, belezaCerezoLeagueStats as stats, belezaCerezoLeagueActualLineup as lineup,
  cerezoLeagueActualLineup as opponentLineup, belezaCerezoLeagueOfficialRecord as record,
  belezaCerezoLeagueReview as review, belezaCerezoLeagueViewerNotes as notes,
} from "./beleza-cerezo-league.ts";
import { belezaFixtures } from "../data/beleza-fixtures.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory } from "../data/fixture-selectors.ts";
import { getCategoryDetailHref } from "../data/category-match-details.ts";
import { belezaTeam } from "./beleza.ts";

test("10/28 C大阪 result registers the existing ID, makes it LAST and advances NEXT to 大宮 (10/31)", () => {
  const fixture = belezaFixtures.find((f) => f.id === match.id)!;
  assert.deepEqual([fixture.status, fixture.kickoffAt, fixture.score, fixture.competition.round], ["finished", "2026-10-28T18:03:00+09:00", { home: 1, away: 2 }, "第5節"]);
  assert.equal(getLatestFinishedFixture(belezaFixtures)?.id, match.id);
  const next = getNextFixture(belezaFixtures, new Date("2026-10-28T22:00:00+09:00"))!;
  assert.deepEqual([next.id, next.opponentName, next.kickoffAt], ["beleza-next-12", "RB大宮アルディージャWOMEN", "2026-10-31T15:00:00+09:00"]);
  assert.equal(getCategoryDetailHref("beleza", fixture.detailMatchId), "/beleza/matches/beleza-next-11");
  const history = getSeasonHistory(belezaFixtures);
  for (const id of ["beleza-next-10", "beleza-next-11"]) assert.equal(history.filter((f) => f.id === id).length, 1);
  assert.deepEqual(belezaFixtures.find((f) => f.id === "beleza-next-10")?.score, { home: 4, away: 1 });
});

test("official record: goals, substitution pairs, no cards, stats and squads", () => {
  assert.deepEqual(goals.map((g) => `${g.minute}${g.scorer}`), ["19'高和 芹夏", "50'和田 麻希", "76'塩越 柚歩"]);
  assert.deepEqual(subs.filter((s) => s.team === belezaTeam.name).map((s) => `${s.minute}${s.playerOut}→${s.playerIn}`), ["HT隅田 凜→猶本 光", "65'青木 夕菜→村松 智子", "65'北村 菜々美→小林 里歌子", "65'眞城 美春→松永 未夢", "86'松岡 瑛茉→松田 紫野"]);
  assert.equal(cards.length, 0);
  assert.deepEqual(stats, { beleza: { shots: 9, freeKicks: 10, corners: 6 }, opponent: { shots: 14, freeKicks: 5, corners: 4 } });
  assert.deepEqual([record.attendance, record.weather, record.temperature, record.humidity, record.kickoff], [947, "晴、弱風", "14.0℃", "36%", "18:03"]);
  for (const side of [lineup, opponentLineup]) {
    assert.equal(Object.values(side.starters).flat().length, 11);
    // 開始時フォーメーションは公式に確認できないため登録しない。
    assert.equal(side.formation, undefined);
  }
  const starters = new Set(Object.values(lineup.starters).flat().map((p) => p.replace(/^\d+ /, "")));
  const bench = new Set(Object.values(lineup.bench).flat().map((p) => p.replace(/^\d+ /, "")));
  for (const s of subs.filter((x) => x.team === belezaTeam.name)) {
    assert.ok(starters.has(s.playerOut), s.playerOut);
    assert.ok(bench.has(s.playerIn), s.playerIn);
  }
  assert.equal(review.length, 5);
  assert.ok(review[4].includes("9本に対し、C大阪が14本"));
  assert.deepEqual(notes, []);
});
