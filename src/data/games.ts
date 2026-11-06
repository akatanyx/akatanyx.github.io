import type { Backdrop } from "@/components/GameBackdrop";

export type Agent = {
  name: string;
  /** "S"/"A" (Zenless) or "5★"/"4★" (Genshin, Star Rail): shown and sorted highest first. */
  rank: string;
  /** A short extra shown on the card, e.g. a constellation "C2". */
  note?: string;
  /** Attribute, e.g. "Ice", "Ether". */
  element: string;
  /** Specialty, e.g. "Attack", "Stun", "Armorer". */
  role: string;
  /** A favourite: the icon glows pink with sparkles twinkling up from it. */
  loved?: boolean;
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
  /** One string per paragraph. Links: [words](https://…). */
  thoughts?: string[];
  /** Agents you own. Shown highest rank first, each rank alphabetical. */
  agents?: Agent[];
  /**
   * The background video (public/games/<slug>/background.mp4) is a green screen: key the green
   * out live and show the subject on the panel. `crop` trims letterbox bars: [x, width] as shares.
   */
  /** Which part of the background video stays in view when it's cropped, e.g. "80% center". */
  videoPosition?: string;
  /**
   * With art.webp (a cut-out character) in the game's folder, the right side shows it over a
   * drawn backdrop (see GameBackdrop) instead of screenshots.
   */
  backdrop?: Backdrop;
  /** Where the art sits on the panel, in %: its height, and how far past the right/bottom edge. */
  artFit?: { height: number; right: number; bottom: number };
  /** Zoom into the background video, e.g. 1.3; it grows from `videoPosition`. */
  videoScale?: number;
  /** What the game calls them: "Agents" (default), "Characters"… */
  charactersLabel?: string;
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
    accountLevel: "Inter-Knot Level 59/60 · Asia Server",
    platform: "PC and Mobile",
    backdrop: "street",
    artFit: { height: 142, right: -8, bottom: -50 },
    started: "2024-7-5",
    thoughts: [
      "I quit [Genshin Impact](https://en.wikipedia.org/wiki/Genshin_Impact) and [Honkai Star Rail](https://en.wikipedia.org/wiki/Honkai:_Star_Rail) to play Zenless. Not because I don't have the time to play the rest, but because Zenless hooks me more than the others.",
      "The visuals kind of resemble [Persona](https://en.wikipedia.org/wiki/Persona_%28series%29), but I like its battle system, unlike the other HoYoverse games. It might resemble [Dark Souls](https://en.wikipedia.org/wiki/Dark_Souls) or [Elden Ring](https://en.wikipedia.org/wiki/Elden_Ring), but more fast-paced. It's as fast as fighting games like [Street Fighter](https://en.wikipedia.org/wiki/Street_Fighter) or [Mortal Kombat](https://en.wikipedia.org/wiki/Mortal_Kombat).",
    ],
    agents: [
      { name: "Aria", rank: "S", element: "Ether", role: "Anomaly" },
      { name: "Astra", rank: "S", element: "Ether", role: "Support" },
      { name: "Claret", rank: "S", element: "Electric", role: "Armorer" },
      { name: "Dialyn", rank: "S", element: "Physical", role: "Stun" },
      { name: "Ellen", rank: "S", element: "Ice", role: "Attack", loved: true },
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
  {
    slug: "honkai-star-rail",
    name: "Honkai Star Rail",
    username: "Aka",
    uid: "800927883",
    accountLevel: "Trailblaze Level 70/70 · Asia Server",
    thoughts: [
      "I liked this game more than [Genshin Impact](https://en.wikipedia.org/wiki/Genshin_Impact), but everything started to topple once Penacony's story ended during [Sunday's last fight](https://honkai-star-rail.fandom.com/wiki/And_on_the_Eighth_Day), in which I have no more interest in this game. Although expect me going back to this game due to [Ellen Joe](https://honkai-star-rail.fandom.com/wiki/Ellen) existing. I quit Honkai Star Rail for [Zenless](https://en.wikipedia.org/wiki/Zenless_Zone_Zero), and I liked Ellen, so hearing her back here makes me excited.",
    ],
    backdrop: "neon",
    artFit: { height: 150, right: -20, bottom: -20 },
    charactersLabel: "Characters",
    agents: [
      { name: "Archer", rank: "5★", element: "Quantum", role: "The Hunt" },
      { name: "Argenti", rank: "5★", element: "Physical", role: "Erudition" },
      { name: "Arlan", rank: "4★", element: "Lightning", role: "Destruction", note: "E5" },
      { name: "Asta", rank: "4★", element: "Fire", role: "Harmony", note: "E4" },
      { name: "Aventurine", rank: "5★", element: "Imaginary", role: "Preservation" },
      { name: "Bailu", rank: "5★", element: "Lightning", role: "Abundance", note: "E1" },
      { name: "Blade", rank: "5★", element: "Wind", role: "Destruction" },
      { name: "Bronya", rank: "5★", element: "Wind", role: "Harmony", note: "E1" },
      { name: "Dan Heng", rank: "4★", element: "Wind", role: "The Hunt", note: "E6" },
      { name: "Dan Heng • Imbibitor Lunae", rank: "5★", element: "Imaginary", role: "Destruction" },
      { name: "Dr. Ratio", rank: "5★", element: "Imaginary", role: "The Hunt" },
      { name: "Firefly", rank: "5★", element: "Fire", role: "Destruction", loved: true },
      { name: "Gallagher", rank: "4★", element: "Fire", role: "Abundance", note: "E5" },
      { name: "Gepard", rank: "5★", element: "Ice", role: "Preservation", note: "E1" },
      { name: "Guinaifen", rank: "4★", element: "Fire", role: "Nihility", note: "E6" },
      { name: "Hanya", rank: "4★", element: "Physical", role: "Harmony", note: "E4" },
      { name: "Herta", rank: "4★", element: "Ice", role: "Erudition", note: "E6" },
      { name: "Himeko", rank: "5★", element: "Fire", role: "Erudition" },
      { name: "Hook", rank: "4★", element: "Fire", role: "Destruction", note: "E3" },
      { name: "Huohuo", rank: "5★", element: "Wind", role: "Abundance" },
      { name: "Jing Yuan", rank: "5★", element: "Lightning", role: "Erudition", loved: true },
      { name: "Luka", rank: "4★", element: "Physical", role: "Nihility", note: "E6" },
      { name: "Lynx", rank: "4★", element: "Quantum", role: "Abundance", note: "E3" },
      { name: "March 7th", rank: "4★", element: "Ice", role: "Preservation", note: "E6" },
      { name: "Misha", rank: "4★", element: "Ice", role: "Destruction", note: "E1" },
      { name: "Mortenax Blade", rank: "5★", element: "Fire", role: "Nihility" },
      { name: "Natasha", rank: "4★", element: "Physical", role: "Abundance", note: "E6" },
      { name: "Pela", rank: "4★", element: "Ice", role: "Nihility", note: "E6" },
      { name: "Qingque", rank: "4★", element: "Quantum", role: "Erudition", note: "E4" },
      { name: "Ruan Mei", rank: "5★", element: "Ice", role: "Harmony", loved: true },
      { name: "Sampo", rank: "4★", element: "Wind", role: "Nihility", note: "E6" },
      { name: "Seele", rank: "5★", element: "Quantum", role: "The Hunt" },
      { name: "Serval", rank: "4★", element: "Lightning", role: "Erudition", note: "E5" },
      { name: "Silver Wolf", rank: "5★", element: "Quantum", role: "Nihility" },
      { name: "Sushang", rank: "4★", element: "Physical", role: "The Hunt", note: "E6" },
      { name: "Tingyun", rank: "4★", element: "Lightning", role: "Harmony", note: "E5" },
      { name: "Trailblazer", rank: "5★", element: "Imaginary", role: "Harmony", note: "E2" },
      { name: "Welt", rank: "5★", element: "Imaginary", role: "Nihility" },
      { name: "Xueyi", rank: "4★", element: "Quantum", role: "Destruction", note: "E2" },
      { name: "Yukong", rank: "4★", element: "Imaginary", role: "Harmony", note: "E2" },
    ],
  },
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    username: "Aka",
    uid: "817492734",
    accountLevel: "Adventure Rank 55/60 · Asia Server",
    thoughts: [
      "My first game for the Hoyoverse line-up of games was [Honkai Impact 3rd](https://en.wikipedia.org/wiki/Honkai_Impact_3rd), but I felt like this game is my first. Honkai Impact was a bit of like my past and I never played it seriously. The first game and the hyped game that expands open-world kind of games with anime styled characters. I quit it when [Honkai Star Rail](https://en.wikipedia.org/wiki/Honkai:_Star_Rail) came, just because Genshin is boring. I left when [Kokomi](https://genshin-impact.fandom.com/wiki/Sangonomiya_Kokomi) came, during her [ocean-y area](https://genshin-impact.fandom.com/wiki/Watatsumi_Island) reveal.",
    ],
    backdrop: "ember",
    artFit: { height: 130, right: -10, bottom: -25 },
    charactersLabel: "Characters",
    agents: [
      { name: "Alhaitham", rank: "5★", element: "Dendro", role: "Sword" },
      { name: "Aloy", rank: "5★", element: "Cryo", role: "Bow" },
      { name: "Amber", rank: "4★", element: "Pyro", role: "Bow" },
      { name: "Barbara", rank: "4★", element: "Hydro", role: "Catalyst", note: "C2" },
      { name: "Beidou", rank: "4★", element: "Electro", role: "Claymore", note: "C5" },
      { name: "Bennett", rank: "4★", element: "Pyro", role: "Sword", note: "C2" },
      { name: "Chongyun", rank: "4★", element: "Cryo", role: "Claymore", note: "C5" },
      { name: "Collei", rank: "4★", element: "Dendro", role: "Bow" },
      { name: "Diona", rank: "4★", element: "Cryo", role: "Bow", note: "C4" },
      { name: "Eula", rank: "5★", element: "Cryo", role: "Claymore" },
      { name: "Faruzan", rank: "4★", element: "Anemo", role: "Bow" },
      { name: "Fischl", rank: "4★", element: "Electro", role: "Bow", note: "C2" },
      { name: "Ganyu", rank: "5★", element: "Cryo", role: "Bow", loved: true },
      { name: "Hu Tao", rank: "5★", element: "Pyro", role: "Polearm", loved: true },
      { name: "Jean", rank: "5★", element: "Anemo", role: "Sword", note: "C2" },
      { name: "Kaeya", rank: "4★", element: "Cryo", role: "Sword", note: "C2" },
      { name: "Kamisato Ayaka", rank: "5★", element: "Cryo", role: "Sword" },
      { name: "Kaveh", rank: "4★", element: "Dendro", role: "Claymore" },
      { name: "Kirara", rank: "4★", element: "Dendro", role: "Sword" },
      { name: "Kujou Sara", rank: "4★", element: "Electro", role: "Bow" },
      { name: "Lisa", rank: "4★", element: "Electro", role: "Catalyst", note: "C1" },
      { name: "Lynette", rank: "4★", element: "Anemo", role: "Sword" },
      { name: "Mona", rank: "5★", element: "Hydro", role: "Catalyst" },
      { name: "Ningguang", rank: "4★", element: "Geo", role: "Catalyst" },
      { name: "Noelle", rank: "4★", element: "Geo", role: "Claymore", note: "C5" },
      { name: "Ororon", rank: "4★", element: "Electro", role: "Bow" },
      { name: "Qiqi", rank: "5★", element: "Cryo", role: "Sword" },
      { name: "Razor", rank: "4★", element: "Electro", role: "Claymore", note: "C2" },
      { name: "Rosaria", rank: "4★", element: "Cryo", role: "Polearm", note: "C1" },
      { name: "Sayu", rank: "4★", element: "Anemo", role: "Claymore", note: "C4" },
      { name: "Shenhe", rank: "5★", element: "Cryo", role: "Polearm" },
      { name: "Sucrose", rank: "4★", element: "Anemo", role: "Catalyst", note: "C6" },
      { name: "Thoma", rank: "4★", element: "Pyro", role: "Polearm", note: "C2" },
      { name: "Traveler", rank: "5★", element: "Geo", role: "Sword", note: "C6" },
      { name: "Xiangling", rank: "4★", element: "Pyro", role: "Polearm", note: "C6" },
      { name: "Xingqiu", rank: "4★", element: "Hydro", role: "Sword", note: "C4" },
      { name: "Xinyan", rank: "4★", element: "Pyro", role: "Claymore", note: "C2" },
      { name: "Yanfei", rank: "4★", element: "Pyro", role: "Catalyst", note: "C3" },
      { name: "Yaoyao", rank: "4★", element: "Dendro", role: "Polearm", note: "C2" },
      { name: "Yun Jin", rank: "4★", element: "Geo", role: "Polearm" },
    ],
  },
  // Not filled in yet: add a username, thoughts, agents, icon.png etc. when ready.
  { slug: "heartopia", name: "Heartopia" },
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
