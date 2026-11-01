import type { Metadata } from "next";
import { GameView } from "@/components/GameView";
import { games } from "@/data/games";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Games — ${site.name}` };

export default function GamesPage() {
  return <GameView game={games[0]} />;
}
