import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getUpcomingFixtures } from "../data/fixture-selectors.ts";
import { resolveMatchStatus } from "./status.ts";
import type { CommonFixture } from "../types/fixture";

// 実データは使わず、検証専用の合成fixtureで時刻注入する（実際の試合結果は変更しない）。
const KICKOFF = "2026-10-11T15:00:00+09:00";
const base = {
  category: "top" as const, teamName: "東京ヴェルディ", competition: { name: "2026 J1リーグ", round: "第9節" },
  kickoffStatus: "confirmed" as const, venue: "味の素スタジアム", isHome: true,
};
const target = (over: Partial<CommonFixture> = {}): CommonFixture => ({ ...base, id: "t-target", opponentName: "対戦相手A", kickoffAt: KICKOFF, status: "scheduled", ...over });
const following: CommonFixture = { ...base, id: "t-following", opponentName: "対戦相手B", kickoffAt: "2026-10-17T14:00:00+09:00", status: "scheduled" };
const earlier: CommonFixture = { ...base, id: "t-earlier", opponentName: "対戦相手0", kickoffAt: "2026-10-07T19:00:00+09:00", status: "finished", score: { home: 0, away: 0 } };
const at = (offsetMs: number) => new Date(new Date(KICKOFF).getTime() + offsetMs);
const MIN = 60_000;

// app/page.tsx・app/top/page.tsx・app/beleza/page.tsx・app/u21/page.tsx と同じ判定。
const liveOf = (fixtures: CommonFixture[], now: Date) => fixtures.find((f) => f.status === "scheduled" && f.kickoffAt && resolveMatchStatus({ status: "scheduled", kickoffAt: f.kickoffAt }, now) === "live");

test("before kickoff: scheduled, no LIVE, target is NEXT", () => {
  const now = at(-MIN);
  const fixtures = [earlier, target(), following];
  assert.equal(resolveMatchStatus({ status: "scheduled", kickoffAt: KICKOFF }, now), "scheduled");
  assert.equal(liveOf(fixtures, now), undefined);
  assert.equal(getNextFixture(fixtures, now)?.id, "t-target");
});

test("kickoff / +45min / +90min / +4h with no official result stay live (current spec), never finished", () => {
  const fixtures = [earlier, target(), following];
  for (const offset of [0, 1_000, 45 * MIN, 90 * MIN, 4 * 60 * MIN]) {
    const now = at(offset);
    assert.equal(resolveMatchStatus({ status: "scheduled", kickoffAt: KICKOFF }, now), "live", `offset ${offset}ms`);
    assert.equal(liveOf(fixtures, now)?.id, "t-target");
    // LIVE中の試合はNEXT/NEXT5から外れ、次戦が繰り上がる。
    assert.equal(getNextFixture(fixtures, now)?.id, "t-following");
    assert.equal(getUpcomingFixtures(fixtures, now, 5).some((f) => f.id === "t-target"), false);
  }
});

test("unconfirmed score is never fabricated as 0-0 while live", () => {
  const now = at(45 * MIN);
  const fixtures = [earlier, target(), following];
  assert.equal(target().score, undefined);
  // LASTは結果登録済みの試合のみ。LIVE中の試合は（スコア未登録のため）LASTに現れない。
  assert.equal(getLatestFinishedFixture(fixtures)?.id, "t-earlier");
  assert.equal(liveOf(fixtures, now)?.score, undefined);
});

test("official result registered: finished, no LIVE, becomes LAST with its real score", () => {
  const fixtures = [earlier, target({ status: "finished", score: { home: 1, away: 2 } }), following];
  for (const offset of [-MIN, 45 * MIN, 4 * 60 * MIN]) {
    const now = at(offset);
    assert.equal(liveOf(fixtures, now), undefined);
    assert.equal(getLatestFinishedFixture(fixtures)?.id, "t-target");
    assert.deepEqual(getLatestFinishedFixture(fixtures)?.score, { home: 1, away: 2 });
  }
  assert.equal(resolveMatchStatus({ status: "finished", kickoffAt: KICKOFF }, at(45 * MIN)), "finished");
});

test("JST and UTC comparisons agree at the kickoff boundary", () => {
  const justBeforeUtc = new Date("2026-10-11T05:59:59Z");
  const atKickoffUtc = new Date("2026-10-11T06:00:00Z");
  assert.equal(new Date(KICKOFF).getTime(), atKickoffUtc.getTime());
  assert.equal(resolveMatchStatus({ status: "scheduled", kickoffAt: KICKOFF }, justBeforeUtc), "scheduled");
  assert.equal(resolveMatchStatus({ status: "scheduled", kickoffAt: KICKOFF }, atKickoffUtc), "live");
  // 同じ瞬間をJSTオフセット付きISOで与えても結果は同じ。
  assert.equal(resolveMatchStatus({ status: "scheduled", kickoffAt: KICKOFF }, new Date("2026-10-11T14:59:59+09:00")), "scheduled");
  assert.equal(resolveMatchStatus({ status: "scheduled", kickoffAt: "2026-10-11T06:00:00Z" }, new Date("2026-10-11T15:00:00+09:00")), "live");
});
