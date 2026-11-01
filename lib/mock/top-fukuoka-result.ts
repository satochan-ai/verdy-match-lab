import type { Match } from "@/types/domain";

/**
 * Jリーグ公式記録（https://data.j-league.or.jp/SFMS02/?match_card_id=34628）を2026-10-25に確認。
 * 交代・警告・入場者数・天候・審判・SH/CK/FKは公式記録の値を採用している。
 * 警告：公式記録は師岡 柊生を46'と記載（Jリーグ公式サイトの試合速報は前半45+5'）。公式記録の46'を採用。
 * アシストは公式記録に項目がないため、Jリーグ公式サイトの試合速報
 * （https://www.jleague.jp/match/j1/2026/102408/）の記載（松橋←一美、寺沼←溝口、ウェリック ポポ←北島）を採用。
 * 走行距離・スプリントはJリーグ公式サイトのスタッツ（トラッキングデータ）。同ページのシュート数（12-9）は
 * 公式記録（11-5）と異なるため、シュート数は公式記録を採用する。
 * 配置（pitchOrder）は観戦時の配置（GK→最終ライン→前線、各行は左→右）。東京VはJリーグ公式
 * フォーメーション「前半0分」と一致。福岡はJリーグ公式「前半0分」では見木が中盤中央・重見がシャドーで、
 * 観戦時の配置（重見が中盤中央・見木がシャドー）と一部異なる。
 * starters／benchは公式記録の登録ポジション別リスト。
 */
