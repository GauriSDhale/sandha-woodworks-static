"use client";

import { useState } from "react";
import Link from "@/components/i18n/Link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ServiceItem, ServiceCategory } from "@/lib/constants/services";
import { serviceDetailMeta } from "@/lib/constants/services";
import { CtaBanner } from "@/components/marketing/PageSections";
import { SectionAnchorNav } from "@/components/marketing/SectionAnchorNav";

function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium transition hover:bg-muted/50"
          >
            <span>{faq.question}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function asFaqArray(value: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is { question: string; answer: string } =>
      !!v &&
      typeof v === "object" &&
      typeof (v as { question?: unknown }).question === "string" &&
      typeof (v as { answer?: unknown }).answer === "string",
  );
}

function asProcessSteps(
  value: unknown,
): { step: string; description: string }[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is { step: string; description: string } =>
      !!v &&
      typeof v === "object" &&
      typeof (v as { step?: unknown }).step === "string" &&
      typeof (v as { description?: unknown }).description === "string",
  );
}

export function ServiceDetailContent({
  service,
  category,
  related,
}: {
  service: ServiceItem;
  category: ServiceCategory;
  related: ServiceItem[];
}) {
  const { t } = useTranslation("services");
  const { t: td } = useTranslation("serviceDetails");
  const slug = service.slug;

  const name = t(`items.${slug}.name`);
  const description = t(`items.${slug}.description`);
  const categoryTitle = t(`categories.${category.id}.title`);

  const overview = td(`details.${slug}.overview`);
  const bestFor = asStringArray(td(`details.${slug}.bestFor`, { returnObjects: true }));
  const deliverables = asStringArray(
    td(`details.${slug}.deliverables`, { returnObjects: true }),
  );
  const faqs = asFaqArray(td(`details.${slug}.faqs`, { returnObjects: true }));
  const gallery = serviceDetailMeta[slug]?.gallery ?? [];
  const processSteps = asProcessSteps(t("defaultProcess", { returnObjects: true }));

  const tocDefs = [
    { id: "overview", labelKey: "detail.toc.overview" as const, show: true },
    {
      id: "best-for",
      labelKey: "detail.toc.bestFor" as const,
      show: bestFor.length > 0,
    },
    { id: "process", labelKey: "detail.toc.process" as const, show: true },
    {
      id: "deliverables",
      labelKey: "detail.toc.deliverables" as const,
      show: deliverables.length > 0,
    },
    {
      id: "gallery",
      labelKey: "detail.toc.gallery" as const,
      show: gallery.length > 0,
    },
    { id: "faqs", labelKey: "detail.toc.faqs" as const, show: faqs.length > 0 },
  ];

  const filteredToc = tocDefs
    .filter((item) => item.show)
    .map((item) => ({ id: item.id, label: t(item.labelKey) }));

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-24">
        <img
          src={service.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> {t("detail.back")}
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            {description}
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {name}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-warm-black"
            >
              {t("detail.requestQuote")} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#overview"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-foreground"
            >
              {t("detail.readArticle")} <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <SectionAnchorNav items={filteredToc} label={t("detail.sectionsNav")} />

      <section id="overview" className="scroll-mt-28 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-semibold">
              {t("detail.sections.overview")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{overview}</p>
          </div>
        </div>
      </section>

      {bestFor.length > 0 && (
        <section
          id="best-for"
          className="scroll-mt-28 border-t border-border bg-muted px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-semibold">
                {t("detail.sections.bestFor")}
              </h2>
              <ul className="mt-6 space-y-3">
                {bestFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section id="process" className="scroll-mt-28 border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-semibold">
              {t("detail.sections.process")}
            </h2>
            <div className="mt-10 space-y-8">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.step}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {deliverables.length > 0 && (
        <section
          id="deliverables"
          className="scroll-mt-28 border-t border-border bg-muted px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-semibold">
                {t("detail.sections.deliverables")}
              </h2>
              <ul className="mt-6 space-y-3">
                {deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="mt-0.5 text-brand">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section id="gallery" className="scroll-mt-28 border-t border-border px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl font-semibold">
              {t("detail.sections.gallery")}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-xl bg-muted">
                  <img
                    src={img}
                    alt={t("detail.sections.galleryAlt", { name, index: i + 1 })}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section
          id="faqs"
          className="scroll-mt-28 border-t border-border bg-muted px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-semibold">
                {t("detail.sections.faqs")}
              </h2>
              <div className="mt-8">
                <FaqAccordion faqs={faqs} />
              </div>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl font-semibold">
              {t("detail.sections.related", { category: categoryTitle.toLowerCase() })}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={s.image}
                      alt={t(`items.${s.slug}.name`)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold">
                      {t(`items.${s.slug}.name`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`items.${s.slug}.description`)}
                    </p>
                    <p className="mt-auto pt-4 text-sm font-medium text-brand transition group-hover:text-brand-light">
                      {t("detail.sections.learnMore")} <span aria-hidden="true">→</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        eyebrow={t("detail.cta.eyebrow")}
        title={t("detail.cta.title", { name: name.toLowerCase() })}
        description={t("detail.cta.description")}
        primaryHref="/contact"
        primaryLabel={t("detail.cta.primary")}
        secondaryHref="/portfolio"
        secondaryLabel={t("detail.cta.secondary")}
      />
    </>
  );
}
