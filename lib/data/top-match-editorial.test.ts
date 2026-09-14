import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../mock/matches.ts";

const match10 = matches.find((item) => item.id === "match-10")!;
const match12 = matches.find((item) => item.id === "match-12")!;
const match11 = matches.find((item) => item.id === "match-11")!;
const match13 = matches.find((item) => item.id === "match-13")!;
const match14 = matches.find((item) => item.id === "match-14")!;

test("recent Tokyo Verdy actual lineups preserve official horizontal order", () => {
  const expected = {
    "match-10": {
      DF: ["5 井上 竜太", "4 林 尚輝", "15 鈴木 海音"],
      MF: ["18 溝口 修平", "16 平川 怜", "20 食野 壮磨", "22 内田 陽介"],
      FW: ["14 福田 湧矢", "7 松橋 優安", "9 染野 唯月"],
    },
    "match-11": {
      DF: ["5 井上 竜太", "29 佐古 真礼", "15 鈴木 海音"],
      MF: ["18 溝口 修平", "8 齋藤 功佑", "16 平川 怜", "40 新井 悠太"],
      FW: ["14 福田 湧矢", "71 平尾 勇人", "9 染野 唯月"],
    },
    "match-12": {
      DF: ["36 松田 陸", "29 佐古 真礼", "22 内田 陽介"],
      MF: ["7 松橋 優安", "2 柴戸 海", "28 山本 丈偉", "42 今井 健人"],
      FW: ["38 神田 奏真", "24 仲山 獅恩", "27 白井 亮丞"],
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
  assert.deepEqual(match11.actualLineups?.away.starters.DF, ["5 井上 竜太", "29 佐古 真礼", "15 鈴木 海音"]);
  assert.deepEqual(match11.actualLineups?.away.starters.MF, ["18 溝口 修平", "8 齋藤 功佑", "16 平川 怜", "40 新井 悠太"]);
  assert.deepEqual(match11.actualLineups?.away.starters.FW, ["14 福田 湧矢", "71 平尾 勇人", "9 染野 唯月"]);
});

test("match-12 stores the official Levain Cup record without editorial predictions", () => {
  assert.equal(match12.status, "finished");
  assert.deepEqual([match12.homeScore, match12.awayScore], [0, 1]);
  assert.equal(match12.fixtureMeta?.roundLabel, "1回戦");
  assert.equal(match12.actualLineups?.home.formation, "4-4-2");
  assert.equal(match12.actualLineups?.away.formation, "3-4-2-1");
  assert.deepEqual(match12.actualLineups?.away.starters.DF, ["36 松田 陸", "29 佐古 真礼", "22 内田 陽介"]);
  assert.deepEqual(match12.actualLineups?.away.starters.MF, ["7 松橋 優安", "2 柴戸 海", "28 山本 丈偉", "42 今井 健人"]);
  assert.deepEqual(match12.actualLineups?.away.starters.FW, ["38 神田 奏真", "24 仲山 獅恩", "27 白井 亮丞"]);
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
    "5 井上 竜太", "4 林 尚輝", "15 鈴木 海音",
  ]);
  assert.deepEqual(match10.actualLineups?.home.starters.MF, [
    "18 溝口 修平", "16 平川 怜", "20 食野 壮磨", "22 内田 陽介",
  ]);
  assert.deepEqual(match10.actualLineups?.home.starters.FW, [
    "14 福田 湧矢", "7 松橋 優安", "9 染野 唯月",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.DF, [
    "15 ジエゴ", "3 マテウス トゥーレル", "4 山川 哲史", "17 髙橋 壱晟",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.MF, [
    "24 酒井 高徳", "7 井手口 陽介", "5 郷家 友太",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.FW, [
    "41 永戸 勝也", "29 小松 蓮", "2 飯野 七聖",
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

test("match-13 pre-match prediction is preserved alongside the finished official result", () => {
  assert.equal(match13.status, "finished");
  assert.deepEqual([match13.homeScore, match13.awayScore], [1, 1]);
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
  assert.equal(match13.predictedLineups?.away.formation, "4-4-2");
  assert.equal(match13.predictedLineups?.away.starters.length, 11);
  assert.deepEqual(match13.predictedLineups?.away.starters.map(({ position }) => position), [
    "GK", "DF", "DF", "DF", "DF", "MF", "MF", "MF", "MF", "FW", "FW",
  ]);
  assert.deepEqual(match13.predictedLineups?.away.starters.map(({ name }) => name), [
    "ホセ スアレス", "日高 大", "河野 貴志", "ダニエル ホール", "石尾 陸登",
    "津久井 匠海", "田口 泰士", "マテウス インディオ", "杉山 直宏",
    "石川 大地", "矢村 健",
  ]);
  assert.deepEqual(match13.predictedLineups?.away.starters.map(({ number }) => number), [
    19, 67, 28, 66, 39, 8, 4, 25, 18, 20, 29,
  ]);
  assert.deepEqual(match13.predictedLineups?.away.starters.map(({ alternative }) => alternative), [
    undefined, undefined, undefined, undefined, undefined,
    undefined, "小林 祐介", undefined, undefined,
    "エリソン", undefined,
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
  // 試合終了Phase：公式スタメン・ベンチ・開始フォーメーションに加え、公式結果
  // （officialRecord/goals/cards/substitutions）も登録済み。
  assert.notEqual(match13.actualLineups, undefined);
  assert.notEqual(match13.officialRecord, undefined);
  assert.notEqual(match13.goals, undefined);
  assert.notEqual(match13.cards, undefined);
  assert.notEqual(match13.substitutions, undefined);
  // シュート数・CK・FK・オフサイド等の前後半/計表にはshotsOnTarget・possession等
  // TeamMatchStats必須項目が掲載されていないため、matchStatsは今回も登録しない
  // （必須項目を推測・0埋めしない）。
  assert.equal(match13.matchStats, undefined);
});

test("match-13 official result: HOME 1 - 1 AWAY draw, goals/cards/substitutions match the official match report", () => {
  assert.equal(match13.officialRecord?.kickoff, "18:04");
  assert.equal(match13.officialRecord?.attendance, 15254);
  assert.equal(match13.officialRecord?.weather, "曇");
  assert.equal(match13.officialRecord?.temperature, "26.3℃");
  assert.equal(match13.officialRecord?.sourceUrl, "https://www.verdy.co.jp/match/info/2026091302/result");

  assert.equal(match13.goals?.length, 2);
  assert.deepEqual(match13.goals, [
    { minute: "58'", scorer: "エリソン", team: "千葉" },
    { minute: "90+2'", scorer: "林 尚輝", team: "東京V" },
  ]);
  // final scoreと得点件数が一致すること（HOME/AWAY逆転なし）。
  const homeGoals = match13.goals!.filter((g) => g.team === "東京V").length;
  const awayGoals = match13.goals!.filter((g) => g.team === "千葉").length;
  assert.equal(homeGoals, match13.homeScore);
  assert.equal(awayGoals, match13.awayScore);

  assert.equal(match13.cards?.length, 6);
  assert.equal(match13.cards?.every((c) => c.type === "yellow"), true);
  assert.equal(match13.cards?.some((c) => c.type === "red"), false);
  assert.equal(match13.cards?.filter((c) => c.team === "東京V").length, 2);
  assert.equal(match13.cards?.filter((c) => c.team === "千葉").length, 4);

  assert.equal(match13.substitutions?.length, 9);
  const homeSubs = match13.substitutions!.filter((s) => s.team === "東京V");
  const awaySubs = match13.substitutions!.filter((s) => s.team === "千葉");
  assert.equal(homeSubs.length, 4);
  assert.equal(awaySubs.length, 5);
  // OUT/IN逆転なし（公式試合経過どおり）。
  assert.equal(homeSubs.some((s) => s.playerOut === "平尾 勇人" && s.playerIn === "一美 和成"), true);
  assert.equal(awaySubs.some((s) => s.playerOut === "マテウス インディオ" && s.playerIn === "田口 泰士"), true);
});

test("match-13 official starting lineups (Tokyo Verdy 3-4-2-1 / Chiba 4-4-2) match the official broadcast graphic", () => {
  assert.equal(match13.actualLineups?.home.formation, "3-4-2-1");
  assert.deepEqual(match13.actualLineups?.home.starters, {
    GK: ["1 マテウス"],
    DF: ["15 鈴木 海音", "4 林 尚輝", "5 井上 竜太"],
    MF: ["40 新井 悠太", "8 齋藤 功佑", "16 平川 怜", "18 溝口 修平"],
    FW: ["71 平尾 勇人", "14 福田 湧矢", "9 染野 唯月"],
  });
  const homeStarterCount = Object.values(match13.actualLineups!.home.starters).flat().length;
  const homeBenchCount = Object.values(match13.actualLineups!.home.bench).flat().length;
  assert.equal(homeStarterCount, 11);
  assert.equal(homeBenchCount, 9);

  assert.equal(match13.actualLineups?.away.formation, "4-4-2");
  assert.deepEqual(match13.actualLineups?.away.starters, {
    GK: ["19 ホセ スアレス"],
    DF: ["67 日高 大", "24 鳥海 晃司", "66 ダニエル ホール", "39 石尾 陸登"],
    MF: ["8 津久井 匠海", "25 マテウス インディオ", "5 小林 祐介", "18 杉山 直宏"],
    FW: ["29 矢村 健", "20 石川 大地"],
  });
  const awayStarterCount = Object.values(match13.actualLineups!.away.starters).flat().length;
  const awayBenchCount = Object.values(match13.actualLineups!.away.bench).flat().length;
  assert.equal(awayStarterCount, 11);
  assert.equal(awayBenchCount, 9);

  // predictedLineupsのalternatives（林→佐古、平尾→キムヒョンウ等）はactualへ持ち込まない。
  const actualNames = [
    ...Object.values(match13.actualLineups!.home.starters).flat(),
    ...Object.values(match13.actualLineups!.away.starters).flat(),
  ].join("\n");
  for (const alt of ["佐古 真礼", "キム ヒョンウ", "熊取谷 一星", "小林 祐介", "エリソン"]) {
    // 小林 祐介は千葉の予想alternativeだが、実際は先発本人としてactualに含まれるため対象外。
    if (alt === "小林 祐介") continue;
    assert.equal(actualNames.includes(alt), false, `unexpected predicted alternative leaked into actual lineup: ${alt}`);
  }
});

test("match-13 pre-match editorial (strategies/focusPoints/matchNotes) treats Chiba's 4-4-2 as a hypothesis", () => {
  assert.equal(match13.strategies.length, 3);
  assert.deepEqual(match13.strategies.map(({ title }) => title), [
    "後ろの3対2を使いたい",
    "シャドーが前を向けるか",
    "失った後の一発に注意",
  ]);
  assert.equal(match13.strategies.every(({ result }) => result === "pending"), true);

  assert.equal(match13.focusPoints.length, 3);
  assert.equal(match13.focusPoints.some((p) => p.startsWith("千葉15失点 vs 東京V総得点2")), true);
  assert.equal(match13.focusPoints.some((p) => p.startsWith("両WBが高い位置を取れるか")), true);
  assert.equal(match13.focusPoints.some((p) => p.startsWith("ルヴァン明けのメンバー構成")), true);

  assert.equal(match13.matchNotes.length, 6);

  // 千葉の4-4-2はユーザー確認済みの公式情報ではなく試合前の仮説のため、断定表現を使っていないこと。
  const editorialText = [
    ...match13.strategies.flatMap(({ title, description }) => [title, description]),
    ...match13.focusPoints,
    ...match13.matchNotes,
  ].join("\n");
  for (const forbidden of ["千葉は4-4-2で来る", "千葉は必ず", "に違いない", "確実に千葉"]) {
    assert.equal(editorialText.includes(forbidden), false, `unexpected assertive phrase: ${forbidden}`);
  }
  assert.equal(/千葉は[^、。]*(する|した|来る|使う|置く|残す)。/.test(editorialText), false);
  assert.equal(editorialText.includes("4-4-2"), true);

  // predictedLineups/availability等、editorial以外のフィールドに今回の変更でdiffが無いこと。
  assert.equal(match13.predictedLineups?.away.formation, "4-4-2");
  assert.equal(match13.predictedLineups?.away.starters.length, 11);
  assert.equal(match13.availability?.likelyUnavailable.length, 2);
});

test("match-14 is the Urawa preview match: HOME=浦和レッズ / AWAY=東京ヴェルディ", () => {
  assert.equal(match14.homeTeam.name, "浦和レッズ");
  assert.equal(match14.awayTeam.name, "東京ヴェルディ");
  assert.equal(match14.isVerdyHome, false);
  assert.equal(match14.status, "scheduled");
});

test("match-14 registers Urawa's headline predicted formation (3-4-2-1, 案A) with Kudo as the 3rd CB and confirmed squad numbers", () => {
  assert.equal(match14.predictedLineups?.home.formation, "3-4-2-1");
  assert.equal(match14.predictedLineups?.home.starters.length, 11);
  assert.equal(match14.predictedLineups?.home.starters.some((s) => s.name === "ダニーロ ボザ"), false);
  // 3CB：根本・宮本・工藤（元のボザの枠へユーザー確認済みの工藤を配置。左右順は
  // 既存の並び「根本・宮本・(3人目)」を維持し、勝手な左右反転はしていない）。
  assert.deepEqual(
    match14.predictedLineups?.home.starters.filter((s) => s.position === "DF").map((s) => s.name),
    ["根本 健太", "宮本 優太", "工藤 孝太"],
  );
  // ユーザー確認済みの背番号一覧と一致すること。
  const expectedNumbers: Record<string, number> = {
    "西川 周作": 1, "根本 健太": 5, "宮本 優太": 2, "工藤 孝太": 15, "長沼 洋一": 88,
    "安居 海渡": 25, "瀬古 樹": 12, "林 幸多郎": 18, "渡邊 凌磨": 13, "金子 拓郎": 7, "小森 飛絢": 17,
  };
  for (const starter of match14.predictedLineups!.home.starters) {
    assert.equal(starter.number, expectedNumbers[starter.name], `unexpected number for ${starter.name}`);
  }
  // alternativesの対象一致（背番号込み）。
  assert.equal(match14.predictedLineups?.home.starters.find((s) => s.name === "西川 周作")?.alternative, "福井 光輝（23）");
  assert.equal(match14.predictedLineups?.home.starters.find((s) => s.name === "安居 海渡")?.alternative, "植木 颯（37）");
  assert.equal(match14.predictedLineups?.home.starters.find((s) => s.name === "林 幸多郎")?.alternative, "山根 視来（6）");
  assert.equal(match14.predictedLineups?.home.starters.find((s) => s.name === "渡邊 凌磨")?.alternative, "マテウス サヴィオ（10）");
  assert.equal(match14.predictedLineups?.home.starters.find((s) => s.name === "金子 拓郎")?.alternative, "南野 遥海（42）");
  assert.equal(match14.predictedLineups?.home.starters.find((s) => s.name === "小森 飛絢")?.alternative, "オナイウ 阿道（45）");
});

test("match-14 registers Tokyo Verdy's predicted lineup with the correct on-screen left-to-right order", () => {
  assert.equal(match14.predictedLineups?.away.formation, "3-4-2-1");
  assert.equal(match14.predictedLineups?.away.starters.length, 11);
  // FormationPitchはstarters配列の並び順がそのまま画面左→右になるため、
  // 目視確認済みの左→右順（DF：井上/林/鈴木、MF：溝口/平川/齋藤/新井、
  // シャドー：福田/平尾）と一致すること。11名・背番号・選手名自体は変更しない。
  assert.deepEqual(match14.predictedLineups?.away.starters.map(({ name }) => name), [
    "マテウス", "井上 竜太", "林 尚輝", "鈴木 海音", "溝口 修平", "平川 怜",
    "齋藤 功佑", "新井 悠太", "福田 湧矢", "平尾 勇人", "染野 唯月",
  ]);
  assert.deepEqual(match14.predictedLineups?.away.starters.map(({ number }) => number), [
    1, 5, 4, 15, 18, 16, 8, 40, 14, 71, 9,
  ]);
});

test("match-14 registers 3 formation options (案A/B/C) via alternativeFormations, not by expanding predictedLineups", () => {
  assert.equal(match14.alternativeFormations?.length, 3);
  const [planA, planB, planC] = match14.alternativeFormations!;

  // 案A：3-4-2-1。11名の正式な予想案として登録され、「構造案」等の文言は含まない。
  assert.equal(planA.title, "案A：3-4-2-1");
  assert.equal(planA.title.includes("構造案"), false);
  assert.equal(planA.title.includes("未定"), false);
  assert.equal(planA.formation, "3-4-2-1");
  assert.equal(planA.starters.length, 11);
  assert.equal(planA.starters.some((s) => s.name === "ダニーロ ボザ"), false);
  assert.equal(planA.starters.filter((s) => s.role === "DF").length, 3);
  assert.equal(planA.starters.some((s) => s.name === "工藤 孝太" && s.role === "DF"), true);
  assert.equal(planA.starters.find((s) => s.name === "安居 海渡")?.alternative, "植木 颯（37）");
  assert.equal(planA.starters.find((s) => s.name === "渡邊 凌磨")?.alternative, "マテウス サヴィオ（10）");
  assert.equal(planA.note?.includes("未定"), false);

  // 本命FormationPitch（predictedLineups.home）と案Aカードで選手名・背番号が
  // 食い違わないこと。
  assert.deepEqual(
    planA.starters.map((s) => [s.name, s.number]),
    match14.predictedLineups!.home.starters.map((s) => [s.name, s.number]),
  );

  assert.equal(planB.formation, "4-1-2-3");
  assert.equal(planB.starters.length, 11);
  assert.equal(planB.starters.every((s) => s.name !== "ダニーロ ボザ"), true);
  assert.equal(planB.starters.find((s) => s.name === "山根 視来")?.alternative, "林 幸多郎");

  assert.equal(planC.formation, "4-2-3-1");
  assert.equal(planC.starters.length, 11);
  assert.equal(planC.starters.every((s) => s.name !== "ダニーロ ボザ"), true);
  assert.equal(planC.starters.find((s) => s.name === "植木 颯")?.alternative, "安居 海渡");

  // 案AはpredictedLineups.homeと同一のformation/starters構成であること。
  assert.equal(match14.predictedLineups?.home.formation, "3-4-2-1");
  assert.equal(match14.predictedLineups?.home.starters.length, 11);
});

test("match-14 treats Danilo Boza as the sole 欠場予定 even after Kudo fills the 3rd CB slot, and does not mark 西川/金子/林 as unavailable", () => {
  assert.equal(match14.availability?.likelyUnavailable.length, 1);
  assert.deepEqual(match14.availability?.likelyUnavailable[0], { team: "浦和", players: ["ダニーロ ボザ"] });
  // ボザは案Aにも他のどの案にも先発復帰していないこと。
  const allStarterNames = [
    ...match14.predictedLineups!.home.starters.map((s) => s.name),
    ...match14.alternativeFormations!.flatMap((plan) => plan.starters.map((s) => s.name)),
  ];
  assert.equal(allStarterNames.includes("ダニーロ ボザ"), false);
  // 西川・金子・林はいずれの案でも先発候補として維持（欠場確定扱いにしない）。
  assert.equal(allStarterNames.includes("西川 周作"), true);
  assert.equal(allStarterNames.includes("金子 拓郎"), true);
  assert.equal(allStarterNames.includes("林 幸多郎"), true);
});

test("match-14 editorial mentions 南野 as a multi-position candidate without registering him as a starter in two places at once", () => {
  const editorialText = [...match14.matchNotes, ...match14.focusPoints].join("\n");
  assert.equal(editorialText.includes("南野"), true);
  // 同一alternativeFormations案の中で、南野を複数ポジションの確定starterに重複登録していない
  // （いずれの案でもalternativeとしてのみ登場する）。
  for (const plan of match14.alternativeFormations!) {
    assert.equal(plan.starters.filter((s) => s.name === "南野 遥海").length, 0);
  }
});

test("match-14 editorial (strategies/focusPoints/matchNotes) covers CB shortage / Seko's fitness / 南野 without over-asserting Urawa's formation", () => {
  assert.equal(match14.strategies.length, 3);
  assert.deepEqual(match14.strategies.map(({ title }) => title), [
    "瀬古を自由にさせない",
    "金子・渡邊を前向きにさせない",
    "小森への縦一本を簡単に入れさせない",
  ]);
  assert.equal(match14.strategies.every(({ result }) => result === "pending"), true);

  assert.equal(match14.focusPoints.length, 3);
  assert.equal(match14.focusPoints.some((p) => p.startsWith("3バック継続か、4バックへ戻すか")), true);
  assert.equal(match14.focusPoints.some((p) => p.startsWith("瀬古がいる時間と、いなくなった後")), true);
  assert.equal(match14.focusPoints.some((p) => p.startsWith("南野をどこで使うか")), true);

  // 東京V前節（千葉戦）レビュー5段落＋既存の浦和側短評5段落を維持。
  assert.equal(match14.matchNotes.length, 10);
  const editorialText = [...match14.matchNotes, ...match14.focusPoints].join("\n");
  // 瀬古のフル出場可否について断定表現を使っていないこと。
  for (const forbidden of ["必ず交代する", "90分は出られない", "絶対に", "確実に途中交代"]) {
    assert.equal(editorialText.includes(forbidden), false, `unexpected assertive phrase: ${forbidden}`);
  }
});

test("match-14 PRE-MATCH REVIEW opens with the Tokyo Verdy Chiba-match review, without touching predictedLineups/availability/match-13", () => {
  const verdyReview = match14.matchNotes.slice(0, 5).join("\n");
  assert.equal(verdyReview.includes("千葉戦"), true);
  assert.equal(verdyReview.includes("一美"), true);
  assert.equal(verdyReview.includes("4-4-2"), true);
  assert.equal(verdyReview.includes("林") && verdyReview.includes("同点"), true);
  assert.equal(verdyReview.includes("7戦未勝利"), true);
  assert.equal(verdyReview.includes("初日") || verdyReview.includes("今季初勝利"), true);
  // "初日"を使う場合は一般読者にも分かるよう"今季初勝利"の補足を必ず伴うこと。
  if (verdyReview.includes("初日")) {
    assert.equal(verdyReview.includes("今季初勝利"), true);
  }

  // 既存の浦和側短評（5段落）は削除せず、そのまま後ろに残っていること。
  assert.equal(match14.matchNotes[5], "浦和は岡山戦で鹿島戦から先発を6人変更した。西川、金子、林は体調面で不透明な状況があり、渡邊もコンディションが万全とは言い切れない。一方で、ダニーロ・ボザは岡山戦で負傷交代しており、現時点では欠場を想定している。");

  // 今回変更禁止のフィールドに影響がないこと。
  assert.equal(match14.predictedLineups?.home.starters.length, 11);
  assert.equal(match14.predictedLineups?.away.starters.length, 11);
  assert.equal(match14.alternativeFormations?.length, 3);
  assert.equal(match14.availability?.likelyUnavailable.length, 1);
  assert.deepEqual(match14.availability?.likelyUnavailable[0], { team: "浦和", players: ["ダニーロ ボザ"] });
});
