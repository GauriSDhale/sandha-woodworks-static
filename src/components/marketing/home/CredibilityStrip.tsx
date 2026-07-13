"use client";

import { Eyebrow } from "@/components/marketing/home/Eyebrow";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

function CredibilityPill({
  label,
  ariaHidden,
}: {
  label: string;
  ariaHidden?: boolean;
}) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border/80 bg-white/70 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground/75 backdrop-blur-sm transition-colors duration-300 hover:border-brand/30 hover:bg-white hover:text-foreground"
    >
      <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
      {label}
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div className="group/marquee relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent sm:w-28"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent sm:w-28"
        aria-hidden="true"
      />
      <div
        className={cn(
          "flex w-max items-center gap-3 px-3",
          reverse ? "animate-marquee-x-reverse" : "animate-marquee-x",
        )}
      >
        {track.map((item, index) => (
          <CredibilityPill
            key={`${item}-${index}`}
            label={item}
            ariaHidden={index >= items.length}
          />
        ))}
      </div>
    </div>
  );
}

export function CredibilityStrip() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.2 });

  const items = t.credibility.items;
  const splitAt = Math.ceil(items.length / 2);
  const rowOne = items.slice(0, splitAt);
  const rowTwo = items.slice(splitAt);

  return (
    <section
      ref={sectionRef}
      className="border-y border-border/60 bg-cream py-5 sm:py-6"
      aria-labelledby="credibility-heading"
    >
      <div className="container-full">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center",
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <Eyebrow id="credibility-heading" variant="brand">
            {t.credibility.eyebrow}
          </Eyebrow>
          <p className="font-display mt-5 text-xl font-semibold text-warm-black sm:text-2xl">
            {t.credibility.tagline}
          </p>
        </div>

        {reducedMotion ? (
          <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-3 sm:mt-10">
            {items.map((item) => (
              <li key={item}>
                <CredibilityPill label={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div
            className={cn(
              "mt-8 space-y-3 sm:mt-10 sm:space-y-4",
              !reducedMotion && "transition-all duration-700 delay-150",
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <MarqueeRow items={rowOne} />
            <MarqueeRow items={rowTwo} reverse />
          </div>
        )}
      </div>
    </section>
  );
}
