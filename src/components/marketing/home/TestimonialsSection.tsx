"use client";

import { Quote } from "lucide-react";
import { DisplayHeading } from "@/components/marketing/home/DisplayHeading";
import { Eyebrow } from "@/components/marketing/home/Eyebrow";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const { t } = useTranslation("home");
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.12, triggerOnce: true });
  const p = t("testimonials", { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    items: Array<{ quote: string; name: string; role: string }>;
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding scroll-mt-24 bg-white text-foreground"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-full">
        <div
          className={cn(
            !reducedMotion && "transition-all duration-700",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <Eyebrow variant="brand">{p.eyebrow}</Eyebrow>
          <DisplayHeading
            id="testimonials-heading"
            size="sm"
            tone="dark"
            className="mt-3 max-w-2xl tracking-tight"
          >
            {p.title}
          </DisplayHeading>
        </div>

        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-8 md:grid-cols-2",
            !reducedMotion && "transition-all duration-700 delay-150",
            inView || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          {p.items.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-border bg-white p-8 transition-colors hover:bg-muted/30"
            >
              <Quote className="mb-4 size-8 text-brand/30" aria-hidden="true" />
              <blockquote className="flex-1 text-base leading-relaxed text-foreground/85">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">&mdash; {item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
