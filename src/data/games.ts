export type Game = {
  slug: string;
  name: string;
  /** In-game name and ID, shown with your profile picture. */
  username?: string;
  uid?: string;
  /** Account level shown under your name, e.g. "Inter-Knot Level 59/60". */
  accountLevel?: string;
  /** 0–100, drives the progress bar. */
  progress?: number;
  /** Free text, e.g. "Inter-Knot Level 60". */
  progressLabel?: string;
  hoursPlayed?: number;
  platform?: string;
  /** ISO dates, e.g. "2026-10-28". */
  started?: string;
  lastPlayed?: string;
  /** Why you stopped. Leave out for games you're still playing. */
  whyLeft?: string;
  /** One string per paragraph. */
  thoughts?: string[];
  /** Characters you own, in display order. */
  agents?: string[];
};

// Images are picked up automatically from public/games/<slug>/ (png, jpg or webp):
//   avatar.png                  your in-game profile picture
//   screenshot-1.png … -3.png   the big shot, then the two under it
//   agents/<agent-name>.png     one face per agent, e.g. agents/ellen.png
export const games: Game[] = [
  {
    slug: "zenless-zone-zero",
    name: "Zenless Zone Zero",
    username: "Aka",
    uid: "131028433",
    accountLevel: "Inter-Knot Level 59/60",
    thoughts: [
      "I think it's a cool game. I quit Genshin Impact and Honkai Star Rail to play Zenless. Not because I don't have the time to play the rest, but because Zenless hooks me more than the others.",
      "The visuals kind of resemble Persona, but I like its battle system, unlike the other HoYoverse games. It might resemble Dark Souls or Elden Ring, but more fast-paced. It's as fast as fighting games like Street Fighter or Mortal Kombat.",
    ],
    agents: [
      "Aria",
      "Anby",
      "Billy",
      "Claret",
      "Harumasa",
      "Koleda",
      "Lucia",
      "Lucy",
      "Manato",
      "Miyabi",
      "Nekomata",
      "Nicole",
      "Yinhu",
      "Piper",
      "Pulchra",
      "Rina",
      "Seth",
      "Soldier 11",
      "Soukaku",
      "Yanagi",
      "Shunguang",
      "Yuzuha",
      "Zhao",
      "Astra",
      "Anton",
      "Ben",
      "Corin",
      "Dialyn",
      "Ellen",
      "Grace",
      "Jane",
      "Lycaon",
      "Nangong",
      "Norma",
      "Remielle",
      "Sunna",
      "Velina",
      "Yidhari",
    ],
  },
];

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug);
}

/** "Soldier 11" -> "soldier-11", used for image file names. */
export function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
