import type { ReactNode } from "react";
import { ScrollNav } from "@/components/ScrollNav";
import { Decor } from "@/components/SplitShell";

/**
 * An all-white page (the Works and Games lists). The white panel that sweeps across
 * the screen on the way in simply becomes this page, and opening an item splits it again.
 */
export function WhitePage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="white-page relative min-h-dvh bg-white">
      <Decor onWhite />
      <ScrollNav title={title} backHref="/" />
      <div className="px-8 py-10 sm:px-14 lg:py-12 lg:pr-28 lg:pl-20">{children}</div>
    </div>
  );
}
