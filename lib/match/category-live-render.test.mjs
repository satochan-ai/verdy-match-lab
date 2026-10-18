import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

const notice = "※試合中の表示は予定キックオフ時刻に基づいています。実際の試合状況やスコアをリアルタイム取得しているものではありません。";
const pending = "試合詳細は公式結果の登録後に公開します。";
const categories = [
  { category: "beleza", day: "2026-10-18", kickoff: "14:00", id: "beleza-next-9", published: "beleza-match-1", label: "BELEZA", opponent: "サンフレッチェ広島レジーナ" },
  { category: "u21", day: "2026-11-01", kickoff: "13:00", id: "u21-next-5", published: "u21-next-4", label: "U-21", opponent: "U-21名古屋グランパス" },
];
function context(config, time, override = {}, only = false) {
  return renderContext(`${config.day}T${time}:00+09:00`, undefined, false, {
    [config.category]: (fixtures) => {
      const target = fixtures.find((f) => f.id === config.id);
      assert.ok(target);
      // 本番ファイルを変更せず、境界時刻・対戦相手・状態をこの描画内に限定する。
      const isolated = { ...target, opponentName: config.opponent, status: "scheduled", score: undefined,
        kickoffAt: `${config.day}T${config.kickoff}:00+09:00`, detailMatchId: undefined, ...override };
      return only ? [isolated] : fixtures.map((f) => f.id === config.id ? isolated : f);
    },
  });
}
function homeCard(html, label) {
  const match = html.match(new RegExp(`<a[^>]*aria-label="${label}のページを見る"[\\s\\S]*?<\\/a>`));
  assert.ok(match, `${label} actual HOME card`);
  return match[0];
}
function livePanel(html) { return html.match(/<section[^>]*aria-label="LIVE MATCH"[\s\S]*?<\/section>/)?.[0]; }

for (const config of categories) {
  const { category, kickoff, day, opponent } = config;
  const before = category === "beleza" ? "13:59" : "12:59";
  test(`${category}: ${before} NEXT; ${kickoff} and 15:00 LIVE in actual category and HOME`, async () => {
    for (const time of [before, kickoff, "15:00"]) {
      const ctx = context(config, time);
      const page = await ctx.render(`app/${category}/page.tsx`);
      const home = homeCard(await ctx.render("app/page.tsx"), config.label);
      if (time === before) {
        assert.equal(livePanel(page), undefined);
        assert.match(home, />NEXT MATCH</);
      } else {
        const panel = livePanel(page);
        assert.ok(panel);
        assert.match(panel, />LIVE MATCH</);
        assert.ok(panel.includes(opponent));
        assert.ok(panel.includes(pending));
        assert.ok(panel.includes(notice));
        assert.doesNotMatch(panel, /<a\b|試合詳細を見る/);
        assert.match(home, />LIVE</);
      }
      assert.ok(home.includes(opponent));
    }
  });
  test(`${category}: registered detail has explicit button and renders its real route`, async () => {
    const ctx = context(config, kickoff, { detailMatchId: config.published });
    const panel = livePanel(await ctx.render(`app/${category}/page.tsx`));
    assert.match(panel, new RegExp(`<a[^>]*href="/${category}/matches/${config.published}"[^>]*>試合詳細を見る</a>`));
    assert.ok(panel.includes(notice));
    assert.ok(!panel.includes(pending));
    assert.doesNotMatch(panel, /<a[^>]*>\s*<section/);
    const detail = await ctx.render(`app/${category}/matches/[id]/page.tsx`, { params: Promise.resolve({ id: config.published }) });
    assert.match(detail, /試合終了/);
  });
  test(`${category}: dangling or other-category detail ID produces guidance, never 404/self-link`, async () => {
    for (const id of ["does-not-exist", category === "beleza" ? "u21-next-4" : "beleza-match-1"]) {
      const panel = livePanel(await context(config, kickoff, { detailMatchId: id }).render(`app/${category}/page.tsx`));
      assert.ok(panel.includes(pending));
      assert.doesNotMatch(panel, /<a\b|試合詳細を見る/);
    }
  });
  test(`${category}: explicit live/half_time stay LIVE even without a kickoff`, async () => {
    for (const status of ["live", "half_time"]) {
      const ctx = context(config, before, { status, kickoffAt: undefined });
      assert.ok(livePanel(await ctx.render(`app/${category}/page.tsx`)));
      const home = homeCard(await ctx.render("app/page.tsx"), config.label);
      assert.match(home, />LIVE</);
      assert.ok(home.includes(opponent));
    }
  });
  test(`${category}: finished clears LIVE, preserves LAST and advances NEXT / Next5`, async () => {
    const ctx = context(config, "18:00", { status: "finished", score: { home: 1, away: 0 } });
    const page = await ctx.render(`app/${category}/page.tsx`);
    assert.equal(livePanel(page), undefined);
    assert.match(page, /LAST MATCH/);
    assert.ok(page.split("LAST MATCH")[1].includes(opponent));
    const home = homeCard(await ctx.render("app/page.tsx"), config.label);
    assert.match(home, />NEXT MATCH</);
    assert.ok(!home.includes(opponent));
    const nextArea = page.split("LAST MATCH")[0];
    assert.ok(!nextArea.includes(opponent), `${day} finished fixture excluded from NEXT and Next5`);
    const lastOnly = context(config, "18:00", { status: "finished", score: { home: 1, away: 0 } }, true);
    assert.match(homeCard(await lastOnly.render("app/page.tsx"), config.label), />LAST RESULT</);
  });
  test(`${category}: empty fixtures show the existing information-pending fallback`, async () => {
    const ctx = renderContext(`${day}T18:00:00+09:00`, undefined, false, { [category]: () => [] });
    const card = homeCard(await ctx.render("app/page.tsx"), config.label);
    assert.match(card, /次戦情報準備中/);
    assert.doesNotMatch(card, />LIVE</);
  });
  test(`${category}: existing published fixture links still render accepted detail pages`, async () => {
    const ctx = renderContext("2026-10-18T12:00:00+09:00");
    const html = await ctx.render(`app/${category}/page.tsx`);
    const ids = [...html.matchAll(new RegExp(`href="/${category}/matches/([^"/]+)"`, "g"))].map((m) => m[1]);
    assert.ok(ids.length);
    for (const id of new Set(ids)) {
      assert.ok(await ctx.render(`app/${category}/matches/[id]/page.tsx`, { params: Promise.resolve({ id }) }));
    }
    await assert.rejects(ctx.render(`app/${category}/matches/[id]/page.tsx`, { params: Promise.resolve({ id: "does-not-exist" }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
  });
}
