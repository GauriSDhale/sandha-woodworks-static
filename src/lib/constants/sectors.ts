/** Structural market/sector data. Copy lives in src/locales/{en,fr}/sectors.json */

export interface SectorCard {
  id: string;
  number: string;
  subSectors: number;
  href: string;
  image: string;
}

export const sectors: SectorCard[] = [
  {
    "id": "healthcare",
    "number": "01",
    "subSectors": 7,
    "href": "/markets/healthcare",
    "image": "/assets/sectors/healthcare.jpg"
  },
  {
    "id": "education",
    "number": "02",
    "subSectors": 7,
    "href": "/markets/education",
    "image": "/assets/sectors/education.jpg"
  },
  {
    "id": "commercial",
    "number": "03",
    "subSectors": 6,
    "href": "/markets/commercial",
    "image": "/assets/sectors/commercial.jpg"
  },
  {
    "id": "hospitality",
    "number": "04",
    "subSectors": 7,
    "href": "/markets/hospitality",
    "image": "/assets/sectors/hospitality.jpg"
  },
  {
    "id": "retail",
    "number": "05",
    "subSectors": 7,
    "href": "/markets/retail",
    "image": "/assets/sectors/retail.jpg"
  },
  {
    "id": "residential",
    "number": "06",
    "subSectors": 5,
    "href": "/markets/residential",
    "image": "/assets/sectors/residential.jpg"
  },
  {
    "id": "public",
    "number": "07",
    "subSectors": 7,
    "href": "/markets/public",
    "image": "/assets/sectors/public-community.jpg"
  },
  {
    "id": "specialty",
    "number": "08",
    "subSectors": 5,
    "href": "/markets/specialty",
    "image": "/assets/sectors/specialty.jpg"
  }
];

export const navSectorLinks = sectors.map((sector) => ({
  id: sector.id,
  href: sector.href,
}));

export interface MarketSubSectorMeta {
  slug: string;
  portfolioPdf?: string;
}

export interface MarketDetailMeta {
  image: string;
  subSectors: MarketSubSectorMeta[];
  relatedSectorSlugs: string[];
}

