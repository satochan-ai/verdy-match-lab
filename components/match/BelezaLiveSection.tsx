"use client";

import { useEffect, useState } from "react";
import { LiveScoreControl } from "@/components/match/LiveScoreControl";
import { LiveNote } from "@/components/match/LiveNote";
import { readLiveScore, writeLiveScore } from "@/lib/client/match-storage";

/**
 * BELEZA用のLIVE Score + LIVE Note。U21LiveSectionと同じstorage関数・
 * 0未満防止ロジックを再利用する（matchId単位で保存されるため、
 * TOP TEAM／U-21のlocalStorageと自動的に分離される）。
 */
export function BelezaLiveSection({
  matchId,
  homeTeamName,
  awayTeamName,
}: {
  matchId: string;
  homeTeamName: string;
  awayTeamName: string;
}) {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [isScoreRestored, setIsScoreRestored] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = readLiveScore(matchId);
      if (saved) {
        setHomeScore(saved.homeScore);
        setAwayScore(saved.awayScore);
      }
      setIsScoreRestored(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [matchId]);

  useEffect(() => {
    if (!isScoreRestored) return;
    writeLiveScore(matchId, homeScore, awayScore);
  }, [isScoreRestored, matchId, homeScore, awayScore]);

  return (
    <div className="space-y-6">
      <LiveScoreControl
        homeTeamName={homeTeamName}
        awayTeamName={awayTeamName}
        homeScore={homeScore}
        awayScore={awayScore}
        onHomeIncrement={() => setHomeScore((prev) => prev + 1)}
        onHomeDecrement={() => setHomeScore((prev) => Math.max(0, prev - 1))}
        onAwayIncrement={() => setAwayScore((prev) => prev + 1)}
        onAwayDecrement={() => setAwayScore((prev) => Math.max(0, prev - 1))}
      />
      <LiveNote matchId={matchId} />
    </div>
  );
}
