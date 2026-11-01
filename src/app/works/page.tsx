import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { Media } from "@/components/Media";
import { SplitShell } from "@/components/SplitShell";
import { works } from "@/data/works";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Works — ${site.name}` };

export default function WorksPage() {
  return (
    <SplitShell
      leftWidth="lg:w-[30%]"
      left={
        <div className="flex flex-col gap-10 px-8 py-12 sm:px-14 lg:min-h-full">
          <BackLink href="/">Home</BackLink>
          <div className="lg:mt-auto lg:mb-auto">
            <h1 className="text-4xl font-bold">Works</h1>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">{site.intro}</p>
            <p className="mt-6 text-xs tracking-[0.3em] text-neutral-400 uppercase">
              {works.length} projects
            </p>
            <Link
              href="/games/"
              className="mt-8 inline-block border-b border-black pb-0.5 text-sm transition-opacity hover:opacity-60"
            >
              See my games →
            </Link>
          </div>
        </div>
      }
    >
      <div className="grid gap-x-10 gap-y-14 px-8 py-24 sm:grid-cols-2 sm:px-14 lg:pr-28 lg:pl-20 xl:grid-cols-3">
        {works.map((work) => (
          <Link key={work.slug} href={`/works/${work.slug}/`} className="group block">
            <div className="overflow-hidden">
              <Media
                src={work.images[0]}
                alt={work.title}
                className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold">{work.title}</h2>
              <span className="text-xs text-white/50">{work.year}</span>
            </div>
            <p className="text-xs text-white/60">{work.category}</p>
          </Link>
        ))}
      </div>
    </SplitShell>
  );
}