export const marketDetails: Record<string, MarketDetailMeta> = {
  "healthcare": {
    "image": "/assets/sectors/healthcare.jpg",
    "subSectors": [
      {
        "slug": "hospitals",
        "portfolioPdf": "/capability-pdf/sub-sector/hospitals"
      },
      {
        "slug": "medical-clinics",
        "portfolioPdf": "/capability-pdf/sub-sector/medical-clinics"
      },
      {
        "slug": "laboratories",
        "portfolioPdf": "/capability-pdf/sub-sector/laboratories"
      },
      {
        "slug": "long-term-care",
        "portfolioPdf": "/capability-pdf/sub-sector/long-term-care"
      },
      {
        "slug": "senior-living",
        "portfolioPdf": "/capability-pdf/sub-sector/senior-living"
      },
      {
        "slug": "retirement-communities",
        "portfolioPdf": "/capability-pdf/sub-sector/retirement-communities"
      },
      {
        "slug": "assisted-living",
        "portfolioPdf": "/capability-pdf/sub-sector/assisted-living"
      }
    ],
    "relatedSectorSlugs": [
      "healthcare",
      "senior-living"
    ]
  },
  "education": {
    "image": "/assets/sectors/education.jpg",
    "subSectors": [
      {
        "slug": "schools",
        "portfolioPdf": "/capability-pdf/sub-sector/schools"
      },
      {
        "slug": "colleges",
        "portfolioPdf": "/capability-pdf/sub-sector/colleges"
      },
      {
        "slug": "universities",
        "portfolioPdf": "/capability-pdf/sub-sector/universities"
      },
      {
        "slug": "libraries",
        "portfolioPdf": "/capability-pdf/sub-sector/libraries"
      },
      {
        "slug": "daycares",
        "portfolioPdf": "/capability-pdf/sub-sector/daycares"
      },
      {
        "slug": "learning-centres",
        "portfolioPdf": "/capability-pdf/sub-sector/learning-centres"
      },
      {
        "slug": "training-facilities",
        "portfolioPdf": "/capability-pdf/sub-sector/training-facilities"
      }
    ],
    "relatedSectorSlugs": [
      "education",
      "libraries"
    ]
  },
  "commercial": {
    "image": "/assets/sectors/commercial.jpg",
    "subSectors": [
      {
        "slug": "corporate-offices",
        "portfolioPdf": "/capability-pdf/sub-sector/corporate-offices"
      },
      {
        "slug": "commercial-interiors",
        "portfolioPdf": "/capability-pdf/sub-sector/commercial-interiors"
      },
      {
        "slug": "financial-institutions",
        "portfolioPdf": "/capability-pdf/sub-sector/financial-institutions"
      },
      {
        "slug": "government-offices",
        "portfolioPdf": "/capability-pdf/sub-sector/government-offices"
      },
      {
        "slug": "civic-buildings",
        "portfolioPdf": "/capability-pdf/sub-sector/civic-buildings"
      },
      {
        "slug": "professional-offices",
        "portfolioPdf": "/capability-pdf/sub-sector/professional-offices"
      }
    ],
    "relatedSectorSlugs": [
      "corporate-offices",
      "commercial-interiors",
      "financial-institutions",
      "government-public-buildings"
    ]
  },
  "hospitality": {
    "image": "/assets/sectors/hospitality.jpg",
    "subSectors": [
      {
        "slug": "hotels",
        "portfolioPdf": "/capability-pdf/sub-sector/hotels"
      },
      {
        "slug": "resorts",
        "portfolioPdf": "/capability-pdf/sub-sector/resorts"
      },
      {
        "slug": "restaurants",
        "portfolioPdf": "/capability-pdf/sub-sector/restaurants"
      },
      {
        "slug": "quick-service-restaurants",
        "portfolioPdf": "/capability-pdf/sub-sector/quick-service-restaurants"
      },
      {
        "slug": "cafes",
        "portfolioPdf": "/capability-pdf/sub-sector/cafes"
      },
      {
        "slug": "bars",
        "portfolioPdf": "/capability-pdf/sub-sector/bars"
      },
      {
        "slug": "entertainment-venues",
        "portfolioPdf": "/capability-pdf/sub-sector/entertainment-venues"
      }
    ],
    "relatedSectorSlugs": [
      "hospitality",
      "restaurants-qsr"
    ]
  },
  "retail": {
    "image": "/assets/sectors/retail.jpg",
    "subSectors": [
      {
        "slug": "retail-stores",
        "portfolioPdf": "/capability-pdf/sub-sector/retail-stores"
      },
      {
        "slug": "shopping-centres",
        "portfolioPdf": "/capability-pdf/sub-sector/shopping-centres"
      },
      {
        "slug": "luxury-retail",
        "portfolioPdf": "/capability-pdf/sub-sector/luxury-retail"
      },
      {
        "slug": "showrooms",
        "portfolioPdf": "/capability-pdf/sub-sector/showrooms"
      },
      {
        "slug": "pharmacies",
        "portfolioPdf": "/capability-pdf/sub-sector/pharmacies"
      },
      {
        "slug": "grocery",
        "portfolioPdf": "/capability-pdf/sub-sector/grocery"
      },
      {
        "slug": "convenience-stores",
        "portfolioPdf": "/capability-pdf/sub-sector/convenience-stores"
      }
    ],
    "relatedSectorSlugs": [
      "retail"
    ]
  },
  "residential": {
    "image": "/assets/sectors/residential.jpg",
    "subSectors": [
      {
        "slug": "multi-residential",
        "portfolioPdf": "/capability-pdf/sub-sector/multi-residential"
      },
      {
        "slug": "apartments",
        "portfolioPdf": "/capability-pdf/sub-sector/apartments"
      },
      {
        "slug": "condominiums",
        "portfolioPdf": "/capability-pdf/sub-sector/condominiums"
      },
      {
        "slug": "student-housing",
        "portfolioPdf": "/capability-pdf/sub-sector/student-housing"
      },
      {
        "slug": "luxury-residential-common-areas",
        "portfolioPdf": "/capability-pdf/sub-sector/luxury-residential-common-areas"
      }
    ],
    "relatedSectorSlugs": [
      "multi-residential"
    ]
  },
  "public": {
    "image": "/assets/sectors/public-community.jpg",
    "subSectors": [
      {
        "slug": "community-centres",
        "portfolioPdf": "/capability-pdf/sub-sector/community-centres"
      },
      {
        "slug": "ymca",
        "portfolioPdf": "/capability-pdf/sub-sector/ymca"
      },
      {
        "slug": "recreation-centres",
        "portfolioPdf": "/capability-pdf/sub-sector/recreation-centres"
      },
      {
        "slug": "public-libraries",
        "portfolioPdf": "/capability-pdf/sub-sector/public-libraries"
      },
      {
        "slug": "museums",
        "portfolioPdf": "/capability-pdf/sub-sector/museums"
      },
      {
        "slug": "cultural-centres",
        "portfolioPdf": "/capability-pdf/sub-sector/cultural-centres"
      },
      {
        "slug": "religious-buildings",
        "portfolioPdf": "/capability-pdf/sub-sector/religious-buildings"
      }
    ],
    "relatedSectorSlugs": [
      "community-recreation",
      "libraries",
      "cultural-civic"
    ]
  },
  "specialty": {
    "image": "/assets/sectors/specialty.jpg",
    "subSectors": [
      {
        "slug": "custom-architectural-millwork",
        "portfolioPdf": "/capability-pdf/sub-sector/custom-architectural-millwork"
      },
      {
        "slug": "manufacturing-facilities",
        "portfolioPdf": "/capability-pdf/sub-sector/manufacturing-facilities"
      },
      {
        "slug": "airports",
        "portfolioPdf": "/capability-pdf/sub-sector/airports"
      },
      {
        "slug": "transit",
        "portfolioPdf": "/capability-pdf/sub-sector/transit"
      },
      {
        "slug": "special-projects",
        "portfolioPdf": "/capability-pdf/sub-sector/special-projects"
      }
    ],
    "relatedSectorSlugs": [
      "industrial-manufacturing",
      "cultural-civic"
    ]
  }
};
