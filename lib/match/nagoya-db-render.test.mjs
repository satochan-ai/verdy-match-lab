import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

const canonicalId = "sched-nagoya";
const dateBeforeMito = "2026-11-22T12:00:00+09:00";
const id = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const verdy = { id: id(1), name: "東京ヴェルディ", isVerdy: true };
const nagoya = { id: id(2), name: "名古屋グランパス", isVerdy: false };
const mito = { id: id(3), name: "水戸ホーリーホック", isVerdy: false };
const machida = { id: id(4), name: "FC町田ゼルビア", isVerdy: false };
const nagoyaPlan = "モック：名古屋戦の戦術";
const mitoPlan = "モック：水戸戦の戦術";
const machidaPlan = "モック：町田戦の戦術";

function matchRow(n, kickoffAt, home, away, { status = "scheduled", score = [null, null] } = {}) {
  return Object.freeze({
    id: id(n), kickoff_at: new Date(kickoffAt).toISOString(), venue: "検証用会場",
    status, home_score: score[0], away_score: score[1], elapsed_minutes: null,
    home_team_id: home.id, away_team_id: away.id,
    home_team__id: home.id, home_team__name: home.name, home_team__short_name: null, home_team__is_verdy: home.isVerdy,
    away_team__id: away.id, away_team__name: away.name, away_team__short_name: null, away_team__is_verdy: away.isVerdy,
  });
}

const scheduledNagoya = matchRow(11, "2026-11-21T14:00:00+09:00", verdy, nagoya);
const scheduledMito = matchRow(12, "2026-11-25T19:05:00+09:00", { ...mito, name: "水戸" }, verdy);
const scheduledMachida = matchRow(13, "2026-11-29T16:00:00+09:00", machida, verdy);
const plans = new Map([[scheduledNagoya.id, nagoyaPlan], [scheduledMito.id, mitoPlan], [scheduledMachida.id, machidaPlan]]);

function finishedNagoya(opponent = nagoya) {
  return matchRow(11, "2026-11-21T14:05:00+09:00", verdy, opponent, { status: "finished", score: [0, 0] });
}

function mockDatabase(rows, predictions = plans) {
  // 実際のSELECTをモックし、予期しないSQLが通った場合はテストを失敗させる。
  async function query(strings, ...values) {
    const statement = strings.reduce((sql, part, i) => sql + (i ? values[i - 1]?.sqlFragment ?? "?" : "") + part, "").replace(/\s+/g, " ").trim();
    assert.match(statement, /^select\b/i);
    if (statement.includes("from matches m")) {
      if (statement.endsWith("where m.id = ?")) {
        return rows.filter((row) => row.id === values.at(-1));
      }
      if (statement.includes("where m.status = 'scheduled'")) {
        assert.match(statement, /m\.kickoff_at >= \?::timestamptz and m\.kickoff_at < \?::timestamptz and ht\.is_verdy = \? and at\.is_verdy = \?$/);
        const [, start, end, homeIsVerdy, awayIsVerdy] = values;
        return rows.filter((row) => row.status === "scheduled" && row.kickoff_at >= start && row.kickoff_at < end
          && row.home_team__is_verdy === homeIsVerdy && row.away_team__is_verdy === awayIsVerdy);
      }
      assert.match(statement, /where m\.status = 'finished' order by m\.kickoff_at desc(?: limit 1)?$/);
      const sorted = rows.filter((row) => row.status === "finished").sort((a, b) => b.kickoff_at.localeCompare(a.kickoff_at));
      return statement.endsWith("limit 1") ? sorted.slice(0, 1) : sorted;
    }
    if (statement === "select * from predictions where match_id = ? order by order_no") {
      const title = predictions.get(values[0]);
      return title ? [{ order_no: 1, title, description: "検証用", result: "pending", result_comment: null }] : [];
    }
    assert.match(statement, /^select \* from (team_profiles|match_notes) where match_id = \?$/);
    return [];
  }
  query.unsafe = (sqlFragment) => ({ sqlFragment });
  return { isDbConfigured: () => true, sql: () => query };
}

