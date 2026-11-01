export type GameStatus = "Playing" | "On break" | "Dropped" | "Completed";

export type Game = {
  slug: string;
  name: string;
  status: GameStatus;
  /** 0–100, drives the progress bar. */
  progress: number;
  /** Free text, e.g. "Trailblaze Level 62" or "Gold Nova II". */
  progressLabel: string;
  hoursPlayed: number;
  platform: string;
  /** ISO date, e.g. "2026-10-28". */
  started: string;
  lastPlayed: string;
  /** Why you stopped. Leave out for games you're still playing. */
  whyLeft?: string;
  notes?: string;
  /** First image is the big one, the rest show underneath. Paths inside /public. */
  images: string[];
};

// Example entries — replace the numbers, dates and reasons with your own.
// Drop screenshots in public/games/<slug>/ and list them in `images`.
export const games: Game[] = [
  {
    slug: "honkai-star-rail",
    name: "Honkai Star Rail",
    status: "Playing",
    progress: 70,
    progressLabel: "Trailblaze Level 62",
    hoursPlayed: 420,
    platform: "PC",
    started: "2023-04-26",
    lastPlayed: "2026-10-30",
    notes: "Doing dailies and saving for the next banner.",
    images: [],
  },
  {
    slug: "dragon-nest",
    name: "Dragon Nest",
    status: "Dropped",
    progress: 85,
    progressLabel: "Level 95 Gladiator",
    hoursPlayed: 1600,
    platform: "PC",
    started: "2012-06-01",
    lastPlayed: "2019-08-14",
    whyLeft: "Friends quit and the server population dropped off.",
    images: [],
  },
  {
    slug: "grand-chase",
    name: "Grand Chase",
    status: "Dropped",
    progress: 60,
    progressLabel: "Elesis — Level 75",
    hoursPlayed: 900,
    platform: "PC",
    started: "2010-03-01",
    lastPlayed: "2015-04-30",
    whyLeft: "The PC version shut down.",
    images: [],
  },
  {
    slug: "csgo",
    name: "CSGO",
    status: "Completed",
    progress: 100,
    progressLabel: "Gold Nova II",
    hoursPlayed: 1100,
    platform: "PC",
    started: "2016-01-10",
    lastPlayed: "2023-09-26",
    whyLeft: "Replaced by CS2.",
    images: [],
  },
  {
    slug: "valorant",
    name: "Valorant",
    status: "On break",
    progress: 40,
    progressLabel: "Platinum 1",
    hoursPlayed: 650,
    platform: "PC",
    started: "2020-06-02",
    lastPlayed: "2025-12-18",
    whyLeft: "Ranked got too stressful during exams.",
    images: [],
  },
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    status: "On break",
    progress: 75,
    progressLabel: "Adventure Rank 58",
    hoursPlayed: 800,
    platform: "PC / Mobile",
    started: "2020-09-28",
    lastPlayed: "2025-06-02",
    whyLeft: "Burned out on dailies after switching to Star Rail.",
    images: [],
  },
  {
    slug: "elsword",
    name: "Elsword",
    status: "Dropped",
    progress: 55,
    progressLabel: "Level 99 Rune Slayer",
    hoursPlayed: 700,
    platform: "PC",
    started: "2013-02-01",
    lastPlayed: "2018-11-20",
    whyLeft: "Too much grinding for each new class.",
    images: [],
  },
];

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug);
}
