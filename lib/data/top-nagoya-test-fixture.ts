import type { CommonFixture } from "../types/fixture";

// 結果反映前の表示を、当時の予定キックオフで再現する。
export function beforeMitoResult(fixtures: readonly CommonFixture[]): CommonFixture[] {
  return fixtures.map((fixture) => fixture.id === "sched-mito"
    ? { ...fixture, kickoffAt: "2026-11-25T19:00:00+09:00", status: "scheduled", score: undefined, detailMatchId: undefined }
    : fixture);
}

export function beforeNagoyaResult(fixtures: readonly CommonFixture[]): CommonFixture[] {
  return beforeMitoResult(fixtures).map((fixture) => fixture.id === "sched-nagoya"
    ? { ...fixture, kickoffAt: "2026-11-21T14:00:00+09:00", status: "scheduled", score: undefined, detailMatchId: undefined }
    : fixture);
}
