import type { Game } from "@/data/games";

// Same shape as games.ts; images go in public/card-games/<slug>/ (icon.png etc.).
export const cardGames: Game[] = [
  { slug: "cardfight-vanguard", name: "Cardfight!! Vanguard" },
  { slug: "one-piece-card-game", name: "One Piece Card Game" },
  { slug: "digimon-card-game", name: "Digimon Card Game" },
  { slug: "hololive-official-card-game", name: "Hololive Official Card Game" },
  { slug: "yu-gi-oh", name: "Yu-Gi-Oh" },
  { slug: "shadowverse-worlds-beyond", name: "Shadowverse Worlds Beyond" },
  { slug: "union-arena", name: "Union Arena" },
];
