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

      <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game, i) => {
          const dir = `/games/${game.slug}`;
          const cover = findImage(`${dir}/cover`) ?? findImage(`${dir}/screenshot-1`);
          return (
            <TransitionLink
              key={game.slug}
              href={`/games/${game.slug}/`}
              variant="expand"
              className="enter-right group block"
              style={stagger(i + 1)}
            >
              <div className="overflow-hidden">
                <Media
                  src={cover}
                  alt={game.name}
                  className="aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{game.name}</h2>
              <p className="text-xs text-neutral-500">
                {[game.accountLevel, game.agents && `${game.agents.length} agents`].filter(Boolean).join(" · ")}
              </p>
            </TransitionLink>
          );
        })}
      </div>
    </WhitePage>
  );
}
