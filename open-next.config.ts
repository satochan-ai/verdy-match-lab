import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// ISR / revalidate を使っていないため、build時にprerenderした結果を
// Workers static assetsから読み取り専用で返すcacheを使う（R2/KVは不要）。
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
