import { NagoyaPreContent } from "@/components/match/NagoyaPreContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { nagoyaOpponentLineup, nagoyaVerdyLineup, nagoyaVerdySomenoLineup } from "@/lib/match/nagoya-preview";
import { nagoyaResult } from "@/lib/mock/top-nagoya-result";

const verdyRoles = ["GK", "左SB", "左CB", "右CB", "右SB", "左SH", "左CM", "右CM", "右SH", "左FW", "右FW"];
const nagoyaRoles = ["GK", "左CB", "中央CB", "右CB", "左WB", "左CM", "右CM", "右WB", "左シャドー", "右シャドー", "CF"];

const normalizeName = (name: string) => name.replace(/\s+/g, "");

function compareLineup(
  label: string,
  prediction: typeof nagoyaVerdyLineup,
  actual: typeof nagoyaResult.actualLineups.home,
  roles: string[],
) {
  const actualByName = new Map(actual.pitchOrder.map((player, index) => {
    const name = normalizeName(player.replace(/^\d+\s+/, ""));
    return [name, { player, role: roles[index] }];
  }));
  const predicted = prediction.rows.flat();
  const rows = predicted.map(({ number, name, role }) => ({
    number,
    name,
    predicted: role,
    actual: actualByName.get(normalizeName(name))?.role,
  }));
  return {
    label,
    formation: prediction.formation,
    rows,
    starters: rows.filter((row) => row.actual !== undefined).length,
    positions: rows.filter((row) => row.actual === row.predicted).length,
    extraStarters: [...actualByName].filter(([name]) => !predicted.some((player) => normalizeName(player.name) === name)).map(([, starter]) => starter),
  };
}

const comparisons = [
  compareLineup("東京V 本命案", nagoyaVerdyLineup, nagoyaResult.actualLineups.home, verdyRoles),
  compareLineup("東京V 染野先発案", nagoyaVerdySomenoLineup, nagoyaResult.actualLineups.home, verdyRoles),
  compareLineup("名古屋", nagoyaOpponentLineup, nagoyaResult.actualLineups.away, nagoyaRoles),
];

export function NagoyaResultExtras() {
  return (
    <div className="space-y-8 text-[13px] leading-relaxed text-text-primary">
      <section className="space-y-3">
        <SectionHeader title="名古屋戦レビュー" eyebrow="MATCH REVIEW" />
        <p>2026／27 明治安田J1リーグ第15節。東京Vは3連勝の後、名古屋と0–0。清水戦に続く無失点で、同じ勝点で迎えた直接対決を両チームが勝点1ずつで終えた。</p>
        <h3 className="font-bold">試合経過と公式コメント</h3>
        <p>名古屋が62%のボールを保持。相馬監督は、立ち上がりには相手のプレスの背後を取れたものの、前半途中からはロングボールの次のボールを拾われる場面が増えたと振り返った。守備では東京Vがクロスや折り返しに体を寄せ、後半19分には山岸の至近距離からのシュートをマテウスが止めた。</p>
        <p>相馬監督はハーフタイムに修正し、後半はサイドにも起点を作れたと述べた。後半5分には溝口のパスで新井が左から進入したが、折り返しは稲垣がクリア。後半7分の一美のシュートはシュミットが止めた。</p>
        <p>62分に名古屋は4人を替えて4-4-2へ。68分に東京Vは鈴木海音を右SB、松橋を右SHに入れ、熊取谷を右FWへ。相馬監督は内田陽介の警告と2トップの運動量に触れ、松橋には攻守両面を期待した。86分の山見投入後は山見が左FW、染野が右FWに移った。</p>
        <h3 className="font-bold">独自分析</h3>
        <p>名古屋に押し込まれた時間を考えると、勝点1には価値がある。速報のゴール期待値は東京V 0.37、名古屋 1.19。東京Vは左の背後を取れた後に、折り返しを受ける選手とこぼれ球を拾う選手が連動すると、攻撃を続けやすくなる。次戦では、奪った直後の最初のパスで敵陣に入れたかと、サイドからの前進を中央でのシュートにつなげられたかを見たい。</p>
        <p className="text-xs text-text-secondary">
          <a className="underline" href="https://www.verdy.co.jp/match/info/2026112101/report">東京V公式の監督・選手コメント</a>
          {" ／ "}
          <a className="underline" href="https://www.jleague.jp/match/j1/2026/112101/live-commentary/">Jリーグ公式速報</a>
          {" ／ "}
          <a className="underline" href="https://www.verdy.co.jp/match/info/2026112101/result">東京V公式の試合速報（ゴール期待値・経過）</a>
          {" ／ "}
          <a className="underline" href="https://www.jleague.jp/match/j1/2026/112101/lineup/">Jリーグ公式の配置図</a>
        </p>
      </section>

      <section className="space-y-3">
        <SectionHeader title="予想スタメンの答え合わせ" eyebrow="PREDICTION CHECK" />
        <p>PR #135の公開時点の予想を、Jリーグ公式配置図の「前半0分」と比較。左右と列を含む開始位置が一致した選手を、先発一致とは別に数えています。</p>
        <p>予想は東京V 1–0 名古屋。実際は0–0で、名古屋を無得点に抑えた一方、東京Vの得点は予想より1点少なく、結果は引き分けでした。</p>
        <p>佐古は両案どおり左CB。熊取谷は右SHで、染野が左FW。松橋はベンチから出場し、藤本寛也とチョ ユミンは試合の登録メンバーに入りませんでした。</p>
        {comparisons.map(({ label, formation, rows, starters, positions, extraStarters }) => (
          <details key={label} className="border-y border-border py-2">
            <summary className="cursor-pointer font-bold">{label} {formation} ／ 先発 {starters}/11・配置 {positions}/11</summary>
            <table className="mt-2 w-full table-fixed text-left text-xs">
              <thead><tr className="border-b border-border"><th scope="col" className="w-2/5 py-2">選手</th><th scope="col">予想</th><th scope="col">実際</th><th scope="col">判定</th></tr></thead>
              <tbody>
                {rows.map(({ number, name, predicted, actual }) => (
                  <tr key={number} className="border-b border-border align-top">
                    <th scope="row" className="py-2 pr-1 font-medium">{number} {name}</th>
                    <td className="py-2 pr-1">{predicted}</td>
                    <td className="py-2 pr-1">{actual ?? "先発外"}</td>
                    <td className="py-2">{actual === predicted ? "一致" : actual ? "配置違い" : "先発外"}</td>
                  </tr>
                ))}
                {extraStarters.map(({ player, role }) => (
                  <tr key={player} className="border-b border-border align-top">
                    <th scope="row" className="py-2 pr-1 font-medium">{player}</th>
                    <td className="py-2 pr-1">予想外</td><td className="py-2 pr-1">{role}</td><td className="py-2">先発</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        ))}
      </section>

      <details className="border-y border-border py-3">
        <summary className="cursor-pointer font-bold">公開時の名古屋戦プレビュー・予想・三策を見る</summary>
        <div className="mt-4 space-y-6"><NagoyaPreContent /></div>
      </details>
    </div>
  );
}
