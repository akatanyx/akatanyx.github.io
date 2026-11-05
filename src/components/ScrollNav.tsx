"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/TransitionLink";

/**
 * Phones only: once the page's big heading scrolls away, a slim bar slides down from the
 * top with a back arrow and the heading's title, so you always know where you are.
 */
export function ScrollNav({ title, backHref }: { title: string; backHref: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!shown}
      className={`scroll-nav fixed inset-x-0 top-0 z-40 flex items-center gap-3 bg-white/90 px-6 py-3.5 shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 ease-out lg:hidden ${
        shown ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <TransitionLink
        href={backHref}
        variant="expand"
        aria-label="Back"
        tabIndex={shown ? 0 : -1}
        className="grid h-8 w-8 place-items-center rounded-full hover:bg-black/5"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={3}>
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </TransitionLink>
      <p className="text-lg font-bold">{title}</p>
    </div>
  );
}
