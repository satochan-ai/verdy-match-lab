import type {
  Match,
  ScoreSituation,
  SpecialSituation,
  Strategy,
  TeamProfile,
  TimeSegment,
} from "@/types/domain";
import type { AnalysisReport, PresetQuestionKey } from "./types";

const scoreSituationLabel: Record<ScoreSituation, string> = {
  even: "同点",
  lead_1: "1点リード",
  behind_1: "1点ビハインド",
  lead_2plus: "2点以上リード",
  behind_2plus: "2点以上ビハインド",
};

const timeSegmentLabel: Record<TimeSegment, string> = {
  first_early: "前半序盤",
  first_mid: "前半中盤",
  first_late: "前半終盤",
  second_early: "後半序盤",
  second_mid: "後半中盤",
  second_late: "後半終盤",
};

const specialSituationLabel: Record<SpecialSituation, string> = {
  red_card_own: "退場者あり",
  red_card_opponent: "相手に退場者あり",
  under_pressure: "押し込まれている",
  attacking_no_goal: "攻めているが点が取れない",
  cannot_keep_possession: "ボールを持てない",
};

function isPlaceholder(text: string): boolean {
  return text === "情報準備中" || text.trim().length === 0;
}

/** 末尾の句点・「が持ち味」等を落とし、「「〜」という持ち味」のように再利用しても重複しない形にする。 */
function stripTraitSuffix(text: string): string {
  return text.replace(/。$/, "").replace(/が持ち味$/, "");
}

function verdyAttackRef(profile: TeamProfile): string | null {
  return isPlaceholder(profile.characteristics.attack)
    ? null
    : stripTraitSuffix(profile.characteristics.attack);
}

function opponentWeaknessRef(profile: TeamProfile): string | null {
  return isPlaceholder(profile.characteristics.defense)
    ? null
    : stripTraitSuffix(profile.characteristics.defense);
}

function opponentAttackRef(profile: TeamProfile): string | null {
  return isPlaceholder(profile.characteristics.attack)
    ? null
    : stripTraitSuffix(profile.characteristics.attack);
}

function hasSparseOpponentData(match: Match): boolean {
  return match.opponentProfile.keyPlayers.length === 0;
}

// ---------------------------------------------------------------------------
// PRE_MATCH
// ---------------------------------------------------------------------------

export function getPreMatchAnalysis(
  match: Match,
  question: PresetQuestionKey
): AnalysisReport {
  const opponentName = match.isVerdyHome ? match.awayTeam.name : match.homeTeam.name;
  const note = hasSparseOpponentData(match)
    ? `${opponentName}の詳細情報がまだ登録されていないため、現在登録されている情報をもとに分析しています。`
    : undefined;

  if (question === "highlight") {
    const attackText = stripTraitSuffix(match.verdyProfile.characteristics.attack);
    return {
      sections: [
        {
          heading: "今日の見どころ",
          body: `${opponentName}戦の鍵は、「${attackText}」という持ち味をどう出せるか。${match.matchNotes[0] ?? ""}`,
        },
        {
          heading: "注目ポイント",
          bullets: match.focusPoints,
        },
      ],
      note,
    };
  }

  if (question === "keyPlayers") {
    const verdyKey = match.verdyProfile.keyPlayers[0];
    const oppKey = match.opponentProfile.keyPlayers[0];
    return {
      sections: [
        {
          heading: "今日のキーマン",
          bullets: [
            verdyKey ? `ヴェルディ：${verdyKey.name} — ${verdyKey.note}` : "ヴェルディ：情報準備中",
            oppKey ? `相手：${oppKey.name} — ${oppKey.note}` : "相手：情報準備中",
          ],
        },
      ],
      note,
    };
  }

  return {
    sections: [
      {
        heading: "相手の注意点",
        body: match.opponentProfile.characteristics.defense,
        bullets: match.matchNotes,
      },
    ],
    note,
  };
}

// ---------------------------------------------------------------------------
// LIVE
// ---------------------------------------------------------------------------

type LiveContent = { focus: string; suggestion: string };

