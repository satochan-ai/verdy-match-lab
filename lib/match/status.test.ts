import assert from "node:assert/strict";
import test from "node:test";
import { resolveMatchStatus } from "./status.ts";

test("scheduled + future kickoffAt stays scheduled", () => {
  const now = new Date("2026-09-12T17:59:00+09:00");
  const match = { status: "scheduled" as const, kickoffAt: "2026-09-12T18:00:00+09:00" };
  assert.equal(resolveMatchStatus(match, now), "scheduled");
});

test("scheduled + kickoffAt just passed becomes live", () => {
  const now = new Date("2026-09-12T18:01:00+09:00");
  const match = { status: "scheduled" as const, kickoffAt: "2026-09-12T18:00:00+09:00" };
  assert.equal(resolveMatchStatus(match, now), "live");
});

test("scheduled never auto-promotes to finished no matter how much time has elapsed", () => {
  const match = { status: "scheduled" as const, kickoffAt: "2026-09-12T18:00:00+09:00" };
  // 3時間後（旧LIVE_WINDOW境界）でもfinishedにならない。
  assert.equal(resolveMatchStatus(match, new Date("2026-09-12T21:00:01+09:00")), "live");
  // 何日経ってもfinishedにならない（公式結果登録＝明示的なstatus更新のみがfinishedにする）。
  assert.equal(resolveMatchStatus(match, new Date("2026-09-20T00:00:00+09:00")), "live");
});

test("explicit status is always respected regardless of kickoffAt", () => {
  const kickoffAt = "2020-01-01T18:00:00+09:00";
  const now = new Date("2026-09-12T18:00:00+09:00");
  assert.equal(resolveMatchStatus({ status: "finished", kickoffAt }, now), "finished");
  assert.equal(resolveMatchStatus({ status: "live", kickoffAt }, now), "live");
  assert.equal(resolveMatchStatus({ status: "half_time", kickoffAt }, now), "half_time");
  // 未来のkickoffAtでも、明示statusがfinished/liveならそのまま尊重する。
  const futureKickoff = "2099-01-01T18:00:00+09:00";
  assert.equal(resolveMatchStatus({ status: "finished", kickoffAt: futureKickoff }, now), "finished");
});
