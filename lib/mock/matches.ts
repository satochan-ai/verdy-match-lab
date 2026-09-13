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
    // Phase 6-M.1：PRE_MATCH予想Starting XIを追加。
    // Phase 6-M.2：公式Starting XI・benchが発表されたためactualLineupsを追加。
    // Phase 6-M.3：試合終了。公式結果（東京V 0-2 鹿島）とPOST MATCH記録を反映し、
    // status: "finished" / homeScore: 0 / awayScore: 2 へ更新。
    // predictedLineups・actualLineupsはいずれも答え合わせ用にそのまま維持し、上書き・削除しない。
    id: "match-9",
    homeTeam: verdy,
    awayTeam: opponent("kashima-antlers", "鹿島アントラーズ"),
    isVerdyHome: true,
    kickoffAt: "2026-08-29T19:00:00+09:00",
    venue: "味の素スタジアム",
    status: "finished",
    homeScore: 0,
    awayScore: 2,
    timeSegment: null,
    fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第4節" },
    officialRecord: {
      kickoff: "19:03",
      attendance: 21966,
      weather: "雨",
      temperature: "24℃",
      humidity: "90%",
      sourceUrl: "https://www.jleague.jp/match/j1/2026/082906/",
    },
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
    /**
     * Phase 6-M.2：公式発表されたStarting XI・bench。actual formation配置は
     * ユーザー確認済みのpitch配置を正として登録（match-0と同じ規約）。
     * OfficialLineups→FormationPitchはGK/DF/MF/FWの配列をformationRows
     * （3-4-2-1: [3,4,2,1] / 4-4-2: [4,4,2]）で単純にスライスして行分割するため、
     * 各配列内の並び順＝ピッチ上の行・左右位置に直結する。
     * 3-4-2-1のFW配列は「先頭2名＝シャドー（左→右）、最後の1名＝アペックス（1トップ）」。
     * キャプテン表記は公式確認が取れていないため付けない。
     */
    actualLineups: {
      home: {
        formation: "3-4-2-1",
        starters: {
          GK: ["1 マテウス"],
          DF: ["5 井上 竜太", "4 林 尚輝", "15 鈴木 海音"],
          MF: ["40 新井 悠太", "10 森田 晃樹", "16 平川 怜", "22 内田 陽介"],
          FW: ["25 熊取谷 一星", "7 松橋 優安", "9 染野 唯月"],
        },
        bench: {
          GK: ["21 長沢 祐弥"],
          DF: ["29 佐古 真礼", "36 松田 陸"],
          MF: ["2 柴戸 海", "24 仲山 獅恩", "28 山本 丈偉", "30 川村 楽人"],
          FW: ["27 白井 亮丞", "38 神田 奏真"],
        },
      },
      away: {
        formation: "4-4-2",
        starters: {
          GK: ["1 早川 友基"],
          DF: ["7 小川 諒也", "5 関川 郁万", "55 植田 直通", "37 広瀬 陸斗"],
          MF: ["17 エウベル", "8 マテウス・ブエノ", "10 柴崎 岳", "27 松村 優太"],
          FW: ["9 レオ・セアラ", "40 鈴木 優磨"],
        },
        bench: {
          GK: ["21 山田 大樹"],
          DF: ["3 キム・テヒョン", "4 千田 海人", "23 津久井 佳祐"],
          MF: ["6 三竿 健斗", "24 林 晴己", "35 元砂 晏翔仁ウデンバ"],
          FW: ["30 吉田 湊海", "77 チャヴリッチ"],
        },
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
    goals: [
      { minute: "42'", scorer: "レオ セアラ", team: "鹿島" },
      { minute: "50'", scorer: "レオ セアラ", team: "鹿島" },
    ],
    cards: [
      { player: "平川 怜", team: "東京V", type: "yellow" },
      { player: "小川 諒也", team: "鹿島", type: "yellow" },
      { player: "広瀬 陸斗", team: "鹿島", type: "yellow" },
      { player: "エウベル", team: "鹿島", type: "yellow" },
    ],
    // Jリーグ公式（試合速報）のStarting XI表内、各選手の交代アイコン・分表示から登録。
    // 同一分に複数交代が発生した場合のOUT/IN組み合わせは、公式ページ上のリスト表示順に基づく。
    substitutions: [
      { minute: "41'", team: "東京V", playerIn: "山本 丈偉", playerOut: "森田 晃樹" },
      { minute: "46'", team: "東京V", playerIn: "白井 亮丞", playerOut: "熊取谷 一星" },
      { minute: "60'", team: "東京V", playerIn: "神田 奏真", playerOut: "染野 唯月" },
      { minute: "73'", team: "東京V", playerIn: "柴戸 海", playerOut: "平川 怜" },
      { minute: "73'", team: "東京V", playerIn: "仲山 獅恩", playerOut: "松橋 優安" },
      { minute: "90+5'", team: "東京V", playerIn: "川村 楽人", playerOut: "白井 亮丞" },
      { minute: "73'", team: "鹿島", playerIn: "三竿 健斗", playerOut: "柴崎 岳" },
      { minute: "73'", team: "鹿島", playerIn: "チャヴリッチ", playerOut: "エウベル" },
      { minute: "83'", team: "鹿島", playerIn: "津久井 佳祐", playerOut: "広瀬 陸斗" },
      { minute: "83'", team: "鹿島", playerIn: "林 晴己", playerOut: "松村 優太" },
      { minute: "88'", team: "鹿島", playerIn: "元砂 晏翔仁ウデンバ", playerOut: "マテウス ブエノ" },
      { minute: "88'", team: "鹿島", playerIn: "吉田 湊海", playerOut: "鈴木 優磨" },
    ],
    matchStats: {
      home: {
        shots: 4,
        shotsOnTarget: 2,
        possession: "40%",
        passSuccessRate: "78%",
        distance: "116.4km",
        sprints: 137,
        offsides: 0,
        corners: 5,
        freeKicks: 11,
        yellowCards: 1,
        redCards: 0,
      },
      away: {
        shots: 24,
        shotsOnTarget: 6,
        possession: "60%",
        passSuccessRate: "88%",
        distance: "110.7km",
        sprints: 126,
        offsides: 1,
        corners: 4,
        freeKicks: 16,
        yellowCards: 3,
        redCards: 0,
      },
    },
    matchNotes: [
      "天皇杯ザスパ群馬戦（8/26、4-1）から中2日で迎えるリーグ戦第4節。東京Vは天皇杯で大幅にメンバーを入れ替えながら4-1で勝利しており、鹿島戦ではリーグ戦の主力を戻すことが予想される。一方、鹿島から期限付き移籍中の溝口修平は移籍元契約により出場不可。天皇杯で実戦復帰した森田晃樹をどこまで起用するかも焦点となる。",
      "鹿島は右SB安西幸輝が7月に左膝前十字靭帯損傷で長期離脱中（7/21鹿島公式発表）。FWヤン・マテウスも今節は欠場予定（欠場理由は未確認）。",
      "東京Vの3バックは鈴木海音・林尚輝・宮原和也を第一予想とする。宮原を右CBへ回し、左CBに井上竜太を置く形も候補として考えられる。",
      "予想スタメン・フォーメーションは8/28時点の公開情報を基準にした編集部予想。確定Starting XIではない。",
      "公式Starting XI発表：東京Vは予想11人中9人が的中（マテウス・鈴木海音・林尚輝・内田陽介・森田晃樹・平川怜・新井悠太・熊取谷一星・染野唯月）。予想メンバーだった宮原和也・福田湧矢に代わり、井上竜太・松橋優安が先発。鹿島は骨格を維持しつつ、予想の吉田湊海に代わりエウベルが先発。",
      "前半42分にレオ セアラのゴールで先制を許すと、後半開始5分の50分にも同じくレオ セアラに追加点を許し、0-2で敗れた。",
      "森田晃樹は前半41分に負傷交代（山本丈偉と交代）。交代理由の詳細・診断・離脱期間等の公式発表は未確認のため、負傷交代の事実のみ記載する。",
      "警告：東京V平川怜、鹿島小川諒也・広瀬陸斗・エウベル（各分はJリーグ公式試合速報未確認のため未記載）。",
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
        result: "miss",
        resultComment:
          "最重要警戒対象だったレオ セアラに42分・50分と2得点を許し、狙いを遂行できなかった。",
      },
      {
        orderNo: 2,
        title: "溝口不在の左サイドを狙われない",
        description:
          "左WB新井悠太・左CB宮原和也・左CM森田晃樹の3人の連係で、鹿島の右サイド攻撃にどう対応できるかに注目したい。",
        result: "partial",
        resultComment:
          "2失点はいずれもレオ セアラで、鹿島の右サイド（小川諒也・広瀬陸斗）発の崩れが直接の失点経路だったかはJリーグ公式のスタッツ・試合速報からは断定できない。サイド別の被シュート・クロス数等の詳細データが未確認のため、△とする。",
      },
      {
        orderNo: 3,
        title: "鹿島の4-4-2の外側を動かして前進する",
        description:
          "鹿島の2トップ＋中盤4枚を正面から突破するだけでなく、3バック・新井悠太＋内田陽介・森田晃樹＋平川怜を使い、相手ブロックの脇・外側へボールを動かして前進経路を作れるかに注目したい。",
        result: "miss",
        resultComment:
          "シュート4本（枠内2）、ボール支配率40%、パス成功率78%、アタッキングサードプレー数85回（鹿島355回）と、Jリーグ公式スタッツ上も前進・攻撃機会を作れなかったことが数字に表れており、狙いを遂行できなかった。",
      },
    ],
  },
  {
    // 第5節・神戸戦。公式試合記録（https://www.jleague.jp/match/j1/2026/090218/）で確認した
    // 試合終了記録。PRE_MATCHの予想データは答え合わせ用にそのまま保持する。
    // predictedLineups.home/awayはいずれも編集部の予想スタメン（PRE_MATCH／actualLineupsとは独立）。
    // awayは09.02時点で神戸の公式スタメン未発表のため、直近試合の4-1-2-3と起用を参考にした暫定予想。
    // 負傷・出場停止・コンディション等の欠場情報は推測で追加しない（別途最新情報でalternative等を検討）。
    id: "match-10",
    homeTeam: verdy,
    awayTeam: opponent("vissel-kobe", "ヴィッセル神戸"),
    isVerdyHome: true,
    kickoffAt: "2026-09-02T19:00:00+09:00",
    venue: "味の素スタジアム",
    status: "finished",
    homeScore: 0,
    awayScore: 2,
    timeSegment: null,
    fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第5節" },
    officialRecord: {
      kickoff: "19:00",
      attendance: 9087,
      weather: "曇り",
      temperature: "27.8℃",
      humidity: "67%",
      sourceUrl: "https://www.jleague.jp/match/j1/2026/090218/",
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
    predictedLineups: {
      home: {
        formation: "3-4-2-1",
        starters: [
          { number: 1, name: "マテウス", position: "GK" },
          { number: 15, name: "鈴木 海音", position: "DF" },
          { number: 4, name: "林 尚輝", position: "DF" },
          { number: 5, name: "井上 竜太", position: "DF" },
          { number: 18, name: "溝口 修平", position: "MF" },
          { number: 16, name: "平川 怜", position: "MF", alternative: "柴戸 海" },
          { number: 20, name: "食野 壮磨", position: "MF" },
          { number: 22, name: "内田 陽介", position: "MF" },
          { number: 7, name: "松橋 優安", position: "FW" },
          { number: 25, name: "熊取谷 一星", position: "FW" },
          { number: 38, name: "神田 奏真", position: "FW", alternative: "染野 唯月" },
        ],
      },
      away: {
        formation: "4-1-2-3",
        starters: [
          { number: 1, name: "前川 黛也", position: "GK" },
          { number: 15, name: "ジエゴ", position: "DF" },
          { number: 3, name: "マテウス トゥーレル", position: "DF" },
          { number: 4, name: "山川 哲史", position: "DF" },
          { number: 17, name: "髙橋 壱晟", position: "DF" },
          { number: 44, name: "日髙 光揮", position: "MF" },
          { number: 5, name: "郷家 友太", position: "MF" },
          { number: 7, name: "井手口 陽介", position: "MF" },
          { number: 26, name: "ジェアン パトリッキ", position: "FW" },
          { number: 29, name: "小松 蓮", position: "FW" },
          { number: 41, name: "永戸 勝也", position: "FW" },
        ],
      },
    },
    actualLineups: {
      home: {
        formation: "3-4-2-1",
        starters: {
          GK: ["1 マテウス"],
          DF: ["5 井上 竜太", "4 林 尚輝", "15 鈴木 海音"],
          MF: ["18 溝口 修平", "16 平川 怜", "20 食野 壮磨", "22 内田 陽介"],
          FW: ["14 福田 湧矢", "7 松橋 優安", "9 染野 唯月"],
        },
        bench: {
          GK: ["21 長沢 祐弥"],
          DF: ["29 佐古 真礼"],
          MF: ["2 柴戸 海", "8 齋藤 功佑", "28 山本 丈偉", "40 新井 悠太"],
          FW: ["27 白井 亮丞", "38 神田 奏真", "71 平尾 勇人"],
        },
      },
      away: {
        formation: "4-1-2-3",
        starters: {
          GK: ["71 権田 修一"],
          DF: ["15 ジエゴ", "3 マテウス トゥーレル", "4 山川 哲史", "17 髙橋 壱晟"],
          MF: ["24 酒井 高徳", "7 井手口 陽介", "5 郷家 友太"],
          FW: ["41 永戸 勝也", "29 小松 蓮", "2 飯野 七聖"],
        },
        bench: {
          GK: ["1 前川 黛也"],
          DF: ["31 岩波 拓也", "43 山田 海斗", "80 ンドカ・ボニフェイス"],
          MF: ["20 渡辺 皓太", "25 鍬先 祐弥", "44 日髙 光揮"],
          FW: ["10 大迫 勇也", "62 川端 彪英"],
        },
      },
    },
    goals: [
      { minute: "16'", scorer: "髙橋 壱晟", team: "神戸" },
      { minute: "51'", scorer: "永戸 勝也", team: "神戸" },
    ],
    cards: [
      { minute: "36'", player: "井上 竜太", team: "東京V", type: "yellow" },
      { minute: "39'", player: "福田 湧矢", team: "東京V", type: "yellow" },
      { minute: "39'", player: "食野 壮磨", team: "東京V", type: "yellow" },
      { minute: "39'", player: "郷家 友太", team: "神戸", type: "yellow" },
    ],
    substitutions: [
      { minute: "0'", team: "東京V", playerIn: "佐古 真礼", playerOut: "林 尚輝" },
      { minute: "14'", team: "東京V", playerIn: "新井 悠太", playerOut: "内田 陽介" },
      { minute: "14'", team: "東京V", playerIn: "齋藤 功佑", playerOut: "松橋 優安" },
      { minute: "31'", team: "東京V", playerIn: "神田 奏真", playerOut: "平川 怜" },
      { minute: "39'", team: "東京V", playerIn: "平尾 勇人", playerOut: "溝口 修平" },
      { minute: "0'", team: "神戸", playerIn: "日髙 光揮", playerOut: "郷家 友太" },
      { minute: "14'", team: "神戸", playerIn: "大迫 勇也", playerOut: "小松 蓮" },
      { minute: "31'", team: "神戸", playerIn: "鍬先 祐弥", playerOut: "飯野 七聖" },
      { minute: "44'", team: "神戸", playerIn: "川端 彪英", playerOut: "髙橋 壱晟" },
    ],
    matchStats: {
      home: { shots: 6, shotsOnTarget: 0, possession: "56%", passSuccessRate: "78%", distance: "117km", sprints: 132, offsides: 1, corners: 3, freeKicks: 13, fouls: 15, yellowCards: 3, redCards: 0 },
      away: { shots: 16, shotsOnTarget: 7, possession: "44%", passSuccessRate: "70%", distance: "116km", sprints: 130, offsides: 3, corners: 6, freeKicks: 10, fouls: 12, yellowCards: 1, redCards: 0 },
    },
    // 試合前の出場可否情報（PRE_MATCH）。ユーザー提供の暫定情報を反映し、欠場は「予定」扱い。
    // 負傷名・復帰時期・欠場理由等は今回持たせない（推測・web補完はしない）。
    // 神戸側3名は既存player dataに正式表記が無いため、ユーザー提供のフルネーム表記で登録する。
    availability: {
      likelyUnavailable: [
        { team: "東京V", players: ["森田 晃樹", "吉田 泰授", "山見 大登"] },
        { team: "神戸", players: ["佐々木 大樹", "扇原 貴宏", "アンデルソン・ロペス"] },
      ],
      suspensionNote: "なし",
      ineligibleNote: "なし",
    },
    // Editorial Layer（PRE_MATCH）。事実データ（predictedLineups/availability）とは別の
    // 編集部による試合前分析。matchNotes=試合前短評、focusPoints=注目ポイント、
    // strategies=軍師の三策（result: "pending"＝評価待ち）。試合後の答え合わせは別途行う。
    matchNotes: [
      "森田、吉田、山見の欠場が予想される東京Vにとって、中盤の構成力と前線へのボール供給が大きなテーマになる一戦。",
      "一方の神戸も佐々木、扇原、アンデルソン・ロペスの欠場が予想され、両チームとも通常とは異なる構成になる可能性がある。",
      "東京Vは守備に回る時間を長くするより、WBとシャドーを高い位置へ送り込み、神戸を自陣へ押し戻す時間をどれだけ作れるか。",
      "ホーム味の素スタジアムで、自分たちから試合のテンポを作れるかが勝負の分かれ目になりそうだ。",
    ],
    focusPoints: [
      "森田不在の中盤を誰が支配するか：東京Vは森田を欠く想定。平川または柴戸を中心に、神戸の郷家・井手口との中盤勝負で後手を踏まないことが重要。",
      "東京Vの両WB vs 神戸のサイド：溝口・内田が高い位置を取れるか。東京VがWBを押し上げられれば、神戸の前線を守備へ戻す時間を増やせる。",
      "神田か染野か、最前線の選択：前線で背負う役割を重視するか、動き出しとゴール前の勝負を重視するか。CFの選択によって東京Vの攻撃の形も変わる。",
    ],
    strategies: [
      {
        orderNo: 1,
        title: "神戸のアンカー周辺を外して前進する",
        description:
          "神戸は4-1-2-3を想定。中央で正面からぶつかるだけではなく、東京VはシャドーとWBを使いながら神戸のアンカー脇を攻略したい。中央に相手を引きつけてから外へ展開し、溝口・内田の前進から相手最終ラインを押し下げられるかが鍵になる。",
        result: "pending",
      },
      {
        orderNo: 2,
        title: "森田不在でも中盤の距離を空けない",
        description:
          "東京Vは森田不在が予想されるため、中盤で誰がボールを落ち着かせるかが重要になる。平川を軸にする場合も柴戸を起用する場合も、前線と最終ラインの間隔を広げすぎないこと。神戸のインサイドハーフに前向きで運ばれる回数を減らしたい。",
        result: "pending",
      },
      {
        orderNo: 3,
        title: "神戸の両サイドを押し込む",
        description:
          "神戸の前線3枚に自由を与えると、東京Vの3バックが後方へ押し下げられる時間が増える。守るだけではなく、WBとシャドーが高い位置を取り、神戸のサイドを自陣へ押し戻す時間を作りたい。ボール保持時にどこまで敵陣で試合を進められるかが重要になる。",
        result: "pending",
      },
    ],
  },
  {
    // 第8節。NEXT+1準備Phase：NEXTは千葉戦（match-13）のまま維持し、この試合は
    // future scheduleからdetail linkで参照可能な先行準備ページとして扱う。
    // 東京V側の予想スタメンは千葉戦終了後（starting XI・出場時間・交代・負傷・警告等を
    // 確認してから）に別Phaseで登録するため、今回は空のまま推測登録しない。
    id: "match-14",
    homeTeam: opponent("urawa-reds", "浦和レッズ"),
    awayTeam: verdy,
    isVerdyHome: false,
    kickoffAt: "2026-09-19T18:30:00+09:00",
    venue: "埼玉スタジアム2002",
    status: "scheduled",
    homeScore: null,
    awayScore: null,
    timeSegment: null,
    fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第8節" },
    verdyProfile: { formation: "情報準備中", characteristics: { attack: "情報準備中", defense: "情報準備中" }, keyPlayers: [], recentTrend: "情報準備中" },
    opponentProfile: { formation: "情報準備中", characteristics: { attack: "情報準備中", defense: "情報準備中" }, keyPlayers: [], recentTrend: "情報準備中" },
    predictedLineups: {
      // 浦和 本命予想（3-4-2-1）。背番号はユーザー未提示・既存データ未確認のため登録しない
      // （推測禁止）。対抗案（4-1-2-3）は既存schemaが1試合1formationしか保持できないため
      // ここでは登録せず、matchNotesへ編集部ドラフトとして残す。
      home: {
        formation: "3-4-2-1",
        starters: [
          { name: "西川 周作", position: "GK" },
          { name: "根本 健太", position: "DF" },
          { name: "宮本 優太", position: "DF" },
          { name: "ダニーロ ボザ", position: "DF" },
          { name: "長沼 洋一", position: "MF" },
          { name: "安居 海渡", position: "MF", alternative: "植木 颯" },
          { name: "瀬古 樹", position: "MF" },
          { name: "林 幸多郎", position: "MF" },
          { name: "渡邊 凌磨", position: "MF", alternative: "マテウス サヴィオ" },
          { name: "金子 拓郎", position: "MF" },
          { name: "小森 飛絢", position: "FW" },
        ],
      },
      // 東京V側は千葉戦終了後に別Phaseで登録するため、今回は未登録のまま
      // （空欄を埋める推測はしない）。
      away: {
        formation: "情報準備中",
        starters: [],
      },
    },
    matchNotes: [
      "浦和が上向いてきたタイミングとして見ているのが瀬古加入後。単純に一人の加入だけで変わったというより、中央に瀬古が入ったことで中盤の役割が整理されてきたように見える。",
      "3バックなら瀬古と安居の中央2枚。4バックなら瀬古がアンカーに入り、その前に安居や渡邊を置く形が考えられる。",
      "システムが変わっても瀬古が中央の基準点になるという見方は変わらない。東京Vとしては、浦和が3バックか4バックかだけを見るより、瀬古をどこまで自由にさせないかが重要になりそうだ。",
      "対抗案としては4-1-2-3も考えられる。並びは左から長沼洋一・根本健太・宮本優太・ダニーロ ボザ、アンカーに瀬古樹、インサイドは左から渡邊凌磨（南野遥海）・安居海渡（植木颯）、3トップは左からマテウス サヴィオ（南野遥海）・小森飛絢・金子拓郎という形が想定できる。フォーメーションが変わっても、瀬古が中盤の基準点になる点は変わらないと見ている。",
    ],
    focusPoints: [
      "浦和は3バックか4バックか：鹿島戦では3バックを使った一方、4バックも十分に選択肢として残る。並びそのものより、瀬古や渡邊がどこに立つかを見たい。",
      "瀬古を東京Vがどう見るか：浦和が上向いてきた中で中央の基準になっている瀬古。東京Vが誰を当て、どこまで自由にボールを持たせないかは大きな見どころ。",
      "金子・渡邊・小森の距離：前の3人が近い距離でプレーできると浦和は一気に攻撃しやすくなる。東京Vとしては中央を使わせ続ける展開にはしたくない。",
    ],
    strategies: [
      {
        orderNo: 1,
        title: "瀬古を自由にさせない",
        description:
          "浦和が3バックでも4バックでも、中央で瀬古に前を向かれると攻撃が動き出す。完全に消すというより、楽にボールを受けさせないことから始めたい。",
        result: "pending",
      },
      {
        orderNo: 2,
        title: "金子・渡邊を前向きにさせない",
        description:
          "3バックならシャドーに入る可能性がある金子と渡邊。この2人が小森の近くで前を向くと厄介になる。小森だけではなく、その周りに入ってくる選手まで見ておきたい。",
        result: "pending",
      },
      {
        orderNo: 3,
        title: "小森への縦一本を簡単に入れさせない",
        description:
          "浦和は中央から小森へ早めに入れ、そこから周りが出てくる形もある。最初の縦パスを簡単に通さず、その次のプレーまで遅らせたい。",
        result: "pending",
      },
    ],
  },
  {
    // 第7節。試合前予想のみを保持し、公式記録・実際の先発は未登録のままにする。
    id: "match-13",
    homeTeam: verdy,
    awayTeam: opponent("jef-united-chiba", "ジェフユナイテッド千葉"),
    isVerdyHome: true,
    kickoffAt: "2026-09-13T18:00:00+09:00",
    venue: "味の素スタジアム",
    status: "scheduled",
    homeScore: null,
    awayScore: null,
    timeSegment: null,
    fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第7節" },
    verdyProfile: { formation: "情報準備中", characteristics: { attack: "情報準備中", defense: "情報準備中" }, keyPlayers: [], recentTrend: "情報準備中" },
    opponentProfile: { formation: "情報準備中", characteristics: { attack: "情報準備中", defense: "情報準備中" }, keyPlayers: [], recentTrend: "情報準備中" },
    predictedLineups: {
      home: {
        formation: "3-4-2-1",
        starters: [
          { number: 1, name: "マテウス", position: "GK" },
          { number: 5, name: "井上 竜太", position: "DF" },
          { number: 4, name: "林 尚輝", position: "DF", alternative: "佐古 真礼" },
          { number: 15, name: "鈴木 海音", position: "DF" },
          { number: 18, name: "溝口 修平", position: "MF" },
          { number: 8, name: "齋藤 功佑", position: "MF" },
          { number: 16, name: "平川 怜", position: "MF" },
          { number: 22, name: "内田 陽介", position: "MF" },
          { number: 14, name: "福田 湧矢", position: "MF", alternative: "キム ヒョンウ" },
          { number: 71, name: "平尾 勇人", position: "MF", alternative: "熊取谷 一星" },
          { number: 9, name: "染野 唯月", position: "FW" },
        ],
      },
      // 千葉予想は4-4-2（公式スタメンではない）。
      away: {
        formation: "4-4-2",
        starters: [
          { number: 19, name: "ホセ スアレス", position: "GK" },
          { number: 67, name: "日高 大", position: "DF" },
          { number: 28, name: "河野 貴志", position: "DF" },
          { number: 66, name: "ダニエル ホール", position: "DF" },
          { number: 39, name: "石尾 陸登", position: "DF" },
          { number: 8, name: "津久井 匠海", position: "MF" },
          { number: 4, name: "田口 泰士", position: "MF", alternative: "小林 祐介" },
          { number: 25, name: "マテウス インディオ", position: "MF" },
          { number: 18, name: "杉山 直宏", position: "MF" },
          { number: 20, name: "石川 大地", position: "FW", alternative: "エリソン" },
          { number: 29, name: "矢村 健", position: "FW" },
        ],
      },
    },
    availability: {
      likelyUnavailable: [
        { team: "東京V", players: ["山見 大登", "吉田 泰授", "田邊 秀斗", "宮原 和也", "森田 晃樹", "寺沼 星文"] },
        { team: "千葉", players: ["喜田 陽", "飯田 貴敬"] },
      ],
      suspensionNote: "なし",
      ineligibleNote: "なし",
    },
    // 公式発表されたStarting XI・ベンチ・開始フォーメーション（ユーザー確認済み公式画面）。
    // predictedLineupsとは独立したフィールドであり、上書き・削除しない。
    // FW配列はシャドー2枚→CFの順で保持し、既存のOfficialLineups/FormationPitch変換
    // （positions.flatMap(GK→DF→MF→FW) → formationRows[3-4-2-1]=[3,4,2,1]で分割）により、
    // シャドー行・CF行が公式フォーメーション画像どおりの並びで描画される（match-11と同じ変換規則）。
    actualLineups: {
      home: {
        formation: "3-4-2-1",
        starters: {
          GK: ["1 マテウス"],
          DF: ["15 鈴木 海音", "4 林 尚輝", "5 井上 竜太"],
          MF: ["40 新井 悠太", "8 齋藤 功佑", "16 平川 怜", "18 溝口 修平"],
          FW: ["71 平尾 勇人", "14 福田 湧矢", "9 染野 唯月"],
        },
        bench: {
          GK: ["21 長沢 祐弥"],
          DF: ["22 内田 陽介", "29 佐古 真礼"],
          MF: ["2 柴戸 海", "7 松橋 優安", "20 食野 壮磨"],
          FW: ["25 熊取谷 一星", "33 一美 和成", "38 神田 奏真"],
        },
      },
      away: {
        formation: "4-4-2",
        starters: {
          GK: ["19 ホセ スアレス"],
          DF: ["67 日高 大", "24 鳥海 晃司", "66 ダニエル ホール", "39 石尾 陸登"],
          MF: ["8 津久井 匠海", "25 マテウス インディオ", "5 小林 祐介", "18 杉山 直宏"],
          FW: ["29 矢村 健", "20 石川 大地"],
        },
        bench: {
          GK: ["23 鈴木 椋大"],
          DF: ["28 河野 貴志"],
          MF: ["4 田口 泰士", "6 エドゥアルド", "11 米倉 恒貴", "14 椿 直起", "42 イサカ ゼイン"],
          FW: ["9 呉屋 大翔", "99 エリソン"],
        },
      },
    },
    matchNotes: [
      "千葉は前節で今季初勝利。対する東京Vは、まだリーグ戦で勝利がない。",
      "両チームとも直前にルヴァンカップを戦っていて、メンバーを入れ替えながらこの試合を迎える。",
      "千葉はここまでリーグ戦で15失点。一方の東京Vは総得点がわずか2。数字だけを見れば、千葉の守備と東京Vの得点力のどちらが先に上向くか、という見方もできる。",
      "ただ、両チームとも序盤よりは内容が上向いてきている。千葉は前節で結果を出し、東京Vも少しずつ試合の形は作れてきた。ここから流れをつかむ意味でも大きな一戦になる。",
      "千葉が4-4-2で入るなら、東京Vは3バックで相手の2トップに対して人数を上回りながら前進できるかがひとつのポイント。両WBを高い位置まで押し上げられるか、その一方でボールを失った後に一気に運ばれないかにも注意したい。",
      "ルヴァン明けでどこまでメンバーを戻すのか、後半にどちらが先に足を止めるのか。そのあたりも含めて見ておきたい試合だ。",
    ],
    focusPoints: [
      "千葉15失点 vs 東京V総得点2：千葉はここまでリーグ戦で15失点。一方の東京Vは総得点が2。数字だけを見れば、千葉の守備と東京Vの得点力、どちらが先に上向くかはこの試合の分かりやすい見どころになる。",
      "両WBが高い位置を取れるか：内田と溝口が高い位置を取れると、東京Vは前に人数をかけやすくなる。逆に低い位置に押し込まれると5バック気味になり、攻撃が重くなりやすい。",
      "ルヴァン明けのメンバー構成：両チームとも直前にルヴァンカップを戦い、メンバーを入れ替えている。誰を戻すのか、後半まで運動量を保てるかも見ておきたい。",
    ],
    strategies: [
      {
        orderNo: 1,
        title: "後ろの3対2を使いたい",
        description:
          "千葉が4-4-2で入るなら、東京Vは3バックで相手の2トップに対して人数を上回りやすい。無理に中央へ入れるより、外のCBからWBへ逃がしながら前進できる形を作りたい。",
        result: "pending",
      },
      {
        orderNo: 2,
        title: "シャドーが前を向けるか",
        description:
          "福田や平尾が中盤と最終ラインの間で前を向けると、東京Vの攻撃はかなり楽になる。中央が詰まるなら、シャドーを経由してサイドへ出す形でもいい。まずは前を向ける場所を作れるか。",
        result: "pending",
      },
      {
        orderNo: 3,
        title: "失った後の一発に注意",
        description:
          "両WBが高い位置まで出た時にボールを失うと、その背後を使われやすい。千葉が前に2枚を残す形なら、最初の縦パスを入れさせないことが大事になる。",
        result: "pending",
      },
    ],
  },
  {
    // ルヴァンカップ1回戦。Jリーグ公式試合記録で確認できた終了後の公式記録のみを保持する。
    id: "match-12",
    homeTeam: opponent("leylac-shiga", "レイラック滋賀FC"),
    awayTeam: verdy,
    isVerdyHome: false,
    kickoffAt: "2026-09-09T18:30:00+09:00",
    venue: "平和堂ＨＡＴＯスタジアム",
    status: "finished",
    homeScore: 0,
    awayScore: 1,
    timeSegment: null,
    fixtureMeta: { competition: "ルヴァン", roundLabel: "1回戦" },
    officialRecord: {
      kickoff: "18:30",
      attendance: 2885,
      weather: "曇り",
      temperature: "22.9℃",
      humidity: "86%",
      sourceUrl: "https://www.jleague.jp/match/leaguecup/2026/090904/",
    },
    actualLineups: {
      home: {
        formation: "4-4-2",
        starters: {
          GK: ["1 伊東 倖希"],
          DF: ["36 前川 智敬", "48 谷田 壮志朗", "2 平井 駿助", "4 井出 敬大"],
          MF: ["23 竜田 柊士", "7 久保 瑛史", "32 海口 彦太", "30 山口 隆希"],
          FW: ["10 人見 拓哉", "29 日野 友貴"],
        },
        bench: {
          GK: ["41 本吉 勇貴"],
          DF: ["55 小野寺 健也"],
          MF: ["8 中村 健人", "11 三宅 海斗", "16 鈴木 翔太", "18 秋山 駿", "66 松原 海斗"],
          FW: ["9 坂元 一渚璃", "77 北條 真汰"],
        },
      },
      away: {
        formation: "3-4-2-1",
        starters: {
          GK: ["21 長沢 祐弥"],
          DF: ["36 松田 陸", "29 佐古 真礼", "22 内田 陽介"],
          MF: ["7 松橋 優安", "2 柴戸 海", "28 山本 丈偉", "42 今井 健人"],
          FW: ["38 神田 奏真", "24 仲山 獅恩", "27 白井 亮丞"],
        },
        bench: {
          GK: ["41 中村 圭佑"],
          DF: ["50 カマラ シェック セザール"],
          MF: ["20 食野 壮磨", "30 川村 楽人"],
          FW: ["13 山田 剛綺", "17 キム ヒョンウ", "25 熊取谷 一星", "51 大藤 颯太", "71 平尾 勇人"],
        },
      },
    },
    goals: [{ minute: "90+5'", scorer: "キム ヒョンウ", team: "東京V" }],
    cards: [
      { minute: "27'", player: "柴戸 海", team: "東京V", type: "yellow" },
      { minute: "33'", player: "神田 奏真", team: "東京V", type: "yellow" },
      { minute: "75'", player: "食野 壮磨", team: "東京V", type: "yellow" },
      { minute: "90+2'", player: "今井 健人", team: "東京V", type: "yellow" },
      { minute: "34'", player: "久保 瑛史", team: "滋賀", type: "yellow" },
    ],
    substitutions: [
      { minute: "14'", team: "東京V", playerIn: "平尾 勇人", playerOut: "神田 奏真" },
      { minute: "14'", team: "東京V", playerIn: "食野 壮磨", playerOut: "柴戸 海" },
      { minute: "23'", team: "東京V", playerIn: "熊取谷 一星", playerOut: "松橋 優安" },
      { minute: "30'", team: "東京V", playerIn: "キム ヒョンウ", playerOut: "白井 亮丞" },
      { minute: "23'", team: "滋賀", playerIn: "北條 真汰", playerOut: "日野 友貴" },
      { minute: "23'", team: "滋賀", playerIn: "三宅 海斗", playerOut: "山口 隆希" },
      { minute: "23'", team: "滋賀", playerIn: "松原 海斗", playerOut: "竜田 柊士" },
      { minute: "14'", team: "滋賀", playerIn: "中村 健人", playerOut: "久保 瑛史" },
      { minute: "34'", team: "滋賀", playerIn: "秋山 駿", playerOut: "前川 智敬" },
    ],
    matchStats: {
      home: { shots: 12, shotsOnTarget: 3, possession: "49%", passSuccessRate: "74%", offsides: 1, corners: 5, freeKicks: 15, yellowCards: 1, redCards: 0 },
      away: { shots: 15, shotsOnTarget: 6, possession: "51%", passSuccessRate: "80%", offsides: 0, corners: 7, freeKicks: 15, yellowCards: 4, redCards: 0 },
    },
    verdyProfile: { formation: "情報準備中", characteristics: { attack: "情報準備中", defense: "情報準備中" }, keyPlayers: [], recentTrend: "情報準備中" },
    opponentProfile: { formation: "情報準備中", characteristics: { attack: "情報準備中", defense: "情報準備中" }, keyPlayers: [], recentTrend: "情報準備中" },
    matchNotes: [], focusPoints: [], strategies: [],
  },
  {
    // 第6節。公式試合記録（https://www.jleague.jp/match/j1/2026/090608/）で確認できた
    // 試合終了記録。試合前の予測・分析は作成せず、公式記録のみを保持する。
    id: "match-11",
    homeTeam: opponent("cerezo-osaka", "セレッソ大阪"),
    awayTeam: verdy,
    isVerdyHome: false,
    kickoffAt: "2026-09-06T19:00:00+09:00",
    venue: "YANMAR HANASAKA STADIUM",
    status: "finished",
    homeScore: 0,
    awayScore: 0,
    timeSegment: null,
    fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第6節" },
    officialRecord: {
      kickoff: "19:00",
      attendance: 16939,
      weather: "曇り一時雨",
      temperature: "26℃",
      humidity: "76%",
      sourceUrl: "https://www.jleague.jp/match/j1/2026/090608/",
    },
    actualLineups: {
      home: {
        formation: "3-4-2-1",
        starters: {
          GK: ["23 中村 航輔"], DF: ["4 井上 黎生人", "44 畠中 槙之輔", "27 ディオン クールズ"],
          MF: ["66 大畑 歩夢", "36 ジャクソン アーバイン", "10 田中 駿汰", "2 中村 拓海"],
          FW: ["14 横山 夢樹", "41 小見 洋太", "11 チアゴ アンドラーデ"],
        },
        bench: { GK: [], DF: [], MF: [], FW: [] },
      },
      away: {
        formation: "3-4-2-1",
        starters: {
          GK: ["1 マテウス"], DF: ["5 井上 竜太", "29 佐古 真礼", "15 鈴木 海音"],
          MF: ["18 溝口 修平", "8 齋藤 功佑", "16 平川 怜", "40 新井 悠太"],
          FW: ["14 福田 湧矢", "71 平尾 勇人", "9 染野 唯月"],
        },
        bench: { GK: [], DF: [], MF: [], FW: [] },
      },
    },
    goals: [],
    cards: [{ minute: "16'", player: "小見 洋太", team: "東京V", type: "yellow" }],
    substitutions: [
      { minute: "44'", team: "東京V", playerIn: "柴戸 海", playerOut: "食野 壮磨" },
      { minute: "44'", team: "東京V", playerIn: "熊取谷 一星", playerOut: "松橋 優安" },
      { minute: "44'", team: "東京V", playerIn: "パブロ サバック", playerOut: "横山 夢樹" },
      { minute: "40'", team: "Ｃ大阪", playerIn: "香川 真司", playerOut: "大畑 歩夢" },
      { minute: "33'", team: "Ｃ大阪", playerIn: "神田 奏真", playerOut: "福田 湧矢" },
      { minute: "28'", team: "Ｃ大阪", playerIn: "ルーカス フェルナンデス", playerOut: "チアゴ アンドラーデ" },
      { minute: "19'", team: "東京V", playerIn: "松橋 優安", playerOut: "平尾 勇人" },
      { minute: "19'", team: "東京V", playerIn: "食野 壮磨", playerOut: "齋藤 功佑" },
      { minute: "19'", team: "東京V", playerIn: "奥田 勇斗", playerOut: "中村 拓海" },
      { minute: "16'", team: "Ｃ大阪", playerIn: "櫻川 ソロモン", playerOut: "小見 洋太" },
    ],
    matchStats: {
      home: { shots: 17, shotsOnTarget: 2, possession: "62%", passSuccessRate: "81%", distance: "118.1km", sprints: 141, offsides: 2, corners: 8, freeKicks: 10, yellowCards: 1, redCards: 0 },
      away: { shots: 5, shotsOnTarget: 2, possession: "38%", passSuccessRate: "68%", distance: "120.4km", sprints: 152, offsides: 0, corners: 3, freeKicks: 8, yellowCards: 0, redCards: 0 },
    },
    verdyProfile: { formation: "情報準備中", characteristics: { attack: "情報準備中", defense: "情報準備中" }, keyPlayers: [], recentTrend: "情報準備中" },
    opponentProfile: { formation: "情報準備中", characteristics: { attack: "情報準備中", defense: "情報準備中" }, keyPlayers: [], recentTrend: "情報準備中" },
    matchNotes: [], focusPoints: [], strategies: [],
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

export function getNextMatch(): Match | null {
  const upcoming = publicMatches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime());
  // scheduledな試合が無い場合は過去試合へフォールバックしない（過去試合を
  // NEXT MATCHとして誤表示しないため）。呼び出し側でnullを空状態として扱う。
  return upcoming[0] ?? null;
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
