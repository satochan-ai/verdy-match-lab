import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));
const packageRequire = createRequire(import.meta.url);

// 追加dependencyなしで実際のTSXをSSRする。時刻とfixtureはこのloader内だけに注入し、
// OS時刻・環境変数・実データ・Nodeの共有module loaderは変更しない。
export function renderContext(time, transformFixtures = (fixtures) => fixtures, historical = false, categoryTransforms = {}) {
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
      // historical: true＝東京ダービー試合前（FC東京戦・横浜FM戦とも未実施）、"post-derby"＝横浜FM戦の試合前（ダービー結果登録済み）。
      const beforeDerby = (f) => f.id === "sched-fc-tokyo" ? { ...f, status: "scheduled", kickoffAt: "2026-10-17T14:00:00+09:00", score: undefined, detailMatchId: undefined } : f;
      const beforeYokohama = (f) => f.id === "sched-yokohama-fm" ? { ...f, status: "scheduled", kickoffAt: "2026-10-21T19:00:00+09:00", score: undefined, detailMatchId: undefined } : f;
      const current = loadedModule.exports.topFixtures;
      const fixtures = historical === true ? current.map(beforeDerby).map(beforeYokohama) : historical === "post-derby" ? current.map(beforeYokohama) : current;
      loadedModule.exports.topFixtures = transformFixtures(fixtures);
    }
    if (historical && filename === path.join(root, "lib/mock/matches.ts")) {
      // P0当時のLASTも再現し、現在の確定結果とは分けて検証する。
      loadedModule.exports.getRecentFinishedMatch = () => loadedModule.exports.getMatchById(historical === "post-derby" ? "sched-fc-tokyo" : "sched-hiroshima");
    }
    for (const category of ["beleza", "u21"]) {
      if (filename === path.join(root, `lib/data/${category}-fixtures.ts`) && categoryTransforms[category]) {
        loadedModule.exports[`${category}Fixtures`] = categoryTransforms[category](loadedModule.exports[`${category}Fixtures`]);
      }
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
