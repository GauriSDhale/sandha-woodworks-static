/** Structural portfolio data. Translatable copy lives in src/locales/{en,fr}/portfolio.json.
 *  Project names and locations stay English (proper nouns).
 */

export interface PortfolioProject {
  id: string;
  slug: string;
  /** Stable English category key used for filters and market mapping. */
  category: string;
  name: string;
  location: string;
  galleryCount: number;
  /** Partner/client name only (no "Client:" prefix). */
  clientPartner?: string;
}

export const featuredProjects = [
  {
    "id": "lake-country-coop",
    "slug": "lake-country-coop",
    "category": "Institutional",
    "name": "Lake Country Co-op Leisure Centre",
    "location": "Prince Albert, SK",
    "href": "/portfolio/lake-country-coop",
    "imageKey": "lakeCountry"
  },
  {
    "id": "am-hair-beauty",
    "slug": "am-hair-beauty",
    "category": "Retail",
    "name": "AM Hair & Beauty Salon",
    "location": "Cambridge, ON",
    "href": "/portfolio/am-hair-beauty",
    "imageKey": "amHair"
  },
  {
    "id": "valley-park-library",
    "slug": "valley-park-library",
    "category": "Institutional",
    "name": "Valley Park Library",
    "location": "Hamilton, ON",
    "href": "/portfolio/valley-park-library",
    "imageKey": "valleyPark"
  },
  {
    "id": "coffee-island-toronto",
    "slug": "coffee-island-toronto",
    "category": "Retail",
    "name": "Coffee Island Toronto",
    "location": "Toronto, ON",
    "href": "/portfolio/coffee-island-toronto",
    "imageKey": "coffeeIsland"
  }
] as const;

export const portfolioProjects: PortfolioProject[] = [
  {
    "id": "coffee-island-toronto",
    "slug": "coffee-island-toronto",
    "category": "Restaurant/QSR",
    "name": "Coffee Island Toronto",
    "location": "Toronto, ON",
    "galleryCount": 9
  },
  {
    "id": "niagara-college-marotta",
    "slug": "niagara-college-marotta",
    "category": "Education",
    "name": "Niagara College — Marotta Family Innovation Complex",
    "location": "Welland, ON",
    "galleryCount": 6
  },
  {
    "id": "university-of-toronto-robarts",
    "slug": "university-of-toronto-robarts",
    "category": "Education",
    "name": "University of Toronto — Robarts Library Study Commons",
    "location": "Toronto, ON",
    "galleryCount": 5
  },
  {
    "id": "tiffany-hill-primary-school",
    "slug": "tiffany-hill-primary-school",
    "category": "Education",
    "name": "Tiffany Hill Primary School",
    "location": "Ancaster, ON",
    "galleryCount": 8
  },
  {
    "id": "tobin-high-school",
    "slug": "tobin-high-school",
    "category": "Education",
    "name": "Tobin High School",
    "location": "Massachusetts, USA",
    "galleryCount": 9
  },
  {
    "id": "scooped-by-demetres",
    "slug": "scooped-by-demetres",
    "category": "Retail",
    "name": "Scooped by Demetres",
    "location": "Toronto, ON",
    "galleryCount": 7
  },
  {
    "id": "mercato-mississauga",
    "slug": "mercato-mississauga",
    "category": "Restaurant/QSR",
    "name": "Mercato Mississauga",
    "location": "Mississauga, ON",
    "galleryCount": 9
  },
  {
    "id": "lake-country-coop",
    "slug": "lake-country-coop",
    "category": "Institutional",
    "name": "Lake Country Co-op Leisure Centre",
    "location": "Prince Albert, SK",
    "galleryCount": 3,
    "clientPartner": "Atkar North America"
  },
  {
    "id": "am-hair-beauty",
    "slug": "am-hair-beauty",
    "category": "Retail",
    "name": "AM Hair And Beauty Salon",
    "location": "Cambridge, ON",
    "galleryCount": 3
  },
  {
    "id": "valley-park-library",
    "slug": "valley-park-library",
    "category": "Institutional",
    "name": "Valley Park Library",
    "location": "Hamilton, ON",
    "galleryCount": 3,
    "clientPartner": "Atkar North America"
  }
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
  "Commercial Interiors"
] as const;
