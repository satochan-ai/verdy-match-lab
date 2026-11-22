import type { Strategy } from "../../types/domain";
import type { CommonFixture } from "../types/fixture";
import type { PredictionPlayer } from "./prediction";

type Starter = PredictionPlayer & { number: number; reason: string };

// 根拠資料: docs/mito-preview-20261125-research.md（2026年11月22日確認）。
// 予想スタメン・三策・スコアはVerdy Match Labの独自予想で、公式発表ではない。

const goalkeeper = { number: 1, name: "マテウス", role: "GK", reason: "長崎・清水・名古屋と3試合連続で先発し、清水・名古屋では2試合連続無失点。継続起用を予想。" };
const leftBack = { number: 18, name: "溝口修平", role: "左SB", reason: "3試合連続で左SBに先発し、名古屋戦も交代なし。名古屋戦の後半5分には、溝口からのボールで新井が背後を取った。左で外側を走る役割を担う。" };
const leftCentreBack = { number: 29, name: "佐古真礼", role: "左CB", reason: "清水戦は18分から出場し、名古屋戦は先発して交代なし。2試合続けて無失点の最終ラインを継続すると予想。" };
const rightCentreBack = { number: 4, name: "林尚輝", role: "右CB", reason: "3試合連続で右CBに先発。水戸の2トップは背後への動きが多く（森監督就任後の3試合でオフサイド2〜4本）、ライン統率と最初の競り合いを任せる。" };
const rightBack = { number: 22, name: "内田陽介", role: "右SB", reason: "3試合連続で右SBに先発。名古屋戦は18分に警告を受け、68分に交代。水戸の左SH西原のファーへの飛び込みに対応する。" };
const leftMidfield = { number: 40, name: "新井悠太", role: "左SH", reason: "3試合連続で左SHに先発し、名古屋戦も交代なし。左の内側に入り、水戸の右SB真瀬と右SH田村の間を突く。" };
const leftCentreMidfield = { number: 16, name: "平川怜", role: "左CM", reason: "3試合連続で先発し、名古屋戦も交代なし。保持の中心で、前から来る水戸に対しては一美からのセカンドボールを拾う役割。" };
const rightCentreMidfield = { number: 10, name: "森田晃樹", role: "右CM", reason: "清水・名古屋で先発し、名古屋戦は交代なし（長崎戦は前半終了間際から出場）。水戸の左からのクロスでは中へ戻る。" };
const kumatoriyaForward = { number: 25, name: "熊取谷一星", role: "右FW", reason: "名古屋戦は右SHで先発し、68分から右FWへ移った（86分に交代）。清水戦は右SHで入って左FWへ移り、72分に得点。福岡戦は先発FWで得点。水戸戦は右FWでの先発を予想し、背後への抜け出しと前線からの運動量を生かす。" };

export const mitoVerdyLineup = {
  team: "東京ヴェルディ",
  formation: "4-4-2",
  basis: "名古屋戦の先発から1人を入れ替える予想。染野に代えて松橋を右SHで先発させ、熊取谷を右FW、一美を左FWに置く。名古屋戦68分以降に熊取谷が右FW、松橋が右SHに入った並びを、試合開始から使う想定。",
  rows: [
    [
      { number: 33, name: "一美和成", role: "左FW", reason: "福岡戦から4試合連続で右FWに先発し、名古屋戦は68分に交代。水戸戦は左FWへの配置変更を予想。前線でボールを収め、セカンドボールに関わる。水戸が前から来るときは、早い配球の受け手になる。" },
      kumatoriyaForward,
    ],
    [
      leftMidfield,
      leftCentreMidfield,
      rightCentreMidfield,
      { number: 7, name: "松橋優安", role: "右SH", reason: "福岡・長崎・清水・名古屋の4試合はすべて途中出場で、右SHに入った。名古屋戦後、相馬監督は松橋を攻守両面で評価。水戸の左SH西原と左SB大崎の前進に対応しつつ、熊取谷を前線に置くための先発を予想する。直近の先発は無く、90分の起用には不確実さが残る。" },
    ],
    [leftBack, leftCentreBack, rightCentreBack, rightBack],
    [goalkeeper],
  ] satisfies Starter[][],
};

const [, verdyMidfield, ...verdyBackRows] = mitoVerdyLineup.rows;

