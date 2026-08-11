import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-[15px] font-bold text-text-primary">Verdy Match Lab</p>
      <h1 className="text-[20px] font-bold text-text-primary">試合が見つかりません</h1>
      <p className="text-[13px] text-text-secondary">
        指定されたページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="mt-2 flex h-12 items-center justify-center rounded-md bg-primary-green px-6 text-[15px] font-bold text-white"
      >
        トップへ戻る
      </Link>
    </div>
  );
}
