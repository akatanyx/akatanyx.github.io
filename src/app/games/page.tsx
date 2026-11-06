import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { TransitionLink } from "@/components/TransitionLink";
import { UnavailableGrid } from "@/components/UnavailableGrid";
import { WhitePage } from "@/components/WhitePage";
import { games } from "@/data/games";
import { findImage } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Games | ${site.name}` };

export default function GamesPage() {
  return (
    <WhitePage title="Games">
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

      {/* Games with nothing written yet are locked: pressing one says it's unavailable. */}
      <UnavailableGrid
        items={games.map((g) => ({
          slug: g.slug,
          name: g.name,
          icon: findImage(`/games/${g.slug}/icon`),
          href: g.username || g.thoughts || g.agents ? `/games/${g.slug}/` : undefined,
        }))}
      />
    </WhitePage>
  );
}
