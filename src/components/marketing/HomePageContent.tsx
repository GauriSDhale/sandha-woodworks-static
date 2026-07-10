"use client";

import Link from "next/link";
import {
  CredibilityStrip,
  HeroIntroSection,
  HeroVideoSection,
  ManufacturingSection,
  TrustedPartnersSection,
} from "@/components/marketing/home";
import { homeSectors } from "@/lib/constants/site";
import { featuredProjects as projects } from "@/lib/constants/projects";
import { homeSectorMedia, pageMedia, projectMedia } from "@/lib/constants/media";
import { CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { useLang } from "@/lib/i18n/LanguageProvider";

const aboutStatKeys = ["facility", "clients", "services", "sectors"] as const;
const aboutStatValues = ["40,000", "100+", "21+", "12"] as const;

const sectorNameKeys = {
  Healthcare: "Healthcare",
  Retail: "Retail",
  Hospitality: "Hospitality",
  Corporate: "Corporate",
  Education: "Education",
  Institutional: "Institutional",
} as const;

export function HomePageContent() {
  const { t } = useLang();

  return (
    <>
      <HeroVideoSection />
      <HeroIntroSection />
      <CredibilityStrip />
      <TrustedPartnersSection />
      <ManufacturingSection />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t.home.sectors.eyebrow}</SectionLabel>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold md:text-5xl">
            {t.home.sectors.title}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeSectors.map((sector) => {
              const nameKey = sectorNameKeys[sector.label as keyof typeof sectorNameKeys];
              const label = nameKey ? t.home.sectors.names[nameKey] : sector.label;

              return (
                <Link
                  key={sector.href}
                  href={sector.href}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={homeSectorMedia[sector.imageKey]}
                      alt={label}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="pointer-events-none absolute bottom-4 left-4 text-lg font-semibold text-white">
                      {label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            href="/sectors"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
          >
            {t.home.sectors.explore}
          </Link>
        </div>
      </section>

      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t.home.projects.eyebrow}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            {t.home.projects.title}
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={project.href}
                className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={projectMedia[project.imageKey]}
                    alt={project.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>{t.home.about.eyebrow}</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
              {t.home.about.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.home.about.body}</p>
            <Link href="/about-us" className="mt-6 inline-flex text-sm font-semibold hover:underline">
              {t.home.about.cta}
            </Link>
          </div>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={pageMedia.facilityAerial}
                alt="Sandha Woodworks aerial facility view"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {aboutStatKeys.map((key, index) => (
                <article
                  key={key}
                  className="rounded-2xl border border-border bg-muted p-6 text-center"
                >
                  <p className="font-display text-3xl font-semibold">{aboutStatValues[index]}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t.home.about.stats[key]}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow={t.home.cta.eyebrow}
        title={t.home.cta.title}
        description={t.home.cta.description}
        primaryLabel={t.home.cta.primary}
        secondaryLabel={t.home.cta.secondary}
      />
    </>
  );
}
