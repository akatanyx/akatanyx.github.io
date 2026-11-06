import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { TransitionLink } from "@/components/TransitionLink";
import { UnavailableGrid } from "@/components/UnavailableGrid";
import { WhitePage } from "@/components/WhitePage";
import { cardGames as games } from "@/data/cardGames";
import { findImage } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Card Games | ${site.name}` };

export default function CardGamesPage() {
  return (
    <WhitePage title="Card Games">
      <BackLink href="/">Home</BackLink>

      <header className="enter-up mt-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold">Card Games</h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
            The trading card games I play and collect.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase">
            {games.length} {games.length === 1 ? "card game" : "card games"}
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

      {/* Locked for now: pressing one plays a "took damage" flash and says it's unavailable. */}
      <UnavailableGrid
        items={games.map((g) => ({ slug: g.slug, name: g.name, icon: findImage(`/card-games/${g.slug}/icon`) }))}
      />
    </WhitePage>
  );
}
