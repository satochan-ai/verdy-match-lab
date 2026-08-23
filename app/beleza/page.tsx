import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PredictedFormation } from "@/components/match/PredictedFormation";
import { BelezaOfficialLineup } from "@/components/match/BelezaOfficialLineup";
import { BelezaSeasonHistory } from "@/components/match/BelezaSeasonHistory";
import { BelezaMatchStats } from "@/components/match/BelezaMatchStats";
import { MatchRecord } from "@/components/match/MatchRecord";
import { UpcomingFixtureList } from "@/components/match/UpcomingFixtureList";
import {
  belezaTeam,
  jefChibaLadiesTeam,
  belezaMatch,
  belezaHalfScores,
  belezaGoals,
  belezaCards,
  belezaSubstitutions,
  belezaOfficialRecord,
  belezaOfficialSourceLabel,
  belezaMatchStats,
  belezaPredictedLineup,
  belezaKeyPlayers,
  belezaOfficialLineup,
  belezaOfficialBench,
  jefChibaLadiesOfficialLineup,
  jefChibaLadiesOfficialBench,
  belezaUnavailablePlayers,
  belezaU20Note,
  belezaPreNote,
  jefChibaLadiesNotes,
  belezaSeasonHistory,
  belezaUpcomingMatches,
} from "@/lib/mock/beleza";

export const metadata: Metadata = {
  title: "ベレーザ MATCH | Verdy Match Lab",
  description: "日テレ・東京ヴェルディベレーザの試合情報。",
};

