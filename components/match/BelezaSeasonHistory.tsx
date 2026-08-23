import { StatusBadge } from "@/components/ui/StatusBadge";
import type { BelezaSeasonHistoryEntry } from "@/lib/mock/beleza";

/**
 * ベレーザの今季試合履歴（RECENT表示）。今季のみを蓄積する軽量リストで、
 * U21SeasonHistoryと同じ考え方だがBELEZA専用データに依存する独立コンポーネント。
 */
export function BelezaSeasonHistory({ entries }: { entries: BelezaSeasonHistoryEntry[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {entries.map((entry, index) => (
        <li key={entry.id} className="flex items-center gap-3 py-3 text-[13px]">
          <span className="shrink-0 text-[11px] font-bold text-text-secondary">
            RECENT {index + 1}
          </span>
          <span className="shrink-0 tabular-nums text-text-secondary">{entry.dateLabel}</span>
          <span className="min-w-0 flex-1 truncate text-text-primary">
            {entry.homeTeamName} {entry.homeScore}-{entry.awayScore} {entry.awayTeamName}
          </span>
          <span className="shrink-0 text-[10px] font-bold text-text-secondary">{entry.round}</span>
          <StatusBadge variant={entry.result} />
        </li>
      ))}
    </ul>
  );
}
