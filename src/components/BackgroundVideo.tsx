"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/site";

// Darkens the edges so the tabs, corner squares and vertical tag stay readable on top.
const vignette = [
  "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.7) 100%)",
  "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 22%)",
  "linear-gradient(to left, rgba(0,0,0,0.55), transparent 18%)",
  "linear-gradient(to top, rgba(0,0,0,0.5), transparent 20%)",
].join(", ");

/** A muted, looping video that fills its (positioned) parent, with a vignette over it. */
export function BackgroundVideo({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Browsers only autoplay muted video; set it on the element itself, not just the attribute.
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.pause();
    else video.play().catch(() => {});
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={ref}
        src={asset(src)}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0" style={{ background: vignette }} />
    </div>
  );
}
