import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameView } from "@/components/GameView";
import { games, getGame } from "@/data/games";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/games/[slug]">): Promise<Metadata> {
  const game = getGame((await params).slug);
  return { title: game ? `${game.name} — ${site.name}` : site.name };
}

export default async function GamePage({ params }: PageProps<"/games/[slug]">) {
  const game = getGame((await params).slug);
  if (!game) notFound();
  return <GameView game={game} />;
}
