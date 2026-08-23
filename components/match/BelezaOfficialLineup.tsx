import { FormationPitch } from "@/components/match/PredictedFormation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PredictedLineup, Team } from "@/types/domain";

const positions = ["GK", "DF", "MF", "FW"] as const;

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

/**
 * ジェフ千葉レディース側は公式にformationが確認できないため、pitch表示は行わず
 * 登録ポジション付きのリストのみで扱う（U21OfficialLineupsと同じ方針）。
 */
function OpponentStartingList({
  teamName,
  starters,
}: {
  teamName: string;
  starters: { number: number; position: (typeof positions)[number]; name: string }[];
}) {
  return (
    <div className="space-y-4">
      <p className="text-[13px] font-bold text-text-primary">{teamName}</p>
      <dl className="space-y-2 text-[12px] lg:text-[13px]">
        {positions.map((position) => {
          const players = starters.filter((player) => player.position === position);
          if (players.length === 0) return null;

          return (
            <div key={position} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2">
              <dt className="font-bold text-text-secondary">{position}</dt>
              <dd className="min-w-0 space-y-1 leading-relaxed text-text-primary">
                {players.map((player) => (
                  <p key={player.number} className="break-words">
                    {player.number} {player.name}
                  </p>
                ))}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export function BelezaOfficialLineup({
  belezaTeam,
  belezaLineup,
  belezaBench,
  opponentTeamName,
  opponentStarters,
  opponentBench,
}: {
  belezaTeam: Team;
  belezaLineup: PredictedLineup;
  belezaBench: string[];
  opponentTeamName: string;
  opponentStarters: { number: number; position: (typeof positions)[number]; name: string }[];
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
          <OpponentStartingList teamName={opponentTeamName} starters={opponentStarters} />
          <BenchList players={opponentBench} />
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
        公式発表されたStarting XI・ベンチです。ベレーザは公式確認情報を基にフォーメーションを表示。ジェフ千葉レディースはフォーメーションが公式に確認できないため、登録ポジション付きのリスト表示のみとしています。
      </p>
    </section>
  );
}
