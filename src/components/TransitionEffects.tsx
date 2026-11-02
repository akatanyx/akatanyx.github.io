"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Runs after each new page has painted: turns the exit state set by TransitionLink
 * into an arrival state, so the incoming page can animate from where the last one left off.
 */
export function TransitionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const leaving = root.dataset.leaving;
    if (!leaving) return;
    root.dataset.arrive = leaving;
    delete root.dataset.leaving;
    const t = setTimeout(() => delete root.dataset.arrive, 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
