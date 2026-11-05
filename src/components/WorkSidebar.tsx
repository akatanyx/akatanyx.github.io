"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BackLink } from "@/components/BackLink";
import { TransitionLink } from "@/components/TransitionLink";
import { clientWorks, practiceWorks, type Work } from "@/data/works";
import { stagger } from "@/lib/motion";

type Box = { top: number; height: number };

/**
 * The project list on the left of every project page. It stays mounted between projects;
 * one dark highlight sits behind the chosen project and slides to the next one on click.
 */
export function WorkSidebar() {
  const pathname = usePathname();
  const current = pathname.split("/").filter(Boolean)[1] ?? "";

  // Move the highlight as soon as a project is clicked, not when the next page arrives.
  // A click only counts while we're still on the page it was made from.
  const [clicked, setClicked] = useState<{ slug: string; from: string } | null>(
    null,
  );
  const selected = clicked && clicked.from === current ? clicked.slug : current;
  const setSelected = (slug: string) => setClicked({ slug, from: current });

  const container = useRef<HTMLDivElement>(null);
  const items = useRef(new Map<string, HTMLElement>());
  const [box, setBox] = useState<Box | null>(null);
  const [animate, setAnimate] = useState(false);

  const measure = useCallback(() => {
    const el = items.current.get(selected);
    if (!el) return setBox(null);
    setBox({ top: el.offsetTop, height: el.offsetHeight });
  }, [selected]);

  useLayoutEffect(() => {
    measure();
    // Place it instantly the first time, then slide on every later change.
    const t = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(t);
  }, [measure]);

  // Re-measure whenever the list changes size, e.g. while the white panel shrinks
  // from full screen after the page-to-page sweep, or when text re-wraps.
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    // Follow resizes instantly; the slide is only for moving between projects.
    let frame = 0;
    const observer = new ResizeObserver(() => {
      setAnimate(false);
      measure();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setAnimate(true));
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  // Phones: the drawer. Picking a project closes it.
  const [open, setOpen] = useState(false);
  const choose = (slug: string) => {
    setSelected(slug);
    setOpen(false);
  };
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const register = (slug: string) => (el: HTMLElement | null) => {
    if (el) items.current.set(slug, el);
    else items.current.delete(slug);
  };

  const currentWork = [...clientWorks, ...practiceWorks].find(
    (w) => w.slug === current,
  );

  return (
    <>
      {/* Phones: a slim bar; the project list opens as a drawer from the left, like the desktop sidebar. */}
      <div className="flex items-center justify-between gap-4 px-8 py-5 sm:px-14 lg:hidden">
        <BackLink href="/works/">Works</BackLink>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="work-drawer"
          className="flex min-w-0 items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium"
        >
          <span className="truncate">{currentWork?.title ?? "Projects"}</span>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="work-drawer"
        className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm overflow-y-auto bg-white px-8 py-10 shadow-2xl transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-auto lg:max-w-none lg:translate-x-0 lg:overflow-visible lg:px-14 lg:py-12 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <BackLink href="/works/">Back to Works</BackLink>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close project list"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={container} className="relative mt-8 lg:mt-12">
          {box && (
            <div
              aria-hidden
              // Spans the list's width on its own, so only its vertical position is measured.
              className={`pointer-events-none absolute inset-x-0 rounded-xl bg-black/12 ${
                animate
                  ? "transition-[top,height] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                  : ""
              }`}
              style={box}
            />
          )}

          <WorkList
            works={clientWorks}
            selected={selected}
            onSelect={choose}
            register={register}
          />
          {practiceWorks.length > 0 && (
            <>
              <p className="mt-10 mb-3 text-[11px] tracking-[0.3em] text-neutral-400 uppercase">
                Practice
              </p>
              <WorkList
                works={practiceWorks}
                selected={selected}
                onSelect={choose}
                register={register}
                offset={clientWorks.length}
              />
            </>
          )}
        </div>
      </div>
    </>
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
    <ul className="flex flex-col gap-1">
      {works.map((w, i) => {
        const active = w.slug === selected;
        return (
          <li
            key={w.slug}
            ref={register(w.slug)}
            className="enter-left"
            style={stagger(offset + i)}
          >
            <TransitionLink
              href={`/works/${w.slug}/`}
              aria-current={active ? "page" : undefined}
              onClick={() => onSelect(w.slug)}
              className={`relative flex items-start gap-6 rounded-xl px-4 py-3.5 transition-[background-color,opacity] duration-300 ${
                active
                  ? "opacity-100"
                  : "opacity-55 hover:bg-black/5 hover:opacity-90"
              }`}
            >
              <span className="w-9 shrink-0 text-2xl leading-tight font-light tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-lg leading-tight font-bold">{w.title}</p>
                <p className="mt-1 text-[11px] leading-snug">
                  {w.summary ?? w.role}
                </p>
              </div>
            </TransitionLink>
          </li>
        );
      })}
    </ul>
  );
}
