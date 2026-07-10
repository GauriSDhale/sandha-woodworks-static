export const featuredProjects = [
  {
    id: "lake-country",
    category: "Institutional",
    name: "Lake Country Co-op Leisure Centre",
    location: "Prince Albert, SK",
    href: "/portfolio",
    imageKey: "lakeCountry" as const,
  },
  {
    id: "am-hair",
    category: "Retail",
    name: "AM Hair & Beauty Salon",
    location: "Cambridge, ON",
    href: "/portfolio",
    imageKey: "amHair" as const,
  },
  {
    id: "valley-park",
    category: "Institutional",
    name: "Valley Park Library",
    location: "Hamilton, ON",
    href: "/portfolio",
    imageKey: "valleyPark" as const,
  },
] as const;

export const portfolioProjects = [
  {
    id: "coffee-island",
    category: "Restaurant/QSR",
    name: "Coffee Island Toronto",
    location: "Toronto, ON",
    scope:
      "Full turnkey build-out — kitchen/tech fit-out, custom feature ceilings, stainless service counter, back-bar millwork, retail display shelving, banquettes, and storefront graphics.",
    galleryCount: 9,
    imageKey: "coffeeIsland" as const,
  },
  {
    id: "niagara-college",
    category: "Education",
    name: "Niagara College — Marotta Family Innovation Complex",
    location: "Welland, ON",
    scope:
      "Institutional interior scope — feature perforated metal ceilings, signage wall, glass-walled study rooms, common-area casework, and lounge/cafeteria furniture package.",
    galleryCount: 6,
    imageKey: "niagaraCollege" as const,
  },
  {
    id: "robarts-library",
    category: "Education",
    name: "University of Toronto — Robarts Library Study Commons",
    location: "Toronto, ON",
    scope:
      "Heritage-sensitive architectural millwork — white oak column cladding, study carrels, upholstered banquette pods, reception casework, and integrated task lighting.",
    galleryCount: 5,
    imageKey: "robartsLibrary" as const,
  },
  {
    id: "tiffany-hill",
    category: "Education",
    name: "Tiffany Hill Primary School",
    location: "Ancaster, ON",
    scope:
      "K-8 school interior millwork — maple learning-stair bleachers, display cases, reception casework, classroom cabinetry, and STEAM/music/art zone feature walls.",
    galleryCount: 8,
    imageKey: "tiffanyHill" as const,
  },
  {
    id: "tobin-high",
    category: "Education",
    name: "Tobin High School",
    location: "Massachusetts, USA",
    scope:
      "Full high school interior millwork — auditorium acoustic wood panels, science lab casework, student lockers, main lobby reception desk, and corridor slat wood ceilings.",
    galleryCount: 9,
    imageKey: "tobinHigh" as const,
  },
  {
    id: "scooped",
    category: "Retail",
    name: "Scooped by Demetres",
    location: "Toronto, ON",
    scope:
      "Complete mall parlour build-out — arched storefront, custom tiled service counter, illuminated signage backing, back-of-house prep, and finish carpentry.",
    galleryCount: 7,
    imageKey: "scooped" as const,
  },
  {
    id: "mercato",
    category: "Restaurant/QSR",
    name: "Mercato Mississauga",
    location: "Mississauga, ON",
    scope:
      "Complete architectural millwork — arched wood portals, banquettes, custom bar, cane-panel screens, feature ceilings, wine displays, and washroom millwork.",
    galleryCount: 9,
    imageKey: "mercato" as const,
  },
  {
    id: "lake-country-full",
    category: "Institutional",
    name: "Lake Country Co-op Leisure Centre",
    location: "Prince Albert, SK",
    scope:
      "Architectural millwork package, feature walls, casework, reception & public areas. Client: Atkar North America",
    galleryCount: 3,
    imageKey: "lakeCountry" as const,
  },
  {
    id: "am-hair-full",
    category: "Retail",
    name: "AM Hair And Beauty Salon",
    location: "Cambridge, ON",
    scope: "Retail fixtures, custom stations, reception & display millwork.",
    galleryCount: 3,
    imageKey: "amHair" as const,
  },
  {
    id: "valley-park-full",
    category: "Institutional",
    name: "Valley Park Library",
    location: "Hamilton, ON",
    scope:
      "Library casework, circulation, feature millwork, stack & admin areas. Client: Atkar North America",
    galleryCount: 3,
    imageKey: "valleyPark" as const,
  },
] as const;

export const portfolioFilters = [
  "All",
  "Healthcare",
  "Education",
  "Retail",
  "Hospitality",
  "Corporate",
  "Multi-Residential",
  "Institutional",
  "Restaurant/QSR",
  "Commercial Interiors",
] as const;