const sourceUrl = "https://data.j-league.or.jp/SFMS02/?match_card_id=34628";
const emptyProfile = { formation: "開始時未確認", characteristics: { attack: "未分析", defense: "未分析" }, keyPlayers: [], recentTrend: "未分析" };
export const fukuokaResult: Match = {
  id: "sched-fukuoka",
  homeTeam: { id: "verdy", name: "東京ヴェルディ", isVerdy: true },
  awayTeam: { id: "avispa-fukuoka", name: "アビスパ福岡", isVerdy: false }, isVerdyHome: true,
  kickoffAt: "2026-10-24T15:03:00+09:00", venue: "味の素スタジアム", status: "finished", homeScore: 3, awayScore: 1, timeSegment: null,
  fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第12節" }, verdyProfile: emptyProfile, opponentProfile: emptyProfile,
  matchNotes: [
    "東京ヴェルディ 3-1 アビスパ福岡（前半 1-0、後半 2-1）。東京Vは今季リーグ戦初勝利。",
    "得点：東京V 10' 熊取谷 一星、74' 松橋 優安、90' 寺沼 星文 ／ 福岡 56' ウェリック ポポ。",
    "途中出場の得点：松橋 優安（67'に熊取谷 一星と交代で出場）、寺沼 星文（88'に一美 和成と交代で出場）。",
    "警告：福岡 41' 椎橋 慧也、46' 師岡 柊生、68' 宮 大樹。東京Vは選手の警告なし（備考：16' 相馬 直樹監督に警告）。退場なし。",
    "公式記録のスタッツ：シュート 東京V 11 - 福岡 5 ／ CK 4 - 5 ／ FK 18 - 13。",
    "Jリーグ公式スタッツ：走行距離 東京V 124.5km - 福岡 118.7km ／ スプリント 163 - 111。",
    "監督：東京V 相馬 直樹 ／ 福岡 塚原 真也。VAR：清水 勇人 ／ AVAR：梅田 智起。",
    "開始時フォーメーション：東京V 4-4-2 ／ 福岡 3-4-2-1（Jリーグ公式 フォーメーション「前半0分」）。",
  ], focusPoints: [], strategies: [],
  officialRecord: { kickoff: "15:03", attendance: 12327, weather: "雨", temperature: "17.0℃", humidity: "90%", referee: "山下 良美", assistantReferees: ["塩津 祐介", "大川 直也"], fourthOfficial: "中澤 涼", sourceUrl },
  goals: [
    { minute: "10'", scorer: "熊取谷 一星", team: "東京ヴェルディ" },
    { minute: "56'", scorer: "ウェリック ポポ", team: "アビスパ福岡", assist: "北島 祐二" },
    { minute: "74'", scorer: "松橋 優安", team: "東京ヴェルディ", assist: "一美 和成" },
    { minute: "90'", scorer: "寺沼 星文", team: "東京ヴェルディ", assist: "溝口 修平" },
  ],
  cards: [
    { minute: "41'", player: "椎橋 慧也", team: "アビスパ福岡", type: "yellow" },
    { minute: "46'", player: "師岡 柊生", team: "アビスパ福岡", type: "yellow" },
    { minute: "68'", player: "宮 大樹", team: "アビスパ福岡", type: "yellow" },
  ],
  substitutions: [
    { minute: "46'", team: "アビスパ福岡", playerOut: "椎橋 慧也", playerIn: "ウェリック ポポ" },
    { minute: "49'", team: "東京ヴェルディ", playerOut: "林 尚輝", playerIn: "佐古 真礼" },
    { minute: "61'", team: "アビスパ福岡", playerOut: "橋本 悠", playerIn: "湯澤 聖人" },
    { minute: "67'", team: "東京ヴェルディ", playerOut: "熊取谷 一星", playerIn: "松橋 優安" },
    { minute: "67'", team: "東京ヴェルディ", playerOut: "齋藤 功佑", playerIn: "森田 晃樹" },
    { minute: "76'", team: "アビスパ福岡", playerOut: "宮 大樹", playerIn: "辻岡 佑真" },
    { minute: "76'", team: "アビスパ福岡", playerOut: "北島 祐二", playerIn: "武本 匠平" },
    { minute: "86'", team: "アビスパ福岡", playerOut: "重見 柾斗", playerIn: "秋野 央樹" },
    { minute: "88'", team: "東京ヴェルディ", playerOut: "一美 和成", playerIn: "寺沼 星文" },
    { minute: "88'", team: "東京ヴェルディ", playerOut: "新井 悠太", playerIn: "山田 剛綺" },
  ],
  actualLineups: {
    home: { formation: "4-4-2", formationBasis: "観戦時の配置（Jリーグ公式 フォーメーション「前半0分」と一致）", pitchOrder: ["1 マテウス", "18 溝口 修平", "96 チョ ユミン", "4 林 尚輝", "22 内田 陽介", "40 新井 悠太", "16 平川 怜", "8 齋藤 功佑", "19 藤本 寛也", "25 熊取谷 一星", "33 一美 和成"], starters: { GK: ["1 マテウス"], DF: ["22 内田 陽介", "4 林 尚輝", "96 チョ ユミン", "18 溝口 修平"], MF: ["19 藤本 寛也", "8 齋藤 功佑", "16 平川 怜", "40 新井 悠太"], FW: ["25 熊取谷 一星", "33 一美 和成"] }, bench: { GK: ["21 長沢 祐弥"], DF: ["15 鈴木 海音", "29 佐古 真礼"], MF: ["2 柴戸 海", "7 松橋 優安", "10 森田 晃樹"], FW: ["13 山田 剛綺", "38 神田 奏真", "45 寺沼 星文"] } },
    away: { formation: "3-4-2-1", formationBasis: "観戦時の配置（Jリーグ公式「前半0分」では見木が中盤中央、重見がシャドー）", pitchOrder: ["24 小畑 裕馬", "38 宮 大樹", "37 田代 雅也", "16 岡 哲平", "29 前嶋 洋太", "6 重見 柾斗", "34 椎橋 慧也", "47 橋本 悠", "11 見木 友哉", "25 北島 祐二", "13 師岡 柊生"], starters: { GK: ["24 小畑 裕馬"], DF: ["16 岡 哲平", "37 田代 雅也", "38 宮 大樹"], MF: ["47 橋本 悠", "34 椎橋 慧也", "6 重見 柾斗", "29 前嶋 洋太"], FW: ["25 北島 祐二", "13 師岡 柊生", "11 見木 友哉"] }, bench: { GK: ["1 永石 拓海"], DF: ["5 上島 拓巳", "15 辻岡 佑真", "2 湯澤 聖人"], MF: ["17 秋野 央樹"], FW: ["52 武本 匠平", "14 名古 新太郎", "49 前田 一翔", "9 ウェリック ポポ"] } },
  },
};