/** 1回答内でのContext引用の重複を防ぐための発行器。同じキーは2回目以降フォールバック文言を返す。 */
function createCiter() {
  const used = new Set<string>();
  return function cite(key: string, quoted: string, fallback: string): string {
    if (used.has(key)) return fallback;
    used.add(key);
    return quoted;
  };
}

type Trend = "trailing" | "leading" | "even";

function trendOf(score: ScoreSituation): Trend {
  if (score === "behind_1" || score === "behind_2plus") return "trailing";
  if (score === "lead_1" || score === "lead_2plus") return "leading";
  return "even";
}

type Half = "first" | "second";

function halfOf(time: TimeSegment): Half {
  return time === "first_early" || time === "first_mid" || time === "first_late"
    ? "first"
    : "second";
}

/**
 * スコア状況から決まる基本のfocus/suggestion。時間帯の細かい意味はbuildTimeModifierの役割だが、
 * 「前半か後半か」という粗い軸だけはここでも軽く反映し、同じスコアが続いたときの既視感を減らす。
 */
function buildScoreBase(
  score: ScoreSituation,
  half: Half,
  cite: ReturnType<typeof createCiter>,
  attackTraitRaw: string | null,
  weaknessRaw: string | null
): LiveContent {
  const attackQuoted = `「${attackTraitRaw ?? "サイドを起点にした攻撃"}」という持ち味`;
  const weaknessQuoted = `「${weaknessRaw ?? "相手の空いているスペース"}」という点`;
  const attackCited = cite("attack", attackQuoted, "持ち味の攻撃");
  const weaknessCited = cite("weakness", weaknessQuoted, "相手の弱点");

  switch (score) {
    case "behind_2plus":
      return half === "first"
        ? {
            focus: "交代を待たずに取れる修正の糸口",
            suggestion: `${attackCited}を最大限に活かし、リスクを取ってでも前進する回数を増やす`,
          }
        : {
            focus: "交代選手を含めた前線の推進力",
            suggestion: `後半に入ってなお${attackCited}を出し切れているか、回数を増やしたい`,
          };
    case "behind_1":
      return half === "first"
        ? {
            focus: "前半のうちに取り返す入り方",
            suggestion: `${weaknessCited}を起点に、前半のうちから崩しの形を増やす`,
          }
        : {
            focus: "前線への預けどころの質",
            suggestion: `${weaknessCited}を起点に、後半はより多くの回数で崩し切る`,
          };
    case "even":
      return half === "first"
        ? {
            focus: "ボール保持の時間の長さ",
            suggestion: `${attackCited}で主導権を握りにいく`,
          }
        : {
            focus: "後半に入ってからのボール保持の変化",
            suggestion: `${attackCited}を継続し、後半も主導権を渡さない`,
          };
    case "lead_1":
      return half === "first"
        ? {
            focus: "リードした後の入りで受け身になっていないか",
            suggestion: "無理に追加点を狙わず、ボールを握る時間を優先する",
          }
        : {
            focus: "後半のリード管理",
            suggestion: "無理に追加点を狙わず、ボールを握る時間を優先する",
          };
    case "lead_2plus":
      return half === "first"
        ? {
            focus: "無理に追加点を狙いに行くリスク",
            suggestion: `${weaknessCited}への警戒は保ちつつ、深追いはしない`,
          }
        : {
            focus: "後半に入ってからの気の緩みへの警戒",
            suggestion: `${weaknessCited}への警戒は保ちつつ、深追いはしない`,
          };
  }
}

/**
 * 時間帯から決まるfocus/suggestion。スコアのトレンド（勝っている/負けている/互角）によって
 * 同じ時間帯でも中身が変わる（特に後半中盤・終盤）。5×6=30通りを手書きせず、
 * 「時間帯の意味」×「トレンド」の組み合わせで構成する。
 */
