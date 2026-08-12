import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PositionPlayerGroups, PreviousMatch } from "@/types/domain";

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

export function PreviousMatchSummary({ previousMatch }: { previousMatch: PreviousMatch }) {
  const benchCount = positions.reduce((count, position) => count + previousMatch.bench[position].length, 0);

  return (
    <section>
      <SectionHeader title="東京V 前節" eyebrow="LAST MATCH" />
      <div className="border-y border-border bg-surface px-3 py-3">
        <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-text-primary lg:text-[14px]">
              {previousMatch.opponent}
            </p>
            <p className="mt-0.5 text-[11px] text-text-secondary">{previousMatch.label}</p>
          </div>
          <p className="shrink-0 text-[22px] font-extrabold tabular-nums text-text-primary lg:text-[26px]">
            {previousMatch.score}
          </p>
        </div>
        {previousMatch.goals && previousMatch.goals.length > 0 && (
          <div className="border-b border-border py-3">
            <p className="mb-1.5 text-[11px] font-bold tracking-[0.08em] text-text-secondary">
              GOALS / 得点
            </p>
            <ul className="divide-y divide-border text-[12px] text-text-secondary lg:text-[13px]">
              {previousMatch.goals.map((goal) => (
                <li key={`${goal.minute}-${goal.scorer}`} className="flex items-baseline gap-2 py-1">
                  <span className="w-8 shrink-0 tabular-nums font-bold text-text-primary">
                    {goal.minute}
                  </span>
                  <span className="min-w-0 truncate">
                    {goal.scorer}（{goal.team}）
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="pt-3">
          <p className="mb-2 text-[11px] font-bold tracking-[0.08em] text-text-primary">STARTERS / 前節スタメン</p>
          <PlayerGroups groups={previousMatch.starters} />
        </div>
        <details className="mt-3 border-t border-border pt-2">
          <summary className="cursor-pointer text-[11px] font-bold text-text-secondary">
            前節ベンチ {benchCount}名
          </summary>
          <div className="pt-3">
            <PlayerGroups groups={previousMatch.bench} />
          </div>
        </details>
      </div>
    </section>
  );
}
