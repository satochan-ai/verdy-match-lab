import assert from "node:assert/strict";
import test from "node:test";
import { getMatchResult } from "./result.ts";
import { matches } from "../mock/matches.ts";
import { getNextFixture, getLatestFinishedFixture } from "../data/fixture-selectors.ts";
import { topFixtures as currentTopFixtures } from "../data/top-fixtures.ts";

// 鳥取戦終了時点の履歴検証。広島戦の結果登録後も当時のselector条件を再現する。
const topFixtures = currentTopFixtures.map((fixture) => fixture.id === "sched-hiroshima" ? { ...fixture, status: "scheduled" as const, score: undefined, detailMatchId: undefined, kickoffAt: "2026-10-11T15:00:00+09:00" } : fixture);

test("PK decides the winner without changing the drawn match score", () => {
  const match = { homeScore: 0, awayScore: 0, isVerdyHome: false, penaltyShootout: { homeScore: 3, awayScore: 4 } };
  assert.equal(getMatchResult(match), "win");
  assert.equal(getMatchResult({ ...match, isVerdyHome: true }), "loss");
  assert.equal(getMatchResult({ ...match, penaltyShootout: undefined }), "draw");
  assert.deepEqual([match.homeScore, match.awayScore], [0, 0]);
});

test("Tottori finish advances TOP selectors and preserves separate extra-time and PK scores", () => {
  assert.equal(getLatestFinishedFixture(topFixtures)?.id, "sched-emperor-tottori");
  assert.equal(getNextFixture(topFixtures, new Date("2026-10-08T00:00:00+09:00"))?.opponentName, "サンフレッチェ広島");
  const record = matches.find((match) => match.id === "sched-emperor-tottori")!;
  assert.deepEqual([record.homeScore, record.awayScore], [0, 0]);
  assert.deepEqual(record.extraTimeScore, { home: 0, away: 0 });
  assert.deepEqual([record.penaltyShootout?.homeScore, record.penaltyShootout?.awayScore], [3, 4]);
  assert.equal(getMatchResult(record), "win");
  assert.equal(record.actualLineups?.away.formation, "3-4-1-2");
  assert.deepEqual(record.actualLineups?.away.starters.FW, ["27 白井 亮丞", "9 染野 唯月"]);
});
