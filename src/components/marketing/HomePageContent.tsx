"use client";

import Link from "next/link";
import { HeroVideo } from "@/components/marketing/HeroVideo";
import { homeSectors } from "@/lib/constants/site";
import { featuredProjects as projects } from "@/lib/constants/projects";
import { homeSectorMedia, pageMedia, projectMedia } from "@/lib/constants/media";
import { CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { useLang } from "@/lib/i18n/LanguageProvider";

const homeStatKeys = ["founded", "facility", "projects"] as const;
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
  const homeStatValues = ["2014", "40,000+", "500+"] as const;

  return (
    <>
      <section className="relative h-[100svh] w-full overflow-hidden bg-surface-dark">
        <HeroVideo />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[8vh] bg-gradient-to-b from-surface-dark to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[10vh] bg-gradient-to-t from-surface-dark to-transparent" />
      </section>

      <section className="overflow-hidden border-y border-border bg-white py-5">
        <div className="animate-marquee flex w-max gap-3 px-4">
          {[...t.credibility.items, ...t.credibility.items].map((pill, index) => (
            <span
              key={`${pill}-${index}`}
              className="whitespace-nowrap rounded-full border border-border bg-muted px-4 py-2 text-xs font-medium uppercase tracking-wide text-foreground/75"
            >
              {pill}
            </span>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t.home.trustedPartners.eyebrow}</SectionLabel>
          <h2 className="font-display mt-4 max-w-4xl text-3xl font-semibold md:text-5xl">
            {t.home.trustedPartners.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.home.trustedPartners.description}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.trustedPartners.sectors.map((sector) => (
              <div
                key={sector}
                className="rounded-2xl border border-border bg-muted px-6 py-8 text-center text-sm font-semibold uppercase tracking-wide"
              >
                {sector}
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            {t.home.trustedPartners.disclaimer}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-dark px-4 py-20 text-surface-cream sm:px-6 lg:px-8">
        <img
          src={pageMedia.facilityAerial}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel className="text-surface-cream/50">
              {t.home.manufacturing.eyebrow}
            </SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
              {t.home.manufacturing.title}
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-surface-cream/75">
              {t.home.manufacturing.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {homeStatKeys.map((key, index) => (
              <article
                key={key}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <p className="font-display text-4xl font-semibold">{homeStatValues[index]}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide">
                  {t.home.manufacturing.stats[key].label}
                </p>
                <p className="mt-2 text-sm text-surface-cream/60">
                  {t.home.manufacturing.stats[key].description}
                </p>
              </article>
            ))}
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wide">AWMAC</p>
              <p className="mt-2 text-sm text-surface-cream/60">
                {t.home.manufacturing.stats.awmac.label}
              </p>
              <p className="mt-2 text-sm text-surface-cream/75">
                {t.home.manufacturing.stats.awmac.description}
              </p>
            </article>
          </div>
        </div>
      </section>

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
