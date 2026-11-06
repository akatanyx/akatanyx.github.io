import { AgentGrid, type AgentWithImage } from "@/components/AgentGrid";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { BackLink } from "@/components/BackLink";
import { GameTabs } from "@/components/UnavailableGrid";
import { CopyButton } from "@/components/CopyButton";
import { Media } from "@/components/Media";
import { SplitShell } from "@/components/SplitShell";
import { games as allGames, toSlug, type Game } from "@/data/games";
import { findImage, findVideo } from "@/lib/images";
import { stagger } from "@/lib/motion";
import { formatDate } from "@/lib/site";

// On desktop the whole page fits the screen; only the agents list scrolls.
/** Which list a game page belongs to: Games, or Card Games (same layout, own folder). */
export type GameSection = { path: string; label: string; items: Game[] };
const gamesSection: GameSection = { path: "games", label: "Games", items: allGames };

export function GameView({ game, section = gamesSection }: { game: Game; section?: GameSection }) {
  const games = section.items;
  const dir = `/${section.path}/${game.slug}`;
  const video = findVideo(`${dir}/background`);
  const [hero, ...thumbs] = [1, 2, 3].map((n) => findImage(`${dir}/screenshot-${n}`));
  // S-rank first, then A-rank, each alphabetical.
  const agents = [...(game.agents ?? [])]
    .sort((a, b) => (a.rank === b.rank ? 0 : a.rank === "S" ? -1 : 1) || a.name.localeCompare(b.name))
    .map((agent) => ({
      ...agent,
      image: findImage(`${dir}/agents/${toSlug(agent.name)}`),
      elementIcon: findImage(`${dir}/types/${toSlug(agent.element)}`),
      roleIcon: findImage(`${dir}/types/${toSlug(agent.role)}`),
    }));

  return (
    <SplitShell
      tone="deep"
      leftWidth="lg:w-[36%]"
      scrollLeft={false}
      scrollRight={false}
      // Phones: just the profile, thoughts and agents for now.
      hideRightOnMobile
      left={<GameSide game={game} section={section} avatar={findImage(`${dir}/avatar`)} agents={agents} />}
    >
      <div
        className={`relative flex flex-col px-8 pt-20 pb-24 sm:px-14 lg:h-full lg:pt-10 lg:pr-28 lg:pb-12 lg:pl-16 ${
          video ? "min-h-[70vh]" : ""
        }`}
      >
        {video && <BackgroundVideo src={video} className="enter-zoom" />}

        <nav aria-label="Games" className="relative -mx-8 shrink-0 overflow-x-auto px-8 sm:mx-0 sm:px-0">
          <GameTabs
            current={game.slug}
            tabs={games.map((g) => ({
              slug: g.slug,
              name: g.name,
              href: `/${section.path}/${g.slug}/`,
              // Nothing written yet: locked, like on the list page.
              locked: !(g.username || g.thoughts || g.agents),
            }))}
          />
        </nav>

        {/* With a background video the right side is just the video; otherwise show screenshots. */}
        {!video && (
          <div className="mt-12 flex flex-col lg:mt-10 lg:min-h-0 lg:flex-1 lg:pr-12">
            <Media
              src={hero}
              alt={`${game.name} screenshot`}
              className="enter-zoom aspect-[16/9] w-full bg-[#c4c4c4] lg:aspect-auto lg:min-h-0 lg:flex-1"
            />
            <div className="mt-5 grid shrink-0 grid-cols-2 gap-5 sm:grid-cols-3">
              {thumbs.map((src, i) => (
                <Media
                  key={i}
                  src={src}
                  alt={`${game.name} screenshot ${i + 2}`}
                  className="enter-up aspect-[16/9] w-full"
                  style={stagger(i + 3)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </SplitShell>
  );
}

function GameSide({
  game,
  section,
  avatar,
  agents,
}: {
  game: Game;
  section: GameSection;
  avatar?: string;
  agents: AgentWithImage[];
}) {
  const stats = [
    game.lastPlayed && { label: "Last played", value: formatDate(game.lastPlayed) },
    game.hoursPlayed != null && { label: "Hours played", value: `${game.hoursPlayed.toLocaleString("en-US")} h` },
    game.started && { label: "Started", value: formatDate(game.started) },
    game.platform && { label: "Platform", value: game.platform },
  ].filter((s): s is { label: string; value: string } => Boolean(s));

  return (
    <div className="flex flex-col px-8 py-10 sm:px-14 lg:h-full lg:px-12 lg:py-10">
      <BackLink href={`/${section.path}/`}>{`Back to ${section.label}`}</BackLink>

      <div className="enter-up mt-8 flex shrink-0 items-center gap-4">
        {game.username && (
          <Media src={avatar} alt={`${game.username}'s profile picture`} className="h-16 w-16 shrink-0 rounded-full" />
        )}
        <div className="min-w-0">
          <h1 className={game.username ? "text-sm text-neutral-500" : "text-3xl font-bold"}>{game.name}</h1>
          {game.username && <p className="text-2xl leading-tight font-bold">{game.username}</p>}
          {game.accountLevel && <p className="text-sm text-neutral-500">{game.accountLevel}</p>}
          {!game.username && !game.thoughts && !game.agents && (
            <p className="mt-2 text-sm text-neutral-500">Nothing here yet.</p>
          )}
        </div>
      </div>

      {game.uid && (
        <div className="enter-up mt-4 shrink-0" style={stagger(1)}>
          <CopyButton label="UID" value={game.uid} />
        </div>
      )}

      {game.progress != null && (
        <div className="mt-6 shrink-0">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">{game.progressLabel}</span>
            <span className="text-neutral-500">{game.progress}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-neutral-200">
            <div className="h-full bg-black" style={{ width: `${game.progress}%` }} />
          </div>
        </div>
      )}

      {stats.length > 0 && (
        <dl className="mt-6 grid shrink-0 grid-cols-2 gap-x-6 gap-y-4 text-sm">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-[11px] tracking-[0.2em] text-neutral-500 uppercase">{s.label}</dt>
              <dd className="mt-1 font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {game.whyLeft && (
        <div className="mt-6 shrink-0 border-l-2 border-black pl-4">
          <p className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase">Why I left</p>
          <p className="mt-1 text-sm leading-relaxed">{game.whyLeft}</p>
        </div>
      )}

      {game.thoughts && (
        <section className="enter-up mt-7 shrink-0" style={stagger(2)}>
          <h2 className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase">Thoughts</h2>
          <div className="mt-2 space-y-2 text-[13px] leading-relaxed">
            {game.thoughts.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {agents.length > 0 && (
        <section className="enter-up mt-7 flex flex-col lg:min-h-0 lg:flex-1" style={stagger(3)}>
          <h2 className="shrink-0 text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
            Agents <span className="tracking-normal normal-case">({agents.length})</span>
          </h2>
          <AgentGrid agents={agents} />
        </section>
      )}
    </div>
  );
}
