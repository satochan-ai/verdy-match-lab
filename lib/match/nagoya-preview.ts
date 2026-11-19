import type { Strategy } from "../../types/domain";
import type { CommonFixture } from "../types/fixture";
import type { PredictionPlayer } from "./prediction";

type Starter = PredictionPlayer & { number: number; reason: string };

const kumatoriya = {
  number: 25,
  name: "熊取谷一星",
  reason: "福岡戦は左FWで先発して得点。清水戦は59分に右SHで入り、67分に左FWへ移って72分に決勝点を挙げた。",
};

export const nagoyaVerdyLineup = {
  team: "東京ヴェルディ",
  formation: "4-4-2",
  basis: "福岡・長崎・清水の公式開始時配置はいずれも4-4-2。左CBは清水戦でチョと交代した佐古を予想。右SHの松橋と左FWの熊取谷は、同試合の67分以降と同じ配置です。",
  rows: [
    [
      { ...kumatoriya, role: "左FW" },
      { number: 33, name: "一美和成", role: "右FW", reason: "3試合連続で右のFWに先発。背負って収め、味方が押し上げる時間を作る役割を見込む。" },
    ],
    [
      { number: 40, name: "新井悠太", role: "左SH", reason: "3試合連続で左SH。清水戦では熊取谷の決勝点につながるスルーパスを出した。" },
      { number: 16, name: "平川怜", role: "左CM", reason: "3試合すべてフル出場。左からの前進とボールを失った後の中央のカバーを任せたい。" },
      { number: 10, name: "森田晃樹", role: "右CM", reason: "福岡・長崎で途中出場し、清水戦で先発。右の中央MFを継続すると予想。" },
      { number: 7, name: "松橋優安", role: "右SH", reason: "福岡・長崎・清水の3試合すべてで途中から右SHに入り、福岡戦で勝ち越し点。直近3試合の先発は0回。" },
    ],
    [
      { number: 18, name: "溝口修平", role: "左SB", reason: "3試合すべて左SBでフル出場。新井との距離を保ちながら左を支える。" },
      { number: 29, name: "佐古真礼", role: "左CB", reason: "3試合とも途中出場。清水戦では18分にチョと交代し、無失点で終えた守備陣の一角を担った。" },
      { number: 4, name: "林尚輝", role: "右CB", reason: "3試合連続で右CBに先発し、長崎・清水でフル出場。隣のCBが替わっても継続起用と予想。" },
      { number: 22, name: "内田陽介", role: "右SB", reason: "3試合すべて右SBでフル出場。藤本の外を支え、名古屋の左WBにも対応する。" },
    ],
    [{ number: 1, name: "マテウス", role: "GK", reason: "3試合すべてフル出場し、清水戦は無失点。継続起用を予想。" }],
  ] satisfies Starter[][],
};

const [verdyForwards, verdyMidfield, ...verdyBackRows] = nagoyaVerdyLineup.rows;

export const nagoyaVerdySomenoLineup = {
  ...nagoyaVerdyLineup,
  basis: "染野が先発可能な場合の予想です。長崎・清水で先発した染野を左FWに、清水戦で途中から右SHに入った熊取谷を右SHに置きます。",
  rows: [
    [
      { number: 9, name: "染野唯月", role: "左FW", reason: "長崎・清水で左FWに先発し、長崎戦で得点。清水戦では67分に公式記録上の脳振盪交代となり、今節の出場可否は未確認。" },
      verdyForwards[1],
    ],
    [...verdyMidfield.slice(0, -1), { ...kumatoriya, role: "右SH" }],
    ...verdyBackRows,
  ] satisfies Starter[][],
};

export const nagoyaOpponentLineup = {
  team: "名古屋グランパス",
  formation: "3-4-2-1",
  basis: "横浜FM・京都戦の公式開始時配置は3-4-2-1。京都戦の先発11人を予想し、神戸戦のように4-4-2で入る可能性も見る。",
  rows: [
    [{ number: 11, name: "山岸祐也", role: "CF", reason: "京都・横浜FM戦で1トップ。神戸戦も途中出場。" }],
    [
      { number: 22, name: "木村勇大", role: "左シャドー", reason: "直近3試合すべてフル出場。京都・横浜FM戦では左シャドー。" },
      { number: 17, name: "内田宅哉", role: "右シャドー", reason: "3試合連続先発。京都・横浜FM戦の右シャドーを予想。" },
    ],
    [
      { number: 27, name: "中山克広", role: "左WB", reason: "3試合連続で左のサイドに先発。3バック時は左WB。" },
      { number: 31, name: "高嶺朋樹", role: "左CM", reason: "京都・横浜FM戦で中央MFに先発。京都戦はハーフタイムまでプレー。" },
      { number: 15, name: "稲垣祥", role: "右CM", reason: "3試合すべてフル出場。京都戦では右の中央MF。" },
      { number: 7, name: "和泉竜司", role: "右WB", reason: "3試合連続で右のサイドに先発。3バック時は右WB。" },
    ],
    [
      { number: 3, name: "佐藤瑶大", role: "左CB", reason: "横浜FM戦の後半から出場し、神戸・京都戦で先発。京都戦の左CBを継続する想定。" },
      { number: 13, name: "藤井陽也", role: "中央CB", reason: "神戸・京都戦でフル出場。京都戦の3バックでは中央。" },
      { number: 70, name: "原輝綺", role: "右CB", reason: "3試合すべてフル出場。京都・横浜FM戦では3バックの右。" },
    ],
    [{ number: 1, name: "シュミット ダニエル", nameBreak: "シュミット ", role: "GK", reason: "3試合すべてフル出場。控えGKのピサノはU-21代表遠征後で、合流状況は未確認。" }],
  ] satisfies Starter[][],
};

