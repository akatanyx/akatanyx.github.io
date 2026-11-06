"use client";

import { useRef, useState, type ReactNode } from "react";
import { Media } from "@/components/Media";
import { TransitionLink } from "@/components/TransitionLink";
import { stagger } from "@/lib/motion";

type Item = { slug: string; name: string; icon?: string; href?: string };

// After this many presses, the popup gets a little impatient.
const PATIENCE = 5;

/**
 * Locked things: pressing one makes it flash red and shake like it took a hit, and pops up
 * "Unavailable". Keep pressing and the message changes. Returns the press handler, which key
 * was last hit (to replay the animation), and the popup to render.
 */
export function useUnavailable() {
  const [hit, setHit] = useState<{ key: string; n: number } | null>(null);
  const [toast, setToast] = useState<{ text: string; n: number } | null>(null);
  const presses = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function press(key: string) {
    presses.current += 1;
    const n = presses.current;
    const impatient = n > PATIENCE;
    setHit({ key, n });
    setToast({
      text: impatient
        ? "It already says unavailable, stop pressing will you?"
        : "Unavailable",
      n,
    });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), impatient ? 2600 : 1400);
  }

  const popup: ReactNode = (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-10 z-50 flex justify-center px-6"
    >
      {toast && (
        <p
          key={toast.n}
          className="toast-pop max-w-sm rounded-full bg-black px-5 py-2.5 text-center text-sm font-medium text-white shadow-xl"
        >
          {toast.text}
        </p>
      )}
    </div>
  );

  return { press, hit, popup };
}

/** An app-drawer grid. Items with an `href` open normally; the rest are locked. */
export function UnavailableGrid({ items }: { items: Item[] }) {
  const { press, hit, popup } = useUnavailable();

  return (
    <>
      <ul className="mt-14 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
        {items.map((item, i) => {
          if (item.href) {
            return (
              <li key={item.slug} className="enter-up" style={stagger(i + 1)}>
                <TransitionLink
                  href={item.href}
                  variant="expand"
                  className="group flex flex-col items-center gap-3 rounded-2xl p-3 text-center transition-colors duration-200 hover:bg-black/10 focus-visible:bg-black/10"
                >
                  <Media
                    src={item.icon}
                    alt=""
                    className="aspect-square w-full max-w-24 rounded-[22%] shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                  />
                  <span className="line-clamp-2 text-sm leading-tight">
                    {item.name}
                  </span>
                </TransitionLink>
              </li>
            );
          }
          const isHit = hit?.key === item.slug;
          return (
            <li key={item.slug} className="enter-up" style={stagger(i + 1)}>
              <button
                type="button"
                onClick={() => press(item.slug)}
                aria-label={`${item.name} (unavailable)`}
                className="flex w-full cursor-not-allowed flex-col items-center gap-3 rounded-2xl p-3 text-center opacity-55 grayscale-[60%]"
              >
                {/* Re-keyed on every press so the hit animation replays. */}
                <span
                  key={isHit ? hit.n : 0}
                  className={`flex w-full flex-col items-center gap-3 ${isHit ? "took-hit" : ""}`}
                >
                  <Media
                    src={item.icon}
                    alt=""
                    className="aspect-square w-full max-w-24 rounded-[22%] brightness-75 shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
                  />
                  <span className="hit-text line-clamp-2 text-sm leading-tight">
                    {item.name}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {popup}
    </>
  );
}

/** A locked link-styled item, e.g. "03 Card Games" on Home: dimmed, takes a hit when pressed. */
export function LockedItem({
  id,
  className = "",
  style,
  children,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const { press, hit, popup } = useUnavailable();
  return (
    <>
      <button
        type="button"
        onClick={() => press(id)}
        className={`cursor-not-allowed text-left opacity-45 ${className}`}
        style={style}
      >
        <span
          key={hit?.n ?? 0}
          className={`hit-text flex items-baseline gap-5 ${hit ? "took-hit" : ""}`}
        >
          {children}
        </span>
      </button>
      {popup}
    </>
  );
}

/** The tab bar on a game page: games with content link normally, empty ones are locked. */
export function GameTabs({
  tabs,
  current,
}: {
  tabs: { slug: string; name: string; href: string; locked: boolean }[];
  current: string;
}) {
  const { press, hit, popup } = useUnavailable();
  return (
    <>
      <ul className="flex gap-8 text-sm whitespace-nowrap lg:justify-end lg:pr-12">
        {tabs.map((t) => {
          const active = t.slug === current;
          if (t.locked && !active) {
            const isHit = hit?.key === t.slug;
            return (
              <li key={t.slug}>
                <button
                  type="button"
                  onClick={() => press(t.slug)}
                  aria-label={`${t.name} (unavailable)`}
                  className="cursor-not-allowed opacity-40"
                >
                  <span key={isHit ? hit.n : 0} className={`hit-text inline-block ${isHit ? "took-hit" : ""}`}>
                    {t.name}
                  </span>
                </button>
              </li>
            );
          }
          return (
            <li key={t.slug}>
              <TransitionLink
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`underline-offset-4 transition-opacity ${active ? "underline" : "opacity-80 hover:opacity-100"}`}
              >
                {t.name}
              </TransitionLink>
            </li>
          );
        })}
      </ul>
      {popup}
    </>
  );
}
