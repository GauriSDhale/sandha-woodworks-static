/** Structural sector-detail data. Copy lives in src/locales/{en,fr}/sectorDetails.json */

export interface SectorDetailMeta {
  image: string;
  serviceSlugs: string[];
}

export const sectorDetails: Record<string, SectorDetailMeta> = {
  "healthcare": {
    "image": "/assets/sector-hero/healthcare.jpg",
    "serviceSlugs": [
      "healthcare-millwork",
      "pharmacy-clinic-millwork",
      "solid-surface-work",
      "finishing-paint",
      "installation-coordination"
    ]
  },
  "senior-living": {
    "image": "/assets/sector-hero/senior-living.jpg",
    "serviceSlugs": [
      "healthcare-millwork",
      "hospitality-millwork",
      "custom-cabinets",
      "installation-coordination"
    ]
  },
  "education": {
    "image": "/assets/sector-hero/education.jpg",
    "serviceSlugs": [
      "education-millwork",
      "architectural-millwork",
      "custom-cabinets",
      "cnc-manufacturing"
    ]
  },
  "libraries": {
    "image": "/assets/sector-hero/libraries.jpg",
    "serviceSlugs": [
      "corporate-institutional-millwork",
      "education-millwork",
      "architectural-millwork",
      "installation-coordination"
    ]
  },
  "corporate-offices": {
    "image": "/assets/sector-hero/corporate-offices.jpg",
    "serviceSlugs": [
      "corporate-institutional-millwork",
      "architectural-millwork",
      "shop-drawings-engineering",
      "finishing-paint"
    ]
  },
  "commercial-interiors": {
    "image": "/assets/sector-hero/commercial-interiors.jpg",
    "serviceSlugs": [
      "architectural-millwork",
      "corporate-institutional-millwork",
      "custom-cabinets",
      "installation-coordination"
    ]
  },
  "financial-institutions": {
    "image": "/assets/sector-hero/financial-institutions.jpg",
    "serviceSlugs": [
      "corporate-institutional-millwork",
      "architectural-millwork",
      "custom-cabinets",
      "installation-coordination"
    ]
  },
  "government-public-buildings": {
    "image": "/assets/sector-hero/government-public-buildings.jpg",
    "serviceSlugs": [
      "corporate-institutional-millwork",
      "architectural-millwork",
      "shop-drawings-engineering",
      "installation-coordination"
    ]
  },
  "hospitality": {
    "image": "/assets/sector-hero/hospitality.jpg",
    "serviceSlugs": [
      "hospitality-millwork",
      "architectural-millwork",
      "finishing-paint",
      "installation-coordination"
    ]
  },
  "restaurants-qsr": {
    "image": "/assets/sector-hero/restaurants-qsr.jpg",
    "serviceSlugs": [
      "restaurant-qsr-millwork",
      "architectural-millwork",
      "custom-cabinets",
      "installation-coordination"
    ]
  },
  "retail": {
    "image": "/assets/sector-hero/retail.jpg",
    "serviceSlugs": [
      "retail-fixtures",
      "custom-cabinets",
      "delivery-logistics",
      "cnc-manufacturing"
    ]
  },
  "multi-residential": {
    "image": "/assets/sector-hero/multi-residential.jpg",
    "serviceSlugs": [
      "multi-residential-millwork",
      "custom-cabinets",
      "solid-surface-work",
      "installation-coordination"
    ]
  },
  "community-recreation": {
    "image": "/assets/sector-hero/community-recreation.jpg",
    "serviceSlugs": [
      "corporate-institutional-millwork",
      "custom-cabinets",
      "solid-surface-work",
      "installation-coordination"
    ]
  },
  "cultural-civic": {
    "image": "/assets/sector-hero/cultural-civic.jpg",
    "serviceSlugs": [
      "architectural-millwork",
      "corporate-institutional-millwork",
      "custom-assembly",
      "finishing-paint"
    ]
  },
  "industrial-manufacturing": {
    "image": "/assets/sector-hero/industrial-manufacturing.jpg",
    "serviceSlugs": [
      "custom-cabinets",
      "solid-surface-work",
      "custom-assembly",
      "installation-coordination"
    ]
  }
};

export function getSectorDetail(slug: string) {
  return sectorDetails[slug] ?? null;
}
