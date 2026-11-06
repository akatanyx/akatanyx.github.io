"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useState } from "react";
import { raiseCurtain } from "@/components/Curtain";
import { asset } from "@/lib/site";

const SWEEP_MS = 650;
const CONTENT_FADE_MS = 300;

// Matches the home page's white panel: 38% of the width on desktop (lg:w-[38%]),
// and on phones the band at the top that holds the intro text.
const DESKTOP_PANEL = { width: "38%", height: "100%" };
const MOBILE_PANEL = { width: "100%", height: "50dvh" };

export default function NotFound() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  function goHome() {
    if (leaving) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push("/");
      return;
    }

    // This page's contents fade out while the white grows from the left to the home
    // page's panel size. Home loads underneath, and the layout's curtain fades away to reveal it.
    setLeaving(true);
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    raiseCurtain(desktop ? DESKTOP_PANEL : MOBILE_PANEL);
    setTimeout(() => router.push("/"), SWEEP_MS);
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-panel text-white">
      <div
        className="grid min-h-dvh place-items-center px-6 py-12 text-center transition-opacity ease-out"
        style={{ opacity: leaving ? 0 : 1, transitionDuration: `${CONTENT_FADE_MS}ms` }}
      >
        <div className="flex max-w-md flex-col items-center gap-6">
          <img
            src={asset("/ellen-sleeping.webp")}
            alt="Ellen sleeping"
            className="enter-zoom w-full max-w-xs rounded-xl object-contain"
          />
          <p className="enter-up text-6xl font-semibold tracking-tight" style={{ "--i": 1 } as CSSProperties}>
            404
          </p>
          <p className="enter-up text-lg text-white/80" style={{ "--i": 2 } as CSSProperties}>
            Sshh... Ellen is sleeping, there&apos;s nothing here. Shoo!
          </p>
          <button
            type="button"
            onClick={goHome}
            className="enter-up mt-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-white/85"
            style={{ "--i": 3 } as CSSProperties}
          >
            Return to home
          </button>
        </div>
      </div>
    </div>
  );
}