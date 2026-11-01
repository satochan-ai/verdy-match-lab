import type { Match } from "@/types/domain";

/** 2026-11-01照合。SH/CK/FKはData Site公式記録。配置は公式サイト「前半0分」。
 * 枠内SH・支配率・パス成功率・走行距離・スプリント・オフサイドは公式サイトの試合終了スタッツ。
 * 公式サイトのシュート16-13とData Siteの9-11には差があり、公式記録9-11を採用。
 * 交代は公式記録の表記を維持（46'は後半開始、45+10'等は前半ATを省略しない）。
 */
const sourceUrl = "https://data.j-league.or.jp/SFMS02/?match_card_id=34641";
const profile = { formation: "公式開始時配置を参照", characteristics: { attack: "映像未確認のため未評価", defense: "映像未確認のため未評価" }, keyPlayers: [], recentTrend: "公式結果を参照" };
export const nagasakiResult: Match = {
  id: "sched-nagasaki",
  homeTeam: { id: "v-varen-nagasaki", name: "V・ファーレン長崎", isVerdy: false },
  awayTeam: { id: "verdy", name: "東京ヴェルディ", isVerdy: true },
  isVerdyHome: false, kickoffAt: "2026-11-01T14:03:00+09:00",
  venue: "PEACE STADIUM Connected by SoftBank", status: "finished", homeScore: 1, awayScore: 2, timeSegment: null,
  fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第13節" },
  verdyProfile: profile, opponentProfile: profile,
  matchNotes: [
    "長崎 1-2 東京ヴェルディ（前半 0-1、後半 1-1）。福岡戦に続き今季初のリーグ2連勝。",
    "得点：45+12' 染野 唯月（東京V）、76' チアゴ サンタナ（長崎）、81' 一美 和成（東京V）。",
    "81分は熊取谷のスルーパスから溝口のクロスを一美が決めた（Jリーグ公式速報）。",
    "東京Vは45+10分に齋藤 功佑→森田 晃樹の脳振盪交代。公式記録に相手チーム交代枠+1の記載。症状・診断の詳細は未確認。",
    "長崎の警告：15' 米田 隼也、90+3' 鍋島 暖歩。東京Vの警告0、両チーム退場0。",
    "シュートは公式記録を採用：長崎9-11東京V。公式サイトの試合終了スタッツは16-13で差がある。CK5-4、FK17-11、オフサイド2-0。",
    "相馬監督就任後のリーグ戦：広島0-2、FC東京0-4、横浜FM2-2、福岡3-1、長崎2-1。5試合2勝1分2敗。",
  ],
  focusPoints: [], strategies: [],
  officialRecord: { kickoff: "14:03", attendance: 20246, weather: "晴", temperature: "22.7℃", humidity: "56%", referee: "飯田 淳平", assistantReferees: ["坂本 晋悟", "植田 文平"], fourthOfficial: "津野 洋平", sourceUrl },
  goals: [
    { minute: "45+12'", scorer: "染野 唯月", team: "東京ヴェルディ", assist: "藤本 寛也" },
    { minute: "76'", scorer: "チアゴ サンタナ", team: "V・ファーレン長崎", assist: "岩崎 悠人" },
    { minute: "81'", scorer: "一美 和成", team: "東京ヴェルディ", assist: "溝口 修平" },
  ],
  cards: [
    { minute: "15'", player: "米田 隼也", team: "V・ファーレン長崎", type: "yellow" },
    { minute: "90+3'", player: "鍋島 暖歩", team: "V・ファーレン長崎", type: "yellow" },
  ],
  substitutions: [
    { minute: "45+10'", team: "東京ヴェルディ", playerOut: "齋藤 功佑", playerIn: "森田 晃樹" },
    { minute: "46'", team: "V・ファーレン長崎", playerOut: "進藤 亮佑", playerIn: "増山 朝陽" },
    { minute: "46'", team: "V・ファーレン長崎", playerOut: "ジョナタン ジュニオール", playerIn: "保田 堅心" },
    { minute: "66'", team: "V・ファーレン長崎", playerOut: "エメルソン", playerIn: "チアゴ サンタナ" },
    { minute: "66'", team: "V・ファーレン長崎", playerOut: "米田 隼也", playerIn: "岩崎 悠人" },
    { minute: "72'", team: "東京ヴェルディ", playerOut: "藤本 寛也", playerIn: "松橋 優安" },
    { minute: "72'", team: "東京ヴェルディ", playerOut: "染野 唯月", playerIn: "熊取谷 一星" },
    { minute: "83'", team: "V・ファーレン長崎", playerOut: "山口 蛍", playerIn: "鍋島 暖歩" },
    { minute: "83'", team: "東京ヴェルディ", playerOut: "チョ ユミン", playerIn: "佐古 真礼" },
    { minute: "83'", team: "東京ヴェルディ", playerOut: "一美 和成", playerIn: "寺沼 星文" },
    { minute: "90+5'", team: "東京ヴェルディ", playerOut: "新井 悠太", playerIn: "山田 剛綺" },
  ],
  actualLineups: {
    home: {
      formation: "3-4-2-1", formationBasis: "Jリーグ公式 フォーメーション「前半0分」。攻撃方向を上にそろえ、各ラインは左→右。登録ポジションとは別。",
      pitchOrder: ["1 後藤 雅明", "6 江川 湧清", "31 土肥 幹太", "50 進藤 亮佑", "23 米田 隼也", "41 長谷川 元希", "5 山口 蛍", "22 翁長 聖", "16 エメルソン", "10 マテウス ジェズス", "99 ジョナタン ジュニオール"],
      starters: { GK: ["1 後藤 雅明"], DF: ["6 江川 湧清", "23 米田 隼也", "31 土肥 幹太", "50 進藤 亮佑"], MF: ["5 山口 蛍", "10 マテウス ジェズス", "16 エメルソン", "22 翁長 聖", "41 長谷川 元希"], FW: ["99 ジョナタン ジュニオール"] },
      bench: { GK: ["13 波多野 豪"], DF: [], MF: ["7 保田 堅心", "8 岩崎 悠人", "21 ディエゴ ピトゥカ", "34 松本 天夢", "44 鍋島 暖歩", "88 増山 朝陽"], FW: ["9 チアゴ サンタナ", "18 山﨑 凌吾"] },
    },
    away: {
      formation: "4-4-2", formationBasis: "Jリーグ公式 フォーメーション「前半0分」。攻撃方向を上にそろえ、各ラインは左→右。登録ポジションとは別。",
      pitchOrder: ["1 マテウス", "18 溝口 修平", "96 チョ ユミン", "4 林 尚輝", "22 内田 陽介", "40 新井 悠太", "16 平川 怜", "8 齋藤 功佑", "19 藤本 寛也", "9 染野 唯月", "33 一美 和成"],
      starters: { GK: ["1 マテウス"], DF: ["22 内田 陽介", "4 林 尚輝", "96 チョ ユミン", "18 溝口 修平"], MF: ["19 藤本 寛也", "8 齋藤 功佑", "16 平川 怜", "40 新井 悠太"], FW: ["33 一美 和成", "9 染野 唯月"] },
      bench: { GK: ["21 長沢 祐弥"], DF: ["15 鈴木 海音", "29 佐古 真礼"], MF: ["2 柴戸 海", "7 松橋 優安", "10 森田 晃樹"], FW: ["13 山田 剛綺", "25 熊取谷 一星", "45 寺沼 星文"] },
    },
  },
  matchStats: {
    home: { shots: 9, shotsOnTarget: 2, possession: "50%", passSuccessRate: "75%", distance: "113.1km", sprints: 108, offsides: 2, corners: 5, freeKicks: 17, yellowCards: 2, redCards: 0 },
    away: { shots: 11, shotsOnTarget: 3, possession: "50%", passSuccessRate: "78%", distance: "118.8km", sprints: 111, offsides: 0, corners: 4, freeKicks: 11, yellowCards: 0, redCards: 0 },
  },
};
