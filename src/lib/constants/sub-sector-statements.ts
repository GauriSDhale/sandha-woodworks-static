export interface SubSectorStatementMeta {
  slug: string;
  categorySlug: string;
  poolKey: string;
  poolOffset: number;
}

/** @deprecated Use SubSectorStatementMeta + locale copy via localize.ts */
export type SubSectorStatement = SubSectorStatementMeta;

export const subSectorStatements: SubSectorStatementMeta[] = [
  {
    "slug": "hospitals",
    "categorySlug": "healthcare",
    "poolKey": "healthcare",
    "poolOffset": 0
  },
  {
    "slug": "medical-clinics",
    "categorySlug": "healthcare",
    "poolKey": "healthcare",
    "poolOffset": 3
  },
  {
    "slug": "laboratories",
    "categorySlug": "healthcare",
    "poolKey": "healthcare",
    "poolOffset": 6
  },
  {
    "slug": "long-term-care",
    "categorySlug": "healthcare",
    "poolKey": "healthcare",
    "poolOffset": 9
  },
  {
    "slug": "senior-living",
    "categorySlug": "healthcare",
    "poolKey": "hospitality",
    "poolOffset": 4
  },
  {
    "slug": "retirement-communities",
    "categorySlug": "healthcare",
    "poolKey": "hospitality",
    "poolOffset": 8
  },
  {
    "slug": "assisted-living",
    "categorySlug": "healthcare",
    "poolKey": "healthcare",
    "poolOffset": 12
  },
  {
    "slug": "schools",
    "categorySlug": "education",
    "poolKey": "education",
    "poolOffset": 0
  },
  {
    "slug": "colleges",
    "categorySlug": "education",
    "poolKey": "education",
    "poolOffset": 4
  },
  {
    "slug": "universities",
    "categorySlug": "education",
    "poolKey": "education",
    "poolOffset": 8
  },
  {
    "slug": "libraries",
    "categorySlug": "education",
    "poolKey": "education",
    "poolOffset": 12
  },
  {
    "slug": "daycares",
    "categorySlug": "education",
    "poolKey": "education",
    "poolOffset": 16
  },
  {
    "slug": "learning-centres",
    "categorySlug": "education",
    "poolKey": "education",
    "poolOffset": 20
  },
  {
    "slug": "training-facilities",
    "categorySlug": "education",
    "poolKey": "education",
    "poolOffset": 24
  },
  {
    "slug": "corporate-offices",
    "categorySlug": "commercial",
    "poolKey": "corp",
    "poolOffset": 0
  },
  {
    "slug": "commercial-interiors",
    "categorySlug": "commercial",
    "poolKey": "corp",
    "poolOffset": 4
  },
  {
    "slug": "financial-institutions",
    "categorySlug": "commercial",
    "poolKey": "corp",
    "poolOffset": 8
  },
  {
    "slug": "government-offices",
    "categorySlug": "commercial",
    "poolKey": "corp",
    "poolOffset": 12
  },
  {
    "slug": "civic-buildings",
    "categorySlug": "commercial",
    "poolKey": "corp",
    "poolOffset": 16
  },
  {
    "slug": "professional-offices",
    "categorySlug": "commercial",
    "poolKey": "corp",
    "poolOffset": 20
  },
  {
    "slug": "hotels",
    "categorySlug": "hospitality",
    "poolKey": "hospitality",
    "poolOffset": 0
  },
  {
    "slug": "resorts",
    "categorySlug": "hospitality",
    "poolKey": "hospitality",
    "poolOffset": 6
  },
  {
    "slug": "restaurants",
    "categorySlug": "hospitality",
    "poolKey": "restaurant",
    "poolOffset": 0
  },
  {
    "slug": "quick-service-restaurants",
    "categorySlug": "hospitality",
    "poolKey": "qsr",
    "poolOffset": 0
  },
  {
    "slug": "cafes",
    "categorySlug": "hospitality",
    "poolKey": "restaurant",
    "poolOffset": 3
  },
  {
    "slug": "bars",
    "categorySlug": "hospitality",
    "poolKey": "restaurant",
    "poolOffset": 6
  },
  {
    "slug": "entertainment-venues",
    "categorySlug": "hospitality",
    "poolKey": "hospitality",
    "poolOffset": 10
  },
  {
    "slug": "retail-stores",
    "categorySlug": "retail",
    "poolKey": "retail",
    "poolOffset": 0
  },
  {
    "slug": "shopping-centres",
    "categorySlug": "retail",
    "poolKey": "retail",
    "poolOffset": 4
  },
  {
    "slug": "luxury-retail",
    "categorySlug": "retail",
    "poolKey": "retail",
    "poolOffset": 8
  },
  {
    "slug": "showrooms",
    "categorySlug": "retail",
    "poolKey": "retail",
    "poolOffset": 12
  },
  {
    "slug": "pharmacies",
    "categorySlug": "retail",
    "poolKey": "pharmacy",
    "poolOffset": 0
  },
  {
    "slug": "grocery",
    "categorySlug": "retail",
    "poolKey": "retail",
    "poolOffset": 16
  },
  {
    "slug": "convenience-stores",
    "categorySlug": "retail",
    "poolKey": "retail",
    "poolOffset": 20
  },
  {
    "slug": "multi-residential",
    "categorySlug": "residential",
    "poolKey": "multiRes",
    "poolOffset": 0
  },
  {
    "slug": "apartments",
    "categorySlug": "residential",
    "poolKey": "multiRes",
    "poolOffset": 4
  },
  {
    "slug": "condominiums",
    "categorySlug": "residential",
    "poolKey": "multiRes",
    "poolOffset": 8
  },
  {
    "slug": "student-housing",
    "categorySlug": "residential",
    "poolKey": "multiRes",
    "poolOffset": 12
  },
  {
    "slug": "luxury-residential-common-areas",
    "categorySlug": "residential",
    "poolKey": "multiRes",
    "poolOffset": 16
  },
  {
    "slug": "community-centres",
    "categorySlug": "public-community",
    "poolKey": "corp",
    "poolOffset": 8
  },
  {
    "slug": "ymca",
    "categorySlug": "public-community",
    "poolKey": "corp",
    "poolOffset": 12
  },
  {
    "slug": "recreation-centres",
    "categorySlug": "public-community",
    "poolKey": "corp",
    "poolOffset": 16
  },
  {
    "slug": "public-libraries",
    "categorySlug": "public-community",
    "poolKey": "education",
    "poolOffset": 14
  },
  {
    "slug": "museums",
    "categorySlug": "public-community",
    "poolKey": "corp",
    "poolOffset": 20
  },
  {
    "slug": "cultural-centres",
    "categorySlug": "public-community",
    "poolKey": "corp",
    "poolOffset": 24
  },
  {
    "slug": "religious-buildings",
    "categorySlug": "public-community",
    "poolKey": "corp",
    "poolOffset": 28
  },
  {
    "slug": "custom-architectural-millwork",
    "categorySlug": "specialty",
    "poolKey": "corp",
    "poolOffset": 0
  },
  {
    "slug": "manufacturing-facilities",
    "categorySlug": "specialty",
    "poolKey": "corp",
    "poolOffset": 32
  },
  {
    "slug": "airports",
    "categorySlug": "specialty",
    "poolKey": "corp",
    "poolOffset": 8
  },
  {
    "slug": "transit",
    "categorySlug": "specialty",
    "poolKey": "corp",
    "poolOffset": 24
  },
  {
    "slug": "special-projects",
    "categorySlug": "specialty",
    "poolKey": "corp",
    "poolOffset": 4
  }
];

export function getSubSectorStatement(slug: string) {
  return subSectorStatements.find((s) => s.slug === slug);
}

export function getAllSubSectorSlugs() {
  return subSectorStatements.map((s) => s.slug);
}
