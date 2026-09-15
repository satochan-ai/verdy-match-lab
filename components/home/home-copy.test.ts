import assert from "node:assert/strict";
import test from "node:test";
import { homeBrandDescription, homeFeatureLabels } from "./home-copy.ts";

test("HOME brand copy communicates the club, tactical focus, and unofficial positioning", () => {
  assert.match(homeBrandDescription, /東京ヴェルディ/);
  assert.match(homeBrandDescription, /データ/);
  assert.match(homeBrandDescription, /戦術/);
  assert.match(homeBrandDescription, /非公式Match Lab/);
});

test("HOME feature labels introduce preview, formation, and review", () => {
  assert.deepEqual(homeFeatureLabels.map(([label]) => label), ["MATCH PREVIEW", "FORMATION", "MATCH REVIEW"]);
});
