"use client";

import Link from "next/link";
import { ArrowRight, PenTool, Factory, ShieldCheck } from "lucide-react";
import { CountUpStat } from "@/components/marketing/home/CountUpStat";
import { DisplayHeading } from "@/components/marketing/home/DisplayHeading";
import { Eyebrow } from "@/components/marketing/home/Eyebrow";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const statKeys = ["facility", "clients", "services", "sectors"] as const;

const reasonIcons = [PenTool, Factory, ShieldCheck] as const;

export function WhyChooseUsSection() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.12, triggerOnce: true });
  const copy = t.home.whyChooseUs;

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-24"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="grid lg:grid-cols-2">
        {/* Left Column — Stats Grid */}
        <div
          className={cn(
            "relative min-h-[22rem] overflow-hidden bg-warm-black sm:min-h-[28rem] lg:min-h-[36rem]",
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-warm-black via-warm-black/90 to-warm-black/75" />
          <div className="relative flex h-full items-center justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="grid w-full gap-5 sm:grid-cols-2">
              {statKeys.map((key, index) => {
                const stat = copy.stats[key];
                return (
                  <article
                    key={key}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md transition-colors duration-300 hover:border-brand/35 hover:bg-white/[0.09]"
                  >
                    <CountUpStat
                      value={stat.value}
                      suffix={stat.suffix}
                      format={"format" in stat ? stat.format : undefined}
                      label={stat.label}
                      description={stat.description}
                      delayMs={index * 150}
                      active={inView}
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column — Content */}
        <div
          className={cn(
            "flex flex-col justify-center bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-12 xl:px-16",
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

          <ul className="mt-8 space-y-4">
            {copy.reasons.map((reason, index) => {
              const Icon = reasonIcons[index];
              return (
                <li
                  key={reason.title}
                  className="flex gap-4 rounded-2xl border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                      {reason.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </li>
              );
            })}
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
