import assert from "node:assert/strict";
import test from "node:test";
import { hiroshimaResult as match } from "../mock/top-hiroshima-result.ts";
import { topFixtures as currentTopFixtures } from "./top-fixtures.ts";
import { getLatestFinishedFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { getMatchResult } from "../match/result.ts";

// 10/12時点の履歴を再現し、後日のFC東京結果登録に依存させない。
const topFixtures = currentTopFixtures.map(f => f.id === "sched-fc-tokyo" ? { ...f, status: "scheduled" as const, score: undefined, detailMatchId: undefined, kickoffAt: "2026-10-17T14:00:00+09:00" } : f);
test("Hiroshima official result, squads, goals, substitutions and cards stay confirmed", () => {
  assert.equal(getMatchResult(match), "loss");
  assert.deepEqual([match.homeScore, match.awayScore], [0, 2]);
  for (const lineup of Object.values(match.actualLineups!)) {
    assert.equal(Object.values(lineup.starters).flat().length, 11);
    assert.equal(Object.values(lineup.bench).flat().length, 9);

  }
  assert.deepEqual(match.goals!.map(g => g.minute), ["47'", "58'"]);
  assert.equal(match.substitutions!.length, 10);
  assert.deepEqual(match.cards!.map(c => c.minute), ["14'", "17'", "40'", "55'"]);
});
test("Hiroshima result advances LAST and NEXT5 without duplicate fixtures", () => {
  assert.equal(getLatestFinishedFixture(topFixtures)?.id, match.id);
  const next = getUpcomingFixtures(topFixtures, new Date("2026-10-12T00:00:00+09:00"), 5);
  assert.deepEqual(next.map(f => f.opponentName), ["FC東京", "横浜F・マリノス", "アビスパ福岡", "V・ファーレン長崎", "清水エスパルス"]);
  assert.equal(new Set(topFixtures.map(f => f.id)).size, topFixtures.length);
});

test("Hiroshima starting formations preserve confirmed left-to-right positions", () => {
  const { home, away } = match.actualLineups!;
  assert.equal(home.formation, "4-4-2");
  assert.equal(away.formation, "3-4-2-1");
  assert.deepEqual(home.starters.DF, ["40 新井 悠太", "29 佐古 真礼", "4 林 尚輝", "15 鈴木 海音"]);
  assert.deepEqual(home.starters.MF, ["14 福田 湧矢", "8 齋藤 功佑", "2 柴戸 海", "19 藤本 寛也"]);
  assert.deepEqual(home.starters.FW, ["9 染野 唯月", "17 キム ヒョンウ"]);
  assert.deepEqual(away.starters.DF, ["37 キム ジュソン", "4 荒木 隼人", "15 中野 就斗"]);
  assert.deepEqual(away.starters.MF, ["18 菅 大輝", "6 川辺 駿", "35 中島 洋太朗", "5 新井 直人"]);
  assert.deepEqual(away.starters.FW, ["10 鈴木 章斗", "11 加藤 陸次樹", "23 鮎川 峻"]);
});
