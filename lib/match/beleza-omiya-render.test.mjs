import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

test("大宮 detail renders the observed pitch in the supplied order, official squads and separate factual review", async () => {
  const ctx = renderContext("2026-11-01T10:00:00+09:00");
  const html = await ctx.render("app/beleza/matches/[id]/page.tsx", { params: Promise.resolve({ id: "beleza-next-12" }) });
  const pitch = html.match(/<section[^>]*aria-labelledby="omiya-league-observed-beleza"[\s\S]*?<\/section>/)?.[0];
  assert.ok(pitch);
  const numbers = [...pitch.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map(m => Number(m[1]));
  // FormationPitchは前線から描画し、各行の左右順を保持する。
  assert.deepEqual(numbers, [11, 20, 18, 13, 6, 19, 38, 5, 3, 2, 21]);
  for (const text of ["観戦・提供情報に基づく配置", "公式記録の登録ポジションとは区別", "STARTING XI", "BENCH", "式田和が先制、終盤に樋渡百花が決勝点。大宮に2-1で勝利", "シュート数はベレーザ18本、大宮7本", "コーナーキックは11対1", "FKは", "東京NB 1／大宮 2"]) assert.ok(html.includes(text), text);
  assert.ok(!html.includes("観戦者の所感"));
  const overview = await ctx.render("app/beleza/page.tsx");
  assert.ok(overview.includes('href="/beleza/matches/beleza-next-12"'));
  assert.ok(overview.includes("11.07 SAT"));
});
