import type { Metadata } from "next";
import { getNextMatch } from "@/lib/data/matches";
import { resolveMatchStatus } from "@/lib/match/status";
import { belezaMatch, belezaUpcomingMatches } from "@/lib/mock/beleza";
import { u21Match, u21UpcomingMatches } from "@/lib/mock/u21";
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
  const nextMatch = await getNextMatch();
  const now = new Date();

  const topOpponent = nextMatch.isVerdyHome ? nextMatch.awayTeam : nextMatch.homeTeam;
  const topFixture = formatMatchday(nextMatch.kickoffAt);
  const isTopLive = resolveMatchStatus(nextMatch, now) === "live";

  const nextU21Fixture = u21UpcomingMatches[0];
  const isU21Live = resolveMatchStatus(u21Match, now) === "live";

  const nextBelezaFixture = belezaUpcomingMatches[0];
  const isBelezaLive = resolveMatchStatus(belezaMatch, now) === "live";

  return (
    <div className="space-y-10 lg:space-y-14">
      {/*
        HeroのCTAはTOP TEAMの次戦（getNextMatchが返す試合）へ直行する。U-21 / BELEZAの
        UpcomingFixtureはISO日時を持たない表示用データのため、3カテゴリー横断での
        「最も近いキックオフ」をデータから厳密に決定することはできない。fixtureデータを
        変更しない方針のため、ここではTOP TEAMの次戦を導線先として固定する。
      */}
      <HomeHero ctaHref={`/matches/${nextMatch.id}`} ctaLabel="NEXT MATCHを見る" />

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
            statusLabel={isTopLive ? "LIVE" : "NEXT MATCH"}
            statusTone={isTopLive ? "live" : "next"}
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
            dateLabel={topFixture.dateLabel}
            fixtureMeta={nextMatch.fixtureMeta}
            homeAway={nextMatch.isVerdyHome ? "HOME" : "AWAY"}
            opponentName={topOpponent.name}
            kickoffLabel={topFixture.time}
            href="/top"
            linkLabel="TOP TEAMのページを見る"
          />

          <div className="grid gap-4 lg:grid-rows-2">
            <CategoryHomeCard
              categoryLabel="U-21"
              statusLabel={isU21Live ? "LIVE" : nextU21Fixture ? "NEXT MATCH" : "LAST RESULT"}
              statusTone={isU21Live ? "live" : nextU21Fixture ? "next" : "finished"}
              accent="green-gold"
              dateLabel={nextU21Fixture?.dateLabel}
              fixtureMeta={nextU21Fixture?.fixtureMeta ?? u21Match.fixtureMeta}
              homeAway={nextU21Fixture ? (nextU21Fixture.isHome ? "HOME" : "AWAY") : undefined}
              opponentName={nextU21Fixture?.opponentName}
              kickoffLabel={nextU21Fixture?.kickoffLabel}
              resultLine={
                !nextU21Fixture
                  ? `${u21Match.homeTeamName} ${u21Match.homeScore}-${u21Match.awayScore} ${u21Match.awayTeamName}`
                  : undefined
              }
              href="/u21"
              linkLabel="U-21のページを見る"
            />

            <CategoryHomeCard
              categoryLabel="BELEZA"
              statusLabel={isBelezaLive ? "LIVE" : nextBelezaFixture ? "NEXT MATCH" : "LAST RESULT"}
              statusTone={isBelezaLive ? "live" : nextBelezaFixture ? "next" : "finished"}
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
              dateLabel={nextBelezaFixture?.dateLabel}
              fixtureMeta={nextBelezaFixture?.fixtureMeta ?? belezaMatch.fixtureMeta}
              homeAway={nextBelezaFixture ? (nextBelezaFixture.isHome ? "HOME" : "AWAY") : undefined}
              opponentName={nextBelezaFixture?.opponentName}
              kickoffLabel={nextBelezaFixture?.kickoffLabel}
              resultLine={
                !nextBelezaFixture
                  ? `${belezaMatch.homeTeamName} ${belezaMatch.homeScore}-${belezaMatch.awayScore} ${belezaMatch.awayTeamName}`
                  : undefined
              }
              href="/beleza"
              linkLabel="BELEZAのページを見る"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
