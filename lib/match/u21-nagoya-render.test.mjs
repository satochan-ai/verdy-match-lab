import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

test("Nagoya detail renders goals, confirmed records, source discrepancies and review; LAST links to it", async () => {
  const ctx = renderContext("2026-11-01T17:00:00+09:00");
  const html = await ctx.render("app/u21/matches/[id]/page.tsx", { params: Promise.resolve({ id: "u21-next-5" }) });
  for (const text of ["試合終了", "公式スタメン", "得点経過", "公式スタッツ", "試合レビュー", "観戦者の所感", "13:03", "525", "川本悠祐", "90+1", "成瀬 楓悟"]) assert.ok(html.includes(text), text);
  assert.doesNotMatch(html, /LIVE Score|予想フォーメーション候補/);
  const page = await ctx.render("app/u21/page.tsx");
  assert.match(page, /href="\/u21\/matches\/u21-next-5"/);
  assert.ok(page.includes("U-21ガンバ大阪"));
  assert.ok(page.includes("15:57"));
});
