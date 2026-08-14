"use client";

import { useId, useState } from "react";

/**
 * 前半終了時点でのユーザー自身の気づきメモ。local stateのみで、
 * ページreloadで消えてよい（今回は永続保存・POSTへの引き継ぎは実装しない）。
 */
export function HalfTimeNote() {
  const textareaId = useId();
  const [note, setNote] = useState("");

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
