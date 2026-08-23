import { FormationPitch } from "@/components/match/PredictedFormation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PredictedLineup, Team } from "@/types/domain";

function BenchList({ players }: { players: string[] }) {
  return (
    <div className="border-t border-border pt-3">
      <p className="text-[11px] font-bold tracking-[0.08em] text-text-secondary">
        BENCH / ベンチ
      </p>
      <ul className="mt-2 space-y-1 text-[12px] leading-relaxed text-text-secondary lg:text-[13px]">
        {players.map((player) => (
          <li key={player} className="break-words">
            {player}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BelezaOfficialLineup({
  belezaTeam,
  belezaLineup,
  belezaBench,
  opponentTeam,
  opponentLineup,
  opponentBench,
}: {
  belezaTeam: Team;
  belezaLineup: PredictedLineup;
  belezaBench: string[];
  opponentTeam: Team;
  opponentLineup: PredictedLineup;
  opponentBench: string[];
}) {
  return (
    <section>
      <SectionHeader title="公式スタメン" eyebrow="OFFICIAL LINEUP" />
      <div className="space-y-7 border-y border-border bg-surface px-3 py-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <div className="space-y-4">
          <FormationPitch team={belezaTeam} lineup={belezaLineup} idPrefix="official-formation" />
          <BenchList players={belezaBench} />
        </div>
        <div className="space-y-4">
          <FormationPitch team={opponentTeam} lineup={opponentLineup} idPrefix="official-formation" />
          <BenchList players={opponentBench} />
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
        公式発表されたStarting XI・フォーメーション・ベンチです。
      </p>
    </section>
  );
}
