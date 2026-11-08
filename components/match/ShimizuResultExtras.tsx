import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShimizuPredictions } from "@/components/match/ShimizuPredictions";
import { ShimizuMatchPreview, ShimizuStrategies } from "@/components/match/ShimizuPreContent";
import { shimizuStrategies } from "@/lib/match/shimizu-content";

const evaluations = [
  "藤井とブルネッティは先発したが、左サイドの攻防や背後を使えた頻度を判断する材料が不足している。",
  "観戦者は平川から決勝点が始まったと見た。ただし、それだけでは2トップの守備や中盤の人数関係を評価できない。",
  "観戦者は佐古と林がクロスをクリアする場面を確認した。一方、この策の主眼だった東京Vのクロスとセカンドボールによる二次攻撃は評価する材料が不足している。",
];
export function ShimizuResultExtras() {
  return <div className="space-y-8 text-[14px] leading-relaxed">
    <section className="space-y-3" aria-label="清水戦 試合後レビュー">
      <SectionHeader title="清水戦 試合後レビュー" eyebrow="MATCH REVIEW" />
      <h2 className="text-lg font-extrabold">熊取谷の決勝点と無失点で、リーグ3連勝</h2>
      <p>東京ヴェルディは清水を1-0で破り、福岡、長崎に続いてリーグ3連勝。相馬直樹監督の就任後、初の無失点勝利となった。前半は0-0、72分に熊取谷一星が決めた1点を守り切った。</p>
      <h3 className="font-bold">試合の流れ</h3>
      <p>18分にチョ ユミンに代わり佐古真礼が入り、59分に柴戸海と熊取谷が投入された。熊取谷は13分後に決勝点。交代理由は公式資料で確認できていない。</p>
      <h3 className="font-bold">決勝点：平川から新井、熊取谷へ</h3>
      <p>観戦者の見立てでは、平川怜の関与から新井悠太へと攻撃がつながった。Jリーグ公式速報は、新井のスルーパスを受けた熊取谷がペナルティエリア右から右足で決めたと記録し、新井にアシストを付けている。平川を含む組み立ては観戦所感であり、公式アシストとは区別する。熊取谷の走り出しや平川の位置の詳細は映像で再確認していない。</p>
      <div aria-label="観戦者の見立てによる得点の連係順" className="flex flex-wrap items-center gap-2 rounded border border-border bg-surface-tint p-4 font-bold text-deep-green"><span>平川 怜</span><span>→</span><span>新井 悠太</span><span>→</span><span>熊取谷 一星</span><span>→</span><span>GOAL</span></div>
      <p className="text-xs text-text-secondary">図は観戦所感に基づく連係の順序で、選手の位置やボールの軌道を表したものではありません。</p>
      <h3 className="font-bold">守備：クロスへの対応と無失点</h3>
      <p>Jリーグの試合終了時スタッツでは清水のシュートは10本。一方、清水公式の試合記録は9本と集計しており、数字には差がある。観戦者は明確な決定機が少なく、数字ほど怖さを感じなかったと見たが、すべてのシュートが危険でなかったとまでは言えない。</p>
      <p>別の場面として、観戦者は清水のサイドからのクロスを佐古と林が中央でクリアし、シュートに至らなかった場面を挙げている。早い時間に入った佐古の対応も、無失点を考える一つの手がかりだが、全場面の検証ではない。</p>
      <h3 className="font-bold">途中出場選手と3連勝</h3>
      <p>横浜FM戦では途中出場の山田剛綺が得点し、福岡戦では松橋優安と寺沼星文が得点。長崎戦の勝ち越しには熊取谷が関与し、この清水戦では自ら決めた。交代後の選手が異なる形で結果に関わっている。ただし、得点だけで交代策のすべてを評価することはできない。</p>
      <p>3連勝と初の無失点は前進を示す一方、クロスへの対応やセカンドボール、得点機を継続して作れるかは次戦以降も検証したい。<Link className="text-deep-green underline" href="/top/analysis/jofuku-soma-transition">相馬体制への移行を振り返る記事</Link>は長崎戦までを対象としている。</p>
      <p className="text-xs text-text-secondary">得点経過・先発・交代は <a href="https://www.jleague.jp/match/j1/2026/110706/" className="underline">Jリーグ公式</a>、スタメンと記録の照合には <a href="https://www.s-pulse.co.jp/games/prompt_report/2026110706" className="underline">清水公式試合情報</a>も参照。観戦所感は提供された見立てで、試合映像の再検証は行っていません。</p>
    </section>
    <section className="space-y-3"><SectionHeader title="予想スタメンの答え合わせ" eyebrow="PREDICTION CHECK" /><p className="font-bold">東京V 11/11 ・清水 8/11 ・合計 19/22</p><p>清水は予想のカピシャーバ、ジャーメイン良、松崎快に代わり、藤井智也、井上健太、平戸太貴が先発。先発選手の氏名を比較した人数であり、配置やフォーメーションの的中率ではない。</p><details className="border-y border-border py-3"><summary className="cursor-pointer font-bold">試合前の予想スタメンを見る（保存版）</summary><div className="mt-4"><ShimizuPredictions /></div></details></section>
    <section className="space-y-3"><SectionHeader title="事前三策の検証" eyebrow="MATCH PLAN REVIEW" /><ol className="divide-y divide-border border-y border-border">{shimizuStrategies.map((strategy, index) => <li key={strategy.orderNo} className="space-y-2 py-4"><h3 className="font-bold">第{strategy.orderNo}策：{strategy.title}</h3><p className="text-text-secondary">試合前の策：{strategy.description}</p><p className="font-bold">評価：判断材料不足</p><p>{evaluations[index]}</p></li>)}</ol><details className="border-y border-border py-3"><summary className="cursor-pointer font-bold">試合前の三策を見る（保存版）</summary><div className="mt-4"><ShimizuStrategies /></div></details></section>
    <details className="border-y border-border py-3"><summary className="cursor-pointer font-bold">試合前プレビューを読む（保存版）</summary><p className="mt-3 text-xs text-text-secondary">公開表示ではFootball LAB由来の数値・指標を省いています。元の試合前データは保持しています。</p><div className="mt-4"><ShimizuMatchPreview archive /></div></details>
  </div>;
}
