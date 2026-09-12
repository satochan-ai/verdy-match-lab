import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../mock/matches.ts";

const match10 = matches.find((item) => item.id === "match-10")!;
const match12 = matches.find((item) => item.id === "match-12")!;
const match11 = matches.find((item) => item.id === "match-11")!;
const match13 = matches.find((item) => item.id === "match-13")!;

test("recent Tokyo Verdy actual lineups preserve official horizontal order", () => {
  const expected = {
    "match-10": {
      DF: ["4 林 尚輝", "5 井上 竜太", "15 鈴木 海音"],
      MF: ["16 平川 怜", "18 溝口 修平", "20 食野 壮磨", "22 内田 陽介"],
      FW: ["7 松橋 優安", "9 染野 唯月", "14 福田 湧矢"],
    },
    "match-11": {
      DF: ["5 井上 竜太", "15 鈴木 海音", "29 佐古 真礼"],
      MF: ["8 齋藤 功佑", "16 平川 怜", "18 溝口 修平", "40 新井 悠太"],
      FW: ["9 染野 唯月", "14 福田 湧矢", "71 平尾 勇人"],
    },
    "match-12": {
      DF: ["22 内田 陽介", "29 佐古 真礼", "36 松田 陸"],
      MF: ["2 柴戸 海", "7 松橋 優安", "28 山本 丈偉", "42 今井 健人"],
      FW: ["24 仲山 獅恩", "27 白井 亮丞", "38 神田 奏真"],
    },
  } as const;
  for (const [id, order] of Object.entries(expected)) {
    const match = matches.find((item) => item.id === id)!;
    const lineup = match.actualLineups![match.isVerdyHome ? "home" : "away"];
    assert.deepEqual(lineup.starters.DF, order.DF);
    assert.deepEqual(lineup.starters.MF, order.MF);
    assert.deepEqual(lineup.starters.FW, order.FW);
  }
});

test("match-11 actual lineups match the official 0-minute formation order", () => {
  assert.equal(match11.actualLineups?.home.formation, "3-4-2-1");
  assert.deepEqual(match11.actualLineups?.home.starters.DF, ["4 井上 黎生人", "44 畠中 槙之輔", "27 ディオン クールズ"]);
  assert.deepEqual(match11.actualLineups?.home.starters.MF, ["66 大畑 歩夢", "36 ジャクソン アーバイン", "10 田中 駿汰", "2 中村 拓海"]);
  assert.deepEqual(match11.actualLineups?.home.starters.FW, ["14 横山 夢樹", "41 小見 洋太", "11 チアゴ アンドラーデ"]);
  assert.equal(match11.actualLineups?.away.formation, "3-4-2-1");
  assert.deepEqual(match11.actualLineups?.away.starters.DF, ["5 井上 竜太", "15 鈴木 海音", "29 佐古 真礼"]);
  assert.deepEqual(match11.actualLineups?.away.starters.MF, ["8 齋藤 功佑", "16 平川 怜", "18 溝口 修平", "40 新井 悠太"]);
  assert.deepEqual(match11.actualLineups?.away.starters.FW, ["9 染野 唯月", "14 福田 湧矢", "71 平尾 勇人"]);
});

test("match-12 stores the official Levain Cup record without editorial predictions", () => {
  assert.equal(match12.status, "finished");
  assert.deepEqual([match12.homeScore, match12.awayScore], [0, 1]);
  assert.equal(match12.fixtureMeta?.roundLabel, "1回戦");
  assert.equal(match12.actualLineups?.home.formation, "4-4-2");
  assert.equal(match12.actualLineups?.away.formation, "3-4-2-1");
  assert.equal(Object.values(match12.actualLineups!.home.starters).flat().length, 11);
  assert.equal(Object.values(match12.actualLineups!.away.starters).flat().length, 11);
  assert.equal(Object.values(match12.actualLineups!.home.bench).flat().length, 9);
  assert.equal(Object.values(match12.actualLineups!.away.bench).flat().length, 9);
  assert.equal(match12.substitutions?.filter((item) => item.team === "東京V").length, 4);
  assert.equal(match12.substitutions?.filter((item) => item.team === "滋賀").length, 5);
  assert.deepEqual(match12.goals, [{ minute: "90+5'", scorer: "キム ヒョンウ", team: "東京V" }]);
  assert.equal(match12.officialRecord?.sourceUrl, "https://www.jleague.jp/match/leaguecup/2026/090904/");
  assert.equal(match12.predictedLineups, undefined);
  assert.deepEqual(match12.matchStats, {
    home: { shots: 12, shotsOnTarget: 3, possession: "49%", passSuccessRate: "74%", offsides: 1, corners: 5, freeKicks: 15, yellowCards: 1, redCards: 0 },
    away: { shots: 15, shotsOnTarget: 6, possession: "51%", passSuccessRate: "80%", offsides: 0, corners: 7, freeKicks: 15, yellowCards: 4, redCards: 0 },
  });
});

