import { SectionHeader } from "@/components/ui/SectionHeader";
import { PredictionPitch } from "@/components/match/PredictionPitch";
import {
  FC_TOKYO_PREDICTION_FORMATION,
  fcTokyoDerbyRows,
  fcTokyoShirtNumbers,
  verdyDerbyRows,
  verdyShirtNumbers,
} from "@/lib/match/fc-tokyo-prediction";

export function FcTokyoPredictions() {
  return (
    <section aria-label="東京ダービー FC東京戦 予想スタメン" className="space-y-4">
      <SectionHeader title="東京ダービー｜FC東京戦 予想スタメン" eyebrow="PREDICTED LINEUP / 2026.10.17" />
      <p className="text-[14px] font-bold text-text-primary">東京V {FC_TOKYO_PREDICTION_FORMATION} ／ FC東京 {FC_TOKYO_PREDICTION_FORMATION}</p>
      <p className="text-[14px] leading-relaxed text-text-primary">
        FC東京は10月14日のルヴァンカップ3回戦でメンバーを入れ替えており、リーグ戦では主力が戻る前提で予想しています。出場可否を確定する情報ではありません。
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        <article aria-label={`東京ヴェルディ ${FC_TOKYO_PREDICTION_FORMATION}`} className="min-w-0">
          <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-deep-green">
            <span>東京ヴェルディ</span><span>{FC_TOKYO_PREDICTION_FORMATION}</span>
          </h3>
          <PredictionPitch rows={verdyDerbyRows} numbers={verdyShirtNumbers} tone="verdy" />
        </article>
        <article aria-label={`FC東京 ${FC_TOKYO_PREDICTION_FORMATION}`} className="min-w-0">
          <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-blue-900">
            <span className="border-b-2 border-red-600">FC東京</span><span>{FC_TOKYO_PREDICTION_FORMATION}</span>
          </h3>
          <PredictionPitch rows={fcTokyoDerbyRows} numbers={fcTokyoShirtNumbers} tone="fctokyo" />
        </article>
      </div>
      <p className="text-[13px] font-bold leading-relaxed text-deep-green">
        ※掲載内容はVerdy Match Labによる非公式の独自予想です。クラブ発表のスターティングメンバーではありません。括弧内はスタメン対抗候補です。
      </p>
      <p className="text-[12px] leading-relaxed text-text-secondary">対抗候補は交代予定選手・ベンチ入り確定選手ではありません。</p>
    </section>
  );
}
