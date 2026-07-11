import { portfolioProjects } from "@/lib/constants/projects";
import { serviceCategories, serviceDetails } from "@/lib/constants/services";
import { sectorDetails } from "@/lib/constants/sector-details";
import { siteConfig } from "@/lib/constants/site";

export type SearchKind = "Page" | "Service" | "Sector" | "Project";

export interface SearchItem {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  url: string;
  keywords: string;
}

function normalize(...parts: (string | undefined | null)[]) {
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

const pages: SearchItem[] = [
  {
    id: "page-home",
    kind: "Page",
    title: "Home",
    description: siteConfig.description,
    url: "/",
    keywords: normalize("home", siteConfig.name, siteConfig.tagline, siteConfig.description),
  },
  {
    id: "page-about",
    kind: "Page",
    title: "About Us",
    description: "Our story, facility, team and manufacturing capabilities in Brantford, Ontario.",
    url: "/about-us",
    keywords: normalize("about us", "company", "facility", "team", "brantford", "canada"),
  },
  {
    id: "page-services",
    kind: "Page",
    title: "Services",
    description: "Every millwork capability under one roof — pre-construction through warranty.",
    url: "/services",
    keywords: normalize("services", "capabilities", "millwork", "pre-construction", "engineering", "manufacturing"),
  },
  {
    id: "page-sectors",
    kind: "Page",
    title: "Sectors",
    description: "Industries and building types we serve across Canada and the U.S.",
    url: "/sectors",
    keywords: normalize("sectors", "markets", "industries", "healthcare", "education", "hospitality"),
  },
  {
    id: "page-portfolio",
    kind: "Page",
    title: "Portfolio",
    description: "Recent architectural millwork projects delivered across commercial and institutional environments.",
    url: "/portfolio",
    keywords: normalize("portfolio", "projects", "case studies", "work", "gallery"),
  },
  {
    id: "page-insight",
    kind: "Page",
    title: "Insight",
    description: "Articles and updates from Sandha Woodworks.",
    url: "/insight",
    keywords: normalize("insight", "blog", "articles", "news"),
  },
  {
    id: "page-careers",
    kind: "Page",
    title: "Careers",
    description: "Join the Sandha Woodworks team in Brantford, Ontario.",
    url: "/careers",
    keywords: normalize("careers", "jobs", "hiring", "employment", "work with us"),
  },
  {
    id: "page-contact",
    kind: "Page",
    title: "Contact",
    description: "Request a quote, reach estimating, or visit our Brantford facility.",
    url: "/contact",
    keywords: normalize(
      "contact",
      "quote",
      "estimating",
      siteConfig.phone,
      siteConfig.email,
      siteConfig.address.full,
    ),
  },
];

function buildServiceItems(): SearchItem[] {
  return serviceCategories.flatMap((category) =>
    category.services.map((service) => {
      const detail = serviceDetails[service.slug];
      return {
        id: `service-${service.slug}`,
        kind: "Service" as const,
        title: service.name,
        description: service.description,
        url: `/services/${service.slug}`,
        keywords: normalize(
          service.name,
          service.description,
          category.title,
          detail?.overview,
          detail?.bestFor?.join(" "),
          detail?.materials,
          detail?.deliverables?.join(" "),
        ),
      };
    }),
  );
}

function buildSectorItems(): SearchItem[] {
  return Object.entries(sectorDetails).map(([slug, detail]) => ({
    id: `sector-${slug}`,
    kind: "Sector" as const,
    title: detail.heading.replace(/\s+Millwork$/i, "") || detail.heading,
    description: detail.description,
    url: `/sectors/${slug}`,
    keywords: normalize(
      detail.heading,
      detail.description,
      detail.about,
      detail.features.join(" "),
      detail.standards.join(" "),
      slug.replace(/-/g, " "),
    ),
  }));
}

function buildProjectItems(): SearchItem[] {
  return portfolioProjects.map((project) => ({
    id: `project-${project.slug}`,
    kind: "Project" as const,
    title: project.name,
    description: `${project.location} · ${project.category}`,
    url: `/portfolio/${project.slug}`,
    keywords: normalize(
      project.name,
      project.location,
      project.category,
      project.scope,
      project.client,
      project.specs.sector,
      project.specs.finish,
      project.specs.materials.join(" "),
    ),
  }));
}

let cachedIndex: SearchItem[] | null = null;

export function getSearchIndex(): SearchItem[] {
  if (!cachedIndex) {
    cachedIndex = [
      ...pages,
      ...buildServiceItems(),
      ...buildSectorItems(),
      ...buildProjectItems(),
    ];
  }
  return cachedIndex;
}

export function searchSite(query: string, limit = 25): SearchItem[] {
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) return [];

  const scored = getSearchIndex()
    .map((item) => {
      if (!tokens.every((token) => item.keywords.includes(token))) {
        return null;
      }

      let score = 0;
      const title = item.title.toLowerCase();
      for (const token of tokens) {
        if (title.includes(token)) score += 10;
        if (item.keywords.includes(token)) score += 1;
      }
      if (item.kind === "Page") score += 2;
      if (item.kind === "Service") score += 1;
      return { item, score };
    })
    .filter((entry): entry is { item: SearchItem; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

  return scored.slice(0, limit).map((entry) => entry.item);
}
