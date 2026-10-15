"use client";

import { useState, type ReactNode } from "react";

// hiroshimaは「相手チーム側」のスロット名（既存呼び出し互換のため維持）。相手名・配色は未指定なら広島（紫）。
const opponentButton = {
  purple: { on: "border-purple-700 bg-purple-700 text-white", off: "border-border bg-surface text-purple-900" },
  fctokyo: { on: "border-red-600 bg-blue-800 text-white", off: "border-border bg-surface text-blue-900" },
};

export function TeamPerspective({ label, verdy, hiroshima, opponentLabel = "広島", opponentTone = "purple" }: { label: string; verdy: ReactNode; hiroshima: ReactNode; opponentLabel?: string; opponentTone?: "purple" | "fctokyo" }) {
  const [opponent, setOpponent] = useState(false);
  return (
    <div className="space-y-4">
      <div role="group" aria-label={`${label}のチーム視点切り替え`} className="grid grid-cols-2 gap-2">
        <button type="button" aria-pressed={!opponent} onClick={() => setOpponent(false)} className={`min-h-11 border px-4 py-2 text-[14px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2 ${!opponent ? "border-primary-green bg-primary-green text-white" : "border-border bg-surface text-deep-green"}`}>東京V</button>
        <button type="button" aria-pressed={opponent} onClick={() => setOpponent(true)} className={`min-h-11 border px-4 py-2 text-[14px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2 ${opponent ? opponentButton[opponentTone].on : opponentButton[opponentTone].off}`}>{opponentLabel}</button>
      </div>
      <div hidden={opponent}>{verdy}</div>
      <div hidden={!opponent}>{hiroshima}</div>
    </div>
  );
}
