import { portfolioProjects } from "@/lib/constants/projects";
import { projectGalleries } from "@/lib/constants/media";

export interface RecentProjectSlide {
  slug: string;
  name: string;
  location: string;
  category: string;
  cover: string;
  href: string;
}

/**
 * Recent portfolio covers for the home Why Choose Us carousel.
 * Empty only when there are no projects with images anywhere.
 */
export function getRecentProjectSlides(limit = 8): RecentProjectSlide[] {
  return portfolioProjects
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
    .filter((slide): slide is RecentProjectSlide => slide !== null)
    .slice(0, limit);
}
