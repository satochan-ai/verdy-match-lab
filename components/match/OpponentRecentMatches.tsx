import type { OpponentRecentMatch } from "@/types/domain";
import { SectionHeader } from "@/components/ui/SectionHeader";

const RESULT_LABEL = { W: "○", D: "△", L: "●" } as const;

export function OpponentRecentMatches({ matches }: { matches: OpponentRecentMatch[] }) {
  if (matches.length === 0) return null;
  const summary = matches.reduce(
    (acc, match) => {
      acc[match.result] += 1;
      acc.goalsFor += match.scoreFor;
      acc.goalsAgainst += match.scoreAgainst;
      return acc;
    },
    { W: 0, D: 0, L: 0, goalsFor: 0, goalsAgainst: 0 },
  );

  return (
    <section>
      <SectionHeader title="対戦相手 直近5試合" eyebrow="OPPONENT LAST 5" />
      <div className="border-y border-border bg-surface px-3 py-2 text-[12px] text-text-primary">
        <div className="space-y-1.5">
          {matches.map((match) => (
            <div key={`${match.date}-${match.opponent}`} className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-2">
              <span className="tabular-nums text-text-secondary">{match.date.slice(5).replace("-", "/")}</span>
              <span className="min-w-0 truncate">{match.competition}　{match.homeAway}　{match.opponent}</span>
              <span className="whitespace-nowrap tabular-nums">{RESULT_LABEL[match.result]} {match.scoreFor}-{match.scoreAgainst}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 border-t border-border pt-2 font-bold">
          {summary.W}勝{summary.D}分{summary.L}敗 / {summary.goalsFor}得点{summary.goalsAgainst}失点
        </p>
      </div>
    </section>
  );
}
