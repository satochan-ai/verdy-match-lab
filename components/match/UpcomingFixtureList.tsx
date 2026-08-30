import type { UpcomingFixture } from "@/types/domain";

/**
 * TOP TEAM / U-21 / BELEZA共通のNEXT 5リスト。情報の優先順位は
 * 対戦相手＞日付＞HOME/AWAY＞KICK OFF＞大会名/節。視覚上の主役は対戦相手に置き、
 * 大会名・ステージ・節は1行にまとめた従属情報として表示する。
 * venue未確認の場合は非表示（TBD等の推測は行わない）。
 */
function FixtureRow({ fixture, emphasize }: { fixture: UpcomingFixture; emphasize?: boolean }) {
  const { fixtureMeta } = fixture;
  // 大会名・ステージ・節を1行へ集約。存在する項目のみ半角スペースで連結し、
  // 未設定項目による空文字・不自然な区切りは出さない。
  const competitionText = [fixtureMeta.competition, fixtureMeta.stage, fixtureMeta.roundLabel]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      className={`border-b border-l-2 border-border py-3 pl-3 last:border-b-0 ${
        emphasize ? "border-l-primary-green bg-surface-tint" : "border-l-transparent"
      }`}
    >
      <p className="tabular-nums text-[11px] font-bold text-text-secondary">{fixture.dateLabel}</p>
      <div className="mt-1 flex items-center gap-2">
        <span className="shrink-0 bg-fusion-black px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
          {fixture.isHome ? "HOME" : "AWAY"}
        </span>
        <span className="min-w-0 flex-1 break-words text-[15px] font-extrabold leading-snug text-text-primary">
          {fixture.opponentName}
        </span>
      </div>
      {competitionText && (
        <p className="mt-1.5 text-[11px] leading-snug text-text-secondary">{competitionText}</p>
      )}
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
    <ul className="border-y border-border">
      {fixtures.map((fixture, index) => (
        <FixtureRow key={fixture.id} fixture={fixture} emphasize={index === 0} />
      ))}
    </ul>
  );
}
