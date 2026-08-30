import type { FixtureMeta, MatchStatus } from "@/types/domain";
import { resolveMatchStatus } from "@/lib/match/status";

/**
 * 総合TOP（`/`）のカテゴリーカード（TOP TEAM / U-21 / BELEZA）の状態判定を
 * 1か所へ集約するためのhelper。
 *
 * 3カテゴリーはデータ構造が異なる（TOP TEAMはMatch型、U-21 / BELEZAは軽量スナップショット）
 * ため、Match型へは統一しない。呼び出し側で各カテゴリーのデータを下記の共通ビューへ
 * 変換してから渡し、優先順位判定とresultLine生成だけをここで共通化する。
 *
 * 優先順位（3カテゴリー共通）:
 *   1. LIVE        … 対象試合が resolveMatchStatus() で "live"
 *   2. NEXT MATCH  … LIVEでなく、次戦が存在
 *   3. LAST RESULT … LIVEでなく、次戦もないが、直近のfinished結果が存在
 *   4. EMPTY       … いずれも無い（"次戦情報準備中" を表示。過去試合をNEXT扱いしない）
 *
 * 「試合終了後の一定時間だけLAST RESULTを優先表示する」ような時間依存の分岐は入れない。
 */

/** LIVE判定に使う対象試合の生statusとkickoffAt。 */
export interface CategoryFocusMatch {
  status: MatchStatus;
  kickoffAt: string;
}

/** 次戦の表示情報（カテゴリー共通ビュー）。 */
export interface CategoryNextFixture {
  opponentName: string;
  dateLabel?: string;
  kickoffLabel?: string;
  homeAway?: "HOME" | "AWAY";
  fixtureMeta?: FixtureMeta;
}

/**
 * 直近のfinished結果（カテゴリー共通ビュー）。
 * homeTeamName / awayTeamName は実際のHOME / AWAYの並び順で渡すこと
 * （resultLineの左右をここで入れ替えない）。
 */
export interface CategoryLastResult {
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
}

export interface CategoryCardStateInput {
  now: Date;
  /** 対象試合（LIVE判定用）。無ければundefined。 */
  focus?: CategoryFocusMatch;
  /** 次戦。無ければundefined。 */
  nextFixture?: CategoryNextFixture;
  /** 直近finished結果。無ければundefined。 */
  lastResult?: CategoryLastResult;
}

/** CategoryHomeCardへそのまま渡せるprop部分集合。 */
export interface CategoryCardProps {
  statusLabel: "LIVE" | "NEXT MATCH" | "LAST RESULT";
  statusTone: "live" | "next" | "finished";
  opponentName?: string;
  dateLabel?: string;
  kickoffLabel?: string;
  homeAway?: "HOME" | "AWAY";
  fixtureMeta?: FixtureMeta;
  resultLine?: string;
}

export interface CategoryCardState {
  kind: "live" | "next" | "finished" | "empty";
  card: CategoryCardProps;
}

function nextFixtureCard(
  fixture: CategoryNextFixture,
  statusLabel: "LIVE" | "NEXT MATCH",
  statusTone: "live" | "next",
): CategoryCardProps {
  return {
    statusLabel,
    statusTone,
    opponentName: fixture.opponentName,
    dateLabel: fixture.dateLabel,
    kickoffLabel: fixture.kickoffLabel,
    homeAway: fixture.homeAway,
    fixtureMeta: fixture.fixtureMeta,
  };
}

/**
 * カテゴリーカードの状態を LIVE → NEXT MATCH → LAST RESULT → EMPTY の順で判定する。
 */
export function resolveCategoryCardState(input: CategoryCardStateInput): CategoryCardState {
  const { now, focus, nextFixture, lastResult } = input;

  // 1. LIVE：対象試合がliveのとき。表示する対戦カード情報は次戦ビューを流用する
  //    （TOP TEAMでは対象試合＝次戦。U-21 / BELEZAでも既存挙動を踏襲する）。
  if (focus && resolveMatchStatus(focus, now) === "live") {
    return {
      kind: "live",
      card: nextFixture
        ? nextFixtureCard(nextFixture, "LIVE", "live")
        : { statusLabel: "LIVE", statusTone: "live" },
    };
  }

  // 2. NEXT MATCH
  if (nextFixture) {
    return { kind: "next", card: nextFixtureCard(nextFixture, "NEXT MATCH", "next") };
  }

  // 3. LAST RESULT
  if (lastResult) {
    return {
      kind: "finished",
      card: {
        statusLabel: "LAST RESULT",
        statusTone: "finished",
        resultLine: `${lastResult.homeTeamName} ${lastResult.homeScore}-${lastResult.awayScore} ${lastResult.awayTeamName}`,
      },
    };
  }

  // 4. EMPTY：過去試合をNEXT MATCHとして出さず、空状態を表示する。
  return {
    kind: "empty",
    card: { statusLabel: "NEXT MATCH", statusTone: "next", opponentName: "次戦情報準備中" },
  };
}
