import { pageMedia, projectGalleries } from "@/lib/constants/media";
import { getSubsectorGallery } from "@/lib/constants/subsector-galleries";
import type { SubSectorStatementMeta } from "@/lib/constants/sub-sector-statements";

/** Optional category hero placed first when present locally. */
const poolHeroes: Record<string, string> = {
  healthcare: "/assets/healthcare-hero.jpg",
  education: "/assets/education-hero.jpg",
  hospitality: "/assets/hospitality-hero.jpg",
  retail: "/assets/retail-millwork-hero.jpg",
  restaurant: "/assets/restaurant-qsr-hero.jpg",
  qsr: "/assets/restaurant-qsr-hero.jpg",
  corp: "/assets/corp-inst-hero.jpg",
  multiRes: "/assets/multi-res-hero.jpg",
  pharmacy: "/assets/pharmacy-millwork.jpg",
};

/** Keep PDF generation fast — @react-pdf embeds every image. */
export const PDF_IMAGE_SLOT_COUNT = 10;

/**
 * Resolve unique local image paths for a statement (relative `/assets/...`).
 */
export function getStatementImagePaths(sub: SubSectorStatementMeta): string[] {
  const gallery = getSubsectorGallery(sub.slug).filter((p) => !p.toLowerCase().endsWith(".webp"));
  const hero = poolHeroes[sub.poolKey];

  let pool = [...gallery];
  if (hero) pool = [hero, ...pool.filter((p) => p !== hero)];

  if (pool.length === 0) {
    pool = [
      pageMedia.aboutFacilityInterior,
      pageMedia.portfolioHero,
      ...Object.values(projectGalleries).flatMap((g) => g.gallery.slice(0, 3)),
    ].filter((p) => !p.startsWith("http"));
  }

  // Rotate by poolOffset for variety, then take unique slots
  const offset = pool.length ? ((sub.poolOffset % pool.length) + pool.length) % pool.length : 0;
  const rotated = [...pool.slice(offset), ...pool.slice(0, offset)];

  const unique: string[] = [];
  for (const src of rotated) {
    if (!unique.includes(src)) unique.push(src);
    if (unique.length >= PDF_IMAGE_SLOT_COUNT) break;
  }

  // Pad by repeating so layout indexes always resolve
  const base = unique.length > 0 ? unique : pool;
  while (unique.length < PDF_IMAGE_SLOT_COUNT && base.length > 0) {
    unique.push(base[unique.length % base.length]);
  }

  return unique;
}

/** @deprecated use getStatementImagePaths + loadImagesAsDataUrls */
export function getStatementImages(sub: SubSectorStatementMeta, origin: string) {
  return getStatementImagePaths(sub).map((src) =>
    src.startsWith("http") ? src : `${origin}${src}`,
  );
}

const MAX_EDGE = 1100;
const JPEG_QUALITY = 0.72;

/**
 * Fetch local images and convert to resized JPEG data URLs.
 * Reliable for @react-pdf (no WebP, no CORS, smaller payloads).
 */
export async function loadImagesAsDataUrls(paths: string[]): Promise<string[]> {
  const results = await Promise.all(
    paths.map(async (path) => {
      try {
        return await pathToJpegDataUrl(path);
      } catch (err) {
        console.warn("PDF image failed:", path, err);
        return null;
      }
    }),
  );

  const ok = results.filter((v): v is string => Boolean(v));
  if (ok.length === 0) {
    throw new Error("Could not load any images for the capability statement.");
  }

  // Fill failed slots with the first good image so layout never blanks
  return results.map((v) => v ?? ok[0]);
}

async function pathToJpegDataUrl(path: string): Promise<string> {
  const src = path.startsWith("http") ? path : path;
  const response = await fetch(src);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}
