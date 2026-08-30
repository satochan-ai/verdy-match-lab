import type { Metadata } from "next";
import { getNextMatch, getRecentFinishedMatchSummary } from "@/lib/data/matches";
import { resolveCategoryCardState } from "@/lib/match/category-card-state";
import { belezaMatch, belezaSeasonHistory, belezaUpcomingMatches } from "@/lib/mock/beleza";
import { u21Match, u21SeasonHistory, u21UpcomingMatches } from "@/lib/mock/u21";
import { HomeHero } from "@/components/home/HomeHero";
import { CategoryHomeCard } from "@/components/match/CategoryHomeCard";
import topTeamCardPhoto from "@/public/images/home/top-team-card.jpg";
import belezaCardPhoto from "@/public/images/home/beleza-card.jpg";

export const metadata: Metadata = {
  title: "Verdy Match Lab",
  description: "東京ヴェルディを、TOP TEAM・U-21・BELEZAの3カテゴリーから追う。",
};

function formatMatchday(iso: string) {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return {
    dateLabel: `${part("month")}.${part("day")} ${part("weekday").toUpperCase()}`,
    time: `${part("hour")}:${part("minute")}`,
  };
}

export default async function Home() {
  const now = new Date();
  const [nextMatch, recentTopMatch] = await Promise.all([
    getNextMatch(),
    getRecentFinishedMatchSummary(),
  ]);

  // 3カテゴリーとも resolveCategoryCardState() で
  // LIVE → NEXT MATCH → LAST RESULT → EMPTY の同一ルールで状態を決める。
  // データ構造が異なるため、各カテゴリーのデータを共通ビューへ変換してから渡す
  // （Match型への統一はしない）。

  const topFixture = nextMatch ? formatMatchday(nextMatch.kickoffAt) : null;
  const topCardState = resolveCategoryCardState({
    now,
    focus: nextMatch ? { status: nextMatch.status, kickoffAt: nextMatch.kickoffAt } : undefined,
    nextFixture: nextMatch
      ? {
          opponentName: (nextMatch.isVerdyHome ? nextMatch.awayTeam : nextMatch.homeTeam).name,
          dateLabel: topFixture?.dateLabel,
          kickoffLabel: topFixture?.time,
          homeAway: nextMatch.isVerdyHome ? "HOME" : "AWAY",
          fixtureMeta: nextMatch.fixtureMeta,
        }
      : undefined,
    lastResult:
      recentTopMatch.homeScore != null && recentTopMatch.awayScore != null
        ? {
            homeTeamName: recentTopMatch.homeTeam.name,
            awayTeamName: recentTopMatch.awayTeam.name,
            homeScore: recentTopMatch.homeScore,
            awayScore: recentTopMatch.awayScore,
          }
        : undefined,
  });

  const nextU21Fixture = u21UpcomingMatches[0];
  const u21LastResult = u21SeasonHistory.at(-1);
  const u21CardState = resolveCategoryCardState({
    now,
    focus: { status: u21Match.status, kickoffAt: u21Match.kickoffAt },
    nextFixture: nextU21Fixture
      ? {
          opponentName: nextU21Fixture.opponentName,
          dateLabel: nextU21Fixture.dateLabel,
          kickoffLabel: nextU21Fixture.kickoffLabel,
          homeAway: nextU21Fixture.isHome ? "HOME" : "AWAY",
          fixtureMeta: nextU21Fixture.fixtureMeta,
        }
      : undefined,
    lastResult: u21LastResult
      ? {
          homeTeamName: u21LastResult.homeTeamName,
          awayTeamName: u21LastResult.awayTeamName,
          homeScore: u21LastResult.homeScore,
          awayScore: u21LastResult.awayScore,
        }
      : undefined,
  });

  const nextBelezaFixture = belezaUpcomingMatches[0];
  const belezaLastResult = belezaSeasonHistory.at(-1);
  const belezaCardState = resolveCategoryCardState({
    now,
    focus: { status: belezaMatch.status, kickoffAt: belezaMatch.kickoffAt },
    nextFixture: nextBelezaFixture
      ? {
          opponentName: nextBelezaFixture.opponentName,
          dateLabel: nextBelezaFixture.dateLabel,
          kickoffLabel: nextBelezaFixture.kickoffLabel,
          homeAway: nextBelezaFixture.isHome ? "HOME" : "AWAY",
          fixtureMeta: nextBelezaFixture.fixtureMeta,
        }
      : undefined,
    lastResult: belezaLastResult
      ? {
          homeTeamName: belezaLastResult.homeTeamName,
          awayTeamName: belezaLastResult.awayTeamName,
          homeScore: belezaLastResult.homeScore,
          awayScore: belezaLastResult.awayScore,
        }
      : undefined,
  });

  return (
    <div className="space-y-10 lg:space-y-14">
      {/*
        HeroのCTAはTOP TEAMの次戦（getNextMatchが返す試合）へ直行する。U-21 / BELEZAの
        UpcomingFixtureはISO日時を持たない表示用データのため、3カテゴリー横断での
        「最も近いキックオフ」をデータから厳密に決定することはできない。fixtureデータを
        変更しない方針のため、ここではTOP TEAMの次戦を導線先として固定する。
      */}
      <HomeHero
        ctaHref={nextMatch ? `/matches/${nextMatch.id}` : "/top"}
        ctaLabel="NEXT MATCHを見る"
      />

      <section>
        <div className="flex items-baseline gap-3">
          <h2 className="text-[15px] font-extrabold tracking-wide text-text-primary lg:text-[17px]">
            3つの緑を追う。
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-pioneer-gold/60" />
        </div>

        <div className="mt-4 grid gap-4 lg:mt-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-stretch">
          <CategoryHomeCard
            categoryLabel="TOP TEAM"
            {...topCardState.card}
            accent="green"
            size="lg"
            photo={{
              src: topTeamCardPhoto,
              alt: "東京ヴェルディのホームスタジアム、味の素スタジアム入場ゲート前の大型エンブレム",
              // 縦長写真の主役（大型エンブレム、AJINOMOTO STADIUM看板）を絶対に切らない
              // ため、coverでのトリミングはせずcontain-splitレイアウトで写真全体を表示する。
              layout: "contain-split",
              sizes: "(min-width: 1024px) 45vw, 100vw",
            }}
            href="/top"
            linkLabel="TOP TEAMのページを見る"
          />

          <div className="grid gap-4 lg:grid-rows-2">
            <CategoryHomeCard
              categoryLabel="U-21"
              {...u21CardState.card}
              accent="green-gold"
              // 写真がないU-21も仮置きに見えないよう、カード側で緑の面と境界を強める。
              href="/u21"
              linkLabel="U-21のページを見る"
            />

            <CategoryHomeCard
              categoryLabel="BELEZA"
              {...belezaCardState.card}
              accent="deep"
              photo={{
                src: belezaCardPhoto,
                alt: "味の素フィールド西が丘のピッチ全景",
                layout: "cover-top",
                // 横長写真は空が上半分を占めるため、縦位置を下寄りにしてピッチとスタンドを
                // 優先的に見せる。
                positionClassName: "object-[center_72%] md:object-[center_68%] lg:object-[center_66%]",
                sizes: "(min-width: 1024px) 40vw, 100vw",
              }}
              href="/beleza"
              linkLabel="BELEZAのページを見る"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
