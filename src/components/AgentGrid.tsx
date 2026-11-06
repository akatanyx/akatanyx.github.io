"use client";

import { useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Media } from "@/components/Media";
import type { Agent } from "@/data/games";

export type AgentWithImage = Agent & {
  image?: string;
  elementIcon?: string;
  roleIcon?: string;
};

type Hover = { agent: AgentWithImage; x: number; y: number };

/**
 * The scrollable agents box. Hovering (or focusing) an agent shows a card with its name, rank,
 * element and role, with the in-game icons. The card is portalled to <body>: the scroll box would
 * clip it, and the section's entrance animation would offset a fixed-position child.
 */
export function AgentGrid({ agents }: { agents: AgentWithImage[] }) {
  const [hover, setHover] = useState<Hover | null>(null);

  // With a mouse the card follows the pointer; with the keyboard it sits over the focused agent.
  function follow(agent: AgentWithImage, e: MouseEvent) {
    setHover({ agent, x: e.clientX + 14, y: e.clientY - 14 });
  }
  function showAt(agent: AgentWithImage, el: HTMLElement) {
    const r = el.getBoundingClientRect();
    setHover({ agent, x: r.left + r.width / 2, y: r.top });
  }

  return (
    <>
      <ul
        onScroll={() => setHover(null)}
        className="mt-3 grid max-h-[22rem] grid-cols-5 gap-x-3 gap-y-4 overflow-y-auto border border-neutral-200 p-3 [scrollbar-width:thin] lg:max-h-none lg:min-h-0 lg:flex-1 xl:grid-cols-6"
      >
        {agents.map((agent) => (
          <li
            key={agent.name}
            tabIndex={0}
            aria-label={`${agent.name}, ${rankLabel(agent.rank)}, ${agent.element}, ${agent.role}${agent.note ? `, ${agent.note}` : ""}`}
            onMouseEnter={(e) => follow(agent, e)}
            onMouseMove={(e) => follow(agent, e)}
            onMouseLeave={() => setHover(null)}
            onFocus={(e) => showAt(agent, e.currentTarget)}
            onBlur={() => setHover(null)}
            className="group min-w-0 cursor-default rounded-lg text-center outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <div className="relative mx-auto w-full transition-transform duration-200 group-hover:scale-110">
              <Media
                src={agent.image}
                alt=""
                className={`aspect-square w-full rounded-full bg-neutral-100 object-top ${agent.loved ? "loved-glow" : ""}`}
              />
              {agent.loved && <LoveEffect />}
            </div>
            <p className="mt-1 truncate text-[10px] text-neutral-600">
              {agent.name}
            </p>
          </li>
        ))}
      </ul>

      {hover &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-50 -translate-y-full rounded-lg bg-black px-3 py-2 text-white shadow-lg"
            style={{ left: hover.x, top: hover.y - 8 }}
          >
            <p className="flex items-baseline justify-center gap-2 text-sm font-semibold whitespace-nowrap">
              {hover.agent.name}
              <span
                className={`text-[10px] font-bold ${top(hover.agent.rank) ? "text-amber-300" : "text-violet-300"}`}
              >
                {rankLabel(hover.agent.rank)}
                {hover.agent.note && (
                  <span className="ml-1.5 text-white/70">
                    {hover.agent.note}
                  </span>
                )}
              </span>
            </p>
            <div className="mt-2 flex items-start justify-center gap-4 text-[11px] whitespace-nowrap text-white/85">
              <TypeLabel
                icon={hover.agent.elementIcon}
                label={hover.agent.element}
              />
              <TypeLabel icon={hover.agent.roleIcon} label={hover.agent.role} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

// Five sparkles spread evenly: their lanes are equal steps across the circle (the left edge of an
// 18%-wide sparkle, 6% to 76%), and they set off at equal intervals over one 7 s cycle, so a new
// one appears every 1.4 s (each one's twinkle takes the first 40% of the cycle). Lanes are visited
// out of order (middle, far left, right-middle, left-middle, far right) so two neighbours never
// twinkle one after the other, and each drifts outward, away from the middle.
const SPARKLE_CYCLE = 7;
const sparkles = [41, 6, 58.5, 23.5, 76].map((x, i) => [
  x,
  Math.round((x - 41) / 7), // px of sideways drift: left lanes lean left, right lanes right
  (i * SPARKLE_CYCLE) / 5,
  SPARKLE_CYCLE,
]);

/**
 * "Loved": little four-point sparkles twinkling as they drift up, like a potion effect's
 * particles. The pulsing pink ring is on the image itself (.loved-glow).
 */
function LoveEffect() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {sparkles.map(([x, dx, delay, duration], i) => (
        <svg
          key={i}
          viewBox="-10 -10 20 20"
          className="loved-sparkle absolute bottom-[35%] w-[18%]"
          style={
            {
              left: `${x}%`,
              "--dx": `${dx}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            } as React.CSSProperties
          }
        >
          <path d="M0 -10 C1 -2, 2 -1, 10 0 C2 1, 1 2, 0 10 C-1 2, -2 1, -10 0 C-2 -1, -1 -2, 0 -10 Z" fill="#ff6fae" />
          <circle r="2.6" fill="#ffffff" />
        </svg>
      ))}
    </span>
  );
}

function TypeLabel({ icon, label }: { icon?: string; label: string }) {
  return (
    <span className="flex flex-col items-center gap-1">
      {icon && <Media src={icon} alt="" className="h-9 w-9 object-contain" />}
      {label}
    </span>
  );
}

/** "S" -> "S-Rank"; star ratings are shown as they are. */
const rankLabel = (rank: string) =>
  rank.includes("★") ? rank : `${rank}-Rank`;
const top = (rank: string) => rank === "S" || rank === "5★";
