import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry } from "./beleza-fixtures.ts";
import { u21Fixtures } from "./u21-fixtures.ts";
import type { CommonFixture } from "../types/fixture.ts";

const now = new Date("2026-08-30T00:00:00+09:00");
const withStatus = (fixtures: readonly CommonFixture[], ids: readonly string[], status: "finished" | "postponed" | "cancelled" | "abandoned") =>
  fixtures.map((fixture) => ids.includes(fixture.id) ? { ...fixture, status, score: status === "finished" ? { home: 1, away: 1 } : undefined } : fixture);

test("U-21 and BELEZA have unique IDs and stay within category boundaries", () => {
  const all = [...u21Fixtures, ...belezaFixtures];
  assert.equal(new Set(all.map((fixture) => fixture.id)).size, all.length);
  // U-21 contributes 1 (its current match); BELEZA contributes 4 (3 archived matches that
  // each render individually at /beleza/matches/[id], plus the current snapshot).
  assert.equal(new Set(all.flatMap((fixture) => fixture.detailMatchId ? [fixture.detailMatchId] : [])).size, 5);
  assert.equal(u21Fixtures.every((fixture) => fixture.category === "u21"), true);
  assert.equal(belezaFixtures.every((fixture) => fixture.category === "beleza"), true);
});

test("both categories keep NEXT5 capped at five with a past scheduled fixture excluded", () => {
  for (const fixtures of [u21Fixtures, belezaFixtures]) {
    const scheduledTemplate = fixtures.find((fixture) => fixture.status === "scheduled")!;
    const pastScheduled = { ...scheduledTemplate, id: `${fixtures[0].category}-past`, kickoffAt: "2026-08-29T18:00:00+09:00" };
    // 実データの残りfuture fixture数がカテゴリーによって5件未満の場合もあるため、
    // 5件超を確実に用意するfuture paddingを追加してcap挙動を検証する。
    const futurePadding = { ...scheduledTemplate, id: `${fixtures[0].category}-future-pad`, kickoffAt: "2026-12-31T18:00:00+09:00" };
    const extended = [...fixtures, pastScheduled, pastScheduled, pastScheduled, futurePadding, futurePadding];
    assert.equal(getUpcomingFixtures(extended, now, 5).length, 5);
    assert.equal(getUpcomingFixtures(extended, now, 5).some((fixture) => fixture.id.endsWith("-past")), false);
  }
});

test("postponed, cancelled, abandoned, live and half_time are excluded from all selectors", () => {
  const base = u21Fixtures.slice(1, 2)[0];
  const statuses = ["postponed", "cancelled", "abandoned", "live", "half_time"] as const;
  for (const status of statuses) {
    const fixture = { ...base, id: `status-${status}`, status, score: undefined };
    assert.equal(getNextFixture([fixture], now), undefined);
    assert.deepEqual(getUpcomingFixtures([fixture], now), []);
    assert.equal(getLatestFinishedFixture([fixture]), undefined);
    assert.deepEqual(getSeasonHistory([fixture]), []);
  }
});

test("TBD-only collections provide a provisional NEXT, while confirmed fixtures stay first", () => {
  const tbd = { ...u21Fixtures.at(-1)!, id: "tbd-only", kickoffAt: undefined, kickoffStatus: "date_range" as const };
  // u21Fixtures[1]（u21-next-1）はU-21浦和戦の公式結果反映によりfinished化したため、
  // ここでは依然scheduled/confirmedな別fixture（u21-next-2）を参照する。
  const scheduledConfirmed = u21Fixtures.find((fixture) => fixture.status === "scheduled" && fixture.kickoffStatus === "confirmed")!;
  assert.equal(getNextFixture([tbd], now)?.id, "tbd-only");
  assert.equal(getUpcomingFixtures([tbd, scheduledConfirmed], now)[0].id, scheduledConfirmed.id);
  assert.equal(getUpcomingFixtures([tbd, scheduledConfirmed], now).at(-1)?.id, "tbd-only");
});

test("kickoff boundary includes 17:59 and excludes a still-scheduled 18:01 fixture", () => {
  const kickoff = { ...u21Fixtures[2], id: "boundary", kickoffAt: "2026-09-12T18:00:00+09:00" };
  assert.equal(getNextFixture([kickoff], new Date("2026-09-12T17:59:00+09:00"))?.id, "boundary");
  assert.equal(getNextFixture([kickoff], new Date("2026-09-12T18:01:00+09:00")), undefined);
});

