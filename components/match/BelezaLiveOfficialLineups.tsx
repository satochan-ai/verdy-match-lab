import { SectionHeader } from "@/components/ui/SectionHeader";
import { FormationPitch } from "@/components/match/PredictedFormation";
import type { ActualLineup, Team } from "@/types/domain";

const positions: (keyof ActualLineup["starters"])[] = ["GK", "DF", "MF", "FW"];

function TeamLineup({ team, lineup, formation }: { team: Team; lineup: ActualLineup; formation?: { formation: string; starters: { number?: number; name: string; position: string }[] } }) {
  return (
    <div className="space-y-4">
      {formation && <FormationPitch team={team} lineup={formation} idPrefix="live-official-formation" />}
      <div>
        <h3 className="text-[14px] font-extrabold text-text-primary lg:text-[16px]">{team.name}</h3>
        <p className="mt-2 text-[11px] font-bold tracking-[0.08em] text-text-secondary">STARTING XI</p>
        <ul className="mt-1 space-y-1 text-[12px] leading-relaxed text-text-secondary lg:text-[13px]">
          {positions.flatMap((position) => lineup.starters[position]).map((player) => <li key={player} className="break-words">{player}</li>)}
        </ul>
        <p className="mt-4 border-t border-border pt-3 text-[11px] font-bold tracking-[0.08em] text-text-secondary">BENCH / ベンチ</p>
        <ul className="mt-1 space-y-1 text-[12px] leading-relaxed text-text-secondary lg:text-[13px]">
          {positions.flatMap((position) => lineup.bench[position]).map((player) => <li key={player} className="break-words">{player}</li>)}
        </ul>
      </div>
    </div>
  );
}

export function BelezaLiveOfficialLineups({ belezaTeam, belezaLineup, belezaFormation, opponentTeam, opponentLineup }: { belezaTeam: Team; belezaLineup: ActualLineup; belezaFormation: { formation: string; starters: { number?: number; name: string; position: string }[] }; opponentTeam: Team; opponentLineup: ActualLineup }) {
  return (
    <section>
      <SectionHeader title="公式スタメン" eyebrow="OFFICIAL LINEUP" />
      <div className="space-y-7 border-y border-border bg-surface px-3 py-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <TeamLineup team={belezaTeam} lineup={belezaLineup} formation={belezaFormation} />
        <TeamLineup team={opponentTeam} lineup={opponentLineup} />
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">公式発表されたStarting XI・ベンチを掲載しています。INAC神戸の開始時フォーメーションは未確認のため掲載していません。</p>
    </section>
  );
}