export const mitoVerdySomenoLineup = {
  ...mitoVerdyLineup,
  basis: "染野が先発する場合の別案。本命案との違いは、左FWの一美に代えて染野を先発させる1か所だけ。一美は控えに回る。",
  rows: [
    [
      { number: 9, name: "染野唯月", role: "左FW", reason: "長崎・清水・名古屋の3試合連続で左FWに先発し、名古屋戦は交代なし。左に流れて水戸の右CB木本を引き出し、新井と溝口が入るスペースを作る。" },
      kumatoriyaForward,
    ],
    verdyMidfield,
    ...verdyBackRows,
  ] satisfies Starter[][],
};

export const mitoOpponentLineup = {
  team: "水戸ホーリーホック",
  formation: "4-4-2",
  basis: "森直樹監督の就任後、3試合の開始時配置はいずれも4-4-2（Jリーグ公式配置図）。森体制で初勝利を挙げた11月20日の神戸戦の先発11人の継続を予想する。",
  rows: [
    [
      { number: 30, name: "奥村仁", role: "左FW", reason: "直近5試合すべて先発。神戸戦は左FW。千葉戦では右FWに入っており、2トップの左右は試合で入れ替わる。" },
      { number: 9, name: "根本凌", role: "右FW", reason: "千葉・神戸の2試合でFWに先発。神戸戦は右FW。" },
    ],
    [
      { number: 44, name: "西原源樹", role: "左SH", reason: "森体制の3試合で連続先発。神戸戦では6分、田村の右クロスをヘディングで決めた。" },
      { number: 20, name: "舩橋佑", role: "左CM", reason: "千葉・神戸の2試合で先発。" },
      { number: 19, name: "仙波大志", role: "右CM", reason: "森体制の3試合で連続先発。" },
      { number: 16, name: "田村遊吏", role: "右SH", reason: "森体制の3試合で連続先発し、左SB、右SB、右SHと位置を変えた。神戸戦は右SHで先制点をアシスト。" },
    ],
    [
      { number: 3, name: "大崎航詩", role: "左SB", reason: "森体制の3試合で連続先発。広島戦は中央MF、千葉・神戸戦は左SB。" },
      { number: 17, name: "板倉健太", role: "左CB", reason: "直近5試合すべて先発。" },
      { number: 15, name: "木本恭生", role: "右CB", reason: "神戸戦で89分に決勝点。広島戦は6分で交代しており、理由は未確認。" },
      { number: 25, name: "真瀬拓海", role: "右SB", reason: "広島戦の退場による1試合の出場停止は、11月8日の千葉戦で消化済み。神戸戦に先発した。" },
    ],
    [{ number: 27, name: "ヤクブ スウォビィク", nameBreak: "ヤクブ ", role: "GK", reason: "直近5試合すべて先発。GK松原修平は11月20日の練習で右アキレス腱を断裂したと、11月21日にクラブが発表。" }],
  ] satisfies Starter[][],
};

export const mitoAlternatives = [
  "右SBのローテーション（両案と別の選択肢）｜22 内田陽介に代えて15 鈴木海音。名古屋戦は68分から右SBに入った。内田を休ませる場合や、水戸の左からの仕掛けに1対1の守備を強めたい場合の候補。",
  "水戸の先発候補｜23 末谷誓梧（左SH）は神戸戦73分から出場し、左サイドでドリブル成功5回、89分の決勝点の起点になった。ただし全て神戸が10人になった後のプレー。8 加藤千尋は森体制の3試合すべてで途中出場。22 谷口海斗は広島戦で右SHに先発し、神戸戦は69分からFW。いずれも公式の起用情報は無い。",
];

export const mitoAvailability = [
  "染野唯月｜名古屋戦は先発して交代なし。本命案で先発から外したのは、中3日の日程を考えた予想上の判断。負傷や欠場を示すものではない。",
  "藤本寛也・チョ ユミン｜清水戦で交代し、名古屋戦はメンバー外。11月22日時点で状態の公式発表は確認できず、今節の出場可否は未確認。",
  "東京V｜齋藤功佑は長崎戦で脳振盪交代の後、名古屋戦はベンチ入り（出場なし）。山見大登は名古屋戦86分から出場し、試合後に長い時間の連続出場は「まだできていない」と話した。",
  "水戸｜GK松原修平は右アキレス腱断裂と同日の手術を、11月21日にクラブが発表。",
  "出場停止｜真瀬拓海の1試合の出場停止（10月31日の広島戦の退場による）は、11月8日の千葉戦で消化済み。J1第16節に適用される公示は、11月22日の確認時点で未確認。出場可否は当日の公式メンバー発表で確認してください。",
];

