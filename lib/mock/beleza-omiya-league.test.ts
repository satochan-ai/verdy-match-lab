import assert from "node:assert/strict";
import test from "node:test";
import {
  belezaOmiyaLeagueMatch as match, belezaOmiyaLeagueHalfScores as halves, belezaOmiyaLeagueGoals as goals,
  belezaOmiyaLeagueSubstitutions as subs, belezaOmiyaLeagueActualLineup as own, omiyaLeagueActualLineup as opponent,
  belezaOmiyaLeagueFormation as formation, belezaOmiyaLeagueStats as stats, belezaOmiyaLeagueCards as cards,
  belezaOmiyaLeagueOfficialRecord as record, belezaOmiyaLeagueViewerNotes as notes,
} from "./beleza-omiya-league.ts";
import { belezaFixtures } from "../data/beleza-fixtures.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "../data/fixture-selectors.ts";
import { getCategoryDetailHref } from "../data/category-match-details.ts";
import { belezaCerezoLeagueMatch } from "./beleza-cerezo-league.ts";
import { belezaElfenLeagueMatch } from "./beleza-elfen-league.ts";

test("10/31 result uses the registered ID, chronological fixtures, LAST and the official 11/7 away NEXT", () => {
  const fixture = belezaFixtures.find(f => f.id === match.id)!;
  assert.deepEqual([fixture.status, fixture.kickoffAt, fixture.score, fixture.competition.round], ["finished", "2026-10-31T15:05:00+09:00", { home: 2, away: 1 }, "第7節"]);
  assert.deepEqual(halves, { firstHalf: "1-0", secondHalf: "1-1" });
  assert.equal(getCategoryDetailHref("beleza", fixture.detailMatchId), "/beleza/matches/beleza-next-12");
  assert.equal(getLatestFinishedFixture(belezaFixtures)?.id, match.id);
  const now = new Date("2026-11-01T10:00:00+09:00");
  const next = getNextFixture(belezaFixtures, now)!;
  assert.deepEqual([next.id, next.kickoffAt, next.opponentName, next.isHome, next.venue], ["beleza-next-13", "2026-11-07T14:00:00+09:00", "ノジマステラ神奈川相模原", false, "相模原ギオンスタジアム"]);
  assert.deepEqual(getUpcomingFixtures(belezaFixtures, now, 5).map(f => f.id), [next.id]);
  const timestamps = belezaFixtures.map(f => Date.parse(f.kickoffAt!));
  assert.deepEqual(timestamps, [...timestamps].sort((a, b) => a - b));
  const history = getSeasonHistory(belezaFixtures);
  for (const previous of [belezaCerezoLeagueMatch, belezaElfenLeagueMatch]) {
    assert.equal(history.filter(f => f.id === previous.id).length, 1);
    assert.deepEqual(belezaFixtures.find(f => f.id === previous.id)?.score, { home: previous.homeScore, away: previous.awayScore });
  }
});

test("official result preserves the three goals, environment and website FK values", () => {
  assert.deepEqual(goals.map(g => [g.minute, g.scorer, g.team]), [["38'", "式田 和", match.homeTeamName], ["53'", "西尾 葉音", match.awayTeamName], ["86'", "樋渡 百花", match.homeTeamName]]);
  assert.deepEqual([record.kickoff, record.attendance, record.weather, record.temperature, record.humidity], ["15:05", 2436, "晴、弱風", "24.2℃", "26%"]);
  assert.deepEqual(stats, { beleza: { shots: 18, freeKicks: 1, corners: 11 }, opponent: { shots: 7, freeKicks: 2, corners: 1 } });
  assert.deepEqual(cards, []);
  assert.deepEqual(notes, []);
});

test("both official squads have 11 starters and 7 substitutes; all 5/4 substitution pairs match the official record", () => {
  for (const side of [own, opponent]) {
    const starters = Object.values(side.starters).flat();
    const bench = Object.values(side.bench).flat();
    assert.equal(starters.length, 11);
    assert.equal(bench.length, 7);
    assert.equal(new Set([...starters, ...bench].map(p => p.split(" ")[0])).size, 18);
    assert.equal(side.formation, undefined);
    const changes = subs.filter(s => s.team === (side === own ? match.homeTeamName : match.awayTeamName));
    assert.equal(changes.length, side === own ? 5 : 4);
    for (const change of changes) {
      assert.ok(starters.some(p => p.endsWith(` ${change.playerOut}`)), change.playerOut);
      assert.ok(bench.some(p => p.endsWith(` ${change.playerIn}`)), change.playerIn);
    }
  }
  assert.deepEqual(subs.filter(s => s.team === match.homeTeamName).map(s => [s.minute, s.playerOut, s.playerIn]), [
    ["HT", "松田 紫野", "松岡 瑛茉"], ["61'", "隅田 凜", "朝生 珠実"], ["61'", "小林 里歌子", "眞城 美春"], ["73'", "松永 未夢", "北村 菜々美"], ["83'", "氏原 里穂菜", "安藤 梢"],
  ]);
  assert.deepEqual(subs.filter(s => s.team === match.awayTeamName).map(s => [s.minute, s.playerOut, s.playerIn]), [
    ["HT", "林 みのり", "西尾 葉音"], ["HT", "宗形 みなみ", "大島 暖菜"], ["65'", "浜田 芽来", "髙橋 佑奈"], ["75'", "落合 依和", "岩下 綺良々"],
  ]);
});

test("observed formation keeps every line screen left-to-right and uses exactly the official starters", () => {
  assert.equal(formation.formation, "3-4-2-1");
  assert.deepEqual(formation.starters.map(p => p.number), [21, 5, 3, 2, 13, 6, 19, 38, 20, 18, 11]);
  assert.deepEqual(formation.starters.map(p => `${p.number} ${p.name}`).sort(), Object.values(own.starters).flat().sort());
  // 公式ポジションはFW、配置図ではMF列。データを混同しない。
  assert.ok(own.starters.FW.includes("38 式田 和"));
  assert.equal(formation.starters.find(p => p.number === 38)?.position, "MF");
});
