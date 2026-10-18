import assert from "node:assert/strict";
import test from "node:test";
import { getNextFixture } from "../data/fixture-selectors.ts";
import { topFixtures as currentTopFixtures } from "../data/top-fixtures.ts";
import { shouldShowHiroshimaPreContent } from "./hiroshima-content.ts";

// 広島戦終了直後の次戦表示を履歴fixtureで検証する。
const topFixtures = currentTopFixtures.map(f => f.id === "sched-fc-tokyo" ? { ...f, status: "scheduled" as const, score: undefined, kickoffAt: "2026-10-17T14:00:00+09:00" } : f);

test("Hiroshima pre-match content is shown only when the displayed NEXT is sched-hiroshima", () => {
  assert.equal(shouldShowHiroshimaPreContent({ id: "sched-hiroshima" }), true);
  assert.equal(shouldShowHiroshimaPreContent({ id: "sched-fc-tokyo" }), false);
  assert.equal(shouldShowHiroshimaPreContent(null), false);
  assert.equal(shouldShowHiroshimaPreContent(undefined), false);
});

test("Hiroshima pre-match content follows the real NEXT before and after the match", () => {
  const beforeMatch = new Date("2026-10-10T16:00:00+09:00");
  assert.equal(shouldShowHiroshimaPreContent(getNextFixture(topFixtures.map((f) => f.id === "sched-hiroshima" ? { ...f, status: "scheduled" as const, score: undefined } : f), beforeMatch)), true);
  // 広島戦が終了済みの現データではNEXTはFC東京戦となり、広島戦専用コンテンツは出ない。
  const afterMatch = new Date("2026-10-12T12:00:00+09:00");
  const next = getNextFixture(topFixtures, afterMatch);
  assert.equal(next?.id, "sched-fc-tokyo");
  assert.equal(shouldShowHiroshimaPreContent(next), false);
  // NEXTが存在しない（全試合終了）場合も出さない。
  const allFinished = topFixtures.map((f) => ({ ...f, status: "finished" as const }));
  assert.equal(shouldShowHiroshimaPreContent(getNextFixture(allFinished, afterMatch)), false);
});
