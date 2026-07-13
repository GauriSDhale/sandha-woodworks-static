"use client";

import Link from "next/link";
import { useState } from "react";
import { DisplayHeading } from "@/components/marketing/home/DisplayHeading";
import { Eyebrow } from "@/components/marketing/home/Eyebrow";
import { homeSectorMedia } from "@/lib/constants/media";
import { homeSectors } from "@/lib/constants/site";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const sectorNameKeys = {
  Healthcare: "Healthcare",
  Retail: "Retail",
  Hospitality: "Hospitality",
  Corporate: "Corporate",
  Education: "Education",
  Institutional: "Institutional",
} as const;

export function SectorsSection() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.15, triggerOnce: true });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const s = t.home.sectors;

  return (
    <section
      ref={sectionRef}
      className="section-padding scroll-mt-24 bg-secondary"
      aria-labelledby="sectors-heading"
    >
      <div className="container-full">
        <div
          className={cn(
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <DisplayHeading id="sectors-heading" size="sm" className="mt-4 max-w-3xl">
            {s.title}
          </DisplayHeading>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5",
            !reducedMotion && "transition-all duration-700 delay-150",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {homeSectors.map((sector, index) => {
            const nameKey = sectorNameKeys[sector.label as keyof typeof sectorNameKeys];
            const label = nameKey ? s.names[nameKey] : sector.label;
            const number = String(index + 1).padStart(2, "0");
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <Link
                key={sector.href}
                href={sector.href}
                className={cn(
                  "group relative block overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
                  !reducedMotion && "transition-[opacity,transform] duration-500 ease-out",
                  isDimmed && "opacity-45",
                  hoveredIndex === index && "z-10",
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-[4/3] lg:aspect-[5/4]">
                  <img
                    src={homeSectorMedia[sector.imageKey]}
                    alt={label}
                    className={cn(
                      "h-full w-full object-cover",
                      !reducedMotion && "transition-transform duration-700 ease-out group-hover:scale-105",
                    )}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/85 group-hover:via-black/35" />

                  <span className="pointer-events-none absolute left-4 top-4 font-display text-sm font-medium tracking-widest text-white/50 sm:left-5 sm:top-5">
                    {number}
                  </span>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="block text-lg font-semibold text-white sm:text-xl">{label}</span>
                    <span
                      className={cn(
                        "mt-1.5 block text-sm font-medium text-brand",
                        reducedMotion
                          ? "opacity-100"
                          : "translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
                      )}
                    >
                      {s.cardExplore}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div
          className={cn(
            "mt-10 flex justify-center lg:mt-12",
            !reducedMotion && "transition-all duration-700 delay-300",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <Link
            href="/sectors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-warm-black"
          >
            {s.explore}
          </Link>
        </div>
      </div>
    </section>
  );
}
