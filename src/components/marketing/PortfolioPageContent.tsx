"use client";

import { useMemo, useState } from "react";
import { portfolioFilters, portfolioProjects } from "@/lib/constants/projects";
import { pageMedia, projectMedia } from "@/lib/constants/media";
import { CtaBanner, PageHero } from "@/components/marketing/PageSections";

export function PortfolioPageContent() {
  const [activeFilter, setActiveFilter] = useState<(typeof portfolioFilters)[number]>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return portfolioProjects;
    return portfolioProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected work from across Canada."
        description="A cross-section of recent commercial millwork projects. Click any project to open its full gallery."
        image={pageMedia.portfolioHero}
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {portfolioFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-black text-white"
                    : "border border-border text-foreground/70 hover:border-black"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={projectMedia[project.imageKey]}
                    alt={project.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Scope:</span> {project.scope}
                  </p>
                  <button type="button" className="mt-4 text-sm font-semibold hover:underline">
                    View Gallery ({project.galleryCount}) →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Have a project we should quote?"
        description="Send us drawings and specs — our estimating team will follow up within one business day."
      />
    </>
  );
}
