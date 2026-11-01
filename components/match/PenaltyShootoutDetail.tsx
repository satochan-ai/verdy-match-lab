import { SectionHeader } from "@/components/ui/SectionHeader";
import { hasPenaltyKicks } from "@/lib/match/penalty";
import type { Match, PenaltyKickResult } from "@/types/domain";

function KickList({ teamName, score, kicks }: { teamName: string; score: number; kicks: PenaltyKickResult[] }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
        <h3 className="min-w-0 break-words text-[13px] font-bold text-text-primary">{teamName}</h3>
        <p className="shrink-0 tabular-nums text-[15px] font-extrabold text-text-primary">{score}</p>
      </div>
      <ul className="divide-y divide-border text-[12px] lg:text-[13px]">
        {kicks.map((kick) => (
          <li key={kick.order} className="grid grid-cols-[1.25rem_minmax(0,1fr)_auto] items-center gap-x-2 py-1.5">
            <span className="tabular-nums text-text-secondary">{kick.order}</span>
            <span className="min-w-0 break-words font-bold text-text-primary">{kick.player}</span>
            <span
              className={`flex items-center gap-1 text-[11px] font-bold ${kick.result === "goal" ? "text-primary-green" : "text-error"}`}
            >
              <span aria-hidden="true">{kick.result === "goal" ? "○" : "✕"}</span>
              {kick.result === "goal" ? "GOAL" : "MISS"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * PK戦のキッカー個別結果。homeKicks/awayKicksのどちらかにデータがある試合のみ表示し、
 * PKスコアだけの試合・PK戦のない試合では何も描画しない（従来表示のまま）。
 * モバイルは縦積み、デスクトップは左右2列（HOME/AWAYは試合カードと同じ並び）。
 */
export function PenaltyShootoutDetail({ match }: { match: Match }) {
  const pk = match.penaltyShootout;
  if (!pk || !hasPenaltyKicks(match)) return null;

  const homeKicks = pk.homeKicks ?? [];
  const awayKicks = pk.awayKicks ?? [];

  return (
    <section className="mt-6">
      <SectionHeader title="PK戦詳細" eyebrow="PK SHOOTOUT" caption={`PK戦 ${pk.homeScore}-${pk.awayScore}`} />
      <div className="space-y-5 border-y border-border bg-surface px-3 py-3 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
        <KickList teamName={match.homeTeam.name} score={pk.homeScore} kicks={homeKicks} />
        <KickList teamName={match.awayTeam.name} score={pk.awayScore} kicks={awayKicks} />
      </div>
    </section>
  );
}
