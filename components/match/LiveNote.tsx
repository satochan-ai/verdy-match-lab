"use client";

import { useEffect, useId, useState } from "react";
import { readHalfTimeNote, writeHalfTimeNote } from "@/lib/client/match-storage";

/**
 * 試合中の気づきメモ（LIVE NOTE）。既存のHALF_TIME Note用storage関数を
 * そのまま再利用し、matchId単位でlocalStorageへ保存・復元する
 * （新しい保存実装は作らない）。
 */
export function LiveNote({ matchId }: { matchId: string }) {
  const textareaId = useId();
  const [note, setNote] = useState("");
  const [isNoteRestored, setIsNoteRestored] = useState(false);

  // setTimeoutで一段遅らせ、effect内での直接setState呼び出しによる
  // cascading render警告（react-hooks/set-state-in-effect）を避ける。
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = readHalfTimeNote(matchId);
      if (typeof saved === "string") {
        setNote(saved);
      }
      setIsNoteRestored(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [matchId]);

  useEffect(() => {
    if (!isNoteRestored) return;
    writeHalfTimeNote(matchId, note);
  }, [isNoteRestored, matchId, note]);

  return (
    <section className="border-y border-border bg-surface p-4">
      <p className="text-[11px] font-bold tracking-[0.15em] text-text-secondary">
        LIVE NOTE
      </p>
      <label htmlFor={textareaId} className="mt-0.5 block text-[13px] font-bold text-text-primary">
        試合メモ
      </label>
      <p className="mt-1 text-[12px] text-text-secondary">
        気になった選手、試合の流れ、攻守の特徴などを残せます。
      </p>
      <textarea
        id={textareaId}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="気になった選手、試合の流れ、攻撃・守備の特徴などをメモ"
        rows={4}
        className="mt-3 min-h-[100px] w-full max-w-[520px] resize-y border border-border bg-background px-3 py-2 text-[13px] text-text-primary focus:border-primary-green focus:outline-none"
      />
    </section>
  );
}
