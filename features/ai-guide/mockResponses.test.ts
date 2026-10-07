import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../../lib/mock/matches.ts";
import { getPostMatchAnalysis } from "./mockResponses.ts";

const summary = (id: string) => {
  const match = matches.find((item) => item.id === id)!;
  const section = getPostMatchAnalysis(match).sections.find((item) => item.heading === "試合総括");
  return section?.body ?? "";
};

test("MATCH REVIEW: a 90-minute result keeps the plain wording", () => {
  // 結果文は従来どおり（前に三策の導入文、後ろにmatchNotes[0]が続く）。
  const body = summary("match-14");
  assert.ok(body.includes("浦和レッズとの一戦は3-1で終了。"));
  assert.equal(body.includes("延長戦の末"), false);
  assert.equal(body.includes("PK戦"), false);
});

test("MATCH REVIEW: an extra-time result (no penalties) says it was decided in extra time with the final score", () => {
  const body = summary("match-15");
  assert.ok(body.startsWith("サガン鳥栖との一戦は延長戦の末、2-1で終了。"));
  assert.equal(body.includes("PK戦"), false);
});

test("MATCH REVIEW: a penalty-shootout result shows 0-0, extra time, the PK score and the winner (Tokyo Verdy WIN)", () => {
  const body = summary("sched-emperor-tottori");
  assert.equal(body, "ガイナーレ鳥取との一戦は0-0で延長戦を終え、PK戦3-4で東京ヴェルディが勝利。");
  assert.equal(body.includes("0-0で終了"), false);
});
