"use client";

import Link from "next/link";
import { ArrowRight, Building2, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { SectorsGrid } from "@/components/marketing/SectorsGrid";
import { pageMedia } from "@/lib/constants/media";

export function SectorsPageContent() {
  const { t } = useTranslation("sectors");
  const approvals = t("approvals", { returnObjects: true }) as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={pageMedia.sectorsHero}
      />

      <section className="border-b border-border bg-muted px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t("vs.label")}</SectionLabel>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                <Building2 className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t("vs.whoTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("vs.whoBody")}
              </p>
              <Link
                href="/sectors"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
              >
                {t("vs.whoCta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                <Wrench className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t("vs.whatTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("vs.whatBodyBefore")}{" "}
                <Link href="/services" className="font-semibold underline">
                  {t("vs.whatBodyLink")}
                </Link>
                {t("vs.whatBodyAfter")}
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
              >
                {t("vs.whatCta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {t("vs.approvalsLabel")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.isArray(approvals)
                ? approvals.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))
                : null}
            </div>
          </div>
        </div>
      </section>

      <SectorsGrid />

      <CtaBanner
        eyebrow={t("indexCta.eyebrow")}
        title={t("indexCta.title")}
        secondaryLabel={t("indexCta.secondary")}
        secondaryHref="/portfolio"
      />
    </>
  );
}
