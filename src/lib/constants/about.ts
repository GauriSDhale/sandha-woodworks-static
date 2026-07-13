/** Structural about-page data. Copy lives in src/locales/{en,fr}/about.json */

export const timelineItems = [
  { id: "2014", year: "2014" },
  { id: "2018", year: "2018" },
  { id: "2022", year: "2022" },
  { id: "2023", year: "2023" },
  { id: "today", yearKey: "today" as const },
] as const;

export const certificationItems = [
  { id: "awmac", year: "2022" },
  { id: "ckca", year: "2022" },
  { id: "wmco", year: "2022" },
  { id: "iso", year: "2023" },
] as const;

export const missionVisionItems = ["mission", "vision", "quality"] as const;

export const valueItems = [
  "quality",
  "trust",
  "precision",
  "accountability",
  "innovation",
  "teamwork",
] as const;

export const whyChooseUsItems = [
  "singlePoint",
  "engineered",
  "national",
  "certified",
] as const;

export const teamMembers = [
  {
    id: "chamkaur-sandha",
    name: "Chamkaur Sandha",
    avatarKey: "chamkaurSandha" as const,
  },
  {
    id: "gurpreet-singh",
    name: "Gurpreet Singh",
    avatarKey: "gurpreetSingh" as const,
  },
  {
    id: "muhamed-mahmutovic",
    name: "Muhamed Mahmutovic",
    avatarKey: "muhamedMahmutovic" as const,
  },
  {
    id: "jayant-makkar",
    name: "Jayant Makkar",
    avatarKey: "jayantMakkar" as const,
  },
  {
    id: "trevor-guyatt",
    name: "Trevor Guyatt",
    avatarKey: "trevorGuyatt" as const,
  },
  {
    id: "manjinder-singh",
    name: "Manjinder Singh",
    avatarKey: "manjinderSingh" as const,
  },
  {
    id: "jugraj-singh",
    name: "Jugraj Singh",
    avatarKey: "jugrajSingh" as const,
  },
] as const;

export const careersCultureIds = [
  "competitivePay",
  "modernEquipment",
  "teamEnvironment",
  "growthPath",
] as const;

export const openPositionIds = [
  "project-manager",
  "microvellum-engineer",
  "cabinet-maker",
  "carpenter",
  "senior-wood-finisher",
] as const;

export type OpenPositionId = (typeof openPositionIds)[number];

/** Sector option IDs for the contact form. Labels live in contact.json. */
export const contactSectorIds = [
  "healthcare",
  "education",
  "retail",
  "hospitality",
  "corporate",
  "multiResidential",
  "government",
  "institutional",
  "restaurantQsr",
  "pharmacyClinic",
  "commercialInteriors",
  "other",
] as const;

export type ContactSectorId = (typeof contactSectorIds)[number];
