import { PredictionPitch } from "@/components/match/PredictionPitch";
import { StrategyList } from "@/components/match/StrategyList";
import { PreviewBody, Sources } from "@/components/match/YokohamaFmPreContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  mitoAlternatives,
  mitoAvailability,
  mitoOpponentLineup,
  mitoPreview,
  mitoScorePrediction,
  mitoSources,
  mitoStrategies,
  mitoVerdyLineup,
  mitoVerdySomenoLineup,
} from "@/lib/match/mito-preview";

export function MitoPreContent() {
  return (
    <>
      <section aria-label="水戸戦 MATCH PREVIEW" className="space-y-4 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
        <SectionHeader title="水戸戦 MATCH PREVIEW" eyebrow="MATCH PREVIEW / 2026.11.25" />
        <div className="border-t-2 border-primary-green bg-surface-tint p-4 lg:p-6">
          <PreviewBody preview={mitoPreview} />
        </div>
      </section>

      <section aria-label="水戸戦 軍師の三策" className="space-y-4">
        <StrategyList strategies={mitoStrategies} title="水戸戦 軍師の三策" />
        <p className="text-[13px] leading-relaxed text-text-secondary">Verdy Match Labによる独自の戦術提案です。</p>
      </section>

      <section aria-label="水戸戦 両チーム予想スタメン" className="space-y-4">
        <SectionHeader title="水戸戦 両チーム予想スタメン" eyebrow="PREDICTED LINEUP / 2026.11.25" />
        <p className="text-[13px] font-bold leading-relaxed text-deep-green">Verdy Match Labの独自予想です。攻撃方向を上にそろえ、画面の左右で選手の配置を示します。</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <Lineup lineup={mitoVerdyLineup} tone="verdy" title="東京ヴェルディ 本命案" />
          <Lineup lineup={mitoOpponentLineup} tone="mito" />
        </div>
        <details className="border border-border bg-surface p-3">
          <summary className="cursor-pointer text-[14px] font-extrabold text-deep-green">染野が先発する場合の別案</summary>
          <div className="mt-3 lg:w-1/2">
            <Lineup lineup={mitoVerdySomenoLineup} tone="verdy" title="東京ヴェルディ 染野先発案" />
          </div>
        </details>
        <div className="space-y-2 text-[13px] leading-relaxed text-text-secondary">
          <h3 className="font-extrabold text-deep-green">先発変更の候補</h3>
          <ul className="list-disc space-y-1 pl-5">
            {mitoAlternatives.map((candidate) => <li key={candidate}>{candidate}</li>)}
          </ul>
          <h3 className="font-extrabold text-deep-green">負傷・出場可否・出場停止</h3>
          {mitoAvailability.map((note) => <p key={note}>{note}</p>)}
        </div>
      </section>

      <section aria-label="水戸戦 勝敗予想" className="space-y-4 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
        <SectionHeader title="水戸戦 勝敗予想" eyebrow="SCORE PREDICTION" />
        <div className="space-y-3 border-t-2 border-primary-green bg-surface-tint p-4 lg:p-6">
          <p className="text-[13px] font-bold text-deep-green">Verdy Match Labの予想スコア</p>
          <p className="text-xl font-extrabold tabular-nums text-text-primary">{mitoScorePrediction.score}</p>
          <p className="text-[14px] leading-relaxed text-text-primary">{mitoScorePrediction.reason}</p>
          <h3 className="text-[14px] font-extrabold text-deep-green">予想を左右する条件</h3>
          <p className="text-[14px] leading-relaxed text-text-primary">{mitoScorePrediction.uncertainty}</p>
        </div>
        <h3 className="text-[14px] font-extrabold text-deep-green">参照した情報源（11月22日確認）</h3>
        <Sources sources={mitoSources} />
      </section>
    </>
  );
}

function Lineup({
  lineup,
  tone,
  title = lineup.team,
}: {
  lineup: typeof mitoVerdyLineup | typeof mitoOpponentLineup;
  tone: "verdy" | "mito";
  title?: string;
}) {
  const starters = lineup.rows.flat();
  const numbers = Object.fromEntries(starters.map(({ name, number }) => [name, number]));

  return (
    <article aria-label={`${title} ${lineup.formation}`} className="min-w-0 space-y-2">
      <h3 className="flex justify-between gap-3 text-[16px] font-extrabold text-text-primary">
        <span>{title}</span><span>{lineup.formation}</span>
      </h3>
      <PredictionPitch rows={lineup.rows} numbers={numbers} tone={tone} />
      <p className="text-[13px] leading-relaxed text-text-secondary">{lineup.basis}</p>
      <details className="border border-border bg-surface p-3 text-[13px] leading-relaxed text-text-secondary">
        <summary className="cursor-pointer font-extrabold text-deep-green">{lineup.team}の先発予想と起用理由</summary>
        <dl className="mt-3 space-y-2">
          {starters.map(({ number, name, role, reason }) => (
            <div key={number}>
              <dt className="break-words font-bold text-text-primary">{number} {name}（{role}）</dt>
              <dd>{reason}</dd>
            </div>
          ))}
        </dl>
      </details>
    </article>
  );
}
