import fs from "node:fs";
import path from "node:path";

const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".avif"];
const videoExtensions = [".mp4", ".webm"];

/**
 * Look for a file in /public at build time, ignoring extension and letter case.
 * `findFile("/games/zzz/avatar", …)` -> "/games/zzz/Avatar.PNG" if that's what's on disk.
 * Returning the real file name matters: GitHub Pages URLs are case-sensitive, Windows isn't.
 */
function findFile(base: string, extensions: string[]) {
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

/** Every image in a /public folder, in natural file-name order (2.png before 10.png). */
export function listImages(dir: string) {
  let files: string[];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", dir));
  } catch {
    return [];
  }
  return files
    .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => `${dir}/${file}`);
}

export function findImage(base: string) {
  return findFile(base, imageExtensions);
}

export function findVideo(base: string) {
  return findFile(base, videoExtensions);
}
