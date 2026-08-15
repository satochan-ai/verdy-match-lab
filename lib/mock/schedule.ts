import type { ScheduleMatch } from "@/types/domain";

/**
 * MATCH SCHEDULE用の軽量fixtureデータ。東京ヴェルディトップチームの公式戦のみを対象とする
 * （lib/mock/matches.tsのisDemoな検証用試合はここに一切含めない＝設計上のdemo隔離）。
 * 情報は東京ヴェルディ公式サイト（https://www.verdy.co.jp/match/）で確認できた範囲のみを登録し、
 * 節数・ラウンドが未確認の試合はroundを設定しない。
 */
export const scheduleMatches: ScheduleMatch[] = [
  {
    id: "sched-match-1",
    competition: "j1",
    round: "第2節",
    kickoffAt: "2026-08-14T19:00:00+09:00",
    venue: "ＭＵＦＧスタジアム（国立競技場）",
    isVerdyHome: true,
    opponentName: "柏",
    status: "finished",
    homeScore: 1,
    awayScore: 3,
    detailMatchId: "match-1",
  },
  {
    id: "sched-match-0",
    competition: "j1",
    round: "第1節",
    kickoffAt: "2026-08-09T18:00:00+09:00",
    venue: "味の素スタジアム",
    isVerdyHome: true,
    opponentName: "川崎",
    status: "finished",
    homeScore: 1,
    awayScore: 1,
    detailMatchId: "match-0",
  },
  {
    id: "sched-match-7",
    competition: "j1",
    kickoffAt: "2026-08-22T18:30:00+09:00",
    venue: "ＪＦＥ晴れの国スタジアム",
    isVerdyHome: false,
    opponentName: "岡山",
    status: "scheduled",
    detailMatchId: "match-7",
  },
  {
    id: "sched-emperor-cup-2",
    competition: "emperor_cup",
    kickoffAt: "2026-08-26T18:30:00+09:00",
    venue: "味の素フィールド西が丘",
    isVerdyHome: true,
    opponentName: "対戦相手未定",
    opponentTbd: true,
    status: "scheduled",
  },
  {
    id: "sched-kashima",
    competition: "j1",
    kickoffAt: "2026-08-29T19:00:00+09:00",
    venue: "味の素スタジアム",
    isVerdyHome: true,
    opponentName: "鹿島",
    status: "scheduled",
  },
  {
    id: "sched-kobe",
    competition: "j1",
    kickoffAt: "2026-09-02T19:00:00+09:00",
    venue: "味の素スタジアム",
    isVerdyHome: true,
    opponentName: "神戸",
    status: "scheduled",
  },
  {
    id: "sched-levain-1st",
    competition: "levain_cup",
    round: "1stラウンド",
    kickoffAt: "2026-09-09T18:30:00+09:00",
    venue: "平和堂ＨＡＴＯスタジアム",
    isVerdyHome: false,
    opponentName: "レイラック滋賀",
    status: "scheduled",
  },
];

export function getPreviousMatches(limit = 5): ScheduleMatch[] {
  return scheduleMatches
    .filter((m) => m.status === "finished")
    .sort((a, b) => new Date(b.kickoffAt).getTime() - new Date(a.kickoffAt).getTime())
    .slice(0, limit);
}

export function getUpcomingMatches(limit = 5): ScheduleMatch[] {
  return scheduleMatches
    .filter((m) => m.status !== "finished")
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime())
    .slice(0, limit);
}
