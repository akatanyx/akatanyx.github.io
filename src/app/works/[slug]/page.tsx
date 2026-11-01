import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Media } from "@/components/Media";
import { SplitShell } from "@/components/SplitShell";
import { getWork, works } from "@/data/works";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const work = getWork((await params).slug);
  return { title: work ? `${work.title} — ${site.name}` : site.name };
}

export default async function WorkPage({ params }: PageProps<"/works/[slug]">) {
  const work = getWork((await params).slug);
  if (!work) notFound();

  // Always show three frames, like the mockup; missing ones are grey.
  const frames = [0, 1, 2].map((i) => work.images[i]);

  return (
    <SplitShell
      leftWidth="lg:w-[29%]"
      left={
        <div className="px-8 py-10 sm:px-14 lg:py-12">
          <BackLink href="/works/">Back to Works</BackLink>
          <ul className="-mx-8 mt-8 flex gap-6 overflow-x-auto px-8 pb-2 sm:-mx-14 sm:px-14 lg:mx-0 lg:mt-12 lg:flex-col lg:gap-8 lg:overflow-visible lg:px-0">
            {works.map((w) => {
              const active = w.slug === work.slug;
              return (
                <li key={w.slug} className="min-w-[240px] lg:min-w-0">
                  <Link
                    href={`/works/${w.slug}/`}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-start gap-7 transition-opacity ${
                      active ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <Media src={w.images[0]} alt="" className="h-14 w-14 shrink-0" />
                    <div>
                      <p className="text-lg leading-tight font-bold">{w.title}</p>
                      <p className="mt-1 text-[11px] leading-snug">{w.summary}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      }
    >
      <article className="px-8 py-24 sm:px-14 lg:pr-36 lg:pl-20">
        <div className="grid grid-cols-3 gap-4 sm:gap-10 xl:gap-16">
          {frames.map((src, i) => (
            <Media key={i} src={src} alt={`${work.title} — image ${i + 1}`} className="aspect-[5/9] w-full" />
          ))}
        </div>

        <h1 className="mt-10 text-4xl font-bold">{work.title}</h1>
        <p className="mt-2 text-xs tracking-[0.25em] text-white/50 uppercase">
          {work.category} · {work.year} · {work.tools.join(", ")}
        </p>
        <p className="mt-5 max-w-3xl text-justify text-base leading-relaxed sm:text-lg">
          {work.description}
        </p>
        {work.url && (
          <a
            href={work.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block border-b border-white pb-0.5 text-sm transition-opacity hover:opacity-60"
          >
            View live →
          </a>
        )}

        {work.images.length > 3 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {work.images.slice(3).map((src, i) => (
              <Media key={src} src={src} alt={`${work.title} — image ${i + 4}`} className="w-full" />
            ))}
          </div>
        )}
      </article>
    </SplitShell>
  );
}