export const mitoPreview = {
  title: "中3日のアウェイ。前から来ても、引いて守っても、左から崩せるか",
  paragraphs: [
    "【事実】J1第16節は11月25日（水）19:00、水戸信用金庫スタジアム。第15節終了時点で、ホームの水戸は19位・勝点12（3勝3分9敗）、アウェイの東京Vは15位・勝点15（3勝6分6敗）。水戸は11月20日の神戸戦から中4日、東京Vは11月21日の名古屋戦から中3日。",
    "【事実】水戸は10月26日に森直樹監督が就任。森体制のリーグ3試合はいずれも4-4-2で始まり、広島に0-3、千葉に0-1、神戸に2-1。神戸戦は6分に田村の右クロスから西原が先制し、51分に追いつかれた後、58分に神戸が退場者を出した。89分の決勝点は、末谷が左から運んだクロスを木本が決めたもので、神戸が10人になった後のプレー。",
    "【事実】11対11の0〜58分、水戸のシュートは4本・ゴール期待値0.33、神戸は14本・1.66。千葉戦について、Jリーグの戦評は、水戸が守備では千葉の形に合わせ、攻撃では可変してビルドアップしたと記し、千葉の監督は水戸の背後へのロングボールを挙げた。千葉戦の前半の支配率は水戸55%。",
    "【分析】水戸は、相手と準備期間に応じて、前から捕まえにくる試合と、自陣で4-4のブロックを作る試合がある。東京Vは、前から来れば一美への早い配球とセカンドボールで前進し、引いて守れば新井と溝口で左を崩して低い折り返しを狙いたい。終盤は、水戸の左から持ち運ぶ選手への対応が鍵になる。",
  ],
  keyPoints: [
    "左の新井と溝口で、真瀬と田村の背後を突く",
    "田村の右クロスと、ファーに入る西原を止める",
    "60分台からの交代で、前線の組み合わせを変える",
  ],
};

export const mitoStrategies: Strategy[] = [
  {
    orderNo: 1,
    title: "左を崩して、低く折り返す",
    description: "狙い：水戸の右SB真瀬と右SH田村の間と背後。水戸が自陣で守る場合（神戸戦はクリア35本・ブロック23本）は、新井が内側に入り、溝口が外を回る。高いクロスより、ペナルティーエリア左からの低い折り返しを選ぶ。一美がニア、右FWの熊取谷は中央と背後に入る。水戸が前から来る場合（千葉戦型）は、マテウス・佐古・林から一美へ早めに配球し、平川と新井がセカンドボールを回収して、前に出た真瀬・田村の背後へ進む。成功条件：左で新井・溝口・平川の3人がそろい、ペナルティーエリア内から折り返せること。失敗条件：自陣でつなごうとして奪われ、短いカウンターを受けること。または、溝口の背後を奥村に使われること。観察ポイント：左からの折り返しの本数、一美が競ったボールの回収、田村がどこまで下がって守るか。",
    result: "pending",
  },
  {
    orderNo: 2,
    title: "水戸のクロス攻撃を抑える",
    description: "狙い：11対11での水戸の得点は、神戸戦6分の、右の田村のクロスを逆サイドの西原が合わせた形だけ。田村がボールを持ったら、新井が縦を遅らせ、溝口が対面に立つ。ファーの西原には内田が付き、右SHの松橋も戻る。背後へのロングボールは林と佐古が先に触り、こぼれ球は平川と森田が拾う。終盤に末谷が入ったら、松橋と内田（または鈴木海音）で2対1を作り、左からの持ち運びを止める。成功条件：ファーで合わされる回数を抑え、セカンドボールを東京Vが拾うこと。失敗条件：大外の西原を捕まえきれないこと。終盤に右で末谷と1対1が続くこと。観察ポイント：水戸のクロスの本数とファーで触られた数、背後へのボールで東京Vが先に触った割合、末谷のドリブルの成功数。",
    result: "pending",
  },
  {
    orderNo: 3,
    title: "60分台から、前線の組み合わせを変える",
    description: "本命案では松橋が右SHで先発するため、途中で松橋を入れる交代は使わない。60〜65分に一美に代えて染野を入れ、左FWに置く（別案で染野が先発した場合は、染野に代えて一美）。水戸が末谷を入れたら、内田に代えて鈴木海音を右SBへ。70〜75分に、松橋の運動量が落ちていれば、松橋に代えて山見を入れ、熊取谷を右SHへ戻して山見を右FWに置く。松橋が走れていれば、熊取谷に代えて山見を右FWへ。中盤の強度が落ちたら、森田に代えて柴戸を右CMへ。どの交代でも11人の配置を保つ。染野・山見・鈴木海音・柴戸の投入は、当日のベンチ入りと出場可能な状態が前提。成功条件：交代後10分で、水戸のCBの背後へ走る回数とシュートが増えること。失敗条件：先制されて交代が後手に回ること。山見を早く入れすぎて、終盤に走れなくなること（本人は長い時間の連続出場はまだと話している）。観察ポイント：交代後のシュート数、山見と熊取谷の背後への抜け出しとオフサイドの数、末谷が入った後の右サイドの1対1。",
    result: "pending",
  },
];

