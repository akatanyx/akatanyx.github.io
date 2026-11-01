export type Work = {
  slug: string;
  title: string;
  /** One-liner shown in the side list. */
  summary: string;
  category: "Web design" | "Graphic design" | "App design";
  year: number;
  tools: string[];
  description: string;
  /** Paths inside /public, e.g. "/works/cloud-web/1.png". Empty = grey placeholder. */
  images: string[];
  url?: string;
};

// Placeholder content from the mockup — replace with your real projects.
// Drop images in public/works/<slug>/ and list them in `images`.
export const works: Work[] = [
  {
    slug: "cloud-web",
    title: "Cloud Web",
    summary: "Cloud deployment web for cloud computing assignment",
    category: "Web design",
    year: 2025,
    tools: ["Figma", "Next.js"],
    description:
      "A landing page and dashboard for deploying small apps to the cloud. I designed the layout and visual system in Figma, then built the front end.",
    images: [],
  },
  {
    slug: "letseat",
    title: "LetsEAT",
    summary: "Authentication page for software engineering task",
    category: "App design",
    year: 2024,
    tools: ["Figma"],
    description:
      "Sign-in and sign-up flow for a food ordering app, focused on a short, friendly onboarding.",
    images: [],
  },
  {
    slug: "letscash",
    title: "LetsCASH",
    summary: "E-Wallet system for software engineering assignment",
    category: "App design",
    year: 2024,
    tools: ["Figma"],
    description:
      "E-wallet screens covering balance, top-up, transfer and transaction history.",
    images: [],
  },
  {
    slug: "logistics",
    title: "Logistics",
    summary: "App mockup made for software engineering method task",
    category: "App design",
    year: 2024,
    tools: ["Figma"],
    description:
      "Mobile mockups for tracking shipments, from pickup to delivery confirmation.",
    images: [],
  },
  {
    slug: "health-facility",
    title: "Health Facility",
    summary: "Application for health facilities for software engineering exam",
    category: "Web design",
    year: 2023,
    tools: ["Figma"],
    description:
      "A web app for finding nearby health facilities and booking appointments.",
    images: [],
  },
  {
    slug: "healthcare-app",
    title: "Healthcare App",
    summary: "Made for software engineering assignment",
    category: "App design",
    year: 2023,
    tools: ["Figma"],
    description:
      "Patient-facing app with records, reminders and doctor chat.",
    images: [],
  },
];

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}
