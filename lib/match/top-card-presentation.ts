export const topLiveNotice = "※試合中の表示は予定キックオフ時刻に基づいています。実際の試合状況やスコアをリアルタイム取得しているものではありません。";
export const topDetailPendingNotice = "試合詳細は公式結果の登録後に公開します。";

/** 詳細データの存在を確認できた場合だけ、公開済みのTOP詳細へ案内する。 */
export function getTopDetailHref(detailMatchId: string | undefined, match: { id: string } | undefined): string | undefined {
  return detailMatchId && match?.id === detailMatchId ? `/matches/${encodeURIComponent(detailMatchId)}` : undefined;
}
