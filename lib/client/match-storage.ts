/**
 * LIVE Score / HALF TIMEメモの端末内一時保存（localStorageのみ）。
 * Client Componentからのみ呼び出すこと。SSR中にimportされても
 * window未定義時は即座にno-opで返る。
 */
const STORAGE_PREFIX = "verdy-match-lab:v1:match:";

function isBrowser() {
  return typeof window !== "undefined";
}

function liveScoreKey(matchId: string) {
  return `${STORAGE_PREFIX}${matchId}:live-score`;
}

function halfTimeNoteKey(matchId: string) {
  return `${STORAGE_PREFIX}${matchId}:halftime-note`;
}

function isValidScoreValue(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    Number.isInteger(value) &&
    value >= 0
  );
}

export function readLiveScore(
  matchId: string,
): { homeScore: number; awayScore: number } | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(liveScoreKey(matchId));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      isValidScoreValue((parsed as Record<string, unknown>).homeScore) &&
      isValidScoreValue((parsed as Record<string, unknown>).awayScore)
    ) {
      const { homeScore, awayScore } = parsed as { homeScore: number; awayScore: number };
      return { homeScore, awayScore };
    }
    return null;
  } catch {
    return null;
  }
}

export function writeLiveScore(matchId: string, homeScore: number, awayScore: number) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(liveScoreKey(matchId), JSON.stringify({ homeScore, awayScore }));
  } catch {
    // private modeなどでstorageが使用不可でも、画面操作自体は継続できるよう静かに無視する。
  }
}

export function readHalfTimeNote(matchId: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(halfTimeNoteKey(matchId));
  } catch {
    return null;
  }
}

export function writeHalfTimeNote(matchId: string, note: string) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(halfTimeNoteKey(matchId), note);
  } catch {
    // 同上。
  }
}
