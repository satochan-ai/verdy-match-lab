import type { CommonFixture } from "../types/fixture";

// 名古屋戦の結果反映前の表示を、当時の予定キックオフで再現する。
export function beforeNagoyaResult(fixtures: readonly CommonFixture[]): CommonFixture[] {
  return fixtures.map((fixture) => fixture.id === "sched-nagoya"
    ? { ...fixture, kickoffAt: "2026-11-21T14:00:00+09:00", status: "scheduled", score: undefined, detailMatchId: undefined }
    : fixture);
}
