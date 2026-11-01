import { u21NagoyaGoals, u21NagoyaMatch, u21NagoyaReview, u21NagoyaStats } from "@/lib/mock/u21-nagoya-result";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function U21NagoyaReport() {
  let homeScore = 0;
  let awayScore = 0;
  return (
    <div className="space-y-8">
      <section>
        <SectionHeader title="得点経過" eyebrow="GOAL TIMELINE" />
        <p className="mb-2 text-[12px] text-text-secondary">2026年11月1日 ／ 前半 2-3 ／ 後半 2-0（スコアは東京V－名古屋）</p>
        <ol className="divide-y divide-border text-[13px]">
          {u21NagoyaGoals.map((goal) => {
            if (goal.team === u21NagoyaMatch.homeTeamName) homeScore++;
            else awayScore++;
            return <li key={`${goal.minute}-${goal.scorer}`} className="flex gap-3 py-2"><span className="w-10 shrink-0 tabular-nums">{goal.minute}</span><span className="min-w-0 flex-1">{goal.scorer}<span className="ml-2 text-[11px] text-text-secondary">{goal.team}</span></span><strong className="shrink-0 tabular-nums">{homeScore}-{awayScore}</strong></li>;
          })}
        </ol>
      </section>
      <section>
        <SectionHeader title="公式スタッツ" eyebrow="MATCH STATS" />
        <table className="w-full text-center text-[12px]">
          <thead><tr><th className="py-2">東京V</th><th>項目</th><th>名古屋</th></tr></thead>
          <tbody>{u21NagoyaStats.map((stat) => <tr key={stat.label} className="border-t border-border"><td className="py-2 font-bold tabular-nums">{stat.home}</td><th className="font-normal">{stat.label}</th><td className="font-bold tabular-nums">{stat.away}</td></tr>)}</tbody>
        </table>
      </section>
      <section className="space-y-3 text-[13px] leading-relaxed">
        <SectionHeader title="試合レビュー" eyebrow="MATCH REVIEW" />
        <h2 className="text-[16px] font-bold">{u21NagoyaReview.title}</h2>
        {u21NagoyaReview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <p>{u21NagoyaReview.cardNote}</p>
        <details className="border-y border-border py-2 text-[12px] text-text-secondary"><summary className="cursor-pointer font-bold">公式資料の照合メモ</summary><p className="mt-2">{u21NagoyaReview.sourceNote}</p><a className="underline" href="https://data.j-league.or.jp/SFMS02/?match_card_id=35134" target="_blank" rel="noopener noreferrer">Data Site 公式記録</a></details>
        <div className="border-l-2 border-border pl-3"><h3 className="font-bold">観戦者の所感（追記欄）</h3><p className="text-text-secondary">未追記。上記は公式記録に基づく経過です。映像は未確認のため、プレー内容・戦術の評価は含めていません。</p></div>
      </section>
    </div>
  );
}
