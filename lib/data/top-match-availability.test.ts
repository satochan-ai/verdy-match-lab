import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../mock/matches.ts";

const match10 = matches.find((item) => item.id === "match-10")!;

test("match-10 exposes pre-match availability for both teams", () => {
  assert.ok(match10.availability, "match-10 should have availability info");
});

test("match-10 lists three expected absences per team without mixing home/away", () => {
  const { likelyUnavailable } = match10.availability!;

  const verdy = likelyUnavailable.find((entry) => entry.team === "東京V");
  const kobe = likelyUnavailable.find((entry) => entry.team === "神戸");

  assert.ok(verdy, "東京V entry should exist");
  assert.ok(kobe, "神戸 entry should exist");

  assert.deepEqual(verdy!.players, ["森田 晃樹", "吉田 泰授", "山見 大登"]);
  assert.deepEqual(kobe!.players, ["佐々木 大樹", "扇原 貴宏", "アンデルソン・ロペス"]);

  // home/away混同がないこと（各チームの選手が相手側に紛れていない）。
  const overlap = verdy!.players.filter((name) => kobe!.players.includes(name));
  assert.deepEqual(overlap, []);
});

test("match-10 has no suspensions or contract-ineligible players", () => {
  assert.equal(match10.availability!.suspensionNote, "なし");
  assert.equal(match10.availability!.ineligibleNote, "なし");
});
