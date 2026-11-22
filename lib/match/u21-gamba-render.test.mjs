import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

test("G Osaka detail renders the result, registered lineups, match record, and sourced review", async () => {
  const ctx = renderContext("2026-11-22T17:10:00+09:00");
  const route = "app/u21/matches/[id]/page.tsx";
  const html = await ctx.render(route, { params: Promise.resolve({ id: "u21-next-6" }) });
  for (const text of [
    "2 - 3", "WIN", "公式スタメン", "86 カマラ シェック セザール", "97 七久保 優", "9 林 大地",
    "得点経過", "公式スタッツ", "試合レビュー", "編集部の見方", "90+5", "90+4",
    "14:00", "14:03", "805", "13.1℃", "39%", "match_card_id=35145",
  ]) assert.ok(html.includes(text), text);
  assert.doesNotMatch(html, /LIVE Score|予想フォーメーション候補/);

  const page = await ctx.render("app/u21/page.tsx");
  assert.equal(Array.from(page.matchAll(/href="\/u21\/matches\/u21-next-6"/g)).length, 2);
  assert.match(page, /11\.29 SUN/);
  assert.match(page, /U-21ヴィッセル神戸/);
  assert.match(page, /2026\/11\/22 17:10/);
});