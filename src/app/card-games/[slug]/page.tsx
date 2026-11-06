import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameView } from "@/components/GameView";
import { cardGames } from "@/data/cardGames";
import { site } from "@/lib/site";

export const dynamicParams = false;

const section = { path: "card-games", label: "Card Games", items: cardGames };
const find = (slug: string) => cardGames.find((g) => g.slug === slug);

export function generateStaticParams() {
  return cardGames.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/card-games/[slug]">): Promise<Metadata> {
  const game = find((await params).slug);
  return { title: game ? `${game.name} | ${site.name}` : site.name };
}

export default async function CardGamePage({ params }: PageProps<"/card-games/[slug]">) {
  const game = find((await params).slug);
  if (!game) notFound();
  return <GameView game={game} section={section} />;
}
