import type { Metadata } from "next";
import Link from "next/link";
import { u21Match } from "@/lib/mock/u21";
import { u21Fixtures, toU21SeasonHistoryEntry, toU21UpcomingMatch } from "@/lib/data/u21-fixtures";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "@/lib/data/fixture-selectors";
import { U21SeasonHistory } from "@/components/match/U21SeasonHistory";
import { UpcomingFixtureList } from "@/components/match/UpcomingFixtureList";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FixtureMetaLine } from "@/components/match/FixtureMetaLine";

/**
 * /u21 は U-21 カテゴリーのトップページ。TOP TEAM（/top）・BELEZA（/beleza）と同じ情報設計で、
 * 「未来（NEXT MATCH / NEXT 5）→ 過去（LAST MATCH / SEASON HISTORY）」を分離して表示する。
 *
 * NEXT MATCH  … u21UpcomingMatches[0]（今後の公式日程の先頭）
 * NEXT 5      … u21UpcomingMatches
 * LAST MATCH  … u21Match（直近の確定試合スナップショット）。詳細は /u21/matches/[id] へ。
 *
 * LAST MATCH の finished 判定に resolveMatchStatus を毎リクエスト使うため静的prerenderにしない。
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "U-21 MATCH | Verdy Match Lab",
  description: "東京ヴェルディU-21の次戦・NEXT 5・直近の試合結果。",
};

// U-21のチーム表示名。u21Match / u21SeasonHistory の homeTeamName 表記に合わせる。
const U21_TEAM_NAME = "東京ヴェルディU-21";

function formatMonthDay(iso: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(iso));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${part("month")}.${part("day")}`;
}

export default function U21Page() {
  const now = new Date();
  const nextFixture = getNextFixture(u21Fixtures, now);
  const upcomingFixtures = getUpcomingFixtures(u21Fixtures, now, 5).map(toU21UpcomingMatch);
  const lastFixture = getLatestFinishedFixture(u21Fixtures);
  const history = getSeasonHistory(u21Fixtures).map(toU21SeasonHistoryEntry);
  // U-21が home の節は HOME=ヴェルディ / AWAY=相手、away の節はその逆。
  const nextDisplayFixture = nextFixture ? toU21UpcomingMatch(nextFixture) : undefined;
  const nextHomeName = nextDisplayFixture
    ? nextDisplayFixture.isHome
      ? U21_TEAM_NAME
      : nextFixture.opponentName
    : null;
  const nextAwayName = nextDisplayFixture
    ? nextDisplayFixture.isHome
      ? nextFixture.opponentName
      : U21_TEAM_NAME
    : null;

  const lastFinished = lastFixture !== undefined;
  const lastOpponentName = lastFixture?.opponentName ?? "";
  const u21Score = lastFixture?.score?.home ?? 0;
  const opponentScore = lastFixture?.score?.away ?? 0;
  const lastResult =
    u21Score === opponentScore ? "draw" : u21Score > opponentScore ? "win" : "loss";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-start justify-between gap-4 border-l-2 border-primary-green pl-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pioneer-gold-deep">
            Verdy U-21
          </p>
          <h1 className="mt-1 text-[20px] font-extrabold tracking-tight text-text-primary">U-21</h1>
          <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
            ヴェルディの未来を担う世代を追う。
          </p>
        </div>
        <Link href="/" className="pt-1 text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
      </div>

      {nextDisplayFixture && nextHomeName && nextAwayName ? (
        <section className="border-y-2 border-l-4 border-fusion-black border-l-primary-green bg-primary-green/[0.04] px-4 py-5 lg:px-8 lg:py-7">
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
        <section className="border-y-2 border-l-4 border-fusion-black border-l-primary-green bg-primary-green/[0.04] px-4 py-5 lg:px-8 lg:py-7">
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
              href={`/u21/matches/${lastFixture?.detailMatchId ?? u21Match.id}`}
              className="mt-2 block border-t border-border py-2 text-[13px]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 break-words text-text-primary">
                  {lastFixture && formatMonthDay(lastFixture.kickoffAt!)}　{lastOpponentName}
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
            <U21SeasonHistory entries={history} />
          </section>
        )}
      </div>
    </div>
  );
}
