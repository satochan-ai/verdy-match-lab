import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BelezaMatchStats } from "@/components/match/BelezaMatchStats";
import { MatchRecord } from "@/components/match/MatchRecord";
import { FormationPitch } from "@/components/match/PredictedFormation";
import { BelezaOfficialLineup } from "@/components/match/BelezaOfficialLineup";
import { BelezaLiveSection } from "@/components/match/BelezaLiveSection";
import { BelezaLiveOfficialLineups } from "@/components/match/BelezaLiveOfficialLineups";
import { resolveMatchStatus } from "@/lib/match/status";
import type { MatchGoal, Team } from "@/types/domain";
import {
  belezaTeam,
  acNaganoTeam,
  inacKobeTeam,
  urawaTeam,
  jefChibaLadiesTeam,
  belezaMatch,
  belezaHalfScores,
  belezaGoals,
  belezaCards,
  belezaSubstitutions,
  belezaOfficialRecord,
  belezaOfficialSourceLabel,
  belezaMatchStats,
  belezaActualLineup,
  belezaActualFormation,
  inacKobeActualLineup,
  belezaPostMatchSummary,
  belezaMatch1,
  belezaMatch1HalfScores,
  belezaMatch1Goals,
  belezaMatch1OfficialRecord,
  belezaMatch1Cards,
  belezaMatch1Substitutions,
  belezaMatch1Stats,
  belezaMatch1OfficialLineup,
  belezaMatch1OfficialBench,
  jefChibaLadiesOfficialLineup,
  jefChibaLadiesOfficialBench,
  belezaMatch2,
  belezaMatch2HalfScores,
  belezaMatch2Goals,
  belezaMatch2OfficialRecord,
  belezaMatch2Cards,
  belezaMatch2Substitutions,
  belezaMatch2Stats,
  belezaMatch2ActualLineup,
  belezaMatch2ActualFormation,
  acNaganoActualLineup,
  acNaganoActualFormation,
  belezaMatch2PostMatchSummary,
  belezaMatch3,
  belezaMatch3HalfScores,
  belezaMatch3Goals,
  belezaMatch3OfficialRecord,
  belezaMatch3Cards,
  belezaMatch3Substitutions,
  belezaMatch3Stats,
  belezaMatch3ActualLineup,
  belezaMatch3ActualFormation,
  urawaActualLineup,
  urawaActualFormation,
  belezaMatch3PostMatchSummary,
} from "@/lib/mock/beleza";

