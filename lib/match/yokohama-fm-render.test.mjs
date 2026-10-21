import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

const preview = 'aria-label="横浜FM戦 MATCH PREVIEW（東京V／横浜FM）"';
const strategies = 'aria-label="横浜FM戦 軍師の三策（東京V／横浜FM）"';
const predictions = 'aria-label="横浜FM戦 両チーム予想スタメン"';

test("actual TOP renders ordered Yokohama content in NEXT and LIVE, retaining P0 cards", async () => {
  for (const time of ["2026-10-19T12:00:00+09:00", "2026-10-21T18:59:00+09:00", "2026-10-21T19:00:00+09:00"]) {
    const ctx = renderContext(time, undefined, "post-derby");
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

test("current official result: TOP/HOME LAST links the detail, NEXT is Fukuoka, Yokohama PRE leaves TOP", async () => {
  const ctx = renderContext("2026-10-21T23:30:00+09:00");
  const top = await ctx.render("app/top/page.tsx");
  const home = await ctx.render("app/page.tsx");
  for (const marker of [preview, strategies, predictions]) assert.ok(!top.includes(marker));
  assert.match(top, /相馬直樹新監督特集/);
  assert.match(top, /href="\/matches\/sched-yokohama-fm"/);
  assert.match(top, /2-2/);
  assert.match(top, /アビスパ福岡/);
  assert.doesNotMatch(top, /LIVE MATCH/);
  // 福岡戦は詳細未公開のため、既存どおり案内文を表示し、存在しないURLへはリンクしない。
  assert.match(top, /試合詳細は公式結果の登録後に公開します/);
  assert.doesNotMatch(top, /href="\/matches\/sched-fukuoka"/);
  const homeCard = home.match(/<section aria-labelledby="home-next-match"[\s\S]*?<\/section>/)[0];
  assert.match(homeCard, />NEXT MATCH</);
  assert.match(homeCard, /アビスパ福岡/);
  assert.doesNotMatch(homeCard, /LIVE MATCH/);
  // 2026年10月21日21:59更新の公式順位表（東京V 20位・勝点5・11試合）。
  assert.match(top, /2026年10月21日21:59更新/);
});

test("detail /matches/sched-yokohama-fm renders the official record, review and prediction check", async () => {
  const ctx = renderContext("2026-10-21T23:30:00+09:00");
  const html = await ctx.render("app/matches/[id]/page.tsx", { params: Promise.resolve({ id: "sched-yokohama-fm" }) });
  assert.match(html, /試合終了/);
  assert.match(html, /横浜F・マリノス/);
  for (const text of ["宮市 亮", "遠野 大弥", "藤本 寛也", "山田 剛綺", "40,765", "小屋 幸栄", "STARTING XI"]) assert.ok(html.includes(text), text);
  assert.match(html, /90\+3&#x27;/);
  // Jリーグ公式「前半0分」の開始時フォーメーションを既存のピッチ表示で出し、予想とは別物であることを明示する。
  assert.match(html, /OFFICIAL LINEUP/);
  assert.match(html, /フォーメーションと選手配置：Jリーグ公式 フォーメーション「前半0分」（試合開始時）。試合前の予想フォーメーションとは別の、実際の配置です。/);
  const pitchNumbers = (marker) => {
    const section = html.split(`aria-labelledby="official-formation-${marker}"`)[1].split("</section>")[0];
    return [...section.matchAll(/tabular-nums[^"]*">(\d+)<\/span>/g)].map((m) => Number(m[1]));
  };
  // 表示順：前線→最終ライン→GK、各行は左→右。
  assert.deepEqual(pitchNumbers("yokohama-f-marinos"), [9, 11, 7, 23, 14, 41, 13, 33, 17, 34, 21]);
  assert.deepEqual(pitchNumbers("verdy"), [33, 25, 40, 16, 8, 19, 18, 96, 4, 15, 1]);
  assert.match(html, /4-2-3-1/);
  assert.match(html, /<p class="shrink-0 text-\[12px\] font-bold tabular-nums text-text-secondary">4-4-2<\/p>/);
  assert.match(html, /aria-label="観戦レビュー"/);
  assert.match(html, /観戦者本人の主観を含むレビュー/);
  assert.match(html, /2点差からの追撃。勝点1の収穫と、もう1点への思い/);
  assert.match(html, /aria-label="予想スタメンの答え合わせ"/);
  assert.match(html, /予想 4-4-2 ／ 公式の開始時フォーメーション 4-4-2 → <span class="font-bold">一致<\/span>/);
  assert.match(html, /予想 4-2-3-1 ／ 公式の開始時フォーメーション 4-2-3-1 → <span class="font-bold">一致<\/span>/);
  assert.match(html, /試合前に公開した予想スタメン（公開時点のまま）/);
  assert.match(html, /クラブ発表のスターティングメンバーではありません/);
  // 試合後の総括は確認済みの公式情報のみ。
  assert.match(html, /確認済み試合情報/);
});

test("other finished details keep their pitch-based OFFICIAL LINEUP section", async () => {
  const ctx = renderContext("2026-10-21T23:30:00+09:00");
  for (const id of ["sched-fc-tokyo", "sched-hiroshima"]) {
    const html = await ctx.render("app/matches/[id]/page.tsx", { params: Promise.resolve({ id }) });
    assert.match(html, /OFFICIAL LINEUP/);
    assert.doesNotMatch(html, /aria-label="観戦レビュー"/);
  }
});
