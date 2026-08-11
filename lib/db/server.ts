import { neon } from "@neondatabase/serverless";

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Neonへの接続はServer Component / server-side処理からのみ使用する。
 * ブラウザ側から直接呼び出さないこと（DATABASE_URLはNEXT_PUBLIC_を付けず非公開のまま扱う）。
 */
export function sql() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Call isDbConfigured() before sql()."
    );
  }

  return neon(url);
}
