import type { PredictedLineup, Team } from "@/types/domain";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PredictedFormation } from "@/components/match/PredictedFormation";

function TeamLineup({ team, lineup }: { team: Team; lineup: PredictedLineup }) {
  return (
    <section aria-labelledby={`predicted-lineup-${team.id}`}>
      <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
        <h3
          id={`predicted-lineup-${team.id}`}
          className={`min-w-0 text-[13px] font-bold lg:text-[14px] ${
            team.isVerdy ? "text-primary-green" : "text-text-primary"
          }`}
        >
          {team.name}
        </h3>
        <p className="shrink-0 text-[12px] font-bold tabular-nums text-text-secondary">
          {lineup.formation}
        </p>
      </div>

      <ul className="mt-1 grid grid-cols-2 gap-x-3 md:grid-cols-1">
        {lineup.starters.map((starter, index) => (
          <li
            key={`${starter.position}-${starter.number ?? "tbd"}-${starter.name}-${index}`}
            className="grid min-w-0 grid-cols-[1.5rem_1.5rem_minmax(0,1fr)] items-start gap-x-1 border-b border-border py-1.5 text-[12px] lg:grid-cols-[2rem_2rem_minmax(0,1fr)] lg:py-2 lg:text-[13px]"
          >
            <span className="text-[10px] font-bold text-text-secondary lg:text-[11px]">
              {starter.position}
            </span>
            <span className="tabular-nums text-right text-text-secondary">
              {starter.number ?? "—"}
            </span>
            <span className="min-w-0 pl-1">
              <span className="block truncate font-bold text-text-primary">{starter.name}</span>
              {starter.alternative && (
                <span className="block truncate text-[10px] font-normal text-text-secondary lg:text-[11px]">
                  別候補：{starter.alternative}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PredictedLineups({
  homeTeam,
  awayTeam,
  lineups,
}: {
  homeTeam: Team;
  awayTeam: Team;
  lineups: { home: PredictedLineup; away: PredictedLineup };
}) {
  return (
    <section>
      <SectionHeader title="予想スタメン" eyebrow="PREDICTED LINEUP" />
      <details open className="border-y border-border bg-surface">
        <summary className="cursor-pointer px-3 py-2 text-[12px] font-bold text-text-secondary">
          両チームの予想を見る
        </summary>
        <div className="space-y-5 border-t border-border px-3 py-3 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          <TeamLineup team={homeTeam} lineup={lineups.home} />
          <TeamLineup team={awayTeam} lineup={lineups.away} />
        </div>
        <div className="section-reveal space-y-5 border-t border-border px-3 py-3">
          <p className="text-[11px] font-bold tracking-[0.08em] text-text-secondary">
            PREDICTED FORMATION / 予想フォーメーション
          </p>
          <div className="space-y-5 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            <PredictedFormation team={homeTeam} lineup={lineups.home} />
            <PredictedFormation team={awayTeam} lineup={lineups.away} />
          </div>
        </div>
      </details>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
        試合前の予想です。実際の先発メンバーとは異なる場合があります。
      </p>
    </section>
  );
}
