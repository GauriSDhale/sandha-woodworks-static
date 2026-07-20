"use client";

import { useTranslation } from "react-i18next";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Capabilities & trust band — warm wood/gold styling scoped to this block only.
 * Site-wide titles/eyebrows keep the bluish brand accent.
 */
export function CredibilityStrip({ className }: { className?: string }) {
  const { t } = useTranslation("home");
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  const credibility = t("credibility", { returnObjects: true }) as {
    eyebrow: string;
    tagline: string;
    items: string[];
  };

  return (
    <aside
      ref={sectionRef}
      className={cn("credibility-band relative overflow-hidden text-cream", className)}
      aria-labelledby="credibility-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center",
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <p className="credibility-band-accent type-eyebrow">
            {credibility.eyebrow}
          </p>
          <h3
            id="credibility-heading"
            className="font-display mt-4 text-2xl font-semibold tracking-tight text-cream sm:text-3xl md:text-4xl"
          >
            {credibility.tagline}
          </h3>
          <div className="credibility-band-rule mx-auto mt-5 h-[3px] w-12" aria-hidden="true" />
        </div>

        <ul
          className={cn(
            "mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:mt-12 sm:gap-x-4 sm:gap-y-3.5",
            !reducedMotion && "transition-all duration-700 delay-150",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          {credibility.items.map((item, index) => (
            <li
              key={item}
              className={cn(
                "credibility-band-pill inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/[0.06] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-cream/85 backdrop-blur-sm transition-colors duration-300 hover:bg-cream/[0.1] hover:text-cream sm:px-5 sm:text-sm",
                !reducedMotion && "transition-[opacity,transform] duration-500",
                inView || reducedMotion
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0",
              )}
              style={
                reducedMotion
                  ? undefined
                  : { transitionDelay: inView ? `${120 + index * 40}ms` : "0ms" }
              }
            >
              <span className="credibility-band-dot h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
