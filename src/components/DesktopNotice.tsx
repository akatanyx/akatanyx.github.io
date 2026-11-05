"use client";

import { useState, useSyncExternalStore } from "react";

// Below this width the split layout stacks and the device mockups get cramped.
const QUERY = "(max-width: 1023.98px)";
const KEY = "desktop-notice-dismissed";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function readDismissed() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

/** On small screens, suggests viewing on desktop, with a "Proceed anyway" for those who don't mind. */
export function DesktopNotice() {
  const small = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [dismissed, setDismissed] = useState(readDismissed);
  // "Proceed anyway": the text fades, then the white sheet slides up off the screen.
  const [leaving, setLeaving] = useState(false);

  if (!small || dismissed) return null;

  function proceed() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      // Storage blocked: it just shows again on the next visit.
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setDismissed(true);
    setLeaving(true);
    // Fade (200ms) then slide (700ms); a timer is more reliable than waiting for transitionend.
    setTimeout(() => setDismissed(true), 950);
  }

  // Each part fades out first; the sheet itself then slides away.
  const fade = `transition-opacity duration-200 ${leaving ? "opacity-0" : ""}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="desktop-notice-title"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white px-8 text-center text-black transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
        leaving ? "pointer-events-none -translate-y-full delay-200" : ""
      }`}
    >
      <svg viewBox="0 0 24 24" className={`h-16 w-16 ${fade}`} fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" strokeLinecap="round" />
      </svg>
      <h2 id="desktop-notice-title" className={`mt-6 max-w-xs text-2xl leading-snug font-bold ${fade}`}>
        Please view on desktop for a better experience
      </h2>

      <div className={`absolute inset-x-0 bottom-0 px-8 pb-10 ${fade}`}>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-neutral-500">
          If you wish to proceed on mobile, please keep in mind that your viewing experience won’t be as pleasant.
        </p>
        <button
          type="button"
          onClick={proceed}
          className="mt-5 rounded-full border border-black px-6 py-2.5 text-sm font-medium transition-colors hover:bg-black hover:text-white"
        >
          Proceed anyway
        </button>
      </div>
    </div>
  );
}
