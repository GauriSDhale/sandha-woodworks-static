"use client";

import Link from "@/components/i18n/Link";
import { ArrowRight, Wrench, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { SectionAnchorNav } from "@/components/marketing/SectionAnchorNav";
import {
  serviceCategories,
  servicesSectorLinks,
  type ServiceItem,
} from "@/lib/constants/services";
import { pageMedia } from "@/lib/constants/media";

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const { t } = useTranslation("services");

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
    >
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={service.image}
          alt={t(`items.${service.slug}.name`)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="font-display mt-2 text-lg font-semibold">
          {t(`items.${service.slug}.name`)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t(`items.${service.slug}.description`)}
        </p>
        <p className="mt-auto pt-4 text-sm font-medium text-brand transition group-hover:text-brand-light">
          {t("readArticle")} <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}

export function ServicesPageContent() {
  const { t } = useTranslation("services");
  const standards = t("standards", { returnObjects: true }) as string[];

  const categoryNavItems = serviceCategories.map((cat) => ({
    id: cat.id,
    label: t(`categories.${cat.id}.title`),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={pageMedia.servicesHero}
      />

      <section className="border-b border-border bg-muted px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t("vs.label")}</SectionLabel>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                <Wrench className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t("vs.whatTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("vs.whatBody")}
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
              >
                {t("vs.whatCta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                <Building2 className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t("vs.whereTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("vs.whereBodyBefore")}{" "}
                <Link href="/sectors" className="font-semibold underline">
                  {t("vs.whereBodyLink")}
                </Link>
                {t("vs.whereBodyAfter")}
              </p>
              <Link
                href="/sectors"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
              >
                {t("vs.whereCta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {t("vs.standardsLabel")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.isArray(standards)
                ? standards.map((standard) => (
                    <span
                      key={standard}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {standard}
                    </span>
                  ))
                : null}
            </div>
          </div>
        </div>
      </section>

      <SectionAnchorNav items={categoryNavItems} label={t("categoriesNav")} />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-20">
          {serviceCategories.map((category) => (
            <article key={category.id} id={category.id} className="scroll-mt-28">
              <div className="border-b border-border pb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t("categoryMeta", {
                    number: category.number,
                    count: category.count,
                  })}
                </p>
                <h2 className="font-display mt-2 text-3xl font-semibold">
                  {t(`categories.${category.id}.title`)}
                </h2>
                <p className="mt-2 max-w-3xl text-muted-foreground">
                  {t(`categories.${category.id}.description`)}
                </p>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service, index) => (
                  <ServiceCard key={service.slug} service={service} index={index} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t("sectors.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            {t("sectors.title")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesSectorLinks.map((sector) => (
              <Link
                key={sector.slug}
                href={`/sectors/${sector.slug}`}
                className="group relative flex items-end overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={sector.image}
                    alt={t(`sectorLinks.${sector.slug}.name`)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {t(`sectorLinks.${sector.slug}.name`)}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    {t("sectors.explore")} <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        secondaryLabel={t("cta.secondary")}
        secondaryHref="/portfolio"
      />
    </>
  );
}
