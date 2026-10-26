import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PredictionPitch } from "@/components/match/PredictionPitch";
import {
  analysisTitle, analysisMatches, eraAverage, eraRecord, eraLabel, recoveryRows, recoveryAverage,
  startCounts, jofukuRepresentative, somaRepresentative, lineupChanges, ANALYSIS_DISCLAIMER, type Era,
} from "@/lib/analysis/jofuku-soma-transition";

export const metadata: Metadata = {
  title: `${analysisTitle} | Verdy Match Lab`,
  description: "東京ヴェルディの城福体制直近4試合と相馬体制4試合を、基本スタメン・運動量・ボール奪取位置・選手起用で比較する特別分析。",
};

const eraTone: Record<Era, string> = { jofuku: "bg-text-secondary", soma: "bg-primary-green" };

function Chapter({ no, title, children }: { no: number; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`chapter-${no}`} className="space-y-4">
      <div className="border-l-2 border-primary-green pl-3">
        <p className="text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">CHAPTER {no}</p>
        <h2 id={`chapter-${no}`} className="mt-1 text-[18px] font-extrabold leading-snug text-text-primary lg:text-[22px]">{title}</h2>
      </div>
      <div className="space-y-4 text-[14px] leading-relaxed text-text-primary">{children}</div>
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] leading-relaxed text-text-secondary">{children}</p>;
}

/** 横棒グラフ。maxを共通にして2体制・各試合の長さを比較できるようにする。 */
function Bars({ label, unit, rows, max, min = 0, digits = 0 }: { label: string; unit: string; rows: { key: string; name: string; era: Era; value: number; muted?: boolean }[]; max: number; min?: number; digits?: number }) {
  return (
    <figure className="space-y-2 border border-border bg-surface p-3 lg:p-4">
      <figcaption className="text-[13px] font-extrabold text-text-primary">{label}</figcaption>
      <ul className="space-y-1.5">
        {rows.map((row) => (
          <li key={row.key} className="grid grid-cols-[6.5rem_minmax(0,1fr)_4.5rem] items-center gap-2 text-[12px]">
            <span className={`min-w-0 truncate ${row.muted ? "text-text-secondary" : "font-bold text-text-primary"}`}>{row.name}</span>
            <span className="h-3 bg-border/40" aria-hidden="true">
              <span className={`block h-3 ${eraTone[row.era]} ${row.muted ? "opacity-40" : ""}`} style={{ width: `${Math.max(0, Math.min(100, ((row.value - min) / (max - min)) * 100))}%` }} />
            </span>
            <span className="text-right tabular-nums font-bold text-text-primary">{row.value.toFixed(digits)}{unit}</span>
          </li>
        ))}
      </ul>
      <p className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-text-secondary">
        {min > 0 && <span>棒の起点は{min}{unit}</span>}
        <span><span className={`mr-1 inline-block h-2 w-3 ${eraTone.jofuku}`} />城福体制</span>
        <span><span className={`mr-1 inline-block h-2 w-3 ${eraTone.soma}`} />相馬体制</span>
      </p>
    </figure>
  );
}

