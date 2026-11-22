import type { MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord } from "@/types/domain";
import type { U21OfficialLineup } from "./u21";

export const u21GambaSources = {
  match: "https://www.jleague.jp/match/u-21/2026/112207/",
  record: "https://data.j-league.or.jp/SFMS02/?match_card_id=35145",
  club: "https://www.gamba-osaka.net/c/game/2627/1077.html",
};

export const u21GambaMatch = {
  id: "u21-next-6",
  status: "finished" as const,
  competition: "2026/27 U-21 Jリーグ 交流戦ラウンド 第2節",
  kickoffAt: "2026-11-22T14:00:00+09:00",
  kickoffLabel: "14:00",
  venue: "パナソニック スタジアム 吹田",
  isVerdyHome: false,
  homeTeamName: "U-21ガンバ大阪",
  awayTeamName: "東京ヴェルディU-21",
  homeScore: 2,
  awayScore: 3,
  scheduleNote: "2026年11月22日（日）／ 前半 1–2 ／ 後半 1–1（G大阪－東京V）",
};

export const u21GambaOfficialRecord: OfficialMatchRecord = {
  kickoff: "14:03",
  attendance: 805,
  weather: "晴",
  temperature: "13.1℃",
  humidity: "39%",
  referee: "原田 雅士",
  assistantReferees: ["古田 鉱", "杉本 隼乙"],
  fourthOfficial: "西尾 憲太",
  sourceUrl: u21GambaSources.record,
};

const home = u21GambaMatch.homeTeamName;
const away = u21GambaMatch.awayTeamName;

export const u21GambaGoals: MatchGoal[] = [
  { minute: "24'", scorer: "加賀野 統", team: home },
  { minute: "33'", scorer: "川村 楽人", team: away },
  { minute: "41'", scorer: "川村 楽人", team: away },
  { minute: "61'", scorer: "中積 爲", team: home },
  { minute: "90+5'", scorer: "仲山 獅恩", team: away },
];

export const u21GambaHomeOfficialLineup: U21OfficialLineup = {
  starters: {
    GK: ["31 張 奥林"],
    DF: ["46 村田 康輔", "19 池谷 銀姿郎", "45 丸岡 海太", "54 嶋岡 陽大"],
    MF: ["59 坂井 雄真", "58 深江 龍明", "61 城阪 光喜", "32 吉原 優輝", "64 加賀野 統"],
    FW: ["37 中積 爲"],
  },
  bench: {
    GK: ["43 野畑 優真"],
    DF: ["52 竹原 玲音", "53 岡元 侑大"],
    MF: ["56 藤井 英翔", "55 笠井 直樹"],
    FW: ["62 三村 走太", "9 林 大地"],
  },
};

export const u21GambaAwayOfficialLineup: U21OfficialLineup = {
  starters: {
    GK: ["41 中村 圭佑"],
    DF: ["85 渡邉 春来", "28 山本 丈偉", "86 カマラ シェック セザール"],
    MF: ["42 今井 健人", "24 仲山 獅恩", "88 木下 晴天", "30 川村 楽人"],
    FW: ["27 白井 亮丞", "51 大藤 颯太", "38 神田 奏真"],
  },
  bench: {
    GK: ["91 高居 丈流"],
    DF: ["99 庄司 瑛人"],
    MF: ["94 植月 瑛大"],
    FW: ["97 七久保 優"],
  },
};

// 村田→竹原はData Site採録。城阪→林はＪリーグ公式速報の後半45分を採録。
export const u21GambaSubstitutions: MatchSubstitution[] = [
  { minute: "62'", team: home, playerOut: "村田 康輔", playerIn: "竹原 玲音" },
  { minute: "62'", team: home, playerOut: "丸岡 海太", playerIn: "岡元 侑大" },
  { minute: "62'", team: home, playerOut: "深江 龍明", playerIn: "藤井 英翔" },
  { minute: "62'", team: home, playerOut: "嶋岡 陽大", playerIn: "笠井 直樹" },
  { minute: "71'", team: home, playerOut: "坂井 雄真", playerIn: "三村 走太" },
  { minute: "90'", team: home, playerOut: "城阪 光喜", playerIn: "林 大地" },
];

export const u21GambaCards: MatchCard[] = [
  { minute: "90'", player: "三村 走太", team: home, type: "yellow" },
  { minute: "90+4'", player: "岡元 侑大", team: home, type: "yellow" },
];

export const u21GambaStats = [
  { label: "シュート", home: 8, away: 19 },
  { label: "オフサイド", home: 4, away: 5 },
  { label: "コーナーキック", home: 2, away: 6 },
  { label: "フリーキック", home: 19, away: 14 },
  { label: "警告", home: u21GambaCards.length, away: 0 },
  { label: "退場", home: 0, away: 0 },
];