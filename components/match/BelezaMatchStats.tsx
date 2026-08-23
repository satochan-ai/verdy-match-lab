import { SectionHeader } from "@/components/ui/SectionHeader";

type TeamStats = { shots: number; freeKicks: number; corners: number };

/**
 * 公式記録で確認できたスタッツ（シュート・FK・CK）のみを表示する最小コンポーネント。
 * 支配率・パス成功率等の未確認項目を持つ共通のMatchStats型は使わず、
 * 確認済みの3項目だけに絞った独立表示とする（推測値を混入させないため）。
 */
export function BelezaMatchStats({
  belezaTeamName,
  opponentTeamName,
  stats,
}: {
  belezaTeamName: string;
  opponentTeamName: string;
  stats: { beleza: TeamStats; opponent: TeamStats };
}) {
  const rows: { key: keyof TeamStats; label: string }[] = [
    { key: "shots", label: "シュート" },
    { key: "freeKicks", label: "FK" },
    { key: "corners", label: "CK" },
  ];

  return (
    <section>
      <SectionHeader title="試合スタッツ" eyebrow="MATCH STATS" />
      <div className="border-y border-border bg-surface px-3 py-3">
        <div className="mb-1 hidden grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)] text-[10px] font-bold text-text-secondary md:grid">
          <span className="text-right">{belezaTeamName}</span>
          <span />
          <span>{opponentTeamName}</span>
        </div>
        <div className="hidden text-[12px] md:block lg:text-[13px]">
          {rows.map(({ key, label }) => (
            <div
              key={key}
              className="grid grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)] border-b border-border py-1.5 last:border-b-0"
            >
              <span className="text-right font-bold tabular-nums text-text-primary">
                {stats.beleza[key]}
              </span>
              <span className="text-center text-text-secondary">{label}</span>
              <span className="font-bold tabular-nums text-text-primary">{stats.opponent[key]}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1.5 md:hidden">
          {rows.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-baseline justify-between gap-3 border-b border-border py-1.5 text-[12px] last:border-b-0"
            >
              <span className="shrink-0 text-text-secondary">{label}</span>
              <span className="min-w-0 text-right font-bold tabular-nums text-text-primary">
                {belezaTeamName} {stats.beleza[key]} / {opponentTeamName} {stats.opponent[key]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
        公式記録で確認できたシュート・FK・CKのみ掲載しています。
      </p>
    </section>
  );
}
