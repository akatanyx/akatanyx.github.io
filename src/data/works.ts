import type { View } from "@/lib/workMedia";

export type Work = {
  slug: string;
  title: string;
  /** Your role or the kind of work, e.g. "Graphic Designer". */
  role: string;
  /** A year or a range, e.g. "2026" or "2021-2025". */
  year: string;
  /** One-liner shown in the side list. Falls back to the role. */
  summary?: string;
  tools?: string[];
  description?: string;
  url?: string;
  /** Personal or study pieces, listed under "Practice" instead of with client work. */
  practice?: boolean;
  /**
   * Show the project in the viewer instead of the image frames, with these views:
   * "desktop" / "mobile" put screenshots in a laptop / phone mockup, "design" shows pieces plainly.
   * Images go in public/works/<slug>/desktop/, mobile/ and design/, e.g. 1-home.png.
   */
  showcase?: View[];
};

// Images are picked up automatically from public/works/<slug>/ (png, jpg or webp):
// cover.png is the card image, and 1.png, 2.png, 3.png, … fill the project page.
// No need to list them here.
// Add `practice: true` to put a piece in the Practice section.
export const works: Work[] = [
  { slug: "reverie-cards", title: "Reverie Cards", role: "Graphic Designer", year: "2026", showcase: ["design"] },
  { slug: "xollexio", title: "Xollexio", role: "Web Developer", year: "2026", showcase: ["desktop", "mobile"] },
  {
    slug: "hobbystation-hideout",
    title: "Hobbystation Hideout",
    role: "Web Developer and Graphic Designer",
    year: "2021-2025",
    showcase: ["desktop", "mobile", "design"],
  },
  {
    slug: "nash-sy",
    title: "Nash Sy",
    role: "Web Developer and Graphic Designer",
    year: "2023-2024",
    showcase: ["desktop", "mobile", "design"],
  },
  {
    slug: "mak-semarangan",
    title: "Mak Semarangan",
    role: "Graphic Design",
    year: "2024-2026",
    showcase: ["design"],
  },
  { slug: "linlinzy", title: "Linlinzy", role: "YouTube Thumbnail", year: "2019-2020" },

  // Practice
  {
    slug: "cloud-web",
    practice: true,
    title: "Cloud Web",
    summary: "Cloud deployment web for cloud computing assignment",
    role: "Web design",
    year: "2025",
    tools: ["Figma", "Next.js"],
    description:
      "A landing page and dashboard for deploying small apps to the cloud. I designed the layout and visual system in Figma, then built the front end.",
  },
  {
    slug: "letseat",
    practice: true,
    title: "LetsEAT",
    summary: "Authentication page for software engineering task",
    role: "App design",
    year: "2024",
    tools: ["Figma"],
    description: "Sign-in and sign-up flow for a food ordering app, focused on a short, friendly onboarding.",
  },
  {
    slug: "letscash",
    practice: true,
    title: "LetsCASH",
    summary: "E-Wallet system for software engineering assignment",
    role: "App design",
    year: "2024",
    tools: ["Figma"],
    description: "E-wallet screens covering balance, top-up, transfer and transaction history.",
  },
  {
    slug: "logistics",
    practice: true,
    title: "Logistics",
    summary: "App mockup made for software engineering method task",
    role: "App design",
    year: "2024",
    tools: ["Figma"],
    description: "Mobile mockups for tracking shipments, from pickup to delivery confirmation.",
  },
  {
    slug: "health-facility",
    practice: true,
    title: "Health Facility",
    summary: "Application for health facilities for software engineering exam",
    role: "Web design",
    year: "2023",
    tools: ["Figma"],
    description: "A web app for finding nearby health facilities and booking appointments.",
  },
  {
    slug: "healthcare-app",
    practice: true,
    title: "Healthcare App",
    summary: "Made for software engineering assignment",
    role: "App design",
    year: "2023",
    tools: ["Figma"],
    description: "Patient-facing app with records, reminders and doctor chat.",
  },
];

export const clientWorks = works.filter((w) => !w.practice);
export const practiceWorks = works.filter((w) => w.practice);

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}
