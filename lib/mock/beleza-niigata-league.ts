import type { ActualLineup, MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord, PredictedLineup, Team } from "../../types/domain";
import { albirexNiigataLadiesTeam, belezaTeam } from "./beleza.ts";

// 公式記録: https://weleague.jp/files/2026/match_pdf_jp/2026111411.pdf（2026/11/14 17:12:22発行）
// 公式試合ページ: https://weleague.jp/matches/2026111411/（2026-11-17照合）
// スコア・得点・交代（ベンチ欄「分」「番号」で交代相手を対応付け）・メンバー表・試合環境・記録は公式記録PDFの表記。
// 既存NEXT 5エントリ「beleza-next-14」のIDを再利用し、試合を重複登録しない。
export const niigataLeagueTeam: Team = albirexNiigataLadiesTeam;
export const belezaNiigataLeagueMatch = {
  id: "beleza-next-14", competition: "2026/27 WEリーグ 第9節",
  dateLabel: "11.14 SAT", kickoffLabel: "15:04", kickoffAt: "2026-11-14T15:04:00+09:00",
  venue: "味の素フィールド西が丘", status: "finished" as const, isBelezaHome: true,
  homeTeamName: belezaTeam.name, awayTeamName: niigataLeagueTeam.name, homeScore: 2, awayScore: 1,
  sourceUrl: "https://weleague.jp/matches/2026111411/",
  recordPdfUrl: "https://weleague.jp/files/2026/match_pdf_jp/2026111411.pdf",
};
export const belezaNiigataLeagueHalfScores = { firstHalf: "1-1", secondHalf: "1-0" };
export const belezaNiigataLeagueGoals: MatchGoal[] = [
  { minute: "3'", scorer: "城和 怜奈", team: niigataLeagueTeam.name },
  { minute: "13'", scorer: "式田 和", team: belezaTeam.name },
  { minute: "57'", scorer: "塩越 柚歩", team: belezaTeam.name },
];
/** 公式記録の警告・退場欄は両チームとも記載なし。 */
export const belezaNiigataLeagueCards: MatchCard[] = [];
/** HT（公式記録の46*）はハーフタイム中の交代。 */
export const belezaNiigataLeagueSubstitutions: MatchSubstitution[] = [
  { minute: "HT", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "猶本 光" },
  { minute: "64'", team: belezaTeam.name, playerOut: "松田 紫野", playerIn: "松永 未夢" },
  { minute: "64'", team: belezaTeam.name, playerOut: "土光 真代", playerIn: "青木 夕菜" },
  { minute: "64'", team: belezaTeam.name, playerOut: "小林 里歌子", playerIn: "樋渡 百花" },
  { minute: "69'", team: niigataLeagueTeam.name, playerOut: "山本 結菜", playerIn: "滝川 結女" },
  { minute: "69'", team: niigataLeagueTeam.name, playerOut: "新堀 華波", playerIn: "川澄 奈穂美" },
  { minute: "79'", team: niigataLeagueTeam.name, playerOut: "城和 怜奈", playerIn: "藤原 凛音" },
  { minute: "79'", team: niigataLeagueTeam.name, playerOut: "下吉 優衣", playerIn: "上尾野辺 めぐみ" },
  { minute: "89'", team: niigataLeagueTeam.name, playerOut: "杉田 亜未", playerIn: "富岡 千宙" },
];
export const belezaNiigataLeagueOfficialRecord: OfficialMatchRecord = {
  kickoff: "15:04", attendance: 1836, weather: "曇、無風", temperature: "19.5℃", humidity: "44%",
  referee: "荒川 里実", assistantReferees: ["曽根 未宇", "稲葉 里美"], fourthOfficial: "田中 陽哉",
  sourceUrl: "https://weleague.jp/files/2026/match_pdf_jp/2026111411.pdf",
};
/** 公式記録のシュート・CK、FKは直接FK＋間接FKの合計（東京NB 5+2、新潟L 2+1）で公式試合ページの表記と一致。 */
export const belezaNiigataLeagueStats = {
  beleza: { shots: 24, freeKicks: 7, corners: 11 },
  opponent: { shots: 4, freeKicks: 3, corners: 3 },
};
/** 公式記録の登録ポジション・背番号。配置図（belezaNiigataLeagueFormation）とは区別する。 */
export const belezaNiigataLeagueActualLineup: ActualLineup = {
  starters: { GK: ["21 水口 茉優"], DF: ["3 村松 智子", "4 土光 真代", "5 松田 紫野", "32 松岡 瑛茉"], MF: ["14 眞城 美春", "19 塩越 柚歩", "7 北村 菜々美"], FW: ["13 氏原 里穂菜", "20 小林 里歌子", "38 式田 和"] },
  bench: { GK: ["1 野田 にな"], DF: ["2 青木 夕菜", "17 朝生 珠実"], MF: ["6 隅田 凜", "8 猶本 光", "18 松永 未夢"], FW: ["11 樋渡 百花"] },
};
export const niigataLeagueActualLineup: ActualLineup = {
  starters: { GK: ["1 平尾 知佳"], DF: ["6 有吉 佐織", "5 白沢 百合恵", "4 横山 笑愛", "25 髙梨 智穂"], MF: ["33 田中 聖愛", "13 杉田 亜未", "14 下吉 優衣", "23 山本 結菜"], FW: ["11 新堀 華波", "19 城和 怜奈"] },
  bench: { GK: ["31 久野 吹雪"], DF: ["16 富岡 千宙"], MF: ["10 上尾野辺 めぐみ", "17 滝川 結女"], FW: ["9 川澄 奈穂美", "18 江﨑 杏那", "27 藤原 凛音"] },
};
export const belezaNiigataLeagueManagers = { beleza: "楠瀬 直木", opponent: "阪倉 裕二" };
/**
 * ユーザー提供の配置情報に基づく東京NBの開始時3-4-2-1（公式フォーメーションではない）。
 * GK→DF3→MF4→シャドー2→FW1、各行は画面左→右。試合中の配置変更は推測で追加しない。
 * 新潟Lの開始時配置は確認できないため作成しない。
 */
