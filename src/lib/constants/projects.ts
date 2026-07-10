export interface PortfolioProject {
  id: string;
  slug: string;
  category: string;
  name: string;
  location: string;
  scope: string;
  galleryCount: number;
  imageKey: string;
  videoUrl?: string;
  specs: {
    sector: string;
    delivery: string;
    finish: string;
    materials: string[];
  };
}

export const featuredProjects = [
  {
    id: "lake-country",
    slug: "lake-country",
    category: "Institutional",
    name: "Lake Country Co-op Leisure Centre",
    location: "Prince Albert, SK",
    href: "/portfolio",
    imageKey: "lakeCountry" as const,
  },
  {
    id: "am-hair",
    slug: "am-hair",
    category: "Retail",
    name: "AM Hair & Beauty Salon",
    location: "Cambridge, ON",
    href: "/portfolio",
    imageKey: "amHair" as const,
  },
  {
    id: "valley-park",
    slug: "valley-park",
    category: "Institutional",
    name: "Valley Park Library",
    location: "Hamilton, ON",
    href: "/portfolio",
    imageKey: "valleyPark" as const,
  },
] as const;

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "coffee-island",
    slug: "coffee-island",
    category: "Restaurant/QSR",
    name: "Coffee Island Toronto",
    location: "Toronto, ON",
    scope:
      "Full turnkey build-out — kitchen/tech fit-out, custom feature ceilings (yellow bulkhead & lighting), stainless & diamond-plate service counter, back-bar millwork, retail display shelving & merchandising fixtures, banquettes, window counters, storefront graphics, and all interior furniture.",
    galleryCount: 9,
    imageKey: "coffeeIsland",
    specs: {
      sector: "Restaurant / QSR",
      delivery: "Design through install",
      finish: "Custom wood & laminate finishes",
      materials: [
        "Custom feature ceilings",
        "Stainless steel & diamond-plate counter",
        "Millwork & display shelving",
        "Banquettes & window counters",
      ],
    },
  },
  {
    id: "niagara-college",
    slug: "niagara-college",
    category: "Education",
    name: "Niagara College — Marotta Family Innovation Complex",
    location: "Welland, ON",
    scope:
      "Institutional interior scope — feature perforated metal ceilings (interior & exterior soffit), signage wall, glass-walled study rooms, common-area casework, and lounge/cafeteria furniture package throughout the innovation complex and athletics wing.",
    galleryCount: 6,
    imageKey: "niagaraCollege",
    specs: {
      sector: "Education / Institutional",
      delivery: "Design through install",
      finish: "Metal & glass finishes",
      materials: [
        "Perforated metal ceilings",
        "Glass-walled study rooms",
        "Casework & millwork",
        "Lounge & cafeteria furniture",
      ],
    },
  },
  {
    id: "robarts-library",
    slug: "robarts-library",
    category: "Education",
    name: "University of Toronto — Robarts Library Study Commons",
    location: "Toronto, ON",
    scope:
      "Heritage-sensitive architectural millwork within Robarts Library — white oak column cladding, study carrels & partitions, upholstered banquette pods, individual workstation runs, reception & service casework, integrated task lighting and cable management.",
    galleryCount: 5,
    imageKey: "robartsLibrary",
    specs: {
      sector: "Education / Library",
      delivery: "Design through install",
      finish: "White oak & upholstery",
      materials: [
        "White oak column cladding",
        "Study carrels & partitions",
        "Upholstered banquette pods",
        "Integrated task lighting",
      ],
    },
  },
  {
    id: "tiffany-hill",
    slug: "tiffany-hill",
    category: "Education",
    name: "Tiffany Hill Primary School",
    location: "Ancaster, ON",
    scope:
      "K-8 school interior millwork — maple learning-stair bleachers, display cases, tiered wood cladding, reception & administration casework, teacher mail cubbies, classroom cabinetry & cubbies, window benches, recycling stations, and STEAM/music/art zone feature walls.",
    galleryCount: 8,
    imageKey: "tiffanyHill",
    specs: {
      sector: "Education / K-12",
      delivery: "Design through install",
      finish: "Maple & laminate finishes",
      materials: [
        "Maple learning-stair bleachers",
        "Display cases & cladding",
        "Classroom cabinetry & cubbies",
        "STEAM/music/art zone feature walls",
      ],
    },
  },
  {
    id: "tobin-high",
    slug: "tobin-high",
    category: "Education",
    name: "Tobin High School",
    location: "Massachusetts, USA",
    scope:
      "Full high school interior millwork package — auditorium acoustic wood wall panels & curved balcony fascia, science lab casework with epoxy tops and integrated sinks, chemistry classroom cabinetry, teacher prep rooms, student lockers & wardrobe units, main lobby reception desk, corridor slat wood ceilings and glulam feature bulkheads.",
    galleryCount: 9,
    imageKey: "tobinHigh",
    specs: {
      sector: "Education / High School",
      delivery: "Design through install",
      finish: "Wood veneer & epoxy",
      materials: [
        "Acoustic wood wall panels",
        "Science lab casework",
        "Student lockers & wardrobes",
        "Slat wood ceilings & glulam bulkheads",
      ],
    },
  },
  {
    id: "scooped",
    slug: "scooped",
    category: "Retail",
    name: "Scooped by Demetres",
    location: "Toronto, ON",
    scope:
      "Complete mall parlour build-out — arched storefront, custom tiled service counter with curved glass gelato display, illuminated signage backing, back-of-house prep, menu boards, pint display freezer surround, and all finish carpentry.",
    galleryCount: 7,
    imageKey: "scooped",
    specs: {
      sector: "Retail / Food Service",
      delivery: "Design through install",
      finish: "Tile & custom finishes",
      materials: [
        "Arched storefront",
        "Custom tiled service counter",
        "Illuminated signage",
        "Finish carpentry",
      ],
    },
  },
  {
    id: "mercato",
    slug: "mercato",
    category: "Restaurant/QSR",
    name: "Mercato Mississauga",
    location: "Mississauga, ON",
    scope:
      "Complete architectural millwork package — arched wood portals, banquettes, custom bar, cane-panel screens, feature ceilings, wine displays, service stations, and washroom millwork.",
    galleryCount: 9,
    imageKey: "mercato",
    specs: {
      sector: "Restaurant / QSR",
      delivery: "Design through install",
      finish: "Wood & cane-panel finishes",
      materials: [
        "Arched wood portals",
        "Custom bar & banquettes",
        "Cane-panel screens",
        "Feature ceilings & wine displays",
      ],
    },
  },
  {
    id: "lake-country",
    slug: "lake-country",
    category: "Institutional",
    name: "Lake Country Co-op Leisure Centre",
    location: "Prince Albert, SK",
    scope:
      "Architectural millwork package, feature walls, casework, reception & public areas. Client: Atkar North America",
    galleryCount: 3,
    imageKey: "lakeCountry",
    specs: {
      sector: "Institutional / Recreation",
      delivery: "Millwork package",
      finish: "Laminate & wood finishes",
      materials: [
        "Feature walls",
        "Casework",
        "Reception millwork",
        "Public area millwork",
      ],
    },
  },
  {
    id: "am-hair",
    slug: "am-hair",
    category: "Retail",
    name: "AM Hair And Beauty Salon",
    location: "Cambridge, ON",
    scope: "Retail fixtures, custom stations, reception & display millwork.",
    galleryCount: 3,
    imageKey: "amHair",
    specs: {
      sector: "Retail / Beauty",
      delivery: "Fixture & millwork package",
      finish: "Custom laminate finishes",
      materials: [
        "Retail fixtures",
        "Custom stations",
        "Reception millwork",
        "Display millwork",
      ],
    },
  },
  {
    id: "valley-park",
    slug: "valley-park",
    category: "Institutional",
    name: "Valley Park Library",
    location: "Hamilton, ON",
    scope:
      "Library casework, circulation, feature millwork, stack & admin areas. Client: Atkar North America",
    galleryCount: 3,
    imageKey: "valleyPark",
    specs: {
      sector: "Institutional / Library",
      delivery: "Millwork package",
      finish: "Wood & laminate finishes",
      materials: [
        "Library casework",
        "Circulation millwork",
        "Feature millwork",
        "Stack & admin millwork",
      ],
    },
  },
];

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
