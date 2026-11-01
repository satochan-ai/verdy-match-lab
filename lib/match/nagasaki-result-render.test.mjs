import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

test("Nagasaki finished detail renders official formations, prediction checks, review and bounded strategy verdicts", async () => {
  const html=await renderContext("2026-11-01T19:00:00+09:00").render("app/matches/[id]/page.tsx",{params:Promise.resolve({id:"sched-nagasaki"})});
  for(const text of ["試合終了","OFFICIAL LINEUP","3-4-2-1","4-4-2","前半0分","20,246","45+12","脳振盪交代","東京ヴェルディ：9人／11人 一致","V・ファーレン長崎：9人／11人 一致","評価：判断保留","評価：一部成功","観戦者の所感","保存版","シュートはData Site公式記録"]) assert.ok(html.includes(text),text);
  assert.ok(html.includes("染野が先制、一美が決勝点。長崎を2-1で下し今季初の連勝"));
  assert.doesNotMatch(html,/勝敗を分けたポイント|次戦への注目点|評価待ち/);
  const pitch=(id)=>html.split(`aria-labelledby="official-formation-${id}"`)[1].split("</section>")[0];
  const numbers=(s)=>[...s.matchAll(/tabular-nums[^"]*">(\d+)<\/span>/g)].map(m=>Number(m[1]));
  assert.deepEqual(numbers(pitch("verdy")),[9,33,40,16,8,19,18,96,4,22,1]);
  assert.deepEqual(numbers(pitch("v-varen-nagasaki")),[99,16,10,23,41,5,22,6,31,50,1]);
});

test("TOP and HOME advance to Shimizu while LAST links the Nagasaki win; PRE stays in detail archive", async () => {
  const ctx=renderContext("2026-11-01T19:00:00+09:00");
  const top=await ctx.render("app/top/page.tsx");
  const card=top.match(/<section\b[\s\S]*?<\/section>/)[0];
  assert.match(card,/清水エスパルス/);
  assert.match(card,/13:00/);
  assert.match(top,/href="\/matches\/sched-nagasaki"/);
  assert.match(top,/1-2/);
  assert.match(top,/2026年11月1日18:28更新/);
  assert.doesNotMatch(top,/aria-label="長崎戦 MATCH PREVIEW"|aria-label="長崎戦 両チーム予想スタメン"/);
  const home=await ctx.render("app/page.tsx");
  assert.match(home.match(/<section aria-labelledby="home-next-match"[\s\S]*?<\/section>/)[0],/清水エスパルス/);
});
