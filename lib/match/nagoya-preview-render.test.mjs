import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";
import { shouldShowNagoyaPreview } from "./nagoya-preview.ts";

const markers = [
  'aria-label="名古屋戦 MATCH PREVIEW"',
  'aria-label="名古屋戦 軍師の三策"',
  'aria-label="名古屋戦 両チーム予想スタメン"',
  'aria-label="名古屋戦 勝敗予想"',
];

const preMatch = (fixtures) => fixtures.map((fixture) => fixture.id === "sched-nagoya"
  ? { ...fixture, status: "scheduled", score: undefined, detailMatchId: undefined }
  : fixture);

test("名古屋戦の表示中だけ予想ピッチと試合前分析を描画する", async () => {
  for (const [time, heading] of [
    ["2026-11-21T13:59:00+09:00", "NEXT MATCH"],
    ["2026-11-21T14:00:00+09:00", "LIVE MATCH"],
  ]) {
    const html = await renderContext(time, preMatch).render("app/top/page.tsx");
    const header = html.split("</section>", 1)[0];
    assert.ok(header.includes(heading));
    assert.ok(header.includes("名古屋グランパス"));
    for (const marker of markers) assert.equal(html.split(marker).length, 2, marker);
    for (const [team, numbers] of [
      ["東京ヴェルディ 4-4-2", [9, 33, 40, 16, 10, 19, 18, 29, 4, 22, 1]],
      ["名古屋グランパス 3-4-2-1", [11, 22, 17, 27, 31, 15, 7, 3, 13, 70, 1]],
    ]) {
      const pitch = html.split(`aria-label="${team}"`)[1].split("</article>")[0];
      const renderedNumbers = [...pitch.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map((match) => Number(match[1]));
      assert.deepEqual(renderedNumbers, numbers);
      assert.equal([...pitch.matchAll(/<dt\b/g)].length, 11);
    }
    assert.ok(html.includes("東京V 1–0 名古屋"));
    assert.ok(html.includes("/match/j1/2026/112101/"));
    assert.ok(!html.includes('aria-label="清水戦 MATCH PREVIEW"'));
  }
});

test("別カード・名古屋戦の結果登録後・他カテゴリに名古屋戦プレビューを出さない", async () => {
  const before = await renderContext("2026-11-07T12:59:00+09:00").render("app/top/page.tsx");
  assert.ok(before.includes('aria-label="清水戦 MATCH PREVIEW"'));

  const finished = (fixtures) => fixtures.map((fixture) => fixture.id === "sched-nagoya"
    ? { ...fixture, status: "finished", score: { home: 0, away: 0 } }
    : fixture);
  const nextTime = "2026-11-21T18:00:00+09:00";
  const after = await renderContext(nextTime, finished).render("app/top/page.tsx");
  const header = after.split("</section>", 1)[0];
  assert.ok(header.includes("NEXT MATCH"));
  assert.ok(header.includes("水戸ホーリーホック"));

  const categoryTime = "2026-11-19T19:00:00+09:00";
  const category = renderContext(categoryTime);
  const [beleza, u21] = await Promise.all([
    category.render("app/beleza/page.tsx"),
    category.render("app/u21/page.tsx"),
  ]);
  for (const html of [before, after, beleza, u21]) {
    for (const marker of markers) assert.ok(!html.includes(marker), marker);
  }

  assert.equal(shouldShowNagoyaPreview({ id: "sched-nagoya", status: "half_time" }), true);
  assert.equal(shouldShowNagoyaPreview({ id: "sched-nagoya", status: "finished" }), false);
  assert.equal(shouldShowNagoyaPreview(undefined), false);
});
