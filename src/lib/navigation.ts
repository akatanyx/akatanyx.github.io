"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks a route change in flight, so the page loader only appears when the
 * next page is genuinely taking a moment to arrive.
 */

/** Navigations that finish within this window never show the loader. */
const SHOW_DELAY_MS = 150;

let visible = false;
let showTimer: ReturnType<typeof setTimeout> | undefined;
let safetyTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

/** Starts a route change. The loader appears only if it is still running after SHOW_DELAY_MS. */
export function startNavigation() {
  clearTimeout(showTimer);
  clearTimeout(safetyTimer);
  showTimer = setTimeout(() => {
    if (!visible) {
      visible = true;
      emit();
    }
  }, SHOW_DELAY_MS);
  // Never leave the loader stuck on screen if the navigation fails silently.
  safetyTimer = setTimeout(endNavigation, 10000);
}

/** The new page has rendered: fade the loader out, or cancel it if it never appeared. */
export function endNavigation() {
  clearTimeout(showTimer);
  clearTimeout(safetyTimer);
  if (!visible) return;
  visible = false;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useIsNavigating() {
  return useSyncExternalStore(subscribe, () => visible, () => false);
}