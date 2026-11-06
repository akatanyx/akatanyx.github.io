"use client";

import type { CSSProperties } from "react";
import { useIsNavigating } from "@/lib/navigation";

/** Full-screen spinner that fades in while a page change is loading, and fades out when it lands. */
export function PageLoader() {
  const navigating = useIsNavigating();

  // Styles are inline so the loader starts hidden regardless of globals.css.
  const style: CSSProperties = {
    opacity: navigating ? 1 : 0,
    pointerEvents: navigating ? "auto" : "none",
    transition: "opacity 0.25s ease",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-hidden={!navigating}
      style={style}
      className="fixed inset-0 z-[100] flex cursor-wait items-center justify-center bg-white"
    >
      <span
        className={`size-8 rounded-full border-[3px] border-black border-t-transparent motion-reduce:animate-none ${
          navigating ? "animate-spin" : ""
        }`}
      />
    </div>
  );
}