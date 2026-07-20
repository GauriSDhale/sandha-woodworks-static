"use client";

import { useTranslation } from "react-i18next";
import { SociableKitLinkedInFeed } from "@/components/marketing/SociableKitLinkedInFeed";

const LINKEDIN_COMPANY =
  "https://www.linkedin.com/company/sandha-woodworks-service-ltd/";
const LINKEDIN_POSTS =
  "https://www.linkedin.com/company/sandha-woodworks-service-ltd/posts/?feedView=all";

const whyFollowIds = ["01", "02", "03", "04"] as const;

const linkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export function InsightPageContent() {
  const { t } = useTranslation("insight");

  return (
    <>
      <section className="relative overflow-hidden bg-[#111111] pt-24 pb-10 text-cream sm:pt-28 sm:pb-14">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,#0A66C2_0%,transparent_45%),radial-gradient(circle_at_80%_60%,#0A66C2_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#4DA3E8]">
            <span className="h-px w-8 bg-[#4DA3E8]" />
            <span>{t("hero.eyebrow")}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-[6rem]">
            {t("hero.titleLine1")}
            <span className="block text-[#0A66C2]">{t("hero.titleLine2")}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {t("hero.description")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={LINKEDIN_COMPANY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition-transform hover:scale-[1.02] hover:bg-warm-black"
            >
              {linkedInIcon}
              {t("hero.followCta")}
            </a>
            <a
              href={LINKEDIN_POSTS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-cream/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition-colors hover:bg-cream hover:text-foreground"
            >
              {t("hero.postsCta")}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-muted py-8 sm:py-12">
        <div className="w-full sm:mx-auto sm:max-w-7xl sm:px-6">
          <div className="px-4 sm:px-0">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand">
                {t("feed.label")}
              </p>
              <h2 className="font-display text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
                {t("feed.title")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("feed.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 w-full sm:mx-auto sm:max-w-7xl sm:px-6">
          <SociableKitLinkedInFeed columns={2} posts={8} />
        </div>
      </section>

      <section className="bg-[#111111] py-10 text-cream sm:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#4DA3E8]">
            {t("loop.label")}
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            {t("loop.title")}
          </h2>
          <a
            href={LINKEDIN_COMPANY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition-colors hover:bg-warm-black"
          >
            {linkedInIcon}
            {t("loop.followCta")}
          </a>
        </div>
      </section>

      <section className="bg-cream py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand">
              {t("why.label")}
            </p>
            <h2 className="font-display text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
              {t("why.title")}
            </h2>
          </div>

          <ul className="mt-8 grid gap-4">
            {whyFollowIds.map((id) => (
              <li
                key={id}
                className="flex gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-[#0A66C2]/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                  {id}
                </div>
                <div>
                  <h4 className="font-display text-lg">{t(`why.items.${id}.title`)}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`why.items.${id}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
