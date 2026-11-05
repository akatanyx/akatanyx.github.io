import type { Channel } from "@/data/works";
import { listImages } from "@/lib/images";
import { stagger } from "@/lib/motion";
import { asset } from "@/lib/site";

/** Pull the video ID out of youtube.com/watch?v=…, youtu.be/…, /shorts/… or /embed/… links. */
function videoId(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/|\/shorts\/|\/embed\/)([\w-]{11})/);
  return m?.[1];
}

/** 26680 -> "26K views", 1234567 -> "1.2M views", like YouTube. */
function viewsText(n: number) {
  const short = n >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.floor(n / 1e3)}K` : String(n);
  return `${short} ${n === 1 ? "view" : "views"}`;
}

/**
 * A project shown as a YouTube channel: name and stats, then a grid of the real
 * videos with the thumbnails designed for them. Each card opens the video on YouTube.
 */
export function ChannelShowcase({ slug, channel, meta }: { slug: string; channel: Channel; meta: string }) {
  const dir = `/works/${slug}`;
  const folderThumbs = listImages(`${dir}/thumbnails`);

  // Most-viewed first; videos without a count keep their order at the end.
  const videos = [...channel.videos].sort((a, b) => (b.views ?? -1) - (a.views ?? -1)).map((v, i) => {
    const id = videoId(v.url);
    const thumb = v.thumbnail
      ? `${dir}/thumbnails/${v.thumbnail}`
      : (folderThumbs[i] ?? (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined));
    return { ...v, thumb, viewsLabel: v.views != null ? viewsText(v.views) : undefined };
  });
  // Before any links are added, show the thumbnails on their own so the grid isn't empty.
  const cards = videos.length ? videos : folderThumbs.map((thumb) => ({ thumb, url: "", title: undefined }));

  return (
    <div className="px-8 pt-24 pb-24 sm:px-14 lg:pt-10 lg:pr-28 lg:pl-16">
      <p className="enter-up text-xs tracking-[0.25em] text-white/50 uppercase">{meta}</p>

      <header className="enter-up mt-4 flex flex-wrap items-center gap-5" style={stagger(1)}>
        <div className="min-w-0 flex-1">
          {channel.url ? (
            // Clickable: underline and an outward arrow on hover, plus the arrow always shown faintly.
            <a
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              title={`Open ${channel.name} on YouTube`}
              className="group/name inline-flex items-center gap-2 underline-offset-4 hover:underline"
            >
              <h1 className="text-3xl font-bold">{channel.name}</h1>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white/40 transition group-hover/name:translate-x-0.5 group-hover/name:-translate-y-0.5 group-hover/name:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden
              >
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <h1 className="text-3xl font-bold">{channel.name}</h1>
          )}
          <p className="mt-1 text-sm text-white/60">
            {[channel.handle, channel.subscribers && `${channel.subscribers} subscribers`, `${channel.videos.length || cards.length} videos`]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </header>

      <nav aria-hidden className="enter-up mt-6 flex gap-6 border-b border-white/10 text-sm" style={stagger(2)}>
        <span className="pb-3 text-white/50">Home</span>
        <span className="border-b-2 border-white pb-3 font-medium">Videos</span>
      </nav>

      <div className="mt-6 grid gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
        {(cards.length ? cards : Array.from({ length: 6 }, () => null)).map((v, i) => {
          const card = (
            <>
              <div className="relative overflow-hidden rounded-xl bg-black/25">
                {v?.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer
                  <img
                    src={v.thumb.startsWith("http") ? v.thumb : asset(v.thumb)}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="grid aspect-video place-items-center text-xs text-white/40">Coming soon</div>
                )}
                {v && "duration" in v && v.duration && (
                  <span className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium">
                    {v.duration}
                  </span>
                )}
                {v?.url && (
                  <span className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                    <svg viewBox="0 0 68 48" className="h-10 w-14" aria-hidden>
                      <rect width="68" height="48" rx="12" fill="#ff0033" />
                      <path d="M27 15v18l16-9z" fill="#fff" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="mt-3">
                <p className="line-clamp-2 text-sm leading-snug font-semibold">{v?.title ?? "Video title"}</p>
                <p className="mt-1 text-xs text-white/55">{channel.name}</p>
                {v && "views" in v && (v.views || v.date) && (
                  <p className="text-xs text-white/55">{[v.viewsLabel, v.date].filter(Boolean).join(" · ")}</p>
                )}
              </div>
            </>
          );
          return v?.url ? (
            <a key={i} href={v.url} target="_blank" rel="noreferrer" className="enter-up group block" style={stagger(3 + i)}>
              {card}
            </a>
          ) : (
            <div key={i} className="enter-up group" style={stagger(3 + i)}>
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}
