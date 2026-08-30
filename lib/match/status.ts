import type { MatchStatus } from "@/types/domain";

/**
 * 表示上のLIVE状態の上限時間（kickoffAtからの経過時間）。
 * 通常90分＋ハーフタイム＋アディショナルタイム＋延長戦＋PK戦＋中断を見込んでも
 * 十分に余裕がある値として3時間を採用する。
 */
const LIVE_WINDOW_MS = 3 * 60 * 60 * 1000;

/**
 * 表示用のstatusを解決する。元データのstatusが"scheduled"かつkickoffAtを過ぎていれば
 * "live"として扱う（キックオフ後の自動リロードでLIVE画面へ入れるようにするため）。
 * さらにkickoffAt + LIVE_WINDOW_MS を過ぎた場合は表示上"finished"へ切り替える
 * （元データのfinished更新を忘れてもLIVE表示が無期限に残らないようにするための安全策）。
 *
 * 注意：この時間上限は表示事故の防止策であって、正式な試合終了処理の代替ではない。
 * 実際の試合終了後は従来どおり、元データへ status: "finished"・score・goals・stats等を
 * 登録する必要がある（自動でのfinished表示 ≠ POST MATCHデータの完成）。
 *
 * live/half_time/finishedなど明示statusはそのまま優先する（元データを尊重）。
 */
export function resolveMatchStatus(
  match: { status: MatchStatus; kickoffAt: string },
  now: Date,
): MatchStatus {
  if (match.status !== "scheduled") {
    return match.status;
  }

  // kickoffAtはISO8601＋タイムゾーンオフセット（例："2026-09-02T19:00:00+09:00"）で
  // 保持されており、Date化すると絶対時刻になるため、JSTを二重加算せずそのまま差分を取る。
  const elapsedMs = now.getTime() - new Date(match.kickoffAt).getTime();

  if (elapsedMs < 0) {
    return "scheduled";
  }
  if (elapsedMs >= LIVE_WINDOW_MS) {
    return "finished";
  }
  return "live";
}