function Table({ head, rows, caption }: { head: string[]; rows: (string | number)[][]; caption?: string }) {
  return (
    <div className="overflow-x-auto border border-border bg-surface">
      <table className="w-full min-w-[21rem] border-collapse text-[12px] lg:text-[13px]">
        {caption && <caption className="px-3 pt-3 text-left text-[13px] font-extrabold text-text-primary">{caption}</caption>}
        <thead>
          <tr className="border-b border-border text-text-secondary">
            {head.map((h, i) => <th key={h} scope="col" className={`px-3 py-2 font-bold ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-border last:border-b-0">
              {row.map((cell, i) => <td key={i} className={`px-3 py-2 tabular-nums ${i === 0 ? "text-left font-bold text-text-primary" : "text-right text-text-primary"}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const result = (f: number, a: number) => (f > a ? "勝" : f === a ? "分" : "敗");

export default function JofukuSomaTransitionPage() {
  const jofuku = analysisMatches.filter((m) => m.era === "jofuku");
  const soma = analysisMatches.filter((m) => m.era === "soma");
  const counted = analysisMatches.filter((m) => !m.excludedReason);
  const jRecord = eraRecord("jofuku");
  const sRecord = eraRecord("soma");
  const counts = startCounts();
  const avg = (era: Era) => ({
    shots: eraAverage(era, "shots"), xg: eraAverage(era, "xg", 3), distance: eraAverage(era, "distanceKm"), sprints: eraAverage(era, "sprints", 1), possession: eraAverage(era, "possession", 1),
  });
  const a = { jofuku: avg("jofuku"), soma: avg("soma") };
  const possessionAll = (era: Era) => { const l = analysisMatches.filter((m) => m.era === era); return Math.round((l.reduce((s, m) => s + m.possession, 0) / l.length) * 10) / 10; };
  const matchName = (m: (typeof analysisMatches)[number]) => `${m.date} ${m.short}`;

  return (
    <article className="space-y-10 pb-4">
      <Link href="/top" className="text-[13px] font-bold text-deep-green">← TOP TEAMへ戻る</Link>

      <header className="space-y-3 border-y-2 border-fusion-black bg-surface-tint px-4 py-6 lg:px-10 lg:py-8">
        <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep">SPECIAL ANALYSIS｜特別分析</p>
        <h1 className="text-[22px] font-extrabold leading-snug tracking-tight text-text-primary lg:text-[30px]">{analysisTitle}</h1>
        <p className="text-[14px] leading-relaxed text-text-primary">
          東京ヴェルディは10月8日、相馬直樹監督の就任を発表しました。城福浩前監督の直近4試合（神戸・C大阪・千葉・浦和）と、相馬監督の就任後4試合（広島・FC東京・横浜FM・福岡）を、フォーメーション、先発メンバー、運動量、ボール奪取位置で比べます。
        </p>
        <p className="text-[13px] font-bold leading-relaxed text-deep-green">{ANALYSIS_DISCLAIMER}</p>
      </header>

      <Table
        caption="対象8試合（明治安田J1リーグ）"
        head={["体制", "日付", "対戦相手", "H/A", "スコア", "結果"]}
        rows={analysisMatches.map((m) => [eraLabel[m.era], m.date, m.opponent, m.homeAway, `${m.goalsFor}-${m.goalsAgainst}`, result(m.goalsFor, m.goalsAgainst)])}
      />
      <Note>城福体制 {jRecord.wins}勝{jRecord.draws}分{jRecord.losses}敗（{jRecord.goalsFor}得点{jRecord.goalsAgainst}失点）／相馬体制 {sRecord.wins}勝{sRecord.draws}分{sRecord.losses}敗（{sRecord.goalsFor}得点{sRecord.goalsAgainst}失点）。スコアは東京V側を先に表記しています。</Note>

      <Chapter no={1} title="3-4-2-1から4-4-2へ">
        <p>城福体制の直近4試合は、すべて3-4-2-1で始まりました。3バックの前に中央MFを2人置き、両ウイングバックが幅を取ります。前線は染野唯月の1トップを、福田湧矢と平尾勇人の2シャドーが支える形です。</p>
        <p>相馬体制の4試合は、すべて4-4-2で始まっています。最終ラインは3人から4人になり、サイドはサイドバックとサイドMFの2人で受け持ちます。前線は1トップ2シャドーから2トップに変わりました。</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <article aria-label={`城福体制 ${jofukuRepresentative.formation}`} className="min-w-0">
            <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-text-primary"><span>城福体制（千葉戦・浦和戦）</span><span>{jofukuRepresentative.formation}</span></h3>
            <PredictionPitch rows={jofukuRepresentative.rows} numbers={jofukuRepresentative.numbers} tone="verdy" />
          </article>
          <article aria-label={`相馬体制 ${somaRepresentative.formation}`} className="min-w-0">
            <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-deep-green"><span>相馬体制（福岡戦）</span><span>{somaRepresentative.formation}</span></h3>
            <PredictionPitch rows={somaRepresentative.rows} numbers={somaRepresentative.numbers} tone="verdy" />
          </article>
        </div>
        <Note>配置はJリーグ公式フォーメーション「前半0分」（試合開始時）。上が前線、下がGKで、画面の左が左サイドです。役割名は当サイトの表記です。</Note>
      </Chapter>

      <Chapter no={2} title="両監督の基本スタメン比較">
        <p><span className="font-bold">城福体制の基本スタメン：</span>{jofukuRepresentative.reason}</p>
        <p><span className="font-bold">相馬体制の基本スタメン：</span>{somaRepresentative.reason}</p>
        <Table
          caption="選手別の先発回数（各体制4試合）"
          head={["選手", "城福体制", "相馬体制", "増減"]}
          rows={counts.map((c) => [c.name, c.jofuku, c.soma, c.soma - c.jofuku > 0 ? `+${c.soma - c.jofuku}` : String(c.soma - c.jofuku)])}
        />
        <Note>先発はJリーグ公式記録（各試合ページ）に基づきます。両体制とも4試合・44人分です。</Note>
        <ul className="space-y-2">
          <li><span className="font-bold">継続して先発：</span>{lineupChanges.continued.join("、")}。両体制の基本スタメンにそろって入った6人です。</li>
          <li><span className="font-bold">相馬体制で先発が増えた：</span>藤本寛也は城福体制の直近4試合で先発がなく、相馬体制では4試合すべてで先発しました（横浜FM戦・福岡戦は右MF）。熊取谷一星、一美和成、チョ ユミン、柴戸海、キム ヒョンウもそれぞれ2試合に先発しています。</li>
          <li><span className="font-bold">先発から外れた：</span>井上竜太（4試合→0試合）と平尾勇人（3試合→0試合）は、相馬体制では先発していません。福田湧矢は広島戦・FC東京戦に先発しましたが、FC東京戦は29分で交代し、横浜FM戦・福岡戦はメンバー外でした（理由の公式発表は確認できていません）。鈴木海音は福岡戦でベンチスタートでした。</li>
          <li><span className="font-bold">出場停止による変更：</span>染野唯月はFC東京戦の退場により、横浜FM戦・福岡戦の2試合が出場停止でした。先発が4試合から2試合に減ったのはこのためで、監督の選考による変更とは分けて考える必要があります。</li>
          <li><span className="font-bold">ポジション・役割が変わった：</span>新井悠太は城福体制の千葉戦・浦和戦では右WB、相馬体制では広島戦・FC東京戦がDF（公式記録の表記）、横浜FM戦・福岡戦は左MFでした。溝口修平は左WBから左SBへ、林尚輝は3バック中央から4バックのCBへ移っています。中央MFの平川怜・齋藤功佑は、両体制で同じ並び（左が平川、右が齋藤）でした。</li>
        </ul>
      </Chapter>

      <Chapter no={3} title="走行距離・スプリント比較">
        <p>はっきり変わったのは運動量です。FC東京戦を除く相馬体制3試合の平均は、総移動距離が{a.soma.distance.toFixed(2)}km、スプリントが{a.soma.sprints.toFixed(1)}回。城福体制4試合の{a.jofuku.distance.toFixed(2)}km、{a.jofuku.sprints.toFixed(1)}回を上回りました。横浜FM戦と福岡戦は、どちらもスプリントが160回を超えています。</p>
        <p>一方で、シュートは平均{a.jofuku.shots.toFixed(2)}本から{a.soma.shots.toFixed(2)}本、ゴール期待値は{a.jofuku.xg.toFixed(3)}から{a.soma.xg.toFixed(3)}と、ほぼ同じ水準です。走る量が増えたことが、そのまま決定機の増加につながっているとは、まだ言えません。</p>
        <Table
          caption="平均値の比較（FC東京戦を除く）"
          head={["指標", "城福（4試合）", "相馬（3試合）"]}
          rows={[
            ["平均シュート", `${a.jofuku.shots.toFixed(2)}本`, `${a.soma.shots.toFixed(2)}本`],
            ["平均ゴール期待値", a.jofuku.xg.toFixed(3), a.soma.xg.toFixed(3)],
            ["平均総移動距離", `${a.jofuku.distance.toFixed(2)}km`, `${a.soma.distance.toFixed(2)}km`],
            ["平均スプリント", `${a.jofuku.sprints.toFixed(1)}回`, `${a.soma.sprints.toFixed(1)}回`],
          ]}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Bars label="総移動距離（km）" unit="km" digits={1} min={100} max={130} rows={analysisMatches.map((m) => ({ key: m.id, name: matchName(m), era: m.era, value: m.distanceKm, muted: Boolean(m.excludedReason) }))} />
          <Bars label="スプリント（回）" unit="回" max={170} rows={analysisMatches.map((m) => ({ key: m.id, name: matchName(m), era: m.era, value: m.sprints, muted: Boolean(m.excludedReason) }))} />
        </div>
        <Note>出典：Football LAB 各試合レポート（シュート・ゴール期待値・総移動距離・スプリント。スプリントは時速25km以上の走行回数）。FC東京戦（薄い色で表示）は{analysisMatches.find((m) => m.excludedReason)?.excludedReason}、平均から除外しています。値はJリーグ公式記録・公式スタッツと集計基準が異なり、一致しない場合があります。</Note>
      </Chapter>

      <Chapter no={4} title="ボール奪取位置の比較">
        <p>ボールを奪った位置の平均は、城福体制の{recoveryAverage("jofuku", "avgPosition").toFixed(2)}mに対し、相馬体制は{recoveryAverage("soma", "avgPosition").toFixed(1)}m。数字の上ではやや前になっていますが、相馬体制の3試合は31.6m〜38.0mと幅が大きく、城福体制の範囲（30.8m〜37.1m）と大きく重なります。奪う位置がはっきり前に移ったとまでは言えません。</p>
        <p>目立つのは、中盤（MS）で奪う割合です。城福体制の平均{recoveryAverage("jofuku", "ms").toFixed(2)}%に対し、相馬体制は{recoveryAverage("soma", "ms").toFixed(1)}%で、福岡戦は45%でした。逆に、相手ゴールに近いアタッキングサード（AS）での奪取は{recoveryAverage("jofuku", "as").toFixed(1)}%から{recoveryAverage("soma", "as").toFixed(1)}%に下がっています。4-4-2の2列で中盤にブロックを作り、そこで奪う場面が増えている可能性はありますが、3試合だけでは守備の狙いが変わったと断定できません。ここでは仮説として扱います。</p>
        <Bars label="平均ボール奪取位置（m）" unit="m" digits={1} max={40} rows={recoveryRows.map((r) => ({ key: r.era + r.short, name: r.short, era: r.era, value: r.avgPosition }))} />
        <Table
          caption="試合別のボール奪取データ"
          head={["体制", "対戦", "平均奪取位置", "AS", "MS"]}
          rows={[
            ...recoveryRows.map((r) => [eraLabel[r.era], r.short, `${r.avgPosition.toFixed(1)}m`, `${r.as}%`, `${r.ms}%`]),
            ["城福体制", "4試合平均", `${recoveryAverage("jofuku", "avgPosition").toFixed(2)}m`, `${recoveryAverage("jofuku", "as").toFixed(1)}%`, `${recoveryAverage("jofuku", "ms").toFixed(2)}%`],
            ["相馬体制", "3試合平均", `${recoveryAverage("soma", "avgPosition").toFixed(1)}m`, `${recoveryAverage("soma", "as").toFixed(1)}%`, `${recoveryAverage("soma", "ms").toFixed(1)}%`],
          ]}
        />
        <Note>ボール奪取データは観戦分析用に当サイトが集計した値で、公式データとの照合はしていません。AS（アタッキングサード）・MS（ミドルサード）は、全ボール奪取回数に占める各エリアの割合です。平均は試合ごとの値の単純平均で、奪取回数による加重平均ではありません。FC東京戦は集計対象外です。</Note>
      </Chapter>

      <section aria-labelledby="possession" className="space-y-4">
        <div className="border-l-2 border-pioneer-gold pl-3">
          <p className="text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">DATA</p>
          <h2 id="possession" className="mt-1 text-[18px] font-extrabold leading-snug text-text-primary lg:text-[22px]">ボール支配率と対戦相手</h2>
        </div>
        <Table
          head={["相手の順位帯", "体制", "対戦", "ボール保持率"]}
          rows={(["上位", "中位", "下位"] as const).flatMap((tier) => analysisMatches.filter((m) => m.tier === tier).map((m) => [tier, eraLabel[m.era], `${m.short}（${m.homeAway}）`, `${m.possession.toFixed(1)}%${m.excludedReason ? "（10人）" : ""}`]))}
        />
        <p className="text-[14px] leading-relaxed text-text-primary">
          ボール保持率の平均は、城福体制が{possessionAll("jofuku").toFixed(1)}%、相馬体制が{possessionAll("soma").toFixed(1)}%（FC東京戦を除くと{a.soma.possession.toFixed(1)}%）です。ただし相馬体制の4試合には上位の広島・FC東京が含まれ、FC東京戦はほぼ全時間を10人で戦いました。同じ下位相手の千葉戦（58.9%）と福岡戦（50.8%）、中位相手の浦和戦（52.4%）と横浜FM戦（41.5%）を比べても差はありますが、試合展開や先制点の有無も保持率を左右します。数字の違いを監督の戦術だけで説明することはできません。
        </p>
        <Note>出典：Football LAB 各試合レポートのボール保持率（8試合とも同一基準）。Jリーグ公式スタッツのボール支配率とは算出方法が異なります。順位帯は今回の分析用の分類です。</Note>
      </section>

      <Chapter no={5} title="横浜FM戦からの変化">
        <p>相馬体制は広島戦0-2、FC東京戦0-4と2連敗でスタートしました。続く横浜FM戦では、FC東京戦から先発を5人変更（うち1人は染野唯月の出場停止によるもの）。2点を先行されながら、藤本寛也と山田剛綺のゴールで2-2に追いつきました。</p>
        <p>福岡戦の先発変更は、鈴木海音に代えて内田陽介を起用した1人だけ。メンバーをほぼ固定して臨み、3-1で初勝利を挙げました。</p>
        <p>観戦していて感じたのは、左サイドの変化です。溝口修平と新井悠太は横浜FM戦からコンビを組み、福岡戦が2試合目。互いの動きを理解してプレーできる場面が増えていました。また福岡戦では、齋藤功佑がこれまでより比較的フリーでボールを受けられる場面が多く、中盤で時間を作れていた印象です。いずれも観戦時の所感で、データで裏付けたものではありません。</p>
      </Chapter>

      <Chapter no={6} title="交代策とスタメン争い">
        <p>福岡戦では、67分に熊取谷一星と交代で入った松橋優安が74分に勝ち越しゴール。88分に一美和成と交代で入った寺沼星文が、90分に3点目を決めました。前節の横浜FM戦でも、86分から出場した山田剛綺が後半アディショナルタイムに同点ゴールを挙げています。2試合続けて、途中出場の選手が得点に絡みました。</p>
        <p>そこに、出場停止が明けた染野唯月が戻ります。染野は相馬体制の最初の2試合で先発し、キム ヒョンウと2トップを組みました。横浜FM戦・福岡戦は熊取谷・一美の2トップで、松橋・寺沼・山田が途中から結果を出しています。前線の顔ぶれをどう組み合わせるかは、次節以降の注目点です。</p>
        <Note>本章は起用の可能性を整理したもので、次戦の先発を予想・確定するものではありません。染野唯月の出場停止はJリーグ公式発表（2試合）に基づきます。</Note>
      </Chapter>

      <Chapter no={7} title="4試合を終えて">
        <p>相馬体制の4試合は、広島戦0-2、FC東京戦0-4、横浜FM戦2-2、福岡戦3-1。{sRecord.wins}勝{sRecord.draws}分{sRecord.losses}敗、{sRecord.goalsFor}得点{sRecord.goalsAgainst}失点です。</p>
        <p>フォーメーションは3-4-2-1から4-4-2に変わり、藤本寛也のように新たに主力になった選手がいる一方、マテウス、林尚輝、齋藤功佑、平川怜、新井悠太、溝口修平といった城福体制の中心選手も、役割を変えながら起用されています。運動量は数字の上でもはっきり増えました。</p>
        <p>ただし、シュート数やゴール期待値はほぼ横ばいで、奪取位置の変化も小さく、守備の狙いが変わったかどうかはまだ判断できません。4試合のうち2試合は上位との対戦で、1試合は10人での戦いでした。監督交代が成功だったかどうかを、この4試合だけで決めることはできません。連戦の最後に勝点3を取ったこのチームが、次の試合でどんな形を見せるのかを追っていきます。</p>
      </Chapter>

      <section aria-labelledby="sources" className="space-y-3 border-t border-border pt-6">
        <SectionHeader title="データの出典・対象・除外条件" eyebrow="SOURCES" />
        <ul className="space-y-1 text-[12px] leading-relaxed text-text-secondary">
          <li>対象：城福体制 J1直近4試合（{jofuku.map((m) => m.short).join("・")}）、相馬体制 就任後4試合（{soma.map((m) => m.short).join("・")}）。平均値の比較はFC東京戦を除く{counted.length}試合。</li>
          <li>先発・得点・交代：Jリーグ公式記録。シュート・ゴール期待値・総移動距離・スプリント・ボール保持率：Football LAB 各試合レポート。ボール奪取データ：当サイト集計（公式データ未照合）。</li>
        </ul>
        <ul className="grid gap-x-6 gap-y-1 text-[12px] sm:grid-cols-2">
          {analysisMatches.map((m) => (
            <li key={m.id} className="flex flex-wrap gap-x-3">
              <span className="font-bold text-text-primary">{m.date} {m.short}</span>
              <a href={m.jleagueUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-deep-green underline">Jリーグ公式</a>
              <a href={m.footballLabUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-deep-green underline">Football LAB</a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
