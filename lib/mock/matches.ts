import type { Match } from "@/types/domain";

const verdy = { id: "verdy", name: "東京ヴェルディ", isVerdy: true };

function opponent(id: string, name: string) {
  return { id, name, isVerdy: false };
}

export const matches: Match[] = [
  {
    id: "match-1",
    homeTeam: verdy,
    awayTeam: opponent("east-tokyo", "FC EAST TOKYO"),
    isVerdyHome: true,
    kickoffAt: "2026-08-15T18:00:00+09:00",
    venue: "味の素スタジアム",
    status: "scheduled",
    homeScore: null,
    awayScore: null,
    timeSegment: null,
    verdyProfile: {
      formation: "4-3-3",
      characteristics: {
        attack: "サイドを起点にテンポよくボールを動かす攻撃が持ち味。",
        defense: "前線からの規律あるプレスで相手のビルドアップを制限する。",
      },
      keyPlayers: [
        { name: "10 山内 蓮", note: "中盤でゲームを組み立てるキーマン。" },
        { name: "9 大道寺 陸", note: "決定力の高いストライカー。" },
      ],
      recentTrend: "直近5試合で3勝1分1敗、後半の得点が多い傾向。",
    },
    opponentProfile: {
      formation: "4-4-2",
      characteristics: {
        attack: "縦への速さを活かしたカウンターが武器。",
        defense: "組織的な4バックだが、サイド裏のスペース管理に課題。",
      },
      keyPlayers: [{ name: "7 北条 蒼", note: "スピードのあるウイング。" }],
      recentTrend: "アウェイでは守備的に試合を運ぶ傾向がある。",
    },
    predictedLineups: {
      home: {
        formation: "4-3-3",
        starters: [
          { number: 1, name: "藤城 智哉", position: "GK" },
          { number: 2, name: "水野 直樹", position: "DF" },
          { number: 4, name: "黒田 壮真", position: "DF" },
          { number: 5, name: "相馬 健吾", position: "DF" },
          { number: 23, name: "浅井 颯太", position: "DF" },
          { number: 6, name: "西川 拓海", position: "MF" },
          { number: 8, name: "小野寺 遼", position: "MF" },
          { number: 10, name: "山内 蓮", position: "MF" },
          { number: 7, name: "神谷 蒼生", position: "FW" },
          { number: 9, name: "大道寺 陸", position: "FW" },
          { number: 11, name: "橘 祐真", position: "FW" },
        ],
      },
      away: {
        formation: "4-4-2",
        starters: [
          { number: 21, name: "桐谷 航", position: "GK" },
          { number: 3, name: "新田 圭介", position: "DF" },
          { number: 4, name: "森岡 大地", position: "DF" },
          { number: 15, name: "宇野 晴紀", position: "DF" },
          { number: 22, name: "早川 玲央", position: "DF" },
          { number: 6, name: "松永 俊", position: "MF" },
          { number: 8, name: "若林 瑛太", position: "MF" },
          { number: 10, name: "城戸 湊", position: "MF" },
          { number: 7, name: "北条 蒼", position: "MF" },
          { number: 9, name: "江藤 樹", position: "FW" },
          { number: 18, name: "長瀬 悠人", position: "FW" },
        ],
      },
    },
    matchNotes: [
      "相手は右サイドバック裏のスペースを狙われる場面が多い。",
      "前節はハイプレスに苦戦し、後半失速した。",
    ],
    focusPoints: [
      "ヴェルディの左サイド攻撃と相手右サイドの守備の噛み合わせ",
      "試合終盤の運動量の差",
    ],
    strategies: [
      {
        orderNo: 1,
        title: "相手右サイド裏を狙う",
        description:
          "相手の右サイドバックは背後のスペース管理に課題があり、ヴェルディの左サイドの推進力が活きる。",
        result: "pending",
      },
      {
        orderNo: 2,
        title: "中盤で数的優位を作る",
        description:
          "相手の4-4-2に対し中盤で数的優位を作り、ボール保持の時間を伸ばしたい。",
        result: "pending",
      },
      {
        orderNo: 3,
        title: "終盤の運動量に注意",
        description:
          "相手はアウェイで守備的に試合を運ぶ傾向があり、終盤の押し込みへの耐性を見極めたい。",
        result: "pending",
      },
    ],
  },
  {
    id: "match-2",
    homeTeam: verdy,
    awayTeam: opponent("yokohama-blue", "YOKOHAMA BLUE FC"),
    isVerdyHome: true,
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

export function getMatchById(id: string): Match | undefined {
  return matches.find((m) => m.id === id);
}

export function getNextMatch(): Match {
  return matches.find((m) => m.status === "scheduled") ?? matches[0];
}

export function getRecentFinishedMatch(): Match {
  return matches.find((m) => m.status === "finished")!;
}

export function getArchiveMatches(): Match[] {
  return matches.filter((m) => m.status === "finished");
}
