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

export const careersCulture = [
  {
    title: "Competitive Pay",
    description: "Trade wages that reflect experience and skill.",
  },
  {
    title: "Modern Equipment",
    description: "Multi-axis CNC, dedicated finishing, engineered workflow.",
  },
  {
    title: "Team Environment",
    description: "A supportive shop floor and office.",
  },
  {
    title: "Growth Path",
    description: "Training and advancement opportunities.",
  },
] as const;

export const openPositions = [
  {
    title: "Project Manager — Millwork",
    meta: "Full-time · Permanent · Brantford, ON N3R 7K1",
    description:
      "Lead architectural millwork projects from award through installation — coordinating engineering, production, subcontractors, and site teams to deliver on scope, budget, and schedule.",
  },
  {
    title: "Microvellum Engineer / Millwork CAD Specialist",
    meta: "Full-time · Permanent · Brantford, ON",
    description:
      "Engineer architectural millwork in Microvellum — from shop drawings to CNC-ready output — for high-end commercial, institutional, and retail projects.",
  },
  {
    title: "Cabinet Maker",
    meta: "Full-time · Permanent · Brantford, ON",
    description:
      "Build high-end architectural cabinetry and casework in our Brantford shop, working from Microvellum shop drawings and CNC-cut components.",
  },
  {
    title: "Carpenter",
    meta: "Full-time · Permanent · Brantford, ON (with travel to job sites)",
    description:
      "Install architectural millwork and casework on commercial, institutional, and retail sites across Ontario.",
  },
  {
    title: "Senior Wood Finisher / Spray Booth Specialist",
    meta: "Full-time · Permanent · Brantford, ON",
    description:
      "Apply high-end wood finishes and coatings in a dedicated spray booth environment for architectural millwork, custom cabinetry, and commercial casework.",
  },
] as const;

export const contactSectors = [
  "Healthcare",
  "Education",
  "Retail",
  "Hospitality",
  "Corporate",
  "Multi-Residential",
  "Government",
  "Institutional",
  "Restaurant / QSR",
  "Pharmacy / Clinic",
  "Commercial Interiors",
  "Other",
] as const;
