import type { ReactNode } from "react";

/**
 * ページ全体で共有する横幅コンテナ。Header/main/Footerに重複していた
 * max-w-[480px] md:max-w-5xl を統合し、Wide(1280px)まで一段で拡張する。
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-6 xl:px-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
