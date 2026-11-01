import type { LineupOption, PredictedLineup, Team } from "@/types/domain";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PredictedFormation } from "@/components/match/PredictedFormation";

function OptionLineupList({ lineup }: { lineup: PredictedLineup }) {
  return (
    <ul className="mt-1 grid grid-cols-2 gap-x-3 md:grid-cols-1">
      {lineup.starters.map((starter, index) => (
        <li
          key={`${starter.position}-${starter.number ?? "tbd"}-${starter.name}-${index}`}
          className="grid min-w-0 grid-cols-[2.5rem_1.5rem_minmax(0,1fr)] items-start gap-x-1 border-b border-border py-1.5 text-[12px] lg:grid-cols-[3rem_2rem_minmax(0,1fr)] lg:py-2 lg:text-[13px]"
        >
          <span className="text-[10px] font-bold text-text-secondary lg:text-[11px]">
            {starter.position}
          </span>
          <span className="tabular-nums text-right text-text-secondary">
            {starter.number ?? "—"}
          </span>
          <span className="min-w-0 pl-1">
            <span className="block whitespace-normal break-keep break-words font-bold leading-tight text-text-primary">
              {starter.name}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * 自チーム（東京V）側の予想スタメン複数案。相手側の予想スタメンが未提供の試合向け
 * （predictedLineups.home/awayのような必須ペアを要求しない）。各案をFormationPitchで
 * 画面左→右のまま描画する（PredictedLineupsと同じstarters配列順＝そのまま画面左→右）。
 */
export function VerdyLineupOptions({ team, options }: { team: Team; options: LineupOption[] }) {
  if (options.length === 0) return null;

  return (
    <section>
      <SectionHeader title="予想スタメン" eyebrow="PREDICTED LINEUP" />
      <details open className="border-y border-border bg-surface">
        <summary className="cursor-pointer px-3 py-2 text-[12px] font-bold text-text-secondary">
          予想スタメン{options.length}案を見る
        </summary>
        <div className="space-y-6 border-t border-border px-3 py-3 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          {options.map((option) => (
            <div key={option.label}>
              <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
                <h3 className="min-w-0 text-[13px] font-bold text-primary-green lg:text-[14px]">
                  {option.label}
                </h3>
                <p className="shrink-0 text-[12px] font-bold tabular-nums text-text-secondary">
                  {option.lineup.formation}
                </p>
              </div>
              <OptionLineupList lineup={option.lineup} />
            </div>
          ))}
        </div>
        <div className="section-reveal space-y-6 border-t border-border px-3 py-3">
          <p className="text-[11px] font-bold tracking-[0.08em] text-text-secondary">
            PREDICTED FORMATION / 予想フォーメーション
          </p>
          <div className="space-y-8 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            {options.map((option) => (
              <div key={option.label} className="space-y-2">
                <p className="text-[12px] font-bold text-primary-green">{option.label}</p>
                <PredictedFormation team={team} lineup={option.lineup} />
                {option.note && (
                  <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
                    {option.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </details>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
        試合前の予想です。相手の予想スタメンは今回未確定のため掲載していません。実際の先発メンバーとは異なる場合があります。
      </p>
    </section>
  );
}
