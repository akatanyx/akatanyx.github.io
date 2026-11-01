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
};

/** White panel on the left, dark panel on the right — the layout every page shares. */
export function SplitShell({
  left,
  children,
  leftWidth = "lg:w-[30%]",
  tone = "panel",
  scrollLeft = true,
}: Props) {
  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh lg:flex-row lg:overflow-hidden">
      <aside
        className={`relative z-10 shrink-0 bg-white lg:h-full ${leftWidth} ${
          scrollLeft ? "lg:overflow-y-auto" : ""
        }`}
      >
        {left}
      </aside>
      <main
        className={`relative flex-1 text-white lg:h-full ${
          tone === "deep" ? "bg-panel-deep" : "bg-panel"
        }`}
      >
        <Decor />
        <div className="h-full lg:overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}

function Decor() {
  const square = "h-2 w-2 bg-neutral-200";
  return (
    <div aria-hidden className="pointer-events-none">
      <div className="absolute top-8 right-8 grid grid-cols-2 gap-2.5">
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
