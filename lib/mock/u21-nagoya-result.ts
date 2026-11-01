import type { MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord } from "@/types/domain";
import type { U21OfficialLineup } from "./u21";

/** 2026-11-01 Jリーグ公式サイトのサマリー・ラインナップを照合。配置は未公表。 */
export const u21NagoyaMatch = {
  id: "u21-next-5", status: "finished" as const,
  competition: "2026／27Ｕ-21Ｊリーグ 交流戦ラウンド 第1節",
  fixtureMeta: { competition: "2026/27 U-21 Jリーグ", stage: "交流戦ラウンド", roundLabel: "第1節" },
  kickoffAt: "2026-11-01T13:00:00+09:00", kickoffLabel: "13:00",
  venue: "AGFフィールド", isVerdyHome: true,
  homeTeamName: "東京ヴェルディU-21", awayTeamName: "U-21名古屋グランパス", homeScore: 4, awayScore: 3,
  scheduleNote: "前半 2-3 ／ 後半 2-0。実際のキックオフは13:03。開始時フォーメーション・左右配置は未確認のため、ポジション別に掲載。",
};
export const u21NagoyaOfficialRecord: OfficialMatchRecord = {
  kickoff: "13:03", attendance: 525, weather: "晴", temperature: "23.3℃", humidity: "32%",
  referee: "山田 昌輝", assistantReferees: ["中村 一貴", "飯田 悠真"], fourthOfficial: "中原 圭太",
  sourceUrl: "https://www.jleague.jp/match/u-21/2026/110111/",
};
const home = u21NagoyaMatch.homeTeamName;
const away = u21NagoyaMatch.awayTeamName;
export const u21NagoyaGoals: MatchGoal[] = [
  { minute: "7'", scorer: "川村 楽人", team: home },
  { minute: "12'", scorer: "小島 蒼斗", team: away },
  { minute: "30'", scorer: "千賀 翔大郎", team: away },
  { minute: "37'", scorer: "川村 楽人", team: home },
  { minute: "40'", scorer: "杉浦 駿吾", team: away },
  { minute: "48'", scorer: "大藤 颯太", team: home },
  { minute: "84'", scorer: "神田 奏真", team: home },
];
export const u21NagoyaCards: MatchCard[] = [
  { minute: "4'", player: "竹内 悠三", team: away, type: "yellow" },
  { minute: "28'", player: "井上 竜太", team: home, type: "red" },
  { minute: "39'", player: "松田 陸", team: home, type: "yellow" },
  { minute: "40'", player: "川村 楽人", team: home, type: "yellow" },
  { minute: "73'", player: "成瀬 楓悟", team: away, type: "yellow" },
  { minute: "85'", player: "杉浦 駿吾", team: away, type: "yellow" },
  { minute: "90+1'", player: "成瀬 楓悟", team: away, type: "red" },
];
export const u21NagoyaSubstitutions: MatchSubstitution[] = [
  { minute: "13'", team: away, playerOut: "鮫島 充輝", playerIn: "水野 優人" },
  { minute: "18'", team: home, playerOut: "仲山 獅恩", playerIn: "田邉 秀斗" },
  { minute: "67'", team: away, playerOut: "菊地 泰智", playerIn: "成瀬 楓悟" },
  { minute: "89'", team: away, playerOut: "オディケ チソン太地", playerIn: "足立 惺洋" },
];
export const u21NagoyaHomeOfficialLineup: U21OfficialLineup = {
  starters: { GK: ["41 中村 圭佑"], DF: ["79 井上 竜太", "28 山本 丈偉", "83 松田 陸"], MF: ["24 仲山 獅恩", "89 食野 壮磨", "42 今井 健人", "30 川村 楽人"], FW: ["80 キム ヒョンウ", "51 大藤 颯太", "38 神田 奏真"] },
  bench: { GK: ["61 高橋 恒輝"], DF: ["82 田邉 秀斗", "86 カマラ シェック セザール"], MF: ["87 下吉 洸平", "88 木下 晴天", "95 ゼイナー 大耀"], FW: [] },
};
export const u21NagoyaAwayOfficialLineup: U21OfficialLineup = {
  starters: { GK: ["1 ピサノ アレックス幸冬堀尾"], DF: ["2 竹内 悠三", "20 久保 遥夢", "4 オディケ チソン太地"], MF: ["16 鮫島 充輝", "14 齋藤 太陽", "7 菊地 泰智", "8 千賀 翔大郎"], FW: ["10 杉浦 駿吾", "13 小島 蒼斗", "17 佐藤 煌太"] },
  bench: { GK: ["21 萩 裕陽"], DF: ["15 成瀬 楓悟", "18 足立 惺洋"], MF: ["90 川本 悠祐"], FW: ["9 水野 優人"] },
};
/** 未公表の枠内シュート・支配率などは埋めず、確認できた6項目だけ保持。 */
export const u21NagoyaStats = [
  { label: "シュート", home: 11, away: 13 },
  { label: "オフサイド", home: 3, away: 2 },
  { label: "コーナーキック", home: 5, away: 6 },
  { label: "フリーキック", home: 18, away: 8 },
  { label: "警告", home: 2, away: 3 },
  { label: "退場", home: 1, away: 1 },
];
export const u21NagoyaReview = {
  title: "川村楽人が2得点、神田奏真が決勝ゴール。名古屋に4-3で逆転勝利",
  paragraphs: [
    "7分に川村楽人が先制。12分に小島蒼斗に同点とされ、1-1の28分に井上竜太が退場した。30分には千賀翔大郎に勝ち越しを許した。37分に川村がこの日2点目を挙げて2-2に戻したが、40分に杉浦駿吾に決められ、前半を2-3で終えた。",
    "後半は48分に大藤颯太が同点ゴール。84分に神田奏真が決勝点を挙げ、4-3で逆転勝利した。名古屋の成瀬楓悟は67分に出場し、73分に警告、決勝点後の90+1分に退場となった。",
  ],
  cardNote: "井上竜太（28分）・成瀬楓悟（90+1分）は公式サイトで赤カード表示。成瀬には73分の警告があるが、2枚目の警告は掲載されていない。退場理由と、一発退場／警告2回による退場の明示は確認できないため断定しない。",
  sourceNote: "メンバーはJリーグ公式サイトのラインナップを採用（東京V控え6人、名古屋控え5人）。Data Siteの公式記録では川本悠祐（90）が東京V側に掲載されており、所属の表示に差異がある。",
};