export const nagoyaAlternatives = [
  "2 柴戸海（右CM）｜清水戦で59分に森田と交代。中央の守備強度を優先するときの候補。",
];

export const nagoyaAvailability = [
  "染野唯月｜清水戦67分に公式記録上の脳振盪交代。11月11日の練習取材では接触強度の高い一部メニューを回避。今節の出場可否は未確認。",
  "藤本寛也｜清水戦で負傷し、59分に交代。11月11日の練習取材では別メニュー。今節の出場可否は未確認。",
  "チョ ユミン｜清水戦18分に負傷交代。11月11日の練習取材では別メニュー。今節の出場可否は未確認。",
  "東京V｜森田晃樹・寺沼星文は9月にクラブが負傷を公表し、両者とも清水戦で出場。宮原和也、山見大登、吉田泰授にも以前のクラブ負傷発表があり、今節の可否は未確認。齋藤功佑は長崎戦で脳振盪交代、清水戦はベンチ外で、今節の可否は未確認。東京Vの予想先発に影響する11月の代表招集は確認できていません。",
  "名古屋｜浅野雄也はクラブの負傷発表と11月11日のリハビリ報告、マルクス ヴィニシウスは9月のリハビリ帰国発表を確認。今節の可否は未確認。ピサノ アレクサンドレ幸冬堀尾は11月8〜18日のU-21日本代表遠征に選出。遠征後の合流・登録状況は未確認。",
  "出場停止｜11月16日のJリーグ公示で、このJ1第15節の両クラブの該当選手は確認されていません。Football LABの欠場情報は参照時点の目安で、11月21日の出場可否は公式メンバー発表で確認してください。",
];

export const nagoyaPreview = {
  title: "4連勝へ。名古屋の両翼を押し下げ、空いた中央を使えるか",
  paragraphs: [
    "【事実】J1第15節は11月21日（土）14:00、味の素スタジアム。第14節終了時点で、ホームの東京Vは14位・勝点14（3勝5分6敗）、アウェイの名古屋は13位・勝点14（4勝2分8敗）。",
    "【事実】相馬直樹監督就任後のリーグ6試合で、東京Vは3勝1分2敗。福岡に3-1、長崎に2-1、清水に1-0と3連勝している。直近3試合の開始時配置は4-4-2で、9人が連続先発。清水戦では59分に右SHで入った熊取谷が、67分に左FWへ移り、72分に新井のスルーパスから決勝点を挙げた。一方、Jリーグの集計で東京Vはシュート6本、清水は12本だった。",
    "【事実】名古屋は柏戦の3-1以降、C大阪・横浜FMにともに1-1、神戸に1-3、京都に0-2で4試合勝利なし。神戸戦は4-4-2、横浜FM・京都戦は3-4-2-1で開始した。Football LABの第14節終了時点の集計では、名古屋は1試合平均のゴール期待値が1.400で9位。得点15のうちセットプレーから4点、クロスから3点を挙げている。",
    "【分析】東京Vは先発の連係と交代選手の得点力を生かせる一方、押し込まれた時間にも前線への出口が必要。名古屋が3バックなら、中山・和泉が高く出た側の背後を狙いつつ、逆サイドのWBへの展開に備えたい。名古屋が4-4-2なら、前線2人を使った背後への攻撃にも注意が要る。",
  ],
  keyPoints: [
    "名古屋のWB背後を取り、短い折り返しで2トップへ",
    "クロスの出どころと、セットプレーのこぼれ球を抑える",
    "先制点と、60分前後の交代で主導権を握る",
  ],
};

