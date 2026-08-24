import Link from "next/link";
import { FixtureMetaLine } from "@/components/match/FixtureMetaLine";
import type { FixtureMeta } from "@/types/domain";

/**
 * 総合TOP（`/`）用のカテゴリー入口カード。TOP TEAM / U-21 / BELEZAで共通の
 * 表示順（CATEGORY→STATUS→DATE→COMPETITION/STAGE/ROUND→H/A＋OPPONENT→KO→LINK）を
 * 1つのcomponentへ集約する（Phase 6-J.2のHOME統一思想を3カテゴリー分に拡張）。
 */
export function CategoryHomeCard({
  categoryLabel,
  statusLabel,
  statusTone,
  dateLabel,
  fixtureMeta,
  homeAway,
  opponentName,
  kickoffLabel,
  resultLine,
  href,
  linkLabel,
  emphasize,
}: {
  categoryLabel: string;
  statusLabel: string;
  statusTone: "next" | "live" | "finished";
  dateLabel?: string;
  fixtureMeta?: FixtureMeta;
  homeAway?: "HOME" | "AWAY";
  opponentName?: string;
  kickoffLabel?: string;
  resultLine?: string;
  href: string;
  linkLabel: string;
  emphasize?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block border-2 border-fusion-black bg-surface-tint p-4 transition-colors hover:bg-surface lg:p-5 ${
        emphasize ? "lg:p-6" : ""
      }`}
    >
      <p className="text-[10px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[11px]">
        {categoryLabel}
      </p>
      <p
        className={`mt-1 text-[11px] font-bold ${
          statusTone === "live"
            ? "text-primary-green"
            : statusTone === "next"
              ? "text-primary-green"
              : "text-text-secondary"
        }`}
      >
        {statusLabel}
      </p>

      {statusTone !== "finished" ? (
        <div className="mt-2 border-t border-border pt-2">
          {dateLabel && (
            <p className="tabular-nums text-[13px] font-bold text-text-secondary">{dateLabel}</p>
          )}
          {fixtureMeta && (
            <div className="mt-1">
              <FixtureMetaLine meta={fixtureMeta} compact />
            </div>
          )}
          {opponentName && (
            <p className="mt-1 min-w-0 break-words text-[14px] font-bold leading-snug text-text-primary">
              {homeAway && <span className="mr-1 text-[11px] text-text-secondary">{homeAway}</span>}
              {opponentName}
            </p>
          )}
          {kickoffLabel && (
            <p className="mt-1 text-[12px] text-text-secondary">
              {kickoffLabel === "TBD" ? "KICK OFF TBD" : `${kickoffLabel} KICK OFF`}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-2 border-t border-border pt-2">
          {resultLine && (
            <p className="min-w-0 break-words text-[14px] font-bold leading-snug text-text-primary">
              {resultLine}
            </p>
          )}
        </div>
      )}

      <p className="mt-3 text-[12px] font-bold text-deep-green">{linkLabel}</p>
    </Link>
  );
}
