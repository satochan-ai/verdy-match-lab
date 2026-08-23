import type { FixtureMeta } from "@/types/domain";

/**
 * TOP TEAM / BELEZA / U-21で共通の「大会名 → ステージ/節・回戦」表示。
 * fixtureMetaが未設定の試合（既存データの大半）では何も描画せず、既存表示に影響しない。
 */
export function FixtureMetaLine({
  meta,
  compact,
}: {
  meta?: FixtureMeta;
  compact?: boolean;
}) {
  if (!meta) return null;
  const roundText = [meta.stage, meta.roundLabel].filter(Boolean).join(" ");

  if (compact) {
    return (
      <p className="text-[10px] text-text-secondary">
        {meta.competition}
        {roundText && ` ／ ${roundText}`}
      </p>
    );
  }

  return (
    <div className="text-[12px] text-text-secondary">
      <p className="font-bold text-text-primary">{meta.competition}</p>
      {roundText && <p className="mt-0.5">{roundText}</p>}
    </div>
  );
}
