import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PredictionPitch } from "@/components/match/PredictionPitch";
import { analysisTitle, jofukuRepresentative, somaRepresentative, ANALYSIS_DISCLAIMER } from "@/lib/analysis/jofuku-soma-transition";

export const metadata: Metadata = {
  title: `${analysisTitle} | Verdy Match Lab`,
  description: "東京ヴェルディの城福体制から相馬体制への変化を、配置、攻守、選手起用と試合経過から考えます。",
};

function Chapter({ no, title, children }: { no: number; title: string; children: React.ReactNode }) {
  return <section aria-labelledby={`chapter-${no}`} className="space-y-4">
    <div className="border-l-2 border-primary-green pl-3">
      <p className="text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">CHAPTER {no}</p>
      <h2 id={`chapter-${no}`} className="mt-1 text-[18px] font-extrabold leading-snug text-text-primary lg:text-[22px]">{title}</h2>
    </div>
    <div className="space-y-4 text-[14px] leading-relaxed text-text-primary">{children}</div>
  </section>;
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] leading-relaxed text-text-secondary">{children}</p>;
}

const sources = [
  ["クラブ：新監督就任にあたっての説明", "https://www.verdy.co.jp/news/15278"],
  ["Jリーグ：千葉戦", "https://www.jleague.jp/match/j1/2026/091302/"],
  ["Jリーグ：浦和戦", "https://www.jleague.jp/match/j1/2026/091904/"],
  ["Jリーグ：広島戦", "https://www.jleague.jp/match/j1/2026/101103/"],
  ["Jリーグ：FC東京戦", "https://www.jleague.jp/match/j1/2026/101708/"],
  ["Jリーグ：横浜FM戦", "https://www.jleague.jp/match/j1/2026/102107/"],
  ["Jリーグ：福岡戦", "https://www.jleague.jp/match/j1/2026/102408/"],
  ["Jリーグ：長崎戦", "https://www.jleague.jp/match/j1/2026/110103/"],
  ["サッカーマガジン：相馬監督の初陣", "https://soccermagazine.jp/j1/17869827"],
];

