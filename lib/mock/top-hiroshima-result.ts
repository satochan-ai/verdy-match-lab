import type { Match } from "@/types/domain";

export const hiroshimaReview = [
  "東京ヴェルディは10月11日、味の素スタジアムでサンフレッチェ広島と対戦し、0-2で敗れた。",
  "相馬直樹新監督の初陣となった一戦。前半は両チーム無得点で折り返したが、後半47分に松本泰志、58分に鈴木章斗の得点を許した。",
  "東京Vは最後まで得点を奪えず、0-2で試合終了となった。",
  "試合前に注目していたフォーメーションや選手起用については、公式記録を確認したうえで別途分析する。",
];
const emptyProfile = { formation: "開始時未確認", characteristics: { attack: "未分析", defense: "未分析" }, keyPlayers: [], recentTrend: "未分析" };
/** クラブ・Jリーグ公式照合済み。開始時配置はユーザー確認済みJリーグ公式「前半0分」画像に基づく。 */
export const hiroshimaResult: Match = {
  id: "sched-hiroshima", homeTeam: { id: "verdy", name: "東京ヴェルディ", isVerdy: true },
  awayTeam: { id: "sanfrecce-hiroshima", name: "サンフレッチェ広島", isVerdy: false }, isVerdyHome: true,
  kickoffAt: "2026-10-11T15:03:00+09:00", venue: "味の素スタジアム", status: "finished", homeScore: 0, awayScore: 2, timeSegment: null,
  fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第9節" }, verdyProfile: emptyProfile, opponentProfile: emptyProfile,
  matchNotes: ["東京V LOSS ／ 前半 0-0 ／ 後半 0-2", "監督：東京V 相馬 直樹 ／ 広島 バルトシュ ガウル", "VAR：清水 勇人 ／ AVAR：中川 愛斗", "開始時フォーメーション：東京V 4-4-2 ／ 広島 3-4-2-1（Jリーグ公式・前半0分画像）。"], focusPoints: [], strategies: [],
  officialRecord: { kickoff: "15:03", attendance: 18233, weather: "晴", temperature: "26.4℃", humidity: "32%", referee: "笠原 寛貴", assistantReferees: ["武部 陽介", "若宮 健治"], fourthOfficial: "先立 圭吾", sourceUrl: "https://www.jleague.jp/match/j1/2026/101103/" },
  goals: [{ minute: "47'", scorer: "松本 泰志", team: "サンフレッチェ広島" }, { minute: "58'", scorer: "鈴木 章斗", team: "サンフレッチェ広島" }],
  cards: [{ minute: "14'", player: "キム ヒョンウ", team: "東京ヴェルディ", type: "yellow" }, { minute: "17'", player: "キム ジュソン", team: "サンフレッチェ広島", type: "yellow" }, { minute: "40'", player: "鈴木 海音", team: "東京ヴェルディ", type: "yellow" }, { minute: "55'", player: "染野 唯月", team: "東京ヴェルディ", type: "yellow" }],
  substitutions: [
    { minute: "HT", team: "サンフレッチェ広島", playerOut: "キム ジュソン", playerIn: "東 俊希" },
    { minute: "HT", team: "サンフレッチェ広島", playerOut: "中島 洋太朗", playerIn: "松本 泰志" },
    { minute: "HT", team: "サンフレッチェ広島", playerOut: "加藤 陸次樹", playerIn: "セバスティアン アレー" },
    { minute: "57'", team: "東京ヴェルディ", playerOut: "キム ヒョンウ", playerIn: "一美 和成" },
    { minute: "67'", team: "サンフレッチェ広島", playerOut: "菅 大輝", playerIn: "前田 直輝" },
    { minute: "70'", team: "東京ヴェルディ", playerOut: "福田 湧矢", playerIn: "溝口 修平" },
    { minute: "70'", team: "東京ヴェルディ", playerOut: "藤本 寛也", playerIn: "熊取谷 一星" },
    { minute: "81'", team: "サンフレッチェ広島", playerOut: "鮎川 峻", playerIn: "浅野 拓磨" },
    { minute: "85'", team: "東京ヴェルディ", playerOut: "一美 和成", playerIn: "山田 剛綺" },
    { minute: "85'", team: "東京ヴェルディ", playerOut: "柴戸 海", playerIn: "仲山 獅恩" },
  ],
  actualLineups: {
    home: { formation: "4-4-2", starters: { GK: ["1 マテウス"], DF: ["40 新井 悠太", "29 佐古 真礼", "4 林 尚輝", "15 鈴木 海音"], MF: ["14 福田 湧矢", "8 齋藤 功佑", "2 柴戸 海", "19 藤本 寛也"], FW: ["9 染野 唯月", "17 キム ヒョンウ"] }, bench: { GK: ["21 長沢 祐弥"], DF: ["5 井上 竜太", "18 溝口 修平", "22 内田 陽介"], MF: ["16 平川 怜", "24 仲山 獅恩"], FW: ["13 山田 剛綺", "25 熊取谷 一星", "33 一美 和成"] } },
    away: { formation: "3-4-2-1", starters: { GK: ["1 大迫 敬介"], DF: ["37 キム ジュソン", "4 荒木 隼人", "15 中野 就斗"], MF: ["18 菅 大輝", "6 川辺 駿", "35 中島 洋太朗", "5 新井 直人"], FW: ["10 鈴木 章斗", "11 加藤 陸次樹", "23 鮎川 峻"] }, bench: { GK: ["99 大内 一生"], DF: [], MF: ["7 東 俊希", "14 松本 泰志", "32 越道 草太", "45 小林 志紋", "46 野口 蓮斗"], FW: ["22 セバスティアン アレー", "29 浅野 拓磨", "41 前田 直輝"] } },
  },
};
