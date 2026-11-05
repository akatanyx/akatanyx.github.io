import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChannelShowcase } from "@/components/ChannelShowcase";
import { Media } from "@/components/Media";
import { Showcase } from "@/components/Showcase";
import { getWork, works } from "@/data/works";
import { workGallery, workViews } from "@/lib/workMedia";
import { stagger } from "@/lib/motion";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const work = getWork((await params).slug);
  return { title: work ? `${work.title} | ${site.name}` : site.name };
}

// The sidebar lives in ../layout.tsx; this is just the right side.
export default async function WorkPage({ params }: PageProps<"/works/[slug]">) {
  const work = getWork((await params).slug);
  if (!work) notFound();

  const meta = [work.role, work.year, work.tools?.join(", ")].filter(Boolean).join(" · ");
  if (work.channel) return <ChannelShowcase slug={work.slug} channel={work.channel} meta={meta} />;
  if (work.showcase) {
    return <Showcase title={work.title} meta={meta} views={work.showcase} items={workViews(work.slug, work.books)} />;
  }

  const images = workGallery(work.slug);
  // Always show three frames, like the mockup; missing ones are grey.
  const frames = [0, 1, 2].map((i) => images[i]);

  return (
    <article className="px-8 py-24 sm:px-14 lg:pr-36 lg:pl-20">
      <div className="grid grid-cols-3 gap-4 sm:gap-10 xl:gap-16">
        {frames.map((src, i) => (
          <Media
            key={i}
            src={src}
            alt={`${work.title} image ${i + 1}`}
            className="enter-up aspect-[5/9] w-full"
            style={stagger(i + 1)}
          />
        ))}
      </div>

      <div className="enter-up" style={stagger(4)}>
        <h1 className="mt-10 text-4xl font-bold">{work.title}</h1>
        <p className="mt-2 text-xs tracking-[0.25em] text-white/50 uppercase">{meta}</p>
        {work.description && (
          <p className="mt-5 max-w-3xl text-justify text-base leading-relaxed sm:text-lg">{work.description}</p>
        )}
      </div>

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

      {images.length > 3 && (
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {images.slice(3).map((src, i) => (
            <Media key={src} src={src} alt={`${work.title} image ${i + 4}`} className="w-full" />
          ))}
        </div>
      )}
    </article>
  );
}
