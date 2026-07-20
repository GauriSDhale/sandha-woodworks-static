import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMedia } from "@/lib/constants/media";
import { cn } from "@/lib/utils";
import { SiteImage } from "@/components/ui/SiteImage";

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
      <SiteImage
        src={image}
        alt=""
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className={cn(
          "absolute inset-0",
          dark ? "bg-gradient-to-t from-black/85 via-black/55 to-black/30" : "bg-black/40",
        )}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        {eyebrow ? <p className="type-eyebrow text-white/75">{eyebrow}</p> : null}
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
    <section className="bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="type-eyebrow text-brand">{eyebrow}</p>
        <h2 className="font-display mt-4 text-3xl font-semibold text-warm-black md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-cream transition-colors hover:bg-warm-black"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-warm-black/30 px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-warm-black transition-colors hover:bg-foreground hover:text-cream"
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
      className={cn("type-eyebrow normal-case tracking-normal text-muted-foreground sm:text-sm", className)}
    >
      {children}
    </p>
  );
}
