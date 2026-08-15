import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ActualLineup, MatchCard, MatchGoal, PositionPlayerGroups } from "@/types/domain";

const positions: (keyof PositionPlayerGroups)[] = ["GK", "DF", "MF", "FW"];

function PlayerGroups({ groups }: { groups: PositionPlayerGroups }) {
  return (
    <dl className="space-y-1.5 text-[12px]">
      {positions.map((position) => (
        <div key={position} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
          <dt className="font-bold text-text-primary">{position}</dt>
          <dd className="min-w-0 leading-relaxed text-text-secondary">{groups[position].join(" / ")}</dd>
        </div>
      ))}
    </dl>
  );
}

function TeamActualLineup({ teamLabel, lineup }: { teamLabel: string; lineup: ActualLineup }) {
  const benchCount = positions.reduce((count, position) => count + lineup.bench[position].length, 0);

  return (
    <div>
      <p className="text-[12px] font-bold text-text-primary">{teamLabel}</p>
      <div className="mt-1.5">
        <PlayerGroups groups={lineup.starters} />
      </div>
      <details className="mt-2 border-t border-border pt-2">
        <summary className="cursor-pointer text-[11px] font-bold text-text-secondary">
          ベンチ {benchCount}名
        </summary>
        <div className="pt-2">
          <PlayerGroups groups={lineup.bench} />
        </div>
      </details>
    </div>
  );
}

/**
 * 試合終了後の試合記録（得点・警告退場・実際のStarting XI/Bench）。
 * Final Score → 三策の答え合わせ → MATCH REVIEW という既存POSTの主役の流れを崩さない、
 * supporting informationとしての配置を前提にしている。
 */
export function MatchRecord({
  homeTeamName,
  awayTeamName,
  goals,
  cards,
  actualLineups,
}: {
  homeTeamName: string;
  awayTeamName: string;
  goals?: MatchGoal[];
  cards?: MatchCard[];
  actualLineups?: { home: ActualLineup; away: ActualLineup };
}) {
  if (!goals?.length && !cards?.length && !actualLineups) return null;

  return (
    <section>
      <SectionHeader title="試合記録" eyebrow="MATCH RECORD" />
      <div className="border-y border-border bg-surface px-3 py-3">
        {goals && goals.length > 0 && (
          <div className="border-b border-border pb-3">
            <p className="mb-1.5 text-[11px] font-bold tracking-[0.08em] text-text-secondary">
              GOALS / 得点
            </p>
            <ul className="divide-y divide-border text-[12px] text-text-secondary lg:text-[13px]">
              {goals.map((goal) => (
                <li key={`${goal.minute}-${goal.scorer}`} className="flex items-baseline gap-2 py-1">
                  <span className="w-10 shrink-0 tabular-nums font-bold text-text-primary">
                    {goal.minute}
                  </span>
                  <span className="min-w-0 truncate">
                    {goal.scorer}（{goal.team}）
                    {goal.assist && <span className="text-text-secondary"> assist: {goal.assist}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {cards && cards.length > 0 && (
          <div className="border-b border-border py-3">
            <p className="mb-1.5 text-[11px] font-bold tracking-[0.08em] text-text-secondary">
              CARDS / 警告・退場
            </p>
            <ul className="divide-y divide-border text-[12px] text-text-secondary lg:text-[13px]">
              {cards.map((card) => (
                <li key={`${card.minute ?? "?"}-${card.player}`} className="flex items-baseline gap-2 py-1">
                  <span className="w-10 shrink-0 tabular-nums font-bold text-text-primary">
                    {card.minute ?? "—"}
                  </span>
                  <span className="min-w-0 truncate">
                    {card.player}（{card.team}）
                    <span className="ml-1 text-[10px] font-bold text-warning">
                      {card.type === "yellow" ? "YELLOW" : "RED"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {actualLineups && (
          <div className="space-y-4 pt-3">
            <p className="text-[11px] font-bold tracking-[0.08em] text-text-primary">
              STARTING XI / 実際のスタメン
            </p>
            <TeamActualLineup teamLabel={homeTeamName} lineup={actualLineups.home} />
            <TeamActualLineup teamLabel={awayTeamName} lineup={actualLineups.away} />
          </div>
        )}
      </div>
    </section>
  );
}
