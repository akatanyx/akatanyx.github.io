"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "seen-works-tip";

// Decided once per page load: true only if this browser has never seen the tip.
let firstVisit: boolean | null = null;
function isFirstVisit() {
  if (firstVisit === null) {
    try {
      firstVisit = localStorage.getItem(KEY) !== "1";
      localStorage.setItem(KEY, "1");
    } catch {
      firstVisit = false;
    }
  }
  return firstVisit;
}
const noSubscribe = () => () => {};

/** A speech bubble pointing at the home arrow, shown on someone's first visit only. */
export function FirstVisitTip({ text }: { text: string }) {
  const first = useSyncExternalStore(noSubscribe, isFirstVisit, () => false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!first) return;
    const t = setTimeout(() => setHidden(true), 9000);
    return () => clearTimeout(t);
  }, [first]);

  if (!first || hidden) return null;

  return (
    <span
      role="tooltip"
      className="first-tip pointer-events-none absolute z-20 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white shadow-xl max-lg:top-1/2 max-lg:w-max max-lg:max-w-[calc(100vw-9rem)] lg:whitespace-nowrap max-lg:left-full max-lg:ml-4 max-lg:-translate-y-1/2 lg:bottom-full lg:left-1/2 lg:mb-4 lg:-translate-x-1/2"
    >
      {text}
      {/* The little pointer: left of the bubble on phones (arrow is beside it), below it on desktop. */}
      <span
        aria-hidden
        className="absolute h-3 w-3 rotate-45 bg-black max-lg:top-1/2 max-lg:-left-1.5 max-lg:-translate-y-1/2 lg:-bottom-1.5 lg:left-1/2 lg:-translate-x-1/2"
      />
    </span>
  );
}
