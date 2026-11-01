import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { Media } from "@/components/Media";
import { SplitShell } from "@/components/SplitShell";
import { games, type Game, type GameStatus } from "@/data/games";
import { formatDate } from "@/lib/site";

const statusStyle: Record<GameStatus, string> = {
  Playing: "bg-emerald-100 text-emerald-800",
  "On break": "bg-amber-100 text-amber-800",
  Dropped: "bg-rose-100 text-rose-800",
  Completed: "bg-sky-100 text-sky-800",
};

export function GameView({ game }: { game: Game }) {
  const [hero, ...rest] = game.images;
  // Two thumbnails under the main shot, as in the mockup.
  const thumbs = rest.length ? rest : [undefined, undefined];

  return (
    <SplitShell tone="deep" leftWidth="lg:w-[27%]" left={<GameStats game={game} />}>
      <div className="px-8 pt-20 pb-24 sm:px-14 lg:pt-10 lg:pr-28 lg:pl-20">
        <nav aria-label="Games" className="-mx-8 overflow-x-auto px-8 sm:mx-0 sm:px-0">
          <ul className="flex gap-8 text-sm whitespace-nowrap lg:justify-end lg:pr-12">
            {games.map((g) => {
              const active = g.slug === game.slug;
              return (
                <li key={g.slug}>
                  <Link
                    href={`/games/${g.slug}/`}
                    aria-current={active ? "page" : undefined}
                    className={`underline-offset-4 transition-opacity ${
                      active ? "underline" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {g.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-12 lg:mt-14 lg:pr-12">
          <Media src={hero} alt={`${game.name} screenshot`} className="aspect-[16/9] w-full bg-[#c4c4c4]" />
          <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {thumbs.map((src, i) => (
              <Media key={src ?? i} src={src} alt={`${game.name} screenshot ${i + 2}`} className="aspect-[16/9] w-full" />
            ))}
          </div>
        </div>
      </div>
    </SplitShell>
  );
}

function GameStats({ game }: { game: Game }) {
  return (
    <div className="flex flex-col gap-10 px-8 py-10 sm:px-14 lg:min-h-full lg:py-12">
      <BackLink href="/">Home</BackLink>

      <section className="lg:my-auto">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusStyle[game.status]}`}>
          {game.status}
        </span>
        <h1 className="mt-4 text-3xl leading-tight font-bold">{game.name}</h1>

        <div className="mt-6">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">{game.progressLabel}</span>
            <span className="text-neutral-500">{game.progress}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-neutral-200">
            <div className="h-full bg-black" style={{ width: `${game.progress}%` }} />
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
          <Stat label="Last played" value={formatDate(game.lastPlayed)} />
          <Stat label="Hours played" value={`${game.hoursPlayed.toLocaleString("en-US")} h`} />
          <Stat label="Started" value={formatDate(game.started)} />
          <Stat label="Platform" value={game.platform} />
        </dl>

        <div className="mt-8 border-l-2 border-black pl-4">
          <p className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
            {game.whyLeft ? "Why I left" : "Still playing"}
          </p>
          <p className="mt-1 text-sm leading-relaxed">{game.whyLeft ?? game.notes ?? "Still going."}</p>
        </div>

        {game.whyLeft && game.notes && (
          <p className="mt-6 text-sm leading-relaxed text-neutral-600">{game.notes}</p>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-[0.2em] text-neutral-500 uppercase">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
