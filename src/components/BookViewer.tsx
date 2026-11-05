"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { asset } from "@/lib/site";

type Spread = [left: string | null, right: string | null];

const FLIP_MS = 700;

/**
 * A multi-page document shown as a book: the cover sits alone like a closed book, then
 * pages open in pairs. ← / → (buttons or keyboard) turn a page with a 3D flip.
 * Must sit inside a size container (it sizes itself with cq units).
 */
export function BookViewer({ pages, title }: { pages: string[]; title: string }) {
  // Spread 0 is the cover on its own (right side); then 2|3, 4|5, …
  const spreads = useMemo<Spread[]>(() => {
    const s: Spread[] = [[null, pages[0]]];
    for (let i = 1; i < pages.length; i += 2) s.push([pages[i], pages[i + 1] ?? null]);
    return s;
  }, [pages]);

  const [at, setAt] = useState(0);
  const [flip, setFlip] = useState<{ dir: 1 | -1; to: number } | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (flip) return;
      const to = at + dir;
      if (to < 0 || to >= spreads.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setAt(to);
      setFlip({ dir, to });
    },
    [at, flip, spreads.length],
  );

  // Land the page once the flip animation has played.
  useEffect(() => {
    if (!flip) return;
    const t = setTimeout(() => {
      setAt(flip.to);
      setFlip(null);
    }, FLIP_MS);
    return () => clearTimeout(t);
  }, [flip]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const from = spreads[at];
  const to = flip ? spreads[flip.to] : null;
  // While a page turns, the half it's leaving shows what's underneath.
  const left = flip && to ? (flip.dir === 1 ? from[0] : to[0]) : from[0];
  const right = flip && to ? (flip.dir === 1 ? to[1] : from[1]) : from[1];
  // A lone page (cover / back cover) sits in the middle, like a closed book.
  const target = to ?? from;
  const shift = !target[0] ? "-25%" : !target[1] ? "25%" : "0%";

  const pageCount = (s: Spread) => s.filter(Boolean).length;
  const firstShown = spreads.slice(0, at).reduce((n, s) => n + pageCount(s), 0) + 1;
  const lastShown = firstShown + pageCount(from) - 1;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <ArrowButton dir={-1} disabled={at === 0} onClick={() => go(-1)} />

      <div
        className="relative"
        style={{ width: "min(calc(100cqw - 112px), calc((100cqh - 28px) * 2480 / 1754))", aspectRatio: 2480 / 1754, perspective: "2600px" }}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-in-out" style={{ transform: `translateX(${shift})` }}>
          {left && <Page src={left} side="left" alt={`${title} page`} />}
          {right && <Page src={right} side="right" alt={`${title} page`} />}

          {flip && to && (
            <div
              className={`absolute top-0 h-full w-1/2 [transform-style:preserve-3d] ${
                flip.dir === 1 ? "leaf-forward left-1/2 origin-left" : "leaf-back left-0 origin-right"
              }`}
            >
              <Face src={flip.dir === 1 ? from[1] : from[0]} side={flip.dir === 1 ? "right" : "left"} />
              <Face src={flip.dir === 1 ? to[0] : to[1]} side={flip.dir === 1 ? "left" : "right"} back />
            </div>
          )}
        </div>
      </div>

      <ArrowButton dir={1} disabled={at === spreads.length - 1} onClick={() => go(1)} />

      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-white/50 tabular-nums">
        {firstShown === lastShown ? firstShown : `${firstShown}–${lastShown}`} / {pages.length}
      </p>
    </div>
  );
}

function Page({ src, side, alt }: { src: string; side: "left" | "right"; alt: string }) {
  return (
    <div className={`absolute top-0 h-full w-1/2 overflow-hidden bg-white shadow-[0_18px_40px_rgba(0,0,0,0.45)] ${side === "left" ? "left-0 rounded-l-md" : "left-1/2 rounded-r-md"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
      <img src={asset(src)} alt={alt} className="h-full w-full object-cover" />
      <Gutter side={side} />
    </div>
  );
}

/** One side of the turning page. */
function Face({ src, side, back = false }: { src: string | null; side: "left" | "right"; back?: boolean }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-white [backface-visibility:hidden] ${side === "left" ? "rounded-l-md" : "rounded-r-md"}`}
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
      {src && <img src={asset(src)} alt="" className="h-full w-full object-cover" />}
      <Gutter side={side} />
    </div>
  );
}

/** A soft shadow along the spine edge of a page. */
function Gutter({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-0 h-full w-[8%] ${side === "left" ? "right-0" : "left-0"}`}
      style={{ background: `linear-gradient(to ${side === "left" ? "left" : "right"}, rgba(0,0,0,0.18), transparent)` }}
    />
  );
}

function ArrowButton({ dir, disabled, onClick }: { dir: 1 | -1; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === 1 ? "Next page" : "Previous page"}
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:pointer-events-none disabled:opacity-25 ${
        dir === 1 ? "right-0" : "left-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d={dir === 1 ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
