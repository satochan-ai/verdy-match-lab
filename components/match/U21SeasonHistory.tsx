import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";
import type { U21SeasonHistoryView } from "@/lib/data/u21-fixtures";

/**
 * U-21の今季試合履歴（RECENT表示）。今季のみを蓄積する軽量リストで、
 * TOP TEAMのMATCH SCHEDULEとは独立したU-21専用の最小コンポーネント。
 *
 * detailMatchIdを持つ試合のみ行全体をLinkにし、無い試合は架空IDでリンク化しない。
 *
 * レイアウト: モバイルは上段（RECENT・日付・節・勝敗）と下段（HOME・スコア・AWAY）の2段、
 * md以上は従来どおり1行の横並び。スコアは独立要素で折り返さず、チーム名は省略せず折り返す。
 */
const rowClassName =
  "grid min-h-11 grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 py-3 text-[13px] md:grid-cols-[auto_auto_minmax(0,1fr)_auto_auto]";

export function U21SeasonHistory({ entries }: { entries: U21SeasonHistoryView[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {entries.map((entry, index) => (
        <li key={entry.id}>
          {entry.detailMatchId ? (
            <Link href={`/u21/matches/${entry.detailMatchId}`} className={rowClassName}>
              <HistoryRow entry={entry} index={index} />
            </Link>
          ) : (
            <div className={rowClassName}>
              <HistoryRow entry={entry} index={index} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function HistoryRow({ entry, index }: { entry: U21SeasonHistoryView; index: number }) {
  return (
    <>
      <span className="col-start-1 row-start-1 text-[11px] font-bold whitespace-nowrap text-text-secondary">
        RECENT {index + 1}
      </span>
      <span className="col-start-2 row-start-1 whitespace-nowrap tabular-nums text-text-secondary">
        {entry.dateLabel}
      </span>
      <span className="col-start-3 row-start-1 min-w-0 text-[10px] font-bold text-text-secondary md:col-start-4">
        {entry.round}
      </span>
      <span className="col-start-4 row-start-1 justify-self-end md:col-start-5">
        <StatusBadge variant={entry.result} />
      </span>
      <span className="col-span-4 col-start-1 row-start-2 grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-3 text-text-primary md:col-span-1 md:col-start-3 md:row-start-1">
        <span className="min-w-0 text-right break-words">{entry.homeTeamName}</span>
        <span className="whitespace-nowrap text-[15px] font-bold tabular-nums md:text-[13px]">
          {entry.homeScore}-{entry.awayScore}
        </span>
        <span className="min-w-0 text-left break-words">{entry.awayTeamName}</span>
      </span>
    </>
  );
}
