"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { asset } from "@/lib/site";

/**
 * Makes an image clickable: hovering darkens it and shows a magnifier, clicking opens it
 * full-screen over a dark backdrop. In the viewer, clicking the image toggles a closer zoom.
 * `children` is the visible image; its direct <img> child gets the hover darkening.
 */
export function Zoomable({
  src,
  alt,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  function show() {
    setZoomed(false);
    setOpen(true);
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`View ${alt} larger`}
        onClick={show}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            show();
          }
        }}
        className={`group relative cursor-zoom-in outline-none [&_img]:transition-[filter] [&_img]:duration-300 hover:[&_img]:brightness-[0.45] focus-visible:[&_img]:brightness-[0.45] ${className}`}
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-90 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className={`screen-in fixed inset-0 z-[90] bg-black/85 ${
              zoomed ? "overflow-auto" : "grid place-items-center p-[4vmin]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
            <img
              src={asset(src)}
              alt={alt}
              onClick={(e) => {
                e.stopPropagation();
                setZoomed((z) => !z);
              }}
              className={
                zoomed
                  ? "m-auto block max-w-none cursor-zoom-out"
                  : "max-h-[92dvh] max-w-full cursor-zoom-in rounded-md object-contain shadow-2xl"
              }
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="fixed top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
