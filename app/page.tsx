import Link from "next/link";
import { getNextMatch, getRecentFinishedMatchSummary } from "@/lib/data/matches";
import { MatchMeta } from "@/components/match/MatchMeta";
import { StrategyList } from "@/components/match/StrategyList";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default async function Home() {
  const [nextMatch, recent] = await Promise.all([
    getNextMatch(),
    getRecentFinishedMatchSummary(),
  ]);
  const opponent = nextMatch.isVerdyHome ? nextMatch.awayTeam : nextMatch.homeTeam;
  const recentOpponent = recent.isVerdyHome ? recent.awayTeam : recent.homeTeam;
  const recentResult =
    recent.homeScore! === recent.awayScore!
      ? "draw"
      : (recent.isVerdyHome && recent.homeScore! > recent.awayScore!) ||
        (!recent.isVerdyHome && recent.awayScore! > recent.homeScore!)
      ? "win"
      : "loss";

  return (
    <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
      <section className="border border-border bg-surface p-4">
        <p className="text-[12px] font-bold tracking-wide text-text-secondary">
          NEXT MATCH
        </p>
        <div className="mt-3 flex items-center justify-center gap-4">
          <div className="flex-1 text-right">
            <p className="text-[16px] font-bold text-text-primary">東京ヴェルディ</p>
            <p className="text-[11px] text-text-secondary">
              {nextMatch.isVerdyHome ? "HOME" : "AWAY"}
            </p>
          </div>
          <div className="text-[13px] text-text-secondary">vs</div>
          <div className="flex-1 text-left">
            <p className="text-[16px] font-bold text-text-primary">{opponent.name}</p>
            <p className="text-[11px] text-text-secondary">
              {nextMatch.isVerdyHome ? "AWAY" : "HOME"}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-3">
          <MatchMeta match={nextMatch} showCountdown />
        </div>

        <Link
          href={`/matches/${nextMatch.id}`}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-md bg-primary-green text-[15px] font-bold text-white"
        >
          試合詳細を見る
        </Link>
      </section>

      <div>
        <StrategyList strategies={nextMatch.strategies} />
        <p className="mt-4 border-l-2 border-primary-green pl-3 text-[13px] leading-relaxed text-text-secondary">
          MATCH DAY TOOLとして、試合前の注目点を整理し、観戦中の戦術の変化を追います。
        </p>
      </div>

      <section className="lg:col-span-2">
        <p className="mb-2 text-[13px] font-bold text-text-primary">直近の試合</p>
        <Link
          href={`/matches/${recent.id}`}
          className="flex items-center justify-between border border-border bg-surface px-4 py-3"
        >
          <span className="text-[13px] text-text-primary">
            {recentOpponent.name}　{recent.homeScore}-{recent.awayScore}
          </span>
          <StatusBadge variant={recentResult} />
        </Link>
      </section>

      <Link href="/archive" className="block text-center text-[13px] font-bold text-deep-green lg:col-span-2">
        アーカイブを見る →
      </Link>
    </div>
  );
}
