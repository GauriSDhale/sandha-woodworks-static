"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DisplayHeading } from "@/components/marketing/home/DisplayHeading";
import { Eyebrow } from "@/components/marketing/home/Eyebrow";
import { projectGalleries, projectMedia } from "@/lib/constants/media";
import { featuredProjects } from "@/lib/constants/projects";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type ProjectCategory = "Institutional" | "Retail";

function projectImage(slug: string, imageKey: keyof typeof projectMedia) {
  return projectGalleries[slug]?.cover ?? projectMedia[imageKey];
}

export function FeaturedProjectsSection() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.12, triggerOnce: true });
  const p = t.home.projects;

  return (
    <section
      ref={sectionRef}
      className="section-padding-lg bg-warm-black text-cream"
      aria-labelledby="featured-projects-heading"
    >
      <div className="container-tight">
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
            tone="light"
            className="mt-4 max-w-3xl"
          >
            {p.title}
          </DisplayHeading>
        </div>

        <div
          className={cn(
            "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8",
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
                className="group flex flex-col overflow-hidden rounded-3xl border border-brand/10 bg-wood/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-warm-black"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-warm-black">
                  <img
                    src={projectImage(project.slug, project.imageKey)}
                    alt={project.name}
                    className={cn(
                      "h-full w-full object-cover",
                      !reducedMotion && "transition-transform duration-700 ease-out group-hover:scale-105",
                    )}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                      {category}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-semibold text-cream transition-colors group-hover:text-brand">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-cream/60">{project.location}</p>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors group-hover:text-cream">
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
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-brand hover:text-brand"
          >
            {p.viewAll}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
