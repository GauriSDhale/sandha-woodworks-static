"use client";

import Link from "next/link";
import {
  CredibilityStrip,
  FeaturedProjectsSection,
  HeroIntroSection,
  HeroVideoSection,
  ManufacturingSection,
  SectorsSection,
  TrustedPartnersSection,
} from "@/components/marketing/home";
import { pageMedia } from "@/lib/constants/media";
import { CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { useLang } from "@/lib/i18n/LanguageProvider";

const aboutStatKeys = ["facility", "clients", "services", "sectors"] as const;
const aboutStatValues = ["40,000", "100+", "21+", "12"] as const;

export function HomePageContent() {
  const { t } = useLang();

  return (
    <>
      <HeroVideoSection />
      <HeroIntroSection />
      <CredibilityStrip />
      <TrustedPartnersSection />
      <ManufacturingSection />
      <SectorsSection />
      <FeaturedProjectsSection />

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
