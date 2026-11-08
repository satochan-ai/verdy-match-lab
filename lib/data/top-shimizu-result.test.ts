import assert from "node:assert/strict";
import test from "node:test";
import { shimizuResult as match } from "../mock/top-shimizu-result.ts";
import { matches } from "../mock/matches.ts";
import { scheduleMatches } from "../mock/schedule.ts";
import { topFixtures } from "./top-fixtures.ts";
import { validateTopFixtureConsistency } from "./top-fixture-consistency.ts";
import { getLatestFinishedFixture, getNextFixture } from "./fixture-selectors.ts";
import { shimizuPredictionRows } from "../match/shimizu-prediction.ts";
import { shimizuOpponentRows } from "../match/shimizu-opponent-prediction.ts";

test("清水戦の結果・記録・一覧切替", () => {
  assert.deepEqual([match.homeScore, match.awayScore, match.status], [0, 1, "finished"]);
  assert.deepEqual(match.goals?.map(g => [g.minute, g.scorer, g.assist]), [["72'", "熊取谷 一星", "新井 悠太"]]);
  assert.ok(match.substitutions?.some(s => s.minute === "18'" && s.playerIn === "佐古 真礼"));
  assert.ok(match.substitutions?.some(s => s.minute === "59'" && s.playerIn === "熊取谷 一星"));
  assert.deepEqual(validateTopFixtureConsistency(scheduleMatches, matches), []);
  assert.equal(getLatestFinishedFixture(topFixtures)?.id, "sched-shimizu");
  assert.equal(getNextFixture(topFixtures, new Date("2026-11-08T00:00:00+09:00"))?.id, "sched-nagoya");
});

test("予想先発と公式先発の氏名を照合する", () => {
  const normalize = (s: string) => s.replace(/^\d+\s+/, "").replace(/\s+/g, "");
  const compare = (rows: typeof shimizuPredictionRows, side: "home" | "away") => {
    const actual = new Set(Object.values(match.actualLineups![side].starters).flat().map(normalize));
    return rows.flat().filter(p => actual.has(normalize(p.name))).length;
  };
  assert.equal(compare(shimizuPredictionRows, "away"), 11);
  assert.equal(compare(shimizuOpponentRows, "home"), 8);
});