export const nagoyaStrategies: Strategy[] = [
  {
    orderNo: 1,
    title: "WBの背後に入り、短い折り返しを通す",
    description: "東京Vの12得点中4点がクロスから。名古屋の23失点中8点は30m未満のパスからだった（Football LAB分類）。名古屋の左WB中山が上がったら、松橋が内側で受け、内田陽介を外に走らせる。左も新井と溝口で背後を狙う。一美がニアに入り、左FWの熊取谷は中央で折り返しを狙う。相手が4バックで外を埋めるなら、一美への縦パスを熊取谷が拾って逆側へ展開する。染野先発案では、右の連係を熊取谷、左FWの役割を染野が担う。",
    result: "pending",
  },
  {
    orderNo: 2,
    title: "大外に出させても、自由には上げさせない",
    description: "名古屋はクロスとセットプレーから計7得点。東京Vはクロスから5失点している。右SHの松橋（染野先発案では熊取谷）が左WBの中山に寄せ、左SHの新井は右WBの和泉を見る。SBは内側を走る木村・内田宅哉を受け渡す。逆側のSBはファーを絞り、平川か森田が折り返しのコースを消す。CKでは最初の競り合いに加え、こぼれ球に備えてペナルティーエリア手前にも1人置く。",
    result: "pending",
  },
  {
    orderNo: 3,
    title: "60分前後に、スコアに応じて右と中央を入れ替える",
    description: "同点・ビハインドで右を活性化したいとき、本命案では松橋に代えて寺沼を前線に入れ、熊取谷を右SHへ。一美と寺沼をエリア内に置き、熊取谷と新井から供給する。染野先発案では染野に代えて松橋を右SHに入れ、清水戦と同様に熊取谷を左FWへ移す。リード時に中央が間延びすれば、両案とも柴戸を森田の位置に入れ、平川と中央を締める。交代は当日のベンチ入りと試合展開に応じた提案。",
    result: "pending",
  },
];

export const nagoyaScorePrediction = {
  score: "東京V 1–0 名古屋",
  reason: "東京Vは3連勝中で、福岡・清水戦では途中出場選手が勝ち越し点を挙げた。名古屋は直近2試合で1得点・5失点。東京Vが交代でサイドの推進力を補い、接戦の後半に1点を取ると予想する。",
  uncertainty: "名古屋がセットプレーや早い時間の背後へのボールで先制すると、東京Vは守備ブロックを崩す展開になる。名古屋が4バックでサイドの背後を消した場合や、東京Vの左CB・中央MFの組み合わせが変わった場合も読みが外れやすい。",
};

export const nagoyaSources = [
  { label: "Jリーグ公式 試合情報", url: "https://www.jleague.jp/match/j1/2026/112101/" },
  { label: "Jリーグ公式 福岡戦", url: "https://www.jleague.jp/match/j1/2026/102408/lineup/" },
  { label: "Jリーグ公式 長崎戦", url: "https://www.jleague.jp/match/j1/2026/110103/lineup/" },
  { label: "Jリーグ公式 清水戦の配置図", url: "https://www.jleague.jp/match/j1/2026/110706/lineup/" },
  { label: "Jリーグ公式 清水戦の交代記録", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34647" },
  { label: "Jリーグ公式 清水戦の戦評", url: "https://www.jleague.jp/match/j1/2026/110706/review/" },
  { label: "SempreVerdy 11月11日の練習取材", url: "https://note.com/ardbeg27/n/n281f52acb793" },
  { label: "Jリーグ公式 名古屋対横浜FM", url: "https://www.jleague.jp/match/j1/2026/102502/lineup/" },
  { label: "Jリーグ公式 神戸対名古屋", url: "https://www.jleague.jp/match/j1/2026/103113/lineup/" },
  { label: "Jリーグ公式 名古屋対京都", url: "https://www.jleague.jp/match/j1/2026/110708/lineup/" },
  { label: "Jリーグ公式 11月16日の出場停止公示", url: "https://www.jleague.jp/news/article/35370/" },
  { label: "Football LAB 東京Vの対戦データ", url: "https://www.football-lab.jp/tk-v/preview" },
  { label: "Football LAB 名古屋の対戦データ", url: "https://www.football-lab.jp/nago/preview" },
  { label: "東京V公式 相馬監督就任会見", url: "https://www.verdy.co.jp/news/15291" },
  { label: "東京V公式 宮原・森田・寺沼の負傷", url: "https://www.verdy.co.jp/news/15208" },
  { label: "東京V公式 山見・吉田の負傷", url: "https://www.verdy.co.jp/news/14892" },
  { label: "名古屋公式 浅野の負傷", url: "https://nagoya-grampus.jp/news/pressrelease/2026/0917post-2830.php" },
  { label: "名古屋公式 マルクス ヴィニシウスのリハビリ帰国", url: "https://nagoya-grampus.jp/news/pressrelease/2026/0908post-2823.php" },
  { label: "名古屋公式 ピサノの代表招集", url: "https://nagoya-grampus.jp/news/pressrelease/2026/1106-u-21-11818.php" },
];

export function shouldShowNagoyaPreview(fixture: Pick<CommonFixture, "id" | "status"> | undefined) {
  return fixture?.id === "sched-nagoya"
    && (fixture.status === "scheduled" || fixture.status === "live" || fixture.status === "half_time");
}