test("two consecutive finishes update NEXT, LAST and HISTORY for both categories", () => {
  const cases = [[u21Fixtures, ["u21-next-1", "u21-next-2"], "u21-next-3", "u21-next-2"], [belezaFixtures, ["beleza-next-3", "beleza-next-4"], "beleza-next-5", "beleza-next-4"]] as const;
  for (const [fixtures, finishedIds, nextId, lastId] of cases) {
    const simulated = withStatus(fixtures, finishedIds, "finished");
    assert.equal(getNextFixture(simulated, now)?.id, nextId);
    assert.equal(getLatestFinishedFixture(simulated)?.id, lastId);
    assert.deepEqual(getSeasonHistory(simulated).slice(0, 2).map((fixture) => fixture.id), [lastId, finishedIds[0]]);
  }
});

test("adapters preserve stored home/away score direction and derive DRAW", () => {
  assert.deepEqual(u21Fixtures.find((fixture) => fixture.id === "u21-match-1")?.score, { home: 0, away: 3 });
  assert.deepEqual(belezaFixtures.find((fixture) => fixture.id === "beleza-match-2")?.score, { home: 1, away: 4 });
  const draw = { ...belezaFixtures.find((fixture) => fixture.id === "beleza-match-2")!, id: "draw", score: { home: 1, away: 1 } };
  assert.equal(toBelezaSeasonHistoryEntry(getSeasonHistory([draw])[0]).result, "draw");
});

/**
 * 終了判定は必ずstatus === "finished"だけを根拠にすること。kickoffAtが過去に
 * なっただけ（statusはまだ"scheduled"のまま）では、finished系selectorの対象に
 * 入れてはならない（BELEZA/U-21で試合前後の時刻だけを理由にfinished扱いされた
 * 不具合の再発防止）。TOP/U-21/BELEZA共通のfixture-selectors.tsを対象に検証する。
 */
test("Case A: scheduled + past kickoffAt never enters any finished selector", () => {
  const base = u21Fixtures.slice(1, 2)[0];
  const scheduledPastKickoff = {
    ...base,
    id: "scheduled-past-kickoff",
    status: "scheduled" as const,
    kickoffAt: "2020-01-01T00:00:00+09:00",
    score: undefined,
  };
  const veryLateNow = new Date("2030-01-01T00:00:00+09:00");
  assert.equal(getLatestFinishedFixture([scheduledPastKickoff]), undefined);
  assert.deepEqual(getSeasonHistory([scheduledPastKickoff]), []);
  // upcomingからも外れる（middle state）が、finishedへは絶対に落ちない。
  assert.deepEqual(getUpcomingFixtures([scheduledPastKickoff], veryLateNow), []);
  assert.equal(getNextFixture([scheduledPastKickoff], veryLateNow), undefined);
});

test("Case B: status finished enters the finished selectors regardless of kickoffAt", () => {
  const base = u21Fixtures.slice(1, 2)[0];
  const finishedFixture = {
    ...base,
    id: "explicitly-finished",
    status: "finished" as const,
    kickoffAt: "2026-09-12T18:00:00+09:00",
    score: { home: 1, away: 0 },
  };
  assert.equal(getLatestFinishedFixture([finishedFixture])?.id, "explicitly-finished");
  assert.equal(getSeasonHistory([finishedFixture]).some((fixture) => fixture.id === "explicitly-finished"), true);
});

test("Case C: scheduled + future kickoffAt enters the upcoming selector", () => {
  const base = u21Fixtures.slice(1, 2)[0];
  const futureScheduled = {
    ...base,
    id: "scheduled-future-kickoff",
    status: "scheduled" as const,
    kickoffAt: "2030-01-01T00:00:00+09:00",
    score: undefined,
  };
  const beforeKickoff = new Date("2029-01-01T00:00:00+09:00");
  assert.equal(getNextFixture([futureScheduled], beforeKickoff)?.id, "scheduled-future-kickoff");
  assert.equal(getUpcomingFixtures([futureScheduled], beforeKickoff).some((fixture) => fixture.id === "scheduled-future-kickoff"), true);
});
