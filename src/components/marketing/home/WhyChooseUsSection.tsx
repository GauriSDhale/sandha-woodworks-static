"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DisplayHeading } from "@/components/marketing/home/DisplayHeading";
import { Eyebrow } from "@/components/marketing/home/Eyebrow";
import { pageMedia } from "@/lib/constants/media";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function WhyChooseUsSection() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.12, triggerOnce: true });
  const copy = t.home.whyChooseUs;

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-24 bg-white"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="grid lg:grid-cols-2">
        <div
          className={cn(
            "relative min-h-[22rem] overflow-hidden bg-muted sm:min-h-[28rem] lg:min-h-[36rem]",
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "opacity-100" : "opacity-0",
          )}
        >
          <img
            src={pageMedia.aboutHero}
            alt=""
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              !reducedMotion && "transition-transform duration-[1.2s] ease-out",
              inView && !reducedMotion && "scale-100",
              !inView && !reducedMotion && "scale-105",
            )}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
        </div>

        <div
          className={cn(
            "flex flex-col justify-center px-4 py-12 sm:px-8 sm:py-16 lg:px-12 xl:px-16",
            !reducedMotion && "transition-all duration-700 delay-100",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <Eyebrow variant="brand">{copy.eyebrow}</Eyebrow>
          <DisplayHeading
            id="why-choose-us-heading"
            as="h2"
            size="sm"
            tone="dark"
            className="mt-3 max-w-md tracking-tight"
          >
            {copy.title}
          </DisplayHeading>
          <span className="mt-4 block h-1 w-14 rounded-full bg-accent" aria-hidden="true" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {copy.description}
          </p>

          <ul className="mt-8 space-y-5">
            {copy.reasons.map((reason) => (
              <li key={reason.title} className="border-t border-border pt-4">
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-cream transition hover:bg-warm-black"
          >
            {copy.cta}
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-white text-foreground">
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
