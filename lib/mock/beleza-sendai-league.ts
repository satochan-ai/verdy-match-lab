import type { ActualLineup, MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord, PredictedLineup, Team } from "../../types/domain";
import { belezaTeam } from "./beleza.ts";

// 公式記録: https://weleague.jp/files/2026/match_pdf_jp/2026111804.pdf（2026/11/18 16:13:37発行）
// 公式データ: https://data.weleague.jp/SFMS02/?match_card_id=35004 ・クラブ公式: https://www.verdy.co.jp/beleza/match/info/12026111804/result（2026-11-19照合）
// スコア・得点・交代（ベンチ欄「番号」と先発欄「分」で交代相手を対応付け）・メンバー表・試合環境・記録は公式記録PDFの表記。
// 既存NEXT 5エントリ「beleza-next-15」のIDを再利用し、試合を重複登録しない。
export const sendaiLeagueTeam: Team = { id: "mynavi-sendai", name: "マイナビ仙台", isVerdy: false };
export const belezaSendaiLeagueMatch = {
  id: "beleza-next-15", competition: "2026/27 WEリーグ 第10節",
  dateLabel: "11.18 WED", kickoffLabel: "14:03", kickoffAt: "2026-11-18T14:03:00+09:00",
  venue: "キューアンドエースタジアムみやぎ", status: "finished" as const, isBelezaHome: false,
  homeTeamName: sendaiLeagueTeam.name, awayTeamName: belezaTeam.name, homeScore: 2, awayScore: 3,
  sourceUrl: "https://www.verdy.co.jp/beleza/match/info/12026111804/result",
  dataUrl: "https://data.weleague.jp/SFMS02/?match_card_id=35004",
  recordPdfUrl: "https://weleague.jp/files/2026/match_pdf_jp/2026111804.pdf",
};
/** ホーム（仙台）-アウェイ（東京NB）の順。 */
export const belezaSendaiLeagueHalfScores = { firstHalf: "0-2", secondHalf: "2-1" };
/** 90+3分は公式記録で「ﾏｲ仙台 オウンゴール」（東京NBの選手名は記載なし）。仙台の得点として扱う。 */
export const belezaSendaiLeagueGoals: MatchGoal[] = [
  { minute: "33'", scorer: "小林 里歌子", team: belezaTeam.name },
  { minute: "40'", scorer: "氏原 里穂菜", team: belezaTeam.name },
  { minute: "52'", scorer: "安倍 乃花", team: sendaiLeagueTeam.name },
  { minute: "90'", scorer: "青木 夕菜", team: belezaTeam.name },
  { minute: "90+3'", scorer: "オウンゴール", team: sendaiLeagueTeam.name },
];
/** 公式記録の警告・退場欄は両チームとも記載なし。 */
export const belezaSendaiLeagueCards: MatchCard[] = [];
/** HT（公式記録の46*）はハーフタイム中の交代。 */
export const belezaSendaiLeagueSubstitutions: MatchSubstitution[] = [
  { minute: "HT", team: belezaTeam.name, playerOut: "松田 紫野", playerIn: "青木 夕菜" },
  { minute: "64'", team: belezaTeam.name, playerOut: "北村 菜々美", playerIn: "猶本 光" },
  { minute: "64'", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "松永 未夢" },
  { minute: "64'", team: sendaiLeagueTeam.name, playerOut: "遠藤 ゆめ", playerIn: "矢形 海優" },
  { minute: "64'", team: sendaiLeagueTeam.name, playerOut: "篠田 帆花", playerIn: "岩田 琳香" },
  { minute: "73'", team: belezaTeam.name, playerOut: "小林 里歌子", playerIn: "樋渡 百花" },
  { minute: "78'", team: sendaiLeagueTeam.name, playerOut: "江崎 世来", playerIn: "菊地 花奈" },
  { minute: "78'", team: sendaiLeagueTeam.name, playerOut: "井上 陽菜", playerIn: "太田 萌咲" },
  { minute: "90+1'", team: belezaTeam.name, playerOut: "眞城 美春", playerIn: "隅田 凜" },
];
export const belezaSendaiLeagueOfficialRecord: OfficialMatchRecord = {
  kickoff: "14:03", attendance: 426, weather: "晴、弱風", temperature: "15.2℃", humidity: "68%",
  referee: "小泉 朝香", assistantReferees: ["谷本 菜々子", "勝又 美沙希"], fourthOfficial: "岩佐 丈",
  sourceUrl: "https://weleague.jp/files/2026/match_pdf_jp/2026111804.pdf",
};
/** 公式記録のシュート・CK、FKは直接FK＋間接FKの合計（東京NB 5+0、仙台 4+2）で公式データの表記と一致。 */
export const belezaSendaiLeagueStats = {
  beleza: { shots: 16, freeKicks: 5, corners: 6 },
  opponent: { shots: 10, freeKicks: 6, corners: 7 },
};
/** 公式記録の登録ポジション・背番号。配置図（belezaSendaiLeagueFormation）とは区別する。 */
export const belezaSendaiLeagueActualLineup: ActualLineup = {
  starters: { GK: ["21 水口 茉優"], DF: ["3 村松 智子", "4 土光 真代", "5 松田 紫野", "32 松岡 瑛茉"], MF: ["14 眞城 美春", "19 塩越 柚歩", "7 北村 菜々美"], FW: ["13 氏原 里穂菜", "20 小林 里歌子", "38 式田 和"] },
  bench: { GK: ["1 野田 にな"], DF: ["2 青木 夕菜", "17 朝生 珠実"], MF: ["6 隅田 凜", "8 猶本 光", "18 松永 未夢"], FW: ["11 樋渡 百花"] },
};
export const sendaiLeagueActualLineup: ActualLineup = {
  starters: { GK: ["15 清水 栞"], DF: ["19 安倍 乃花", "4 三浦 紗津紀", "2 西野 朱音", "27 中野 琴音"], MF: ["8 江崎 世来", "18 佐藤 にいな", "6 井上 陽菜"], FW: ["10 遠藤 ゆめ", "9 津田 愛乃音", "7 篠田 帆花"] },
  bench: { GK: ["1 伊能 真弥"], DF: ["3 柏村 菜那", "14 高原 天音"], MF: ["20 菊地 花奈", "25 太田 萌咲", "35 岩田 琳香"], FW: ["13 矢形 海優"] },
};
export const belezaSendaiLeagueManagers = { beleza: "楠瀬 直木", opponent: "池田 太" };
/**
 * 観戦者（ユーザー）本人が確認した東京NBの開始時3-4-2-1。
 * 公式記録・公式データ・クラブ公式ページには配置図がないため、観戦確認を根拠とし公式の登録ポジションとは区別する。
 * GK→DF3→MF4→シャドー2→FW1、各行は画面左→右。試合中の配置変更は推測で追加しない。
 * 仙台の開始時配置は確認できないため作成しない。
 */
