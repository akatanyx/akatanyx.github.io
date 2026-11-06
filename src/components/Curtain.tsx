"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

/**
 * A white panel that lives in the layout, so it survives a route change.
 * raiseCurtain() grows it from the left; it's removed as soon as the next page has rendered.
 */

const SWEEP_MS = 650;

type Panel = { width: string; height: string };
type State = { panel: Panel | null; animate: boolean };

let state: State = { panel: null, animate: false };
const listeners = new Set<() => void>();

function set(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Grows the white panel from the left to the given size. */
export function raiseCurtain(panel: Panel) {
  set({ panel, animate: true });
}

/** Removes the panel at once. Home's own white panel is the same shape, so nothing visibly changes. */
function lowerCurtain() {
  if (!state.panel) return;
  set({ panel: null, animate: false });
}

export function Curtain() {
  const snap = useSyncExternalStore(subscribe, () => state, () => state);
  const pathname = usePathname();

  // The new page has rendered: remove the panel.
  useEffect(() => {
    lowerCurtain();
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 bg-white"
      style={{
        width: snap.panel?.width ?? "0%",
        height: snap.panel?.height ?? "100%",
        transition: snap.animate ? `width ${SWEEP_MS}ms var(--ease-panel), height ${SWEEP_MS}ms var(--ease-panel)` : "none",
      }}
    />
  );
}