import { SectionHeader } from "@/components/ui/SectionHeader";
import type { U21OfficialLineup } from "@/lib/mock/u21";

const positions: (keyof U21OfficialLineup["starters"])[] = ["GK", "DF", "MF", "FW"];

function TeamLineup({ teamName, lineup }: { teamName: string; lineup: U21OfficialLineup }) {
  return (
    <div className="space-y-4">
      <p className="text-[13px] font-bold text-text-primary">{teamName}</p>

      <dl className="space-y-2 text-[12px] lg:text-[13px]">
        {positions.map((position) => {
          const players = lineup.starters[position];
          if (players.length === 0) return null;

          return (
            <div key={position} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2">
              <dt className="font-bold text-text-secondary">{position}</dt>
              <dd className="min-w-0 space-y-1 leading-relaxed text-text-primary">
                {players.map((player) => (
                  <p key={player} className="break-words">
                    {player}
                  </p>
                ))}
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="border-t border-border pt-3">
        <p className="text-[11px] font-bold tracking-[0.08em] text-text-secondary">
          BENCH / ベンチ
        </p>
        <dl className="mt-2 space-y-1.5 text-[12px] lg:text-[13px]">
          {positions.map((position) => {
            const players = lineup.bench[position];
            if (players.length === 0) return null;

            return (
              <div key={position} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2">
                <dt className="font-bold text-text-primary">{position}</dt>
                <dd className="min-w-0 break-words leading-relaxed text-text-secondary">
                  {players.join(" / ")}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}

/**
 * U-21の公式スタメン・ベンチ表示。formationが公式確認できないため
 * トップチームのOfficialLineups.tsxとは異なり、pitch図は持たないリスト形式のみ。
 */
export function U21OfficialLineups({
  homeTeamName,
  awayTeamName,
  homeLineup,
  awayLineup,
}: {
  homeTeamName: string;
  awayTeamName: string;
  homeLineup: U21OfficialLineup;
  awayLineup: U21OfficialLineup;
}) {
  return (
    <section>
      <SectionHeader title="公式スタメン" eyebrow="OFFICIAL LINEUP" />
      <div className="space-y-7 border-y border-border bg-surface px-3 py-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <TeamLineup teamName={homeTeamName} lineup={homeLineup} />
        <TeamLineup teamName={awayTeamName} lineup={awayLineup} />
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
        公式発表されたStarting XI・ベンチです。フォーメーションは公式に確認できないため掲載していません。
      </p>
    </section>
  );
}
