"use client";

import { useSyncExternalStore } from "react";

/** Reads whether the page is in dark mode, and reacts whenever its class changes. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const isDark = () => document.documentElement.classList.contains("dark");
const serverDark = () => false;

/** Switches between light mode and the dark "Street" look, and remembers the choice. */
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, serverDark);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage can be blocked; the choice still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed right-4 bottom-4 z-[60] flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1.5 text-xs font-medium text-black"
    >
      <span
        aria-hidden
        className="size-2 rounded-full border border-current"
        style={{ background: dark ? "#e8303f" : "transparent" }}
      />
      {dark ? "Dark" : "Light"}
    </button>
  );
}