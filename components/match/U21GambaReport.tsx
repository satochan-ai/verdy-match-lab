import { u21GambaGoals, u21GambaMatch, u21GambaSources, u21GambaStats } from "@/lib/mock/u21-gamba-result";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function U21GambaReport() {
  let homeScore = 0;
  let awayScore = 0;
  return (
    <div className="space-y-8">
      <section>
        <SectionHeader title="得点経過" eyebrow="GOAL TIMELINE" />
        <ol className="divide-y divide-border text-[13px]">
          {u21GambaGoals.map((goal) => {
            if (goal.team === u21GambaMatch.homeTeamName) homeScore++;
            else awayScore++;
            return (
              <li key={goal.minute} className="flex gap-3 py-2">
                <span className="w-10 shrink-0 tabular-nums">{goal.minute}</span>
                <span className="min-w-0 flex-1">
                  {goal.scorer}
                  <span className="ml-2 text-[11px] text-text-secondary">{goal.team}</span>
                </span>
                <strong className="shrink-0 tabular-nums">{homeScore}–{awayScore}</strong>
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <SectionHeader title="公式スタッツ" eyebrow="MATCH STATS" />
        <table className="w-full text-center text-[12px]">
          <thead>
            <tr><th scope="col" className="py-2">G大阪</th><th scope="col">項目</th><th scope="col">東京V</th></tr>
          </thead>
          <tbody>
            {u21GambaStats.map(({ label, home, away }) => (
              <tr key={label} className="border-t border-border">
                <td className="py-2 font-bold tabular-nums">{home}</td>
                <th scope="row" className="font-normal">{label}</th>
                <td className="font-bold tabular-nums">{away}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="space-y-3 text-[13px] leading-relaxed">
        <SectionHeader title="試合レビュー" eyebrow="MATCH REVIEW" />
        <h2 className="text-[16px] font-bold">川村楽人が前半2得点。仲山獅恩の90+5分弾でガンバ大阪に競り勝つ</h2>
        <p>24分に加賀野統に先制を許した東京Vは、33分と41分に川村楽人が決め、前半のうちに逆転した。61分には中積爲に決められ、2–2に追いつかれた。</p>
        <p>試合全体で東京Vはシュート19本、CK6本。G大阪はシュート8本、CK2本だった。90+5分に仲山獅恩が決勝点を挙げ、東京Vが3–2で交流戦ラウンド第2節を制した。</p>
        <div className="border-l-2 border-border pl-3">
          <h3 className="font-bold">編集部の見方</h3>
          <p>シュート数で大きく上回った東京Vは、前半に一度リードを奪い、追いつかれた後も勝ち越し点を求める展開になった。二度目のリードを奪ったのは後半追加時間で、その1点が勝敗を分けた。</p>
        </div>
      </section>

      <section className="space-y-2 text-[12px] leading-relaxed text-text-secondary">
        <h2 className="font-bold">公式資料と記録の補足</h2>
        <p>東京Vの交代・警告・退場は各0件。先発と控えは公式記録の登録ポジション順で掲載しています。</p>
        <p>城阪光喜から林大地への交代はJリーグ公式速報の90分を採用しました。Data SiteとG大阪公式の交代一覧では71分です。村田康輔から竹原玲音への交代はData SiteとG大阪公式の62分を採用しました。Jリーグ公式速報では71分です。</p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          <li><a className="underline" href={u21GambaSources.match}>Jリーグ公式試合ページ</a></li>
          <li><a className="underline" href={u21GambaSources.record}>Data Site 公式記録</a></li>
          <li><a className="underline" href={u21GambaSources.club}>ガンバ大阪公式速報</a></li>
        </ul>
      </section>
    </div>
  );
}