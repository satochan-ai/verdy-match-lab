import type { ActualLineup, MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord, PredictedLineup } from "../../types/domain";
import { belezaTeam, inacKobeTeam } from "./beleza.ts";

// WEリーグ第11節。9/12のクラシエカップ戦とは別の試合。
export const belezaInacLeagueMatch = {
  id: "beleza-next-16",
  competition: "2026/27 WEリーグ 第11節",
  dateLabel: "11.23 MON",
  kickoffAt: "2026-11-23T15:04:00+09:00",
  scheduledKickoff: "15:00",
  venue: "味の素フィールド西が丘",
  status: "finished",
  homeTeamName: belezaTeam.name,
  awayTeamName: inacKobeTeam.name,
  homeScore: 6,
  awayScore: 0,
  sourceUrl: "https://weleague.jp/matches/2026112304/",
  clubUrl: "https://www.verdy.co.jp/beleza/match/info/12026112304/result",
} as const;

export const belezaInacOfficialRecord = {
  kickoff: "15:04",
  attendance: 3076,
  weather: "晴",
  temperature: "15.2℃",
  humidity: "41%",
  referee: "舟橋 崇正",
  assistantReferees: ["萩尾 麻衣子", "吉永 真紀"],
  fourthOfficial: "有田 陽斗",
  sourceUrl: "https://data.weleague.jp/SFMS02/?match_card_id=35010",
} satisfies OfficialMatchRecord;

export const belezaInacRecordPdfUrl = "https://weleague.jp/files/2026/match_pdf_jp/2026112304.pdf";
export const belezaInacHalfScores = { firstHalf: "2-0", secondHalf: "4-0" };

export const belezaInacGoals: MatchGoal[] = [
  { minute: "19'", scorer: "樋渡 百花", team: belezaTeam.name },
  { minute: "35'", scorer: "樋渡 百花", team: belezaTeam.name },
  { minute: "59'", scorer: "樋渡 百花", team: belezaTeam.name },
  { minute: "65'", scorer: "塩越 柚歩", team: belezaTeam.name },
  { minute: "69'", scorer: "樋渡 百花", team: belezaTeam.name },
  { minute: "90'", scorer: "樋渡 百花", team: belezaTeam.name },
];

export const belezaInacCards: MatchCard[] = [];
export const belezaInacSubstitutions: MatchSubstitution[] = [
  { minute: "46*'", team: inacKobeTeam.name, playerOut: "髙瀬 愛実", playerIn: "辻澤 亜唯" },
  { minute: "46*'", team: inacKobeTeam.name, playerOut: "山本 摩也", playerIn: "大田 ありす" },
  { minute: "63'", team: belezaTeam.name, playerOut: "小林 里歌子", playerIn: "猶本 光" },
  { minute: "63'", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "松永 未夢" },
  { minute: "71'", team: belezaTeam.name, playerOut: "眞城 美春", playerIn: "隅田 凜" },
  { minute: "71'", team: belezaTeam.name, playerOut: "水口 茉優", playerIn: "野田 にな" },
  { minute: "75'", team: inacKobeTeam.name, playerOut: "桑原 藍", playerIn: "金月 夏萌" },
  { minute: "75'", team: inacKobeTeam.name, playerOut: "岸田 優花", playerIn: "箕輪 千慧" },
  { minute: "85'", team: belezaTeam.name, playerOut: "式田 和", playerIn: "北村 菜々美" },
  { minute: "85'", team: inacKobeTeam.name, playerOut: "久保田 真生", playerIn: "北村 礼" },
];

// PDFのオフサイド列は相手チームの回数。公式Play by Playで各チームの回数を照合。
export const belezaInacStats = {
  beleza: { shots: 16, freeKicks: 13, corners: 6, offsides: 3 },
  opponent: { shots: 9, freeKicks: 10, corners: 4, offsides: 2 },
};

export const belezaInacActualLineup: ActualLineup = {
  starters: {
    GK: ["21 水口 茉優"],
    DF: ["2 青木 夕菜", "3 村松 智子", "4 土光 真代", "32 松岡 瑛茉"],
    MF: ["14 眞城 美春", "19 塩越 柚歩", "38 式田 和", "13 氏原 里穂菜"],
    FW: ["11 樋渡 百花", "20 小林 里歌子"],
  },
  bench: {
    GK: ["1 野田 にな"], DF: ["5 松田 紫野", "17 朝生 珠実"],
    MF: ["6 隅田 凜", "7 北村 菜々美", "8 猶本 光", "18 松永 未夢"], FW: [],
  },
};

