import assert from "node:assert/strict";
import test from "node:test";
import { nagasakiResult as match } from "../mock/top-nagasaki-result.ts";
import { matches, getRecentFinishedMatch } from "../mock/matches.ts";
import { scheduleMatches } from "../mock/schedule.ts";
import { topFixtures as currentTopFixtures } from "./top-fixtures.ts";
const topFixtures = currentTopFixtures.map(f => f.id === "sched-shimizu" ? { ...f, status: "scheduled" as const, score: undefined, detailMatchId: undefined, kickoffAt: "2026-11-07T13:00:00+09:00" } : f);
import { validateTopFixtureConsistency } from "./top-fixture-consistency.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory } from "./fixture-selectors.ts";
import { nagasakiPredictionCheck, nagasakiStrategyReviews, nagasakiReview } from "../match/nagasaki-review.ts";
import { nagasakiStrategies } from "../match/nagasaki-content.ts";
import { getMatchResult } from "../match/result.ts";
import type { ActualLineup } from "../../types/domain";

test("Nagasaki AWAY win is unique, consistent and advances LAST/NEXT without losing Fukuoka", () => {
  assert.deepEqual([match.homeScore,match.awayScore,match.isVerdyHome],[1,2,false]);
  assert.equal(getMatchResult(match),"win");
  assert.equal(matches.filter(m => m.id === match.id).length,1);
  assert.equal(getRecentFinishedMatch().id,"sched-shimizu");
  assert.deepEqual(validateTopFixtureConsistency(scheduleMatches,matches),[]);
  assert.equal(getLatestFinishedFixture(topFixtures)?.id,match.id);
  const next=getNextFixture(topFixtures,new Date("2026-11-01T19:00:00+09:00"))!;
  assert.deepEqual([next.id,next.kickoffAt,next.venue],["sched-shimizu","2026-11-07T13:00:00+09:00","ＩＡＩスタジアム日本平"]);
  assert.ok(getSeasonHistory(topFixtures).some(f => f.id === "sched-fukuoka" && f.score?.home === 3 && f.score?.away === 1));
  assert.equal(match.officialRecord?.attendance,20246);
});

test("all goals, assists, cards and additional times match official records", () => {
  assert.deepEqual(match.goals?.map(g => [g.minute,g.scorer,g.assist]),[["45+12'","染野 唯月","藤本 寛也"],["76'","チアゴ サンタナ","岩崎 悠人"],["81'","一美 和成","溝口 修平"]]);
  assert.deepEqual(match.cards?.map(c => [c.minute,c.player,c.type]),[["15'","米田 隼也","yellow"],["90+3'","鍋島 暖歩","yellow"]]);
  assert.deepEqual(match.substitutions?.filter(s => s.team === "東京ヴェルディ").map(s => [s.minute,s.playerOut,s.playerIn]),[["45+10'","齋藤 功佑","森田 晃樹"],["72'","藤本 寛也","松橋 優安"],["72'","染野 唯月","熊取谷 一星"],["83'","チョ ユミン","佐古 真礼"],["83'","一美 和成","寺沼 星文"],["90+5'","新井 悠太","山田 剛綺"]]);
  assert.equal(match.substitutions?.length,11);
  assert.ok(match.matchNotes.some(n => n.includes("脳振盪交代")));
});

test("official XIs, benches, formations and substitutions have consistent membership", () => {
  assert.deepEqual([match.actualLineups?.home.formation,match.actualLineups?.away.formation],["3-4-2-1","4-4-2"]);
  assert.deepEqual(match.actualLineups?.away.pitchOrder?.map(p => p.split(" ")[0]),["1","18","96","4","22","40","16","8","19","9","33"]);
  assert.deepEqual(match.actualLineups?.home.pitchOrder?.map(p => p.split(" ")[0]),["1","6","31","50","23","41","5","22","16","10","99"]);
  for(const [key,team] of [["home","V・ファーレン長崎"],["away","東京ヴェルディ"]] as const) {
    const lineup: ActualLineup=match.actualLineups![key];
    const starters: string[]=Object.values(lineup.starters).flat();
    const bench: string[]=Object.values(lineup.bench).flat();
    assert.equal(starters.length,11);
    assert.equal(bench.length,9);
    assert.equal(new Set([...starters,...bench].map(p => p.split(" ")[0])).size,20);
    assert.deepEqual([...starters].sort(),[...lineup.pitchOrder!].sort());
    for(const sub of match.substitutions!.filter(s => s.team === team)) {
      assert.ok(starters.some(p => p.endsWith(sub.playerOut)));
      assert.ok(bench.some(p => p.endsWith(sub.playerIn)));
    }
  }
});

test("prediction checks compare only the saved eleven; tactical verdicts remain bounded", () => {
  assert.equal(nagasakiPredictionCheck.verdy.matched,9);
  assert.equal(nagasakiPredictionCheck.opponent.matched,9);
  assert.deepEqual(nagasakiPredictionCheck.verdy.predictedOnly,["熊取谷一星","佐古真礼"]);
  assert.deepEqual(nagasakiPredictionCheck.verdy.actualOnly,["林 尚輝","染野 唯月"]);
  assert.deepEqual(nagasakiPredictionCheck.opponent.predictedOnly,["松本天夢","新井一耀"]);
  assert.deepEqual(nagasakiPredictionCheck.opponent.actualOnly,["進藤 亮佑","エメルソン"]);
  assert.deepEqual(nagasakiStrategyReviews.map(s => s.verdict),["判断保留","一部成功","一部成功"]);
  assert.deepEqual(nagasakiStrategyReviews.map(s => [s.title,s.description]),nagasakiStrategies.map(s => [s.title,s.description]));
  assert.ok(nagasakiStrategies.every(s => s.result === "pending"));
  assert.ok(nagasakiReview.paragraphs.some(p => p.includes("2勝1分2敗")));
});

test("stats adopt Data Site shots and retain the official-site discrepancy", () => {
  const {home,away}=match.matchStats!;
  assert.deepEqual([home.shots,away.shots,home.corners,away.corners,home.freeKicks,away.freeKicks,home.offsides,away.offsides],[9,11,5,4,17,11,2,0]);
  assert.deepEqual([home.yellowCards,away.yellowCards,home.redCards,away.redCards],[2,0,0,0]);
  assert.ok(match.matchNotes.some(n => n.includes("16-13")));
});
