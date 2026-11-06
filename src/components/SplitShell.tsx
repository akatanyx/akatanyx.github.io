import type { ReactNode } from "react";
import { site } from "@/lib/site";

type Props = {
  left: ReactNode;
  children: ReactNode;
  /** Tailwind width for the white panel on desktop, e.g. "lg:w-[38%]". */
  leftWidth?: string;
  tone?: "panel" | "deep";
  /** Let the white panel scroll on its own (turn off when something overhangs it). */
  scrollLeft?: boolean;
  /** Let the dark panel scroll on its own. Off = the page fits the screen on desktop. */
  scrollRight?: boolean;
  /** Fit the screen on phones too (no page scroll), e.g. the home page. */
  fitMobile?: boolean;
  /** Leave the dark panel out on phones, showing only the white one. */
  hideRightOnMobile?: boolean;
  /** Keep the white panel pinned to the top on phones while the page scrolls (for a slim bar). */
  stickyMobile?: boolean;
};

/** White panel on the left, dark panel on the right: the layout every page shares. */
export function SplitShell({
  left,
  children,
  leftWidth = "lg:w-[30%]",
  tone = "panel",
  scrollLeft = true,
  scrollRight = true,
  fitMobile = false,
  hideRightOnMobile = false,
  stickyMobile = false,
}: Props) {
  return (
    <div
      // overflow-x-clip: nothing wider than a phone can push the page sideways.
      className={`flex flex-col overflow-x-clip lg:h-dvh lg:flex-row lg:overflow-hidden ${
        fitMobile ? "h-dvh overflow-hidden" : "min-h-dvh"
      }`}
    >
      <aside
        className={`relative z-10 shrink-0 bg-white lg:h-full ${stickyMobile ? "max-lg:sticky max-lg:top-0 max-lg:shadow-[0_1px_0_rgba(0,0,0,0.08)]" : ""} ${leftWidth} ${
          scrollLeft ? "lg:overflow-y-auto no-scrollbar" : ""
        }`}
      >
        {left}
      </aside>
      <main
        className={`relative isolate min-w-0 flex-1 text-white lg:h-full ${hideRightOnMobile ? "max-lg:hidden" : ""} ${
          tone === "deep" ? "bg-panel-deep" : "bg-panel"
        }`}
      >
        <Decor />
        <div className={`h-full ${scrollRight ? "lg:overflow-y-auto no-scrollbar" : "lg:overflow-hidden"}`}>{children}</div>
      </main>
    </div>
  );
}

/** The corner squares and vertical code tag. `onWhite` flips them to dark for all-white pages. */
export function Decor({ onWhite = false }: { onWhite?: boolean }) {
  const square = `h-2 w-2 ${onWhite ? "bg-neutral-800" : "bg-neutral-200"}`;
  return (
    <div aria-hidden className={`pointer-events-none z-20 ${onWhite ? "fixed inset-0 text-black" : "absolute inset-0"}`}>
      <div className="absolute top-8 right-8 hidden grid-cols-2 gap-2.5 lg:grid">
        <span className={square} />
        <span className={square} />
        <span />
        <span className={square} />
      </div>
      <p className="absolute top-1/2 right-7 hidden -translate-y-1/2 text-[11px] tracking-[0.5em] whitespace-nowrap [writing-mode:vertical-rl] lg:block">
        {site.code}
      </p>
      <div className="absolute right-8 bottom-8 hidden gap-2.5 lg:flex">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={square} />
        ))}
      </div>
    </div>
  );
}