"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { DisplayHeading, DisplayHeadingAccent } from "@/components/marketing/home/DisplayHeading";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const currentYear = new Date().getFullYear();

function HeroReveal({
  children,
  className,
  delayMs,
  reducedMotion,
}: {
  children: ReactNode;
  className?: string;
  delayMs: number;
  reducedMotion: boolean;
}) {
  return (
    <div
      className={cn(
        className,
        !reducedMotion && "animate-hero-rise opacity-0 [animation-fill-mode:forwards]",
      )}
      style={reducedMotion ? undefined : { animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

export function HeroIntroSection() {
  const { t } = useTranslation("home");
  const reducedMotion = useReducedMotion();
  const hero = t("hero", { returnObjects: true }) as {
    tagline: string;
    location: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    viewPortfolio: string;
    requestQuote: string;
    footerCraft: string;
    capabilities: string[];
  };

  return (
    <section
      id="hero-intro"
      className="relative -mt-16 scroll-mt-20 bg-warm-black text-cream sm:-mt-24"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-warm-black sm:-top-24 sm:h-24" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />

      <div className="container-full pb-10 pt-8 sm:pb-14 sm:pt-6">
        <HeroReveal delayMs={80} reducedMotion={reducedMotion}>
          <div className="type-eyebrow flex items-start justify-between text-cream/65">
            <span>{hero.tagline}</span>
            <span className="hidden sm:inline">{hero.location}</span>
          </div>
        </HeroReveal>

        <HeroReveal delayMs={160} reducedMotion={reducedMotion}>
          <DisplayHeading as="h1" tone="light" size="lg" className="mt-8 sm:mt-10">
            <span className="block">{hero.headlineLine1}</span>
            <DisplayHeadingAccent className="mt-1 block sm:mt-2">
              {hero.headlineLine2}
            </DisplayHeadingAccent>
          </DisplayHeading>
        </HeroReveal>

        <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
          <HeroReveal delayMs={280} reducedMotion={reducedMotion}>
            <p className="max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
              {hero.description}
            </p>
          </HeroReveal>

          <HeroReveal delayMs={400} reducedMotion={reducedMotion}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 type-eyebrow text-cream transition-all duration-300 hover:scale-[1.02] hover:bg-warm-black active:scale-[0.98] sm:w-auto"
              >
                {hero.requestQuote}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 type-eyebrow text-cream transition-all duration-300 hover:border-cream hover:bg-cream/10 active:scale-[0.98] sm:w-auto"
              >
                {hero.viewPortfolio}
                <ArrowRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </HeroReveal>
        </div>

        <HeroReveal delayMs={480} reducedMotion={reducedMotion}>
          <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-10 sm:gap-x-6">
            {hero.capabilities.map((item) => (
              <li
                key={item}
                className="type-eyebrow flex items-center gap-2 text-cream/60"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </HeroReveal>

        <HeroReveal delayMs={560} reducedMotion={reducedMotion}>
          <div className="type-eyebrow mt-12 flex items-end justify-between border-t border-cream/15 pt-6 text-cream/55 sm:mt-16">
            <span>© {currentYear}</span>
            <span className="hidden sm:inline">{hero.footerCraft}</span>
            <span className="sm:hidden">{hero.location}</span>
          </div>
        </HeroReveal>
      </div>
    </section>
  );
}