test("match-10 carries the pre-match editorial layer", () => {
  assert.equal(match10.strategies.length, 3);
  assert.equal(match10.focusPoints.length, 3);
  assert.ok(match10.matchNotes.length > 0, "試合前短評 (matchNotes) should be present");
});

test("match-10 strategies are pre-match (pending, no result comment)", () => {
  assert.deepEqual(
    match10.strategies.map((s) => s.orderNo),
    [1, 2, 3],
  );
  for (const s of match10.strategies) {
    assert.equal(s.result, "pending");
    assert.equal(s.resultComment, undefined);
    assert.ok(s.title.length > 0);
    assert.ok(s.description.length > 0);
  }
});

test("match-10 actual formations and benches are confirmed separately from predictions", () => {
  assert.equal(match10.actualLineups?.home.formation, "3-4-2-1");
  assert.equal(match10.actualLineups?.away.formation, "4-1-2-3");
  assert.deepEqual(match10.actualLineups?.home.starters.DF, [
    "4 林 尚輝", "5 井上 竜太", "15 鈴木 海音",
  ]);
  assert.deepEqual(match10.actualLineups?.home.starters.MF, [
    "16 平川 怜", "18 溝口 修平", "20 食野 壮磨", "22 内田 陽介",
  ]);
  assert.deepEqual(match10.actualLineups?.home.starters.FW, [
    "7 松橋 優安", "9 染野 唯月", "14 福田 湧矢",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.DF, [
    "17 髙橋 壱晟", "4 山川 哲史", "3 マテウス トゥーレル", "15 ジエゴ",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.MF, [
    "24 酒井 高徳", "7 井手口 陽介", "5 郷家 友太",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.FW, [
    "2 飯野 七聖", "29 小松 蓮", "41 永戸 勝也",
  ]);

  const homeStarters = Object.values(match10.actualLineups!.home.starters).flat();
  const awayStarters = Object.values(match10.actualLineups!.away.starters).flat();
  assert.equal(homeStarters.length, 11);
  assert.equal(awayStarters.length, 11);

  const homeBench = Object.values(match10.actualLineups!.home.bench).flat();
  const awayBench = Object.values(match10.actualLineups!.away.bench).flat();
  assert.equal(homeBench.length, 9);
  assert.equal(awayBench.length, 9);
  assert.equal(new Set(awayStarters.concat(awayBench)).size, 20);
  assert.equal(homeBench.includes("14 福田 湧矢"), false);
  assert.equal(awayBench.includes("14 福田 湧矢"), false);

  for (const player of ["29 佐古 真礼", "40 新井 悠太", "8 齋藤 功佑", "38 神田 奏真", "71 平尾 勇人"]) {
    assert.ok(homeBench.includes(player), `${player} should be on the Tokyo Verdy bench`);
  }
  for (const player of ["44 日髙 光揮", "10 大迫 勇也", "25 鍬先 祐弥", "62 川端 彪英"]) {
    assert.ok(awayBench.includes(player), `${player} should be on the Vissel Kobe bench`);
  }
  assert.ok(match10.predictedLineups, "pre-match predictions should remain");
});

test("match-10 official stats match the confirmed final totals", () => {
  assert.deepEqual(match10.matchStats, {
    home: { shots: 6, shotsOnTarget: 0, possession: "56%", passSuccessRate: "78%", distance: "117km", sprints: 132, offsides: 1, corners: 3, freeKicks: 13, fouls: 15, yellowCards: 3, redCards: 0 },
    away: { shots: 16, shotsOnTarget: 7, possession: "44%", passSuccessRate: "70%", distance: "116km", sprints: 130, offsides: 3, corners: 6, freeKicks: 10, fouls: 12, yellowCards: 1, redCards: 0 },
  });
});

test("match-10 substitutions match every official J.League change", () => {
  assert.deepEqual(match10.substitutions, [
    { minute: "0'", team: "東京V", playerIn: "佐古 真礼", playerOut: "林 尚輝" },
    { minute: "14'", team: "東京V", playerIn: "新井 悠太", playerOut: "内田 陽介" },
    { minute: "14'", team: "東京V", playerIn: "齋藤 功佑", playerOut: "松橋 優安" },
    { minute: "31'", team: "東京V", playerIn: "神田 奏真", playerOut: "平川 怜" },
    { minute: "39'", team: "東京V", playerIn: "平尾 勇人", playerOut: "溝口 修平" },
    { minute: "0'", team: "神戸", playerIn: "日髙 光揮", playerOut: "郷家 友太" },
    { minute: "14'", team: "神戸", playerIn: "大迫 勇也", playerOut: "小松 蓮" },
    { minute: "31'", team: "神戸", playerIn: "鍬先 祐弥", playerOut: "飯野 七聖" },
    { minute: "44'", team: "神戸", playerIn: "川端 彪英", playerOut: "髙橋 壱晟" },
  ]);
});

test("match-13 stores only the Tokyo Verdy Chiba pre-match prediction", () => {
  assert.equal(match13.status, "scheduled");
  assert.deepEqual([match13.homeScore, match13.awayScore], [null, null]);
  assert.equal(match13.fixtureMeta?.competition, "2026 J1リーグ");
  assert.equal(match13.fixtureMeta?.roundLabel, "第7節");
  assert.equal(match13.predictedLineups?.home.formation, "3-4-2-1");
  assert.equal(match13.predictedLineups?.home.starters.length, 11);
  assert.deepEqual(match13.predictedLineups?.home.starters.map(({ name }) => name), [
    "マテウス", "井上 竜太", "林 尚輝", "鈴木 海音", "溝口 修平", "齋藤 功佑",
    "平川 怜", "内田 陽介", "福田 湧矢", "平尾 勇人", "染野 唯月",
  ]);
  assert.deepEqual(match13.predictedLineups?.home.starters.map(({ alternative }) => alternative), [
    undefined, undefined, "佐古 真礼", undefined, undefined, undefined, undefined, undefined,
    "キム ヒョンウ", "熊取谷 一星", undefined,
  ]);
  assert.equal(match13.predictedLineups?.away.formation, "3-4-2-1");
  assert.equal(match13.predictedLineups?.away.starters.length, 11);
  assert.deepEqual(match13.predictedLineups?.away.starters.map(({ name }) => name), [
    "ホセ スアレス", "河野 貴志", "鳥海 晃司", "ダニエル ホール",
    "日高 大", "マテウス インディオ", "津久井 匠海", "石尾 陸登",
    "石川 大地", "杉山 直宏", "矢村 健",
  ]);
  assert.deepEqual(match13.predictedLineups?.away.starters.map(({ number }) => number), [
    19, 28, 24, 66, 67, 25, 8, 39, 20, 18, 29,
  ]);
  assert.deepEqual(match13.availability?.likelyUnavailable, [
    {
      team: "東京V",
      players: ["山見 大登", "吉田 泰授", "田邊 秀斗", "宮原 和也", "森田 晃樹", "寺沼 星文"],
    },
    {
      team: "千葉",
      players: ["喜田 陽", "飯田 貴敬"],
    },
  ]);
  assert.equal(match13.actualLineups, undefined);
  assert.equal(match13.officialRecord, undefined);
  assert.equal(match13.goals, undefined);
  assert.equal(match13.cards, undefined);
  assert.equal(match13.substitutions, undefined);
  assert.equal(match13.matchStats, undefined);
});
