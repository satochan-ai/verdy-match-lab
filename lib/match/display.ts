import type { MatchStatus } from "@/types/domain";
import { resolveMatchStatus } from "@/lib/match/status";

function jstDateKey(d: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/**
 * JSTの暦日ベースでの日数差分。時刻差ではなく、試合日と今日の「calendar day」差分を返す。
 * 例：現在 8/14 11:10 JST・キックオフ 8/14 19:00 JSTなら、時刻差(約8時間)ではなく0を返す。
 */
export function daysUntilJST(kickoffIso: string, now: Date) {
  const [ky, km, kd] = jstDateKey(new Date(kickoffIso)).split("-").map(Number);
  const [ny, nm, nd] = jstDateKey(now).split("-").map(Number);
  const kickoffUTCMidnight = Date.UTC(ky, km - 1, kd);
  const nowUTCMidnight = Date.UTC(ny, nm - 1, nd);
  return Math.round((kickoffUTCMidnight - nowUTCMidnight) / (1000 * 60 * 60 * 24));
}

export type MatchDayLabel =
  | { kind: "days"; days: number }
  | { kind: "today" }
  | { kind: "live" }
  | { kind: "hidden" };

/**
 * Top / 試合詳細で共通のmatchdayカウントダウン表示。resolveMatchStatusの結果に基づき、
 * scheduled当日は"today"、live(自動遷移含む)は"live"、それ以外(finished等)は"hidden"を返す。
 * TopとScoreboard側で別々の残日数ロジックを持たせないための共通helper。
 */
export function getMatchDayLabel(
  match: { status: MatchStatus; kickoffAt: string },
  now: Date,
): MatchDayLabel {
  const displayStatus = resolveMatchStatus(match, now);

  if (displayStatus === "scheduled") {
    const days = daysUntilJST(match.kickoffAt, now);
    return days > 0 ? { kind: "days", days } : { kind: "today" };
  }

  if (displayStatus === "live") {
    return { kind: "live" };
  }

  return { kind: "hidden" };
}

/**
 * 大会の正式名称は一覧・カード内では長すぎるため、表示時のみ短縮名へ置き換える。
 * データ本体（fixtureMeta.competition）は正式名称のまま保持し、ここでは表示だけを変える。
 * 未登録の大会名はそのまま返すため、短縮を追加しない限り既存表示は一切変わらない。
 */
const COMPETITION_SHORT_NAMES: Record<string, string> = {
  "天皇杯 JFA 第106回全日本サッカー選手権大会": "天皇杯",
};

export function shortenCompetition(competition: string): string {
  return COMPETITION_SHORT_NAMES[competition] ?? competition;
}
