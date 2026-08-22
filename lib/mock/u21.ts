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
  kickoffAt: "2026-08-22T18:00:00+09:00",
  kickoffLabel: "18:00",
  venue: "味の素フィールド西が丘",
  homeTeamName: "東京ヴェルディU-21",
  awayTeamName: "FC東京U-21",
};