const context = (rows, { date = dateBeforeMito, transformFixtures, predictions } = {}) =>
  renderContext(date, transformFixtures, false, {}, rows ? mockDatabase(rows, predictions) : undefined);
const top = (ctx) => ctx.render("app/top/page.tsx");
const archive = (ctx) => ctx.render("app/archive/page.tsx");
const detail = (ctx, matchId = canonicalId) => ctx.render("app/matches/[id]/page.tsx", { params: Promise.resolve({ id: matchId }) });

function assertMitoNextAndNagoyaLast(html) {
  const next = html.split("</section>", 1)[0];
  assert.match(next, /NEXT MATCH/);
  assert.match(next, /水戸ホーリーホック/);
  const last = html.split("LAST MATCH")[1].split("</section>", 1)[0];
  assert.match(last, /href="\/matches\/sched-nagoya"/);
  assert.match(last, /名古屋グランパス/);
  assert.match(last, /0-0/);
  assert.match(last, /DRAW/);
}

function assertSingleNagoya(html, dbId = scheduledNagoya.id) {
  assert.equal(html.split('href="/matches/sched-nagoya"').length - 1, 1);
  assert.ok(!html.includes(`href="/matches/${dbId}"`));
}

test("A: DB未設定では名古屋がLAST、水戸がNEXT、履歴は1件", async () => {
  const ctx = context();
  const html = await top(ctx);
  assertMitoNextAndNagoyaLast(html);
  assert.ok(!html.includes(nagoyaPlan));
  assert.doesNotMatch(html, /名古屋戦 MATCH PREVIEW/);
  assertSingleNagoya(await archive(ctx));
});

test("B: DBに名古屋戦のscheduled行だけが残っても、戦術欄を表示しない", async () => {
  const ctx = context([scheduledNagoya]);
  const html = await top(ctx);
  assertMitoNextAndNagoyaLast(html);
  assert.ok(!html.includes(nagoyaPlan));
  // DB由来の戦術欄（既定タイトル「軍師の三策」）が無いことを確認する。水戸戦の静的プレビュー「水戸戦 軍師の三策」は対象外。
  assert.doesNotMatch(html, /<h2[^>]*>軍師の三策<\/h2>/);
  assertSingleNagoya(await archive(ctx));
});

test("C: 名古屋と水戸がscheduledなら、水戸に対応する戦術だけ表示", async () => {
  const wrongSide = matchRow(15, "2026-11-25T12:00:00+09:00", verdy, mito);
  const wrongOpponent = matchRow(16, "2026-11-25T13:00:00+09:00", machida, verdy);
  const ctx = context([scheduledNagoya, wrongSide, wrongOpponent, scheduledMito], {
    predictions: new Map([...plans, [wrongSide.id, "誤：水戸ホーム・アウェイ"], [wrongOpponent.id, "誤：別の対戦相手"]]),
  });
  const html = await top(ctx);
  assertMitoNextAndNagoyaLast(html);
  assert.ok(html.includes(mitoPlan));
  assert.ok(!html.includes(nagoyaPlan));
  assert.doesNotMatch(html, /誤：/);
});

test("C: 同じ日・同じ対戦カードが複数あれば、安全に参照できるUUIDがある場合だけ表示", async () => {
  const otherMito = matchRow(14, "2026-11-25T11:00:00+09:00", mito, verdy);
  const rows = [scheduledMito, otherMito];
  const resolveId = (fixtures) => fixtures.map((fixture) =>
    fixture.id === "sched-mito" ? { ...fixture, detailMatchId: scheduledMito.id } : fixture);
  const noMapping = await top(context(rows));
  assert.ok(!noMapping.includes(mitoPlan));
  assert.doesNotMatch(noMapping, /<h2[^>]*>軍師の三策<\/h2>/);
  assert.ok((await top(context(rows, { transformFixtures: resolveId }))).includes(mitoPlan));
});

