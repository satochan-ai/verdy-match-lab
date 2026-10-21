import assert from "node:assert/strict";
import test from "node:test";
import { yokohamaFmResult as match } from "../mock/top-yokohama-fm-result.ts";
import { matches } from "../mock/matches.ts";
import { scheduleMatches } from "../mock/schedule.ts";
import { topFixtures } from "./top-fixtures.ts";
import { validateTopFixtureConsistency } from "./top-fixture-consistency.ts";
import { getLatestFinishedFixture, getNextFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { resolveMatchStatus } from "../match/status.ts";
import { getMatchResult } from "../match/result.ts";
import { shouldShowYokohamaFmContent, verdyYokohamaRows, marinosYokohamaRows, verdyYokohamaStrategies, marinosStrategies, verdyYokohamaPreview, marinosPreview } from "../match/yokohama-fm-content.ts";
import { yokohamaFmPredictionCheck } from "../match/yokohama-fm-check.ts";
import { yokohamaFmViewerReview } from "../match/yokohama-fm-review.ts";
import { getPostMatchAnalysis } from "../../features/ai-guide/mockResponses.ts";

test("Yokohama FM official result is consistent across schedule, fixture and published detail", () => {
  assert.deepEqual([match.homeScore, match.awayScore], [2, 2]);
  assert.equal(match.isVerdyHome, false);
  assert.equal(match.homeTeam.name, "横浜F・マリノス");
  assert.equal(getMatchResult(match), "draw");
  assert.equal(matches.filter((m) => m.id === match.id).length, 1);
  const schedule = scheduleMatches.filter((f) => f.id === match.id);
  assert.deepEqual(validateTopFixtureConsistency(schedule, matches), []);
  assert.equal(schedule[0].detailMatchId, match.id);
  assert.equal(match.kickoffAt, "2026-10-21T19:03:00+09:00");
  assert.equal(match.venue, "ＭＵＦＧスタジアム");
  assert.deepEqual(match.fixtureMeta, { competition: "2026 J1リーグ", roundLabel: "第11節" });
});

test("official record: attendance, weather, referees and source", () => {
  const record = match.officialRecord!;
  assert.deepEqual([record.kickoff, record.attendance, record.weather, record.temperature, record.humidity], ["19:03", 40765, "晴", "26.7℃", "67%"]);
  assert.deepEqual([record.referee, record.assistantReferees, record.fourthOfficial], ["小屋 幸栄", ["渡辺 康太", "安藤 康平"], "阿部 将茂"]);
  assert.equal(record.sourceUrl, "https://data.j-league.or.jp/SFMS02/?match_card_id=34619");
});

test("goals, cards and substitutions equal the official record with no fabricated events", () => {
  assert.deepEqual(match.goals?.map((g) => [g.minute, g.scorer, g.team]), [
    ["23'", "宮市 亮", "横浜F・マリノス"], ["50'", "遠野 大弥", "横浜F・マリノス"], ["73'", "藤本 寛也", "東京ヴェルディ"], ["90+3'", "山田 剛綺", "東京ヴェルディ"],
  ]);
  // 前半1-0、後半1-2（公式記録）。
  const goals = match.goals!;
  const firstHalf = goals.filter((g) => Number.parseInt(g.minute, 10) <= 45);
  assert.deepEqual([firstHalf.filter((g) => g.team === "横浜F・マリノス").length, firstHalf.filter((g) => g.team === "東京ヴェルディ").length], [1, 0]);
  assert.deepEqual(match.cards?.map((c) => [c.minute, c.player, c.team, c.type]), [["14'", "藤本 寛也", "東京ヴェルディ", "yellow"], ["24'", "鈴木 海音", "東京ヴェルディ", "yellow"]]);
  assert.equal(match.cards?.some((c) => c.type === "red"), false);
  assert.deepEqual(match.substitutions?.map((s) => [s.minute, s.team === "東京ヴェルディ" ? "V" : "M", s.playerOut, s.playerIn]), [
    ["6'", "M", "知念 慶", "山根 陸"], ["46'", "V", "一美 和成", "神田 奏真"], ["61'", "V", "鈴木 海音", "内田 陽介"], ["61'", "V", "齋藤 功佑", "森田 晃樹"],
    ["65'", "M", "ジョルディ クルークス", "近藤 友喜"], ["65'", "M", "木村 卓斗", "鈴木 冬一"], ["65'", "M", "遠野 大弥", "天野 純"],
    ["72'", "V", "チョ ユミン", "佐古 真礼"], ["79'", "M", "天野 純", "喜田 拓也"], ["86'", "V", "熊取谷 一星", "山田 剛綺"],
  ]);
});

test("official squads: 11 starters + 9 bench per team, every sub belongs to the right team, formation is not invented", () => {
  const { home, away } = match.actualLineups!;
  for (const lineup of [home, away]) {
    assert.equal(Object.values(lineup.starters).flat().length, 11);
    assert.equal(Object.values(lineup.bench).flat().length, 9);
    assert.equal(lineup.formation, undefined);
  }
  const roster = (lineup: typeof home) => [...Object.values(lineup.starters).flat(), ...Object.values(lineup.bench).flat()].map((p) => p.replace(/^\d+ /, ""));
  const verdy = roster(away);
  const marinos = roster(home);
  assert.equal(new Set([...verdy, ...marinos]).size, 40);
  for (const sub of match.substitutions!) {
    const side = sub.team === "東京ヴェルディ" ? verdy : marinos;
    assert.ok(side.includes(sub.playerOut) && side.includes(sub.playerIn), `${sub.minute} ${sub.playerOut}→${sub.playerIn}`);
  }
  assert.deepEqual(away.starters.GK, ["1 マテウス"]);
  assert.deepEqual(home.starters.GK, ["21 飯倉 大樹"]);
});

test("stats are limited to the official record and no unconfirmed stats are registered", () => {
  assert.equal(match.matchStats, undefined);
  assert.ok(match.matchNotes.some((note) => note.includes("シュート 横浜FM 14 - 東京V 12") && note.includes("CK 6 - 6") && note.includes("FK 25 - 15")));
  assert.equal(match.matchNotes.some((note) => /枠内|支配率|パス/.test(note)), false);
  assert.ok(match.matchNotes.some((note) => note.includes("開始時フォーメーション：公式で確認できていないため未掲載")));
});

test("finish clears LIVE, makes the match LAST and advances NEXT/NEXT5 to the registered fixtures only", () => {
  const now = new Date("2026-10-21T23:30:00+09:00");
  assert.equal(resolveMatchStatus(match, now), "finished");
  assert.equal(getLatestFinishedFixture(topFixtures)?.id, match.id);
  const next = getNextFixture(topFixtures, now)!;
  assert.deepEqual([next.id, next.opponentName, next.kickoffAt, next.venue, next.isHome, next.competition.round], ["sched-fukuoka", "アビスパ福岡", "2026-10-24T15:00:00+09:00", "味の素スタジアム", true, "第12節"]);
  const upcoming = getUpcomingFixtures(topFixtures, now, 5);
  assert.deepEqual(upcoming.map((f) => f.id), ["sched-fukuoka", "sched-nagasaki", "sched-shimizu"]); // 登録済みの実日程のみ（5件に水増ししない）
  assert.equal(upcoming.some((f) => f.id === match.id), false);
  assert.equal(shouldShowYokohamaFmContent({ id: match.id, status: "finished" }), false);
});

test("pre-match editorial data is kept unchanged as history", () => {
  assert.equal(verdyYokohamaRows.flat().length, 11);
  assert.equal(marinosYokohamaRows.flat().length, 11);
  assert.equal(verdyYokohamaStrategies.length + marinosStrategies.length, 6);
  assert.equal(verdyYokohamaPreview.paragraphs.length, 6);
  assert.equal(marinosPreview.paragraphs.length, 5);
  assert.deepEqual(verdyYokohamaRows[0].map((p) => p.name), ["一美 和成", "キム ヒョンウ"]);
});

test("prediction check: player-level hits, change predictions and formation held (not confirmed)", () => {
  const { verdy, marinos } = yokohamaFmPredictionCheck;
  assert.deepEqual([...verdy.matched].sort(), ["一美 和成", "平川 怜", "新井 悠太", "林 尚輝", "熊取谷 一星", "藤本 寛也"].sort());
  assert.deepEqual(verdy.predictedNotStarted.map((p) => `${p.name}:${p.appearance}`).sort(), [
    "キム ヒョンウ:ベンチ入り（出場なし）", "佐古 真礼:途中出場", "内田 陽介:途中出場", "柴戸 海:ベンチ入り（出場なし）", "長沢 祐弥:ベンチ入り（出場なし）",
  ].sort());
  assert.deepEqual([...verdy.startedNotPredicted].sort(), ["マテウス", "チョ ユミン", "溝口 修平", "齋藤 功佑", "鈴木 海音"].sort());
  assert.deepEqual([verdy.changes.correct, verdy.changes.total], [5, 10]);
  assert.deepEqual(verdy.keyPlayers.map((p) => `${p.name}:${p.appearance}`), [
    "長沢 祐弥:ベンチ入り（出場なし）", "内田 陽介:途中出場", "平川 怜:先発", "熊取谷 一星:先発", "一美 和成:先発",
  ]);
  assert.equal(marinos.matched.length, 7);
  assert.deepEqual([...marinos.matched].sort(), ["ジェイソン・キニョーネス", "ジョルディ・クルークス", "谷村 海那", "知念 慶", "松村 晃助", "木村 卓斗", "諏訪間 幸成"].sort());
  assert.deepEqual([...marinos.startedNotPredicted].sort(), ["井上 太聖", "宮市 亮", "遠野 大弥", "飯倉 大樹"].sort());
  assert.deepEqual([marinos.changes.correct, marinos.changes.total], [3, 4]);
  assert.deepEqual(marinos.keyPlayers.map((p) => `${p.name}:${p.appearance}`), ["知念 慶:先発", "ジョルディ・クルークス:先発", "谷村 海那:先発"]);
  for (const check of [verdy, marinos]) {
    assert.equal(check.actualFormation, undefined);
    assert.equal(check.formationVerdict, "判定保留");
  }
});

test("viewer review keeps the provided text, is labelled subjective and adds no unconfirmed play", () => {
  assert.equal(yokohamaFmViewerReview.title, "2点差からの追撃。勝点1の収穫と、もう1点への思い");
  assert.equal(yokohamaFmViewerReview.paragraphs.length, 6);
  const text = yokohamaFmViewerReview.paragraphs.join("");
  assert.match(text, /もう1点取って逆転できたかもしれないという思いも残る/);
  assert.equal(/決定機|外した|枠外|GK/.test(text), false);
  assert.match(yokohamaFmViewerReview.notice, /主観/);
  // 総括は確認済みの公式情報のみ（観戦レビューは別セクション）。
  const report = getPostMatchAnalysis(match);
  assert.deepEqual(report.sections.map((s) => s.heading), ["確認済み試合情報"]);
});
