import type { UpcomingFixture } from "@/types/domain";

/**
 * BELEZA / U-21のNEXT 5表示用の共通リスト。表示順はDATE→COMPETITION→STAGE/ROUND→
 * HOME/AWAY＋対戦相手→KICK OFF／VENUEに統一する。venue未確認の場合は非表示（TBD等の
 * 推測は行わない）。
 */
function FixtureRow({ fixture, emphasize }: { fixture: UpcomingFixture; emphasize?: boolean }) {
  const { fixtureMeta } = fixture;
  const roundText = [fixtureMeta.stage, fixtureMeta.roundLabel].filter(Boolean).join(" ");

  return (
    <li className={`border-b border-border py-3 last:border-b-0 ${emphasize ? "bg-surface-tint" : ""}`}>
      <p className="tabular-nums text-[11px] font-bold text-text-secondary">{fixture.dateLabel}</p>
      <p className="mt-1 text-[13px] font-bold leading-snug text-text-primary">
        {fixtureMeta.competition}
      </p>
      {roundText && <p className="text-[11px] text-text-secondary">{roundText}</p>}
      <div className="mt-2 flex items-center gap-2 text-[13px]">
        <span className="shrink-0 bg-fusion-black px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
          {fixture.isHome ? "HOME" : "AWAY"}
        </span>
        <span className="min-w-0 flex-1 break-words font-bold text-text-primary">
          {fixture.opponentName}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-text-secondary">
        {fixture.kickoffLabel === "TBD" ? "KICK OFF TBD" : `${fixture.kickoffLabel} KICK OFF`}
        {fixture.venue && ` ／ ${fixture.venue}`}
      </p>
    </li>
  );
}

export function UpcomingFixtureList({ fixtures }: { fixtures: UpcomingFixture[] }) {
  if (fixtures.length === 0) return null;

  return (
    <ul className="divide-y divide-border border-y border-border">
      {fixtures.map((fixture, index) => (
        <FixtureRow key={fixture.id} fixture={fixture} emphasize={index === 0} />
      ))}
    </ul>
  );
}
