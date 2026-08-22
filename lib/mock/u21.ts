import type { MatchStatus } from "@/types/domain";

/**
 * 東京ヴェルディU-21（U-21 Jリーグ）専用の軽量データ。
 * トップチーム用のMatch型・matches.tsとは意図的に分離する
 * （U-21はpredicted XI・戦術分析等を一切持たず、公式記録のみを扱う方針のため）。
 * matchIdはトップチームのmatch-0〜match-7と衝突しない専用の命名を用いる。
 * 出典：https://www.jleague.jp/special/u-21/ 、 https://www.jleague.jp/u-21/ 他（Phase 6-I調査）。
 */
export const u21Match = {
  id: "u21-match-1",
  status: "scheduled" as MatchStatus,
  competition: "2026／27Ｕ-21Ｊリーグ 東西リーグラウンド 第1節",
  /**
   * 雷雨の影響により、東京ヴェルディ公式発表でキックオフが19:00へ変更された
   * （当初18:00）。19:03と表記するJリーグ公式アプリ画面も確認されたが、
   * 今回は東京ヴェルディ公式の開催案内（19:00キックオフ）を採用する。
   */
  kickoffAt: "2026-08-22T19:00:00+09:00",
  kickoffLabel: "19:00",
  scheduleNote: "雷雨の影響により、キックオフ時刻が19:00に変更されました。",
  venue: "味の素フィールド西が丘",
  homeTeamName: "東京ヴェルディU-21",
  awayTeamName: "FC東京U-21",
};

/**
 * position別の選手グループ。"背番号 選手名" 形式の文字列で保持する
 * （トップチームのOfficialLineups.tsxと同じ記法だが、依存関係は持たない
 * 独立したデータ）。
 */
type U21PositionGroups = {
  GK: string[];
  DF: string[];
  MF: string[];
  FW: string[];
};

export type U21OfficialLineup = {
  starters: U21PositionGroups;
  bench: U21PositionGroups;
};

/**
 * 公式発表済みのStarting XI・控え（Phase 6-I.3確認）。
 * formationは公式画面から確認できないため登録しない（推測禁止）。
 */
export const u21HomeOfficialLineup: U21OfficialLineup = {
  starters: {
    GK: ["41 中村 圭佑"],
    DF: ["86 カマラ シェック セザール", "85 渡邊 春來", "79 佐古 真礼"],
    MF: ["88 木下 晴天", "87 下吉 洸平", "42 今井 健人", "92 原田 爽潤"],
    FW: ["24 仲山 獅恩", "51 大藤 颯太", "30 川村 楽人"],
  },
  bench: {
    GK: ["91 名和 優太朗"],
    DF: ["96 渡部 直宏"],
    MF: ["90 川本 悠祐", "93 若月 蓮"],
    FW: ["98 沼田 晃人"],
  },
};

export const u21AwayOfficialLineup: U21OfficialLineup = {
  starters: {
    GK: ["58 後藤 亘"],
    DF: ["69 田中 遥大", "72 松野 泰知", "44 鈴木 楓", "61 橋本 凛来", "20 永野 修都"],
    MF: ["65 梶山 達翔", "21 菅原 悠太", "62 友松 祐貴", "38 田中 希和"],
    FW: ["25 小湊 絆"],
  },
  bench: {
    GK: ["37 渡邊 麻舟"],
    DF: ["55 石村 琢人", "70 相馬 陸人"],
    MF: ["60 中野 寛基", "64 オノノジュ 類主", "67 冨田 真隆"],
    FW: ["63 樋口 佳"],
  },
};
