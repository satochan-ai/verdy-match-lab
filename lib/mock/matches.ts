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
    status: "finished",
    homeScore: 1,
    awayScore: 3,
    timeSegment: null,
    fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第2節" },
    /**
     * 公式試合記録（https://www.jleague.jp/match/j1/2026/081401/、Phase 6-I.4確認）で
     * 再確認。中川敦瑛の警告時刻は公式記録上「59'」（後半14分）が正しく、旧データの
     * 「65'」は誤りだったため修正した。
     */
    officialRecord: {
      kickoff: "19:00",
      attendance: 44690,
      weather: "晴れ",
      temperature: "27.4℃",
      humidity: "90%",
      sourceUrl: "https://www.jleague.jp/match/j1/2026/081401/",
    },
    /**
     * 公式結果（https://www.verdy.co.jp/match/info/2026081401/result）で確認できた
     * 得点・アシストのみを記録。11分の遠藤アシストはユーザー確認情報でも公式結果でも
     * 未確認のため空欄のまま（推測で埋めない）。
     */
    goals: [
      { minute: "2'", scorer: "林 尚輝", team: "東京V", assist: "食野 壮磨" },
      { minute: "11'", scorer: "遠藤 渓太", team: "柏" },
      { minute: "65'", scorer: "瀬川 祐輔", team: "柏", assist: "渡井 理己" },
      { minute: "82'", scorer: "久保 藤次郎", team: "柏", assist: "渡井 理己" },
    ],
    cards: [
      { minute: "59'", player: "中川 敦瑛", team: "柏", type: "yellow" },
      { minute: "88'", player: "鈴木 海音", team: "東京V", type: "yellow" },
      { minute: "90+6'", player: "渡井 理己", team: "柏", type: "yellow" },
    ],
    substitutions: [
      { minute: "55'", team: "東京V", playerIn: "新井 悠太", playerOut: "松橋 優安" },
      { minute: "55'", team: "東京V", playerIn: "熊取谷 一星", playerOut: "平川 怜" },
      { minute: "56'", team: "柏", playerIn: "瀬川 祐輔", playerOut: "垣田 裕暉" },
      { minute: "56'", team: "柏", playerIn: "渡井 理己", playerOut: "山内 日向汰" },
      { minute: "73'", team: "東京V", playerIn: "仲山 獅恩", playerOut: "食野 壮磨" },
      { minute: "73'", team: "東京V", playerIn: "神田 奏真", playerOut: "福田 湧矢" },
      { minute: "79'", team: "東京V", playerIn: "白井 亮丞", playerOut: "内田 陽介" },
      { minute: "79'", team: "柏", playerIn: "仲間 隼斗", playerOut: "小泉 佳穂" },
      { minute: "79'", team: "柏", playerIn: "弓場 堅真", playerOut: "遠藤 渓太" },
      { minute: "84'", team: "柏", playerIn: "馬場 晴也", playerOut: "久保 藤次郎" },
    ],
    matchStats: {
      home: {
        shots: 11,
        shotsOnTarget: 4,
        possession: "38%",
        passSuccessRate: "84%",
        distance: "121.5km",
        sprints: 88,
        offsides: 0,
        corners: 3,
        freeKicks: 9,
        yellowCards: 1,
        redCards: 0,
      },
      away: {
        shots: 16,
        shotsOnTarget: 6,
        possession: "62%",
        passSuccessRate: "89%",
        distance: "120.3km",
        sprints: 82,
        offsides: 0,
        corners: 5,
        freeKicks: 10,
        yellowCards: 2,
        redCards: 0,
      },
    },
    actualLineups: {
      home: {
        formation: "3-4-2-1",
        starters: {
          GK: ["1 マテウス"],
          DF: ["6 宮原 和也", "4 林 尚輝", "15 鈴木 海音"],
          MF: ["18 溝口 修平", "20 食野 壮磨", "16 平川 怜", "22 内田 陽介"],
          FW: ["14 福田 湧矢", "7 松橋 優安", "9 染野 唯月"],
        },
        bench: {
          GK: ["21 長沢 祐弥"],
          DF: ["5 井上 竜太", "36 松田 陸"],
          MF: ["24 仲山 獅恩", "28 山本 丈偉", "40 新井 悠太"],
          FW: ["25 熊取谷 一星", "27 白井 亮丞", "38 神田 奏真"],
        },
      },
      /**
       * actual formationの左右配置は、既存predictedLineups.away（このファイル内で維持）が
       * 使用している並び順をベースに、公式Starting XI（同一11名）を当てはめる
       * （Phase 6-I.4追加指示）。predictedLineups自体は変更しない。
       * 旧データはDF4名/FW2名という誤ったbucket分割（3-4-2-1はDF3/FW3が正）になっており、
       * OFFICIAL LINEUPのpitch表示で守備の一角が中盤列に混入する不具合があったため、
       * 併せて3/4/3の正しい分割に修正した。
       */
      away: {
        formation: "3-4-2-1",
        starters: {
          GK: ["25 小島 亨介"],
          DF: ["26 杉岡 大暉", "4 古賀 太陽", "42 原田 亘"],
          MF: ["5 遠藤 渓太", "39 中川 敦瑛", "27 熊坂 光希", "24 久保 藤次郎"],
          FW: ["87 山内 日向汰", "8 小泉 佳穂", "18 垣田 裕暉"],
        },
        bench: {
          GK: ["29 永井 堅梧"],
          DF: ["88 馬場 晴也", "2 三丸 拡"],
          MF: ["40 原川 力", "44 弓場 堅真", "11 渡井 理己", "19 仲間 隼斗", "20 瀬川 祐輔"],
          FW: ["9 細谷 真大"],
        },
      },
    },
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
        result: "partial",
        resultComment:
          "左サイドから前進する場面は作れたものの、柏の右WB背後を継続的な決定機につなげるところまでは至らなかった。狙いは見えたが、試合を動かすほどの優位にはできなかった。",
      },
      {
        orderNo: 2,
        title: "2シャドーを前向きにさせない",
        description:
          "柏の小泉・山内への縦パスを制限し、2シャドーと垣田を分断。中央から前進させないことを狙う。",
        result: "miss",
        resultComment:
          "柏の中央での前進を十分に制限できず、前線と中盤のつながりを切ることができなかった。後半にも追加点を許し、守備面で狙った試合展開には持ち込めなかった。",
      },
      {
        orderNo: 3,
        title: "中盤2枚で主導権を握る",
        description:
          "平川・食野が中央で前向きにボールを動かし、内田・溝口を高い位置へ押し上げる。",
        result: "miss",
        resultComment:
          "平川・食野を中心に試合の主導権を握り続ける形にはできなかった。先制後に柏へ流れを渡し、後半も試合をコントロールできないまま2失点。狙ったゲーム展開には持ち込めなかった。",
      },
    ],
  },
  {
    // 次戦。PRE_MATCH分析（Phase 6-A-1〜6-A-6）と公式発表で確認できた事実のみを反映。
    // predictedLineupsは予想として維持し、actualLineupsとは独立して扱う。
    id: "match-7",
    homeTeam: opponent("fagiano-okayama", "ファジアーノ岡山"),
    awayTeam: verdy,
    isVerdyHome: false,
    kickoffAt: "2026-08-22T18:30:00+09:00",
    venue: "ＪＦＥ晴れの国スタジアム",
    status: "finished",
    homeScore: 0,
    awayScore: 0,
    timeSegment: null,
    fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第3節" },
    officialRecord: {
      kickoff: "18:33",
      attendance: 14426,
      weather: "晴れ",
      temperature: "31.7℃",
      humidity: "63%",
      sourceUrl: "https://www.jleague.jp/match/j1/2026/082202/",
    },
    cards: [
      { minute: "42'", player: "井上 竜太", team: "東京V", type: "yellow" },
      { minute: "56'", player: "溝口 修平", team: "東京V", type: "yellow" },
      { minute: "66'", player: "大森 博", team: "岡山", type: "yellow" },
    ],
    substitutions: [
      { minute: "56'", team: "東京V", playerIn: "松橋 優安", playerOut: "山本 丈偉" },
      { minute: "66'", team: "東京V", playerIn: "山田 剛綺", playerOut: "平尾 勇人" },
      { minute: "66'", team: "東京V", playerIn: "熊取谷 一星", playerOut: "福田 湧矢" },
      { minute: "86'", team: "東京V", playerIn: "白井 亮丞", playerOut: "染野 唯月" },
      { minute: "86'", team: "東京V", playerIn: "鈴木 海音", playerOut: "宮原 和也" },
      { minute: "61'", team: "岡山", playerIn: "ブラウン ノア 賢信", playerOut: "山根 永遠" },
      { minute: "65'", team: "岡山", playerIn: "レオ ガウショ", playerOut: "ルカオ" },
      { minute: "78'", team: "岡山", playerIn: "神谷 優太", playerOut: "江坂 任" },
      { minute: "78'", team: "岡山", playerIn: "一美 和成", playerOut: "ナ サンホ" },
      { minute: "86'", team: "岡山", playerIn: "森 壮一朗", playerOut: "白井 康介" },
    ],
    matchStats: {
      home: {
        shots: 14,
        shotsOnTarget: 3,
        possession: "56%",
        passSuccessRate: "75%",
        distance: "111.1km",
        sprints: 129,
        offsides: 2,
        corners: 6,
        freeKicks: 16,
        yellowCards: 1,
        redCards: 0,
      },
      away: {
        shots: 5,
        shotsOnTarget: 0,
        possession: "44%",
        passSuccessRate: "72%",
        distance: "111.5km",
        sprints: 157,
        offsides: 1,
        corners: 1,
        freeKicks: 12,
        yellowCards: 2,
        redCards: 0,
      },
    },
    verdyProfile: {
      formation: "3-4-2-1",
      characteristics: {
        attack:
          "柏戦は2分に先制したものの、その後は柏にペースを渡す展開に。ロングスローや食野壮磨を経由した崩しは機能した一方、前を向いた形でのフィニッシュは限定的だった。",
        defense:
          "柏戦はマンツーマン気味の対応から中盤でズレが生じ、相手の2シャドーを前向きにさせる場面が続いた。受け渡しの整理が課題として残る。",
      },
      keyPlayers: [],
      recentTrend: "直近は8/9川崎戦1-1、8/14柏戦1-3。柏戦は先制しながら逆転負け。",
    },
    opponentProfile: {
      formation: "3-4-2-1",
      characteristics: {
        attack:
          "前線へ早くボールを届け、ルカオへのロングボールとポストプレーを起点に攻める形が中心。江坂任・ナサンホの2シャドーがライン間で前を向けるかが崩しの鍵。WBも高い位置を取る傾向があり、縦への速さが持ち味。",
        defense:
          "3バックがハイラインを保ち、WBも高い位置を取ったまま2シャドーとルカオでプレスをかける形が基本という情報がある（一部情報源のみ・詳細未確認）。前に重心をかける分、WB裏や中盤脇にスペースが生まれる可能性がある。",
      },
      keyPlayers: [
        {
          name: "99 ルカオ",
          note: "1トップ。ポストプレー、ロングボールの収まり、裏抜け、セカンドボールの起点に注目。",
        },
        {
          name: "8 江坂 任",
          note: "シャドー。ライン間で前向きに受ける位置、ラストパス、ルカオとの距離感に注目。",
        },
        {
          name: "10 ナ サンホ",
          note: "シャドー。スピードを生かした裏への動き、1対1、ゴール前への侵入に注目。",
        },
        {
          name: "41 宮本 英治",
          note: "ボランチ。セカンドボール回収、前線への縦パス、攻撃参加のタイミングに注目。8/15長崎戦ではルカオの決勝点をアシスト。",
        },
      ],
      recentTrend: "直近は8/8Ｃ大阪戦1-2で敗戦、8/15長崎戦1-0で勝利（決勝点はルカオ、アシスト宮本英治）。",
    },
    predictedLineups: {
      home: {
        formation: "3-4-2-1",
        starters: [
          { number: 1, name: "レナート モーザー", position: "GK" },
          { number: 6, name: "大森 博", position: "DF" },
          { number: 43, name: "鈴木 喜丈", position: "DF" },
          { number: 48, name: "立田 悠悟", position: "DF" },
          { number: 51, name: "白井 康介", position: "MF" },
          { number: 41, name: "宮本 英治", position: "MF" },
          { number: 80, name: "オベルダン", position: "MF" },
          { number: 88, name: "山根 永遠", position: "MF" },
          { number: 8, name: "江坂 任", position: "FW" },
          { number: 10, name: "ナ サンホ", position: "FW" },
          { number: 99, name: "ルカオ", position: "FW" },
        ],
      },
      away: {
        formation: "3-4-2-1",
        starters: [
          { number: 1, name: "マテウス", position: "GK" },
          { number: 6, name: "宮原 和也", position: "DF" },
          { number: 4, name: "林 尚輝", position: "DF" },
          { number: 15, name: "鈴木 海音", position: "DF" },
          { number: 18, name: "溝口 修平", position: "MF" },
          { number: 20, name: "食野 壮磨", position: "MF" },
          {
            number: 16,
            name: "平川 怜",
            position: "MF",
            alternative: "熊取谷 一星（8/14柏戦で途中交代。コンディション次第）",
          },
          { number: 22, name: "内田 陽介", position: "MF" },
          {
            number: 7,
            name: "松橋 優安",
            position: "FW",
            alternative: "新井 悠太（8/14柏戦で途中交代。コンディション次第）",
          },
          { number: 14, name: "福田 湧矢", position: "FW" },
          { number: 9, name: "染野 唯月", position: "FW" },
        ],
      },
    },
    actualLineups: {
      home: {
        formation: "3-4-2-1",
        starters: {
          GK: ["1 レナート モーザー"],
          DF: ["6 大森 博", "48 立田 悠悟", "43 鈴木 喜丈"],
          MF: ["88 山根 永遠", "80 オベルダン", "41 宮本 英治", "51 白井 康介"],
          FW: ["10 ナ サンホ", "8 江坂 任", "99 ルカオ"],
        },
        bench: {
          GK: ["13 松田 駿"],
          DF: ["18 田上 大地", "44 森 壮一朗"],
          MF: ["26 本山 遥", "33 神谷 優太", "66 西川 潤", "79 ブラウン ノア 賢信"],
          FW: ["9 レオ ガウショ", "22 一美 和成"],
        },
      },
      away: {
        formation: "3-4-2-1",
        starters: {
          GK: ["1 マテウス"],
          DF: ["5 井上 竜太", "4 林 尚輝", "6 宮原 和也"],
          MF: ["18 溝口 修平", "16 平川 怜", "28 山本 丈偉", "22 内田 陽介"],
          FW: ["14 福田 湧矢", "71 平尾 勇人", "9 染野 唯月"],
        },
        bench: {
          GK: ["21 長沢 祐弥"],
          DF: ["15 鈴木 海音"],
          MF: ["7 松橋 優安", "20 食野 壮磨", "40 新井 悠太"],
          FW: ["13 山田 剛綺", "25 熊取谷 一星", "27 白井 亮丞", "38 神田 奏真"],
        },
      },
    },
    availability: {
      likelyUnavailable: [
        { team: "岡山", players: ["小倉 幸成"] },
        { team: "東京V", players: ["山見 大登", "吉田 泰授", "森田 晃樹", "田邉 秀斗"] },
      ],
      suspensionNote: "8/16時点で確認できる出場停止情報なし（鈴木海音は8/14柏戦で警告1枚、出場停止には該当しない）。",
      ineligibleNote: "なし",
    },
    matchNotes: [
      "2026/8/22 J1第3節、ファジアーノ岡山 0-0 東京ヴェルディで試合終了。",
      "予想スタメンは8/15長崎戦（岡山）・8/14柏戦（東京V）のStarting XIを基準にした編集部予想。確定Starting XIではない。",
      "8/16時点・欠場濃厚：岡山＝小倉幸成（左膝外側半月板断裂、術後全治約6ヶ月）／東京V＝森田晃樹（左鎖骨骨折、全治6〜10週、7/23発表）、田邉秀斗（左膝内側側副靱帯損傷、全治6〜10週、7/23発表）、吉田泰授（左膝複合靭帯損傷・半月板損傷）、山見大登（左膝前十字靭帯損傷）。",
      "8/16時点・出場可否は要確認：岡山＝木村太哉（左足内果疲労骨折。6月発表時点で全治2〜3ヶ月、復帰の公式発表なし）／東京V＝平川怜（8/14柏戦で筋肉系トラブルにより途中交代。監督は重篤ではない旨をコメント）、松橋優安（8/14柏戦で足がつり途中交代。負傷発表なし）。",
      "岡山3CB・WB・2シャドーの左右配置は情報源からは確定できておらず、断定していない。",
    ],
    focusPoints: [
      "柏戦で崩れた2シャドー対応をどう修正するか",
      "ルカオへの供給経路をどう制限するか",
      "岡山WBが前に出た背後を東京Vが使えるか",
    ],
    strategies: [
      {
        orderNo: 1,
        title: "ルカオを止めるな、供給源を止めろ",
        description:
          "ルカオ本人を潰しにいくのではなく、3CBと中盤で彼への縦パス・ロングボールの経路を消す。岡山の3CB・ボランチからルカオへ縦パスが入る場面で、東京Vがコースを限定できているかに注目したい。",
        result: "pending",
      },
      {
        orderNo: 2,
        title: "2シャドーはゾーンで受け渡す",
        description:
          "江坂任・ナサンホをマンツーマンで追わず、受け渡しのルールで前向きにさせない。ライン間に降りてきた際、東京Vの対応と受け渡しがスムーズかに注目したい。",
        result: "pending",
      },
      {
        orderNo: 3,
        title: "WB裏とボランチ脇を最速で突く",
        description:
          "岡山のWBが高い位置を取ることで生まれる背後のスペースと、中盤脇を素早く使う。東京VのWB・シャドーが岡山のWB裏やボランチ脇へ飛び出すタイミングに注目したい。",
        result: "pending",
      },
    ],
  },
  {
    // 天皇杯2回戦PRE。8/25時点の公開情報（JFA公式試合ページの登録メンバー表・
    // ザスパ群馬公式/Jリーグ公式の直近成績・沖田優監督の発言記事等）を基準にした
    // 編集部予想。JFA公式試合ページは8/25時点で「試合前」ステータスであり、
    // 両チームともスタメン発表はまだ行われていない（確認済み）。
    id: "match-8",
    homeTeam: verdy,
    awayTeam: opponent("thespakusatsu-gunma", "ザスパ群馬"),
    isVerdyHome: true,
    kickoffAt: "2026-08-26T18:30:00+09:00",
    venue: "味の素フィールド西が丘",
    status: "finished",
    homeScore: 4,
    awayScore: 1,
    timeSegment: null,
    fixtureMeta: { competition: "天皇杯 JFA 第106回全日本サッカー選手権大会", roundLabel: "2回戦" },
    verdyProfile: {
      formation: "3-4-2-1",
      characteristics: {
        attack:
          "8/22岡山戦はシュート14本・保持率56%と主導権を握ったが無得点。今回は大幅ターンオーバーの中、3バックと溝口修平を経由した前進から、CF起用が予想される寺沼星文へ収める形が軸になる見込み。",
        defense:
          "岡山戦はルカオへの供給経路を管理して無失点。今回は前がかりに来るザスパの中盤・前線をどう管理するかが焦点になる。",
      },
      keyPlayers: [
        {
          name: "45 寺沼 星文",
          note: "大幅ターンオーバーの中でCF起用が予想される。最前線の起点・フィニッシュの両方に関与できるかに注目したい。",
        },
        {
          name: "18 溝口 修平",
          note: "ビルドアップとセットプレーの起点。ザスパの前プレスに対し前を向いて配球できるかが、試合の主導権を左右する。",
        },
      ],
      recentTrend:
        "直近公式戦は8/22岡山戦0-0のドロー（J1第3節）。天皇杯は8/22岡山戦から中3日、さらに中3日で8/29鹿島戦を控える3連戦の中日にあたる。",
    },
    opponentProfile: {
      formation: "3-4-3",
      characteristics: {
        attack:
          "沖田優監督（2025年就任）は「失点を恐れず得点を増やす」超攻撃的スタイルを掲げ、ボール保持と主導権を志向。天皇杯1回戦（8/19）は出間思努の2得点と、途中出場の中島大嘉の決勝点で東北学院大学に3-1で勝利し2回戦進出。",
        defense:
          "2025シーズンはリーグ下位クラスの失点数だったという情報がある（要確認）。前がかりの姿勢の裏返しとして、背後のスペース管理に課題を抱える可能性がある。なお、Football LABの記録ではJ3リーグ公式戦（2試合）は3-4-2-1を使用しているが、天皇杯1回戦の実際のスタメンは3バック+4枚+3トップ（3-4-3）の並びだった（自己確認）。大会によってシステムを変えている可能性があり、今回どちらで来るかは未確定。",
      },
      keyPlayers: [
        {
          name: "69 出間 思努",
          note: "天皇杯1回戦で2得点。持ち場を離れて絡んでくる動きに注目したい。",
        },
        {
          name: "99 中島 大嘉",
          note: "期限付き移籍から完全移籍を勝ち取った主力FW。1回戦は途中出場から決勝点を記録。今回は先発の可能性もある。",
        },
      ],
      recentTrend:
        "J3リーグは直近3連敗（8/8鹿児島戦0-1、8/15相模原戦1-4、8/22滋賀戦2-3）。天皇杯1回戦は8/19東北学院大学に3-1で勝利し2回戦（本カード）進出。",
    },
    predictedLineups: {
      home: {
        formation: "3-4-2-1",
        starters: [
          { number: 21, name: "長沢 祐弥", position: "GK" },
          { number: 36, name: "松田 陸", position: "DF" },
          { number: 5, name: "井上 竜太", position: "DF" },
          { number: 15, name: "鈴木 海音", position: "DF" },
          { number: 18, name: "溝口 修平", position: "MF" },
          { number: 20, name: "食野 壮磨", position: "MF" },
          { number: 28, name: "山本 丈偉", position: "MF" },
          {
            number: 40,
            name: "新井 悠太",
            position: "MF",
            alternative: "松橋 優安（右WB対抗。新井が左へ回る形も想定）",
          },
          { number: 38, name: "神田 奏真", position: "FW" },
          {
            number: 13,
            name: "山田 剛綺",
            position: "FW",
            alternative: "白井 亮丞（右シャドー対抗）",
          },
          { number: 45, name: "寺沼 星文", position: "FW" },
        ],
      },
      away: {
        formation: "3-4-3",
        starters: [
          { number: 78, name: "岡田 慎司", position: "GK" },
          { number: 23, name: "シルヴァン デランド", position: "DF" },
          { number: 30, name: "小柳 達司", position: "DF" },
          { number: 22, name: "貫 真郷", position: "DF" },
          { number: 4, name: "玉城 大志", position: "MF" },
          { number: 21, name: "池下 由也", position: "MF" },
          { number: 14, name: "櫻井 文陽", position: "MF" },
          { number: 69, name: "出間 思努", position: "MF" },
          { number: 42, name: "原田 高虎", position: "FW" },
          { number: 77, name: "小竹 知恩", position: "FW" },
          {
            number: 99,
            name: "中島 大嘉",
            position: "FW",
            alternative: "18 田中 翔太（1回戦先発。中島は途中出場で決勝点）",
          },
        ],
      },
    },
    availability: {
      likelyUnavailable: [
        { team: "東京V", players: ["田邉秀斗", "吉田泰授", "山見大登"] },
      ],
      suspensionNote: "8/25時点で確認できる出場停止情報なし。",
      ineligibleNote: "なし",
    },
    goals: [
      { minute: "24'", scorer: "神田 奏真", team: "東京V" },
      { minute: "65'", scorer: "出間 思努", team: "群馬" },
      { minute: "70'", scorer: "白井 亮丞（PK）", team: "東京V" },
      { minute: "89'", scorer: "熊取谷 一星（PK）", team: "東京V" },
      { minute: "90'", scorer: "川村 楽人", team: "東京V" },
    ],
    substitutions: [
      { minute: "45'", team: "東京V", playerIn: "新井 悠太", playerOut: "松橋 優安" },
      { minute: "45'", team: "東京V", playerIn: "柴戸 海", playerOut: "森田 晃樹" },
      { minute: "52'", team: "群馬", playerIn: "山原 康太郎", playerOut: "中村 涼" },
      { minute: "52'", team: "群馬", playerIn: "中島 大嘉", playerOut: "百田 真登" },
      { minute: "67'", team: "群馬", playerIn: "小竹 知恩", playerOut: "貫 真郷" },
      { minute: "72'", team: "東京V", playerIn: "熊取谷 一星", playerOut: "仲山 獅恩" },
      { minute: "77'", team: "群馬", playerIn: "瀬畠 義成", playerOut: "池下 由也" },
      { minute: "77'", team: "群馬", playerIn: "風間 宏希", playerOut: "原田 高虎" },
      { minute: "80'", team: "東京V", playerIn: "山田 剛綺", playerOut: "神田 奏真" },
      { minute: "88'", team: "東京V", playerIn: "川村 楽人", playerOut: "白井 亮丞" },
      { minute: "89'", team: "群馬", playerIn: "青木 翔大", playerOut: "玉城 大志" },
      { minute: "90+1'", team: "東京V", playerIn: "山本 丈偉", playerOut: "食野 壮磨" },
    ],
    actualLineups: {
      home: {
        formation: "3-4-2-1",
        starters: {
          GK: ["21 長沢 祐弥"],
          DF: ["36 松田 陸", "29 佐古 真礼", "15 鈴木 海音"],
          MF: ["18 溝口 修平", "10 森田 晃樹（C）", "20 食野 壮磨", "7 松橋 優安"],
          FW: ["24 仲山 獅恩", "27 白井 亮丞", "38 神田 奏真"],
        },
        bench: {
          GK: ["31 馬渡 洋樹"],
          DF: ["5 井上 竜太"],
          MF: ["2 柴戸 海", "28 山本 丈偉", "30 川村 楽人", "40 新井 悠太", "42 今井 健人"],
          FW: ["13 山田 剛綺", "25 熊取谷 一星"],
        },
      },
      // ザスパ群馬は公式メンバー表でStarting XI・ベンチ・Captain・監督まで確認済み。
      // ただしformation・3バック等の左右配置・pitch座標はこの資料からは確定できないため、
      // formationキー自体を設定しない（推測で座標を割り当てない）。
      away: {
        starters: {
          GK: ["88 キム ジェヒ"],
          DF: ["2 中村 涼", "30 小柳 達司", "25 中野 力瑠"],
          MF: ["21 池下 由也", "4 玉城 大志（C）", "42 原田 高虎", "69 出間 思努"],
          FW: ["22 貫 真郷", "17 百田 真登", "18 田中 翔太"],
        },
        bench: {
          GK: ["13 近藤 壱成"],
          DF: ["16 山原 康太郎"],
          MF: ["15 風間 宏希", "37 瀬畠 義成", "44 古賀 竣", "97 ソン ミンソッ"],
          FW: ["9 青木 翔大", "77 小竹 知恩", "99 中島 大嘉"],
        },
      },
    },
    matchNotes: [
      "神田奏真の先制点で前半を1-0で折り返すと、後半20分に出間思努のゴールで追いつかれたが、後半25分に白井亮丞のPK、後半44分に熊取谷一星のPK、後半45分に川村楽人のゴールで突き放し、4-1で天皇杯3回戦進出を決めた。",
      "東京V監督は城福浩、ザスパ群馬監督は沖田優（いずれも公式メンバー表で確認）。",
      "長期離脱と発表されていた森田晃樹は、天皇杯ザスパ群馬戦で公式Starting XIに復帰。10番・キャプテンとして先発し、後半開始のHTで柴戸海と交代した。復帰時期・経緯等の公式発表内容は未確認のため、Starting XI入り・キャプテン就任・HT交代という事実のみ反映する。",
      "Phase 6-L.2の予想スタメン11人中、公式Starting XI入りしたのは6人（長沢祐弥・松田陸・鈴木海音・溝口修平・食野壮磨・神田奏真）。",
      "予想スタメン・フォーメーションは8/25時点の公開情報を基準にした編集部予想。確定Starting XIではない。",
      "8/25時点、JFA公式試合ページ（https://www.jfa.jp/match/emperorscup_2026/match_page/m28.html）はスタメン発表前で、両チームの登録メンバー（東京V40名・ザスパ39名）のみが確認できる状態だった。",
      "東京Vの天皇杯登録メンバー40名のうち、8/22岡山戦の先発11人中10人が名を連ねている。平尾勇人（71）は日本大学在学中のため天皇杯登録メンバー外であり、今回の予想Starting XIには含めない（負傷やコンディション不良によるものではない）。",
      "8/16時点で長期離脱と発表済み：田邉秀斗（左膝内側側副靱帯損傷、全治6〜10週、7/23発表）、吉田泰授（左膝複合靭帯損傷・半月板損傷）、山見大登（左膝前十字靭帯損傷）。8/25時点で復帰に関する新たな公式発表は確認できない。",
      "ザスパ群馬はJ3で直近3連敗中だが、天皇杯1回戦は東北学院大学に3-1で勝利。沖田優監督（2025年就任）は大木武（甲府）・ミハイロ ペトロヴィッチ（札幌）・ペップ グアルディオラからの影響を公言し、「失点を恐れず得点を増やす」超攻撃的スタイルを掲げている（上毛新聞インタビュー等で確認）。",
    ],
    focusPoints: [
      "出間思努・中島大嘉というザスパの2枚看板を早い段階で管理できるか",
      "ザスパの前プレスに対し、3バック＋溝口修平の配球で前進できるか",
      "中3日連戦の中でメンバーを入れ替えても強度を落とさず戦えるか",
    ],
    strategies: [
      {
        orderNo: 1,
        title: "出間思努と中島大嘉の対角を消す",
        description:
          "天皇杯1回戦で2得点した出間思努の飛び出しと、途中出場から決勝点を挙げた中島大嘉への裏へのボールを、3バックとボランチでどれだけ早い段階で管理できるかに注目したい。",
        result: "miss",
        resultComment: "出間に後半20分の同点弾を許し、狙いを完全には遂行できなかった。中島大嘉は後半7分から途中出場。",
      },
      {
        orderNo: 2,
        title: "3バック＋溝口の配球でザスパの前プレスを外す",
        description:
          "沖田監督のザスパは「失点を恐れず主導権を握る」姿勢で前から来る可能性が高い。3バックと溝口修平の立ち位置でボールを動かし、ザスパのプレスを外して前進できるかに注目したい。",
        result: "partial",
        resultComment:
          "4-1で勝利したものの、ビルドアップや前プレス回避の成否を裏付ける公式スタッツが未確認のため、結果のみで○とはせず△とする。",
      },
      {
        orderNo: 3,
        title: "ターンオーバーでも運動量を落とさない",
        description:
          "岡山戦・鹿島戦に挟まれた中3日連戦の中日として、複数ポジションでメンバーを入れ替える見込み。入れ替わった選手たちが強度を落とさず90分（あるいは延長）を戦い切れるかに注目したい。",
        result: "hit",
        resultComment: "メンバーを大きく入れ替えながら、終盤まで強度を維持。89分、90分にも得点して試合を決めた。",
      },
    ],
  },
  {
    // 第4節・鹿島戦。lib/mock/schedule.tsのsched-kashima（既存source of truth）と同一fixture。
    // Phase 6-M.1：PRE_MATCH予想Starting XIを追加。公式Starting XIは未発表のため、
    // actualLineups等の正式試合記録フィールドには一切入れない（predictedLineupsのみ）。
    id: "match-9",
    homeTeam: verdy,
    awayTeam: opponent("kashima-antlers", "鹿島アントラーズ"),
    isVerdyHome: true,
    kickoffAt: "2026-08-29T19:00:00+09:00",
    venue: "味の素スタジアム",
    status: "scheduled",
    homeScore: null,
    awayScore: null,
    timeSegment: null,
    fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第4節" },
    verdyProfile: {
      formation: "3-4-2-1",
      characteristics: {
        attack:
          "3-4-2-1を基準に、2シャドー（福田湧矢・熊取谷一星）とCF染野唯月の関係で鹿島CBの背後・SB脇を突く形を観戦の出発点とする。",
        defense:
          "鹿島から期限付き移籍中の溝口修平が契約上出場不可のため、左WB新井悠太・左CB宮原和也・左CM森田晃樹の連係が守備の整理点になる。",
      },
      keyPlayers: [
        {
          name: "9 染野唯月",
          note: "鹿島のCBラインを押し下げ、2シャドーが使うスペースを作れるかが焦点。",
        },
        {
          name: "10 森田晃樹",
          note: "8/26天皇杯ザスパ群馬戦で実戦復帰（先発・キャプテン・前半45分出場）。リーグ戦復帰後初戦になる可能性があり、左CMからの配球・ゲームコントロールに注目。完治や90分出場可否、鹿島戦の先発は公式未確認のため断定しない。",
        },
      ],
      recentTrend:
        "直近公式戦は8/26天皇杯2回戦・ザスパ群馬戦で4-1勝利（大幅ターンオーバー実施）。リーグ戦としては8/22第3節・ファジアーノ岡山戦が直近で0-0のドロー。",
    },
    opponentProfile: {
      formation: "4-4-2",
      characteristics: {
        attack:
          "4-4-2を基準に、FWレオ・セアラ／40番鈴木優磨の2トップへ縦パスを入れる形とサイドからのクロスを観戦の出発点とする。",
        defense:
          "右SB安西幸輝が7月に左膝前十字靭帯損傷で長期離脱中（7/21鹿島公式発表）のため、守備ラインの構成がどう変わるかが整理点になる。",
      },
      keyPlayers: [
        {
          name: "40 鈴木優磨",
          note: "鹿島の中心的な2トップの一角。中央でどれだけ自由に収められるかが試合の入り方を左右する。",
        },
        {
          name: "9 レオ・セアラ",
          note: "鈴木優磨とのコンビでフィニッシュに関わる予想。東京V3バックとの空中戦・裏抜けの攻防に注目。",
        },
      ],
      recentTrend:
        "直近の公式戦は4-4-2を基本布陣とし、早川友基・小川諒也・関川郁万・植田直通・広瀬陸斗を守備の軸とする形が続いているというユーザー確認情報を基準にする。",
    },
    predictedLineups: {
      home: {
        formation: "3-4-2-1",
        starters: [
          { number: 1, name: "マテウス", position: "GK" },
          { number: 6, name: "宮原 和也", position: "DF" },
          { number: 4, name: "林 尚輝", position: "DF" },
          {
            number: 15,
            name: "鈴木 海音",
            position: "DF",
            alternative: "宮原が右CBへ回り、5 井上 竜太が左CBに入る形も候補",
          },
          { number: 40, name: "新井 悠太", position: "MF" },
          { number: 10, name: "森田 晃樹", position: "MF" },
          { number: 16, name: "平川 怜", position: "MF" },
          { number: 22, name: "内田 陽介", position: "MF" },
          { number: 14, name: "福田 湧矢", position: "FW" },
          { number: 25, name: "熊取谷 一星", position: "FW" },
          { number: 9, name: "染野 唯月", position: "FW" },
        ],
      },
      away: {
        formation: "4-4-2",
        starters: [
          { number: 1, name: "早川 友基", position: "GK" },
          { number: 7, name: "小川 諒也", position: "DF" },
          { number: 5, name: "関川 郁万", position: "DF" },
          { number: 55, name: "植田 直通", position: "DF" },
          { number: 37, name: "広瀬 陸斗", position: "DF" },
          { number: 30, name: "吉田 湊海", position: "MF" },
          { number: 8, name: "マテウス・ブエノ", position: "MF" },
          { number: 10, name: "柴崎 岳", position: "MF" },
          { number: 27, name: "松村 優太", position: "MF" },
          { number: 9, name: "レオ・セアラ", position: "FW" },
          { number: 40, name: "鈴木 優磨", position: "FW" },
        ],
      },
    },
    availability: {
      likelyUnavailable: [
        { team: "東京V", players: ["田邉秀斗", "吉田泰授", "山見大登"] },
        { team: "鹿島", players: ["ヤン・マテウス", "安西幸輝"] },
      ],
      suspensionNote: "8/28時点で確認できる出場停止情報なし。",
      ineligibleNote:
        "溝口修平（鹿島アントラーズからの期限付き移籍中のため、移籍元である鹿島との公式戦には出場できない契約条件）。",
    },
    matchNotes: [
      "天皇杯ザスパ群馬戦（8/26、4-1）から中2日で迎えるリーグ戦第4節。東京Vは天皇杯で大幅にメンバーを入れ替えながら4-1で勝利しており、鹿島戦ではリーグ戦の主力を戻すことが予想される。一方、鹿島から期限付き移籍中の溝口修平は移籍元契約により出場不可。天皇杯で実戦復帰した森田晃樹をどこまで起用するかも焦点となる。",
      "鹿島は右SB安西幸輝が7月に左膝前十字靭帯損傷で長期離脱中（7/21鹿島公式発表）。FWヤン・マテウスも今節は欠場予定（欠場理由は未確認）。",
      "東京Vの3バックは鈴木海音・林尚輝・宮原和也を第一予想とする。宮原を右CBへ回し、左CBに井上竜太を置く形も候補として考えられる。",
      "予想スタメン・フォーメーションは8/28時点の公開情報を基準にした編集部予想。確定Starting XIではない。",
    ],
    focusPoints: [
      "溝口不在の左サイド：新井悠太・宮原和也・森田晃樹の連係で鹿島の右サイド攻撃にどう対応するか",
      "森田晃樹（左CM）と平川怜（右CM）の中盤コンビネーション",
      "福田湧矢・熊取谷一星の2シャドーとCF染野唯月の距離感、鹿島CB背後・SB脇への侵入",
      "鹿島の2トップ（レオ・セアラ、鈴木優磨）を東京V3バックがどう管理するか",
    ],
    strategies: [
      {
        orderNo: 1,
        title: "レオ・セアラと鈴木優磨の2トップを中央で自由にさせない",
        description:
          "3バック＋森田晃樹・平川怜で中央を管理し、2トップへの縦パス、クロス後のセカンドボール、CB前のスペースを制限できるかに注目したい。",
        result: "pending",
      },
      {
        orderNo: 2,
        title: "溝口不在の左サイドを狙われない",
        description:
          "左WB新井悠太・左CB宮原和也・左CM森田晃樹の3人の連係で、鹿島の右サイド攻撃にどう対応できるかに注目したい。",
        result: "pending",
      },
      {
        orderNo: 3,
        title: "鹿島の4-4-2の外側を動かして前進する",
        description:
          "鹿島の2トップ＋中盤4枚を正面から突破するだけでなく、3バック・新井悠太＋内田陽介・森田晃樹＋平川怜を使い、相手ブロックの脇・外側へボールを動かして前進経路を作れるかに注目したい。",
        result: "pending",
      },
    ],
  },
  {
    // 第1節。公式試合記録（https://www.jleague.jp/match/j1/2026/080901/）で確認できた
    // 事実のみを反映。当時PRE_MATCH分析・predictedLineupsを作成していなかったため、
    // 後から予想を捏造して追加しない（verdyProfile/opponentProfileは情報準備中のまま維持）。
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
    fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第1節" },
    officialRecord: {
      kickoff: "18:00",
      attendance: 27452,
      weather: "晴れ",
      temperature: "30℃",
      humidity: "69%",
      sourceUrl: "https://www.jleague.jp/match/j1/2026/080901/",
    },
    goals: [
      { minute: "46'", scorer: "溝口 修平", team: "東京V" },
      { minute: "90+6'", scorer: "ラザル ロマニッチ", team: "川崎F" },
    ],
    cards: [{ minute: "68'", player: "伊藤 達哉", team: "川崎F", type: "yellow" }],
    substitutions: [
      { minute: "61'", team: "川崎F", playerIn: "マルシーニョ", playerOut: "紺野 和也" },
      { minute: "61'", team: "川崎F", playerIn: "ラザル ロマニッチ", playerOut: "持山 匡佑" },
      { minute: "63'", team: "東京V", playerIn: "仲山 獅恩", playerOut: "松橋 優安" },
      { minute: "63'", team: "東京V", playerIn: "井上 竜太", playerOut: "鈴木 海音" },
      { minute: "73'", team: "東京V", playerIn: "熊取谷 一星", playerOut: "食野 壮磨" },
      { minute: "75'", team: "川崎F", playerIn: "大関 友翔", playerOut: "橘田 健人" },
      { minute: "75'", team: "川崎F", playerIn: "佐々木 旭", playerOut: "三浦 颯太" },
      { minute: "80'", team: "東京V", playerIn: "白井 亮丞", playerOut: "溝口 修平" },
      { minute: "80'", team: "東京V", playerIn: "新井 悠太", playerOut: "福田 湧矢" },
      { minute: "86'", team: "川崎F", playerIn: "宮城 天", playerOut: "山本 悠樹" },
    ],
    matchStats: {
      home: {
        shots: 14,
        shotsOnTarget: 4,
        possession: "34%",
        passSuccessRate: "72%",
        distance: "117.6km",
        sprints: 116,
        offsides: 1,
        corners: 4,
        freeKicks: 10,
        yellowCards: 0,
        redCards: 0,
      },
      away: {
        shots: 15,
        shotsOnTarget: 4,
        possession: "66%",
        passSuccessRate: "84%",
        distance: "111.9km",
        sprints: 108,
        offsides: 2,
        corners: 4,
        freeKicks: 15,
        yellowCards: 1,
        redCards: 0,
      },
    },
    /**
     * actual formation配置はユーザーが試合映像／公式表示から確認した配置を正として登録
     * （Phase 6-I.4追加指示）。OfficialLineups→FormationPitchはGK/DF/MF/FWの配列を
     * formationRows（3-4-2-1: [3,4,2,1] / 4-2-3-1: [4,2,3,1]）で単純にスライスして
     * 行分割するため、各配列内の並び順＝ピッチ上の行・左右位置に直結する。
     * 3-4-2-1のFW配列は「先頭2名＝シャドー、最後の1名＝アペックス（1トップ）」、
     * 4-2-3-1のMF配列は「先頭2名＝アンカー、続く3名＝2列目」としてスライスされる。
     */
    actualLineups: {
      home: {
        formation: "3-4-2-1",
        starters: {
          GK: ["1 マテウス"],
          DF: ["6 宮原 和也", "4 林 尚輝", "15 鈴木 海音"],
          MF: ["18 溝口 修平", "20 食野 壮磨", "16 平川 怜", "22 内田 陽介"],
          FW: ["14 福田 湧矢", "7 松橋 優安", "9 染野 唯月"],
        },
        bench: {
          GK: ["21 長沢 祐弥"],
          DF: ["5 井上 竜太", "29 佐古 真礼"],
          MF: ["24 仲山 獅恩", "28 山本 丈偉", "40 新井 悠太"],
          FW: ["25 熊取谷 一星", "27 白井 亮丞", "45 寺沼 星文"],
        },
      },
      away: {
        formation: "4-2-3-1",
        starters: {
          GK: ["49 スベンド ブローダーセン"],
          DF: ["13 三浦 颯太", "4 ペドロ ホマーノ", "3 谷口 栄斗", "29 山原 怜音"],
          MF: ["6 山本 悠樹", "8 橘田 健人", "17 伊藤 達哉", "14 脇坂 泰斗", "18 紺野 和也"],
          FW: ["20 持山 匡佑"],
        },
        bench: {
          GK: ["1 山口 瑠伊"],
          DF: ["5 佐々木 旭", "22 フィリップ ウレモヴィッチ"],
          MF: ["16 大関 友翔", "19 河原 創", "34 長 璃喜"],
          FW: ["9 ラザル ロマニッチ", "23 マルシーニョ", "24 宮城 天"],
        },
      },
    },
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
