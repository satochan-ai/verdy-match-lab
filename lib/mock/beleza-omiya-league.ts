import type { ActualLineup, MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord, PredictedLineup, Team } from "../../types/domain";
import { belezaTeam } from "./beleza.ts";

// 公式記録: https://weleague.jp/files/2026/match_pdf_jp/2026103135.pdf（2026/10/31 17:09:49発行）
export const omiyaLeagueTeam: Team = { id: "rb-omiya-women", name: "RB大宮アルディージャWOMEN", isVerdy: false };
export const belezaOmiyaLeagueMatch = {
  id: "beleza-next-12", competition: "2026/27 WEリーグ 第7節",
  dateLabel: "10.31 SAT", kickoffLabel: "15:05", kickoffAt: "2026-10-31T15:05:00+09:00",
  venue: "味の素フィールド西が丘", status: "finished" as const, isBelezaHome: true,
  homeTeamName: belezaTeam.name, awayTeamName: omiyaLeagueTeam.name, homeScore: 2, awayScore: 1,
};
export const belezaOmiyaLeagueHalfScores = { firstHalf: "1-0", secondHalf: "1-1" };
export const belezaOmiyaLeagueGoals: MatchGoal[] = [
  { minute: "38'", scorer: "式田 和", team: belezaTeam.name },
  { minute: "53'", scorer: "西尾 葉音", team: omiyaLeagueTeam.name },
  { minute: "86'", scorer: "樋渡 百花", team: belezaTeam.name },
];
/** 公式記録の警告・退場欄は両チームとも記載なし。 */
export const belezaOmiyaLeagueCards: MatchCard[] = [];
export const belezaOmiyaLeagueSubstitutions: MatchSubstitution[] = [
  { minute: "HT", team: belezaTeam.name, playerOut: "松田 紫野", playerIn: "松岡 瑛茉" },
  { minute: "HT", team: omiyaLeagueTeam.name, playerOut: "林 みのり", playerIn: "西尾 葉音" },
  { minute: "HT", team: omiyaLeagueTeam.name, playerOut: "宗形 みなみ", playerIn: "大島 暖菜" },
  { minute: "61'", team: belezaTeam.name, playerOut: "隅田 凜", playerIn: "朝生 珠実" },
  { minute: "61'", team: belezaTeam.name, playerOut: "小林 里歌子", playerIn: "眞城 美春" },
  { minute: "65'", team: omiyaLeagueTeam.name, playerOut: "浜田 芽来", playerIn: "髙橋 佑奈" },
  { minute: "73'", team: belezaTeam.name, playerOut: "松永 未夢", playerIn: "北村 菜々美" },
  { minute: "75'", team: omiyaLeagueTeam.name, playerOut: "落合 依和", playerIn: "岩下 綺良々" },
  { minute: "83'", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "安藤 梢" },
];
export const belezaOmiyaLeagueOfficialRecord: OfficialMatchRecord = {
  kickoff: "15:05", attendance: 2436, weather: "晴、弱風", temperature: "24.2℃", humidity: "26%",
  referee: "山本 真理", assistantReferees: ["吉永 真紀", "朝倉 みな子"], fourthOfficial: "鳥居 尚登",
  sourceUrl: "https://weleague.jp/files/2026/match_pdf_jp/2026103135.pdf",
};
/** FKは公式試合ページの表記を採用。直接FK・間接FKの独自内訳は追加しない。 */
export const belezaOmiyaLeagueStats = {
  beleza: { shots: 18, freeKicks: 1, corners: 11 },
  opponent: { shots: 7, freeKicks: 2, corners: 1 },
};
/** 公式記録の登録ポジション。観戦提供情報に基づく配置図とは分けて保持する。 */
export const belezaOmiyaLeagueActualLineup: ActualLineup = {
  starters: { GK: ["21 水口 茉優"], DF: ["2 青木 夕菜", "3 村松 智子", "5 松田 紫野"], MF: ["6 隅田 凜", "19 塩越 柚歩", "18 松永 未夢"], FW: ["20 小林 里歌子", "38 式田 和", "11 樋渡 百花", "13 氏原 里穂菜"] },
  bench: { GK: ["31 遠藤 有紗"], DF: ["4 土光 真代", "17 朝生 珠実", "32 松岡 瑛茉"], MF: ["7 北村 菜々美", "14 眞城 美春"], FW: ["40 安藤 梢"] },
};
export const omiyaLeagueActualLineup: ActualLineup = {
  starters: { GK: ["22 今村 南海"], DF: ["6 杉澤 海星", "10 乗松 瑠華", "3 金平 莉紗", "2 落合 依和"], MF: ["15 林 みのり", "27 牧野 美優", "14 宗形 みなみ", "4 髙橋 美紀", "34 浜田 芽来"], FW: ["20 門脇 真依"] },
  bench: { GK: ["1 伊藤 有里彩"], DF: ["5 岩下 綺良々", "7 西澤 日菜乃"], MF: ["11 大島 暖菜", "13 仲田 歩夢", "18 髙橋 佑奈"], FW: ["9 西尾 葉音"] },
};
/** 観戦・提供情報の3-4-2-1。GK→DF→MF→シャドー→FW、各行は画面左→右。 */
export const belezaOmiyaLeagueFormation: PredictedLineup = {
  formation: "3-4-2-1",
  starters: [
    { number: 21, name: "水口 茉優", position: "GK" },
    { number: 5, name: "松田 紫野", position: "DF" },
    { number: 3, name: "村松 智子", position: "DF" },
    { number: 2, name: "青木 夕菜", position: "DF" },
    { number: 13, name: "氏原 里穂菜", position: "MF" },
    { number: 6, name: "隅田 凜", position: "MF" },
    { number: 19, name: "塩越 柚歩", position: "MF" },
    { number: 38, name: "式田 和", position: "MF" },
    { number: 20, name: "小林 里歌子", position: "MF" },
    { number: 18, name: "松永 未夢", position: "MF" },
    { number: 11, name: "樋渡 百花", position: "FW" },
  ],
};
export const belezaOmiyaLeagueReviewTitle = "式田和が先制、終盤に樋渡百花が決勝点。大宮に2-1で勝利";
/** 公式記録の得点経過・数値に基づくレビュー。映像未確認の戦術評価は含めない。 */
export const belezaOmiyaLeagueReview = [
  "日テレ・東京ヴェルディベレーザは、2026/27 WEリーグ第7節でRB大宮アルディージャWOMENと対戦し、2-1で勝利した。前節C大阪戦の1-2の敗戦から勝利を挙げた。",
  "38分、左サイドで小林里歌子から氏原里穂菜へとつなぎ、氏原の浮き球を中央の式田和がヘディングで決めて先制。前半を1-0で終えた。",
  "後半53分、大宮は乗松瑠華、牧野美優と浮き球でつなぎ、GKに当たった後のこぼれ球を西尾葉音が右足で決めた。ベレーザは1-1の同点に追いつかれた。",
  "86分、眞城美春から北村菜々美へとつなぎ、北村のドリブルからのパスを受けた樋渡百花がドリブルを経て左足で決勝点。最終スコア2-1で試合を終えた。",
  "シュート数はベレーザ18本、大宮7本。コーナーキックは11対1だった。",
];
/** 観戦者本人の所感（後日追記用）。空の間は詳細ページに表示しない。 */
export const belezaOmiyaLeagueViewerNotes: string[] = [];
