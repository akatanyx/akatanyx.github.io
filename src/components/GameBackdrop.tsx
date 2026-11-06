/**
 * Drawn backdrops that sit behind a game's cut-out character art. Each fills its parent.
 * - "neon": after the Star Rail × Zenless "Ellen" banner. Pale grey paper, a faint graffiti
 *   tag, a blue brush slab and neon lime / magenta / cyan streaks.
 * - "ember": Hu Tao. The "neon" layout in the colours of her Cherries Snow-Laden art: Liyue
 *   night navy, a periwinkle slab, mist ribbons, sky lanterns and lantern-orange streaks.
 * - "street": Zenless Ellen. Charcoal with halftone, a SHARK tag, hair-red hazard tape and slashes.
 */
export type Backdrop = "neon" | "ember" | "street";

export function GameBackdrop({ kind }: { kind: Backdrop }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {kind === "neon" && <Neon />}
      {kind === "ember" && <Ember />}
      {kind === "street" && <Street />}
    </svg>
  );
}

/** Dark shade along the top so the light game tabs stay readable on a light backdrop. */
function TopShade({ id, color }: { id: string; color: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.85" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1000" height="170" fill={`url(#${id})`} />
    </>
  );
}

function Neon() {
  return (
    <>
      <defs>
        <linearGradient id="nb-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3f3f6" />
          <stop offset="1" stopColor="#d9d9e0" />
        </linearGradient>
        <linearGradient id="nb-blue" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1d4fff" />
          <stop offset="1" stopColor="#2fd2ff" />
        </linearGradient>
        <pattern id="nb-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill="#b9bcc8" />
        </pattern>
      </defs>

      <rect width="1000" height="1000" fill="url(#nb-paper)" />
      <rect x="620" y="60" width="380" height="300" fill="url(#nb-dots)" opacity="0.6" />
      <text
        x="-20"
        y="560"
        fontSize="330"
        fontWeight="900"
        fontStyle="italic"
        fill="none"
        stroke="#c9ccd8"
        strokeWidth="6"
        transform="rotate(-8 400 500)"
        letterSpacing="-10"
      >
        ELLEN
      </text>

      <path
        d="M-40 760 L250 640 L330 700 L520 655 L470 760 L610 745 L560 880 L230 990 L-40 1040 Z"
        fill="url(#nb-blue)"
        opacity="0.9"
      />
      <path d="M40 690 L470 560 L455 600 L520 585 L60 735 Z" fill="#d6ff2f" />
      <path d="M120 640 L560 520 L548 540 L130 660 Z" fill="#ff3ccf" />
      <path d="M560 860 L990 735 L1000 770 L585 900 Z" fill="#d6ff2f" opacity="0.9" />
      <path d="M640 820 L1000 700 L1000 716 L650 838 Z" fill="#ff3ccf" />
      <g fill="#5be3ff" opacity="0.85">
        <rect x="70" y="300" width="140" height="10" />
        <rect x="110" y="318" width="70" height="6" />
        <rect x="780" y="460" width="170" height="12" />
        <rect x="820" y="480" width="90" height="6" />
      </g>
      <g fill="#a35bff" opacity="0.8">
        <rect x="40" y="330" width="90" height="8" />
        <rect x="860" y="500" width="110" height="8" />
      </g>
      <circle cx="880" cy="600" r="22" fill="#1b1430" stroke="#ff3ccf" strokeWidth="4" />
      <circle cx="905" cy="580" r="10" fill="#1b1430" stroke="#5be3ff" strokeWidth="3" />
      <circle cx="160" cy="820" r="16" fill="#1b1430" stroke="#5be3ff" strokeWidth="3" />

      <TopShade id="nb-top" color="#16121f" />
      <rect y="975" width="1000" height="25" fill="#19171f" />
    </>
  );
}

