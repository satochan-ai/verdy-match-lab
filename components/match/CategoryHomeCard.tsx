import Link from "next/link";
import { shortenCompetition } from "@/lib/match/display";
import type { FixtureMeta } from "@/types/domain";

/**
 * 総合TOP（`/`）用のカテゴリー入口カード。TOP TEAM / U-21 / BELEZAで共通の情報階層
 * （CATEGORY＋STATUS → OPPONENT → DATE/KO → H-A・大会/節）を1つのcomponentへ集約する。
 *
 * 3カテゴリーはいずれも「ヴェルディファミリー」であるため、カテゴリーごとに別ブランドの
 * ような派手な色は与えず、左端accent barの濃淡とgoldの有無だけで区別する。
 *
 * sizeは非対称グリッド用。"lg"はTOP TEAM（左の大カード）、"sm"はU-21 / BELEZA
 * （右側で縦積みする横長カード）を想定する。
 */
type Accent = "green" | "green-gold" | "deep";

const accentBarClass: Record<Accent, string> = {
  green: "bg-primary-green",
  "green-gold": "bg-primary-green",
  deep: "bg-deep-green",
};

export function CategoryHomeCard({
  categoryLabel,
  statusLabel,
  statusTone,
  accent = "green",
  size = "sm",
  dateLabel,
  fixtureMeta,
  homeAway,
  opponentName,
  kickoffLabel,
  resultLine,
  href,
  linkLabel,
}: {
  categoryLabel: string;
  statusLabel: string;
  statusTone: "next" | "live" | "finished";
  accent?: Accent;
  size?: "lg" | "sm";
  dateLabel?: string;
  fixtureMeta?: FixtureMeta;
  homeAway?: "HOME" | "AWAY";
  opponentName?: string;
  kickoffLabel?: string;
  resultLine?: string;
  href: string;
  /** カード全体がLinkのため画面には出さず、リンクの目的を伝えるaria-labelとして使う。 */
  linkLabel: string;
}) {
  const isLive = statusTone === "live";
  const metaText = fixtureMeta
    ? [
        shortenCompetition(fixtureMeta.competition),
        fixtureMeta.stage,
        fixtureMeta.roundLabel,
      ]
        .filter(Boolean)
        .join(" ")
    : undefined;

  return (
    <Link
      href={href}
      aria-label={linkLabel}
      className={`group relative flex h-full flex-col overflow-hidden border border-border bg-surface transition duration-200 hover:bg-surface-tint focus-ring lg:hover:-translate-y-0.5 ${
        size === "lg" ? "py-5 pl-6 pr-5 lg:py-8 lg:pl-9 lg:pr-8" : "py-4 pl-5 pr-4 lg:py-5 lg:pl-6 lg:pr-5"
      }`}
    >
      {/* 左端のaccent bar。黒い囲み枠の代わりにカテゴリーを示す。 */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 ${accentBarClass[accent]}`}
      />
      {accent === "green-gold" && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-8 w-1 bg-pioneer-gold"
        />
      )}

      <div className="flex items-center justify-between gap-3">
        <p
          className={`font-bold uppercase tracking-[0.2em] text-pioneer-gold-deep ${
            size === "lg" ? "text-[11px] lg:text-[13px]" : "text-[10px] lg:text-[11px]"
          }`}
        >
          {categoryLabel}
        </p>
        <p
          className={`shrink-0 text-[11px] font-bold tracking-wide ${
            isLive ? "text-error" : statusTone === "next" ? "text-primary-green" : "text-text-secondary"
          }`}
        >
          {isLive && (
            <span
              aria-hidden="true"
              className="live-pulse mr-1.5 inline-block size-1.5 rounded-full bg-error align-middle"
            />
          )}
          {statusLabel}
        </p>
      </div>

      {statusTone !== "finished" ? (
        <>
          {opponentName && (
            <p
              className={`mt-3 min-w-0 break-words font-extrabold leading-snug text-text-primary lg:mt-4 ${
                size === "lg"
                  ? "text-[22px] lg:text-[28px]"
                  : "text-[18px] lg:text-[20px]"
              }`}
            >
              {opponentName}
            </p>
          )}

          {(dateLabel || kickoffLabel) && (
            <p
              className={`mt-3 tabular-nums font-bold text-text-primary ${
                size === "lg" ? "text-[15px] lg:text-[17px]" : "text-[14px] lg:text-[15px]"
              }`}
            >
              {dateLabel}
              {kickoffLabel && (
                <span className="ml-3 font-bold">
                  {kickoffLabel === "TBD" ? (
                    "KICK OFF TBD"
                  ) : (
                    <>
                      {kickoffLabel}
                      <span className="ml-1 text-[11px] font-bold text-text-secondary">
                        KICK OFF
                      </span>
                    </>
                  )}
                </span>
              )}
            </p>
          )}

          {(homeAway || metaText) && (
            <p className="mt-2 min-w-0 break-words text-[11px] leading-relaxed text-text-secondary lg:text-[12px]">
              {homeAway && (
                <span className="mr-2 font-bold text-text-primary">{homeAway}</span>
              )}
              {metaText}
            </p>
          )}
        </>
      ) : (
        resultLine && (
          <p
            className={`mt-3 min-w-0 break-words font-extrabold leading-snug text-text-primary lg:mt-4 ${
              size === "lg" ? "text-[20px] lg:text-[24px]" : "text-[16px] lg:text-[18px]"
            }`}
          >
            {resultLine}
          </p>
        )
      )}

      <span
        aria-hidden="true"
        className="mt-auto pt-5 text-right text-[16px] font-bold text-deep-green transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
