import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));
const packageRequire = createRequire(import.meta.url);
const notice = "※試合中の表示は予定キックオフ時刻に基づいています。実際の試合状況やスコアをリアルタイム取得しているものではありません。";
const pending = "試合詳細は公式結果の登録後に公開します。";

// 追加dependencyなしで実際のTSXをSSRする。時刻とfixtureはこのloader内だけに注入し、
// OS時刻・環境変数・実データ・Nodeの共有module loaderは変更しない。
function renderContext(time, transformFixtures = (fixtures) => fixtures, historical = false) {
  const modules = new Map();
  class FixedDate extends Date {
    constructor(...args) { super(...(args.length ? args : [time])); }
    static now() { return new Date(time).getTime(); }
  }
  function load(filename) {
    if (modules.has(filename)) return modules.get(filename).exports;
    if (/\.(png|jpg)$/.test(filename)) {
      return { src: `/images/${path.basename(filename)}`, width: 1200, height: 800 };
    }
    const loadedModule = { exports: {} };
    modules.set(filename, loadedModule);
    const code = ts.transpileModule(readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const localRequire = (specifier) => {
      if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return packageRequire(specifier);
      const base = specifier.startsWith("@/") ? path.join(root, specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
      const resolved = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")].find((candidate) => existsSync(candidate) && path.extname(candidate));
      assert.ok(resolved, `module exists: ${specifier}`);
      return load(resolved);
    };
    const execute = new Function("require", "module", "exports", "Date", "process", code);
    execute(localRequire, loadedModule, loadedModule.exports, FixedDate, { env: { ...process.env, DATABASE_URL: "" } });
    if (filename === path.join(root, "lib/data/top-fixtures.ts")) {
      const fixtures = historical ? loadedModule.exports.topFixtures.map(f => f.id === "sched-fc-tokyo" ? { ...f, status: "scheduled", kickoffAt: "2026-10-17T14:00:00+09:00", score: undefined, detailMatchId: undefined } : f) : loadedModule.exports.topFixtures;
      loadedModule.exports.topFixtures = transformFixtures(fixtures);
    }
    if (historical && filename === path.join(root, "lib/mock/matches.ts")) {
      // P0当時のLASTも再現し、現在の確定結果とは分けて検証する。
      loadedModule.exports.getRecentFinishedMatch = () => loadedModule.exports.getMatchById("sched-hiroshima");
    }
    return loadedModule.exports;
  }
  return {
    async render(route, props) {
      const Page = load(path.join(root, route)).default;
      return renderToStaticMarkup(await Page(props));
    },
  };
}

function card(html, home) {
  const pattern = home
    ? /<section aria-labelledby="home-next-match"[\s\S]*?<\/section>/
    : /<section\b[\s\S]*?<\/section>/;
  const result = html.match(pattern)?.[0];
  assert.ok(result, "actual match card is rendered");
  return result;
}

async function renderPair(time, transform) {
  const context = renderContext(time, transform, true);
  const top = await context.render("app/top/page.tsx");
  const home = await context.render("app/page.tsx");
  return { top, home, cards: [card(top, false), card(home, true)] };
}

test("13:59: actual TOP and HOME cards render NEXT, kickoff and opponent", async () => {
  const { cards } = await renderPair("2026-10-17T13:59:00+09:00");
  for (const html of cards) {
    assert.match(html, />NEXT MATCH</);
    assert.doesNotMatch(html, /LIVE MATCH/);
    assert.ok(!html.includes(notice));
    assert.match(html, /FC東京/);
    assert.match(html, /14:00/);
  }
  assert.match(cards[1], /TOP TEAM 次戦/);
});

test("14:00: actual TOP and HOME cards agree on LIVE and realtime disclaimer", async () => {
  const { cards } = await renderPair("2026-10-17T14:00:00+09:00");
  for (const html of cards) {
    assert.match(html, />LIVE MATCH</);
    assert.doesNotMatch(html, /NEXT MATCH|TOP TEAM 次戦/);
    assert.ok(html.includes(notice));
    assert.match(html, /試合中/);
    assert.match(html, /FC東京/);
    assert.match(html, /14:00/);
  }
});

test("14:44: no detail ID means guidance, no detail button or self-link in either card", async () => {
  const { cards } = await renderPair("2026-10-17T14:44:00+09:00");
  for (const html of cards) {
    assert.ok(html.includes(pending));
    assert.doesNotMatch(html, /試合詳細を見る|href="\/top"|href="\/matches\//);
  }
});

test("published detail: actual Link renders the existing /matches URL before and during LIVE", async () => {
  // 公開済み広島詳細を持つカードを、隔離fixtureだけで検証時刻に配置する。
  const transform = (fixtures) => [
    { ...fixtures.find((f) => f.id === "sched-hiroshima"), status: "scheduled", kickoffAt: "2026-10-17T14:00:00+09:00", score: undefined },
  ];
  for (const time of ["2026-10-17T13:59:00+09:00", "2026-10-17T14:00:00+09:00"]) {
    const { cards } = await renderPair(time, transform);
    for (const html of cards) {
      assert.match(html, /<a\b[^>]*href="\/matches\/sched-hiroshima"[^>]*>試合詳細を見る<\/a>/);
      assert.ok(!html.includes(pending));
      assert.doesNotMatch(html, /href="\/top"/);
    }
  }
});

test("dangling detail ID: neither card links to a nonexistent page", async () => {
  const transform = (fixtures) => fixtures.map((f) => f.id === "sched-fc-tokyo" ? { ...f, detailMatchId: "test-missing-detail" } : f);
  const { cards } = await renderPair("2026-10-17T14:44:00+09:00", transform);
  for (const html of cards) {
    assert.ok(html.includes(pending));
    assert.doesNotMatch(html, /試合詳細を見る|href="\/matches\/test-missing-detail"/);
  }
});

test("finished match: actual TOP preserves LAST result and existing archive URL", async () => {
  const { top } = await renderPair("2026-10-17T14:44:00+09:00");
  const last = top.match(/<section>\s*<p[^>]*>LAST MATCH<\/p>[\s\S]*?<\/section>/)?.[0];
  assert.ok(last);
  assert.match(last, /href="\/matches\/sched-hiroshima"/);
  assert.match(last, /サンフレッチェ広島/);
  assert.match(last, /0-2/);
});

test("FC Tokyo PREVIEW, strategies and predicted XI remain rendered in NEXT and LIVE", async () => {
  for (const time of ["2026-10-17T13:59:00+09:00", "2026-10-17T14:44:00+09:00"]) {
    const { top } = await renderPair(time);
    for (const label of ["東京ダービー MATCH PREVIEW（東京V／FC東京）", "東京ダービー 軍師の三策（東京V／FC東京）", "東京ダービー FC東京戦 予想スタメン"]) {
      assert.ok(top.includes(label), label);
    }
  }
});

test("finished FC Tokyo fixture: both cards show next opponent; derby PRE content leaves TOP", async () => {
  // 結果値は作らず、隔離したfixtureのstatusだけを更新する。
  const transform = (fixtures) => fixtures.map((f) => f.id === "sched-fc-tokyo" ? { ...f, status: "finished" } : f);
  const { top, cards } = await renderPair("2026-10-17T18:00:00+09:00", transform);
  for (const html of cards) {
    assert.match(html, />NEXT MATCH</);
    assert.match(html, /横浜F・マリノス/);
    assert.doesNotMatch(html, /LIVE MATCH/);
  }
  assert.doesNotMatch(top, /aria-label="東京ダービー/);
  assert.match(top, /LAST MATCH/);
});

test("BELEZA and U21 pages and HOME category cards render identically with isolated TOP fixture changes", async () => {
  const time = "2026-10-17T14:44:00+09:00";
  const baseline = renderContext(time);
  const changedTop = renderContext(time, (fixtures) => fixtures.map((f) => f.id === "sched-fc-tokyo" ? { ...f, detailMatchId: "test-missing-detail" } : f));
  for (const route of ["app/beleza/page.tsx", "app/u21/page.tsx"]) {
    assert.equal(await changedTop.render(route), await baseline.render(route));
  }
  const categories = (html) => html.match(/<section id="categories">[\s\S]*?<\/section>/)?.[0];
  const original = categories(await baseline.render("app/page.tsx"));
  assert.ok(original);
  assert.equal(categories(await changedTop.render("app/page.tsx")), original);
});

test("current official results: TOP and HOME are NEXT, FC Tokyo is LAST and derby PRE leaves TOP", async () => {
  const context = renderContext("2026-10-18T12:00:00+09:00");
  const top = await context.render("app/top/page.tsx");
  const home = await context.render("app/page.tsx");
  for (const html of [card(top, false), card(home, true)]) {
    assert.match(html, />NEXT MATCH</);
    assert.match(html, /横浜F・マリノス/);
    assert.doesNotMatch(html, /LIVE MATCH|href="\/top"|試合詳細を見る/);
  }
  assert.match(top, /href="\/matches\/sched-fc-tokyo"/);
  assert.match(top, /0-4/);
  assert.doesNotMatch(top, /aria-label="東京ダービー/);
  const detail = await context.render("app/matches/[id]/page.tsx", { params: Promise.resolve({ id: "sched-fc-tokyo" }) });
  assert.match(detail, /試合終了/);
  assert.match(detail, /90\+4&#x27;/);
  assert.match(detail, /染野 唯月/);
});

test("current U21 result: Nagoya is NEXT, Iwata is LAST and its actual detail renders WIN", async () => {
  const context = renderContext("2026-10-18T12:00:00+09:00");
  const page = await context.render("app/u21/page.tsx");
  assert.match(page, /href="\/u21\/matches\/u21-next-4"/);
  assert.match(page, /U-21名古屋グランパス/);
  assert.doesNotMatch(page, /aria-label="LIVE MATCH"/);
  const detail = await context.render("app/u21/matches/[id]/page.tsx", { params: Promise.resolve({ id: "u21-next-4" }) });
  assert.match(detail, /試合終了/);
  assert.match(detail, />WIN</);
  assert.match(detail, /3 - 5/);
  assert.match(detail, /馬渡 洋樹/);
  assert.match(detail, /田原 愼乃介/);
});
