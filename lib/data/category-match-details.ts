import { belezaMatch, belezaMatch1, belezaMatch2, belezaMatch3, belezaMatch4, belezaMatch5, belezaElfenMatch, belezaUrawaCupMatch, belezaReginaMatch } from "../mock/beleza.ts";
import { u21Match, u21Match1, u21ShimizuMatch, u21KawasakiMatch } from "../mock/u21.ts";
import { u21IwataMatch } from "../mock/u21-iwata-result.ts";

// 詳細ルートが描画できる登録データを正本とし、一覧の任意IDは受け付けない。
const details = {
  beleza: [belezaMatch, belezaMatch1, belezaMatch2, belezaMatch3, belezaMatch4, belezaMatch5, belezaElfenMatch, belezaUrawaCupMatch, belezaReginaMatch],
  u21: [u21Match, u21Match1, u21ShimizuMatch, u21KawasakiMatch, u21IwataMatch],
};

export function getCategoryDetailHref(category: keyof typeof details, id: string | undefined): string | undefined {
  return id && details[category].some((match) => match?.id === id)
    ? `/${category}/matches/${encodeURIComponent(id)}` : undefined;
}