/**
 * BELEZAの個別試合詳細。現在表示中の1試合（belezaMatch）に加え、
 * 過去3試合（beleza-match-1／2／3）も既存route/既存データのまま個別に描画する
 * （新規route・schema変更なし。過去試合の未確認項目は推測で埋めない）。
 * PRE/LIVE判定は kickoffAt と現在時刻の比較（resolveMatchStatus）に依存するため、
 * U-21ページと同じ理由で静的prerenderにしない。
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ベレーザ 試合詳細 | Verdy Match Lab",
  description: "日テレ・東京ヴェルディベレーザの試合結果・記録。",
};

export default async function BelezaMatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === belezaMatch1.id) {
    return <BelezaMatch1Detail />;
  }
  if (id === belezaMatch2.id) {
    return <BelezaMatch2Detail />;
  }
  if (id === belezaMatch3.id) {
    return <BelezaMatch3Detail />;
  }

  // 上記いずれにも該当しないIDは404にする（TOP TEAMの /matches/[id] とはデータ構造が
  // 別のため共通化しない）。
  if (id !== belezaMatch.id) {
    notFound();
  }

  const displayStatus = resolveMatchStatus(belezaMatch, new Date());
  const isFinished = displayStatus === "finished";
  const isLive = displayStatus === "live";
  const isScheduled = displayStatus === "scheduled";
  const belezaScore = belezaMatch.isBelezaHome ? belezaMatch.homeScore : belezaMatch.awayScore;
  const opponentScore = belezaMatch.isBelezaHome ? belezaMatch.awayScore : belezaMatch.homeScore;
  const resultLabel =
    belezaScore === opponentScore ? "draw" : belezaScore > opponentScore ? "win" : "loss";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/beleza" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">
          {isFinished ? "試合終了" : isLive ? "LIVE" : "BELEZA MATCH PREVIEW"}
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
            {belezaMatch.homeTeamName}
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
            {belezaMatch.awayTeamName}
          </p>
          <p className="text-[10px] font-bold tracking-wide text-text-secondary">AWAY</p>
        </div>

        {isFinished && belezaHalfScores && (
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
                {belezaMatch.homeTeamName}
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
                {belezaMatch.awayTeamName}
              </p>
              <p className="mt-0.5 text-[11px] font-bold tracking-wide text-text-secondary">
                AWAY
              </p>
            </div>
          </div>

          {isFinished && belezaHalfScores && (
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

      {isLive && (
        <BelezaLiveSection
          matchId={belezaMatch.id}
          homeTeamName={belezaMatch.homeTeamName}
          awayTeamName={belezaMatch.awayTeamName}
        />
      )}
      {isLive && (
        <BelezaLiveOfficialLineups
          belezaTeam={belezaTeam}
          belezaLineup={belezaActualLineup}
          belezaFormation={belezaActualFormation}
          opponentTeam={inacKobeTeam}
          opponentLineup={inacKobeActualLineup}
        />
      )}
      {isScheduled && (
        <p className="text-[13px] text-text-secondary">
          キックオフ後、この画面でLIVE Scoreとメモを記録できます。
        </p>
      )}

      {isFinished && (
        <section>
          <SectionHeader title="POST MATCH SUMMARY" />
          <p className="text-[13px] leading-relaxed text-text-secondary">{belezaPostMatchSummary}</p>
        </section>
      )}

      {/*
        今節はベレーザのフォーメーションのみ公式に確認できている（相手は開始時フォーメーションが
        未確認）。formationが公式確認できていないチームまで推測で補わないため、片側のみ表示する。
      */}
      {isFinished && (
        <section>
          <SectionHeader title="実際の並び" eyebrow="FORMATION" />
          <div className="space-y-7 border-y border-border bg-surface px-3 py-4">
            <FormationPitch
              team={belezaTeam}
              lineup={belezaActualFormation}
              idPrefix="actual-formation"
            />
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
            ベレーザの実際の並び（{belezaActualFormation.formation}）。{opponentTeamStatsLabel(belezaMatch)}は開始時フォーメーションが公式に確認できていないため、フォーメーション図は未掲載です（スタメン・ベンチは下記MATCH RECORDに記載）。
          </p>
        </section>
      )}

      {isFinished && (
        <MatchRecord
          homeTeamName={belezaMatch.homeTeamName}
          awayTeamName={belezaMatch.awayTeamName}
          goals={belezaGoals}
          cards={belezaCards}
          substitutions={belezaSubstitutions}
          officialRecord={belezaOfficialRecord}
          officialSourceLabel={belezaOfficialSourceLabel}
          actualLineups={
            belezaMatch.isBelezaHome
              ? { home: belezaActualLineup, away: inacKobeActualLineup }
              : { home: inacKobeActualLineup, away: belezaActualLineup }
          }
        />
      )}

      {isFinished && belezaMatchStats && (
        <BelezaMatchStats
          belezaTeamName={belezaTeamStatsLabel(belezaMatch)}
          opponentTeamName={opponentTeamStatsLabel(belezaMatch)}
          stats={belezaMatchStats}
        />
      )}
    </div>
  );
}

function belezaTeamStatsLabel(match: { homeTeamName: string; awayTeamName: string; isBelezaHome: boolean }) {
  return match.isBelezaHome ? match.homeTeamName : match.awayTeamName;
}

function opponentTeamStatsLabel(match: { homeTeamName: string; awayTeamName: string; isBelezaHome: boolean }) {
  return match.isBelezaHome ? match.awayTeamName : match.homeTeamName;
}

/**
 * 過去試合（常にfinished）専用の共通ヒーロー。現在試合（belezaMatch）用ヒーローの
 * isFinished分岐だけを切り出したもので、PRE/LIVE分岐は持たない
 * （過去試合にPRE/LIVE状態は存在しないため）。
 */
