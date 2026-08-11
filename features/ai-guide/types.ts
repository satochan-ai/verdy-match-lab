export interface ReportSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface AnalysisReport {
  sections: ReportSection[];
  /** データ不足など、正常系の補足注記。エラーではない。 */
  note?: string;
}

export type PresetQuestionKey = "highlight" | "keyPlayers" | "caution";

export type AiPanelState = "idle" | "loading" | "ready" | "error";
