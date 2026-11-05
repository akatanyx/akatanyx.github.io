"use client";

import { useState } from "react";
import { BookViewer } from "@/components/BookViewer";
import { Media } from "@/components/Media";
import { asset } from "@/lib/site";
import type { Screen, View } from "@/lib/workMedia";

// Device frames have a see-through screen; `screen` is where it sits, in % of the frame,
// and `screenRatio` is the screen's own width / height.
type Frame = {
  src: string;
  ratio: number;
  screenRatio: number;
  screen: { left: number; top: number; width: number; height: number };
};
const frames: Partial<Record<View, Frame>> = {
  desktop: {
    src: "/devices/laptop.webp",
    ratio: 1284 / 747,
    screenRatio: 914 / 561,
    screen: { left: 14.408, top: 10.308, width: 71.184, height: 75.1 },
  },
  mobile: {
    src: "/devices/phone.webp",
    ratio: 498 / 903,
    screenRatio: 343 / 745,
    screen: { left: 15.663, top: 8.638, width: 68.876, height: 82.503 },
  },
};

const viewLabel: Record<View, string> = { desktop: "Desktop", mobile: "Mobile", design: "Graphic Design" };

/**
 * A project viewer: a big display with thumbnail tiles below. Websites show inside a laptop
 * or phone mockup (whose screen scrolls, so full-page screenshots work); graphic design
 * shows on its own. With more than one view, a toggle at the top switches between them.
 */
export function Showcase({
  title,
  meta,
  views,
  items,
}: {
  title: string;
  meta: string;
  views: View[];
  items: Record<View, Screen[]>;
}) {
  const [view, setView] = useState<View>(views.find((v) => items[v].length) ?? views[0]);
  const [index, setIndex] = useState<Partial<Record<View, number>>>({});
  // Screenshots much taller than the screen are full-page captures: let them scroll.
  // Anything else fills the screen top to bottom.
  const [tall, setTall] = useState<Record<string, boolean>>({});

  const frame = frames[view];
  const list = items[view];
  const current = list[index[view] ?? 0];

  return (
    <div className="flex flex-col px-8 pt-24 pb-24 sm:px-14 lg:h-full lg:pt-10 lg:pr-28 lg:pb-10 lg:pl-16">
      <header className="enter-up flex flex-wrap items-end justify-between gap-4 lg:pr-12">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-1 text-xs tracking-[0.25em] text-white/50 uppercase">{meta}</p>
        </div>
        {views.length > 1 && (
          <div role="tablist" aria-label="View" className="flex rounded-full bg-black/25 p-1 text-sm">
            {views.map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 whitespace-nowrap transition-colors ${
                  view === v ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                <ViewIcon view={v} />
                {viewLabel[v]}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* The stage is a size container, so what's on it can fit both its width and height. */}
      <div className="mt-6 flex h-[60vh] min-h-0 items-center justify-center [container-type:size] lg:h-auto lg:flex-1">
        {frame ? (
          <div
            key={view}
            className="enter-zoom relative"
            style={{ width: `min(100cqw, ${100 * frame.ratio}cqh)`, aspectRatio: frame.ratio }}
          >
            <div
              className="absolute overflow-y-auto bg-neutral-900 [scrollbar-width:none]"
              style={{
                left: `${frame.screen.left}%`,
                top: `${frame.screen.top}%`,
                width: `${frame.screen.width}%`,
                height: `${frame.screen.height}%`,
              }}
            >
              {current ? (
                // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer
                <img
                  key={current.src}
                  src={asset(current.src)}
                  alt={`${title}: ${current.label}`}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const isTall = img.naturalHeight / img.naturalWidth > 1.15 / frame.screenRatio;
                    setTall((t) => (t[current.src] === isTall ? t : { ...t, [current.src]: isTall }));
                  }}
                  className={`screen-in block w-full ${tall[current.src] ? "" : "h-full object-cover object-top"}`}
                />
              ) : (
                <ComingSoon />
              )}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
            <img src={asset(frame.src)} alt="" className="pointer-events-none absolute inset-0 h-full w-full" />
          </div>
        ) : current?.pages ? (
          // A multi-page document, flipped through like a book.
          <BookViewer key={current.src} pages={current.pages} title={`${title}: ${current.label}`} />
        ) : current ? (
          // Graphic design: the piece itself, as large as fits.
          // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer
          <img
            key={current.src}
            src={asset(current.src)}
            alt={`${title}: ${current.label}`}
            className="screen-in max-h-full max-w-full rounded-lg object-contain shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          />
        ) : (
          <div key={view} className="enter-zoom aspect-[4/3] w-[min(100cqw,133cqh)] rounded-lg bg-black/20">
            <ComingSoon />
          </div>
        )}
      </div>

      {list.length > 0 && (
        // Same-size square tiles, centred; the row scrolls sideways only if they don't fit.
        <div className="mt-5 shrink-0 overflow-x-auto pb-1 [scrollbar-width:thin]">
          <div role="tablist" aria-label="Pages" className="mx-auto flex w-max gap-2">
            {list.map((s, i) => {
              const active = i === (index[view] ?? 0);
              return (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  title={s.label}
                  onClick={() => setIndex((p) => ({ ...p, [view]: i }))}
                  className={`flex aspect-square w-[84px] shrink-0 flex-col gap-1.5 rounded-lg p-1.5 text-left transition-colors ${
                    active ? "bg-white text-black" : "bg-black/25 text-white/75 hover:bg-black/40 hover:text-white"
                  }`}
                >
                  <Media src={s.src} alt="" className="min-h-0 w-full flex-1 rounded object-cover object-top" />
                  <span className="truncate px-0.5 text-[10px] leading-tight font-medium">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ComingSoon() {
  return <p className="grid h-full place-items-center text-xs text-white/40">Coming soon</p>;
}

function ViewIcon({ view }: { view: View }) {
  if (view === "desktop")
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="4" y="5" width="16" height="11" rx="1.5" />
        <path d="M2 19h20" strokeLinecap="round" />
      </svg>
    );
  if (view === "mobile")
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18.5h2" strokeLinecap="round" />
      </svg>
    );
  // A pen nib for graphic design.
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
      <path d="M12 3l6 7-6 11-6-11z" />
      <circle cx="12" cy="11" r="1.5" />
      <path d="M12 12.5V21" />
    </svg>
  );
}
