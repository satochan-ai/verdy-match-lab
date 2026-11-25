import { FormationPhasePicker } from "@/components/match/FormationPhasePicker";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mitoDaznStats, mitoFormationPhases, mitoResult } from "@/lib/mock/top-mito-result";

const daznRows = [
  ["xg", "ゴール期待値（xG）"],
  ["shots", "シュート"],
  ["shotsOnTarget", "枠内シュート"],
  ["possession", "ボール支配率"],
  ["passes", "パス数"],
  ["passSuccessRate", "パス成功率"],
  ["offsides", "オフサイド"],
  ["corners", "CK"],
  ["fouls", "ファウル"],
  ["yellowCards", "警告"],
  ["redCards", "退場"],
] as const;

export function MitoFormationReview() {
  return (
    <section aria-label="水戸戦のフォーメーション変化">
      <SectionHeader title="フォーメーションの変化" eyebrow="FORMATION" />
      <p className="mb-3 text-xs leading-relaxed text-text-secondary">
        開始時はDAZNの試合前表示、試合中は観戦メモに基づく配置。攻撃方向は上。
        東京Vの69分は公式交代記録に従う（観戦メモでは70分）。
      </p>
      <div className="space-y-4">
        <FormationPhasePicker team={mitoResult.awayTeam} phases={mitoFormationPhases.away} showPlayerCount />
        <FormationPhasePicker team={mitoResult.homeTeam} phases={mitoFormationPhases.home} showPlayerCount />
      </div>
    </section>
  );
}

export function MitoResultReview() {
  const { home, away, source } = mitoDaznStats;

  return (
    <section aria-label="水戸戦レビュー" className="space-y-5">
      <SectionHeader title="17分の退場で10人に。セットプレーから失点し、水戸に0–1で敗戦" eyebrow="MATCH REVIEW" />
      <div className="space-y-3 text-[13px] leading-relaxed text-text-primary">
        <p>両チームとも4-4-2で開始。観戦メモでは、17分に新井悠太が後方からタックルし、足裏が相手選手の足に入った。当初はイエローカードが提示されたが、VARでレッドカードに変更された。</p>
        <p>東京Vは熊取谷一星を左サイドに下げ、染野唯月を1トップに置く4-2-2-1へ変更。水戸に押し込まれる時間が増え、前半は0–0で折り返した。観戦者の印象では、水戸のシュートはGK正面に飛ぶ場面も目立った。</p>
        <p>68分に舩橋佑のFKを木本恭生が頭で合わせ、水戸が先制。東京Vは69分と82分に計4人を替え、松橋優安を終盤に右へ移した。4-2-2-1を保ったまま得点を奪えず、0–1で終えた。</p>
        <p>プレー内容や相馬体制下の傾向を比較するときは、17分以降の数的不利を考慮する。</p>
      </div>
      <div>
        <h3 className="text-sm font-bold text-text-primary">{source}</h3>
        <p className="mb-2 mt-1 text-xs leading-relaxed text-text-secondary">試合全体の集計。Jリーグ公式の集計も試合記録欄で確認できる。</p>
        <table className="w-full table-fixed text-center text-xs tabular-nums">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="w-1/2 py-1.5 text-left">項目</th>
              <th scope="col">水戸</th>
              <th scope="col">東京V</th>
            </tr>
          </thead>
          <tbody>
            {daznRows.map(([key, label]) => (
              <tr key={key} className="border-b border-border">
                <th scope="row" className="py-1.5 text-left font-medium">{label}</th>
                <td>{key === "xg" ? home.xg.toFixed(2) : home[key]}</td>
                <td>{key === "xg" ? away.xg.toFixed(2) : away[key]}</td>
              </tr>
            ))}
            <tr className="border-b border-border">
              <th scope="row" className="py-1.5 text-left font-medium">1シュート当たりのxG</th>
              <td>{(home.xg / home.shots).toFixed(3)}</td>
              <td>{(away.xg / away.shots).toFixed(3)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