function buildTimeModifier(
  time: TimeSegment,
  trend: Trend,
  cite: ReturnType<typeof createCiter>,
  weaknessRaw: string | null
): { note: string; focus: string; suggestion: string } {
  const weaknessQuoted = `「${weaknessRaw ?? "相手の空いているスペース"}」という点`;

  switch (time) {
    case "first_early":
      return {
        note: "立ち上がりの時間帯で、まずは相手の出方を見極めたい局面です。",
        focus: "相手の最初のプレスの強度",
        suggestion:
          trend === "trailing"
            ? "早い時間の失点でも慌てず、まず試合を落ち着かせる"
            : "無理に試合を決めにいかず、様子を見ながら入る",
      };
    case "first_mid":
      return {
        note: "相手の守備の傾向が見え始める時間帯です。",
        focus: "相手の守備の重心がどちらに寄っているか",
        suggestion: `見えてきた${cite("weakness", weaknessQuoted, "相手の弱点")}をもとに攻撃ルートを絞り込む`,
      };
    case "first_late":
      return {
        note: "前半を悪い形で終えないための落ち着きが求められる時間帯です。",
        focus: "ハーフタイムに向けた試合の締めくくり方",
        suggestion:
          trend === "trailing"
            ? "追加失点だけは避け、ハーフタイムに立て直す材料を残す"
            : trend === "leading"
              ? "リードを保ったまま折り返せるよう無理をしない"
              : "ハーフタイムに向けて試合を落ち着かせる",
      };
    case "second_early":
      return {
        note: "ハーフタイムの修正が機能しているかを見極める時間帯です。",
        focus: "後半立ち上がりの入り方で修正の効果を確認できるか",
        suggestion: "後半最初の数分の入り方から修正の効果を見極める",
      };
    case "second_mid":
      return {
        note: "交代カードや運動量の低下が絡み始め、勝負所が近づく時間帯です。",
        focus: "双方の運動量の変化",
        suggestion:
          trend === "trailing"
            ? "運動量が落ちてくる相手を見極めて仕掛けどころを探る"
            : trend === "leading"
              ? "相手の運動量低下を見ながら試合をコントロールする"
              : "勝負所に向けて交代カードのタイミングを計る",
      };
    case "second_late":
      return {
        note: "残り時間を踏まえ、スコア状況に応じたリスク許容度の調整が問われる時間帯です。",
        focus: "残り時間とリスク許容度のバランス",
        suggestion:
          trend === "trailing"
            ? "残り時間を踏まえ、リスクを取る比重を上げる"
            : trend === "leading"
              ? "残り時間を踏まえ、リスクを抑えて逃げ切りを優先する"
              : "残り時間を踏まえ、最後の変化をどこで作るかを決める",
      };
  }
}

/** 特殊状況ごとの具体的コンテンツ。VerdyContext/OpponentContextを条件に応じて参照する。 */
function buildSpecialAdvice(
  special: SpecialSituation,
  cite: ReturnType<typeof createCiter>,
  attackTraitRaw: string | null,
  opponentAttackRaw: string | null
): LiveContent {
  switch (special) {
    case "red_card_own":
      return {
        focus: "数的不利の中でどこにブロックを設定するか",
        suggestion: "無理に人数をかけず、守備ブロックを保ってカウンターを受けるリスクを最小化する",
      };
    case "red_card_opponent":
      return {
        focus: "数的優位をどう幅広く使うか",
        suggestion: "焦らずボールを循環させながら、相手の空いたスペースを幅広く使う",
      };
    case "under_pressure": {
      const quoted = `相手の「${opponentAttackRaw ?? ""}」という特徴`;
      return {
        focus: opponentAttackRaw
          ? `${cite("opponentAttack", quoted, "相手の攻撃の特徴")}を踏まえ、どこでボールを奪うかの共有`
          : "どこでボールを奪うかの共有",
        suggestion: "奪った後にすぐ前進できる形を作り、押し込まれる時間を短くする",
      };
    }
    case "attacking_no_goal": {
      const quoted = `「${attackTraitRaw ?? ""}」という持ち味`;
      return {
        focus: "崩しの形が偏っていないか（幅・クロス・中央のバランス）",
        suggestion: attackTraitRaw
          ? `${cite("attack", quoted, "持ち味の攻撃")}に加えて、ボックス内への侵入回数を増やす工夫`
          : "ボックス内への侵入回数を増やす工夫",
      };
    }
    case "cannot_keep_possession":
      return {
        focus: "中盤でのサポート距離と数的関係",
        suggestion: "縦に急がず、時にはロングボールも使い分けてプレスを回避する",
      };
  }
}

