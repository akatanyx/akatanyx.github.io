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

/** Pixel size of a WebP, PNG or JPEG in /public, read from its header (no decoding). */
export function imageSize(src: string): { w: number; h: number } | undefined {
  let b: Buffer;
  try {
    b = fs.readFileSync(path.join(process.cwd(), "public", src));
  } catch {
    return undefined;
  }
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const kind = b.toString("ascii", 12, 16);
    if (kind === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (kind === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    if (kind === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  if (b.readUInt32BE(0) === 0x89504e47) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i < b.length - 9; ) {
      if (b[i] !== 0xff) return undefined;
      const marker = b[i + 1];
      if (marker >= 0xc0 && marker <= 0xc2) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return undefined;
}