export default function JofukuSomaTransitionPage() {
  return <article className="space-y-10 pb-4">
    <Link href="/top" className="text-[13px] font-bold text-deep-green">← TOP TEAMへ戻る</Link>
    <header className="space-y-3 border-y-2 border-fusion-black bg-surface-tint px-4 py-6 lg:px-10 lg:py-8">
      <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep">SPECIAL ANALYSIS｜特別分析</p>
      <h1 className="text-[22px] font-extrabold leading-snug tracking-tight text-text-primary lg:text-[30px]">{analysisTitle}</h1>
      <p className="text-[14px] leading-relaxed text-text-primary">城福浩監督が築いた土台を踏まえ、相馬直樹監督の就任後に何が変わったのか。2026年11月1日の長崎戦までの試合を、配置、攻守、起用と交代策から振り返ります。</p>
      <p className="text-[13px] font-bold leading-relaxed text-deep-green">{ANALYSIS_DISCLAIMER}</p>
    </header>

    <Chapter no={1} title="監督交代と引き継いだもの">
      <p>東京ヴェルディは10月に城福監督との契約を解除し、相馬監督の就任を発表しました。クラブは就任時、城福監督の下で積み重ねた守備を整理・発展させ、攻撃への移行につなげることを期待すると説明しています。これはクラブが示した方向性であり、各場面の守備原則がそのまま継承されたことを証明するものではありません。</p>
      <p>城福体制でJ1復帰を果たし、その後も積み重ねた経験があります。相馬体制は広島戦、FC東京戦に敗れた後、横浜FM戦で引き分け、福岡戦と長崎戦に連勝しました。FC東京戦は染野唯月が退場し、数的不利の時間が長かった試合です。</p>
    </Chapter>

    <Chapter no={2} title="3-4-2-1と4-4-2の違い">
      <p>城福体制の千葉戦・浦和戦は、染野の1トップに福田湧矢と平尾勇人の2シャドーを置き、両ウイングバックが幅を取る形で開始。相馬体制の福岡戦は熊取谷一星と一美和成の2トップ、左右にサイドバックとサイドMFを置く形で始まりました。中央MFは両例とも2人です。</p>
      <div className="grid gap-6 lg:grid-cols-2">
        <article aria-label="城福体制 3-4-2-1" className="min-w-0"><h3 className="mb-2 font-extrabold">城福体制：千葉戦・浦和戦　3-4-2-1</h3><PredictionPitch rows={jofukuRepresentative.rows} numbers={jofukuRepresentative.numbers} tone="verdy" /></article>
        <article aria-label="相馬体制 4-4-2" className="min-w-0"><h3 className="mb-2 font-extrabold text-deep-green">相馬体制：福岡戦　4-4-2</h3><PredictionPitch rows={somaRepresentative.rows} numbers={somaRepresentative.numbers} tone="verdy" /></article>
      </div>
      <Note>Jリーグ公式の試合開始時の配置を基にした代表例です。全試合・全局面で同じ形だったという意味ではありません。役割名は当サイトの表記です。</Note>
      <figure className="grid gap-3 border border-border bg-surface p-4 sm:grid-cols-2">
        <figcaption className="font-bold sm:col-span-2">攻撃の関係を考える概念図</figcaption>
        <div className="space-y-2 border-l-2 border-text-secondary pl-3"><p className="font-bold">1トップ＋2シャドー</p><p>WB → シャドー ↔ 1トップ ← シャドー ← WB</p><p>前線の縦の関係と、幅を取るWBが選択肢になります。</p></div>
        <div className="space-y-2 border-l-2 border-primary-green pl-3"><p className="font-bold">2トップ＋両サイド</p><p>SB・サイドMF → 2トップ ← サイドMF・SB</p><p>左右の組み合わせから、並ぶ2人を使う選択肢があります。</p></div>
        <Note>配置上の関係を説明する概念図です。矢印は決まった攻撃経路や、実際に毎回行われた動きを示すものではありません。</Note>
      </figure>
    </Chapter>

    <Chapter no={3} title="攻撃：サイドと前線の組み合わせ">
      <p>広島戦の取材では、新井悠太の左クロスに染野が頭で合わせた場面と、藤本寛也のパスからキム ヒョンウが抜け出した場面が報じられています。新たな配置で、サイドから前線を使う選択肢が見えた一方、試合は0-2で終わりました。</p>
      <p>長崎戦の先制点は藤本のパスを受けた染野が決め、勝ち越し点は熊取谷のスルーパスから溝口修平のクロスを経て一美が決めました。福岡戦の3点目も、溝口のクロスに寺沼星文が合わせたものです。いずれも確認できる個別の場面であり、常にこの形で前進したとは限りません。</p>
      <p>2トップが相手の最終ラインに並び、両サイドから供給を受けられることは配置上の選択肢です。奪った位置や中央MFの攻撃参加が交代前とどう変わったかは、継続的な映像確認が必要です。</p>
    </Chapter>

    <Chapter no={4} title="守備：前から奪う狙いと対応">
      <p>広島戦後の取材で相馬監督は、前で奪い返せた前半と、それができなかった後半を振り返っています。前線から働きかける狙いと、それを続ける難しさが同じ試合に表れました。後半に相手の交代を受けて対応が難しくなったことも、林尚輝の振り返りとして伝えられています。</p>
      <p>4-4-2では前線と中盤がそれぞれ守備に関わる配置になりますが、中央とサイドの受け渡し、具体的な奪いどころや選手間の距離は、開始時の図だけでは分かりません。長崎戦は勝ち越し後にリードを守りましたが、守り方が改善したと断定するには別の検証が必要です。</p>
    </Chapter>

    <Chapter no={5} title="役割が変わった選手たち">
      <p>染野は城福体制の代表例では1トップ、相馬体制の広島戦ではキムと2トップを組みました。FC東京戦の退場による出場停止を経て長崎戦に復帰し、一美と先発して得点。一美も勝ち越し点を挙げています。</p>
      <p>新井は千葉・浦和戦の右WBから、広島戦では左サイドバック、福岡戦では左MFへ。溝口は千葉・浦和戦の左WBから福岡戦の左SBに入りました。藤本は広島戦で新たに先発し、長崎戦では染野の先制点につながるパスを送りました。</p>
      <p>平川怜は代表例の両試合で中央MFを担い、長崎戦も先発。森田晃樹は福岡戦と長崎戦で途中出場しました。起用の違いには出場停止なども関わるため、欠場理由を監督の判断だけで説明することはできません。</p>
    </Chapter>

    <Chapter no={6} title="交代策と試合運び">
      <p>横浜FM戦は2点を追う展開から藤本が1点を返し、途中出場の山田剛綺が終盤に同点としました。福岡戦は熊取谷の先制後に追いつかれましたが、途中出場の松橋優安が勝ち越し、寺沼が追加点を決めて3-1で勝利しました。</p>
      <p>長崎戦では染野の先制後に追いつかれた直後、途中出場の熊取谷が溝口へスルーパスを送り、一美の決勝点につながりました。勝ち越した後には佐古真礼と寺沼、終盤には山田を投入しています。交代選手が結果に関わったことは確かですが、それだけで交代策のすべてを評価することはできません。</p>
    </Chapter>

    <Chapter no={7} title="連勝の先に見る課題">
      <p>広島戦の敗戦、退場者を出したFC東京戦、横浜FM戦の追い上げ、福岡・長崎戦の連勝。相馬体制の最初の5試合は、それぞれ異なる展開でした。2トップの組み合わせ、中央MFと両サイドの関係、前線からの守備、先制後や失点後の試合運びを引き続き見たいところです。</p>
      <p>福岡戦と長崎戦の結果は前進ですが、チームが完成したと結論づけるにはまだ早い。城福体制の積み重ねを尊重しながら、新しい配置が相手や状況に応じてどう機能するかを追っていきます。</p>
    </Chapter>

    <section aria-labelledby="sources" className="space-y-3 border-t border-border pt-6">
      <SectionHeader title="出典・分析上の注意" eyebrow="SOURCES" />
      <Note>対象は2026年11月1日までの試合です。試合結果・先発・得点・交代はJリーグ公式記録、広島戦のプレーと発言は取材記事、監督交代の背景はクラブの説明に基づきます。配置の説明と今後の着眼点は当サイトの分析です。</Note>
      <ul className="grid gap-x-6 gap-y-2 text-[12px] sm:grid-cols-2">{sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="font-bold text-deep-green underline">{label}</a></li>)}</ul>
    </section>
  </article>;
}
