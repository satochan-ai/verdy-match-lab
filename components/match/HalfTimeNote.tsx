"use client";

import { useEffect, useId, useState } from "react";
import { readHalfTimeNote, writeHalfTimeNote } from "@/lib/client/match-storage";

/**
 * 前半終了時点でのユーザー自身の気づきメモ。試合ごとにlocalStorageへ保存し、
 * reload後も端末内で復元する（今回はPOSTへの引き継ぎは実装しない）。
 */
export function HalfTimeNote({ matchId }: { matchId: string }) {
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
        HALF TIME NOTE
      </p>
      <label htmlFor={textareaId} className="mt-0.5 block text-[13px] font-bold text-text-primary">
        前半メモ
      </label>
      <p className="mt-1 text-[12px] text-text-secondary">
        三策を振り返りながら、後半に見たいポイントを残せます。
      </p>
      <textarea
        id={textareaId}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="前半で気になった点、後半に見たいポイントをメモ"
        rows={4}
        className="mt-3 min-h-[100px] w-full max-w-[520px] resize-y border border-border bg-background px-3 py-2 text-[13px] text-text-primary focus:border-primary-green focus:outline-none"
      />
    </section>
  );
}
