import type { Metadata } from "next";
import { getNextMatch } from "@/lib/data/matches";
import { resolveMatchStatus } from "@/lib/match/status";
import { belezaMatch, belezaUpcomingMatches } from "@/lib/mock/beleza";
import { u21Match, u21UpcomingMatches } from "@/lib/mock/u21";
import { CategoryHomeCard } from "@/components/match/CategoryHomeCard";

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
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-[13px] font-bold tracking-[0.2em] text-pioneer-gold-deep">
          VERDY MATCH LAB
        </h1>
        <p className="text-[13px] text-text-secondary">
          東京ヴェルディを、TOP TEAM・U-21・BELEZAの3カテゴリーから追う。
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <CategoryHomeCard
          categoryLabel="TOP TEAM"
          statusLabel={isTopLive ? "LIVE" : "NEXT MATCH"}
          statusTone={isTopLive ? "live" : "next"}
          dateLabel={topFixture.dateLabel}
          fixtureMeta={nextMatch.fixtureMeta}
          homeAway={nextMatch.isVerdyHome ? "HOME" : "AWAY"}
          opponentName={topOpponent.name}
          kickoffLabel={topFixture.time}
          href="/top"
          linkLabel="TOP TEAMを見る →"
          emphasize
        />

        <CategoryHomeCard
          categoryLabel="U-21"
          statusLabel={isU21Live ? "LIVE" : nextU21Fixture ? "NEXT MATCH" : "LAST RESULT"}
          statusTone={isU21Live ? "live" : nextU21Fixture ? "next" : "finished"}
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
          linkLabel="U-21を見る →"
        />

        <CategoryHomeCard
          categoryLabel="BELEZA"
          statusLabel={isBelezaLive ? "LIVE" : nextBelezaFixture ? "NEXT MATCH" : "LAST RESULT"}
          statusTone={isBelezaLive ? "live" : nextBelezaFixture ? "next" : "finished"}
          dateLabel={nextBelezaFixture?.dateLabel}
          fixtureMeta={nextBelezaFixture?.fixtureMeta ?? belezaMatch.fixtureMeta}
          homeAway={nextBelezaFixture ? (nextBelezaFixture.isHome ? "HOME" : "AWAY") : undefined}
          opponentName={nextBelezaFixture?.opponentName}
          kickoffLabel={nextBelezaFixture?.kickoffLabel}
          resultLine={
            !nextBelezaFixture
              ? `日テレ・東京ヴェルディベレーザ ${belezaMatch.homeScore}-${belezaMatch.awayScore} ジェフ千葉レディース`
              : undefined
          }
          href="/beleza"
          linkLabel="BELEZAを見る →"
        />
      </section>
    </div>
  );
}
