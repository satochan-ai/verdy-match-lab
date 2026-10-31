import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

const marker = 'aria-label="長崎戦 東京ヴェルディ予想スタメン"';
const expected = [33, 25, 40, 16, 8, 19, 18, 29, 96, 22, 1];

test("Nagasaki prediction renders the supplied 4-4-2 left to right in NEXT and LIVE", async () => {
  for (const time of ["2026-11-01T13:59:00+09:00", "2026-11-01T14:00:00+09:00"]) {
    const html = await renderContext(time).render("app/top/page.tsx");
    assert.ok(html.includes(marker));
    const section = html.split(marker)[1].split("</section>")[0];
    const numbers = [...section.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map(m => Number(m[1]));
    assert.deepEqual(numbers, expected);
    assert.equal(new Set(numbers).size, 11);
    assert.match(section, /4-4-2/);
    for (const name of ["一美和成", "熊取谷一星", "新井悠太", "平川怜", "齋藤功佑", "藤本寛也", "溝口修平", "佐古真礼", "内田陽介", "マテウス"]) assert.ok(section.includes(name), name);
    for (const note of ["クラブ発表のスターティングメンバーではありません", "林尚輝→佐古真礼の1人変更", "出場停止明け", "提供情報", "出場可否・ベンチ入りは未確認"]) assert.ok(section.includes(note), note);
    const card = html.match(/<section\b[\s\S]*?<\/section>/)[0];
    assert.match(card, time.includes("13:59") ? />NEXT MATCH</ : />LIVE MATCH</);
    assert.match(card, /V・ファーレン長崎/);
    assert.match(card, /PEACE STADIUM Connected by SoftBank/);
    assert.doesNotMatch(html, /href="\/matches\/sched-nagasaki"/);
    assert.doesNotMatch(html, /長崎戦 MATCH PREVIEW|長崎戦 軍師の三策/);
    assert.match(section, /https:\/\/www.jleague.jp\/match\/j1\/2026\/110103\//);
    assert.match(section, /match_card_id=34628/);
  }
});

test("Nagasaki prediction changes only Hayashi to Sako from the Fukuoka starting eleven", async () => {
  const html = await renderContext("2026-11-01T12:00:00+09:00").render("app/matches/[id]/page.tsx", { params: Promise.resolve({ id: "sched-fukuoka" }) });
  const pitch = html.split('aria-labelledby="official-formation-verdy"')[1].split("</section>")[0];
  const previous = [...pitch.matchAll(/tabular-nums[^"]*">(\d+)<\/span>/g)].map(m => Number(m[1]));
  assert.deepEqual(previous.filter(n => !expected.includes(n)), [4]);
  assert.deepEqual(expected.filter(n => !previous.includes(n)), [29]);
  assert.match(html, /交代策が的中！相馬ヴェルディ、福岡を3-1で下し待望の初勝利/);
});

test("finished Nagasaki fixture removes its prediction when the NEXT match changes", async () => {
  const html = await renderContext("2026-11-01T18:00:00+09:00", fixtures => fixtures.map(f => f.id === "sched-nagasaki" ? { ...f, status: "finished", score: { home: 0, away: 0 } } : f)).render("app/top/page.tsx");
  assert.ok(!html.includes(marker));
  assert.match(html, /相馬直樹新監督特集/);
});
