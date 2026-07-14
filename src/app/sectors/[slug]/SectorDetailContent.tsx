"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CtaBanner } from "@/components/marketing/PageSections";
import { sectorDetails } from "@/lib/constants/sector-details";

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function asWhyChoose(value: unknown): { title: string; description: string }[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is { title: string; description: string } =>
      !!v &&
      typeof v === "object" &&
      typeof (v as { title?: unknown }).title === "string" &&
      typeof (v as { description?: unknown }).description === "string",
  );
}

export function SectorDetailContent({ slug }: { slug: string }) {
  const { t } = useTranslation("sectors");
  const { t: td } = useTranslation("sectorDetails");
  const { t: ts } = useTranslation("services");

  const meta = sectorDetails[slug];
  const heading = td(`details.${slug}.heading`);
  const description = td(`details.${slug}.description`);
  const about = td(`details.${slug}.about`);
  const standards = asStringArray(td(`details.${slug}.standards`, { returnObjects: true }));
  const features = asStringArray(td(`details.${slug}.features`, { returnObjects: true }));
  const whyChoose = asWhyChoose(td(`details.${slug}.whyChoose`, { returnObjects: true }));
  const ctaHeading = td(`details.${slug}.cta.heading`);
  const ctaDescription = td(`details.${slug}.cta.description`);

  const otherSectors = Object.entries(sectorDetails)
    .filter(([s]) => s !== slug)
    .slice(0, 6);

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-24">
        <img
          src={meta.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/sectors"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> {t("detail.back")}
          </Link>
          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {heading}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/75">{description}</p>
        </div>
      </section>

      <section className="border-b border-border bg-muted px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-semibold">{t("detail.aboutTitle")}</h2>
            {about.split("\n\n").map((p, i) => (
              <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {standards.length > 0 && (
        <section className="border-b border-border px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {t("detail.standardsLabel")}
              </h3>
              <ul className="mt-6 space-y-3">
                {standards.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {features.length > 0 && (
        <section className="border-b border-border bg-muted px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold">{t("detail.featuresTitle")}</h2>
              <ul className="mt-6 space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {whyChoose.length > 0 && (
        <section className="border-b border-border px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {t("detail.whyLabel")}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold">{t("detail.whyTitle")}</h2>
            <div className="mt-10 space-y-8">
              {whyChoose.map((item, i) => (
                <div key={i} className="flex gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {meta.serviceSlugs.length > 0 && (
        <section className="border-t border-border bg-muted px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {t("detail.servicesLabel")}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold">
              {t("detail.servicesTitle")}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {meta.serviceSlugs.map((serviceSlug) => (
                <Link
                  key={serviceSlug}
                  href={`/services/${serviceSlug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
                >
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold">
                      {ts(`items.${serviceSlug}.name`)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {ts(`items.${serviceSlug}.description`)}
                    </p>
                    <p className="mt-auto pt-4 text-sm font-medium text-brand transition group-hover:text-brand-light">
                      {t("detail.readArticle")} <span aria-hidden="true">→</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        eyebrow={t("detail.ctaEyebrow")}
        title={ctaHeading}
        description={ctaDescription}
        primaryHref="/contact"
        primaryLabel={t("detail.requestQuote")}
        secondaryHref="/portfolio"
        secondaryLabel={t("detail.seeProjects")}
      />

      {otherSectors.length > 0 && (
        <section className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {t("detail.otherLabel")}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold">{t("detail.otherTitle")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {otherSectors.map(([s, sd]) => {
                const otherHeading = td(`details.${s}.heading`);
                return (
                  <Link
                    key={s}
                    href={`/sectors/${s}`}
                    className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-surface-dark"
                  >
                    <img
                      src={sd.image}
                      alt={otherHeading}
                      className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="relative z-10 p-4">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {otherHeading.replace(/ Millwork$/i, "").replace(/ d'ébénisterie$/i, "")}
                      </h3>
                      <span className="mt-1 inline-flex items-center gap-1 text-sm text-brand">
                        {t("detail.explore")} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
