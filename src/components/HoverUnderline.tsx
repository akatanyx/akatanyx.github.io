"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Text with an underline that grows outward from wherever the cursor entered. Put it inside
 * an element with the `group` class; hovering that element draws the line.
 */
export function HoverUnderline({
  children,
  on = false,
  thin = false,
}: {
  children: ReactNode;
  /** Keep the line drawn, e.g. for the current page's tab. */
  on?: boolean;
  /** A 2px line for small text, instead of 3px. */
  thin?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const label = ref.current;
    const trigger = label?.closest(".group");
    if (!label || !trigger) return;
    // Where the pointer comes in, as a share of the text's width, becomes the line's starting point.
    const onEnter = (e: Event) => {
      const r = label.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, ((e as PointerEvent).clientX - r.left) / r.width));
      label.style.setProperty("--ul-origin", `${x * 100}%`);
    };
    trigger.addEventListener("pointerenter", onEnter);
    return () => trigger.removeEventListener("pointerenter", onEnter);
  }, []);

  return (
    <span ref={ref} className="relative inline-block">
      {children}
      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-1 origin-[var(--ul-origin,50%)] rounded-full bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 ${
          thin ? "h-[2px]" : "h-[3px]"
        } ${on ? "scale-x-100" : "scale-x-0"}`}
      />
    </span>
  );
}
