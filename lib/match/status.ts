import type { MatchStatus } from "@/types/domain";

/**
 * 表示用のstatusを解決する。元データのstatusが"scheduled"かつkickoffAtを過ぎていれば
 * "live"として扱う（キックオフ後の自動リロードでLIVE画面へ入れるようにするため）。
 *
 * 重要：時間経過だけを理由に"finished"へ自動遷移することは絶対にしない。
 * 試合は90分＋ハーフタイム＋アディショナルタイム＋延長戦＋PK戦＋中断・遅延等があり、
 * kickoffAtからの経過時間だけでは試合終了を判定できない。実際の試合終了は必ず
 * 元データへ明示的に status: "finished"（および score・goals・stats等）を登録した
 * 場合のみ成立する。公式結果が未登録の間は、kickoffAtをどれだけ過ぎていても
 * "live"のまま留まる（無期限にLIVE表示が残ることは許容する）。
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
  return "live";
}
