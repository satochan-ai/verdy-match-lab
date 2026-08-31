import type { Competition, ScheduleMatch, UpcomingFixture } from "@/types/domain";

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
    opponentName: "柏レイソル",
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
    opponentName: "川崎フロンターレ",
    status: "finished",
    homeScore: 1,
    awayScore: 1,
    detailMatchId: "match-0",
  },
  {
    id: "sched-match-7",
    competition: "j1",
    round: "第3節",
    kickoffAt: "2026-08-22T18:30:00+09:00",
    venue: "ＪＦＥ晴れの国スタジアム",
    isVerdyHome: false,
    opponentName: "ファジアーノ岡山",
    status: "finished",
    homeScore: 0,
    awayScore: 0,
    detailMatchId: "match-7",
  },
  {
    id: "sched-emperor-cup-2",
    competition: "emperor_cup",
    round: "2回戦",
    kickoffAt: "2026-08-26T18:30:00+09:00",
    venue: "味の素フィールド西が丘",
    isVerdyHome: true,
    opponentName: "ザスパ群馬",
    status: "finished",
    homeScore: 4,
    awayScore: 1,
    detailMatchId: "match-8",
  },
  {
    id: "sched-kashima",
    competition: "j1",
    // 公式クラブスケジュール（https://www.jleague.jp/club/tokyov/、Phase 6-I.5確認）で
    // "seasonText":"第4節" を確認。
    round: "第4節",
    kickoffAt: "2026-08-29T19:00:00+09:00",
    venue: "味の素スタジアム",
    isVerdyHome: true,
    opponentName: "鹿島アントラーズ",
    status: "finished",
    homeScore: 0,
    awayScore: 2,
    detailMatchId: "match-9",
  },
  {
    id: "sched-kobe",
    competition: "j1",
    // 節数は公式日程（Phase 6-C.6反映）で "第5節" を確認。
    round: "第5節",
    kickoffAt: "2026-09-02T19:00:00+09:00",
    venue: "味の素スタジアム",
    isVerdyHome: true,
    opponentName: "ヴィッセル神戸",
    status: "scheduled",
  },
  {
    id: "sched-cerezo",
    competition: "j1",
    round: "第6節",
    kickoffAt: "2026-09-06T19:00:00+09:00",
    venue: "YANMAR HANASAKA STADIUM",
    isVerdyHome: false,
    opponentName: "セレッソ大阪",
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
  {
    id: "sched-chiba",
    competition: "j1",
    round: "第7節",
    kickoffAt: "2026-09-13T18:00:00+09:00",
    venue: "味の素スタジアム",
    isVerdyHome: true,
    opponentName: "ジェフユナイテッド千葉",
    status: "scheduled",
  },
  {
    id: "sched-urawa",
    competition: "j1",
    round: "第8節",
    kickoffAt: "2026-09-19T18:30:00+09:00",
    venue: "埼玉スタジアム2002",
    isVerdyHome: false,
    opponentName: "浦和レッズ",
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

/**
 * ScheduleMatch["competition"]（内部enum）→ fixtureMeta.competition（表示用正式名称）変換。
 * TOPのMatch.fixtureMeta（lib/mock/matches.ts）で既に使っている表記と揃える
 * （j1/emperor_cupは既存match-7・match-8のfixtureMetaと同一文言）。
 */
const competitionFullName: Record<Competition, string> = {
  j1: "2026 J1リーグ",
  emperor_cup: "天皇杯 JFA 第106回全日本サッカー選手権大会",
  levain_cup: "ルヴァン",
};

function formatFixtureDateLabel(iso: string) {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(d);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  return `${part("month")}.${part("day")} ${part("weekday").toUpperCase()}`;
}

function formatFixtureKickoffLabel(iso: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso));
}

/**
 * TOP TEAMのNEXT 5表示用アダプター。scheduleMatches（source of truth）を
 * BELEZA/U-21と共通のUpcomingFixture形状へ変換するだけで、新しい試合データは作らない。
 */
function toUpcomingFixture(item: ScheduleMatch): UpcomingFixture {
  return {
    id: item.id,
    dateLabel: formatFixtureDateLabel(item.kickoffAt),
    kickoffLabel: formatFixtureKickoffLabel(item.kickoffAt),
    fixtureMeta: {
      competition: competitionFullName[item.competition],
      roundLabel: item.round,
    },
    isHome: item.isVerdyHome,
    opponentName: item.opponentTbd ? "対戦相手未定" : item.opponentName,
    venue: item.venue,
  };
}

export function getUpcomingFixtures(limit = 5): UpcomingFixture[] {
  return getUpcomingMatches(limit).map(toUpcomingFixture);
}
