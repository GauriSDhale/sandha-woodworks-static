"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CtaBanner } from "@/components/marketing/PageSections";
import { MarketProjectCarousel } from "@/components/marketing/MarketProjectCarousel";
import { sectors, marketDetails } from "@/lib/constants/sectors";
import { sectorDetails } from "@/lib/constants/sector-details";
import type { MarketProjectSlide } from "@/lib/markets/project-gallery";

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export function MarketDetailContent({
  slug,
  projectSlides,
}: {
  slug: string;
  projectSlides: MarketProjectSlide[];
}) {
  const { t } = useTranslation("sectors");
  const { t: td } = useTranslation("sectorDetails");

  const sector = sectors.find((s) => s.id === slug)!;
  const detail = marketDetails[slug];
  const title = t(`markets.${slug}.title`);
  const description = t(`markets.${slug}.description`);
  const otherMarkets = sectors.filter((s) => s.id !== slug);

  const overview = detail ? t(`marketDetails.${slug}.overview`) : "";
  const overviewBullets = detail
    ? asStringArray(t(`marketDetails.${slug}.overviewBullets`, { returnObjects: true }))
    : [];

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-24">
        <img
          src={sector.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/sectors"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> {t("market.back")}
          </Link>
          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/75">{description}</p>
          {detail ? (
            <p className="mt-3 text-sm text-white/50">
              {t("market.capabilityCount", { count: detail.subSectors.length })}
            </p>
          ) : null}
        </div>
      </section>

      {detail ? (
        <>
          <section className="scroll-mt-28 border-b border-border bg-muted px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl">
                <h2 className="font-display text-2xl font-semibold">{t("market.aboutTitle")}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{overview}</p>
                <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {t("market.overviewLabel")}
                </h3>
                <ul className="mt-4 space-y-3">
                  {overviewBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {t("market.subSectorsLabel")}
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold">
                {t("market.subSectorsTitle", { market: title.toLowerCase() })}
              </h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">{t("market.subSectorsBody")}</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {detail.subSectors.map((sub) => {
                  const name = t(`marketDetails.${slug}.subSectors.${sub.slug}.name`);
                  return (
                    <div
                      key={sub.slug}
                      className="flex flex-col rounded-xl border border-border bg-card p-6"
                    >
                      <h3 className="font-display text-lg font-semibold">{name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {t(`marketDetails.${slug}.subSectors.${sub.slug}.description`)}
                      </p>
                      {sub.portfolioPdf ? (
                        <a
                          href={sub.portfolioPdf}
                          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
                        >
                          {t("market.explorePortfolio", { name })}{" "}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <MarketProjectCarousel marketTitle={title} slides={projectSlides} />

          {detail.relatedSectorSlugs.length > 0 && (
            <section className="border-t border-border bg-muted px-4 py-10 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {t("market.relatedLabel")}
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold">
                  {t("market.relatedTitle", { market: title })}
                </h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {detail.relatedSectorSlugs.map((relatedSlug) => {
                    const sd = sectorDetails[relatedSlug];
                    const relatedHeading = td(`details.${relatedSlug}.heading`);
                    const relatedDescription = td(`details.${relatedSlug}.description`);
                    return (
                      <Link
                        key={relatedSlug}
                        href={`/sectors/${relatedSlug}`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-muted">
                          <img
                            src={sd?.image ?? sector.image}
                            alt={relatedHeading}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-display text-lg font-semibold">{relatedHeading}</h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {relatedDescription}
                          </p>
                          <p className="mt-auto pt-4 text-sm font-medium text-brand transition group-hover:text-brand-light">
                            {t("market.readSector")} <span aria-hidden="true">→</span>
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      ) : null}

      {otherMarkets.length > 0 && (
        <section className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {t("market.otherLabel")}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold">{t("market.otherTitle")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {otherMarkets.map((m) => {
                const otherTitle = t(`markets.${m.id}.title`);
                return (
                  <Link
                    key={m.id}
                    href={m.href}
                    className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-surface-dark"
                  >
                    <img
                      src={m.image}
                      alt={otherTitle}
                      className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="relative z-10 p-4">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {otherTitle}
                      </h3>
                      <span className="mt-1 inline-flex items-center gap-1 text-sm text-brand">
                        {t("market.explore")} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        eyebrow={t("market.cta.eyebrow")}
        title={t("market.cta.title", { market: title.toLowerCase() })}
        description={t("market.cta.description")}
        primaryHref="/contact"
        primaryLabel={t("market.cta.primary")}
        secondaryHref="/portfolio"
        secondaryLabel={t("market.cta.secondary")}
      />
    </>
  );
}