export const inacLeagueActualLineup: ActualLineup = {
  starters: {
    GK: ["1 田中 桃子"],
    DF: ["14 水野 蕗奈", "3 太田 美月", "5 三宅 史織", "13 桑原 藍"],
    MF: ["8 山本 摩也", "25 大熊 環", "10 成宮 唯"],
    FW: ["40 岸田 優花", "11 髙瀬 愛実", "19 久保田 真生"],
  },
  bench: {
    GK: ["99 船田 麻友"], DF: ["44 北村 礼", "30 松浦 加奈", "18 金月 夏萌"],
    MF: ["17 箕輪 千慧", "20 大田 ありす"], FW: ["29 辻澤 亜唯"],
  },
};

function makeFormation(lineup: ActualLineup, formation: string, shirtNumbers: number[]): PredictedLineup {
  const players = Object.entries(lineup.starters).concat(Object.entries(lineup.bench)).flatMap(
    ([position, names]: [string, string[]]) => names.map((entry) => {
      const space = entry.indexOf(" ");
      return { number: Number(entry.slice(0, space)), name: entry.slice(space + 1), position };
    }),
  );

  return {
    formation,
    starters: shirtNumbers.map((number) => {
      const player = players.find((entry) => entry.number === number);
      if (!player) throw new Error(`背番号 ${number} が公式メンバーにありません`);
      return player;
    }),
  };
}

// 現地観戦メモに基づく配置。GKから前線へ、各列はチーム視点の左から右。
export const belezaInacFormationPhases = [
  { label: "開始", lineup: makeFormation(belezaInacActualLineup, "4-4-2", [21, 32, 3, 4, 2, 13, 14, 19, 38, 11, 20]) },
  { label: "63分", lineup: makeFormation(belezaInacActualLineup, "4-4-2", [21, 32, 3, 4, 2, 18, 14, 19, 38, 11, 8]) },
  { label: "71分", lineup: makeFormation(belezaInacActualLineup, "4-4-2", [1, 32, 3, 4, 2, 18, 6, 19, 38, 11, 8]) },
  { label: "85分", lineup: makeFormation(belezaInacActualLineup, "4-2-3-1", [1, 32, 3, 4, 2, 6, 19, 18, 7, 8, 11]) },
];

export const inacFormationPhases = [
  { label: "開始", lineup: makeFormation(inacLeagueActualLineup, "4-1-2-3", [1, 13, 5, 3, 14, 25, 10, 8, 19, 11, 40]) },
  { label: "46分", lineup: makeFormation(inacLeagueActualLineup, "4-1-2-3", [1, 13, 5, 3, 14, 25, 10, 20, 19, 29, 40]) },
  { label: "75分", lineup: makeFormation(inacLeagueActualLineup, "4-1-2-3", [1, 18, 5, 3, 14, 25, 10, 20, 19, 29, 17]) },
  { label: "85分", lineup: makeFormation(inacLeagueActualLineup, "4-1-2-3", [1, 18, 5, 3, 14, 25, 10, 20, 44, 29, 17]) },
];

export const belezaInacReviewTitle = "樋渡百花が圧巻の5ゴール。INAC神戸を6–0で下す";
export const belezaInacGoalNotes = [
  { minute: "19'", play: "式田和のクロスに樋渡百花が右足で合わせて先制した。", assist: "式田 和" },
  { minute: "35'", play: "眞城美春のコーナーキックを樋渡百花が頭で合わせ、前半で2点のリードを奪った。", assist: "眞城 美春" },
  { minute: "59'", play: "式田和のシュートをGK田中桃子がセーブ。こぼれ球を樋渡百花が頭で押し込み、ハットトリックを達成した。" },
  { minute: "65'", play: "式田和のクロスを相手DFがクリアし、こぼれ球を塩越柚歩がノートラップで右足で決めた。", recordNote: "公式記録の得点経過には相手DFのクリアの記載がありません。" },
  { minute: "69'", play: "土光真代のロングパスを受けた樋渡百花が、ドリブルでGKをかわしてゴールを決めた。", assist: "土光 真代", recordNote: "シュートはWEリーグ公式記録では左足。現地観戦メモでは右足として記録しており、映像による再確認は未実施です。" },
  { minute: "90'", play: "猶本光、塩越柚歩、北村菜々美とつなぎ、北村のスルーパスを受けた樋渡百花が右足でこの日5点目を決めた。", assist: "北村 菜々美" },
];

export const belezaInacTacticalNotes = [
  "ベレーザは樋渡と小林の2トップ、氏原・眞城・塩越・式田の中盤4枚でスタート。63分は松永が左サイド、猶本が右FWに入り、71分は野田がGK、隅田が中央MFに入って4-4-2を維持した。",
  "85分の北村菜々美投入で4-2-3-1へ。樋渡を1トップに置き、2列目に左から松永・北村・猶本、ボランチに隅田・塩越を配した。",
  "INAC神戸は大熊をアンカー、成宮と山本をインサイドハーフに置く4-1-2-3。5選手が同じポジションを引き継ぎ、試合終了まで基本配置を維持した。",
];