export const belezaSendaiLeagueFormation: PredictedLineup = {
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
export const belezaSendaiLeagueReviewTitle = "前半に2点を先行し、終盤の90分に3点目。アウェイで仙台に3-2で勝利";
/**
 * 公式記録の得点経過・数値に基づくレビュー。
 * 映像を確認していないため、プレス・攻撃ルート・個人のプレー評価は断定しない。
 */
export const belezaSendaiLeagueReview = [
  "日テレ・東京ヴェルディベレーザは、2026/27 WEリーグ第10節でマイナビ仙台とアウェイのキューアンドエースタジアムみやぎで対戦し、3-2で勝利した。前節新潟L戦に続く連勝で、リーグ戦の成績は7勝3敗となった。",
  "33分、公式記録の得点経過によると松田紫野の浮き球を受けた小林里歌子がドリブルから右足で決めて先制。40分には眞城美春のグラウンドパスを受けた氏原里穂菜がドリブルから右足で決め、前半を0-2で折り返した。",
  "後半52分、仙台は左CKからの中野琴音の浮き球に安倍乃花がヘディングで合わせて1点を返した。ベレーザは90分、松岡瑛茉の浮き球を村松智子がつなぎ、ハーフタイムから出場した青木夕菜がヘディングで決めて3点目を挙げた。90+3分には佐藤にいなのパスを受けた岩田琳香の左足シュートが相手DFに当たり、オウンゴールとして仙台の得点に記録された。試合は2-3で終了した。",
  "ベレーザはハーフタイムに松田紫野に代えて青木夕菜を、64分に北村菜々美・氏原里穂菜に代えて猶本光・松永未夢を、73分に小林里歌子に代えて樋渡百花を、90+1分に眞城美春に代えて隅田凜を投入した。交代の意図を示す公式資料は確認できていないため、ここでは評価しない。警告・退場は両チームともなかった。",
  "公式記録のシュート数はベレーザ16本、仙台10本。CKは6対7、FKは5対6だった。ただし、シュート数だけでは決定機の数や内容の優劣は判断できない。",
];
/** 観戦者本人の所感（後日追記用）。空の間は詳細ページに表示しない。 */
export const belezaSendaiLeagueViewerNotes: string[] = [];
