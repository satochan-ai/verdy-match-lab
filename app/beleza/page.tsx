import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PredictedFormation } from "@/components/match/PredictedFormation";
import {
  belezaTeam,
  jefChibaLadiesTeam,
  belezaMatch,
  belezaPredictedLineup,
  belezaKeyPlayers,
  belezaUnavailablePlayers,
  belezaU20Note,
  belezaPreNote,
  jefChibaLadiesNotes,
} from "@/lib/mock/beleza";

export const metadata: Metadata = {
  title: "ベレーザ MATCH PREVIEW | Verdy Match Lab",
  description: "日テレ・東京ヴェルディベレーザの試合前情報と予想スタメン。",
};

export default function BelezaPage() {
  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">BELEZA MATCH PREVIEW</h1>
        <span className="w-8" />
      </div>

      <section className="border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
        <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
          {belezaMatch.competition}
        </p>
        <p className="mt-2 tabular-nums text-[15px] font-extrabold tracking-wide text-text-secondary lg:text-[17px]">
          {belezaMatch.dateLabel}
        </p>

        {/* mobile: 正式名称を省略せず縦積みで表示する（横並びgridだとtruncateで名称が切れるため） */}
        <div className="mt-4 flex flex-col items-center gap-1.5 text-center lg:hidden">
          <p className="text-[16px] font-extrabold leading-snug text-text-primary">
            {belezaTeam.name}
          </p>
          <p className="text-[10px] font-bold tracking-wide text-text-secondary">HOME</p>
          <p className="py-1 text-[13px] font-extrabold text-fusion-black">VS</p>
          <p className="text-[16px] font-extrabold leading-snug text-text-primary">
            {jefChibaLadiesTeam.name}
          </p>
          <p className="text-[10px] font-bold tracking-wide text-text-secondary">AWAY</p>
        </div>
        <div className="mt-4 flex flex-col items-center gap-1 border-t border-border pt-3 text-center lg:hidden">
          <p className="tabular-nums text-[15px] font-bold text-text-primary">
            {belezaMatch.kickoffLabel}{" "}
            <span className="text-[11px] font-bold text-text-secondary">KICK OFF</span>
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
            <div className="px-4 text-[18px] font-extrabold text-fusion-black">VS</div>
            <div className="min-w-0 text-left">
              <p className="truncate text-[24px] font-extrabold leading-[1.15] text-text-primary">
                {jefChibaLadiesTeam.name}
              </p>
              <p className="mt-0.5 text-[11px] font-bold tracking-wide text-text-secondary">
                AWAY
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-baseline justify-between text-left">
            <p className="tabular-nums text-[16px] font-bold text-text-primary">
              {belezaMatch.kickoffLabel}{" "}
              <span className="text-[12px] font-bold text-text-secondary">KICK OFF</span>
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
    </div>
  );
}
