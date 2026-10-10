import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import somaAnalysis from "@/public/images/soma-naoki-tactical-analysis-20261008.png";
import { getMatchResult } from "@/lib/match/result";
import { getNextMatch, getRecentFinishedMatchSummary } from "@/lib/data/matches";
import { topFixtures, toTopUpcomingFixture } from "@/lib/data/top-fixtures";
import { getNextFixture, getUpcomingFixtures } from "@/lib/data/fixture-selectors";
import { StrategyList } from "@/components/match/StrategyList";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FixtureMetaLine } from "@/components/match/FixtureMetaLine";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { UpcomingFixtureList } from "@/components/match/UpcomingFixtureList";
import { LeagueStandingsTable } from "@/components/match/LeagueStandingsTable";
import { j1Standings } from "@/lib/mock/standings";
import { getMatchDayLabel } from "@/lib/match/display";
import { OpponentRecentMatches } from "@/components/match/OpponentRecentMatches";
import { resolveMatchStatus } from "@/lib/match/status";
import { HiroshimaPredictions } from "@/components/match/HiroshimaPredictions";
import { HiroshimaMatchPreview } from "@/components/match/HiroshimaMatchPreview";

export const metadata: Metadata = {
  title: "東京ヴェルディ TOP TEAM | Verdy Match Lab",
  description: "東京ヴェルディ トップチームの試合情報・軍師の三策・NEXT 5。",
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
    mmdd: `${part("month")}.${part("day")}`,
    weekday: part("weekday").toUpperCase(),
    time: `${part("hour")}:${part("minute")}`,
  };
}

function formatShortDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default async function TopTeamPage() {
  const [nextMatch, recent] = await Promise.all([
    getNextMatch(),
    getRecentFinishedMatchSummary(),
  ]);
  const now = new Date();
  // 広島戦プレビューは試合開始後も「試合前時点」として残すため、NEXTではなくidで固定して参照する。
  const hiroshimaFixture = topFixtures.find((fixture) => fixture.id === "sched-hiroshima");
  const nextFixture = getNextFixture(topFixtures, now);
  const liveFixture = topFixtures.find(
    (fixture) =>
      fixture.status === "scheduled" &&
      fixture.kickoffAt &&
      resolveMatchStatus({ status: "scheduled", kickoffAt: fixture.kickoffAt }, now) === "live",
  );
  const displayFixture = liveFixture ?? nextFixture;
  const topUpcoming = getUpcomingFixtures(topFixtures, now, 5).map(toTopUpcomingFixture);
  // nextMatchがnull（scheduledな試合が未登録）の場合は、過去試合を出さずに
  // 「次戦情報準備中」の空状態を表示する。LAST MATCH / NEXT 5は独立して表示する。
  const opponent = displayFixture
    ? { name: displayFixture.opponentName }
    : null;
  const recentOpponent = recent.isVerdyHome ? recent.awayTeam : recent.homeTeam;
  const recentResult = getMatchResult(recent);

  const fixture = displayFixture?.kickoffAt ? formatMatchday(displayFixture.kickoffAt) : null;
  // 表示中のNEXT fixture（topFixtures由来）から直接決める。scheduledなMatch行（nextMatch）が
  // 無い期間でも、NEXT MATCHの日数表示が空状態にならないようにする。
  const dayLabel = liveFixture
    ? { kind: "live" as const }
    : displayFixture?.kickoffAt
      ? getMatchDayLabel({ status: "scheduled", kickoffAt: displayFixture.kickoffAt }, now)
      : null;

  return (
    <div className="space-y-6">
      <Link href="/" className="text-[13px] font-bold text-deep-green">
        ← 戻る
      </Link>

      <header className="border-l-2 border-pioneer-gold pl-4 lg:pl-5">
        <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep">TOP TEAM</p>
        <h1 className="mt-1 text-[22px] font-extrabold tracking-tight text-text-primary lg:text-[28px]">
          東京ヴェルディ TOP TEAM
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-text-secondary lg:text-[14px]">
          TOP TEAMを、試合データと戦術で追う。次戦プレビュー、予想フォーメーション、試合結果、順位表まで。
        </p>
      </header>

      <div className="space-y-8 lg:space-y-10">
              {displayFixture && fixture && opponent && dayLabel ? (
          <section className="section-reveal border-y-2 border-fusion-black bg-surface-tint px-4 py-6 lg:px-10 lg:py-8">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
                NEXT MATCH
              </p>
              {dayLabel.kind === "days" && <p className="text-[11px] font-bold text-primary-green">あと{dayLabel.days}日</p>}
              {dayLabel.kind === "today" && <p className="text-[11px] font-bold text-primary-green">今日</p>}
              {dayLabel.kind === "live" && <p className="text-[11px] font-bold text-primary-green">試合中</p>}
            </div>

            <p className="mt-2 tabular-nums text-[15px] font-extrabold tracking-wide text-text-secondary lg:text-[17px]">
              {fixture.mmdd} <span className="ml-1">{fixture.weekday}</span>
            </p>

              {displayFixture.competition && (
                <div className="mt-2">
                <FixtureMetaLine meta={{ competition: displayFixture.competition.name, roundLabel: displayFixture.competition.round }} />
              </div>
            )}

            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 lg:mt-5 lg:gap-6">
              <div className="min-w-0 text-right">
                <p className="min-w-0 break-words text-[15px] font-extrabold leading-[1.15] text-text-primary lg:text-[36px]">
                  東京ヴェルディ
                </p>
                <p className="mt-0.5 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
                  {displayFixture.isHome ? "HOME" : "AWAY"}
                </p>
              </div>
              <div className="px-1.5 text-[13px] font-extrabold text-fusion-black lg:px-4 lg:text-[18px]">
                VS
              </div>
              <div className="min-w-0 text-left">
                <p className="min-w-0 break-words text-[15px] font-extrabold leading-[1.15] text-text-primary lg:text-[36px]">
                  {opponent.name}
                </p>
                <p className="mt-0.5 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
                  {displayFixture.isHome ? "AWAY" : "HOME"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-1 border-t border-border pt-3 text-center lg:mt-6 lg:flex-row lg:items-baseline lg:justify-between lg:border-t-0 lg:pt-0 lg:text-left">
              <p className="tabular-nums text-[15px] font-bold text-text-primary lg:text-[16px]">
                {fixture.time}{" "}
                <span className="text-[11px] font-bold text-text-secondary lg:text-[12px]">
                  KICK OFF
                </span>
              </p>
              <p className="text-[12px] text-text-secondary">{displayFixture.venue}</p>
              <Link
                href={displayFixture.detailMatchId ? `/matches/${displayFixture.detailMatchId}` : "/top"}
                className="mt-3 flex h-12 w-full items-center justify-center bg-primary-green text-[14px] font-bold text-white lg:mt-0 lg:inline-flex lg:h-10 lg:w-auto lg:px-5"
              >
                試合詳細を見る
              </Link>
            </div>
          </section>
          ) : (
          <section className="section-reveal border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
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

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
            <div className="space-y-8">
              {nextFixture?.opponentRecentMatches && (
                <OpponentRecentMatches matches={nextFixture.opponentRecentMatches} />
              )}

              {nextMatch && <StrategyList strategies={nextMatch.strategies} />}
            </div>

            <div className="space-y-6 border-t border-border pt-6 lg:border-t-0 lg:pt-0">
              <section>
                <p className="text-[10px] font-bold tracking-[0.15em] text-text-secondary">LAST MATCH</p>
                <Link href={`/matches/${recent.id}`} className="mt-2 block border-t border-border py-2 text-[13px]">
                  <div className="flex items-center justify-between">
                    <span className="min-w-0 truncate text-text-primary">
                      {formatShortDate(recent.kickoffAt)}　{recentOpponent.name}
                    </span>
                    <span className="ml-2 flex shrink-0 items-center gap-2">
                      <span className="tabular-nums font-bold text-text-primary">{recent.homeScore}-{recent.awayScore}</span>
                      {recent.penaltyShootout && <span className="text-[12px]">PK {recent.penaltyShootout.homeScore}-{recent.penaltyShootout.awayScore}</span>}
                      <StatusBadge variant={recentResult} />
                    </span>
                  </div>
                  {recent.fixtureMeta && <div className="mt-1"><FixtureMetaLine meta={recent.fixtureMeta} compact /></div>}
                </Link>
              </section>
              <Link href="/archive" className="block text-[12px] font-bold text-deep-green">過去の試合を見る →</Link>
            </div>
          </div>

          {topUpcoming.length > 0 && (
            <section>
              <SectionHeader title="NEXT 5" eyebrow="UPCOMING FIXTURES" />
              <UpcomingFixtureList fixtures={topUpcoming} variant="top" />
            </section>
          )}

          <section aria-labelledby="soma-feature-title" className="space-y-4 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">MANAGER FEATURE</p>
              <h2 id="soma-feature-title" className="mt-1 text-[20px] font-extrabold leading-snug text-text-primary lg:text-[24px]">
                相馬直樹新監督特集｜4-4-2を軸に東京Vはどう変わる？
              </h2>
              <p className="mt-2 text-[14px] text-text-secondary">新体制の戦術と選手起用を考察</p>
            </div>
            <a href="/images/soma-naoki-tactical-analysis-20261008.png" target="_blank" rel="noopener noreferrer" className="block" aria-label="相馬直樹監督の戦術分析画像を原寸で開く（新しいタブ）">
              <Image src={somaAnalysis} alt="相馬直樹監督の2026年10月8日就任、鹿児島2025年の4-4-2採用実績と、東京Vでの非公式の起用・戦術予想を整理した図" className="h-auto w-full" sizes="(min-width: 1280px) 1200px, 100vw" />
            </a>
            <p className="text-[12px] text-text-secondary">画像を選ぶと原寸で開きます。小さい文字は拡大してご覧ください。</p>
            <p className="text-[14px] leading-relaxed text-text-primary">
              相馬直樹新監督の就任を受け、過去の4-4-2採用傾向と戦術的な特徴を整理しました。東京ヴェルディの現有戦力を踏まえ、染野唯月と一美和成の2トップ、藤本寛也の右サイド、新井悠太の左サイドなどを独自に予想しています。
            </p>
            <p className="text-[13px] font-bold leading-relaxed text-deep-green">
              本特集は非公式の独自分析・予想です。実際の起用やフォーメーションを示す公式情報ではありません。
            </p>
            <p className="text-[12px] leading-relaxed text-text-secondary">
              就任情報はクラブ公式発表、鹿児島2025年の38試合・18勝12分8敗はFootball LABを参照しています。4-4-2はFootball LABによる試合開始時の独自判定です。プレス・守備組織・縦攻撃・4-2-2-2への可変は当サイトの分析・予想で、監督の確定的な方針ではありません。
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
              <a href="https://www.verdy.co.jp/news/15277" target="_blank" rel="noopener noreferrer" className="font-bold text-deep-green underline">東京ヴェルディ公式：監督就任のお知らせ</a>
              <a href="https://www.football-lab.jp/kufc/formation?year=2025" target="_blank" rel="noopener noreferrer" className="font-bold text-deep-green underline">Football LAB：鹿児島2025年フォーメーション</a>
            </div>
          </section>

          {hiroshimaFixture && <HiroshimaMatchPreview fixture={hiroshimaFixture} />}

          <HiroshimaPredictions />

          <LeagueStandingsTable standings={j1Standings} highlightTeamName="東京ヴェルディ" />
      </div>
    </div>
  );
}
