"use client";

import { useEffect, useState } from "react";

type InsightSlide = {
  title: string;
  description: string;
  eyebrow: string;
  meta: string;
  href: string;
  image: string;
};

const slides: InsightSlide[] = [
  {
    title: "Why AWMAC Is Quietly Becoming the Backbone of Trust in Canadian Architectural Millwork",
    description:
      "How national standards and MSE certification are reshaping how architects, contractors and clients think about millwork execution.",
    eyebrow: "Featured insight",
    meta: "LinkedIn article · Mar 31, 2026",
    href: "/linkedin/why-awmac-quietly-becoming-backbone-trust",
    image: "/assets/insights/awmac-backbone.png",
  },
  {
    title:
      "Division 6 at the Highest Standard: Engineering Architectural Woodwork for a New Era of Construction",
    description:
      "Why architectural woodwork is no longer a finishing trade — but a strategic construction discipline built on engineering, precision and orchestration.",
    eyebrow: "Featured insight",
    meta: "LinkedIn article · Mar 15, 2026",
    href: "/linkedin/division-6-highest-standard-engineering-architectural",
    image: "/assets/insights/division-6.jpg",
  },
  {
    title: "Canada's Interior Construction Reset",
    description:
      "How non-residential momentum, labour pressure and regulatory tightening are reclassifying interior trades — and what it means for millwork partners.",
    eyebrow: "Featured insight",
    meta: "LinkedIn article · Mar 20, 2026",
    href: "/linkedin/canadas-interior-construction-reset",
    image: "/assets/insights/interior-construction-reset.png",
  },
];

export function InsightsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  const currentSlide = slides[activeIndex];

  return (
    <section className="border-y border-border/70 bg-background py-8 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 type-eyebrow text-brand">
            Insights & Articles
          </p>
          <h2 className="font-display text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            Perspective from the shop floor.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Long-form thinking on architectural millwork, industry standards and the systems
            shaping Canadian construction — written by our team and published on LinkedIn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
            }
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-lg text-foreground transition-colors hover:bg-foreground hover:text-cream"
            aria-label="Show previous insight"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-lg text-foreground transition-colors hover:bg-foreground hover:text-cream"
            aria-label="Show next insight"
          >
            →
          </button>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1b1b1b] via-[#111111] to-[#0d0d0d] p-4 sm:rounded-4xl sm:p-6 lg:p-8">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              width={1280}
              height={720}
              className="h-full w-full object-contain object-center"
            />
          </div>
          <div className="type-eyebrow mt-6 flex flex-wrap items-center gap-3 text-[#4DA3E8]">
            <span>{currentSlide.eyebrow}</span>
            <span className="text-cream/40">•</span>
            <span className="text-cream/70">{currentSlide.meta}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl leading-tight text-cream sm:text-3xl">
            {currentSlide.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/75 sm:text-base">
            {currentSlide.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <a
              href={currentSlide.href}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#4DA3E8] transition-colors hover:text-[#7fc2ff]"
            >
              Read story
              <span aria-hidden="true">→</span>
            </a>
            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-[#4DA3E8]" : "w-2.5 bg-cream/30"
                  }`}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
