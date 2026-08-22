import { FormationPitch } from "@/components/match/PredictedFormation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type {
  ActualLineup,
  PositionPlayerGroups,
  PredictedLineup,
  Team,
} from "@/types/domain";

const positions: (keyof PositionPlayerGroups)[] = ["GK", "DF", "MF", "FW"];

function parsePlayer(player: string, position: keyof PositionPlayerGroups) {
  const match = player.match(/^(\d+)\s+(.+)$/);

  if (!match) {
    return { name: player, position };
  }

  return { number: Number(match[1]), name: match[2], position };
}

function toPitchLineup(lineup: ActualLineup): PredictedLineup | undefined {
  if (!lineup.formation) return undefined;

  return {
    formation: lineup.formation,
    starters: positions.flatMap((position) =>
      lineup.starters[position].map((player) => parsePlayer(player, position))
    ),
  };
}

function Bench({ lineup }: { lineup: ActualLineup }) {
  return (
    <div className="border-t border-border pt-3">
      <p className="text-[11px] font-bold tracking-[0.08em] text-text-secondary">
        BENCH / ベンチ
      </p>
      <dl className="mt-2 space-y-1.5 text-[12px] lg:text-[13px]">
        {positions.map((position) => {
          const players = lineup.bench[position];
          if (players.length === 0) return null;

          return (
            <div key={position} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
              <dt className="font-bold text-text-primary">{position}</dt>
              <dd className="min-w-0 break-words leading-relaxed text-text-secondary">
                {players.join(" / ")}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function TeamOfficialLineup({ team, lineup }: { team: Team; lineup: ActualLineup }) {
  const pitchLineup = toPitchLineup(lineup);
  if (!pitchLineup) return null;

  return (
    <div className="space-y-4">
      <FormationPitch team={team} lineup={pitchLineup} idPrefix="official-formation" />
      <Bench lineup={lineup} />
    </div>
  );
}

export function OfficialLineups({
  homeTeam,
  awayTeam,
  lineups,
}: {
  homeTeam: Team;
  awayTeam: Team;
  lineups: { home: ActualLineup; away: ActualLineup };
}) {
  return (
    <section>
      <SectionHeader title="公式スタメン" eyebrow="OFFICIAL LINEUP" />
      <div className="space-y-7 border-y border-border bg-surface px-3 py-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <TeamOfficialLineup team={homeTeam} lineup={lineups.home} />
        <TeamOfficialLineup team={awayTeam} lineup={lineups.away} />
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
        公式発表されたStarting XI・フォーメーション・ベンチです。
      </p>
    </section>
  );
}
