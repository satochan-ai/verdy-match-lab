/** 広島戦専用の試合前コンテンツ（MATCH PREVIEW・軍師の三策・予想スタメン）の対象試合ID。 */
export const HIROSHIMA_PRE_CONTENT_FIXTURE_ID = "sched-hiroshima";

/**
 * 次戦エリアに広島戦専用コンテンツを出してよいか。
 * 表示中のNEXT/LIVE fixtureが広島戦のときだけtrue。NEXTが他試合・未設定ならfalse。
 * コンテンツ自体は削除せず、表示制御のみを行う。
 */
export function shouldShowHiroshimaPreContent(displayFixture: { id: string } | null | undefined): boolean {
  return displayFixture?.id === HIROSHIMA_PRE_CONTENT_FIXTURE_ID;
}
