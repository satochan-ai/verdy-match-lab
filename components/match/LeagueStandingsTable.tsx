import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LeagueStandings } from "@/types/standings";

/**
 * J1順位表。デスクトップは1〜20位のフルテーブル、モバイルは横スクロール前提の
 * 巨大tableにせず、優先度の高い列（順位・クラブ・勝点・試合数・得失点差）のみを
 * 1行ずつ表示する。列を絞るのは表示上のみで、entries自体（勝敗分・得点・失点等）は
 * 削らずそのまま保持する。
 */
export function LeagueStandingsTable({ standings, highlightTeamName }: { standings: LeagueStandings; highlightTeamName: string }) {
  return (
    <section>
      <SectionHeader title="順位表" eyebrow="J1 STANDINGS" caption={standings.asOfLabel} />

      <div className="hidden overflow-x-auto border-y border-border bg-surface md:block">
        <table className="w-full text-[12px] lg:text-[13px]">
          <thead>
            <tr className="border-b border-border text-text-secondary">
              <th className="px-2 py-2 text-right font-bold">順位</th>
              <th className="px-2 py-2 text-left font-bold">クラブ</th>
              <th className="px-2 py-2 text-right font-bold">勝点</th>
              <th className="px-2 py-2 text-right font-bold">試</th>
              <th className="px-2 py-2 text-right font-bold">勝</th>
              <th className="px-2 py-2 text-right font-bold">分</th>
              <th className="px-2 py-2 text-right font-bold">負</th>
              <th className="px-2 py-2 text-right font-bold">得点</th>
              <th className="px-2 py-2 text-right font-bold">失点</th>
              <th className="px-2 py-2 text-right font-bold">得失</th>
            </tr>
          </thead>
          <tbody>
            {standings.entries.map((entry) => {
              const isHighlighted = entry.teamName === highlightTeamName;
              return (
                <tr
                  key={entry.rank}
                  className={`border-b border-border last:border-b-0 ${
                    isHighlighted ? "border-l-4 border-l-primary-green bg-primary-green/[0.06]" : ""
                  }`}
                >
                  <td className="tabular-nums px-2 py-2 text-right font-bold text-text-primary">{entry.rank}</td>
                  <td className={`min-w-0 px-2 py-2 text-left ${isHighlighted ? "font-bold text-primary-green" : "text-text-primary"}`}>
                    <span className="break-words">{entry.teamName}</span>
                  </td>
                  <td className="tabular-nums px-2 py-2 text-right font-bold text-text-primary">{entry.points}</td>
                  <td className="tabular-nums px-2 py-2 text-right text-text-secondary">{entry.played}</td>
                  <td className="tabular-nums px-2 py-2 text-right text-text-secondary">{entry.wins}</td>
                  <td className="tabular-nums px-2 py-2 text-right text-text-secondary">{entry.draws}</td>
                  <td className="tabular-nums px-2 py-2 text-right text-text-secondary">{entry.losses}</td>
                  <td className="tabular-nums px-2 py-2 text-right text-text-secondary">{entry.goalsFor}</td>
                  <td className="tabular-nums px-2 py-2 text-right text-text-secondary">{entry.goalsAgainst}</td>
                  <td className="tabular-nums px-2 py-2 text-right text-text-secondary">{entry.goalDifference}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="border-y border-border bg-surface md:hidden">
        {standings.entries.map((entry) => {
          const isHighlighted = entry.teamName === highlightTeamName;
          return (
            <li
              key={entry.rank}
              className={`flex items-center gap-2 border-b border-border px-3 py-2.5 last:border-b-0 ${
                isHighlighted ? "border-l-4 border-l-primary-green bg-primary-green/[0.06]" : ""
              }`}
            >
              <span className="tabular-nums w-6 shrink-0 text-right text-[13px] font-bold text-text-primary">
                {entry.rank}
              </span>
              <span
                className={`min-w-0 flex-1 break-words text-[13px] leading-snug ${
                  isHighlighted ? "font-bold text-primary-green" : "text-text-primary"
                }`}
              >
                {entry.teamName}
              </span>
              <span className="tabular-nums shrink-0 text-right text-[12px] text-text-secondary">
                {entry.played}試合
              </span>
              <span className="tabular-nums shrink-0 text-right text-[12px] text-text-secondary">
                {entry.goalDifference >= 0 ? `+${entry.goalDifference}` : entry.goalDifference}
              </span>
              <span className="tabular-nums w-10 shrink-0 text-right text-[14px] font-bold text-text-primary">
                {entry.points}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
        {standings.competition}
        {standings.sourceUrl && "　／　Source: 東京ヴェルディ公式"}
      </p>
    </section>
  );
}
