"use client";

import { useState, type CSSProperties } from "react";
import { BookViewer } from "@/components/BookViewer";
import { Media } from "@/components/Media";
import { Zoomable } from "@/components/Zoomable";
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
  tools,
  designTools,
  fitHeight = false,
  description,
  views,
  items,
}: {
  title: string;
  meta: string;
  /** Shown after `meta`: the web stack on device views, `designTools` (if set) on Graphic Design. */
  tools?: string[];
  designTools?: string[];
  /** Show each whole screenshot shrunk to the screen's height (no scrolling, no cropping). */
  fitHeight?: boolean;
  description?: string;
  views: View[];
  items: Record<View, Screen[]>;
}) {
  const [view, setView] = useState<View>(views.find((v) => items[v].length) ?? views[0]);
  const [index, setIndex] = useState<Partial<Record<View, number>>>({});
  // How each screenshot sits in the device, decided once it loads (see measureFit).
  const [fit, setFit] = useState<Record<string, Fit>>({});
  // Screens the visitor has started scrolling, so the "Scroll" cue can go away.
  const [scrolled, setScrolled] = useState<Record<string, boolean>>({});

  const frame = frames[view];
  const list = items[view];
  const at = index[view] ?? 0;
  const current = list[at];
  // A popup shows over the last full screen before it, dimmed, like a real dialog.
  const popup = current && isPopup(current) ? current : undefined;
  const base = popup ? list.slice(0, at).findLast((s) => !isPopup(s)) : current;
  const baseFit = base ? fit[base.src] : undefined;

  return (
    <div className="flex flex-col px-8 pt-8 pb-16 sm:px-14 lg:h-full lg:pt-10 lg:pr-28 lg:pb-10 lg:pl-16">
      {/* The toggle stays top-right; the text beside it wraps instead of pushing it down. */}
      <header className="enter-up flex flex-wrap items-start justify-between gap-4 lg:flex-nowrap lg:pr-12">
        <div className="min-w-0 lg:flex-1">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-1 text-xs tracking-[0.25em] text-white/50 uppercase">
            {[meta, ((view === "design" && designTools) || tools)?.join(", ")].filter(Boolean).join(" · ")}
          </p>
          {description && <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">{description}</p>}
        </div>
        {views.length > 1 && (
          <div role="tablist" aria-label="View" className="flex w-full rounded-full bg-black/25 p-1 text-xs sm:text-sm lg:w-auto lg:shrink-0">
            {views.map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-1.5 whitespace-nowrap transition-colors sm:gap-2 sm:px-4 lg:flex-none ${
                  view === v ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                <span className="max-[380px]:hidden">
                  <ViewIcon view={v} />
                </span>
                {viewLabel[v]}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* The stage is a size container, so what's on it can fit both its width and height. */}
      <div
        className="mt-6 flex h-[var(--stage-h)] min-h-0 items-center justify-center [container-type:size] lg:h-auto lg:flex-1"
        style={{ "--stage-h": frame ? `min(72dvh, calc((100vw - 4rem) / ${frame.ratio}))` : "65dvh" } as CSSProperties}
      >
        {frame ? (
          <div
            key={view}
            className="enter-zoom relative"
            style={{ width: `min(100cqw, ${100 * frame.ratio}cqh)`, aspectRatio: frame.ratio }}
          >
            <div
              onScroll={(e) => {
                if (base && e.currentTarget.scrollTop > 8 && !scrolled[base.src])
                  setScrolled((s) => ({ ...s, [base.src]: true }));
              }}
              className="absolute overflow-y-auto overscroll-contain bg-neutral-900 [scrollbar-width:none]"
              style={{
                left: `${frame.screen.left}%`,
                top: `${frame.screen.top}%`,
                width: `${frame.screen.width}%`,
                height: `${frame.screen.height}%`,
              }}
            >
              {base && isApp(base) ? (
                // A program, not a website: its window sits on a desktop with a taskbar.
                <div key={base.src} className="screen-in relative h-full w-full overflow-hidden" style={{ background: wallpaper }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                  <img
                    src={asset(base.src)}
                    alt={`${title}: ${base.label}`}
                    className="absolute top-[46%] left-1/2 max-h-[74%] max-w-[76%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 flex h-[7%] items-center justify-center gap-[1.6%] bg-black/45 backdrop-blur">
                    {["#4c8dff", "#e9e9e9", "#f2b233", "#e5484d"].map((c) => (
                      <span key={c} className="aspect-square h-[52%] rounded-[22%]" style={{ background: c, opacity: 0.85 }} />
                    ))}
                  </div>
                </div>
              ) : base && fitHeight ? (
                <div key={base.src} className="screen-in flex h-full w-full justify-center" style={{ background: baseFit?.color }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                  <img
                    src={asset(base.src)}
                    alt={`${title}: ${base.label}`}
                    onLoad={(e) => {
                      const color = bottomColor(e.currentTarget);
                      setFit((f) => (f[base.src]?.color === color ? f : { ...f, [base.src]: { mode: "fill", color } }));
                    }}
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>
              ) : base ? (
                <div className={baseFit?.mode === "fill" ? "h-full" : "min-h-full"} style={{ background: baseFit?.color }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                  <img
                    key={base.src}
                    src={asset(base.src)}
                    alt={popup ? "" : `${title}: ${base.label}`}
                    onLoad={(e) => {
                      const next = measureFit(e.currentTarget, frame.screenRatio);
                      setFit((f) => (f[base.src]?.mode === next.mode ? f : { ...f, [base.src]: next }));
                    }}
                    className={`screen-in block w-full ${baseFit?.mode === "fill" ? "h-full object-cover object-top" : ""}`}
                  />
                </div>
              ) : (
                !popup && <ComingSoon />
              )}
              {popup && (
                <div key={popup.src} className="screen-in absolute inset-0 grid place-items-center bg-black/55 p-[7%]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                  <img
                    src={asset(popup.src)}
                    alt={`${title}: ${popup.label}`}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
                  />
                </div>
              )}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
            <img src={asset(frame.src)} alt="" className="pointer-events-none absolute inset-0 h-full w-full" />
            {base && !popup && baseFit?.mode === "tall" && (
              // Tells visitors a long screenshot continues; fades once they scroll.
              <span
                aria-hidden
                className={`pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white transition-opacity duration-300 ${
                  scrolled[base.src] ? "opacity-0" : "opacity-100"
                }`}
                style={{ bottom: `${100 - frame.screen.top - frame.screen.height + 3}%` }}
              >
                Scroll
                <svg viewBox="0 0 24 24" className="h-3 w-3 animate-bounce" fill="none" stroke="currentColor" strokeWidth={3}>
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        ) : current?.pages ? (
          // A multi-page document, flipped through like a book.
          <BookViewer key={current.src} pages={current.pages} cover={current.cover} title={`${title}: ${current.label}`} />
        ) : current ? (
          // Graphic design: the piece itself, as large as fits; click to view it full-screen.
          <Zoomable key={current.src} src={current.src} alt={`${title}: ${current.label}`} className="flex h-full w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
            <img
              src={asset(current.src)}
              alt={`${title}: ${current.label}`}
              className="screen-in max-h-full max-w-full rounded-lg object-contain shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            />
          </Zoomable>
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

/**
 * "tall": a full-page capture, scrolls inside the screen.
 * "short": shorter than the screen; keeps its full width, top-aligned, and `color` (its own
 *   bottom edge) fills the rest, so nothing gets cropped.
 * "fill": about the screen's shape; covers it.
 */
type Fit = { mode: "tall" | "short" | "fill"; color?: string };

function measureFit(img: HTMLImageElement, screenRatio: number): Fit {
  const ratio = img.naturalHeight / img.naturalWidth;
  const screen = 1 / screenRatio;
  if (ratio > screen * 1.15) return { mode: "tall" };
  if (ratio > screen * 0.97) return { mode: "fill" };
  return { mode: "short", color: bottomColor(img) };
}

/** Average colour of an image's bottom row, so a short screen can be extended seamlessly. */
function bottomColor(img: HTMLImageElement) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, img.naturalHeight - 1, img.naturalWidth, 1, 0, 0, img.naturalWidth, 1);
    const d = ctx.getImageData(0, 0, img.naturalWidth, 1).data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < d.length; i += 4) {
      r += d[i];
      g += d[i + 1];
      b += d[i + 2];
    }
    const n = d.length / 4;
    return `rgb(${Math.round(r / n)} ${Math.round(g / n)} ${Math.round(b / n)})`;
  } catch {
    return "#fff";
  }
}

/** Screens named "launcher…" are programs, shown as a window on a desktop. */
function isApp(s: Screen) {
  return /^launcher\b/i.test(s.label);
}

// Desktop wallpaper behind program windows.
const wallpaper =
  "radial-gradient(ellipse at 30% 20%, #3a3f6b 0%, transparent 55%), radial-gradient(ellipse at 80% 85%, #5a2a4a 0%, transparent 50%), linear-gradient(160deg, #1c2038, #121420)";

/** Screens named "popup…" are dialogs, shown over the previous screen. */
function isPopup(s: Screen) {
  return /^popup\b/i.test(s.label);
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