export const belezaNiigataLeagueFormation: PredictedLineup = {
  formation: "3-4-2-1",
  starters: [
    { number: 21, name: "水口 茉優", position: "GK" },
    { number: 5, name: "松田 紫野", position: "DF" },
    { number: 3, name: "村松 智子", position: "DF" },
    { number: 4, name: "土光 真代", position: "DF" },
    { number: 32, name: "松岡 瑛茉", position: "MF" },
    { number: 14, name: "眞城 美春", position: "MF" },
    { number: 19, name: "塩越 柚歩", position: "MF" },
    { number: 38, name: "式田 和", position: "MF" },
    { number: 13, name: "氏原 里穂菜", position: "MF" },
    { number: 7, name: "北村 菜々美", position: "MF" },
    { number: 20, name: "小林 里歌子", position: "FW" },
  ],
};
export const belezaNiigataLeagueReviewTitle = "3分に先制を許すも13分に同点、57分に逆転。新潟Lに2-1で勝利";
/**
 * 公式記録の得点経過・数値に基づくレビュー。
 * 映像を確認していないため、プレス・攻撃ルート・個人のプレー評価は断定しない。
 */
export const belezaNiigataLeagueReview = [
  "日テレ・東京ヴェルディベレーザは、2026/27 WEリーグ第9節でアルビレックス新潟レディースとホームの味の素フィールド西が丘で対戦し、2-1で逆転勝利した。前節N相模原戦の0-1の敗戦から勝利を挙げ、リーグ戦の成績は6勝3敗となった。",
  "開始3分、新潟Lの城和怜奈にヘディングで先制点を許した。ベレーザは13分、公式記録の得点経過によると右からの眞城美春の浮き球に村松智子がヘディングで合わせ、相手DFに当たったこぼれ球を式田和が右足で決めて1-1の同点に追いつき、前半を終えた。",
  "後半57分、公式記録の得点経過によると猶本光の直接FKから北村菜々美を経て、塩越柚歩が左足で決めて逆転。その後は両チームとも得点がなく、2-1で試合を終えた。",
  "ベレーザはハーフタイムに氏原里穂菜に代えて猶本光を、64分に松田紫野・土光真代・小林里歌子に代えて松永未夢・青木夕菜・樋渡百花を投入した。交代の意図を示す公式資料は確認できていないため、ここでは評価しない。警告・退場は両チームともなかった。",
  "公式記録のシュート数はベレーザ24本、新潟L4本。CKは11対3、FKは7対3だった。ただし、シュート数だけでは決定機の数や内容の優劣は判断できない。",
];
/** 観戦者本人の所感（後日追記用）。空の間は詳細ページに表示しない。 */
export const belezaNiigataLeagueViewerNotes: string[] = [];
