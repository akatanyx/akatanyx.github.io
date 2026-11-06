import type { View } from "@/lib/workMedia";

// Device frames have a see-through screen; `screen` is where it sits, in % of the frame,
// and `screenRatio` is the screen's own width / height.
export type Frame = {
  src: string;
  ratio: number;
  screenRatio: number;
  screen: { left: number; top: number; width: number; height: number };
};
export const frames: Partial<Record<View, Frame>> = {
  desktop: {
    src: "/devices/laptop.webp",
    ratio: 1284 / 747,
    screenRatio: 914 / 561,
    screen: { left: 14.408, top: 10.308, width: 71.184, height: 75.1 },
  },
  mobile: {
    src: "/devices/phone.webp",
    ratio: 498 / 903,
    screenRatio: 343 / 745,
    screen: { left: 15.663, top: 8.638, width: 68.876, height: 82.503 },
  },
};
