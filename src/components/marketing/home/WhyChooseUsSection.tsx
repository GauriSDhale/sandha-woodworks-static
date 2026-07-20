"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CountUpStat } from "@/components/marketing/home/CountUpStat";
import { CredibilityStrip } from "@/components/marketing/home/CredibilityStrip";
import { getRecentProjectSlides } from "@/lib/projects/recent";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { SiteImage } from "@/components/ui/SiteImage";

const statKeys = ["founded", "facility", "projects", "clients", "services", "sectors", "awmac"] as const;

export function WhyChooseUsSection() {
  const { t } = useTranslation("home");
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1, triggerOnce: true });
  const copy = t("whyChooseUs", { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    projectsEyebrow: string;
    viewProject: string;
    viewAllProjects: string;
    emptyProjects: string;
    stats: Record<
      (typeof statKeys)[number],
      { value: number | null; display?: string; suffix: string; label: string; description: string; format?: "comma" }
    >;
    reasons: Array<{ title: string; description: string }>;
  };
  const slides = getRecentProjectSlides(8);
  const [activeIndex, setActiveIndex] = useState(0);
  const current = slides[activeIndex] ?? null;
  const hasSlides = slides.length > 0;

  useEffect(() => {
    if (!hasSlides || reducedMotion || slides.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [hasSlides, reducedMotion, slides.length]);

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-24 bg-white"
      aria-labelledby="why-choose-us-heading"
    >
      {/* Stats + copy — Archmill-inspired clean split */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-8 sm:px-6 sm:pt-10 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-12">
        <div
          className={cn(
            "grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10",
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "opacity-100" : "opacity-0",
          )}
        >
          {statKeys.map((key, index) => {
            const stat = copy.stats[key];
            const isAWMAC = key === "awmac";
            return (
              <div
                key={key}
                className={cn(
                  isAWMAC && "col-span-full",
                  !reducedMotion && "transition-all duration-700",
                  inView || reducedMotion
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <CountUpStat
                  value={stat.value}
                  display={"display" in stat ? stat.display : undefined}
                  suffix={stat.suffix}
                  format={"format" in stat ? stat.format : undefined}
                  label={stat.label}
                  description={stat.description}
                  delayMs={index * 120}
                  active={inView}
                  className="[&_p:first-child]:font-display [&_p:first-child]:text-2xl [&_p:first-child]:font-semibold [&_p:first-child]:tracking-tight [&_p:first-child]:text-foreground sm:[&_p:first-child]:text-3xl lg:[&_p:first-child]:text-4xl lg:[&_p:first-child]:leading-[1.1] [&_p:nth-child(2)]:type-eyebrow [&_p:nth-child(2)]:mt-2 [&_p:nth-child(2)]:text-brand [&_p:nth-child(2)]:no-underline [&_p:last-child]:mt-1 [&_p:last-child]:text-base [&_p:last-child]:text-muted-foreground"
                />
              </div>
            );
          })}
        </div>

        <div
          className={cn(
            "flex flex-col justify-center",
            !reducedMotion && "transition-all duration-700 delay-100",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <p className="type-eyebrow text-brand">
            {copy.eyebrow}
          </p>
          <h2
            id="why-choose-us-heading"
            className="font-display mt-4 max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
          >
            {copy.title}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.description}
          </p>

          <ul className="mt-10 space-y-6 border-t border-border pt-8">
            {copy.reasons.map((reason) => (
              <li key={reason.title}>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {reason.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CredibilityStrip className="mt-10 sm:mt-12" />

      <div className="flex justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Link
          href="/contact"
          className="inline-flex w-fit cursor-pointer items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-cream transition hover:bg-warm-black"
        >
          {copy.cta}
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-white text-foreground">
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
        </Link>
      </div>

      {/* Inset recent projects carousel — side padding like Archmill */}
      {hasSlides && current ? (
        <div className="bg-white px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-warm-black shadow-sm sm:rounded-3xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9]">
              {slides.map((slide, index) => (
                <Link
                  key={slide.slug}
                  href={slide.href}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    index === activeIndex
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                  aria-hidden={index !== activeIndex}
                  tabIndex={index === activeIndex ? 0 : -1}
                >
                  <SiteImage
                    src={slide.cover}
                    alt={slide.name}
                    sizes="(min-width: 1280px) 1280px, 100vw"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                </Link>
              ))}

              {slides.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (index) => (index - 1 + slides.length) % slides.length,
                      )
                    }
                    className="absolute left-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-warm-black sm:left-5 sm:size-12"
                    aria-label={t("carousel.previous")}
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((index) => (index + 1) % slides.length)
                    }
                    className="absolute right-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-warm-black sm:right-5 sm:size-12"
                    aria-label={t("carousel.next")}
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </>
              ) : null}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="type-eyebrow text-brand">
                      {copy.projectsEyebrow}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-semibold text-white sm:text-3xl">
                      {current.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
                      {current.location} ·{" "}
                      {t(`projects.categories.${current.category}`, {
                        defaultValue: current.category,
                      })}
                    </p>
                  </div>
                  <div className="pointer-events-auto flex flex-wrap items-center gap-3">
                    <Link
                      href={current.href}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-warm-black transition hover:bg-brand"
                    >
                      {copy.viewProject}
                      <ArrowRight className="size-3.5" />
                    </Link>
                    <Link
                      href="/portfolio"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white/10"
                    >
                      {copy.viewAllProjects}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {slides.length > 1 ? (
              <div className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-4">
                {slides.map((slide, index) => (
                  <button
                    key={slide.slug}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "h-2 cursor-pointer rounded-full transition-all",
                      index === activeIndex
                        ? "w-8 bg-brand"
                        : "w-2 bg-white/25 hover:bg-white/45",
                    )}
                    aria-label={`Show ${slide.name}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="border-t border-border bg-muted/40 px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
            {copy.emptyProjects}
          </p>
          <Link
            href="/portfolio"
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-warm-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-brand hover:text-warm-black"
          >
            {copy.viewAllProjects}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
