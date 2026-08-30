import Link from "next/link";
import { getArchiveMatches } from "@/lib/data/matches";
import { StatusBadge } from "@/components/ui/StatusBadge";

function formatShortDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default async function ArchivePage() {
  const list = await getArchiveMatches();

  return (
    <div>
      <h1 className="text-[20px] font-bold text-text-primary">アーカイブ</h1>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {list.map((m) => {
          const opponent = m.isVerdyHome ? m.awayTeam : m.homeTeam;
          const result =
            m.homeScore === m.awayScore
              ? "draw"
              : (m.isVerdyHome && m.homeScore! > m.awayScore!) ||
                (!m.isVerdyHome && m.awayScore! > m.homeScore!)
              ? "win"
              : "loss";
          return (
            <li key={m.id}>
              <Link
                href={`/matches/${m.id}`}
                className="flex items-center justify-between py-3 text-[13px]"
              >
                <span className="w-12 shrink-0 text-text-secondary">
                  {formatShortDate(m.kickoffAt)}
                </span>
                <StatusBadge variant={m.isVerdyHome ? "home" : "away"} />
                <span className="flex-1 px-3 text-text-primary">
                  vs {opponent.name}
                </span>
                {m.fixtureMeta && (
                  <span className="hidden max-w-[220px] truncate text-[10px] text-text-secondary lg:inline">
                    {[m.fixtureMeta.competition, m.fixtureMeta.stage, m.fixtureMeta.roundLabel].filter(Boolean).join(" ／ ")}
                  </span>
                )}
                <span className="tabular-nums mr-2 font-bold text-text-primary">
                  {m.homeScore}-{m.awayScore}
                </span>
                <StatusBadge variant={result} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
