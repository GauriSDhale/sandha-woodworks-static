export const sectors = [
  {
    id: "healthcare",
    number: "01",
    label: "Market",
    title: "Healthcare",
    description:
      "Hospital-grade millwork for every clinical, care and wellness environment.",
    subSectors: 7,
    href: "/sectors#healthcare",
    imageKey: "healthcare" as const,
  },
  {
    id: "education",
    number: "02",
    label: "Market",
    title: "Education",
    description:
      "K-12, post-secondary and lifelong-learning millwork built for a 20+ year life-cycle.",
    subSectors: 7,
    href: "/sectors#education",
    imageKey: "education" as const,
  },
  {
    id: "commercial",
    number: "03",
    label: "Market",
    title: "Commercial & Workplace",
    description:
      "Corporate, civic and financial fit-outs — reception through boardroom.",
    subSectors: 6,
    href: "/sectors#commercial",
    imageKey: "commercial" as const,
  },
  {
    id: "hospitality",
    number: "04",
    label: "Market",
    title: "Hospitality & Food Service",
    description:
      "Hotels, restaurants, QSR and entertainment venues — turnkey FOH and BOH millwork.",
    subSectors: 7,
    href: "/sectors#hospitality",
    imageKey: "hospitality" as const,
  },
  {
    id: "retail",
    number: "05",
    label: "Market",
    title: "Retail & Consumer",
    description:
      "Brand-consistent fixtures and store build-outs for national and multi-site rollouts.",
    subSectors: 7,
    href: "/sectors#retail",
    imageKey: "retail" as const,
  },
  {
    id: "residential",
    number: "06",
    label: "Market",
    title: "Residential",
    description:
      "High-rise condo, rental and purpose-built rental — lobbies, amenity floors and every unit.",
    subSectors: 5,
    href: "/sectors#residential",
    imageKey: "residential" as const,
  },
  {
    id: "public",
    number: "07",
    label: "Market",
    title: "Public & Community",
    description:
      "Community centres, libraries, museums and religious buildings — civic-grade millwork.",
    subSectors: 7,
    href: "/sectors#public",
    imageKey: "public" as const,
  },
  {
    id: "specialty",
    number: "08",
    label: "Market",
    title: "Specialty Projects",
    description:
      "Custom architectural millwork, industrial, transit and one-of-a-kind builds.",
    subSectors: 5,
    href: "/sectors#specialty",
    imageKey: "specialty" as const,
  },
] as const;

export const navSectorLinks = sectors.map((sector) => ({
  id: sector.id,
  href: sector.href,
  label: sector.title,
}));

export const sectorApprovals = [
  "General contractors & construction managers",
  "Developers & multi-res owner groups",
  "Architects & interior designers",
  "Healthcare, school-board & municipal procurement",
] as const;
