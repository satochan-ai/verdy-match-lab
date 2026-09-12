import assert from "node:assert/strict";
import test from "node:test";
import { resolveMatchStatus } from "./status.ts";

test("scheduled fixture before kickoff stays scheduled", () => {
  const match = { status: "scheduled" as const, kickoffAt: "2026-09-12T18:00:00+09:00" };
  assert.equal(resolveMatchStatus(match, new Date("2026-09-12T17:59:00+09:00")), "scheduled");
});

test("scheduled fixture becomes live right after kickoff", () => {
  const match = { status: "scheduled" as const, kickoffAt: "2026-09-12T18:00:00+09:00" };
  assert.equal(resolveMatchStatus(match, new Date("2026-09-12T18:01:00+09:00")), "live");
});

test("scheduled fixture never auto-promotes to finished purely from elapsed time", () => {
  // 過去に存在した「kickoffAtから3時間経過したらfinishedへ自動昇格する」安全策は、
  // 公式結果未登録の試合をscore未定のまま「終了済み」と誤表示する事故の原因だったため廃止した。
  // status: "scheduled"のままである限り、どれだけ時間が経ってもfinishedにはならないことを固定する。
  const match = { status: "scheduled" as const, kickoffAt: "2026-09-12T18:00:00+09:00" };
  assert.equal(resolveMatchStatus(match, new Date("2026-09-12T22:00:00+09:00")), "live");
  assert.equal(resolveMatchStatus(match, new Date("2026-09-13T18:00:00+09:00")), "live");
  assert.equal(resolveMatchStatus(match, new Date("2026-12-31T00:00:00+09:00")), "live");
});

test("explicit status values are always respected as-is", () => {
  const kickoffAt = "2026-09-12T18:00:00+09:00";
  const now = new Date("2026-09-13T00:00:00+09:00");
  assert.equal(resolveMatchStatus({ status: "finished", kickoffAt }, now), "finished");
  assert.equal(resolveMatchStatus({ status: "live", kickoffAt }, now), "live");
  assert.equal(resolveMatchStatus({ status: "half_time", kickoffAt }, now), "half_time");
});
