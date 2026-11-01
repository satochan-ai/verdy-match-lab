import { SectionHeader } from "@/components/ui/SectionHeader";
import { NagasakiPredictions } from "@/components/match/NagasakiPredictions";
import { NagasakiMatchPreview } from "@/components/match/NagasakiPreContent";
import { nagasakiPredictionCheck, nagasakiReview, nagasakiStrategyReviews } from "@/lib/match/nagasaki-review";

export function NagasakiResultExtras() {
  return <div className="space-y-8">
    <section className="space-y-3 text-[14px] leading-relaxed">
      <SectionHeader title="長崎戦 試合レビュー" eyebrow="MATCH REVIEW" />
      <h2 className="text-[18px] font-extrabold">{nagasakiReview.title}</h2>
      {nagasakiReview.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <p className="text-[12px] text-text-secondary">{nagasakiReview.notice}</p>
      <p className="text-[12px] text-text-secondary">交代時刻の46分は後半開始。45+10分・45+12分は前半、90+3分・90+5分は後半のアディショナルタイムです。45+10分の齋藤→森田は公式記録上の脳振盪交代です。</p>
      <a className="text-[12px] text-deep-green underline" href="https://www.jleague.jp/match/j1/2026/110103/" target="_blank" rel="noopener noreferrer">出典：Jリーグ公式速報・ラインナップ・スタッツ</a>
      <div className="border-l-2 border-border pl-3"><h3 className="font-bold">観戦者の所感（追記欄）</h3><p className="text-[12px] text-text-secondary">未追記。観戦者本人の所感は、上記の公式記録に基づくレビューと分けて掲載します。</p></div>
    </section>
    <section className="space-y-3">
      <SectionHeader title="予想スタメンの答え合わせ" eyebrow="PREDICTION CHECK" />
      <div className="grid gap-4 sm:grid-cols-2">
        {([["東京ヴェルディ",nagasakiPredictionCheck.verdy],["V・ファーレン長崎",nagasakiPredictionCheck.opponent]] as const).map(([team,check]) => <article key={team} className="border-y border-border py-3 text-[13px] leading-relaxed"><h3 className="font-bold">{team}：{check.matched}人／11人 一致</h3><p>予想のみ：{check.predictedOnly.join(" ／ ")}</p><p>実際の先発のみ：{check.actualOnly.join(" ／ ")}</p></article>)}
      </div>
      <p className="text-[12px] leading-relaxed text-text-secondary">{nagasakiPredictionCheck.positionNote}</p>
      <details className="border-y border-border py-3"><summary className="cursor-pointer text-[13px] font-bold">試合前の予想11人・配置を確認する（保存版）</summary><div className="mt-4"><NagasakiPredictions /></div></details>
    </section>
    <section className="space-y-3">
      <SectionHeader title="軍師の三策 振り返り" eyebrow="MATCH PLAN REVIEW" />
      <p className="text-[12px] text-text-secondary">評価区分：成功／一部成功／不発／判断保留。試合前の三策を保存し、確認できた経過と分けて評価します。</p>
      <ol className="divide-y divide-border border-y border-border">
        {nagasakiStrategyReviews.map(strategy => <li key={strategy.orderNo} className="space-y-2 py-4 text-[13px] leading-relaxed"><h3 className="font-bold">第{strategy.orderNo}策：{strategy.title}</h3><p className="text-text-secondary">試合前の策：{strategy.description}</p><p className="font-bold text-deep-green">評価：{strategy.verdict}</p><p>{strategy.evidence}</p></li>)}
      </ol>
    </section>
    <details className="border-y border-border py-3"><summary className="cursor-pointer text-[13px] font-bold">試合前プレビューを読む（保存版）</summary><div className="mt-4"><NagasakiMatchPreview /></div></details>
    <p className="text-[12px] leading-relaxed text-text-secondary">シュートはData Site公式記録の長崎9－東京V11を採用。公式サイトの終了時表示16－13との差を保持し、補正していません。枠内シュート・支配率・パス成功率・走行距離・スプリント・オフサイドは公式サイトのスタッツを使用しています。</p>
  </div>;
}
