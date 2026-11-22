import assert from "node:assert/strict";
import test from "node:test";
import { getCategoryDetailHref } from "./category-match-details.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { toU21SeasonHistoryEntry, u21Fixtures } from "./u21-fixtures.ts";
import { u21UpcomingMatches } from "../mock/u21.ts";
import {
  u21GambaAwayOfficialLineup as away,
  u21GambaCards as cards,
  u21GambaGoals as goals,
  u21GambaHomeOfficialLineup as home,
  u21GambaMatch as match,
  u21GambaOfficialRecord as record,
  u21GambaStats as stats,
  u21GambaSubstitutions as substitutions,
} from "../mock/u21-gamba-result.ts";

test("G Osaka reuses its fixture and advances LAST, history, and NEXT to the correct matches", () => {
  const id = "u21-next-6";
  const now = new Date("2026-11-22T17:10:00+09:00");
  const planned = u21UpcomingMatches.find(fixture => fixture.id === id)!;
  const fixture = u21Fixtures.find(fixture => fixture.id === id)!;
  assert.equal(match.id, planned.id);
  assert.equal(fixture.kickoffAt, "2026-11-22T14:00:00+09:00");
  assert.equal(planned.kickoffLabel, match.kickoffLabel);
  assert.equal(record.kickoff, "14:03");
  assert.equal(fixture.venue, "パナソニック スタジアム 吹田");
  assert.equal(fixture.venue, match.venue);
  assert.equal(fixture.isHome, false);
  assert.equal(match.isVerdyHome, false);
  assert.equal(fixture.status, "finished");
  assert.deepEqual(fixture.score, { home: 2, away: 3 });

  const history = getSeasonHistory(u21Fixtures);
  assert.equal(getLatestFinishedFixture(u21Fixtures)?.id, id);
  assert.equal(history[0].id, id);
  assert.equal(history.filter(item => item.id === id).length, 1);
  assert.equal(u21Fixtures.filter(item => item.id === id).length, 1);
  const entry = toU21SeasonHistoryEntry(fixture);
  assert.deepEqual([entry.homeTeamName, entry.awayTeamName, entry.result], ["U-21ガンバ大阪", "東京ヴェルディU-21", "win"]);
  assert.equal(getCategoryDetailHref("u21", entry.detailMatchId), "/u21/matches/u21-next-6");
  assert.equal(getCategoryDetailHref("u21", "u21-next-5"), "/u21/matches/u21-next-5");
  assert.equal(getCategoryDetailHref("u21", "u21-next-7"), undefined);
  assert.equal(getCategoryDetailHref("beleza", id), undefined);

  const next = getNextFixture(u21Fixtures, now);
  assert.equal(next?.opponentName, "U-21ヴィッセル神戸");
  assert.equal(next?.kickoffAt, "2026-11-29T13:00:00+09:00");
  assert.deepEqual(getUpcomingFixtures(u21Fixtures, now, 5).map(item => item.id), ["u21-next-7", "u21-next-8", "u21-next-9"]);
});

test("G Osaka goals preserve every scorer, minute, and score in order", () => {
  let homeScore = 0;
  let awayScore = 0;
  const progression = goals.map(goal => {
    if (goal.team === match.homeTeamName) homeScore++;
    if (goal.team === match.awayTeamName) awayScore++;
    return [goal.minute, goal.scorer, homeScore, awayScore];
  });
  assert.deepEqual(progression, [
    ["24'", "加賀野 統", 1, 0],
    ["33'", "川村 楽人", 1, 1],
    ["41'", "川村 楽人", 1, 2],
    ["61'", "中積 爲", 2, 2],
    ["90+5'", "仲山 獅恩", 2, 3],
  ]);
  assert.deepEqual([match.homeScore, match.awayScore], [homeScore, awayScore]);
});

test("G Osaka and Tokyo V retain the official positional registration and benches", () => {
  assert.deepEqual(Object.values(home.starters).map(group => group.length), [1, 4, 5, 1]);
  assert.deepEqual(Object.values(away.starters).map(group => group.length), [1, 3, 4, 3]);
  assert.deepEqual(home.bench, {
    GK: ["43 野畑 優真"],
    DF: ["52 竹原 玲音", "53 岡元 侑大"],
    MF: ["56 藤井 英翔", "55 笠井 直樹"],
    FW: ["62 三村 走太", "9 林 大地"],
  });
  assert.deepEqual(away.bench, {
    GK: ["91 高居 丈流"], DF: ["99 庄司 瑛人"], MF: ["94 植月 瑛大"], FW: ["97 七久保 優"],
  });
});

test("Only G Osaka made substitutions and received bookings", () => {
  assert.deepEqual(substitutions.map(s => [s.team, s.minute, s.playerOut, s.playerIn]), [
    [match.homeTeamName, "62'", "村田 康輔", "竹原 玲音"],
    [match.homeTeamName, "62'", "丸岡 海太", "岡元 侑大"],
    [match.homeTeamName, "62'", "深江 龍明", "藤井 英翔"],
    [match.homeTeamName, "62'", "嶋岡 陽大", "笠井 直樹"],
    [match.homeTeamName, "71'", "坂井 雄真", "三村 走太"],
    [match.homeTeamName, "90'", "城阪 光喜", "林 大地"],
  ]);
  assert.deepEqual(cards.map(c => [c.team, c.minute, c.player, c.type]), [
    [match.homeTeamName, "90'", "三村 走太", "yellow"],
    [match.homeTeamName, "90+4'", "岡元 侑大", "yellow"],
  ]);
  assert.deepEqual(stats.map(({ home, away }) => [home, away]), [[8, 19], [4, 5], [2, 6], [19, 14], [2, 0], [0, 0]]);
});