function Ember() {
  // The "neon" layout in the colours of her Cherries Snow-Laden art: a Liyue night in navy and
  // periwinkle, white mist ribbons, sky lanterns, lantern orange and a little maroon.
  return (
    <>
      <defs>
        <linearGradient id="eb-night" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#18234d" />
          <stop offset="0.55" stopColor="#2c3f78" />
          <stop offset="1" stopColor="#4d6a9c" />
        </linearGradient>
        <radialGradient id="eb-moon" cx="0.68" cy="0.32" r="0.5">
          <stop offset="0" stopColor="#96bae7" stopOpacity="0.55" />
          <stop offset="1" stopColor="#96bae7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eb-lantern">
          <stop offset="0" stopColor="#ffe3b8" />
          <stop offset="0.5" stopColor="#f08955" />
          <stop offset="1" stopColor="#f08955" stopOpacity="0" />
        </radialGradient>
        <pattern id="eb-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill="#3d5490" />
        </pattern>
      </defs>

      <rect width="1000" height="1000" fill="url(#eb-night)" />
      <rect width="1000" height="1000" fill="url(#eb-moon)" />
      <rect x="620" y="60" width="380" height="300" fill="url(#eb-dots)" opacity="0.8" />
      {/* Stars */}
      <g fill="#dbe8ff">
        {[
          [80, 180], [240, 120], [420, 210], [560, 90], [700, 170], [930, 120], [880, 380], [120, 470], [960, 560],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 ? 1.6 : 2.6} opacity={i % 2 ? 0.6 : 0.9} />
        ))}
      </g>

      {/* Periwinkle brush slab, bottom left */}
      <path
        d="M-40 760 L250 640 L330 700 L520 655 L470 760 L610 745 L560 880 L230 990 L-40 1040 Z"
        fill="url(#eb-slab)"
        opacity="0.9"
      />
      {/* Sky lanterns: a soft glow round a small warm lamp */}
      {[
        [880, 600, 26],
        [150, 400, 20],
        [760, 220, 14],
        [330, 870, 18],
        [930, 330, 11],
        [470, 150, 10],
      ].map(([x, y, r]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={r * 2.2} fill="url(#eb-lantern)" opacity="0.7" />
          <rect x={x - r * 0.45} y={y - r * 0.6} width={r * 0.9} height={r * 1.2} rx={r * 0.25} fill="#ffb27a" />
        </g>
      ))}
      <rect y="975" width="1000" height="25" fill="#121a3a" />
    </>
  );
}

function Street() {
  return (
    <>
      <defs>
        <linearGradient id="st-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2c33" />
          <stop offset="1" stopColor="#141519" />
        </linearGradient>
        <pattern id="st-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.8" fill="#3c3f48" />
        </pattern>
        <pattern id="st-tape" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="60" height="60" fill="#d93a52" />
          <rect width="28" height="60" fill="#17181c" />
        </pattern>
      </defs>

      <rect width="1000" height="1000" fill="url(#st-base)" />
      <rect x="560" y="40" width="440" height="420" fill="url(#st-dots)" />
      <text
        x="-20"
        y="520"
        fontSize="250"
        fontWeight="900"
        fontStyle="italic"
        fill="none"
        stroke="#3a3d46"
        strokeWidth="6"
        transform="rotate(-8 400 500)"
        letterSpacing="-8"
      >
        SHARK
      </text>

      {/* Hazard-tape band across the lower half, in the red of her hair tips */}
      <g transform="rotate(-14 500 760)">
        <rect x="-200" y="700" width="1400" height="90" fill="url(#st-tape)" />
        <rect x="-200" y="700" width="1400" height="6" fill="#17181c" />
        <rect x="-200" y="784" width="1400" height="6" fill="#17181c" />
      </g>
      {/* Shark-red slashes */}
      <path d="M40 640 L520 520 L505 556 L60 680 Z" fill="#e8303f" />
      <path d="M120 600 L560 492 L552 506 L128 618 Z" fill="#ffffff" opacity="0.8" />
      <path d="M560 920 L1000 800 L1000 834 L585 958 Z" fill="#e8303f" />
      {/* Shark fin */}
      <path d="M760 360 C 800 280, 860 240, 940 230 C 900 280, 890 330, 900 380 Z" fill="#30333b" />
      <g fill="#d93a52" opacity="0.9">
        <rect x="60" y="260" width="150" height="10" />
        <rect x="100" y="278" width="70" height="6" />
        <rect x="800" y="560" width="150" height="10" />
      </g>

      <rect y="975" width="1000" height="25" fill="#0d0e11" />
    </>
  );
}
