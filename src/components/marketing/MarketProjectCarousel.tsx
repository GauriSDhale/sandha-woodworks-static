"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { MarketProjectSlide } from "@/lib/markets/project-gallery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MarketProjectCarouselProps {
  marketTitle: string;
  slides: MarketProjectSlide[];
}

export function MarketProjectCarousel({
  marketTitle,
  slides,
}: MarketProjectCarouselProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const hasSlides = slides.length > 0;
  const current = hasSlides ? slides[activeIndex] : null;

  useEffect(() => {
    if (!hasSlides || reducedMotion || slides.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [hasSlides, reducedMotion, slides.length]);

  return (
    <section className="border-t border-border bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Project gallery
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold">
              Work from our {marketTitle} projects.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {hasSlides
                ? "Selected portfolio projects from this market — open any slide for the full case study and gallery."
                : `No featured ${marketTitle} projects in the portfolio yet. Browse the full portfolio for related millwork work.`}
            </p>
          </div>

          {hasSlides && slides.length > 1 ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (currentIndex) =>
                      (currentIndex - 1 + slides.length) % slides.length,
                  )
                }
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-cream"
                aria-label="Show previous project"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
                }
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-cream"
                aria-label="Show next project"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>

        {hasSlides && current ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <Link
              href={current.href}
              className="group relative block aspect-[16/9] overflow-hidden bg-muted"
            >
              <img
                src={current.cover}
                alt={current.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand">
                  {current.category}
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  {current.name}
                </h3>
                <p className="mt-1 text-sm text-white/70">{current.location}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand transition group-hover:text-brand-light">
                  View project <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            {slides.length > 1 ? (
              <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-4 sm:px-8">
                <p className="text-sm text-muted-foreground">
                  {activeIndex + 1} / {slides.length}
                </p>
                <div className="flex items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.slug}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "h-2.5 cursor-pointer rounded-full transition-all",
                        index === activeIndex
                          ? "w-8 bg-brand"
                          : "w-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40",
                      )}
                      aria-label={`Show ${slide.name}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-12 text-center sm:px-10">
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
              We’re expanding the featured {marketTitle.toLowerCase()} gallery. In the
              meantime, explore completed work across all markets in the portfolio.
            </p>
            <Link
              href="/portfolio"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-warm-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-brand hover:text-warm-black"
            >
              View portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
