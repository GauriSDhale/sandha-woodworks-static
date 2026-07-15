"use client";

import { ArrowRight } from "lucide-react";
import Link from "@/components/i18n/Link";
import { DisplayHeading } from "@/components/marketing/home/DisplayHeading";
import { Eyebrow } from "@/components/marketing/home/Eyebrow";
import { projectGalleries, projectMedia } from "@/lib/constants/media";
import { featuredProjects } from "@/lib/constants/projects";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { SiteImage } from "@/components/ui/SiteImage";

type ProjectCategory = "Institutional" | "Retail";

function projectImage(slug: string, imageKey: keyof typeof projectMedia) {
  return projectGalleries[slug]?.cover ?? projectMedia[imageKey];
}

export function FeaturedProjectsSection() {
  const { t } = useTranslation("home");
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.12, triggerOnce: true });
  const p = t("projects", { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    viewProject: string;
    viewAll: string;
    categories: Record<ProjectCategory, string>;
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding scroll-mt-24 bg-white text-foreground"
      aria-labelledby="featured-projects-heading"
    >
      <div className="container-full">
        <div
          className={cn(
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <Eyebrow variant="brand">{p.eyebrow}</Eyebrow>
          <DisplayHeading
            id="featured-projects-heading"
            size="sm"
            tone="dark"
            className="mt-3 max-w-2xl tracking-tight"
          >
            {p.title}
          </DisplayHeading>
        </div>

        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12",
            !reducedMotion && "transition-all duration-700 delay-150",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          {featuredProjects.map((project) => {
            const category = p.categories[project.category as ProjectCategory] ?? project.category;

            return (
              <Link
                key={project.id}
                href={project.href}
                className="group flex flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <SiteImage
                    src={projectImage(project.slug, project.imageKey)}
                    alt={project.name}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={cn(
                      "h-full w-full object-cover",
                      !reducedMotion &&
                        "transition-transform duration-700 ease-out group-hover:scale-105",
                    )}
                  />
                </div>

                <div className="flex flex-1 flex-col pt-5">
                  <p className="text-xs font-semibold tracking-wide text-brand">
                    {category}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-bold text-foreground transition-colors group-hover:text-brand sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{project.location}</p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    {p.viewProject}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div
          className={cn(
            "mt-12 text-center",
            !reducedMotion && "transition-all duration-700 delay-300",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-warm-black"
          >
            {p.viewAll}
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-foreground">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
