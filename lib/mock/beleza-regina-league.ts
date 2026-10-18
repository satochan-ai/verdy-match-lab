import type { ActualLineup, MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord } from "../../types/domain";
import { belezaTeam, reginaTeam } from "./beleza.ts";

// 10/18 WEリーグ第4節。10/11のカップ戦とは別の公式記録。
// https://weleague.jp/files/2026/match_pdf_jp/2026101811.pdf （2026/10/18 16:19:26）
export const belezaReginaLeagueMatch = {
  id: "beleza-next-9", competition: "2026/27 WEリーグ 第4節",
  dateLabel: "10.18 SUN", kickoffLabel: "14:04", kickoffAt: "2026-10-18T14:04:00+09:00",
  venue: "エディオンピースウイング広島", status: "finished" as const, isBelezaHome: false,
  homeTeamName: reginaTeam.name, awayTeamName: belezaTeam.name, homeScore: 2, awayScore: 3,
};
export const belezaReginaLeagueHalfScores = { firstHalf: "1-1", secondHalf: "1-2" };
export const belezaReginaLeagueGoals: MatchGoal[] = [
  { minute: "14'", scorer: "小林 里歌子", team: belezaTeam.name },
  { minute: "45'", scorer: "瀧澤 千聖", team: reginaTeam.name },
  { minute: "55'", scorer: "瀧澤 千聖", team: reginaTeam.name },
  { minute: "75'", scorer: "樋渡 百花", team: belezaTeam.name },
  { minute: "89'", scorer: "青木 夕菜", team: belezaTeam.name },
];
// 公式記録の警告・退場欄は両軍とも記載なし。
export const belezaReginaLeagueCards: MatchCard[] = [];
export const belezaReginaLeagueSubstitutions: MatchSubstitution[] = [
  { minute: "46*'", team: belezaTeam.name, playerOut: "朝生 珠実", playerIn: "式田 和" },
  { minute: "46*'", team: belezaTeam.name, playerOut: "小林 里歌子", playerIn: "猶本 光" },
  { minute: "60'", team: belezaTeam.name, playerOut: "松永 未夢", playerIn: "樋渡 百花" },
  { minute: "60'", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "北村 菜々美" },
  { minute: "61'", team: reginaTeam.name, playerOut: "上野 真実", playerIn: "古賀 花野" },
  { minute: "70'", team: reginaTeam.name, playerOut: "李 誠雅", playerIn: "呉屋 絵理子" },
  { minute: "70'", team: reginaTeam.name, playerOut: "瀧澤 千聖", playerIn: "松本 茉奈加" },
  { minute: "87'", team: reginaTeam.name, playerOut: "早間 美空", playerIn: "左山 桃子" },
  { minute: "89'", team: belezaTeam.name, playerOut: "隅田 凜", playerIn: "ダネル タン" },
];
export const belezaReginaLeagueOfficialRecord: OfficialMatchRecord = {
  kickoff: "14:04", attendance: 3908, weather: "曇・無風", temperature: "24.5℃", humidity: "73%",
  referee: "兼松 春奈", assistantReferees: ["中本 早紀", "谷本 菜々子"], fourthOfficial: "石井 隆司",
  sourceUrl: "https://weleague.jp/matches/2026101811/",
};
export const belezaReginaLeagueStats = {
  beleza: { shots: 11, freeKicks: 15, corners: 5 },
  opponent: { shots: 7, freeKicks: 5, corners: 5 },
};
export const belezaReginaLeagueActualLineup: ActualLineup = {
  starters: { GK: ["21 水口 茉優"], DF: ["2 青木 夕菜", "4 土光 真代", "17 朝生 珠実", "32 松岡 瑛茉"], MF: ["6 隅田 凜", "19 塩越 柚歩", "14 眞城 美春", "18 松永 未夢"], FW: ["13 氏原 里穂菜", "20 小林 里歌子"] },
  bench: { GK: ["31 遠藤 有紗"], DF: [], MF: ["7 北村 菜々美", "8 猶本 光"], FW: ["11 樋渡 百花", "25 ダネル タン", "38 式田 和", "40 安藤 梢"] },
};
export const reginaLeagueActualLineup: ActualLineup = {
  starters: { GK: ["1 木稲 瑠那"], DF: ["18 渡邊 真衣", "4 朝倉 加奈子", "38 嶋田 華", "16 早間 美空"], MF: ["23 柳瀬 楓菜", "8 小川 愛", "9 上野 真実"], FW: ["10 瀧澤 千聖", "30 李 誠雅", "11 中嶋 淑乃"] },
  bench: { GK: ["32 石田 ひなは"], DF: ["3 呉屋 絵理子", "6 左山 桃子"], MF: ["7 伊藤 めぐみ", "14 松本 茉奈加", "29 笠原 綺乃"], FW: ["28 古賀 花野"] },
};
