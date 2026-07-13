import { portfolioProjects, type PortfolioProject } from "@/lib/constants/projects";
import { projectGalleries } from "@/lib/constants/media";

/** Portfolio `category` values that belong to each market page slug. */
export const marketProjectCategories: Record<string, string[]> = {
  healthcare: ["Healthcare"],
  education: ["Education"],
  commercial: ["Corporate", "Commercial Interiors"],
  hospitality: ["Restaurant/QSR", "Hospitality"],
  retail: ["Retail"],
  residential: ["Multi-Residential"],
  public: ["Institutional"],
  specialty: [],
};

export interface MarketProjectSlide {
  slug: string;
  name: string;
  location: string;
  category: string;
  cover: string;
  href: string;
}

export function getProjectsForMarket(marketId: string): PortfolioProject[] {
  const categories = marketProjectCategories[marketId] ?? [];
  if (categories.length === 0) return [];

  const allowed = new Set(categories.map((c) => c.toLowerCase()));
  return portfolioProjects.filter((project) =>
    allowed.has(project.category.toLowerCase()),
  );
}

/** Portfolio project covers for a market. Empty when none match — UI shows View portfolio. */
export function getMarketProjectSlides(marketId: string): MarketProjectSlide[] {
  return getProjectsForMarket(marketId)
    .map((project) => {
      const gallery = projectGalleries[project.slug];
      const cover = gallery?.cover ?? gallery?.gallery[0];
      if (!cover) return null;

      return {
        slug: project.slug,
        name: project.name,
        location: project.location,
        category: project.category,
        cover,
        href: `/portfolio/${project.slug}`,
      };
    })
    .filter((slide): slide is MarketProjectSlide => slide !== null);
}
