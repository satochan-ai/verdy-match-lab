import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";

// now依存でLIVE/NEXTを判定する4ルートは静的prerenderにしてはならない（2026-10-11 広島戦の不具合の再発防止）。
const routes: [string, string][] = [
  ["/", "app/page.tsx"],
  ["/top", "app/top/page.tsx"],
  ["/beleza", "app/beleza/page.tsx"],
  ["/u21", "app/u21/page.tsx"],
];

test("now-dependent routes declare force-dynamic in source", () => {
  for (const [route, file] of routes) {
    const source = readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
    assert.match(source, /export const dynamic = "force-dynamic";/, `${route} (${file}) must be force-dynamic`);
  }
});

test("build output does not prerender now-dependent routes (checked when .next exists)", (t) => {
  const manifestUrl = new URL("../../.next/prerender-manifest.json", import.meta.url);
  if (!existsSync(manifestUrl)) {
    t.skip("no build output (.next) present");
    return;
  }
  const manifest = JSON.parse(readFileSync(manifestUrl, "utf8")) as { routes: Record<string, unknown> };
  for (const [route] of routes) {
    assert.equal(route in manifest.routes, false, `${route} must not be a prerendered route`);
  }
});
