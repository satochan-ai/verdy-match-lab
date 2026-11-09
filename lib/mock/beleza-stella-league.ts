import type { ActualLineup, MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord, Team } from "../../types/domain";
import { belezaTeam } from "./beleza.ts";

// 公式記録: WEリーグ公式試合ページ https://weleague.jp/matches/2026110725/（2026-11-10照合）
// スコア・得点・試合経過（左列＝N相模原、右列＝東京NB）・メンバー表・試合環境・記録はすべて同ページの表記。
// 開始時フォーメーション・左右配置は公式で確認できないため登録しない（登録ポジション別の一覧のみ）。
export const stellaLeagueTeam: Team = { id: "nojima-stella-kanagawa-sagamihara", name: "ノジマステラ神奈川相模原", isVerdy: false };
export const belezaStellaLeagueMatch = {
  id: "beleza-next-13", competition: "2026/27 WEリーグ 第8節",
  dateLabel: "11.07 SAT", kickoffLabel: "14:03", kickoffAt: "2026-11-07T14:03:00+09:00",
  venue: "相模原ギオンスタジアム", status: "finished" as const, isBelezaHome: false,
  homeTeamName: stellaLeagueTeam.name, awayTeamName: belezaTeam.name, homeScore: 1, awayScore: 0,
  sourceUrl: "https://weleague.jp/matches/2026110725/",
};
export const belezaStellaLeagueHalfScores = { firstHalf: "1-0", secondHalf: "0-0" };
export const belezaStellaLeagueGoals: MatchGoal[] = [
  { minute: "31'", scorer: "南里 杏", team: stellaLeagueTeam.name },
];
/** 公式試合経過の右列（東京NB）に記載された警告。 */
export const belezaStellaLeagueCards: MatchCard[] = [
  { minute: "82'", player: "樋渡 百花", team: belezaTeam.name, type: "yellow" },
];
export const belezaStellaLeagueSubstitutions: MatchSubstitution[] = [
  { minute: "62'", team: belezaTeam.name, playerOut: "小林 里歌子", playerIn: "北村 菜々美" },
  { minute: "62'", team: belezaTeam.name, playerOut: "松永 未夢", playerIn: "土光 真代" },
  { minute: "70'", team: stellaLeagueTeam.name, playerOut: "川島 はるな", playerIn: "祐村 ひかる" },
  { minute: "73'", team: belezaTeam.name, playerOut: "松岡 瑛茉", playerIn: "松田 紫野" },
  { minute: "73'", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "隅田 凜" },
  { minute: "90+3'", team: stellaLeagueTeam.name, playerOut: "笹井 一愛", playerIn: "笹井 優愛" },
];
export const belezaStellaLeagueOfficialRecord: OfficialMatchRecord = {
  kickoff: "14:03", attendance: 850, weather: "晴", temperature: "19.9℃", humidity: "29%",
  referee: "山田 昌輝", assistantReferees: ["國師 えりな", "鷲尾 里梨"], fourthOfficial: "皆川 正紀",
  sourceUrl: "https://weleague.jp/matches/2026110725/",
};
/** 公式試合ページの記録欄（SHOTS・FREE KICK・CORNER KICK）。直接FK・間接FKの内訳は追加しない。 */
export const belezaStellaLeagueStats = {
  beleza: { shots: 7, freeKicks: 8, corners: 7 },
  opponent: { shots: 3, freeKicks: 9, corners: 5 },
};
/** 公式メンバー表の登録ポジション・背番号。 */
export const belezaStellaLeagueActualLineup: ActualLineup = {
  starters: { GK: ["21 水口 茉優"], DF: ["2 青木 夕菜", "3 村松 智子", "32 松岡 瑛茉"], MF: ["14 眞城 美春", "19 塩越 柚歩", "18 松永 未夢"], FW: ["38 式田 和", "13 氏原 里穂菜", "11 樋渡 百花", "20 小林 里歌子"] },
  bench: { GK: ["1 野田 にな"], DF: ["4 土光 真代", "5 松田 紫野", "17 朝生 珠実"], MF: ["6 隅田 凜", "7 北村 菜々美"], FW: ["25 ダネル タン"] },
};
export const stellaLeagueActualLineup: ActualLineup = {
  starters: { GK: ["1 岩崎 有波"], DF: ["14 南里 杏", "5 大賀 理紗子", "6 パオラ ソルデヴィラ", "19 築地 育"], MF: ["17 川島 はるな", "24 明 詩音梨", "4 伊東 珠梨", "9 笹井 一愛"], FW: ["11 片山 由菜", "10 大竹 麻友"] },
  bench: { GK: ["21 風間 優華"], DF: ["2 筒井 梨香", "13 五嶋 京香"], MF: ["8 岸川 奈津希", "15 白井 ひめ乃", "18 笹井 優愛"], FW: ["29 祐村 ひかる"] },
};
export const belezaStellaLeagueManagers = { beleza: "楠瀬 直木", opponent: "小笠原 唯志" };
/** N相模原公式の試合後コメント（要約の出典）。 */
export const stellaPostMatchCommentUrl = "https://stellakanagawa.nojima.co.jp/matches/results/261107/";
export const belezaStellaLeagueReviewTitle = "前半31分の失点を返せず、N相模原に0-1で敗戦";
/**
 * 公式記録の事実と、出典を明示した試合後コメントの要約のみ。
 * 映像を確認していないため、決定機の数・守備の出来・個人の調子などは評価しない。
 */
export const belezaStellaLeagueReview = [
  "日テレ・東京ヴェルディベレーザは、2026/27 WEリーグ第8節でノジマステラ神奈川相模原とアウェイで対戦し、0-1で敗れた。リーグ戦の成績は5勝3敗となった。",
  "前半31分、N相模原の南里杏に先制点を許し、0-1で前半を終えた。N相模原公式サイトの試合後コメントによると、この得点は2本目のCKで、競り合いからのこぼれ球を南里選手がファーサイドで決めたもの。後半は両チームとも得点がなく、そのまま試合を終えた。今季のリーグ戦でベレーザが無得点に終わったのは、この試合が初めてだった。",
  "ベレーザは62分に小林里歌子と松永未夢に代えて北村菜々美と土光真代を、73分に松岡瑛茉と氏原里穂菜に代えて松田紫野と隅田凜を投入した。交代の意図を示す公式資料は確認できていないため、ここでは評価しない。82分には樋渡百花に警告が出た。",
  "公式記録のシュート数はベレーザ7本、N相模原3本、CKは7対5。N相模原は3本のシュートで1点を挙げ、ベレーザは7本のシュートで得点できなかった。ただし、シュート数だけでは決定機の数や内容の優劣は判断できない。",
  "N相模原の小笠原唯志監督は試合後コメントで、ベレーザの3バックの脇とサイドを突く狙いと、ゴール前ではクロスに人数をかけて対応したことを挙げている（相手側の見方であり、本サイトでは映像で確認していない）。次戦以降は、7本のシュートやCKがどの位置・形から生まれたか、セットプレーの守備でどう対応していたかを、記録や映像で確認したい。",
];
/** 観戦者本人の所感（後日追記用）。空の間は詳細ページに表示しない。 */
export const belezaStellaLeagueViewerNotes: string[] = [];
