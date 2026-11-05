import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { Media } from "@/components/Media";
import { TransitionLink } from "@/components/TransitionLink";
import { WhitePage } from "@/components/WhitePage";
import { games } from "@/data/games";
import { findImage } from "@/lib/images";
import { stagger } from "@/lib/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Games | ${site.name}` };

export default function GamesPage() {
  return (
    <WhitePage>
      <BackLink href="/">Home</BackLink>

      <header className="enter-up mt-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold">Games</h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
            What I’m playing, how far I’ve got, and what I think of it.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase">
            {games.length} {games.length === 1 ? "game" : "games"}
          </p>
          <TransitionLink
            href="/works/"
            variant="expand"
            className="mt-3 inline-block border-b border-black pb-0.5 transition-opacity hover:opacity-60"
          >
            See my works →
          </TransitionLink>
        </div>
      </header>

      {/* Laid out like a phone's app drawer: icon and name only. */}
      <ul className="mt-14 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
        {games.map((game, i) => (
          <li key={game.slug} className="enter-up" style={stagger(i + 1)}>
            <TransitionLink
              href={`/games/${game.slug}/`}
              variant="expand"
              className="group flex flex-col items-center gap-3 rounded-2xl p-3 text-center transition-colors duration-200 hover:bg-black/10 focus-visible:bg-black/10"
            >
              <Media
                src={findImage(`/games/${game.slug}/icon`)}
                alt=""
                className="aspect-square w-full max-w-24 rounded-[22%] shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
              />
              <h2 className="line-clamp-2 text-sm leading-tight">{game.name}</h2>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </WhitePage>
  );
}
