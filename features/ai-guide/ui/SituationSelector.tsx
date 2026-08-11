import type { ScoreSituation, SpecialSituation, TimeSegment } from "@/types/domain";

const scoreOptions: { key: ScoreSituation; label: string }[] = [
  { key: "even", label: "同点" },
  { key: "lead_1", label: "1点リード" },
  { key: "behind_1", label: "1点ビハインド" },
  { key: "lead_2plus", label: "2点以上リード" },
  { key: "behind_2plus", label: "2点以上ビハインド" },
];

const timeOptions: { key: TimeSegment; label: string }[] = [
  { key: "first_early", label: "前半序盤" },
  { key: "first_mid", label: "前半中盤" },
  { key: "first_late", label: "前半終盤" },
  { key: "second_early", label: "後半序盤" },
  { key: "second_mid", label: "後半中盤" },
  { key: "second_late", label: "後半終盤" },
];

const specialOptions: { key: SpecialSituation; label: string }[] = [
  { key: "red_card_own", label: "退場者あり" },
  { key: "red_card_opponent", label: "相手に退場者あり" },
  { key: "under_pressure", label: "押し込まれている" },
  { key: "attacking_no_goal", label: "攻めているが点が取れない" },
  { key: "cannot_keep_possession", label: "ボールを持てない" },
];

export function SituationSelector({
  scoreSituation,
  timeSegment,
  specials,
  onScoreChange,
  onTimeChange,
  onSpecialToggle,
}: {
  scoreSituation: ScoreSituation | null;
  timeSegment: TimeSegment | null;
  specials: SpecialSituation[];
  onScoreChange: (v: ScoreSituation) => void;
  onTimeChange: (v: TimeSegment) => void;
  onSpecialToggle: (v: SpecialSituation) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-[13px] font-bold text-text-primary">スコア状況</p>
        <div className="flex flex-wrap gap-2">
          {scoreOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onScoreChange(opt.key)}
              aria-pressed={scoreSituation === opt.key}
              className={`h-9 rounded-md border px-3 text-[13px] font-bold ${
                scoreSituation === opt.key
                  ? "border-primary-green bg-primary-green text-white"
                  : "border-border text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-bold text-text-primary">時間帯</p>
        <div className="grid grid-cols-3 gap-2">
          {timeOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onTimeChange(opt.key)}
              aria-pressed={timeSegment === opt.key}
              className={`h-9 rounded-md border px-2 text-[12px] font-bold ${
                timeSegment === opt.key
                  ? "border-primary-green bg-primary-green text-white"
                  : "border-border text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-bold text-text-primary">特殊状況（任意・複数選択可）</p>
        <div className="flex flex-wrap gap-2">
          {specialOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSpecialToggle(opt.key)}
              aria-pressed={specials.includes(opt.key)}
              className={`h-9 rounded-md border px-3 text-[12px] font-bold ${
                specials.includes(opt.key)
                  ? "border-primary-green bg-primary-green text-white"
                  : "border-border text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
