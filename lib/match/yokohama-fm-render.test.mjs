import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

const preview = 'aria-label="横浜FM戦 MATCH PREVIEW（東京V／横浜FM）"';
const strategies = 'aria-label="横浜FM戦 軍師の三策（東京V／横浜FM）"';
const predictions = 'aria-label="横浜FM戦 両チーム予想スタメン"';

test("actual TOP renders ordered Yokohama content in NEXT and LIVE, retaining P0 cards", async () => {
  for (const time of ["2026-10-19T12:00:00+09:00", "2026-10-21T18:59:00+09:00", "2026-10-21T19:00:00+09:00"]) {
    const ctx = renderContext(time);
    const html = await ctx.render("app/top/page.tsx");
    const ordered = ['aria-labelledby="soma-feature-title"', preview, strategies, predictions, "J1 STANDINGS"];
    let previous = -1;
    for (const marker of ordered) {
      const index = html.indexOf(marker);
      assert.ok(index > previous, marker);
      previous = index;
    }
    assert.doesNotMatch(html, /aria-label="東京ダービー|aria-label="広島戦/);
    assert.match(html, /4-4-2/);
    assert.match(html, /4-2-3-1/);
    assert.match(html, /クラブ発表のスターティングメンバーではありません/);
    assert.match(html, /両選手の欠場が公式発表されたとするものではありません/);
    const topCard = html.match(/<section\b[\s\S]*?<\/section>/)[0];
    const home = await ctx.render("app/page.tsx");
    const homeCard = home.match(/<section aria-labelledby="home-next-match"[\s\S]*?<\/section>/)[0];
    for (const card of [topCard, homeCard]) {
      assert.match(card, time.includes("T19:00") ? />LIVE MATCH</ : />NEXT MATCH</);
      assert.match(card, /横浜F・マリノス/);
      assert.match(card, /試合詳細は公式結果の登録後に公開します/);
      assert.doesNotMatch(card, /href="\/matches\/sched-yokohama-fm"/);
    }
    assert.match(html, /href="\/matches\/sched-fc-tokyo"/);
  }
});

test("finished or other NEXT hides Yokohama modules but preserves manager feature", async () => {
  const ctx = renderContext("2026-10-21T22:00:00+09:00", fixtures => fixtures.map(f => f.id === "sched-yokohama-fm" ? { ...f, status: "finished", score: { home: 0, away: 0 } } : f));
  const html = await ctx.render("app/top/page.tsx");
  for (const marker of [preview, strategies, predictions]) assert.ok(!html.includes(marker));
  assert.match(html, /相馬直樹新監督特集/);
  assert.match(html, /アビスパ福岡/);
});

test("published historic FC Tokyo and Hiroshima content still renders under their original gates", async () => {
  const derby = await renderContext("2026-10-17T13:59:00+09:00", undefined, true).render("app/top/page.tsx");
  assert.match(derby, /aria-label="東京ダービー MATCH PREVIEW/);
  assert.ok(!derby.includes(preview));
  const ctx = renderContext("2026-10-11T12:00:00+09:00", fixtures => [ { ...fixtures.find(f => f.id === "sched-hiroshima"), status: "scheduled" } ]);
  const hiroshima = await ctx.render("app/top/page.tsx");
  assert.match(hiroshima, /MATCH PREVIEW/);
  assert.ok(!hiroshima.includes(preview));
});
