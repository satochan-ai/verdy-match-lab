import type { ActualLineup, MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord } from "../../types/domain";
import { belezaTeam, cerezoOsakaYanmarTeam } from "./beleza.ts";

// 公式記録: https://weleague.jp/files/2026/match_pdf_jp/2026102805.pdf（2026/10/28 20:09:30発行）
// 交代の組み合わせは公式記録の「交代 番号」欄（途中出場選手が代わった選手の背番号）で確認。
// 開始時フォーメーション・左右配置は公式記録・WEリーグ公式試合ページで確認できないため登録しない。
export const belezaCerezoLeagueMatch = {
  id: "beleza-next-11", competition: "2026/27 WEリーグ 第5節",
  dateLabel: "10.28 WED", kickoffLabel: "18:03", kickoffAt: "2026-10-28T18:03:00+09:00",
  venue: "味の素フィールド西が丘", status: "finished" as const, isBelezaHome: true,
  homeTeamName: belezaTeam.name, awayTeamName: cerezoOsakaYanmarTeam.name, homeScore: 1, awayScore: 2,
};
export const belezaCerezoLeagueHalfScores = { firstHalf: "0-1", secondHalf: "1-1" };
export const belezaCerezoLeagueGoals: MatchGoal[] = [
  { minute: "19'", scorer: "高和 芹夏", team: cerezoOsakaYanmarTeam.name },
  { minute: "50'", scorer: "和田 麻希", team: cerezoOsakaYanmarTeam.name },
  { minute: "76'", scorer: "塩越 柚歩", team: belezaTeam.name },
];
/** 公式記録の警告・退場欄は両チームとも記載なし。 */
export const belezaCerezoLeagueCards: MatchCard[] = [];
export const belezaCerezoLeagueSubstitutions: MatchSubstitution[] = [
  { minute: "HT", team: belezaTeam.name, playerOut: "隅田 凜", playerIn: "猶本 光" },
  { minute: "65'", team: belezaTeam.name, playerOut: "青木 夕菜", playerIn: "村松 智子" },
  { minute: "65'", team: belezaTeam.name, playerOut: "北村 菜々美", playerIn: "小林 里歌子" },
  { minute: "65'", team: belezaTeam.name, playerOut: "眞城 美春", playerIn: "松永 未夢" },
  { minute: "69'", team: cerezoOsakaYanmarTeam.name, playerOut: "高和 芹夏", playerIn: "田子 夏海" },
  { minute: "76'", team: cerezoOsakaYanmarTeam.name, playerOut: "百濃 実結香", playerIn: "玉村 海乃" },
  { minute: "86'", team: belezaTeam.name, playerOut: "松岡 瑛茉", playerIn: "松田 紫野" },
  { minute: "90+3'", team: cerezoOsakaYanmarTeam.name, playerOut: "和田 麻希", playerIn: "久保田 晴香" },
];
export const belezaCerezoLeagueOfficialRecord: OfficialMatchRecord = {
  kickoff: "18:03", attendance: 947, weather: "晴、弱風", temperature: "14.0℃", humidity: "36%",
  referee: "田澤 友梨奈", assistantReferees: ["萩尾 麻衣子", "竹田 和雄"], fourthOfficial: "永島 淳平",
  sourceUrl: "https://weleague.jp/files/2026/match_pdf_jp/2026102805.pdf",
};
/** 公式記録のシュート・CK・FK（FKは直接FKと間接FKの合計：東京NB 5+5、C大阪 5+0）。 */
export const belezaCerezoLeagueStats = {
  beleza: { shots: 9, freeKicks: 10, corners: 6 },
  opponent: { shots: 14, freeKicks: 5, corners: 4 },
};
export const belezaCerezoLeagueActualLineup: ActualLineup = {
  starters: { GK: ["21 水口 茉優"], DF: ["2 青木 夕菜", "4 土光 真代", "32 松岡 瑛茉"], MF: ["6 隅田 凜", "19 塩越 柚歩", "7 北村 菜々美", "14 眞城 美春"], FW: ["38 式田 和", "11 樋渡 百花", "13 氏原 里穂菜"] },
  bench: { GK: ["31 遠藤 有紗"], DF: ["3 村松 智子", "5 松田 紫野"], MF: ["8 猶本 光", "18 松永 未夢"], FW: ["20 小林 里歌子", "25 ダネル タン"] },
};
export const cerezoLeagueActualLineup: ActualLineup = {
  starters: { GK: ["27 西中 麻穂"], DF: ["5 浅山 茉緩", "17 中谷 莉奈", "3 米田 博美", "7 荻久保 優里"], MF: ["9 和田 麻希", "11 宝田 沙織", "18 宮本 光梨", "13 百濃 実結香", "10 脇阪 麗奈", "14 高和 芹夏"], FW: [] },
  bench: { GK: ["21 石田 心菜"], DF: ["6 久保田 晴香"], MF: ["15 米田 エイミー", "26 北原 朱夏", "29 玉村 海乃"], FW: ["20 田子 夏海", "28 池田 柚葉"] },
};
export const belezaCerezoLeagueReviewTitle = "2点を追う展開から塩越が反撃のゴールも、C大阪に1-2で敗戦";
/** 公式記録で確認できる事実のみ。映像を確認していない戦術的な評価は書かない。 */
export const belezaCerezoLeagueReview = [
  "日テレ・東京ヴェルディベレーザは、2026/27 WEリーグ第5節でセレッソ大阪ヤンマーレディースと対戦し、1-2で敗れた。",
  "味の素フィールド西が丘で行われた一戦は、前半19分に高和芹夏のヘディングで先制を許し、0-1で前半を折り返した。",
  "ハーフタイムに隅田凜に代えて猶本光を投入したが、後半50分に和田麻希のヘディングで追加点を奪われる。65分には3選手を同時に交代した。",
  "76分、塩越柚歩がこぼれ球を左足で決めて1点差に迫ったものの、同点ゴールは生まれなかった。",
  "シュート数はベレーザの9本に対し、C大阪が14本だった。",
];
/** 観戦者本人の所感（後日追記用）。空の間は詳細ページに表示しない。 */
export const belezaCerezoLeagueViewerNotes: string[] = [];
