"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { endNavigation, startNavigation } from "@/lib/navigation";

/**
 * Runs after each new page has painted: turns the exit state set by TransitionLink
 * into an arrival state, so the incoming page can animate from where the last one left off.
 * Also hides the page loader, and shows it for browser back/forward navigation.
 */
export function TransitionEffects() {
  const pathname = usePathname();
  const pathRef = useRef(pathname);

  useEffect(() => {
    pathRef.current = pathname;
    endNavigation();

    const root = document.documentElement;
    const leaving = root.dataset.leaving;
    if (!leaving) return;
    root.dataset.arrive = leaving;
    delete root.dataset.leaving;
    const t = setTimeout(() => delete root.dataset.arrive, 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    function onPopState() {
      if (window.location.pathname !== pathRef.current) startNavigation();
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return null;
}