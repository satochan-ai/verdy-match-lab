import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FixtureMetaLine } from "@/components/match/FixtureMetaLine";
import { BelezaSeasonHistory } from "@/components/match/BelezaSeasonHistory";
import { UpcomingFixtureList } from "@/components/match/UpcomingFixtureList";
import { belezaTeam, belezaMatch } from "@/lib/mock/beleza";
import { belezaFixtures, toBelezaSeasonHistoryEntry, toBelezaUpcomingMatch } from "@/lib/data/beleza-fixtures";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "@/lib/data/fixture-selectors";

/**
 * /beleza は BELEZA カテゴリーのトップページ。TOP TEAM（/top）と同じ情報設計で、
 * 「未来（NEXT MATCH / NEXT 5）→ 過去（LAST MATCH / SEASON HISTORY）」を分離して表示する。
 *
 * NEXT MATCH  … belezaUpcomingMatches[0]（今後の公式日程の先頭）
 * NEXT 5      … belezaUpcomingMatches
 * LAST MATCH  … belezaMatch（直近の確定試合スナップショット）。詳細は /beleza/matches/[id] へ。
 *
 * LAST MATCH の finished 判定に resolveMatchStatus を毎リクエスト使うため静的prerenderにしない。
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ベレーザ MATCH | Verdy Match Lab",
  description: "日テレ・東京ヴェルディベレーザの次戦・NEXT 5・直近の試合結果。",
};

export default function BelezaPage() {
  const now = new Date();
  const nextFixture = getNextFixture(belezaFixtures, now);
  const nextDisplayFixture = nextFixture ? toBelezaUpcomingMatch(nextFixture) : undefined;
  const upcomingFixtures = getUpcomingFixtures(belezaFixtures, now, 5).map(toBelezaUpcomingMatch);
  const lastFixture = getLatestFinishedFixture(belezaFixtures);
  const history = getSeasonHistory(belezaFixtures).map(toBelezaSeasonHistoryEntry);
  // BELEZAが home の節は HOME=ベレーザ / AWAY=相手、away の節はその逆。
  const nextHomeName = nextDisplayFixture
    ? nextDisplayFixture.isHome
      ? belezaTeam.name
      : nextFixture.opponentName
    : null;
  const nextAwayName = nextDisplayFixture
    ? nextDisplayFixture.isHome
      ? nextFixture.opponentName
      : belezaTeam.name
    : null;

  const lastFinished = lastFixture !== undefined;
  const lastOpponentName = lastFixture?.opponentName ?? "";
  const belezaScore = lastFixture?.isHome ? lastFixture.score?.home ?? 0 : lastFixture?.score?.away ?? 0;
  const opponentScore = lastFixture?.isHome ? lastFixture.score?.away ?? 0 : lastFixture?.score?.home ?? 0;
  const lastResult =
    belezaScore === opponentScore ? "draw" : belezaScore > opponentScore ? "win" : "loss";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">BELEZA</h1>
        <span className="w-8" />
      </div>

      {nextDisplayFixture && nextHomeName && nextAwayName ? (
        <section className="border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
          <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
            NEXT MATCH
          </p>
          <p className="mt-2 tabular-nums text-[15px] font-extrabold tracking-wide text-text-secondary lg:text-[17px]">
            {nextDisplayFixture.dateLabel}
          </p>

          <div className="mt-2">
            <FixtureMetaLine meta={nextDisplayFixture.fixtureMeta} />
          </div>

          {/* 正式名称が長いため truncate せず縦積み。左右（HOME/AWAY）の関係を明示する。 */}
          <div className="mt-4 flex flex-col items-center gap-1.5 text-center lg:mt-5">
            <p className="text-[16px] font-extrabold leading-snug text-text-primary lg:text-[22px]">
              {nextHomeName}
            </p>
            <p className="text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
              HOME
            </p>
            <p className="py-1 text-[13px] font-extrabold text-fusion-black lg:text-[16px]">VS</p>
            <p className="text-[16px] font-extrabold leading-snug text-text-primary lg:text-[22px]">
              {nextAwayName}
            </p>
            <p className="text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
              AWAY
            </p>
          </div>

          <div className="mt-4 flex flex-col items-center gap-1 border-t border-border pt-3 text-center lg:mt-6">
            <p className="tabular-nums text-[15px] font-bold text-text-primary lg:text-[16px]">
              {nextDisplayFixture.kickoffLabel === "TBD" ? "KICK OFF TBD" : nextDisplayFixture.kickoffLabel}{" "}
              {nextDisplayFixture.kickoffLabel !== "TBD" && (
                <span className="text-[11px] font-bold text-text-secondary lg:text-[12px]">
                  KICK OFF
                </span>
              )}
            </p>
            {nextDisplayFixture.venue && (
              <p className="text-[12px] text-text-secondary">{nextDisplayFixture.venue}</p>
            )}
          </div>
        </section>
      ) : (
        <section className="border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
          <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
            NEXT MATCH
          </p>
          <p className="mt-3 text-[15px] font-extrabold text-text-primary lg:text-[17px]">
            次戦情報準備中
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
            次の試合日程が確定し次第、ここに表示します。
          </p>
        </section>
      )}

      {upcomingFixtures.length > 0 && (
        <section>
          <SectionHeader title="NEXT 5" eyebrow="UPCOMING FIXTURES" />
          <UpcomingFixtureList fixtures={upcomingFixtures} />
        </section>
      )}

      <div className="space-y-8 border-t border-border pt-8">
        {lastFinished && (
          <section>
            <p className="text-[10px] font-bold tracking-[0.15em] text-text-secondary">
              LAST MATCH
            </p>
            <Link
              href={`/beleza/matches/${lastFixture?.detailMatchId ?? belezaMatch.id}`}
              className="mt-2 block border-t border-border py-2 text-[13px]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 break-words text-text-primary">
                  {lastFixture?.dateLabel}　{lastOpponentName}
                </span>
                <span className="ml-2 flex shrink-0 items-center gap-2">
                  <span className="tabular-nums font-bold text-text-primary">
                    {lastFixture?.score?.home}-{lastFixture?.score?.away}
                  </span>
                  <StatusBadge variant={lastResult} label={lastResult.toUpperCase()} />
                </span>
              </div>
              <div className="mt-1">
                <FixtureMetaLine meta={{ competition: lastFixture?.competition.name ?? "", roundLabel: lastFixture?.competition.round }} compact />
              </div>
            </Link>
          </section>
        )}

        {history.length > 0 && (
          <section>
            <SectionHeader title="2026/27シーズン試合履歴" eyebrow="SEASON HISTORY" />
            <BelezaSeasonHistory entries={history} />
          </section>
        )}
      </div>
    </div>
  );
}
