import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { BelezaSeasonHistoryView } from "@/lib/data/beleza-fixtures";

/**
 * ベレーザの今季試合履歴（RECENT表示）。今季のみを蓄積する軽量リストで、
 * U21SeasonHistoryと同じ考え方だがBELEZA専用データに依存する独立コンポーネント。
 *
 * detailMatchIdを持つ試合のみ行全体をLinkにする（/beleza/matches/[id]はdetailMatchIdが
 * 存在する試合しか描画できないため、無い試合まで架空IDでリンク化しない）。
 */
export function BelezaSeasonHistory({ entries }: { entries: BelezaSeasonHistoryView[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {entries.map((entry, index) => {
        const rowContent = (
          <>
            <span className="shrink-0 text-[11px] font-bold text-text-secondary">
              RECENT {index + 1}
            </span>
            <span className="shrink-0 tabular-nums text-text-secondary">{entry.dateLabel}</span>
            <span className="min-w-0 flex-1 truncate text-text-primary">
              {entry.homeTeamName} {entry.homeScore}-{entry.awayScore} {entry.awayTeamName}
            </span>
            <span className="shrink-0 text-[10px] font-bold text-text-secondary">{entry.round}</span>
            <StatusBadge variant={entry.result} />
          </>
        );

        return (
          <li key={entry.id}>
            {entry.detailMatchId ? (
              <Link
                href={`/beleza/matches/${entry.detailMatchId}`}
                className="flex min-h-11 items-center gap-3 py-3 text-[13px]"
                aria-label={`${entry.dateLabel} ${entry.homeTeamName} ${entry.homeScore}-${entry.awayScore} ${entry.awayTeamName}（${entry.round}）の試合詳細を見る`}
              >
                {rowContent}
              </Link>
            ) : (
              <div className="flex min-h-11 items-center gap-3 py-3 text-[13px]">{rowContent}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
