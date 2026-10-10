import { SectionHeader } from "@/components/ui/SectionHeader";

type PredictionPlayer = { name: string; role: string; alternative?: string };

const goalkeeper: PredictionPlayer = { name: "マテウス", role: "GK" };
const forwards: PredictionPlayer[] = [
  { name: "染野 唯月", role: "FW" },
  { name: "一美 和成", role: "FW", alternative: "白井 亮丞" },
];
const midfield: PredictionPlayer[] = [
  { name: "齋藤 功佑", role: "中央" },
  { name: "柴戸 海", role: "中央", alternative: "平川 怜" },
];

// 試合データには登録せず、この特集内だけで扱う独自予想。各列は画面左→右。
const predictions = [
  {
    label: "本命予想", formation: "4-4-2",
    rows: [
      forwards,
      [{ name: "新井 悠太", role: "左SH" }, ...midfield, { name: "藤本 寛也", role: "右SH" }],
      [
        { name: "溝口 修平", role: "左SB" },
        { name: "佐古 真礼", role: "左CB" },
        { name: "林 尚輝", role: "右CB", alternative: "チョ ユミン" },
        { name: "鈴木 海音", role: "右SB", alternative: "内田 陽介" },
      ],
      [goalkeeper],
    ],
  },
  {
    label: "対抗予想", formation: "3-4-1-2",
    rows: [
      forwards,
      [{ name: "藤本 寛也", role: "トップ下" }],
      [{ name: "溝口 修平", role: "左WB" }, ...midfield, { name: "福田 湧矢", role: "右WB", alternative: "内田 陽介" }],
      [
        { name: "佐古 真礼", role: "左CB" },
        { name: "林 尚輝", role: "中央CB", alternative: "チョ ユミン" },
        { name: "鈴木 海音", role: "右CB", alternative: "内田 陽介" },
      ],
      [goalkeeper],
    ],
  },
] satisfies { label: string; formation: string; rows: PredictionPlayer[][] }[];

const hiroshimaRows: PredictionPlayer[][] = [
  [{ name: "セバスティアン・アレー", role: "CF", alternative: "鮎川" }],
  [{ name: "加藤 陸次樹", role: "左シャドー" }, { name: "鈴木 章斗", role: "右シャドー" }],
  [
    { name: "東 俊希", role: "左WB" },
    { name: "川辺 駿", role: "ボランチ" },
    { name: "松本 泰志", role: "ボランチ" },
    { name: "新井 直人", role: "右WB" },
  ],
  [{ name: "佐々木 翔", role: "左CB" }, { name: "荒木 隼人", role: "中央CB" }, { name: "中野 就斗", role: "右CB" }],
  [{ name: "大迫 敬介", role: "GK" }],
];

function PredictionPitch({ rows, opponent = false }: { rows: PredictionPlayer[][]; opponent?: boolean }) {
  const line = opponent ? "border-purple-700/30" : "border-primary-green/30";
  return (
    <div className={`relative overflow-hidden border-2 px-1 py-6 lg:px-3 ${opponent ? "border-purple-800 bg-purple-50" : "border-deep-green bg-surface-tint"}`}>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-2 border ${line}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-2 top-1/2 border-t ${line}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border ${line}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-[25%] top-2 h-8 border-x border-b ${line}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-[25%] bottom-2 h-8 border-x border-t ${line}`} />
      <div className="relative grid min-h-[480px] content-between gap-6 lg:min-h-[520px]">
        {rows.map((row, index) => (
          <div key={index} className="grid items-start gap-1" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
            {row.map((player) => (
              <div key={player.name} className="min-w-0 text-center">
                <span aria-hidden="true" className={`mx-auto block size-5 rounded-full ${opponent ? "bg-purple-700" : "bg-primary-green"}`} />
                <p className={`mt-1 text-[10px] font-bold lg:text-[12px] ${opponent ? "text-purple-900" : "text-deep-green"}`}>{player.role}</p>
                <p className="break-keep break-words text-[12px] font-extrabold leading-snug text-text-primary lg:text-[15px]">{player.name}</p>
                {player.alternative && <p className="mt-1 break-keep break-words text-[11px] leading-snug text-text-secondary lg:text-[12px]">{opponent ? `（${player.alternative}）` : `（対抗：${player.alternative}）`}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HiroshimaPredictions() {
  return (
    <section aria-label="相馬新監督初陣・広島戦予想スタメン" className="space-y-4">
      <SectionHeader title="相馬新監督初陣・広島戦予想スタメン" eyebrow="PREDICTED LINEUP / 2026.10.11" />
      <p className="text-[14px] leading-relaxed text-text-primary">
        相馬直樹新監督の初戦に向けて、4-4-2と3-4-1-2の2パターンを予想しました。選手選考がフラットとされる中、どのような布陣で臨むのか注目です。
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {predictions.map((prediction) => (
          <article key={prediction.formation} aria-label={`${prediction.label} ${prediction.formation}`} className="min-w-0">
            <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-deep-green">
              <span>{prediction.label}</span><span>{prediction.formation}</span>
            </h3>
            <PredictionPitch rows={prediction.rows} />
          </article>
        ))}
      </div>
      <section aria-labelledby="hiroshima-opponent-title" className="space-y-3 border-t border-border pt-5">
        <h3 id="hiroshima-opponent-title" className="text-[18px] font-extrabold text-purple-900">サンフレッチェ広島 予想スタメン</h3>
        <p className="text-[14px] font-bold text-purple-900">3-4-2-1｜独自予想</p>
        <div className="mx-auto max-w-[596px]">
          <PredictionPitch rows={hiroshimaRows} opponent />
        </div>
        <p className="text-[12px] leading-relaxed text-text-secondary">CFのスタメン対抗候補：鮎川 峻。出場可能性やコンディションを確定する情報ではありません。</p>
      </section>
      <p className="text-[13px] font-bold leading-relaxed text-deep-green">
        ※掲載内容はVerdy Match Labによる非公式の独自予想です。クラブ発表のスターティングメンバーではありません。括弧内はスタメン対抗候補です。
      </p>
      <p className="text-[12px] leading-relaxed text-text-secondary">対抗候補は交代予定選手・ベンチ入り確定選手ではありません。</p>
    </section>
  );
}
