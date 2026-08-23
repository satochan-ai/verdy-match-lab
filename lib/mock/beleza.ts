import type { KeyPlayer, PredictedLineup, Team } from "@/types/domain";

/**
 * 日テレ・東京ヴェルディベレーザ（WEリーグ）専用の軽量PREデータ。
 * トップチーム用のMatch型・matches.tsとは意図的に分離する
 * （ベレーザは今回、軍師の三策・LIVE・POST等のフル機能を持たないため、
 * トップチームのデータ構造に無理に載せない）。
 * 出典：https://www.verdy.co.jp/beleza/match/ 、 https://www.verdy.co.jp/beleza/team/ 他（Phase 6-H調査）。
 */

export const belezaTeam: Team = {
  id: "beleza",
  name: "日テレ・東京ヴェルディベレーザ",
  isVerdy: true,
};

export const jefChibaLadiesTeam: Team = {
  id: "jef-chiba-ladies",
  name: "ジェフユナイテッド市原・千葉レディース",
  isVerdy: false,
};

export const belezaMatch = {
  competition: "2026／27 WEリーグ 第1節",
  dateLabel: "08.23 SUN",
  kickoffLabel: "18:00",
  venue: "味の素フィールド西が丘",
};

/**
 * PREDICTED（公式未発表）。登録選手・これまでの起用傾向を基にした予想。
 * formationは直近公式戦の詳細が確認できなかったため、一般的傾向からの推測値。
 * DF/MF行の並びは「右から」のユーザー指定を左→右の配列順へ変換済み
 * （PredictedFormationは配列順=画面左→右で描画するため）。
 */
export const belezaPredictedLineup: PredictedLineup = {
  formation: "4-2-3-1",
  starters: [
    { number: 1, name: "野田 にな", position: "GK" },
    { number: 5, name: "松田 紫野", position: "DF" },
    { number: 3, name: "村松 智子", position: "DF" },
    { number: 2, name: "青木 夕菜", position: "DF" },
    { number: 4, name: "土光 真代", position: "DF", alternative: "井手 ひなた" },
    { number: 14, name: "眞城 美春", position: "MF" },
    { number: 6, name: "隅田 凜", position: "MF" },
    { number: 20, name: "小林 里歌子", position: "MF" },
    { number: 19, name: "塩越 柚歩", position: "MF" },
    { number: 18, name: "松永 未夢", position: "MF" },
    { number: 11, name: "樋渡 百花", position: "FW" },
  ],
};

export const belezaKeyPlayers: KeyPlayer[] = [
  { name: "6 隅田 凜", note: "MF／中盤の基準点。ボール回収、配球、攻守の切り替えに注目。" },
  { name: "14 眞城 美春", note: "MF／ダブルボランチ。前進への関与、隅田との距離感、攻撃参加に注目。" },
  { name: "19 塩越 柚歩", note: "AM／2列目中央。ライン間での受け方、ラストパス、ゴール前への関与に注目。" },
  { name: "11 樋渡 百花", note: "FW／1トップ。前線での起点、裏への動き、フィニッシュに注目。" },
];

/**
 * 開幕戦の欠場予定選手（公式確認済み）。理由・復帰時期は未確定のため推測で追加しない。
 * 出典：東京ヴェルディ公式「日テレ・東京ヴェルディベレーザ 選手・スタッフ」https://www.verdy.co.jp/beleza/content/team/
 */
export const belezaUnavailablePlayers: string[] = ["10 MF 菅野 奏音", "16 DF 本多 桃華"];

/** U-20日本女子代表選出（公式確認済み）。開幕戦後に代表活動へ合流予定。欠場・出場不透明とは書かない。 */
export const belezaU20Note =
  "青木夕菜・朝生珠実・眞城美春・松永未夢は、開幕戦後にU-20日本女子代表活動へ参加予定。";

export const belezaPreNote =
  "日テレ・東京ヴェルディベレーザは8/23、WEリーグ開幕戦でジェフ千葉レディースと対戦。予想スタメンは登録選手や直近の起用実績、開幕戦に向けた選手構成を基に作成。4-2-3-1を予想し、中盤の隅田凜・眞城美春、2列目の塩越柚歩、1トップの樋渡百花を中心に注目する。";

/** ジェフ千葉L簡易情報。過剰分析はしない（最大3点）。 */
export const jefChibaLadiesNotes = [
  "元ベレーザGKの清水美紅が今季加入。",
  "開幕戦のため新体制の配置・起用はまだ読みづらい。",
  "ベレーザ側はまず自分たちの立ち位置・選手構成を見る試合。",
];