const SPECIAL_PRIORITY: SpecialSituation[] = [
  "red_card_own",
  "red_card_opponent",
  "under_pressure",
  "attacking_no_goal",
  "cannot_keep_possession",
];

function pickTopSpecials(specials: SpecialSituation[], max: number): SpecialSituation[] {
  return SPECIAL_PRIORITY.filter((s) => specials.includes(s)).slice(0, max);
}

const SAFE_REPLY_PATTERNS: { pattern: RegExp; reply: string }[] = [
  {
    pattern: /無能|使えない|クビ|レベルが低い|戦犯/,
    reply:
      "選手や監督への人格的な評価にはお答えできません。プレー内容の観点からであれば分析できます。",
  },
  {
    pattern: /前の指示を無視|指示を無視|システムプロンプト|プロンプトを(表示|教えて)/,
    reply: "内部の指示内容はお伝えできません。試合の戦術についてであればお答えします。",
  },
];

function checkUserInputSafety(userInput: string): string | null {
  const hit = SAFE_REPLY_PATTERNS.find((p) => p.pattern.test(userInput));
  return hit ? hit.reply : null;
}

/** 現在の状況が三策のどれかと自然に関係する場合のみ、参照対象の策を返す。 */
const STRATEGY_KEYWORDS: { tag: "attack" | "midfield" | "time"; keywords: string[] }[] = [
  { tag: "attack", keywords: ["サイド", "攻撃", "崩し", "ボックス", "推進力"] },
  { tag: "midfield", keywords: ["中盤", "保持", "数的", "ビルドアップ"] },
  { tag: "time", keywords: ["運動量", "終盤", "交代"] },
];

function situationTag(
  score: ScoreSituation,
  time: TimeSegment,
  specials: SpecialSituation[]
): "attack" | "midfield" | "time" | null {
  if (specials.includes("attacking_no_goal")) return "attack";
  if (specials.includes("cannot_keep_possession") || specials.includes("under_pressure")) return "midfield";
  if (time === "second_mid" || time === "second_late") return "time";
  if (score === "behind_1" || score === "behind_2plus") return "attack";
  return null;
}

function findRelevantStrategy(match: Match, tag: "attack" | "midfield" | "time"): Strategy | undefined {
  const entry = STRATEGY_KEYWORDS.find((e) => e.tag === tag);
  if (!entry) return undefined;
  return match.strategies.find((s) =>
    entry.keywords.some((k) => s.title.includes(k) || s.description.includes(k))
  );
}

