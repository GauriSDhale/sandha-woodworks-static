import { pageMedia, projectGalleries } from "@/lib/constants/media";
import { getSubsectorGallery } from "@/lib/constants/subsector-galleries";
import type { SubSectorStatement } from "@/lib/constants/sub-sector-statements";

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

function toAbsolute(path: string, origin: string) {
  if (path.startsWith("http")) return path;
  return `${origin}${path}`;
}

/**
 * Resolve statement images from local sub-sector galleries
 * (same assets as live `/assets/subsectors/...`).
 */
export function getStatementImages(sub: SubSectorStatement, origin: string) {
  const gallery = getSubsectorGallery(sub.slug);
  const hero = poolHeroes[sub.poolKey];

  let pool = gallery.length > 0 ? [...gallery] : [];
  if (hero) pool = [hero, ...pool.filter((p) => p !== hero)];

  // Fallback if a slug somehow has no gallery
  if (pool.length === 0) {
    pool = [
      pageMedia.aboutFacilityInterior,
      pageMedia.portfolioHero,
      ...Object.values(projectGalleries).flatMap((g) => g.gallery.slice(0, 3)),
    ];
  }

  // Repeat to fill layout slots (live repeats short galleries)
  const filled: string[] = [];
  for (let i = 0; i < 30; i++) filled.push(pool[i % pool.length]);

  const offset = ((sub.poolOffset % filled.length) + filled.length) % filled.length;
  const rotated = [...filled.slice(offset), ...filled.slice(0, offset)];

  return rotated.slice(0, 20).map((src) => toAbsolute(src, origin));
}
