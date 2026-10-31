import { PredictionPitch } from "@/components/match/PredictionPitch";
import { Sources } from "@/components/match/YokohamaFmPreContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { nagasakiFormation, nagasakiPredictionNumbers, nagasakiPredictionRows, nagasakiPredictionSources } from "@/lib/match/nagasaki-prediction";

export function NagasakiPredictions() {
  return <section aria-label="長崎戦 東京ヴェルディ予想スタメン" className="space-y-4">
    <SectionHeader title="長崎戦 東京ヴェルディ予想スタメン" eyebrow="PREDICTED LINEUP / 2026.11.01" />
    <p className="text-[13px] font-bold leading-relaxed text-deep-green">※掲載内容はVerdy Match Labによる非公式の独自予想です。クラブ発表のスターティングメンバーではありません。</p>
    <div className="grid gap-6 lg:grid-cols-2">
      <article aria-label={`東京ヴェルディ ${nagasakiFormation}`} className="min-w-0">
        <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-deep-green"><span>東京ヴェルディ</span><span>{nagasakiFormation}</span></h3>
        <PredictionPitch rows={nagasakiPredictionRows} numbers={nagasakiPredictionNumbers} tone="verdy" />
      </article>
    </div>
    <div className="space-y-2 text-[13px] leading-relaxed text-text-secondary">
      <p>福岡戦3-1勝利の先発メンバーを基本に、林尚輝→佐古真礼の1人変更を予想。4-4-2を継続します。</p>
      <p>佐古をCBで先発予想。一美和成と熊取谷一星の2トップを継続する予想です。</p>
      <p>染野唯月は出場停止明けですが、今回の予想では先発に含めていません。</p>
      <p>山見大登は長期負傷から完全合流との提供情報がありますが、出場可否・ベンチ入りは未確認です。</p>
      <p>ピッチ上の位置は独自の起用予想です。各ラインは画面左から右の順に表示しています。</p>
    </div>
    <Sources sources={nagasakiPredictionSources} />
  </section>;
}
