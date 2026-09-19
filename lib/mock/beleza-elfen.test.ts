import assert from "node:assert/strict";
import test from "node:test";
import {
  belezaElfenMatch,
  belezaElfenActualLineup,
  belezaElfenActualFormation,
  elfenActualLineup,
  elfenTeam,
  belezaMatch,
} from "./beleza.ts";

test("BELEZA vs エルフェン埼玉: fixture uses the reused beleza-next-4 id, official kickoff (16:03), and unconfirmed result", () => {
  assert.equal(belezaElfenMatch.id, "beleza-next-4");
  assert.equal(belezaElfenMatch.kickoffAt, "2026-09-19T16:03:00+09:00");
  assert.equal(belezaElfenMatch.venue, "熊谷スポーツ文化公園陸上競技場");
  assert.equal(belezaElfenMatch.status, "scheduled");
  assert.equal(belezaElfenMatch.isBelezaHome, false);
  assert.equal(belezaElfenMatch.homeTeamName, elfenTeam.name);
  assert.equal(belezaElfenMatch.awayTeamName, "日テレ・東京ヴェルディベレーザ");
  // scoreフィールドを一切持たない（0-0等の仮入力をしていないことの確認）。
  assert.equal("homeScore" in belezaElfenMatch, false);
  assert.equal("awayScore" in belezaElfenMatch, false);
});

test("BELEZA vs エルフェン埼玉 does not overwrite belezaMatch (INAC神戸, current display)", () => {
  assert.equal(belezaMatch.id, "beleza-next-3");
  assert.notEqual(belezaMatch.id, belezaElfenMatch.id);
});

test("BELEZA official lineup has 11 starters and 5 substitutes for the Elfen match (#36 中村 優那 corrected out to Elfen)", () => {
  const starters = Object.values(belezaElfenActualLineup.starters).flat();
  const bench = Object.values(belezaElfenActualLineup.bench).flat();
  assert.equal(starters.length, 11);
  // ユーザー確認済み訂正により#36 中村 優那をエルフェン側へ移動したため、
  // ベレーザ控えは5名になる（人数合わせのための他選手の推測補完はしない）。
  assert.equal(bench.length, 5);
  assert.deepEqual(belezaElfenActualLineup.starters, {
    GK: ["1 野田 にな"],
    DF: ["32 松岡 瑛茉", "3 村松 智子", "5 松田 紫野"],
    MF: ["6 隅田 凜", "35 須長 穂乃果"],
    FW: ["38 式田 和", "24 伊藤 琴音", "7 北村 菜々美", "13 氏原 里穂菜", "11 樋渡 百花"],
  });
  assert.deepEqual(belezaElfenActualLineup.bench, {
    GK: ["21 水口 茉優"],
    DF: ["4 土光 真代", "22 井手 ひなた"],
    MF: [],
    FW: ["25 ダネル タン", "40 安藤 梢"],
  });
});

test("#36 中村 優那 belongs to エルフェン埼玉's bench, not BELEZA's", () => {
  const belezaBench = Object.values(belezaElfenActualLineup.bench).flat();
  const elfenBench = Object.values(elfenActualLineup.bench).flat();
  assert.equal(belezaBench.some((p) => p.includes("中村 優那")), false);
  assert.equal(elfenBench.some((p) => p === "36 中村 優那"), true);
});

test("BELEZA actual formation is 3-4-2-1 with screen left-to-right order matching user-confirmed placement", () => {
  assert.equal(belezaElfenActualFormation.formation, "3-4-2-1");
  assert.equal(belezaElfenActualFormation.starters.length, 11);
  // GK
  assert.equal(belezaElfenActualFormation.starters[0].name, "野田 にな");
  // DF: 左→右 = 松田・村松・松岡
  assert.deepEqual(belezaElfenActualFormation.starters.slice(1, 4).map((s) => s.name), [
    "松田 紫野", "村松 智子", "松岡 瑛茉",
  ]);
  // MF: 左→右 = 北村・隅田・須長・伊藤
  assert.deepEqual(belezaElfenActualFormation.starters.slice(4, 8).map((s) => s.name), [
    "北村 菜々美", "隅田 凜", "須長 穂乃果", "伊藤 琴音",
  ]);
  // シャドー: 左→右 = 氏原・式田
  assert.deepEqual(belezaElfenActualFormation.starters.slice(8, 10).map((s) => s.name), [
    "氏原 里穂菜", "式田 和",
  ]);
  // CF
  assert.equal(belezaElfenActualFormation.starters[10].name, "樋渡 百花");
});

test("BELEZA actual formation squad numbers match the official lineup for every starter", () => {
  const expectedNumbers: Record<string, number> = {
    "野田 にな": 1, "松田 紫野": 5, "村松 智子": 3, "松岡 瑛茉": 32,
    "北村 菜々美": 7, "隅田 凜": 6, "須長 穂乃果": 35, "伊藤 琴音": 24,
    "氏原 里穂菜": 13, "式田 和": 38, "樋渡 百花": 11,
  };
  for (const starter of belezaElfenActualFormation.starters) {
    assert.equal(starter.number, expectedNumbers[starter.name], `unexpected number for ${starter.name}`);
  }
});

test("エルフェン埼玉 official lineup has 11 starters and 7 substitutes (#36 中村 優那 corrected in), with no formation guessed", () => {
  const starters = Object.values(elfenActualLineup.starters).flat();
  const bench = Object.values(elfenActualLineup.bench).flat();
  assert.equal(starters.length, 11);
  // ユーザー確認済み訂正により#36 中村 優那が加わり、エルフェン控えは7名になる。
  assert.equal(bench.length, 7);
  assert.equal(elfenActualLineup.formation, undefined);
  assert.deepEqual(elfenActualLineup.starters, {
    GK: ["51 山田 桜音"],
    DF: ["4 平尾 愛穂", "20 岸 みのり", "32 三秋 祥子", "25 大髙 心"],
    MF: ["16 栃谷 美羽", "5 瀬戸口 梢", "24 大曽根 由乃", "8 田中 結衣", "14 植村 祥子"],
    FW: ["18 髙橋 雛"],
  });
  assert.deepEqual(elfenActualLineup.bench, {
    GK: ["21 鹿島 彩莉"],
    DF: ["13 佐久間 未稀"],
    MF: ["37 梅月 万優子", "29 山下 朝子", "19 森中 陽菜", "17 木許 和心"],
    FW: ["36 中村 優那"],
  });
});

test("no starter/bench overlap and no duplicate squad numbers within either team (Elfen match)", () => {
  for (const lineup of [belezaElfenActualLineup, elfenActualLineup]) {
    const starters = Object.values(lineup.starters).flat();
    const bench = Object.values(lineup.bench).flat();
    assert.equal(new Set([...starters, ...bench]).size, starters.length + bench.length);
    const numbers = [...starters, ...bench].map((p) => p.split(" ")[0]);
    assert.equal(new Set(numbers).size, numbers.length);
  }
});