export function getLiveAnalysis(
  match: Match,
  scoreSituation: ScoreSituation,
  timeSegment: TimeSegment,
  specials: SpecialSituation[],
  userInput?: string
): AnalysisReport {
  const trimmedInput = userInput?.trim();
  if (trimmedInput) {
    const safeReply = checkUserInputSafety(trimmedInput);
    if (safeReply) {
      return { sections: [{ heading: "軍師より", body: safeReply }] };
    }
  }

  const scoreLabel = scoreSituationLabel[scoreSituation];
  const timeLabel = timeSegmentLabel[timeSegment];
  const attackTraitRaw = verdyAttackRef(match.verdyProfile);
  const weaknessRaw = opponentWeaknessRef(match.opponentProfile);
  const opponentAttackRaw = opponentAttackRef(match.opponentProfile);
  const trend = trendOf(scoreSituation);

  const cite = createCiter();
  const scoreBase = buildScoreBase(scoreSituation, halfOf(timeSegment), cite, attackTraitRaw, weaknessRaw);
  const timeModifier = buildTimeModifier(timeSegment, trend, cite, weaknessRaw);

  const topSpecials = pickTopSpecials(specials, 2);

  let focusPoints: string[];
  let suggestions: string[];

  if (topSpecials.length === 0) {
    focusPoints = [scoreBase.focus, timeModifier.focus];
    suggestions = [scoreBase.suggestion, timeModifier.suggestion];
  } else if (topSpecials.length === 1) {
    const special = buildSpecialAdvice(topSpecials[0], cite, attackTraitRaw, opponentAttackRaw);
    focusPoints = [special.focus, timeModifier.focus];
    suggestions = [special.suggestion, scoreBase.suggestion];
  } else {
    const [first, second] = topSpecials.map((s) =>
      buildSpecialAdvice(s, cite, attackTraitRaw, opponentAttackRaw)
    );
    focusPoints = [first.focus, second.focus];
    suggestions = [first.suggestion, second.suggestion];
  }

  const specialText = specials.length
    ? specials.map((s) => specialSituationLabel[s]).join("、")
    : undefined;

  let summary = `${timeLabel}、${scoreLabel}。${timeModifier.note}`;
  if (specialText) {
    summary += `（${specialText}という状況も踏まえています）`;
  }

  // 三策との接続：状況が明確に関係する場合のみ、特殊状況が選ばれているときに限って軽く触れる。
  if (topSpecials.length > 0) {
    const tag = situationTag(scoreSituation, timeSegment, specials);
    const relevant = tag ? findRelevantStrategy(match, tag) : undefined;
    if (relevant) {
      summary += ` 試合前の第${relevant.orderNo}策「${relevant.title}」も、今も注目点です。`;
    }
  }

  const note = !attackTraitRaw && !weaknessRaw
    ? "登録されているチーム情報が少ないため、一般的な戦術論をもとに見立てています。"
    : undefined;

  const sections = [
    { heading: "現状分析", body: summary },
    { heading: "注目ポイント", bullets: focusPoints },
    { heading: "修正案として考えられること", bullets: suggestions },
  ];

  if (trimmedInput) {
    sections.push({
      heading: "質問への補足",
      body: `「${trimmedInput}」についても、上記の視点と合わせて見ておくとよさそうです。`,
    });
  }

  return { sections, note };
}

// ---------------------------------------------------------------------------
// HALF_TIME
// ---------------------------------------------------------------------------

function includesRetirement(match: Match): boolean {
  return match.matchNotes.some((n) => n.includes("退場"));
}

