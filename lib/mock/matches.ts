import type { Match } from "@/types/domain";

const verdy = { id: "verdy", name: "東京ヴェルディ", isVerdy: true };

function opponent(id: string, name: string) {
  return { id, name, isVerdy: false };
}

export const matches: Match[] = [
  {
    id: "match-1",
    homeTeam: verdy,
    awayTeam: opponent("kashiwa-reysol", "柏レイソル"),
    isVerdyHome: true,
    kickoffAt: "2026-08-14T19:00:00+09:00",
    venue: "ＭＵＦＧスタジアム（国立競技場）",
    status: "scheduled",
    homeScore: null,
    awayScore: null,
    timeSegment: null,
    verdyProfile: {
      formation: "3-4-2-1",
      characteristics: {
        attack: "3-4-2-1を基準に、両ワイドと2シャドーが前線へ関わる形を観戦の出発点とする。",
        defense: "両ワイドの帰陣を含めた5バック化と、中盤の距離感が守備の整理点になる。",
      },
      keyPlayers: [
        { name: "9 染野 唯月", note: "最前線で起点とフィニッシュに関わる予想。" },
        { name: "溝口 修平", note: "前節得点者。中盤から前進とフィニッシュへの関与が期待される予想。" },
      ],
      recentTrend: "直近公式戦は8月9日の川崎フロンターレ戦で1-1。3-4-2-1を使用したというユーザー確認情報を基準にする。",
    },
    opponentProfile: {
      formation: "3-4-2-1",
      characteristics: {
        attack: "3-4-2-1を基準に、2シャドーと最前線への配球が観戦上の焦点になる。",
        defense: "3CB脇と両ワイドの背後を、ミラー配置の中でどう管理するかに注目したい。",
      },
      keyPlayers: [
        { name: "4 古賀 太陽", note: "最終ラインの組み立てと守備の基準点になる予想。" },
        { name: "垣田", note: "最前線でフィニッシュに関わる予想。" },
      ],
      recentTrend: "直近公式戦は8月8日の水戸ホーリーホック戦で2-1。3-4-2-1を使用したというユーザー確認情報を基準にする。",
    },
    predictedLineups: {
      home: {
        formation: "3-4-2-1",
        starters: [
          { number: 1, name: "マテウス", position: "GK" },
          { number: 6, name: "宮原 和也", position: "DF" },
          { number: 4, name: "林 尚輝", position: "DF" },
          { number: 15, name: "鈴木 海音", position: "DF" },
          { number: 18, name: "溝口 修平", position: "MF" },
          { number: 20, name: "食野 壮磨", position: "MF" },
          { number: 16, name: "平川 怜", position: "MF" },
          { number: 22, name: "内田 陽介", position: "MF" },
          { number: 14, name: "福田 湧矢", position: "FW" },
          { number: 7, name: "松橋 優安", position: "FW" },
          { number: 9, name: "染野 唯月", position: "FW" },
        ],
      },
      away: {
        formation: "3-4-2-1",
        starters: [
          { number: 25, name: "小島 亨介", position: "GK" },
          { number: 26, name: "杉岡 大暉", position: "DF" },
          { number: 4, name: "古賀 太陽", position: "DF" },
          { number: 42, name: "原田 亘", position: "DF" },
          { number: 5, name: "遠藤 渓太", position: "MF" },
          { number: 39, name: "中川 敦瑛", position: "MF" },
          { number: 27, name: "熊坂 光希", position: "MF" },
          { number: 24, name: "久保 藤次郎", position: "MF" },
          { number: 87, name: "山内 日向汰", position: "FW" },
          { number: 8, name: "小泉 佳穂", position: "FW" },
          { number: 18, name: "垣田 裕暉", position: "FW" },
        ],
      },
    },
    availability: {
      likelyUnavailable: [
        { team: "東京V", players: ["森田晃樹", "田邉秀斗", "吉田泰授", "山見大登"] },
        { team: "柏", players: ["大久保智明", "山田雄士", "渡井理己", "手塚康平"] },
      ],
      suspensionNote: "なし",
      ineligibleNote: "なし",
    },
    previousMatch: {
      label: "第1節",
      opponent: "東京ヴェルディ vs 川崎フロンターレ",
      score: "1-1",
      goals: [
        { minute: "46'", scorer: "溝口 修平", team: "東京V" },
        { minute: "90+6'", scorer: "ラザル ロマニッチ", team: "川崎" },
      ],
      starters: {
        GK: ["マテウス"],
        DF: ["鈴木 海音", "林 尚輝", "宮原 和也"],
        MF: ["内田 陽介", "食野 壮磨", "平川 怜", "溝口 修平"],
        FW: ["松橋 優安", "福田 湧矢", "染野 唯月"],
      },
      bench: {
        GK: ["長沢 祐弥"],
        DF: ["井上 竜太", "佐古 真礼"],
        MF: ["仲山 獅恩", "山本 丈偉", "新井 悠太"],
        FW: ["熊取谷 一星", "白井 亮丞", "寺沼 星文"],
      },
    },
    matchNotes: [
      "予想スタメン・formationは8月11日時点の公開情報を基準にした編集部予想。",
      "直近公式戦：東京Vは8/9川崎F戦1-1、柏は8/8水戸戦2-1（ユーザー確認情報）。",
      "8/11時点・欠場濃厚：東京V＝森田晃樹、田邉秀斗、吉田泰授、山見大登／柏＝大久保智明。",
    ],
    focusPoints: [
      "宮原・溝口・福田を軸にした左サイドからの前進",
      "柏の2シャドーと垣田を分断する守備の管理",
    ],
    strategies: [
      {
        orderNo: 1,
        title: "左サイドからWB裏を攻略",
        description:
          "宮原・溝口・福田の関係で柏の右WB背後を狙う。福田が内側、溝口が幅を取る形から前進し、染野までボールを届ける。",
        result: "pending",
      },
      {
        orderNo: 2,
        title: "2シャドーを前向きにさせない",
        description:
          "柏の小泉・山内への縦パスを制限し、2シャドーと垣田を分断。中央から前進させないことを狙う。",
        result: "pending",
      },
      {
        orderNo: 3,
        title: "中盤2枚で主導権を握る",
        description:
          "平川・食野が中央で前向きにボールを動かし、内田・溝口を高い位置へ押し上げる。",
        result: "pending",
      },
    ],
  },
  {
    id: "match-0",
    homeTeam: verdy,
    awayTeam: opponent("kawasaki-frontale", "川崎フロンターレ"),
    isVerdyHome: true,
    kickoffAt: "2026-08-09T18:00:00+09:00",
    venue: "味の素スタジアム",
    status: "finished",
    homeScore: 1,
    awayScore: 1,
    timeSegment: null,
    verdyProfile: {
      formation: "情報準備中",
      characteristics: { attack: "情報準備中", defense: "情報準備中" },
      keyPlayers: [],
      recentTrend: "情報準備中",
    },
    opponentProfile: {
      formation: "情報準備中",
      characteristics: { attack: "情報準備中", defense: "情報準備中" },
      keyPlayers: [],
      recentTrend: "情報準備中",
    },
    matchNotes: [
      "46分に溝口修平、90+6分に川崎のラザル ロマニッチがそれぞれ得点し、1-1で終了。",
    ],
    focusPoints: [],
    strategies: [],
  },
  {
    id: "match-2",
    homeTeam: verdy,
    awayTeam: opponent("yokohama-blue", "YOKOHAMA BLUE FC"),
    isVerdyHome: true,
    isDemo: true,
    kickoffAt: "2026-08-08T14:00:00+09:00",
    venue: "味の素スタジアム",
    status: "live",
    homeScore: 1,
    awayScore: 1,
    timeSegment: "second_late",
    verdyProfile: {
      formation: "4-3-3",
      characteristics: {
        attack: "サイドを起点にテンポよくボールを動かす攻撃が持ち味。",
        defense: "前線からの規律あるプレスで相手のビルドアップを制限する。",
      },
      keyPlayers: [{ name: "10 山内 蓮", note: "中盤でゲームを組み立てるキーマン。" }],
      recentTrend: "直近5試合で3勝1分1敗、後半の得点が多い傾向。",
    },
    opponentProfile: {
      formation: "3-5-2",
      characteristics: {
        attack: "中央密集からのコンビネーションが持ち味。",
        defense: "3バックのため、サイドの1対1守備に不安がある。",
      },
      keyPlayers: [{ name: "11 川原 匠", note: "得点感覚に優れる2トップの一角。" }],
      recentTrend: "終盤に失点する試合が多く、体力面に課題。",
    },
    matchNotes: ["前半途中から相手が3バックへ変更し、中盤の噛み合わせが変化した。"],
    focusPoints: ["終盤の運動量勝負", "セットプレーの精度"],
    strategies: [
      {
        orderNo: 1,
        title: "相手右サイド裏を狙う",
        description: "相手の右サイドバックは背後のスペース管理に課題がある。",
        result: "pending",
      },
      {
        orderNo: 2,
        title: "中盤で数的優位を作る",
        description: "3バックの相手に対し中盤で数的優位を作りたい。",
        result: "pending",
      },
      {
        orderNo: 3,
        title: "終盤の運動量に注意",
        description: "相手は終盤に失点する試合が多く、押し込みが効きやすい。",
        result: "pending",
      },
    ],
  },
  {
    id: "match-3",
    homeTeam: opponent("chiba-united", "CHIBA UNITED"),
    awayTeam: verdy,
    isVerdyHome: false,
    isDemo: true,
    kickoffAt: "2026-08-01T15:00:00+09:00",
    venue: "フクダ電子アリーナ",
    status: "half_time",
    homeScore: 0,
    awayScore: 0,
    timeSegment: "first_late",
    verdyProfile: {
      formation: "4-3-3",
      characteristics: {
        attack: "サイドを起点にテンポよくボールを動かす攻撃が持ち味。",
        defense: "前線からの規律あるプレスで相手のビルドアップを制限する。",
      },
      keyPlayers: [{ name: "9 大道寺 陸", note: "決定力の高いストライカー。" }],
      recentTrend: "アウェイでは慎重な入りをする傾向がある。",
    },
    opponentProfile: {
      formation: "4-2-3-1",
      characteristics: {
        attack: "トップ下を経由した崩しが持ち味。",
        defense: "ボランチ2枚の守備範囲が広く安定している。",
      },
      keyPlayers: [{ name: "8 三田村 悠", note: "攻守にわたり存在感のあるボランチ。" }],
      recentTrend: "ホームでは堅い守備をベースに試合を進める。",
    },
    matchNotes: ["前半はお互い決定機が少なく、様子見の展開が続いた。"],
    focusPoints: ["後半の運動量", "サイドチェンジの精度"],
    strategies: [
      {
        orderNo: 1,
        title: "サイドチェンジでリズムを変える",
        description: "相手の守備が中央に寄る傾向があり、サイドチェンジで揺さぶりたい。",
        result: "pending",
      },
      {
        orderNo: 2,
        title: "ボランチ脇のスペースを使う",
        description: "相手ボランチが広い守備範囲を持つ分、背後のスペースが空きやすい。",
        result: "pending",
      },
      {
        orderNo: 3,
        title: "後半早い時間の入りを慎重に",
        description: "アウェイでは入りが慎重になりやすく、後半立ち上がりのミスに注意したい。",
        result: "pending",
      },
    ],
  },
  {
    id: "match-4",
    homeTeam: verdy,
    awayTeam: opponent("saitama-fc", "SAITAMA FC"),
    isVerdyHome: true,
    isDemo: true,
    kickoffAt: "2026-07-25T18:00:00+09:00",
    venue: "味の素スタジアム",
    status: "finished",
    homeScore: 2,
    awayScore: 1,
    timeSegment: null,
    verdyProfile: {
      formation: "4-3-3",
      characteristics: {
        attack: "サイドを起点にテンポよくボールを動かす攻撃が持ち味。",
        defense: "前線からの規律あるプレスで相手のビルドアップを制限する。",
      },
      keyPlayers: [{ name: "9 大道寺 陸", note: "決定力の高いストライカー。" }],
      recentTrend: "直近5試合で3勝1分1敗。",
    },
    opponentProfile: {
      formation: "4-4-2",
      characteristics: {
        attack: "セットプレーからの得点力が高い。",
        defense: "対人守備は強いが、背後のケアに課題。",
      },
      keyPlayers: [{ name: "5 東 一馬", note: "セットプレーの精度が高いCB。" }],
      recentTrend: "アウェイでは失点が増える傾向。",
    },
    matchNotes: ["相手はセットプレーからの失点が多い。"],
    focusPoints: ["セットプレーの守備", "背後のスペース管理"],
    strategies: [
      {
        orderNo: 1,
        title: "相手右サイド裏を狙う",
        description: "相手の右サイドバックは背後のスペース管理に課題がある。",
        result: "hit",
        resultComment: "前半20分、左サイドからの崩しで先制点につながった。",
      },
      {
        orderNo: 2,
        title: "セットプレーを警戒する",
        description: "相手はセットプレーからの得点力が高く、守備の集中が必要。",
        result: "partial",
        resultComment: "失点はセットプレーからだったが、それ以外はほぼ抑えられた。",
      },
      {
        orderNo: 3,
        title: "終盤の運動量で上回る",
        description: "終盤にかけて運動量で上回り、試合を優位に進めたい。",
        result: "hit",
        resultComment: "後半終盤に追加点を奪い、試合を決定づけた。",
      },
    ],
  },
  {
    id: "match-5",
    homeTeam: opponent("kanagawa-athletic", "KANAGAWA ATHLETIC"),
    awayTeam: verdy,
    isVerdyHome: false,
    isDemo: true,
    kickoffAt: "2026-07-18T19:00:00+09:00",
    venue: "三ツ沢公園球技場",
    status: "finished",
    homeScore: 0,
    awayScore: 0,
    timeSegment: null,
    verdyProfile: {
      formation: "4-3-3",
      characteristics: { attack: "サイドを起点にテンポよくボールを動かす攻撃が持ち味。", defense: "前線からの規律あるプレス。" },
      keyPlayers: [{ name: "10 山内 蓮", note: "中盤の司令塔。" }],
      recentTrend: "アウェイでは決定力を欠く試合が続いた。",
    },
    opponentProfile: {
      formation: "5-3-2",
      characteristics: { attack: "カウンター主体。", defense: "5バックで堅く守る。" },
      keyPlayers: [{ name: "3 桐生 蓮太", note: "守備の要となるCB。" }],
      recentTrend: "ホームでは守備を固める傾向。",
    },
    matchNotes: ["相手は5バックで守りを固めてくることが予想された。"],
    focusPoints: ["崩しの引き出しの多さ", "セカンドボールの回収"],
    strategies: [
      {
        orderNo: 1,
        title: "サイドを深くえぐる",
        description: "5バックの守備網を横に広げるため、サイドの深い位置を狙う。",
        result: "partial",
        resultComment: "深さは作れたが最後のクロスの質が課題として残った。",
      },
      {
        orderNo: 2,
        title: "セカンドボールを支配する",
        description: "跳ね返りの多い展開を想定し、中盤でのセカンドボール回収を徹底する。",
        result: "miss",
        resultComment: "相手のセカンドボール回収が上回り、リズムを作れなかった。",
      },
      {
        orderNo: 3,
        title: "終盤の交代カードで変化をつける",
        description: "終盤に前線の交代でリズムを変えたい。",
        result: "partial",
        resultComment: "変化は出せたが、決定機はわずかにとどまった。",
      },
    ],
  },
  {
    id: "match-6",
    homeTeam: verdy,
    awayTeam: opponent("shonan-united", "SHONAN UNITED"),
    isVerdyHome: true,
    isDemo: true,
    kickoffAt: "2026-07-11T18:00:00+09:00",
    venue: "味の素スタジアム",
    status: "finished",
    homeScore: 1,
    awayScore: 2,
    timeSegment: null,
    verdyProfile: {
      formation: "4-3-3",
      characteristics: { attack: "サイドを起点にテンポよくボールを動かす攻撃が持ち味。", defense: "前線からの規律あるプレス。" },
      keyPlayers: [{ name: "9 大道寺 陸", note: "決定力の高いストライカー。" }],
      recentTrend: "ホームでは得点力が高い一方、守備の集中力に波がある。",
    },
    opponentProfile: {
      formation: "4-3-3",
      characteristics: { attack: "個の突破力を活かした攻撃。", defense: "ハイラインを敷く積極的な守備。" },
      keyPlayers: [{ name: "17 湊 悠真", note: "突破力のあるドリブラー。" }],
      recentTrend: "アウェイでも得点力を落とさない傾向。",
    },
    matchNotes: ["相手は個の突破力が高く、1対1での対応が鍵になる。"],
    focusPoints: ["1対1での対応", "ハイラインの背後管理"],
    strategies: [
      {
        orderNo: 1,
        title: "背後のスペースを管理する",
        description: "相手のハイラインに対し、背後を突く形を作りたい。",
        result: "miss",
        resultComment: "逆に自陣の背後を突かれる形で先制を許した。",
      },
      {
        orderNo: 2,
        title: "個の突破を複数人で対応する",
        description: "相手のドリブラーに対し、1人で無理に対応しない連携を徹底する。",
        result: "partial",
        resultComment: "前半は機能したが、後半に対応が乱れる場面があった。",
      },
      {
        orderNo: 3,
        title: "早い時間での先制を狙う",
        description: "試合の主導権を握るため、早い時間帯での得点を狙う。",
        result: "miss",
        resultComment: "先に失点する展開となり、狙いとは逆の入りになった。",
      },
    ],
  },
];

// Top/Archiveなど公開一覧向け。isDemoなmatchはここでは除外するが、
// getMatchByIdはURL直接アクセスでの開発回帰確認用にmatches全体を対象のまま残す。
const publicMatches = matches.filter((m) => !m.isDemo);

export function getMatchById(id: string): Match | undefined {
  return matches.find((m) => m.id === id);
}

export function getNextMatch(): Match {
  const upcoming = publicMatches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime());
  return upcoming[0] ?? matches[0];
}

export function getRecentFinishedMatch(): Match {
  const finished = publicMatches
    .filter((m) => m.status === "finished")
    .sort((a, b) => new Date(b.kickoffAt).getTime() - new Date(a.kickoffAt).getTime());
  return finished[0] ?? matches[0];
}

export function getArchiveMatches(): Match[] {
  return publicMatches
    .filter((m) => m.status === "finished")
    .sort((a, b) => new Date(b.kickoffAt).getTime() - new Date(a.kickoffAt).getTime());
}
