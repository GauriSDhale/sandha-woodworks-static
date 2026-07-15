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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("home");
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.12 });
  const categories = t("trustedPartners.categories", { returnObjects: true }) as Record<
    "retail" | "restaurants" | "financial" | "education",
    string
  >;
  const proof = t("trustedPartners.proof", { returnObjects: true }) as string[];

  return (
    <section
      ref={sectionRef}
      className="section-padding scroll-mt-24 bg-white"
      aria-labelledby="trusted-partners-heading"
    >
      <div className="container-full">
        <div
          className={cn(
            "mx-auto max-w-2xl text-center",
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <Eyebrow variant="brand">{t("trustedPartners.eyebrow")}</Eyebrow>
          <DisplayHeading
            id="trusted-partners-heading"
            as="h2"
            size="sm"
            tone="dark"
            className="mt-3 tracking-tight"
          >
            {t("trustedPartners.title")}
          </DisplayHeading>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("trustedPartners.description")}
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {proof.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
        {partnerCategories.map((category, index) => {
          const label = categories[categoryLabelKeys[category.id]];
          const countLabel = t("trustedPartners.partnerCount", {
            count: category.logos.length,
          });

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
              <div className="container-full mb-6">
                <div className="flex items-center gap-4">
                  <span className="h-px flex-1 bg-warm-black/10" aria-hidden="true" />
                  <p className="shrink-0 text-center text-xs font-semibold tracking-wide text-warm-black/50">
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

      <div className="container-full mt-12 sm:mt-14">
        <p className="mx-auto max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          {t("trustedPartners.disclaimer")}
        </p>
      </div>
    </section>
  );
}
