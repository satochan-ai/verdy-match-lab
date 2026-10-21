import assert from "node:assert/strict";
import test from "node:test";
import { fcTokyoResult as match } from "../mock/top-fc-tokyo-result.ts";
import { matches } from "../mock/matches.ts";
import { scheduleMatches } from "../mock/schedule.ts";
import { topFixtures as currentTopFixtures } from "./top-fixtures.ts";
import { validateTopFixtureConsistency } from "./top-fixture-consistency.ts";
import { getLatestFinishedFixture, getNextFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { resolveMatchStatus } from "../match/status.ts";
import { verdyDerbyRows } from "../match/fc-tokyo-prediction.ts";
import { verdyDerbyPreview, verdyDerbyStrategies } from "../match/fc-tokyo-preview.ts";

// 10/18時点の履歴を再現し、後日の横浜FM戦の結果登録に依存させない。
const topFixtures = currentTopFixtures.map(f => f.id === "sched-yokohama-fm" ? { ...f, status: "scheduled" as const, score: undefined, detailMatchId: undefined, kickoffAt: "2026-10-21T19:00:00+09:00" } : f);

test("FC Tokyo official result is consistent across schedule, fixture and published detail", () => {
  assert.deepEqual([match.homeScore, match.awayScore], [0, 4]);
  assert.equal(matches.filter(m => m.id === match.id).length, 1);
  const schedule = scheduleMatches.filter(f => f.id === match.id);
  assert.deepEqual(validateTopFixtureConsistency(schedule, matches), []);
  assert.equal(schedule[0].detailMatchId, match.id);
  assert.equal(match.kickoffAt, "2026-10-17T14:03:00+09:00");
  assert.equal(match.officialRecord?.attendance, 28945);
  assert.equal(match.officialRecord?.referee, "上村 篤史");
  assert.equal(match.officialRecord?.sourceUrl, "https://www.jleague.jp/match/j1/2026/101708/");
});

test("FC Tokyo goals, red/yellow cards and official squads have no fabricated events", () => {
  assert.deepEqual(match.goals?.map(g => [g.minute, g.scorer]), [["41'", "アレクサンダー ショルツ"], ["55'", "マルセロ ヒアン"], ["68'", "長倉 幹樹"], ["90+4'", "ダニ ゴメス"]]);
  assert.deepEqual(match.cards?.map(c => [c.minute, c.player, c.type]), [["18'", "染野 唯月", "red"], ["58'", "新井 悠太", "yellow"], ["81'", "一美 和成", "yellow"]]);
  assert.equal(match.substitutions?.length, 10);
  for (const lineup of Object.values(match.actualLineups!)) {
    assert.equal(lineup.formation, "4-4-2");
    assert.equal(Object.values(lineup.starters).flat().length, 11);
    assert.equal(Object.values(lineup.bench).flat().length, 9);
    const players = [...Object.values(lineup.starters).flat(), ...Object.values(lineup.bench).flat()];
    assert.equal(new Set(players.map(p => p.split(" ")[0])).size, 20);
  }
  assert.ok(match.matchNotes.some(note => note.includes("前半0-1、後半0-3")));
});

test("FC Tokyo finish clears LIVE, advances LAST/NEXT5 and preserves pre-match editorial data", () => {
  const now = new Date("2026-10-18T12:00:00+09:00");
  assert.equal(resolveMatchStatus(match, now), "finished");
  assert.equal(getLatestFinishedFixture(topFixtures)?.id, match.id);
  assert.equal(getNextFixture(topFixtures, now)?.id, "sched-yokohama-fm");
  assert.deepEqual(getUpcomingFixtures(topFixtures, now, 5).map(f => f.id), ["sched-yokohama-fm", "sched-fukuoka", "sched-nagasaki", "sched-shimizu", "sched-nagoya"]);
  assert.equal(verdyDerbyRows.flat().length, 11);
  assert.equal(verdyDerbyStrategies.length, 3);
  assert.equal(verdyDerbyPreview.paragraphs.length, 5);
});
