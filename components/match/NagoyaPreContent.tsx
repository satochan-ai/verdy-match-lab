import { PredictionPitch } from "@/components/match/PredictionPitch";
import { StrategyList } from "@/components/match/StrategyList";
import { PreviewBody, Sources } from "@/components/match/YokohamaFmPreContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  nagoyaAlternatives,
  nagoyaAvailability,
  nagoyaOpponentLineup,
  nagoyaPreview,
  nagoyaScorePrediction,
  nagoyaSources,
  nagoyaStrategies,
  nagoyaVerdyLineup,
} from "@/lib/match/nagoya-preview";

export function NagoyaPreContent() {
  return (
    <>
      <section aria-label="名古屋戦 MATCH PREVIEW" className="space-y-4 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
        <SectionHeader title="名古屋戦 MATCH PREVIEW" eyebrow="MATCH PREVIEW / 2026.11.21" />
        <div className="border-t-2 border-primary-green bg-surface-tint p-4 lg:p-6">
          <PreviewBody preview={nagoyaPreview} />
        </div>
      </section>

      <section aria-label="名古屋戦 軍師の三策" className="space-y-4">
        <StrategyList strategies={nagoyaStrategies} title="名古屋戦 軍師の三策" />
        <p className="text-[13px] leading-relaxed text-text-secondary">Verdy Match Labによる独自の戦術提案です。</p>
      </section>

      <section aria-label="名古屋戦 両チーム予想スタメン" className="space-y-4">
        <SectionHeader title="名古屋戦 両チーム予想スタメン" eyebrow="PREDICTED LINEUP / 2026.11.21" />
        <p className="text-[13px] font-bold leading-relaxed text-deep-green">Verdy Match Labの独自予想です。攻撃方向を上にそろえ、画面の左右で選手の配置を示します。</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <Lineup lineup={nagoyaVerdyLineup} tone="verdy" />
          <Lineup lineup={nagoyaOpponentLineup} tone="nagoya" />
        </div>
        <div className="space-y-2 text-[13px] leading-relaxed text-text-secondary">
          <h3 className="font-extrabold text-deep-green">東京Vの先発変更候補</h3>
          <ul className="list-disc space-y-1 pl-5">
            {nagoyaAlternatives.map((candidate) => <li key={candidate}>{candidate}</li>)}
          </ul>
          <h3 className="font-extrabold text-deep-green">負傷・復帰・代表招集・出場停止</h3>
          {nagoyaAvailability.map((note) => <p key={note}>{note}</p>)}
        </div>
      </section>

      <section aria-label="名古屋戦 勝敗予想" className="space-y-4 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
        <SectionHeader title="名古屋戦 勝敗予想" eyebrow="SCORE PREDICTION" />
        <div className="space-y-3 border-t-2 border-primary-green bg-surface-tint p-4 lg:p-6">
          <p className="text-[13px] font-bold text-deep-green">Verdy Match Labの予想スコア</p>
          <p className="text-xl font-extrabold tabular-nums text-text-primary">{nagoyaScorePrediction.score}</p>
          <p className="text-[14px] leading-relaxed text-text-primary">{nagoyaScorePrediction.reason}</p>
          <h3 className="text-[14px] font-extrabold text-deep-green">予想を左右する条件</h3>
          <p className="text-[14px] leading-relaxed text-text-primary">{nagoyaScorePrediction.uncertainty}</p>
        </div>
        <h3 className="text-[14px] font-extrabold text-deep-green">参照した情報源（11月19日確認）</h3>
        <Sources sources={nagoyaSources} />
      </section>
    </>
  );
}

function Lineup({
  lineup,
  tone,
}: {
  lineup: typeof nagoyaVerdyLineup | typeof nagoyaOpponentLineup;
  tone: "verdy" | "nagoya";
}) {
  const starters = lineup.rows.flat();
  const numbers = Object.fromEntries(starters.map(({ name, number }) => [name, number]));

  return (
    <article aria-label={`${lineup.team} ${lineup.formation}`} className="min-w-0 space-y-2">
      <h3 className="flex justify-between gap-3 text-[16px] font-extrabold text-text-primary">
        <span>{lineup.team}</span><span>{lineup.formation}</span>
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
