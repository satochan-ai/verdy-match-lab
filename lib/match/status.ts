import type { MatchStatus } from "@/types/domain";

/**
 * 表示用のstatusを解決する。元データのstatusが"scheduled"かつkickoffAtを過ぎていれば
 * "live"として扱う（キックオフ後の自動リロードでLIVE画面へ入れるようにするため）。
 *
 * 重要：kickoffAtからの経過時間だけを根拠に"finished"へ自動昇格させることはしない。
 * 試合終了は必ず元データのstatus更新（status: "finished"・score・goals・stats等の登録）
 * によってのみ確定させる。経過時間だけで終了扱いにすると、公式結果が未登録のまま
 * スコア未定（null）の試合が「終了済み・DRAW」のように誤表示される事故につながるため、
 * 以前あった「一定時間経過で自動finished化する安全策」は廃止した。
 * 元データがいつまでも"scheduled"のままなら、表示は無期限に"live"のままになるが、
 * これは「finishedを誤って自動生成しない」という原則を優先した意図的な挙動である。
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
