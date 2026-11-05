export type Agent = {
  name: string;
  rank: "S" | "A";
  /** Attribute, e.g. "Ice", "Ether". */
  element: string;
  /** Specialty, e.g. "Attack", "Stun", "Armorer". */
  role: string;
};

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
  /** Agents you own. Shown S-rank first, then A-rank, each alphabetical. */
  agents?: Agent[];
};

// Images are picked up automatically from public/games/<slug>/ (png, jpg or webp):
//   avatar.png                  your in-game profile picture
//   screenshot-1.png … -3.png   the big shot, then the two under it
//   agents/<agent-name>.webp    one face per agent, e.g. agents/ellen.webp
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
      { name: "Aria", rank: "S", element: "Ether", role: "Anomaly" },
      { name: "Astra", rank: "S", element: "Ether", role: "Support" },
      { name: "Claret", rank: "S", element: "Electric", role: "Armorer" },
      { name: "Dialyn", rank: "S", element: "Physical", role: "Stun" },
      { name: "Ellen", rank: "S", element: "Ice", role: "Attack" },
      { name: "Grace", rank: "S", element: "Electric", role: "Anomaly" },
      { name: "Harumasa", rank: "S", element: "Electric", role: "Attack" },
      { name: "Jane", rank: "S", element: "Physical", role: "Anomaly" },
      { name: "Koleda", rank: "S", element: "Fire", role: "Stun" },
      { name: "Lucia", rank: "S", element: "Ether", role: "Support" },
      { name: "Lycaon", rank: "S", element: "Ice", role: "Stun" },
      { name: "Miyabi", rank: "S", element: "Frost", role: "Anomaly" },
      { name: "Nangong", rank: "S", element: "Ether", role: "Stun" },
      { name: "Nekomata", rank: "S", element: "Physical", role: "Attack" },
      { name: "Norma", rank: "S", element: "Fire", role: "Stun" },
      { name: "Remielle", rank: "S", element: "Lumiflux", role: "Anomaly" },
      { name: "Rina", rank: "S", element: "Electric", role: "Support" },
      { name: "Shunguang", rank: "S", element: "Honed Edge", role: "Attack" },
      { name: "Soldier 11", rank: "S", element: "Fire", role: "Attack" },
      { name: "Sunna", rank: "S", element: "Physical", role: "Support" },
      { name: "Velina", rank: "S", element: "Wind", role: "Anomaly" },
      { name: "Yanagi", rank: "S", element: "Electric", role: "Anomaly" },
      { name: "Yidhari", rank: "S", element: "Ice", role: "Rupture" },
      { name: "Yuzuha", rank: "S", element: "Physical", role: "Support" },
      { name: "Zhao", rank: "S", element: "Ice", role: "Defense" },
      { name: "Zhu Yuan", rank: "S", element: "Ether", role: "Attack" },
      { name: "Anby", rank: "A", element: "Electric", role: "Stun" },
      { name: "Anton", rank: "A", element: "Electric", role: "Attack" },
      { name: "Ben", rank: "A", element: "Fire", role: "Defense" },
      { name: "Billy", rank: "A", element: "Physical", role: "Attack" },
      { name: "Corin", rank: "A", element: "Physical", role: "Attack" },
      { name: "Lucy", rank: "A", element: "Fire", role: "Support" },
      { name: "Manato", rank: "A", element: "Fire", role: "Rupture" },
      { name: "Nicole", rank: "A", element: "Ether", role: "Support" },
      { name: "Piper", rank: "A", element: "Physical", role: "Anomaly" },
      { name: "Pulchra", rank: "A", element: "Physical", role: "Stun" },
      { name: "Seth", rank: "A", element: "Electric", role: "Defense" },
      { name: "Soukaku", rank: "A", element: "Ice", role: "Support" },
      { name: "Yinhu", rank: "A", element: "Physical", role: "Defense" },
    ],
  },
  // Not filled in yet: add a username, thoughts, agents, icon.png etc. when ready.
  { slug: "heartopia", name: "Heartopia" },
  { slug: "honkai-star-rail", name: "Honkai Star Rail" },
  { slug: "genshin-impact", name: "Genshin Impact" },
  { slug: "valorant", name: "Valorant" },
  { slug: "counter-strike-2", name: "Counter Strike 2" },
];

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug);
}

/** "Soldier 11" -> "soldier-11", used for image file names. */
export function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
