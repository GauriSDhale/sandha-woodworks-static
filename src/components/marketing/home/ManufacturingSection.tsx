"use client";

import { CountUpStat } from "@/components/marketing/home/CountUpStat";
import {
  DisplayHeading,
  DisplayHeadingAccent,
} from "@/components/marketing/home/DisplayHeading";
import { Eyebrow } from "@/components/marketing/home/Eyebrow";
import { pageMedia } from "@/lib/constants/media";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const numericStatKeys = ["founded", "facility", "projects"] as const;

export function ManufacturingSection() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const m = t.home.manufacturing;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-warm-black py-20 text-cream sm:py-28 lg:py-32"
      aria-labelledby="manufacturing-heading"
    >
      <img
        src={pageMedia.facilityAerial}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-warm-black via-warm-black/90 to-warm-black/75" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-warm-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-warm-black to-transparent" />

      <div className="container-full relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div
          className={cn(
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <Eyebrow variant="brand">
            {m.eyebrow}
          </Eyebrow>
          <DisplayHeading
            id="manufacturing-heading"
            as="h2"
            size="md"
            tone="light"
            className="mt-5"
          >
            <span className="block">{m.titleLine1}</span>
            <span className="block">{m.titleLine2}</span>
            <DisplayHeadingAccent className="block">{m.titleAccent}</DisplayHeadingAccent>
          </DisplayHeading>

          <ul className="mt-8 space-y-0">
            {m.bullets.map((item, index) => (
              <li
                key={item}
                className={cn(
                  "border-t border-cream/15 py-4 text-sm uppercase tracking-[0.2em] text-cream/70",
                  !reducedMotion && "transition-all duration-700",
                  inView || reducedMotion
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0",
                )}
                style={
                  reducedMotion
                    ? undefined
                    : { transitionDelay: inView ? `${140 + index * 80}ms` : "0ms" }
                }
              >
                <span className="mr-3 inline-block text-[10px] font-semibold tracking-[0.3em] text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={cn(
            "grid gap-4 sm:grid-cols-2",
            !reducedMotion && "transition-all duration-700 delay-150",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          {numericStatKeys.map((key, index) => {
            const stat = m.stats[key];
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
                  emphasize={key === "projects"}
                  delayMs={index * 100}
                  active={inView}
                />
              </article>
            );
          })}

          <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md transition-colors duration-300 hover:border-brand/35 hover:bg-white/[0.09] sm:col-span-2">
            <CountUpStat
              value={null}
              display={m.stats.awmac.display}
              label={m.stats.awmac.label}
              description={m.stats.awmac.description}
              delayMs={300}
              active={inView}
            />
          </article>
        </div>
      </div>
    </section>
  );
}
