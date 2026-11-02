import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { Media } from "@/components/Media";
import { TransitionLink } from "@/components/TransitionLink";
import { WhitePage } from "@/components/WhitePage";
import { works } from "@/data/works";
import { stagger } from "@/lib/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Works | ${site.name}` };

export default function WorksPage() {
  return (
    <WhitePage>
      <BackLink href="/">Home</BackLink>

      <header className="enter-up mt-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold">Works</h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">{site.intro}</p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase">{works.length} projects</p>
          <TransitionLink
            href="/games/"
            variant="expand"
            className="mt-3 inline-block border-b border-black pb-0.5 transition-opacity hover:opacity-60"
          >
            See my games →
          </TransitionLink>
        </div>
      </header>

      <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {works.map((work, i) => (
          <TransitionLink
            key={work.slug}
            href={`/works/${work.slug}/`}
            variant="expand"
            className="enter-up group block"
            style={stagger(i + 1)}
          >
            <div className="overflow-hidden">
              <Media
                src={work.images[0]}
                alt={work.title}
                className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold">{work.title}</h2>
              <span className="text-xs text-neutral-400">{work.year}</span>
            </div>
            <p className="text-xs text-neutral-500">{work.category}</p>
          </TransitionLink>
        ))}
      </div>
    </WhitePage>
  );
}
