"use client";

import { useTranslation } from "react-i18next";
import { CareersApplicationForm } from "@/components/marketing/CareersApplicationForm";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { careersCultureIds, openPositionIds } from "@/lib/constants/about";
import { careersMedia, pageMedia } from "@/lib/constants/media";
import { siteConfig } from "@/lib/constants/site";

export function CareersPageContent() {
  const { t } = useTranslation("careers");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={pageMedia.careersHero}
      />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
            <div className="aspect-4/5 overflow-hidden rounded-2xl bg-muted">
              <img
                src={careersMedia.president}
                alt={t("president.photoAlt")}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="px-1 pb-2 pt-6">
              <SectionLabel className="text-brand">{t("president.roleLabel")}</SectionLabel>
              <h2 className="font-display mt-3 text-3xl font-semibold">
                {t("president.name")}
              </h2>
            </div>
          </div>

          <div>
            <SectionLabel className="text-brand">{t("president.messageLabel")}</SectionLabel>
            <h3 className="font-display mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              {t("president.title")}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t("president.p1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("president.p2")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t("culture.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            {t("culture.title")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {careersCultureIds.map((id) => (
              <article key={id} className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-semibold">{t(`culture.items.${id}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`culture.items.${id}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t("positions.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            {t("positions.title")}
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">{t("positions.description")}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              {openPositionIds.map((id) => (
                <article
                  key={id}
                  className="rounded-2xl border border-border bg-white p-6 transition hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold">
                    {t(`positions.items.${id}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`positions.items.${id}.meta`)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(`positions.items.${id}.description`)}
                  </p>
                </article>
              ))}
            </div>

            <CareersApplicationForm />
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("cta.title")}
        description={t("cta.description")}
        primaryLabel={t("cta.primary")}
        primaryHref={`mailto:${siteConfig.hrEmail}`}
      />
    </>
  );
}