export const mitoScorePrediction = {
  score: "水戸 0–1 東京V",
  reason: "東京Vは清水・名古屋と2試合連続無失点。水戸は森体制の3試合で、11対11の時間帯の得点が神戸戦6分の1点だけで、千葉戦は90分間の枠内シュートが0本だった。東京Vが左の崩しか、交代後の前線の背後への動きから1点を取ると予想する。",
  uncertainty: "東京Vも名古屋戦のゴール期待値は0.37で、得点力に課題がある。0-0の可能性も十分ある。水戸が早い時間に右クロスから先制した場合や、中3日の東京Vが終盤に走り負けた場合は、予想が外れやすい。",
};

export const mitoSources = [
  { label: "Jリーグ公式 水戸対東京V", url: "https://www.jleague.jp/match/j1/2026/112501/" },
  { label: "Jリーグ公式 J1順位表", url: "https://www.jleague.jp/j1/standings/2026-27/" },
  { label: "Jリーグ公式 神戸対水戸の配置図", url: "https://www.jleague.jp/match/j1/2026/112003/lineup/" },
  { label: "Jリーグ公式 神戸対水戸の試合速報", url: "https://www.jleague.jp/match/j1/2026/112003/live-commentary/" },
  { label: "Jリーグ公式 千葉対水戸の戦評", url: "https://www.jleague.jp/match/j1/2026/110805/review/" },
  { label: "Jリーグ公式 千葉対水戸の配置図", url: "https://www.jleague.jp/match/j1/2026/110805/lineup/" },
  { label: "Jリーグ公式 水戸対広島の配置図", url: "https://www.jleague.jp/match/j1/2026/103107/lineup/" },
  { label: "Jリーグ公式 東京V対名古屋の公式記録", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34657" },
  { label: "Jリーグ公式 東京V対名古屋の配置図", url: "https://www.jleague.jp/match/j1/2026/112101/lineup/" },
  { label: "Jリーグ 真瀬拓海の出場停止処分", url: "https://aboutj.jleague.jp/corporate/news/article/103" },
  { label: "Jリーグ 出場停止選手のお知らせ（11月16日）", url: "https://aboutj.jleague.jp/corporate/news/article/115" },
  { label: "東京V公式 名古屋戦REPORT", url: "https://www.verdy.co.jp/match/info/2026112101/report" },
  { label: "東京V公式 水戸戦", url: "https://www.verdy.co.jp/match/info/2026112501" },
  { label: "水戸公式 第15節 神戸戦", url: "https://www.mito-hollyhock.net/match/games2026/j15/" },
  { label: "水戸公式 森直樹監督の就任", url: "https://www.mito-hollyhock.net/news/p=55660/" },
  { label: "水戸公式 松原修平の負傷", url: "https://www.mito-hollyhock.net/news/p=56229/" },
  { label: "Football LAB 水戸の対戦データ", url: "https://www.football-lab.jp/mito/preview" },
];

export function shouldShowMitoPreview(fixture: Pick<CommonFixture, "id" | "status"> | undefined) {
  return fixture?.id === "sched-mito"
    && (fixture.status === "scheduled" || fixture.status === "live" || fixture.status === "half_time");
}
