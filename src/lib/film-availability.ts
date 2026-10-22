import { existsSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import { films, type GalleryFilm } from "@/data/content";

// Build-time inspection keeps a source-only checkout usable without large binaries.
// External viewing-copy URLs are deliberately supplied by the site owner.
export function getFilmsForDisplay(): GalleryFilm[] {
  const mediaRoot = resolve(process.cwd(), "public");
  const overrides: Record<string, string | undefined> = {
    boukra: process.env.BOUKRA_VIDEO_URL,
    oman: process.env.OMAN_VIDEO_URL,
  };
  return films.map((film) => {
    const external = overrides[film.id]?.trim();
    if (external) {
      const url = new URL(external);
      if (url.protocol !== "https:")
        throw new Error(`${film.id}: external film URL must use HTTPS.`);
      return { ...film, src: external, available: true };
    }
    const file = resolve(mediaRoot, `.${film.src}`);
    const insidePublic = file.startsWith(mediaRoot + sep);
    const available =
      insidePublic &&
      existsSync(file) &&
      statSync(file).isFile() &&
      statSync(file).size > 0;
    return { ...film, available };
  });
}
