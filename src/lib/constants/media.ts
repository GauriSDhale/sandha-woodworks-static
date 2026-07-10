export const MEDIA_ORIGIN = "https://sandhawoodworks.ca";

/** Resolve a path from sandhawoodworks.ca or pass through absolute URLs unchanged. */
export function media(path: string) {
  return path.startsWith("http") ? path : `${MEDIA_ORIGIN}${path}`;
}

export const brandMedia = {
  logo: media(
    "/__l5e/assets-v1/283177b2-0b7c-4075-b0d2-b521a34a17c0/sandha-logo-transparent.png",
  ),
  favicon: media(
    "/__l5e/assets-v1/0a726b06-52f9-4f54-8206-e2fabddcc166/sw-favicon.png",
  ),
  canadaFlag: media(
    "/__l5e/assets-v1/66032763-d9ef-4fab-9e18-e80afafac860/canada-flag.png",
  ),
} as const;

export const heroMedia = {
  factoryVideo: media(
    "/__l5e/assets-v1/ecb8a4be-0a32-400a-a5d3-13f9ccc86460/hero-factory.mp4",
  ),
} as const;

export const pageMedia = {
  aboutHero: "/assets/about/about-hero.jpg",
  aboutFacilityInterior: "/assets/about/facility-interior.jpg",
  aboutTeam: "/assets/about/team.webp",
  facilityAerial: media("/assets/facility-aerial-FzX6W9yA.jpg"),
  portfolioHero: "/assets/portfolio/portfolio-bg.jpg",
  servicesHero: media("/assets/corp-inst-hero.jpg"),
  sectorsHero: media("/assets/corp-inst-hero.jpg"),
  careersHero: media("/assets/about-hero-workshop-C9Oup6mp.jpg"),
  contactHero: media("/assets/corp-inst-hero.jpg"),
} as const;

/** Home sector cards — same Unsplash URLs used on sandhawoodworks.ca */
export const homeSectorMedia = {
  healthcare:
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=85&auto=format&fit=crop",
  retail:
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=85&auto=format&fit=crop",
  hospitality:
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=85&auto=format&fit=crop",
  corporate:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85&auto=format&fit=crop",
  education:
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&q=85&auto=format&fit=crop",
  institutional:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=85&auto=format&fit=crop",
} as const;

export const sectorMedia = {
  healthcare: media("/assets/healthcare-hero.jpg"),
  education: media("/assets/education-hero.jpg"),
  commercial: media("/assets/corp-inst-hero.jpg"),
  hospitality: media("/assets/hospitality-hero.jpg"),
  retail: media("/assets/retail-millwork-hero.jpg"),
  residential: media("/assets/multi-res-hero.jpg"),
  public: media("/assets/sector-library.jpg"),
  specialty: media("/assets/custom-assembly-hero.jpg"),
} as const;

export const projectMedia = {
  coffeeIsland: "/assets/portfolio/coffee-island.jpg",
  niagaraCollege: "/assets/portfolio/niagara-college.webp",
  robartsLibrary: "/assets/portfolio/robarts-library.webp",
  tiffanyHill: "/assets/portfolio/tiffany-hill.jpg",
  tobinHigh: "/assets/portfolio/tobin-high.jpg",
  scooped: "/assets/portfolio/scooped.jpg",
  mercato: "/assets/portfolio/mercato.jpg",
  lakeCountry: "/assets/portfolio/lake-country.jpg",
  amHair: "/assets/portfolio/am-hair.webp",
  valleyPark: "/assets/portfolio/valley-park.jpg",
} as const;

export const teamMedia = {
  chamkaurSandha: "/assets/about/team/chamkaur-sandha.png",
  gurpreetSingh: "/assets/about/team/gurpreet-singh.png",
  muhamedMahmutovic: "/assets/about/team/muhamed-mahmutovic.png",
  jayantMakkar: "/assets/about/team/jayant-makkar.png",
  trevorGuyatt: "/assets/about/team/trevor-guyatt.png",
  manjinderSingh: "/assets/about/team/manjinder-singh.png",
  jugrajSingh: "/assets/about/team/jugraj-singh.png",
} as const;

export const careersMedia = {
  president: teamMedia.chamkaurSandha,
  shopFloor: pageMedia.aboutFacilityInterior,
} as const;
