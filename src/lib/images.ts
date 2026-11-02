import fs from "node:fs";
import path from "node:path";

const extensions = [".png", ".jpg", ".jpeg", ".webp", ".avif"];

/**
 * Look for an image in /public at build time, ignoring extension and letter case.
 * `findImage("/games/zzz/avatar")` -> "/games/zzz/Avatar.PNG" if that's what's on disk.
 * Returning the real file name matters: GitHub Pages URLs are case-sensitive, Windows isn't.
 */
export function findImage(base: string) {
  const dir = path.posix.dirname(base);
  const wanted = path.posix.basename(base).toLowerCase();
  let files: string[];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", dir));
  } catch {
    return undefined;
  }
  const match = files.find((file) => {
    const ext = path.extname(file);
    return extensions.includes(ext.toLowerCase()) && path.basename(file, ext).toLowerCase() === wanted;
  });
  return match ? `${dir}/${match}` : undefined;
}
