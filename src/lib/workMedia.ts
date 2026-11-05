import path from "node:path";
import { findImage, listImages } from "@/lib/images";

export type Screen = { label: string; src: string };

// Everything here reads public/works/<slug>/ at build time.

/** The card image: cover.png if there is one, otherwise the first image. */
export function workCover(slug: string) {
  return findImage(`/works/${slug}/cover`) ?? workGallery(slug)[0];
}

/** The project's images, minus the cover. */
export function workGallery(slug: string) {
  return listImages(`/works/${slug}`).filter((src) => !/\/cover\.[a-z]+$/i.test(src));
}

/** What a project's viewer can show: a site in a laptop, a site in a phone, or design pieces. */
export type View = "desktop" | "mobile" | "design";

/**
 * Images for each view, from subfolders of public/works/<slug>/: desktop/, mobile/ and design/.
 * Design pieces can also sit straight in the project folder. The file name becomes the label:
 * "1-home.png" -> "Home", "2-sign-in.png" -> "Sign In".
 */
export function workViews(slug: string): Record<View, Screen[]> {
  const design = screens(`/works/${slug}/design`);
  return {
    desktop: screens(`/works/${slug}/desktop`),
    mobile: screens(`/works/${slug}/mobile`),
    design: design.length ? design : workGallery(slug).map((src) => ({ src, label: labelFrom(src) })),
  };
}

function screens(dir: string): Screen[] {
  return listImages(dir).map((src) => ({ src, label: labelFrom(src) }));
}

function labelFrom(src: string) {
  const name = path.posix.basename(src).replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "");
  const words = name.split(/[-_ ]+/).filter(Boolean);
  return words.map((w) => w[0].toUpperCase() + w.slice(1)).join(" ") || "Page";
}
