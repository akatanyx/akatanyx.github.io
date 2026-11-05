// Everything personal about the site lives here: edit freely.
export const site = {
  name: "Daniel Ardi Chandra",
  // Shown one after another when someone hovers your name on the home page.
  nicknames: ["Aka", "Akatanyu", "Daniel"],
  tagline: "Web Developer, Graphic Designer",
  intro:
    "I take on graphic design and web design gigs: brand assets, posters, landing pages and app mockups.",
  // The vertical tag on the right edge of every page.
  code: "CSUGM21 - TLD61",
  socials: {
    discord: "http://discord.com/users/311757292536201217",
    email: "danielardichandra01@gmail.com",
  },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a file in /public with the GitHub Pages base path. */
export function asset(path: string) {
  return path.startsWith("http") ? path : `${basePath}${path}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
