"use client";

import { DisplayHeading } from "@/components/marketing/home/DisplayHeading";
import { Eyebrow } from "@/components/marketing/home/Eyebrow";
import {
  LogoMarqueeRow,
  StaticLogoGrid,
} from "@/components/marketing/home/LogoMarqueeRow";
import {
  partnerCategories,
  type PartnerCategoryId,
} from "@/lib/constants/partners";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const categoryLabelKeys: Record<
  PartnerCategoryId,
  "retail" | "restaurants" | "financial" | "education"
> = {
  retail: "retail",
  restaurants: "restaurants",
  financial: "financial",
  education: "education",
};

export function TrustedPartnersSection() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.12 });
  const categories = t.home.trustedPartners.categories;

  return (
    <section
      ref={sectionRef}
      className="section-padding-lg bg-cream"
      aria-labelledby="trusted-partners-heading"
    >
      <div className="container-tight">
        <div
          className={cn(
            "mx-auto max-w-4xl text-center",
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <Eyebrow variant="brand" className="tracking-[0.5em]">
            {t.home.trustedPartners.eyebrow}
          </Eyebrow>
          <DisplayHeading
            id="trusted-partners-heading"
            as="h2"
            size="md"
            tone="dark"
            className="mt-6"
          >
            {t.home.trustedPartners.title}
          </DisplayHeading>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-warm-black/65 sm:text-lg">
            {t.home.trustedPartners.description}
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {t.home.trustedPartners.proof.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-warm-black/50"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 space-y-16 sm:mt-24 sm:space-y-20">
        {partnerCategories.map((category, index) => {
          const label = categories[categoryLabelKeys[category.id]];
          const countLabel = t.home.trustedPartners.partnerCount.replace(
            "{count}",
            String(category.logos.length),
          );

          return (
            <div
              key={category.id}
              className={cn(
                !reducedMotion && "transition-all duration-700",
                inView || reducedMotion
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0",
              )}
              style={
                reducedMotion
                  ? undefined
                  : { transitionDelay: inView ? `${150 + index * 100}ms` : "0ms" }
              }
            >
              <div className="container-tight mb-6">
                <div className="flex items-center gap-4">
                  <span className="h-px flex-1 bg-warm-black/10" aria-hidden="true" />
                  <p className="shrink-0 text-center text-[10px] font-semibold uppercase tracking-[0.45em] text-warm-black/50">
                    <span className="text-warm-black/70">{label}</span>
                    <span className="mx-2 text-warm-black/25" aria-hidden="true">
                      ·
                    </span>
                    <span>{countLabel}</span>
                  </p>
                  <span className="h-px flex-1 bg-warm-black/10" aria-hidden="true" />
                </div>
              </div>

              {reducedMotion ? (
                <StaticLogoGrid logos={category.logos} />
              ) : (
                <LogoMarqueeRow
                  logos={category.logos}
                  reverse={category.reverse}
                  durationSec={category.durationSec}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="container-tight mt-20 sm:mt-28">
        <p className="mx-auto max-w-3xl text-center text-xs italic leading-relaxed text-warm-black/45 sm:text-sm">
          {t.home.trustedPartners.disclaimer}
        </p>
      </div>
    </section>
  );
}
