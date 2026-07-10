import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMedia } from "@/lib/constants/media";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  dark?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image = pageMedia.aboutHero,
  dark = true,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-24">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className={cn(
          "absolute inset-0",
          dark ? "bg-gradient-to-t from-black/85 via-black/55 to-black/30" : "bg-black/40",
        )}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>
        ) : null}
      </div>
    </section>
  );
}

interface CtaBannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CtaBanner({
  eyebrow = "Let's Build Together",
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Request a Quote",
  secondaryHref = "/portfolio",
  secondaryLabel = "View Portfolio",
}: CtaBannerProps) {
  return (
    <section className="bg-surface-dark px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-surface-cream/55">
          {eyebrow}
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold text-white md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-surface-cream/70">
            {description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white/90"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
