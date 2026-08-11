"use client";

import { useState } from "react";
import type { Match } from "@/types/domain";
import type { AiPanelState, PresetQuestionKey } from "@/features/ai-guide/types";
import { getPreMatchAnalysis } from "@/features/ai-guide/mockResponses";
import { PresetQuestionButton } from "@/features/ai-guide/ui/PresetQuestionButton";
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

      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((p) => (
          <PresetQuestionButton
            key={p.key}
            label={p.label}
            active={activeKey === p.key}
            onClick={() => handleSelect(p.key)}
          />
        ))}
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
            <label htmlFor="free-question" className="text-[12px] text-text-secondary">
              自由に質問する（任意）
            </label>
            <div className="mt-1 flex gap-2">
              <input
                id="free-question"
                type="text"
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="例：ベンチメンバーの見どころは？"
                className="h-10 flex-1 rounded-md border border-border px-3 text-[13px] text-text-primary"
              />
              <button
                type="button"
                onClick={() => setFreeSubmitted(true)}
                className="h-10 shrink-0 rounded-md bg-primary-green px-4 text-[13px] font-bold text-white"
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
