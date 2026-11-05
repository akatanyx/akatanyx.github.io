import type { View } from "@/lib/workMedia";

export type Video = {
  /** Full YouTube link; clicking the card opens it. */
  url: string;
  title?: string;
  /** Exact view count, e.g. 26680; shown as "26K views" and used to sort, most-viewed first. */
  views?: number;
  /** Shown as-is, e.g. "Apr 9, 2019" and "10:24". */
  date?: string;
  duration?: string;
  /**
   * File name in public/works/<slug>/thumbnails/. Left out: the nth image there is used,
   * and failing that, YouTube's own thumbnail for the video.
   */
  thumbnail?: string;
};

export type Channel = {
  name: string;
  handle?: string;
  /** The channel page; the channel name links here. */
  url?: string;
  subscribers?: string;
  videos: Video[];
};

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
  /** Design series to show as a flip-through book, e.g. ["company-profile"] for company-profile-1.png, -2, … */
  books?: string[];
  /** Show the project as a YouTube channel page: header, then a grid of real videos. */
  channel?: Channel;
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
  {
    slug: "linlinzy",
    title: "Linlinzy",
    role: "YouTube Thumbnail",
    year: "2019-2020",
    channel: {
      name: "Linlinzy",
      handle: "@IndexHart",
      url: "https://www.youtube.com/@IndexHart",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=PyQB3ZtCWnY",
          title: "Grand Chase Kakao - Ley Limit Break!",
          views: 26680,
          date: "Apr 9, 2019",
          duration: "20:00",
          thumbnail: "1-ley.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=jx5of-Q98SQ",
          title: "Grand Chase Kakao - Lass Limit Break",
          views: 42578,
          date: "Mar 20, 2019",
          duration: "12:52",
          thumbnail: "2-lass.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=KScxpPjdGsk",
          title: "Grand Chase Kakao - Sieghart Limit Break!",
          views: 30487,
          date: "Mar 19, 2019",
          duration: "6:56",
          thumbnail: "3-sieghart.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=sI8brlXZAnk",
          title: "Grand Chase Kakao - Lire Limit Break",
          views: 60510,
          date: "Nov 2, 2018",
          duration: "5:42",
          thumbnail: "4-lire.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=wPh1DeAoGzU",
          title: "Grand Chase Kakao - Transcend 6 Lire",
          views: 10147,
          date: "May 28, 2019",
          duration: "5:48",
          thumbnail: "5-lire-transcend.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=yji4IdUFWeA",
          title: "Grand Chase Kakao - Jiangshi Maiden Lime and Grim Reaper Rin",
          views: 7066,
          date: "Jun 26, 2019",
          duration: "5:41",
          thumbnail: "6-lime-rin.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=yO0ou5fCOIo",
          title: "Grand Chase Kakao - Exorcist Dio and Gumiho Ley",
          views: 6241,
          date: "Jun 28, 2019",
          duration: "3:41",
          thumbnail: "7-dio-ley.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=E64h4V0McXc",
          title: "Grand Chase Kakao - Surfing Master Zero and Twinkle Star Arme",
          views: 5826,
          date: "Jun 27, 2019",
          duration: "4:34",
          thumbnail: "8-zero-arme.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=grxBtCAZRxw",
          title: "Grand Chase Kakao - Blooming Flower Edel and Golden Summer Week Lire",
          views: 4954,
          date: "Jul 20, 2019",
          duration: "4:42",
          thumbnail: "9-edel-lire.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=m2fEa2ghJJo",
          title: "Grand Chase Kakao - Mermaid Dream Amy and Sol Fiesta Rufus",
          views: 4315,
          date: "Sep 6, 2019",
          duration: "6:23",
          thumbnail: "10-amy-rufus.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=tBC9yyZDvZo",
          title: "Grand Chase Kakao - Choco Fondue",
          views: 7180,
          date: "Feb 20, 2020",
          duration: "8:02",
          thumbnail: "11-choco-fondue.webp",
        },
        {
          url: "https://www.youtube.com/watch?v=8se0Vw-vWKI",
          title: "Grand Chase Kakao - Dark Brownie",
          views: 1800,
          date: "Mar 2, 2020",
          duration: "2:52",
          thumbnail: "12-dark-brownie.webp",
        },
      ],
    },
  },

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
