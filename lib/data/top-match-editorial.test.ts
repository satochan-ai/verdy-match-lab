import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../mock/matches.ts";

const match10 = matches.find((item) => item.id === "match-10")!;

test("match-10 carries the pre-match editorial layer", () => {
  assert.equal(match10.strategies.length, 3);
  assert.equal(match10.focusPoints.length, 3);
  assert.ok(match10.matchNotes.length > 0, "試合前短評 (matchNotes) should be present");
});

test("match-10 strategies are pre-match (pending, no result comment)", () => {
  assert.deepEqual(
    match10.strategies.map((s) => s.orderNo),
    [1, 2, 3],
  );
  for (const s of match10.strategies) {
    assert.equal(s.result, "pending");
    assert.equal(s.resultComment, undefined);
    assert.ok(s.title.length > 0);
    assert.ok(s.description.length > 0);
  }
});
