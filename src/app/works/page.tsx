import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { Media } from "@/components/Media";
import { TransitionLink } from "@/components/TransitionLink";
import { WhitePage } from "@/components/WhitePage";
import { clientWorks, practiceWorks, type Work } from "@/data/works";
import { workCover } from "@/lib/workMedia";
import { stagger } from "@/lib/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Works | ${site.name}` };

export default function WorksPage() {
  return (
    <WhitePage title="Works">
      <BackLink href="/">Home</BackLink>

      <header className="enter-up mt-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold">Works</h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">{site.intro}</p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase">{clientWorks.length} projects · {practiceWorks.length} practice</p>
          <TransitionLink
            href="/games/"
            variant="expand"
            className="mt-3 inline-block border-b border-black pb-0.5 transition-opacity hover:opacity-60"
          >
            See my games →
          </TransitionLink>
        </div>
      </header>

      <WorkGrid works={clientWorks} />

      {practiceWorks.length > 0 && (
        <section className="mt-24">
          <h2 className="enter-up text-xs tracking-[0.3em] text-neutral-400 uppercase">Practice</h2>
          <p className="enter-up mt-2 max-w-md text-sm text-neutral-600">
            Personal and study pieces, made to learn and try things out.
          </p>
          <WorkGrid works={practiceWorks} offset={clientWorks.length} />
        </section>
      )}
    </WhitePage>
  );
}

function WorkGrid({ works, offset = 0 }: { works: Work[]; offset?: number }) {
  return (
    <div className="mt-10 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {works.map((work, i) => (
        <TransitionLink
          key={work.slug}
          href={`/works/${work.slug}/`}
          variant="expand"
          className="enter-up group block"
          style={stagger(offset + i + 1)}
        >
          <div className="overflow-hidden">
            <Media
              src={workCover(work.slug)}
              alt={work.title}
              className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-semibold">{work.title}</h3>
            <span className="text-xs text-neutral-400">{work.year}</span>
          </div>
          <p className="text-xs text-neutral-500">{work.role}</p>
        </TransitionLink>
      ))}
    </div>
  );
}
