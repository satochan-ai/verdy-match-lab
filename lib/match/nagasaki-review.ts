import { nagasakiPredictionRows } from "./nagasaki-prediction.ts";
import { nagasakiOpponentRows } from "./nagasaki-opponent-prediction.ts";
import { nagasakiStrategies } from "./nagasaki-content.ts";
import { nagasakiResult } from "../mock/top-nagasaki-result.ts";
import type { ActualLineup } from "../../types/domain";

const normalizeName = (name: string) => name.replace(/\s/g, "");
function compareStarters(predicted: typeof nagasakiPredictionRows, actual: ActualLineup) {
  const names = Object.values(actual.starters).flat().map(player => player.replace(/^\d+\s+/, ""));
  const predictedNames = predicted.flat().map(player => player.name);
  return {
    matched: predictedNames.filter(name => names.some(actualName => normalizeName(actualName) === normalizeName(name))).length,
    predictedOnly: predictedNames.filter(name => !names.some(actualName => normalizeName(actualName) === normalizeName(name))),
    actualOnly: names.filter(name => !predictedNames.some(predictedName => normalizeName(predictedName) === normalizeName(name))),
  };
}

export const nagasakiPredictionCheck = {
  verdy: compareStarters(nagasakiPredictionRows, nagasakiResult.actualLineups!.away),
  opponent: compareStarters(nagasakiOpponentRows, nagasakiResult.actualLineups!.home),
  positionNote: "一致人数は先発11人の氏名だけを比較し、候補選手を含めない。両チームとも予想と公式開始時のシステムは一致。東京Vは一美の2トップ内の左右が予想と異なり、長崎はWBの米田（左）・翁長（右）が予想と逆。選手の一致と左右配置は別の評価。",
};

export const nagasakiReview = {
  title: "染野が先制、一美が決勝点。長崎を2-1で下し今季初の連勝",
  paragraphs: [
    "前半アディショナルタイムの45+12分、藤本寛也のパスを受けた染野唯月が決めて東京Vが先制。前半を0-1で折り返した。公式速報では、染野がペナルティエリア内へドリブルで進み、右足で決めたと記録されている。",
    "76分には途中出場の岩崎悠人のクロスからチアゴ・サンタナに同点とされた。それでも81分、72分から出場した熊取谷一星のスルーパスが溝口修平につながり、溝口のクロスを一美和成が右足で決めて勝ち越した。この得点経過はJリーグ公式速報に基づく。",
    "東京Vは長崎を2-1で下し、福岡戦に続いて今季初のリーグ2連勝。相馬監督就任後は広島戦0-2、FC東京戦0-4、横浜FM戦2-2、福岡戦3-1、長崎戦2-1と推移し、リーグ5試合で2勝1分2敗となった。",
  ],
  notice: "公式記録・公式速報に基づくレビュー。映像は未確認で、守備・攻撃の戦術的な成否や交代の意図は断定していません。",
};

const verdicts = [
  { label: "判断保留", reason: "長谷川元希とマテウス・ジェズスはいずれも先発。長崎の公式記録はシュート9本・1得点だが、チーム全体の数値から両者への縦パスや受け渡しを制限できたかは判断できない。映像未確認のため保留。" },
  { label: "一部成功", reason: "81分の決勝点は熊取谷→溝口→一美。溝口のクロスが得点につながった点は確認できる。一方、溝口と新井悠太の連係が試合全体で機能したか、この1点だけでは評価できない。" },
  { label: "一部成功", reason: "72分に染野に代わって出場した熊取谷が81分の得点の起点となった。松橋も72分、寺沼は83分に出場。森田は45+10分の脳振盪交代で出場し、染野は先発して先制点を挙げた。交代選手の関与は確認できるが、交代全体の狙いや効果を勝敗だけで成功とは断定しない。" },
] as const;

/** 公開済み三策の文章は変更せず、試合後の評価だけを別データで加える。 */
export const nagasakiStrategyReviews = nagasakiStrategies.map((strategy, index) => ({ ...strategy, verdict: verdicts[index].label, evidence: verdicts[index].reason }));
