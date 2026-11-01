import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

const marker = 'aria-label="長崎戦 両チーム予想スタメン"';
const expected = [33, 25, 40, 16, 8, 19, 18, 29, 96, 22, 1];

test("Nagasaki prediction renders the supplied 4-4-2 left to right in NEXT and LIVE", async () => {
  for (const time of ["2026-11-01T13:59:00+09:00", "2026-11-01T14:00:00+09:00"]) {
    const html = await renderContext(time).render("app/top/page.tsx");
    assert.ok(html.includes(marker));
    const section = html.split(marker)[1].split("</section>")[0];
    const verdy = section.split('aria-label="東京ヴェルディ 4-4-2"')[1].split("</article>")[0];
    const numbers = [...verdy.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map(m => Number(m[1]));
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
    assert.ok(html.indexOf('aria-label="長崎戦 MATCH PREVIEW"') < html.indexOf('aria-label="長崎戦 軍師の三策"'));
    assert.ok(html.indexOf('aria-label="長崎戦 軍師の三策"') < html.indexOf(marker));
    assert.match(section, /https:\/\/www.jleague.jp\/match\/j1\/2026\/110103\//);
    assert.match(section, /match_card_id=34628/);
  }
});

test("Nagasaki opponent prediction renders eleven unique players in the supplied 3-4-2-1 order", async () => {
  for (const time of ["2026-11-01T13:59:00+09:00", "2026-11-01T14:00:00+09:00"]) {
    const html = await renderContext(time).render("app/top/page.tsx");
    const section = html.split(marker)[1].split("</section>")[0];
    const opponent = section.split('aria-label="V・ファーレン長崎 3-4-2-1"')[1].split("</article>")[0];
    const numbers = [...opponent.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map(m => Number(m[1]));
    assert.deepEqual(numbers, [99, 34, 10, 22, 41, 5, 23, 6, 29, 31, 1]);
    assert.equal(new Set(numbers).size, 11);
    assert.deepEqual([...opponent.matchAll(/grid-template-columns:repeat\((\d+),/g)].map(m => Number(m[1])), [1, 2, 4, 3, 1]);
    for (const name of ["ジョナタン", "ジュニオール", "松本天夢", "マテウス", "ジェズス", "翁長聖", "長谷川元希", "山口蛍", "米田隼也", "江川湧清", "新井一耀", "土肥幹太", "後藤雅明", "候補：大南拓磨", "候補：澤田崇"]) assert.ok(opponent.includes(name), name);
    assert.match(opponent, /bg-blue-800 ring-2 ring-orange-600/);
    assert.match(section, /lg:grid-cols-2/);
    assert.match(section, /4試合連続先発/);
    assert.match(section, /直近3試合連続先発/);
    assert.match(section, /左WBが米田、右WBが翁長/);
    assert.match(section, /本予想は左翁長・右米田/);
    for (const id of [34601, 34613, 34625, 34631]) assert.ok(section.includes(`match_card_id=${id}`));
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
