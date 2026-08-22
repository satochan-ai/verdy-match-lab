import { SectionHeader } from "@/components/ui/SectionHeader";
import type {
  ActualLineup,
  MatchCard,
  MatchGoal,
  MatchStats,
  MatchSubstitution,
  OfficialMatchRecord,
  PositionPlayerGroups,
} from "@/types/domain";

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

const primaryStats: { key: keyof MatchStats["home"]; label: string }[] = [
  { key: "shots", label: "シュート" },
  { key: "shotsOnTarget", label: "枠内シュート" },
  { key: "possession", label: "ボール支配率" },
  { key: "passSuccessRate", label: "パス成功率" },
  { key: "distance", label: "走行距離" },
  { key: "sprints", label: "スプリント" },
  { key: "corners", label: "CK" },
];

const supplementaryStats: { key: keyof MatchStats["home"]; label: string }[] = [
  { key: "offsides", label: "オフサイド" },
  { key: "freeKicks", label: "FK" },
  { key: "yellowCards", label: "警告" },
  { key: "redCards", label: "退場" },
];

function StatRows({
  stats,
  items,
  homeTeamName,
  awayTeamName,
  compact = false,
}: {
  stats: MatchStats;
  items: { key: keyof MatchStats["home"]; label: string }[];
  homeTeamName: string;
  awayTeamName: string;
  compact?: boolean;
}) {
  return (
    <>
      <div className="hidden md:block">
        <div className={compact ? "text-[11px]" : "text-[12px] lg:text-[13px]"}>
          {items.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] border-b border-border py-1.5">
              <span className="text-right font-bold tabular-nums text-text-primary">{stats.home[key]}</span>
              <span className="text-center text-text-secondary">{label}</span>
              <span className="font-bold tabular-nums text-text-primary">{stats.away[key]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={compact ? "space-y-1 md:hidden" : "space-y-2 md:hidden"}>
        {items.map(({ key, label }) => (
          <div key={key} className="flex items-baseline justify-between gap-3 border-b border-border py-1.5 text-[12px]">
            <span className="shrink-0 text-text-secondary">{label}</span>
            <span className="min-w-0 text-right font-bold tabular-nums text-text-primary">
              {homeTeamName} {stats.home[key]} / {awayTeamName} {stats.away[key]}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function MatchStatsSection({
  homeTeamName,
  awayTeamName,
  stats,
}: {
  homeTeamName: string;
  awayTeamName: string;
  stats: MatchStats;
}) {
  return (
    <div className="border-b border-border py-3">
      <p className="mb-1.5 text-[11px] font-bold tracking-[0.08em] text-text-secondary">MATCH STATS</p>
      <div className="mb-1 hidden grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] text-[10px] font-bold text-text-secondary md:grid">
        <span className="text-right">{homeTeamName}</span>
        <span />
        <span>{awayTeamName}</span>
      </div>
      <StatRows stats={stats} items={primaryStats} homeTeamName={homeTeamName} awayTeamName={awayTeamName} />
      <div className="mt-2">
        <StatRows stats={stats} items={supplementaryStats} homeTeamName={homeTeamName} awayTeamName={awayTeamName} compact />
      </div>
    </div>
  );
}

function OfficialInfo({ record }: { record: OfficialMatchRecord }) {
  const items = [
    record.kickoff && `Kick Off ${record.kickoff}`,
    record.attendance !== undefined && `入場者数 ${record.attendance.toLocaleString()}人`,
    record.weather && `天候 ${record.weather}`,
    record.temperature && `気温 ${record.temperature}`,
    record.humidity && `湿度 ${record.humidity}`,
  ].filter(Boolean);

  if (items.length === 0 && !record.sourceUrl) return null;

  return (
    <div className="border-b border-border pb-3">
      <p className="mb-1.5 text-[11px] font-bold tracking-[0.08em] text-text-secondary">OFFICIAL MATCH INFO</p>
      <p className="text-[12px] leading-relaxed text-text-primary lg:text-[13px]">{items.join(" ／ ")}</p>
      {record.sourceUrl && (
        <a
          href={record.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-[11px] font-bold text-deep-green underline underline-offset-2"
        >
          SOURCE / J.LEAGUE Official Match Record ↗
        </a>
      )}
    </div>
  );
}

function Substitutions({ substitutions }: { substitutions: MatchSubstitution[] }) {
  const teams = [...new Set(substitutions.map((substitution) => substitution.team))];

  return (
    <div className="border-b border-border py-3">
      <p className="mb-1.5 text-[11px] font-bold tracking-[0.08em] text-text-secondary">SUBSTITUTIONS / 交代</p>
      <div className="space-y-3">
        {teams.map((team) => (
          <div key={team}>
            <p className="text-[12px] font-bold text-text-primary">{team}</p>
            <ul className="mt-1 divide-y divide-border text-[12px] text-text-secondary lg:text-[13px]">
              {substitutions.filter((substitution) => substitution.team === team).map((substitution) => (
                <li key={`${team}-${substitution.minute}-${substitution.playerIn}`} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-2 py-1.5">
                  <span className="font-bold tabular-nums text-text-primary">{substitution.minute}</span>
                  <span className="min-w-0 leading-relaxed">
                    IN <span className="font-bold text-text-primary">{substitution.playerIn}</span>
                    <span className="mx-1 text-text-secondary">/</span>
                    OUT {substitution.playerOut}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
  substitutions,
  matchStats,
  officialRecord,
  actualLineups,
}: {
  homeTeamName: string;
  awayTeamName: string;
  goals?: MatchGoal[];
  cards?: MatchCard[];
  substitutions?: MatchSubstitution[];
  matchStats?: MatchStats;
  officialRecord?: OfficialMatchRecord;
  actualLineups?: { home: ActualLineup; away: ActualLineup };
}) {
  if (!goals?.length && !cards?.length && !substitutions?.length && !matchStats && !officialRecord && !actualLineups) return null;

  return (
    <section>
      <SectionHeader title="試合記録" eyebrow="MATCH RECORD" />
      <div className="border-y border-border bg-surface px-3 py-3">
        {officialRecord && <OfficialInfo record={officialRecord} />}
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

        {substitutions && substitutions.length > 0 && <Substitutions substitutions={substitutions} />}

        {matchStats && <MatchStatsSection homeTeamName={homeTeamName} awayTeamName={awayTeamName} stats={matchStats} />}

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
