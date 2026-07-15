"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  portfolioFilters,
  portfolioProjects,
  type PortfolioProject,
} from "@/lib/constants/projects";
import { projectGalleries } from "@/lib/constants/media";
import { SiteImage } from "@/components/ui/SiteImage";

function ProjectRow({
  project,
  index,
  inView,
}: {
  project: PortfolioProject;
  index: number;
  inView: boolean;
}) {
  const { t } = useTranslation("portfolio");
  const [scopeExpanded, setScopeExpanded] = useState(false);
  const gallery = projectGalleries[project.slug];

  return (
    <div
      className={`transition-all duration-700 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="w-full md:w-1/5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {t(`filters.${project.category}`, { defaultValue: project.category })}
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold text-foreground">
            {project.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{project.location}</p>
          {project.clientPartner ? (
            <p className="mt-1 text-xs text-muted-foreground">
              {t("detail.client", { name: project.clientPartner })}
            </p>
          ) : null}
          <div className="mt-3">
            <p
              className={`text-sm leading-relaxed text-muted-foreground ${
                scopeExpanded ? "" : "line-clamp-3"
              }`}
            >
              <span className="font-semibold text-foreground">{t("scopeLabel")}</span>{" "}
              {t(`projects.${project.slug}.scope`)}
            </p>
            <button
              type="button"
              onClick={() => setScopeExpanded(!scopeExpanded)}
              className="mt-1 text-xs font-medium text-brand transition hover:text-brand-light"
            >
              {scopeExpanded ? t("showLess") : t("readMore")}
            </button>
          </div>
          <div className="mt-4 border-b border-border" />
          <Link
            href={`/portfolio/${project.slug}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-brand-light"
          >
            {t("viewGallery", { count: project.galleryCount })}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Link
          href={`/portfolio/${project.slug}`}
          className="group w-full overflow-hidden rounded-2xl md:w-4/5"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-warm-black">
            {gallery ? (
              <SiteImage
                src={gallery.cover}
                alt={project.name}
                sizes="(min-width: 768px) 80vw, 100vw"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : null}
          </div>
        </Link>
      </div>
    </div>
  );
}

export function PortfolioPageContent() {
  const { t } = useTranslation("portfolio");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [heroInView, setHeroInView] = useState(false);

  useEffect(() => {
    setHeroInView(true);
  }, []);

  const filteredProjects = useMemo(() => {
    let list = portfolioProjects;
    if (activeFilter !== "All") {
      list = list.filter((project) => project.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((project) => {
        const categoryLabel = t(`filters.${project.category}`, {
          defaultValue: project.category,
        }).toLowerCase();
        return (
          project.name.toLowerCase().includes(q) ||
          project.location.toLowerCase().includes(q) ||
          project.category.toLowerCase().includes(q) ||
          categoryLabel.includes(q)
        );
      });
    }
    return list;
  }, [activeFilter, searchQuery, t]);

  return (
    <>
      <section className="relative overflow-hidden bg-warm-black px-6 py-12 text-cream md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.12),transparent_50%)]" />
        <div
          className={`relative z-10 mx-auto max-w-7xl transition-all duration-700 ${
            heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-semibold md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/70">
            {t("hero.description")}
          </p>
        </div>
      </section>

      <section className="px-6 py-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {portfolioFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-foreground text-cream"
                      : "border border-muted-foreground/20 bg-white text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {t(`filters.${filter}`)}
                </button>
              ))}
            </div>
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-muted-foreground/20 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>

          <div className="mt-14 space-y-16">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectRowContainer key={project.id} project={project} index={index} />
              ))
            ) : (
              <p className="py-20 text-center text-muted-foreground">{t("empty")}</p>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-walnut via-warm-black to-warm-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.2),transparent_50%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              {t("cta.eyebrow")}
            </p>
            <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold text-cream md:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-cream/70">{t("cta.body")}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-cream transition hover:bg-warm-black"
          >
            {t("cta.primary")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function ProjectRowContainer({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <ProjectRow project={project} index={index} inView={inView} />
    </div>
  );
}
