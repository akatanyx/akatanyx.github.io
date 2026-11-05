"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BackLink } from "@/components/BackLink";
import { TransitionLink } from "@/components/TransitionLink";
import { clientWorks, practiceWorks, type Work } from "@/data/works";
import { stagger } from "@/lib/motion";

type Box = { top: number; left: number; width: number; height: number };

/**
 * The project list on the left of every project page. It stays mounted between projects;
 * one dark highlight sits behind the chosen project and slides to the next one on click.
 */
export function WorkSidebar() {
  const pathname = usePathname();
  const current = pathname.split("/").filter(Boolean)[1] ?? "";

  // Move the highlight as soon as a project is clicked, not when the next page arrives.
  // A click only counts while we're still on the page it was made from.
  const [clicked, setClicked] = useState<{ slug: string; from: string } | null>(null);
  const selected = clicked && clicked.from === current ? clicked.slug : current;
  const setSelected = (slug: string) => setClicked({ slug, from: current });

  const container = useRef<HTMLDivElement>(null);
  const items = useRef(new Map<string, HTMLElement>());
  const [box, setBox] = useState<Box | null>(null);
  const [animate, setAnimate] = useState(false);

  const measure = useCallback(() => {
    const el = items.current.get(selected);
    if (!el) return setBox(null);
    setBox({ top: el.offsetTop, left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight });
  }, [selected]);

  useLayoutEffect(() => {
    measure();
    // Place it instantly the first time, then slide on every later change.
    const t = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(t);
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const register = (slug: string) => (el: HTMLElement | null) => {
    if (el) items.current.set(slug, el);
    else items.current.delete(slug);
  };

  return (
    <div className="px-8 py-10 sm:px-14 lg:py-12">
      <BackLink href="/works/">Back to Works</BackLink>

      <div ref={container} className="relative mt-8 lg:mt-12">
        {/* Desktop only: on phones the lists scroll sideways, so each item gets its own background. */}
        {box && (
          <div
            aria-hidden
            className={`pointer-events-none absolute hidden rounded-xl bg-black/12 lg:block ${
              animate ? "transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" : ""
            }`}
            style={box}
          />
        )}

        <WorkList works={clientWorks} selected={selected} onSelect={setSelected} register={register} />
        {practiceWorks.length > 0 && (
          <>
            <p className="mt-10 mb-3 text-[11px] tracking-[0.3em] text-neutral-400 uppercase">Practice</p>
            <WorkList
              works={practiceWorks}
              selected={selected}
              onSelect={setSelected}
              register={register}
              offset={clientWorks.length}
            />
          </>
        )}
      </div>
    </div>
  );
}

function WorkList({
  works,
  selected,
  onSelect,
  register,
  offset = 0,
}: {
  works: Work[];
  selected: string;
  onSelect: (slug: string) => void;
  register: (slug: string) => (el: HTMLElement | null) => void;
  offset?: number;
}) {
  return (
    <ul className="-mx-8 flex gap-3 overflow-x-auto px-8 pb-2 sm:-mx-14 sm:px-14 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
      {works.map((w, i) => {
        const active = w.slug === selected;
        return (
          <li key={w.slug} ref={register(w.slug)} className="enter-left min-w-[240px] lg:min-w-0" style={stagger(offset + i)}>
            <TransitionLink
              href={`/works/${w.slug}/`}
              aria-current={active ? "page" : undefined}
              onClick={() => onSelect(w.slug)}
              className={`relative flex items-start gap-6 rounded-xl px-4 py-3.5 transition-[background-color,opacity] duration-300 ${
                active ? "bg-black/12 opacity-100 lg:bg-transparent" : "opacity-55 hover:bg-black/5 hover:opacity-90"
              }`}
            >
              <span className="w-9 shrink-0 text-2xl leading-tight font-light tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-lg leading-tight font-bold">{w.title}</p>
                <p className="mt-1 text-[11px] leading-snug">{w.summary ?? w.role}</p>
              </div>
            </TransitionLink>
          </li>
        );
      })}
    </ul>
  );
}
