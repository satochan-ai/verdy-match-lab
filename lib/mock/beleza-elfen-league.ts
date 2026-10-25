import type { MatchGoal, MatchSubstitution, OfficialMatchRecord, PredictedLineup } from "../../types/domain";
import { belezaTeam, elfenTeam } from "./beleza.ts";

// 公式記録: https://weleague.jp/files/2026/match_pdf_jp/2026102420.pdf
// 配置の左右順とレビュー本文はユーザー確定内容。
export const belezaElfenLeagueMatch = {
  id: "beleza-next-10", competition: "2026/27 WEリーグ 第6節",
  dateLabel: "10.24 SAT", kickoffLabel: "12:03", kickoffAt: "2026-10-24T12:03:00+09:00",
  venue: "AGFフィールド", status: "finished" as const, isBelezaHome: true,
  homeTeamName: belezaTeam.name, awayTeamName: elfenTeam.name, homeScore: 4, awayScore: 1,
};
export const belezaElfenLeagueHalfScores = { firstHalf: "3-0", secondHalf: "1-1" };
export const belezaElfenLeagueGoals: MatchGoal[] = [
  { minute: "7'", scorer: "眞城 美春（PK）", team: belezaTeam.name },
  { minute: "14'", scorer: "氏原 里穂菜", team: belezaTeam.name },
  { minute: "35'", scorer: "猶本 光", team: belezaTeam.name },
  { minute: "65'", scorer: "樋口 梨花", team: elfenTeam.name },
  { minute: "81'", scorer: "樋渡 百花", team: belezaTeam.name },
];
export const belezaElfenLeagueSubstitutions: MatchSubstitution[] = [
  { minute: "HT", team: belezaTeam.name, playerOut: "土光 真代", playerIn: "村松 智子" },
  { minute: "HT", team: belezaTeam.name, playerOut: "塩越 柚歩", playerIn: "朝生 珠実" },
  { minute: "HT", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "松永 未夢" },
  { minute: "66'", team: belezaTeam.name, playerOut: "猶本 光", playerIn: "松田 紫野" },
  { minute: "85'", team: belezaTeam.name, playerOut: "式田 和", playerIn: "小林 里歌子" },
];
export const belezaElfenLeagueOfficialRecord: OfficialMatchRecord = {
  kickoff: "12:03", attendance: 621, weather: "雨、無風", temperature: "16.7℃", humidity: "90%",
  sourceUrl: "https://weleague.jp/files/2026/match_pdf_jp/2026102420.pdf",
};
export const belezaElfenLeagueFormation: PredictedLineup = {
  formation: "3-4-2-1",
  starters: [
    { number: 21, name: "水口 茉優", position: "GK" },
    { number: 32, name: "松岡 瑛茉", position: "DF" },
    { number: 4, name: "土光 真代", position: "DF" },
    { number: 2, name: "青木 夕菜", position: "DF" },
    { number: 13, name: "氏原 里穂菜", position: "MF" },
    { number: 19, name: "塩越 柚歩", position: "MF" },
    { number: 14, name: "眞城 美春", position: "MF" },
    { number: 38, name: "式田 和", position: "MF" },
    { number: 7, name: "北村 菜々美", position: "MF" },
    { number: 8, name: "猶本 光", position: "MF" },
    { number: 11, name: "樋渡 百花", position: "FW" },
  ],
};
export const belezaElfenLeagueReviewTitle = "前半3得点で主導権を握る！ベレーザがEL埼玉に4-1で勝利";
export const belezaElfenLeagueReview = [
  "前半の3ゴールで主導権を握り、4-1で快勝",
  "日テレ・東京ヴェルディベレーザは、2026/27 WEリーグ第6節でちふれASエルフェン埼玉と対戦し、4-1で勝利した。",
  "雨のAGFフィールドで行われた一戦は、開始早々の7分に眞城美春がPKを決めて先制。14分には氏原里穂菜がヘディングで追加点を奪い、35分には猶本光が3点目を決めた。",
  "前半を3-0で折り返したベレーザは、ハーフタイムに3選手を交代。後半65分に1点を返されたものの、81分には樋渡百花が北村菜々美との連係から4点目を奪い、相手の反撃を断ち切った。",
  "4選手がそれぞれ得点したことは、攻撃面での大きな収穫。一方、シュート数はベレーザの13本に対し、EL埼玉が15本と上回っており、守備面には振り返るべき点も残る。",
  "快勝という結果だけでなく、複数の選手が得点に絡んだこと、選手交代を重ねながら勝ち切ったことが今後につながる一戦となった。",
];