test("D: 時刻の異なるDBの別UUIDも同じ公式詳細を返し、履歴は1件", async () => {
  const row = finishedNagoya();
  const ctx = context([row]);
  assertMitoNextAndNagoyaLast(await top(ctx));
  assertSingleNagoya(await archive(ctx), row.id);
  const official = await detail(ctx);
  assert.match(official, /名古屋戦レビュー/);
  assert.match(official, /予想スタメンの答え合わせ/);
  assert.match(official, /公開時の名古屋戦プレビュー・予想・三策を見る/);
  assert.equal(await detail(ctx, row.id), official);
});

for (const alias of ["名古屋", "名古屋グランパスエイト", " 名古屋グランパス　"]) {
  test(`E: 名古屋の確認済み表記「${alias}」で履歴とLASTは公開IDに統一`, async () => {
    const row = finishedNagoya({ ...nagoya, name: alias });
    const ctx = context([row]);
    assertMitoNextAndNagoyaLast(await top(ctx));
    assertSingleNagoya(await archive(ctx), row.id);
    assert.equal(await detail(ctx, row.id), await detail(ctx));
  });
}

test("F: 別クラブ・逆のホーム側・別日・照合情報不足のDB行は履歴と詳細に残す", async () => {
  const result = { status: "finished", score: [2, 1] };
  const otherRows = [
    matchRow(22, "2026-11-21T12:00:00+09:00", verdy, machida, result),
    matchRow(23, "2026-11-21T13:00:00+09:00", nagoya, verdy, result),
    matchRow(24, "2026-11-20T23:59:00+09:00", verdy, nagoya, result),
    matchRow(25, "2026-11-21T13:02:00+09:00", verdy, { ...nagoya, name: "" }, result),
    matchRow(26, "2026-11-21T13:03:00+09:00", verdy, { ...nagoya, name: "名古屋の別クラブ" }, result),
  ];
  const ctx = context([...otherRows, finishedNagoya()]);
  const history = await archive(ctx);
  assertSingleNagoya(history);
  for (const row of otherRows) {
    assert.ok(history.includes(`href="/matches/${row.id}"`), row.id);
    assert.doesNotMatch(await detail(ctx, row.id), /名古屋戦レビュー/);
  }
});

test("G: 水戸のDB結果を同じ公開IDに統一し、NEXTと戦術は町田へ進む", async () => {
  const playedMito = matchRow(12, "2026-11-25T19:04:00+09:00", { ...mito, name: "水戸" }, verdy, { status: "finished", score: [1, 2] });
  const ctx = context([scheduledNagoya, playedMito, scheduledMachida], { date: "2026-11-25T22:00:00+09:00" });
  const html = await top(ctx);
  assert.match(html.split("</section>", 1)[0], /NEXT MATCH[\s\S]*FC町田ゼルビア/);
  const last = html.split("LAST MATCH")[1].split("</section>", 1)[0];
  assert.match(last, /href="\/matches\/sched-mito"/);
  assert.match(last, /水戸ホーリーホック[\s\S]*1-0[\s\S]*>L</);
  const history = await archive(ctx);
  assert.equal(history.split('href="/matches/sched-mito"').length - 1, 1);
  assert.ok(!history.includes(playedMito.id));
  assert.equal(await detail(ctx, playedMito.id), await detail(ctx, "sched-mito"));
  assert.ok(html.includes(machidaPlan));
  assert.match(await ctx.render("app/page.tsx"), /FC町田ゼルビア/);
  assert.ok(!html.includes(nagoyaPlan));
  assertSingleNagoya(await archive(ctx));
  assert.match(await detail(ctx), /名古屋戦レビュー/);
});
