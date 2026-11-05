"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Matches the .nickname animation length in globals.css.
const NICKNAME_MS = 2200;

/**
 * "Hello, I'm / <name>.": hovering (or tapping) it switches to "You can call me"
 * and loops through the nicknames, each sliding in from the right and out to the left.
 * The real text stays in place (transparent) so the heading never changes size.
 */
export function HelloName({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % site.nicknames.length), NICKNAME_MS);
    return () => clearTimeout(t);
  }, [active, index]);

  return (
    <h1
      className={`cursor-default ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        setIndex(0);
      }}
      // Touch screens have no hover, so a tap toggles it instead.
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") setActive((a) => !a);
      }}
    >
      <span className="relative block text-xl font-medium tracking-normal text-neutral-500 sm:text-2xl">
        <span className={`block transition-opacity duration-300 ${active ? "opacity-0" : ""}`}>Hello, I’m</span>
        <span
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-300 ${active ? "" : "opacity-0"}`}
        >
          You can call me
        </span>
      </span>

      <span className="relative mt-1 block">
        <span className={`block transition-opacity duration-200 ${active ? "opacity-0" : ""}`}>{site.name}.</span>
        {active && (
          <span
            key={index}
            aria-hidden
            className="nickname absolute top-0 left-0"
          >
            {site.nicknames[index]}
          </span>
        )}
      </span>
    </h1>
  );
}
