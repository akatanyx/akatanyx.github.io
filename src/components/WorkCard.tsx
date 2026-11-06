"use client";

import type { CSSProperties } from "react";
import { frames, type Frame } from "@/lib/devices";
import { asset } from "@/lib/site";
import type { Preview } from "@/lib/workMedia";

/**
 * What a Works card shows before hover:
 * - "devices": the site's home page on a laptop, with a phone beside it if there's a mobile
 *   version, or a second laptop (another page) if there isn't
 * - "thumbnails": video thumbnails stacked like cards, the front one with a play button
 * - "phones": an app's first screens on phones
 * - "image": a cover you made (cover.png)
 * - "collage": a mosaic of the project's own pieces
 */
export type Cover =
  | { kind: "devices"; desktop: string; mobile?: string; desktop2?: string }
  | { kind: "thumbnails"; images: string[] }
  | { kind: "phones"; screens: string[] }
  | { kind: "image"; src: string }
  | { kind: "collage"; images: Preview[] };

/**
 * The picture part of a Works card. On hover the cover gives way to a strip of everything in
 * the project, drifting slowly to the left.
 */
export function WorkCard({
  title,
  cover,
  strip,
  rows = 2,
  secondsPerPiece = 3.5,
}: {
  title: string;
  cover: Cover;
  strip: Preview[];
  /** How many rows drift on hover; they alternate left, right, left… */
  rows?: number;
  secondsPerPiece?: number;
}) {
  const lanes = splitIntoRows(strip, rows);
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100"
    >
      <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
        <CoverArt title={title} cover={cover} />
      </div>

      {strip.length > 1 && (
        <div
          aria-hidden
          className="work-hover-strip absolute inset-0 flex flex-col justify-center gap-2 bg-neutral-300 px-0 py-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          {lanes.map((lane, r) => (
            <div
              key={r}
              className="min-h-0 flex-1"
            >
              {/* Two copies back to back, so sliding by half loops seamlessly. */}
              <div
                className="work-strip flex h-full w-max gap-2 [animation-play-state:paused] group-hover:[animation-play-state:running]"
                style={
                  {
                    "--strip-duration": `${Math.max(8, lane.length * secondsPerPiece)}s`,
                    animationDirection: r % 2 ? "reverse" : "normal",
                  } as CSSProperties
                }
              >
                {[...lane, ...lane].map((p, i) => (
                  // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer
                  <img
                    key={i}
                    src={asset(p.src)}
                    alt=""
                    loading="lazy"
                    className="h-full w-auto shrink-0 rounded-md object-cover shadow-md"
                    style={{ aspectRatio: `${p.w} / ${p.h}` }}
                  />
                ))}
              </div>
            </div>
          ))}
          {/* Dims the drifting pieces a little and invites a click (the whole card is the link). */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/35">
            <span
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-xl"
            >
              Click for more
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Deal the pieces round-robin into rows, then repeat each row until it's comfortably wider
 * than the card (so a row with few pieces never shows a gap while it loops).
 */
function splitIntoRows(strip: Preview[], rows: number): Preview[][] {
  const lanes: Preview[][] = Array.from(
    { length: Math.min(rows, Math.max(1, strip.length)) },
    () => [],
  );
  strip.forEach((p, i) => lanes[i % lanes.length].push(p));
  // A row is (card height / rows) tall; the card is 0.8 as wide as it is tall.
  const needed = 0.8 * lanes.length * 1.2;
  return lanes.map((lane) => {
    const width = lane.reduce((t, p) => t + p.w / p.h, 0) || 1;
    const copies = Math.max(1, Math.ceil(needed / width));
    return Array.from({ length: copies }, () => lane).flat();
  });
}

function CoverArt({ title, cover }: { title: string; cover: Cover }) {
  if (cover.kind === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer
      <img
        src={asset(cover.src)}
        alt={title}
        className="h-full w-full object-cover"
      />
    );
  }

  if (cover.kind === "devices") {
    // Big and overlapping: the laptop runs off both edges, the phone sits over its corner.
    return (
      <div className="absolute inset-0 device-backdrop bg-[radial-gradient(ellipse_at_50%_35%,#f5f5f5,#cfcfcf)]">
        <Device
          frame={frames.desktop!}
          src={cover.desktop}
          className="absolute top-[38%] left-[2%] z-0 w-[112%] -translate-y-1/2"
        />
        {cover.mobile ? (
          <Device
            frame={frames.mobile!}
            src={cover.mobile}
            className="absolute right-[4%] bottom-[3%] z-10 w-[40%]"
          />
        ) : (
          cover.desktop2 && (
            <Device
              frame={frames.desktop!}
              src={cover.desktop2}
              className="absolute top-[76%] left-[38%] z-10 w-[84%] -translate-y-1/2 drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
            />
          )
        )}
        <span className="sr-only">{title}</span>
      </div>
    );
  }

  if (cover.kind === "phones") {
    // Large phones fanned out: the middle one in front, the outer ones tucked behind it.
    const shown = cover.screens.slice(0, 3);
    return (
      <div className="absolute inset-0 flex items-center justify-center device-backdrop bg-[radial-gradient(ellipse_at_50%_35%,#f5f5f5,#cfcfcf)]">
        {shown.map((src, i) => {
          const middle = shown.length === 3 ? i === 1 : i === 0;
          return (
            <Device
              key={src}
              frame={frames.mobile!}
              src={src}
              className={`relative w-[46%] shrink-0 ${i > 0 ? "-ml-[18%]" : ""} ${
                middle
                  ? "z-10 -translate-y-[3%] scale-105"
                  : "translate-y-[5%] scale-95"
              }`}
            />
          );
        })}
        <span className="sr-only">{title}</span>
      </div>
    );
  }

  if (cover.kind === "thumbnails") {
    // Three thumbnails cascading from top-left to bottom-right; the front one gets a play button.
    const shown = cover.images.slice(3, 6);
    return (
      <div className="absolute inset-0 device-backdrop bg-[radial-gradient(ellipse_at_50%_35%,#f5f5f5,#cfcfcf)]">
        {shown.map((src, i) => (
          <div
            key={src}
            className="absolute w-[82%] overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
            style={{
              left: `${-4 + i * 11}%`,
              top: `${8 + i * 26}%`,
              zIndex: i,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
            <img
              src={asset(src)}
              alt=""
              className="aspect-video w-full object-cover"
            />
            {i === shown.length - 1 && (
              <svg
                viewBox="0 0 68 48"
                className="absolute top-1/2 left-1/2 w-[18%] -translate-x-1/2 -translate-y-1/2"
                aria-hidden
              >
                <rect width="68" height="48" rx="12" fill="#ff0033" />
                <path d="M27 15v18l16-9z" fill="#fff" />
              </svg>
            )}
          </div>
        ))}
        <span className="sr-only">{title}</span>
      </div>
    );
  }

  return <Collage title={title} images={cover.images} />;
}

/** A device frame with a screenshot sitting in its screen. */
function Device({
  frame,
  src,
  className,
}: {
  frame: Frame;
  src: string;
  className: string;
}) {
  return (
    <div className={className}>
      <div className="relative w-full" style={{ aspectRatio: frame.ratio }}>
        <div
          className="absolute overflow-hidden bg-neutral-900"
          style={{
            left: `${frame.screen.left}%`,
            top: `${frame.screen.top}%`,
            width: `${frame.screen.width}%`,
            height: `${frame.screen.height}%`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
          <img
            src={asset(src)}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
        <img
          src={asset(frame.src)}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-xl"
        />
      </div>
    </div>
  );
}

// Where each poster sits on the wall: [left %, top %, width %, rotation deg], back to front.
// Two columns, three rows, overlapping, so the wall is covered top to bottom.
const posterSpots = [
  [-5, -3, 56, -6],
  [46, -6, 58, 5],
  [-8, 30, 58, 4],
  [42, 27, 60, -5],
  [-4, 62, 56, -3],
  [44, 60, 58, 6],
];

/** Design pieces as printed posters: white paper border, tilted, overlapping on a wall. */
function Collage({ title, images }: { title: string; images: Preview[] }) {
  // Tall and square pieces read best as posters, so they go up first; wide ones fill in after.
  const picks = [
    ...images.filter((p) => p.h / p.w >= 0.9),
    ...images.filter((p) => p.h / p.w < 0.9),
  ].slice(0, 6);
  if (!picks.length)
    return (
      <div
        role="img"
        aria-label={title}
        className="h-full w-full bg-placeholder"
      />
    );
  return (
    <div
      role="img"
      aria-label={title}
      className="absolute inset-0 device-backdrop bg-[radial-gradient(ellipse_at_50%_35%,#f5f5f5,#cfcfcf)]"
    >
      {picks.map((p, i) => {
        const [left, top, width, rotate] = posterSpots[i];
        return (
          <div
            key={p.src}
            className="absolute bg-[#ffffff] p-[2.5%] shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              rotate: `${rotate}deg`,
              zIndex: i,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
            <img
              src={asset(p.src)}
              alt=""
              className="block w-full"
              style={{ aspectRatio: `${p.w} / ${p.h}` }}
            />
          </div>
        );
      })}
    </div>
  );
}