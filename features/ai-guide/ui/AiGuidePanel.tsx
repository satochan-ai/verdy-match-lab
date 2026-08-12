"use client";

import { useState } from "react";
import type { Match } from "@/types/domain";
import type { AiPanelState, PresetQuestionKey } from "@/features/ai-guide/types";
import { getPreMatchAnalysis } from "@/features/ai-guide/mockResponses";
import { AnalysisReportView } from "@/features/ai-guide/ui/AnalysisReportView";

const presets: { key: PresetQuestionKey; label: string }[] = [
  { key: "highlight", label: "今日の見どころは？" },
  { key: "keyPlayers", label: "キーマンは？" },
  { key: "caution", label: "相手の注意点は？" },
];

export function AiGuidePanel({ match }: { match: Match }) {
  const [activeKey, setActiveKey] = useState<PresetQuestionKey | null>(null);
  const [state, setState] = useState<AiPanelState>("idle");
  const [freeOpen, setFreeOpen] = useState(false);
  const [freeText, setFreeText] = useState("");
  const [freeSubmitted, setFreeSubmitted] = useState(false);

  const report = activeKey ? getPreMatchAnalysis(match, activeKey) : undefined;

  function handleSelect(key: PresetQuestionKey) {
    setActiveKey(key);
    setState("loading");
    window.setTimeout(() => setState("ready"), 500);
  }

  return (
    <section className="border border-border bg-surface p-4">
      <h2 className="text-[15px] font-bold text-text-primary">戦術軍師 β</h2>
      <p className="mt-0.5 text-[12px] text-text-secondary">
        今日の試合を軍師が分析します
      </p>

      <div className="mt-4 border-t border-border">
        <p className="pt-3 text-[11px] font-bold tracking-[0.08em] text-text-secondary">
          TACTICAL QUESTIONS
        </p>
        <ul className="divide-y divide-border">
          {presets.map((p, index) => (
            <li key={p.key}>
              <button
                type="button"
                onClick={() => handleSelect(p.key)}
                aria-pressed={activeKey === p.key}
                className={`flex w-full items-center gap-3 py-2.5 text-left ${
                  activeKey === p.key ? "text-primary-green" : "text-text-primary"
                }`}
              >
                <span className="tabular-nums text-[12px] font-bold text-text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-[13px] font-bold">{p.label}</span>
                <span aria-hidden="true" className="text-[13px] text-text-secondary">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnalysisReportView state={state} report={report} />

      <div className="mt-4 border-t border-border pt-3">
        {!freeOpen ? (
          <button
            type="button"
            onClick={() => setFreeOpen(true)}
            className="text-[13px] font-bold text-deep-green"
          >
            もっと軍師に聞く
          </button>
        ) : (
          <div>
            <label
              htmlFor="free-question"
              className="text-[11px] font-bold tracking-[0.08em] text-text-secondary"
            >
              分析テーマ（任意）
            </label>
            <div className="mt-2 flex items-end gap-3">
              <input
                id="free-question"
                type="text"
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="例：ベンチメンバーの見どころは？"
                className="h-9 flex-1 border-0 border-b border-border bg-transparent px-0 text-[13px] text-text-primary focus:border-primary-green focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setFreeSubmitted(true)}
                className="shrink-0 border-b border-primary-green pb-0.5 text-[13px] font-bold text-primary-green"
              >
                送信
              </button>
            </div>
            {freeSubmitted && (
              <p className="mt-2 text-[12px] text-text-secondary">
                β版のため現在、外部AI接続はありません。
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
