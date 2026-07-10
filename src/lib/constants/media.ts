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
  portfolioHero: media(
    "/__l5e/assets-v1/cea20f69-8f54-4090-8c27-09d9a27307a5/portfolio-bg.jpg",
  ),
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

const wix = (id: string, ext: "jpg" | "webp", height = 800) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_1200,h_${height},al_c,q_85,enc_avif,quality_auto/${id}`;

export const projectMedia = {
  coffeeIsland: media(
    "/__l5e/assets-v1/56b4d086-c5ff-44f8-b5f9-d76f92e932df/IMG_2890.jpg",
  ),
  niagaraCollege: media(
    "/__l5e/assets-v1/54d5458b-2a70-47c1-b4b9-8848a0da6601/nc-1.webp",
  ),
  robartsLibrary: media(
    "/__l5e/assets-v1/124093b1-dbd4-45f2-8a66-74d95f23cd87/uoft-2.webp",
  ),
  tiffanyHill: media("/__l5e/assets-v1/0fe602d9-ea1c-43dd-9cbf-2cb8531ea75c/th-4.jpg"),
  tobinHigh: media(
    "/__l5e/assets-v1/fa8ad471-1ba7-4fa1-88ef-7d7a5ec94b14/tobin-9_2.jpg",
  ),
  scooped: media("/__l5e/assets-v1/47db3c2a-ddc5-4847-b383-bad043b45df6/IMG_2820.jpg"),
  mercato: media("/__l5e/assets-v1/3a65027f-e096-4b79-912e-ad345559312b/mercato-2.jpg"),
  lakeCountry: wix("86fc72_fa6d8a586ae641ff993e72bbb9835cc9~mv2.jpg", "jpg"),
  amHair: wix("86fc72_28f1cf8a0989418ca6b885defc2d6614~mv2.webp", "webp"),
  valleyPark: wix("86fc72_34201e169b154675b465b969ac93323a~mv2.jpg", "jpg"),
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
