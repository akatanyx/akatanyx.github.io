import type { CSSProperties } from "react";

/** Staggers an .enter-* animation: item i starts 70ms after item i-1. */
export function stagger(i: number) {
  return { "--i": i } as CSSProperties;
}