function ArchivedMatchHero({
  competition,
  dateLabel,
  resultLabel,
  homeTeamName,
  awayTeamName,
  homeScore,
  awayScore,
  kickoffLabel,
  venue,
  halfScores,
  goals,
}: {
  competition: string;
  dateLabel: string;
  resultLabel: "win" | "draw" | "loss";
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  kickoffLabel: string;
  venue: string;
  halfScores?: { firstHalf: string; secondHalf: string };
  goals: MatchGoal[];
}) {
  return (
    <section className="border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
      <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
        {competition}
      </p>
      <p className="mt-2 tabular-nums text-[15px] font-extrabold tracking-wide text-text-secondary lg:text-[17px]">
        {dateLabel}
      </p>

      <div className="mt-2 flex justify-center">
        <StatusBadge variant={resultLabel} label={resultLabel.toUpperCase()} />
      </div>

      {/* mobile: 正式名称を省略せず縦積みで表示する（横並びgridだとtruncateで名称が切れるため） */}
      <div className="mt-4 flex flex-col items-center gap-1.5 text-center lg:hidden">
        <p className="text-[16px] font-extrabold leading-snug text-text-primary">{homeTeamName}</p>
        <p className="text-[10px] font-bold tracking-wide text-text-secondary">HOME</p>
        <p className="tabular-nums py-1 text-[22px] font-extrabold text-text-primary">
          {homeScore} - {awayScore}
        </p>
        <p className="text-[16px] font-extrabold leading-snug text-text-primary">{awayTeamName}</p>
        <p className="text-[10px] font-bold tracking-wide text-text-secondary">AWAY</p>
      </div>

      {halfScores && (
        <div className="mt-3 flex flex-col items-center gap-2 border-t border-border pt-3 text-center lg:hidden">
          <p className="text-[11px] font-bold text-text-secondary">
            前半 {halfScores.firstHalf} ／ 後半 {halfScores.secondHalf}
          </p>
          {goals.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[12px] text-text-secondary">
              {goals.map((goal) => (
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
          {kickoffLabel} <span className="text-[11px] font-bold text-text-secondary">予定KICK OFF</span>
        </p>
        <p className="text-[12px] text-text-secondary">{venue}</p>
      </div>

      {/* desktop: 既存の横並びレイアウトを維持 */}
      <div className="hidden lg:block">
        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="min-w-0 text-right">
            <p className="truncate text-[24px] font-extrabold leading-[1.15] text-text-primary">
              {homeTeamName}
            </p>
            <p className="mt-0.5 text-[11px] font-bold tracking-wide text-text-secondary">HOME</p>
          </div>
          <p className="tabular-nums px-4 text-[30px] font-extrabold text-text-primary">
            {homeScore} - {awayScore}
          </p>
          <div className="min-w-0 text-left">
            <p className="truncate text-[24px] font-extrabold leading-[1.15] text-text-primary">
              {awayTeamName}
            </p>
            <p className="mt-0.5 text-[11px] font-bold tracking-wide text-text-secondary">AWAY</p>
          </div>
        </div>

        {halfScores && (
          <div className="mt-4 flex flex-col items-center gap-2 border-t border-border pt-4 text-center">
            <p className="text-[12px] font-bold text-text-secondary">
              前半 {halfScores.firstHalf} ／ 後半 {halfScores.secondHalf}
            </p>
            {goals.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-text-secondary">
                {goals.map((goal) => (
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
            {kickoffLabel} <span className="text-[12px] font-bold text-text-secondary">予定KICK OFF</span>
          </p>
          <p className="text-[12px] text-text-secondary">{venue}</p>
        </div>
      </div>
    </section>
  );
}

/** 両チームの実際の並び（formation両方が公式確認済みの節専用）。 */
function TwoTeamFormationSection({
  belezaLineup,
  opponentTeam,
  opponentLineup,
  caption,
}: {
  belezaLineup: { formation: string; starters: { number?: number; name: string; position: string }[] };
  opponentTeam: Team;
  opponentLineup: { formation: string; starters: { number?: number; name: string; position: string }[] };
  caption: string;
}) {
  return (
    <section>
      <SectionHeader title="実際の並び" eyebrow="FORMATION" />
      <div className="space-y-7 border-y border-border bg-surface px-3 py-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <FormationPitch team={belezaTeam} lineup={belezaLineup} idPrefix="actual-formation" />
        <FormationPitch team={opponentTeam} lineup={opponentLineup} idPrefix="actual-formation" />
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">{caption}</p>
    </section>
  );
}

/**
 * 第1節（ジェフ千葉レディース戦）詳細。ActualLineup（GK/DF/MF/FWグループ化）ではなく
 * PredictedLineup + 平坦なベンチ配列で記録されているため、他2節とは別コンポーネント
 * （BelezaOfficialLineup）で公式スタメンを描画する。
 * homeTeamName/awayTeamName/isBelezaHomeはbelezaMatch1オブジェクトに含まれないため、
 * 既存のbelezaSeasonHistory記録（同じ事実）と一致する値をここで補って渡す
 * （新しい事実の追加ではない）。
 */
function BelezaMatch1Detail() {
  const homeTeamName = belezaTeam.name;
  const awayTeamName = jefChibaLadiesTeam.name;
  const isBelezaHome = true;
  const belezaScore = isBelezaHome ? belezaMatch1.homeScore : belezaMatch1.awayScore;
  const opponentScore = isBelezaHome ? belezaMatch1.awayScore : belezaMatch1.homeScore;
  const resultLabel = belezaScore === opponentScore ? "draw" : belezaScore > opponentScore ? "win" : "loss";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/beleza" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">試合終了</h1>
        <span className="w-8" />
      </div>

      <ArchivedMatchHero
        competition={belezaMatch1.competition}
        dateLabel={belezaMatch1.dateLabel}
        resultLabel={resultLabel}
        homeTeamName={homeTeamName}
        awayTeamName={awayTeamName}
        homeScore={belezaMatch1.homeScore}
        awayScore={belezaMatch1.awayScore}
        kickoffLabel={belezaMatch1.kickoffLabel}
        venue={belezaMatch1.venue}
        halfScores={belezaMatch1HalfScores}
        goals={belezaMatch1Goals}
      />

      <BelezaOfficialLineup
        belezaTeam={belezaTeam}
        belezaLineup={belezaMatch1OfficialLineup}
        belezaBench={belezaMatch1OfficialBench}
        opponentTeam={jefChibaLadiesTeam}
        opponentLineup={jefChibaLadiesOfficialLineup}
        opponentBench={jefChibaLadiesOfficialBench}
      />

      <MatchRecord
        homeTeamName={homeTeamName}
        awayTeamName={awayTeamName}
        goals={belezaMatch1Goals}
        cards={belezaMatch1Cards}
        substitutions={belezaMatch1Substitutions}
        officialRecord={belezaMatch1OfficialRecord}
        officialSourceLabel="WE LEAGUE Official Match Record"
      />

      <BelezaMatchStats
        belezaTeamName={homeTeamName}
        opponentTeamName={awayTeamName}
        stats={belezaMatch1Stats}
      />
    </div>
  );
}

/** 第2節（AC長野パルセイロ・レディース戦）詳細。既存アーカイブデータをそのまま描画する。 */
function BelezaMatch2Detail() {
  const belezaScore = belezaMatch2.isBelezaHome ? belezaMatch2.homeScore : belezaMatch2.awayScore;
  const opponentScore = belezaMatch2.isBelezaHome ? belezaMatch2.awayScore : belezaMatch2.homeScore;
  const resultLabel = belezaScore === opponentScore ? "draw" : belezaScore > opponentScore ? "win" : "loss";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/beleza" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">試合終了</h1>
        <span className="w-8" />
      </div>

      <ArchivedMatchHero
        competition={belezaMatch2.competition}
        dateLabel={belezaMatch2.dateLabel}
        resultLabel={resultLabel}
        homeTeamName={belezaMatch2.homeTeamName}
        awayTeamName={belezaMatch2.awayTeamName}
        homeScore={belezaMatch2.homeScore}
        awayScore={belezaMatch2.awayScore}
        kickoffLabel={belezaMatch2.kickoffLabel}
        venue={belezaMatch2.venue}
        halfScores={belezaMatch2HalfScores}
        goals={belezaMatch2Goals}
      />

      <section>
        <SectionHeader title="POST MATCH SUMMARY" />
        <p className="text-[13px] leading-relaxed text-text-secondary">{belezaMatch2PostMatchSummary}</p>
      </section>

      <TwoTeamFormationSection
        belezaLineup={belezaMatch2ActualFormation}
        opponentTeam={acNaganoTeam}
        opponentLineup={acNaganoActualFormation}
        caption={`両チームの実際の並び（${belezaMatch2ActualFormation.formation}）。試合終了後のスクリーンショットに基づく配置です。`}
      />

      <MatchRecord
        homeTeamName={belezaMatch2.homeTeamName}
        awayTeamName={belezaMatch2.awayTeamName}
        goals={belezaMatch2Goals}
        cards={belezaMatch2Cards}
        substitutions={belezaMatch2Substitutions}
        officialRecord={belezaMatch2OfficialRecord}
        officialSourceLabel="WE LEAGUE Official Match Record"
        actualLineups={
          belezaMatch2.isBelezaHome
            ? { home: belezaMatch2ActualLineup, away: acNaganoActualLineup }
            : { home: acNaganoActualLineup, away: belezaMatch2ActualLineup }
        }
      />

      <BelezaMatchStats
        belezaTeamName={belezaTeamStatsLabel(belezaMatch2)}
        opponentTeamName={opponentTeamStatsLabel(belezaMatch2)}
        stats={belezaMatch2Stats}
      />
    </div>
  );
}

/** 第3節（三菱重工浦和レッズレディース戦）詳細。既存アーカイブデータをそのまま描画する。 */
function BelezaMatch3Detail() {
  const belezaScore = belezaMatch3.isBelezaHome ? belezaMatch3.homeScore : belezaMatch3.awayScore;
  const opponentScore = belezaMatch3.isBelezaHome ? belezaMatch3.awayScore : belezaMatch3.homeScore;
  const resultLabel = belezaScore === opponentScore ? "draw" : belezaScore > opponentScore ? "win" : "loss";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/beleza" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">試合終了</h1>
        <span className="w-8" />
      </div>

      <ArchivedMatchHero
        competition={belezaMatch3.competition}
        dateLabel={belezaMatch3.dateLabel}
        resultLabel={resultLabel}
        homeTeamName={belezaMatch3.homeTeamName}
        awayTeamName={belezaMatch3.awayTeamName}
        homeScore={belezaMatch3.homeScore}
        awayScore={belezaMatch3.awayScore}
        kickoffLabel={belezaMatch3.kickoffLabel}
        venue={belezaMatch3.venue}
        halfScores={belezaMatch3HalfScores}
        goals={belezaMatch3Goals}
      />

      <section>
        <SectionHeader title="POST MATCH SUMMARY" />
        <p className="text-[13px] leading-relaxed text-text-secondary">{belezaMatch3PostMatchSummary}</p>
      </section>

      {belezaMatch3ActualFormation && urawaActualFormation && (
        <TwoTeamFormationSection
          belezaLineup={belezaMatch3ActualFormation}
          opponentTeam={urawaTeam}
          opponentLineup={urawaActualFormation}
          caption={`両チームの実際の並び（${belezaTeam.name}：${belezaMatch3ActualFormation.formation}／${urawaTeam.name}：${urawaActualFormation.formation}）。公式確認済みの開始時フォーメーションに基づく配置です。`}
        />
      )}

      <MatchRecord
        homeTeamName={belezaMatch3.homeTeamName}
        awayTeamName={belezaMatch3.awayTeamName}
        goals={belezaMatch3Goals}
        cards={belezaMatch3Cards}
        substitutions={belezaMatch3Substitutions}
        officialRecord={belezaMatch3OfficialRecord}
        officialSourceLabel="WE LEAGUE Official Match Record"
        actualLineups={
          belezaMatch3.isBelezaHome
            ? { home: belezaMatch3ActualLineup, away: urawaActualLineup }
            : { home: urawaActualLineup, away: belezaMatch3ActualLineup }
        }
      />

      <BelezaMatchStats
        belezaTeamName={belezaTeamStatsLabel(belezaMatch3)}
        opponentTeamName={opponentTeamStatsLabel(belezaMatch3)}
        stats={belezaMatch3Stats}
      />
    </div>
  );
}