export default function BelezaPage() {
  const isFinished = belezaMatch.status === "finished";
  const resultLabel =
    belezaMatch.homeScore === belezaMatch.awayScore
      ? "draw"
      : belezaMatch.homeScore > belezaMatch.awayScore
        ? "win"
        : "loss";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">
          {isFinished ? "試合終了" : "BELEZA MATCH PREVIEW"}
        </h1>
        <span className="w-8" />
      </div>

      <section className="border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
        <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
          {belezaMatch.competition}
        </p>
        <p className="mt-2 tabular-nums text-[15px] font-extrabold tracking-wide text-text-secondary lg:text-[17px]">
          {belezaMatch.dateLabel}
        </p>

        {isFinished && (
          <div className="mt-2 flex justify-center">
            <StatusBadge variant={resultLabel} label={resultLabel.toUpperCase()} />
          </div>
        )}

        {/* mobile: 正式名称を省略せず縦積みで表示する（横並びgridだとtruncateで名称が切れるため） */}
        <div className="mt-4 flex flex-col items-center gap-1.5 text-center lg:hidden">
          <p className="text-[16px] font-extrabold leading-snug text-text-primary">
            {belezaTeam.name}
          </p>
          <p className="text-[10px] font-bold tracking-wide text-text-secondary">HOME</p>
          {isFinished ? (
            <p className="tabular-nums py-1 text-[22px] font-extrabold text-text-primary">
              {belezaMatch.homeScore} - {belezaMatch.awayScore}
            </p>
          ) : (
            <p className="py-1 text-[13px] font-extrabold text-fusion-black">VS</p>
          )}
          <p className="text-[16px] font-extrabold leading-snug text-text-primary">
            {jefChibaLadiesTeam.name}
          </p>
          <p className="text-[10px] font-bold tracking-wide text-text-secondary">AWAY</p>
        </div>

        {isFinished && (
          <div className="mt-3 flex flex-col items-center gap-2 border-t border-border pt-3 text-center lg:hidden">
            <p className="text-[11px] font-bold text-text-secondary">
              前半 {belezaHalfScores.firstHalf} ／ 後半 {belezaHalfScores.secondHalf}
            </p>
            {belezaGoals.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[12px] text-text-secondary">
                {belezaGoals.map((goal) => (
                  <li key={`${goal.minute}-${goal.scorer}`} className="tabular-nums">
                    {goal.minute} <span className="text-text-primary">{goal.scorer}</span>（{goal.team}）
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-4 flex flex-col items-center gap-1 border-t border-border pt-3 text-center lg:hidden">
          <p className="tabular-nums text-[15px] font-bold text-text-primary">
            {belezaMatch.kickoffLabel}{" "}
            <span className="text-[11px] font-bold text-text-secondary">
              {isFinished ? "予定KICK OFF" : "KICK OFF"}
            </span>
          </p>
          <p className="text-[12px] text-text-secondary">{belezaMatch.venue}</p>
        </div>

        {/* desktop: 既存の横並びレイアウトを維持 */}
        <div className="hidden lg:block">
          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div className="min-w-0 text-right">
              <p className="truncate text-[24px] font-extrabold leading-[1.15] text-text-primary">
                {belezaTeam.name}
              </p>
              <p className="mt-0.5 text-[11px] font-bold tracking-wide text-text-secondary">
                HOME
              </p>
            </div>
            {isFinished ? (
              <p className="tabular-nums px-4 text-[30px] font-extrabold text-text-primary">
                {belezaMatch.homeScore} - {belezaMatch.awayScore}
              </p>
            ) : (
              <div className="px-4 text-[18px] font-extrabold text-fusion-black">VS</div>
            )}
            <div className="min-w-0 text-left">
              <p className="truncate text-[24px] font-extrabold leading-[1.15] text-text-primary">
                {jefChibaLadiesTeam.name}
              </p>
              <p className="mt-0.5 text-[11px] font-bold tracking-wide text-text-secondary">
                AWAY
              </p>
            </div>
          </div>

          {isFinished && (
            <div className="mt-4 flex flex-col items-center gap-2 border-t border-border pt-4 text-center">
              <p className="text-[12px] font-bold text-text-secondary">
                前半 {belezaHalfScores.firstHalf} ／ 後半 {belezaHalfScores.secondHalf}
              </p>
              {belezaGoals.length > 0 && (
                <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-text-secondary">
                  {belezaGoals.map((goal) => (
                    <li key={`${goal.minute}-${goal.scorer}`} className="tabular-nums">
                      {goal.minute} <span className="text-text-primary">{goal.scorer}</span>（{goal.team}）
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="mt-6 flex items-baseline justify-between text-left">
            <p className="tabular-nums text-[16px] font-bold text-text-primary">
              {belezaMatch.kickoffLabel}{" "}
              <span className="text-[12px] font-bold text-text-secondary">
                {isFinished ? "予定KICK OFF" : "KICK OFF"}
              </span>
            </p>
            <p className="text-[12px] text-text-secondary">{belezaMatch.venue}</p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="予想スタメン" eyebrow="PREDICTED LINEUP" />
        <ul className="border-y border-border">
          {belezaPredictedLineup.starters.map((starter, index) => (
            <li
              key={`${starter.position}-${starter.number ?? "tbd"}-${starter.name}-${index}`}
              className="grid grid-cols-[2rem_2rem_minmax(0,1fr)] items-center gap-x-2 border-b border-border py-2 text-[13px] last:border-b-0"
            >
              <span className="text-[10px] font-bold text-text-secondary">{starter.position}</span>
              <span className="tabular-nums text-right text-text-secondary">{starter.number}</span>
              <span className="min-w-0 pl-1">
                <span className="block font-bold text-text-primary">{starter.name}</span>
                {starter.alternative && (
                  <span className="block truncate text-[10px] font-normal text-text-secondary">
                    別候補：{starter.alternative}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="text-[11px] font-bold tracking-[0.08em] text-text-secondary">
            PREDICTED FORMATION / 予想フォーメーション
          </p>
          <div className="mt-2">
            <PredictedFormation team={belezaTeam} lineup={belezaPredictedLineup} />
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
          直近情報を基にした予想です。公式のStarting XIではありません。実際の先発メンバーとは異なる場合があります。
        </p>
      </section>

      <BelezaOfficialLineup
        belezaTeam={belezaTeam}
        belezaLineup={belezaOfficialLineup}
        belezaBench={belezaOfficialBench}
        opponentTeam={jefChibaLadiesTeam}
        opponentLineup={jefChibaLadiesOfficialLineup}
        opponentBench={jefChibaLadiesOfficialBench}
      />

      {isFinished && (
        <MatchRecord
          homeTeamName={belezaTeam.name}
          awayTeamName={jefChibaLadiesTeam.name}
          goals={belezaGoals}
          cards={belezaCards}
          substitutions={belezaSubstitutions}
          officialRecord={belezaOfficialRecord}
          officialSourceLabel={belezaOfficialSourceLabel}
        />
      )}

      {isFinished && (
        <BelezaMatchStats
          belezaTeamName={belezaTeam.name}
          opponentTeamName={jefChibaLadiesTeam.name}
          stats={belezaMatchStats}
        />
      )}

      <section>
        <SectionHeader title="欠場予定" eyebrow="UNAVAILABLE" />
        <ul className="divide-y divide-border border-y border-border bg-surface px-3 text-[13px]">
          {belezaUnavailablePlayers.map((player) => (
            <li key={player} className="py-2 font-bold text-text-primary">
              {player}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="border-l-2 border-pioneer-gold bg-surface px-3 py-2 text-[12px] leading-relaxed text-text-secondary">
          {belezaU20Note}
        </p>
      </section>

      <section>
        <SectionHeader title="KEY PLAYERS" eyebrow="ベレーザ注目選手" />
        <ul className="divide-y divide-border border-y border-border">
          {belezaKeyPlayers.map((player) => (
            <li key={player.name} className="py-2.5 text-[13px]">
              <p className="font-bold text-text-primary">{player.name}</p>
              <p className="mt-0.5 text-text-secondary">{player.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeader title="PRE NOTE" />
        <p className="text-[13px] leading-relaxed text-text-secondary">{belezaPreNote}</p>
      </section>

      <section>
        <SectionHeader title="ジェフ千葉L簡易情報" />
        <ul className="list-disc space-y-1 pl-4 text-[13px] text-text-secondary">
          {jefChibaLadiesNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      {belezaSeasonHistory.length > 0 && (
        <section>
          <SectionHeader title="2026/27シーズン試合履歴" eyebrow="SEASON HISTORY" />
          <BelezaSeasonHistory entries={belezaSeasonHistory} />
        </section>
      )}

      {belezaUpcomingMatches.length > 0 && (
        <section>
          <SectionHeader title="NEXT 5" eyebrow="UPCOMING FIXTURES" />
          <UpcomingFixtureList fixtures={belezaUpcomingMatches} />
        </section>
      )}
    </div>
  );
}