export function getHalfTimeAnalysis(match: Match): AnalysisReport {
  const verdyScore = match.isVerdyHome ? match.homeScore ?? 0 : match.awayScore ?? 0;
  const opponentScore = match.isVerdyHome ? match.awayScore ?? 0 : match.homeScore ?? 0;
  const diff = verdyScore - opponentScore;
  const retirement = includesRetirement(match);

  const verdyAttack = verdyAttackRef(match.verdyProfile);
  const opponentWeakness = opponentWeaknessRef(match.opponentProfile);

  let firstHalfSummary: string;
  let secondHalfFocus: string[];
  let adjustments: string[];

  if (retirement) {
    firstHalfSummary = `前半は${match.homeScore ?? 0}-${match.awayScore ?? 0}。退場者が出たことで、後半は人数状況を踏まえた戦い方の整理が必要になる。`;
    secondHalfFocus = ["数的状況に応じたブロックの設定", "運動量の配分"];
    adjustments = [
      "無理に前から追わず、まずブロックを整える",
      "交代カードで運動量を補いながら対応する",
    ];
  } else if (diff <= -2) {
    firstHalfSummary = `前半は${match.homeScore ?? 0}-${match.awayScore ?? 0}とビハインド。後半は失点を防ぎながら反撃の糸口を作れるかが焦点。`;
    secondHalfFocus = ["早い時間の追加失点を防ぐこと", "交代による攻撃の活性化"];
    adjustments = [
      verdyAttack
        ? `「${verdyAttack}」という持ち味を早い時間から出せるようにする`
        : "早い時間から積極的に仕掛ける",
      "守備の間延びを防ぎ、まず失点を止める",
    ];
  } else if (diff < 0) {
    firstHalfSummary = `前半は${match.homeScore ?? 0}-${match.awayScore ?? 0}とビハインド。${match.matchNotes[0] ?? "決定機の数では大きな差はなかった。"}`;
    secondHalfFocus = ["後半立ち上がりの入り方", "同点に追いつくための推進力"];
    adjustments = [
      opponentWeakness ? `「${opponentWeakness}」という点を後半は繰り返し突く` : "後半は攻める回数を増やす",
      "焦れて縦に急ぎすぎない",
    ];
  } else if (diff === 0) {
    firstHalfSummary = `前半は${match.homeScore ?? 0}-${match.awayScore ?? 0}で終了。${match.matchNotes[0] ?? "大きな決定機は少なく、探り合いの展開だった。"}`;
    secondHalfFocus = match.focusPoints.slice(0, 2).length
      ? match.focusPoints.slice(0, 2)
      : ["後半の運動量", "サイドチェンジの精度"];
    adjustments = [
      "サイドの深さを活かして相手を横に広げる",
      "セカンドボールの回収位置を高く保つ",
    ];
  } else if (diff === 1) {
    firstHalfSummary = `前半は${match.homeScore ?? 0}-${match.awayScore ?? 0}とリード。${match.matchNotes[0] ?? ""}`;
    secondHalfFocus = ["リードを守りながら主導権を保てるか", "相手の後半の修正への対応"];
    adjustments = [
      "無理に追加点を急がず、ボールを握る時間を保つ",
      "相手の運動量が落ちる時間帯を見極める",
    ];
  } else {
    firstHalfSummary = `前半は${match.homeScore ?? 0}-${match.awayScore ?? 0}と大きくリード。${match.matchNotes[0] ?? ""}`;
    secondHalfFocus = ["リード後の油断による失点リスク", "控え選手も含めた運動量の管理"];
    adjustments = [
      "試合を落ち着かせることを優先し、無理な深追いはしない",
      "早めの選手交代でリズムを保つ",
    ];
  }

  // 三策との接続：前半の状況（ビハインド/互角/リード/退場）に軽く関連する策を選び、
  // 事実の創作なしに「引き続き注目したい点」として1箇所だけ添える。見つからなければ第1策にフォールバック。
  const halfTimeTag: "attack" | "midfield" | "time" | null = retirement
    ? "time"
    : diff < 0
      ? "attack"
      : diff > 0
        ? "time"
        : "midfield";
  const anchorStrategy =
    (halfTimeTag ? findRelevantStrategy(match, halfTimeTag) : undefined) ?? match.strategies[0];
  if (anchorStrategy) {
    firstHalfSummary += ` 試合前に見ていた第${anchorStrategy.orderNo}策「${anchorStrategy.title}」は、後半も引き続き確認したいポイントです。`;
  }

  return {
    sections: [
      { heading: "前半の整理", body: firstHalfSummary },
      { heading: "後半の注目ポイント", bullets: secondHalfFocus },
      { heading: "軍師の修正案", bullets: adjustments },
    ],
  };
}

// ---------------------------------------------------------------------------
// POST_MATCH
// ---------------------------------------------------------------------------

export function getPostMatchAnalysis(match: Match): AnalysisReport {
  const opponentName = match.isVerdyHome ? match.awayTeam.name : match.homeTeam.name;
  const anchorStrategy = match.strategies[0];
  const intro = anchorStrategy
    ? `試合前の第一策「${anchorStrategy.title}」も振り返りながら、この試合を整理します。`
    : "";

  return {
    sections: [
      {
        heading: "試合総括",
        body: `${intro}${opponentName}との一戦は${match.homeScore}-${match.awayScore}で終了。${match.matchNotes[0] ?? ""}`,
      },
      {
        heading: "勝敗を分けたポイント",
        bullets: match.focusPoints,
      },
      {
        heading: "次戦への注目点",
        body: "今節の内容を踏まえ、次戦でも同様の狙いが通用するか注視したい。",
      },
    ],
  };
}
