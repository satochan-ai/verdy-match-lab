import type { Match } from "@/types/domain";

/**
 * Jリーグ公式記録（https://data.j-league.or.jp/SFMS02/?match_card_id=34619）と東京ヴェルディ公式の結果ページを
 * 2026-10-21に照合。二つの出典で差があった項目は公式記録（Jリーグ）を採用している:
 *   キックオフ 19:03（公式記録・東京V公式）／横浜FM クルークス→近藤の交代 65'（公式記録。東京V公式の表は61'表記）。
 * 公式記録にない値（枠内シュート・パス・支配率・オフサイド等）は登録しない。
 * 開始時フォーメーションと配置はJリーグ公式のフォーメーションページ
 * （https://www.jleague.jp/match/j1/2026/102107/lineup/）の「前半0分」表示で確認した
 * （東京V 4-4-2 ／ 横浜FM 4-2-3-1。既定表示は後半41分＝最後の交代後の布陣のため使用していない）。
 * pitchOrderは同画面の座標から読み取った図の並び（GK→最終ライン→前線、各行は左→右）。
 * 東京Vは画面左向き攻撃で下側＝左、横浜FMは画面右向き攻撃で上側＝左。
 * starters／benchは公式記録の登録ポジション別リストで、図の行とは一致しない場合がある。
 */
const sourceUrl = "https://data.j-league.or.jp/SFMS02/?match_card_id=34619";
const emptyProfile = { formation: "開始時未確認", characteristics: { attack: "未分析", defense: "未分析" }, keyPlayers: [], recentTrend: "未分析" };
export const yokohamaFmResult: Match = {
  id: "sched-yokohama-fm",
  homeTeam: { id: "yokohama-f-marinos", name: "横浜F・マリノス", isVerdy: false },
  awayTeam: { id: "verdy", name: "東京ヴェルディ", isVerdy: true }, isVerdyHome: false,
  kickoffAt: "2026-10-21T19:03:00+09:00", venue: "ＭＵＦＧスタジアム", status: "finished", homeScore: 2, awayScore: 2, timeSegment: null,
  fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第11節" }, verdyProfile: emptyProfile, opponentProfile: emptyProfile,
  matchNotes: [
    "横浜F・マリノス 2-2 東京ヴェルディ（前半 1-0、後半 1-2）。東京Vは0-2から追いつき、アウェイで引き分けた。",
    "得点：横浜FM 23' 宮市 亮、50' 遠野 大弥 ／ 東京V 73' 藤本 寛也、90+3' 山田 剛綺。",
    "警告：東京V 14' 藤本 寛也、24' 鈴木 海音。退場なし。",
    "公式記録のスタッツ：シュート 横浜FM 14 - 東京V 12 ／ CK 6 - 6 ／ FK 25 - 15。",
    "監督：横浜FM スティーブ コリカ ／ 東京V 相馬 直樹。VAR：飯田 淳平 ／ AVAR：鶴岡 将樹。",
    "開始時フォーメーション：東京V 4-4-2 ／ 横浜FM 4-2-3-1（Jリーグ公式 フォーメーション「前半0分」）。",
  ], focusPoints: [], strategies: [],
  officialRecord: { kickoff: "19:03", attendance: 40765, weather: "晴", temperature: "26.7℃", humidity: "67%", referee: "小屋 幸栄", assistantReferees: ["渡辺 康太", "安藤 康平"], fourthOfficial: "阿部 将茂", sourceUrl },
  goals: [
    { minute: "23'", scorer: "宮市 亮", team: "横浜F・マリノス" },
    { minute: "50'", scorer: "遠野 大弥", team: "横浜F・マリノス" },
    { minute: "73'", scorer: "藤本 寛也", team: "東京ヴェルディ" },
    { minute: "90+3'", scorer: "山田 剛綺", team: "東京ヴェルディ" },
  ],
  cards: [
    { minute: "14'", player: "藤本 寛也", team: "東京ヴェルディ", type: "yellow" },
    { minute: "24'", player: "鈴木 海音", team: "東京ヴェルディ", type: "yellow" },
  ],
  substitutions: [
    { minute: "6'", team: "横浜F・マリノス", playerOut: "知念 慶", playerIn: "山根 陸" },
    { minute: "46'", team: "東京ヴェルディ", playerOut: "一美 和成", playerIn: "神田 奏真" },
    { minute: "61'", team: "東京ヴェルディ", playerOut: "鈴木 海音", playerIn: "内田 陽介" },
    { minute: "61'", team: "東京ヴェルディ", playerOut: "齋藤 功佑", playerIn: "森田 晃樹" },
    { minute: "65'", team: "横浜F・マリノス", playerOut: "ジョルディ クルークス", playerIn: "近藤 友喜" },
    { minute: "65'", team: "横浜F・マリノス", playerOut: "木村 卓斗", playerIn: "鈴木 冬一" },
    { minute: "65'", team: "横浜F・マリノス", playerOut: "遠野 大弥", playerIn: "天野 純" },
    { minute: "72'", team: "東京ヴェルディ", playerOut: "チョ ユミン", playerIn: "佐古 真礼" },
    { minute: "79'", team: "横浜F・マリノス", playerOut: "天野 純", playerIn: "喜田 拓也" },
    { minute: "86'", team: "東京ヴェルディ", playerOut: "熊取谷 一星", playerIn: "山田 剛綺" },
  ],
  actualLineups: {
    home: { formation: "4-2-3-1", formationBasis: "Jリーグ公式 フォーメーション「前半0分」（試合開始時）", pitchOrder: ["21 飯倉 大樹", "13 井上 太聖", "33 諏訪間 幸成", "17 ジェイソン キニョーネス", "34 木村 卓斗", "14 知念 慶", "41 松村 晃助", "11 ジョルディ クルークス", "7 遠野 大弥", "23 宮市 亮", "9 谷村 海那"], starters: { GK: ["21 飯倉 大樹"], DF: ["13 井上 太聖", "17 ジェイソン キニョーネス", "33 諏訪間 幸成", "34 木村 卓斗"], MF: ["14 知念 慶", "41 松村 晃助", "7 遠野 大弥"], FW: ["11 ジョルディ クルークス", "9 谷村 海那", "23 宮市 亮"] }, bench: { GK: ["1 朴 一圭"], DF: ["25 鈴木 冬一", "44 トーマス デン"], MF: ["8 喜田 拓也", "28 山根 陸", "40 天野 純"], FW: ["19 テヴィス", "24 近藤 友喜", "43 二田 理央"] } },
    away: { formation: "4-4-2", formationBasis: "Jリーグ公式 フォーメーション「前半0分」（試合開始時）", pitchOrder: ["1 マテウス", "18 溝口 修平", "96 チョ ユミン", "4 林 尚輝", "15 鈴木 海音", "40 新井 悠太", "16 平川 怜", "8 齋藤 功佑", "19 藤本 寛也", "33 一美 和成", "25 熊取谷 一星"], starters: { GK: ["1 マテウス"], DF: ["15 鈴木 海音", "4 林 尚輝", "96 チョ ユミン", "18 溝口 修平"], MF: ["19 藤本 寛也", "8 齋藤 功佑", "16 平川 怜", "40 新井 悠太"], FW: ["25 熊取谷 一星", "33 一美 和成"] }, bench: { GK: ["21 長沢 祐弥"], DF: ["22 内田 陽介", "29 佐古 真礼"], MF: ["2 柴戸 海", "7 松橋 優安", "10 森田 晃樹"], FW: ["13 山田 剛綺", "17 キム ヒョンウ", "38 神田 奏真"] } },
  },
};
