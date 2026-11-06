import type { Book, View } from "@/lib/workMedia";

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
  /** Tools for the Graphic Design view, when they differ from `tools` (the web stack). */
  designTools?: string[];
  /** File names to leave off the Works card cover, e.g. ["instagram-promotion"]. */
  coverSkip?: string[];
  /** In the laptop/phone, shrink each whole screenshot to fit the screen instead of scrolling. */
  fitHeight?: boolean;
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
  books?: Book[];
  /** Show the project as a YouTube channel page: header, then a grid of real videos. */
  channel?: Channel;
};

// Images are picked up automatically from public/works/<slug>/ (png, jpg or webp):
// cover.png is the card image, and 1.png, 2.png, 3.png, … fill the project page.
// No need to list them here.
// Add `practice: true` to put a piece in the Practice section.
export const works: Work[] = [
  {
    slug: "reverie-cards",
    title: "Reverie Cards",
    role: "Web Developer and Graphic Designer",
    year: "2026",
    tools: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    designTools: ["Figma"],
    showcase: ["desktop", "mobile", "design"],
    books: ["catalogue"],
    description:
      "It's my own trading card shop in Yogyakarta, importing hard-to-find Japanese card game products for local players. I built the website so customers can browse singles and sets, follow pre-orders, tournament schedules and news, then check out with QRIS, bank transfer or store points.",
  },
  {
    slug: "xollexio",
    title: "Xollexio",
    role: "Web Developer",
    year: "2026",
    tools: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    showcase: ["desktop", "mobile"],
    description:
      "It's a two-sided marketplace for trading cards, covering over 73,500 cards. You can sell in six different ways, including auctions and fixed-price listings. I built the API routes and data models, with Google sign-in, payment verification, live auctions, chat and an admin panel.",
  },
  {
    slug: "hobbystation-hideout",
    title: "Hobbystation Hideout",
    role: "Graphic Designer",
    year: "2021-2025",
    tools: ["Figma"],
    coverSkip: ["instagram-promotion"],
    showcase: ["design"],
    description:
      "This one was posters I made for my own business. The design might vary from one to another due to me improving my design each year, although I cannot pinpoint what year it is, but it covers most of my design style changes.",
  },
  {
    slug: "nash-sy",
    title: "Nash Sy",
    role: "Web Developer and Graphic Designer",
    year: "2023-2024",
    tools: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    designTools: ["Figma"],
    showcase: ["desktop", "mobile", "design"],
    description:
      "It's a game top-up platform, the orders are fulfilled automatically with Midtrans payments and in-game purchase validations. I also built the admin panel for accounting, reports and user management, plus price syncing and exchange rates.",
  },
  {
    slug: "mak-semarangan",
    title: "Mak Semarangan",
    role: "Promotional Graphic Design",
    year: "2024-2026",
    tools: ["CorelDRAW"],
    showcase: ["design"],
    books: [{ name: "menu-book", cover: false }],
  },
  { slug: "lapisqoe", title: "LapisQoe", role: "Promotional Graphic Design", year: "2025", showcase: ["design"] },
  {
    slug: "project-hunter-dn",
    title: "Project Hunter DN",
    role: "Website Design and Launcher Design",
    year: "2025",
    tools: ["Figma"],
    showcase: ["desktop"],
    description:
      "My website design for them was paid for but never used. They used the launcher I designed for their game instead. Since it was never used, it was never polished and more of a draft of an idea.",
  },
  {
    slug: "code-saga-dn",
    title: "Code Saga DN",
    role: "Website Design and Launcher Design",
    year: "2025",
    tools: ["Figma"],
    showcase: ["desktop"],
  },
  {
    slug: "linlinzy",
    title: "Linlinzy",
    role: "YouTube Thumbnail",
    year: "2019-2020",
    tools: ["Adobe Photoshop"],
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
    slug: "pricing-practice",
    practice: true,
    title: "Pricing Practice",
    showcase: ["desktop"],
    summary: "Cloud deployment web for cloud computing assignment",
    role: "Web design",
    year: "2023",
    tools: ["Figma", "Next.js"],
    description:
      "A landing page and dashboard for deploying small apps to the cloud. I designed the layout and visual system in Figma, then built the front end.",
  },
  {
    slug: "food-delivery-app",
    practice: true,
    title: "Food Delivery App",
    showcase: ["mobile"],
    summary: "Authentication page for software engineering task",
    role: "App design",
    year: "2023",
    tools: ["Figma"],
    description: "Sign-in and sign-up flow for a food ordering app, focused on a short, friendly onboarding.",
  },
  {
    slug: "e-wallet-app",
    practice: true,
    title: "E-wallet App",
    showcase: ["mobile"],
    summary: "E-Wallet system for software engineering assignment",
    role: "App design",
    year: "2023",
    tools: ["Figma"],
    description:
      "It's an attempt to make an E-wallet system, the color was heavily referencing DANA E-wallet. It was a practice I made around 2023 too.",
  },
  {
    slug: "logistics",
    practice: true,
    title: "Logistics App",
    showcase: ["mobile"],
    summary: "App mockup made for software engineering method task",
    role: "App design",
    year: "2023",
    tools: ["Figma"],
    description: "This was just a practice, not to be substituted with real system.",
  },
  {
    slug: "healthcare-app",
    practice: true,
    title: "Healthcare App",
    showcase: ["mobile"],
    summary: "Made for software engineering assignment",
    role: "App design",
    year: "2023",
    tools: ["Figma"],
    description:
      "I made this design originally for my ex, but she never used it. It's an app to track your health and fitness. It was more of a practice, and its one of the earliest designs I did. Not the best, but I started somewhere.",
  },
];

export const clientWorks = works.filter((w) => !w.practice);
export const practiceWorks = works.filter((w) => w.practice);

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}
