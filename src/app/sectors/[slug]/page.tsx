import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { sectorDetails } from "@/lib/constants/sector-details";
import { CtaBanner } from "@/components/marketing/PageSections";

export function generateStaticParams() {
  return Object.keys(sectorDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = sectorDetails[slug];
  if (!detail) return { title: "Sector Not Found" };
  return {
    title: `${detail.heading} | Sandha Woodworks`,
    description: detail.description,
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = sectorDetails[slug];
  if (!detail) notFound();

  const otherSectors = Object.entries(sectorDetails)
    .filter(([s]) => s !== slug)
    .slice(0, 6);

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-24">
        <img
          src={detail.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/sectors"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All Sectors
          </Link>
          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {detail.heading}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/75">
            {detail.description}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-semibold">About this sector</h2>
            {detail.about.split("\n\n").map((p, i) => (
              <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {detail.standards.length > 0 && (
        <section className="border-b border-border px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Standards & compliance
              </h3>
              <ul className="mt-6 space-y-3">
                {detail.standards.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {detail.features.length > 0 && (
        <section className="border-b border-border bg-muted px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold">What we build</h2>
              <ul className="mt-6 space-y-3">
                {detail.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {detail.whyChoose.length > 0 && (
        <section className="border-b border-border px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Why choose Sandha
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold">
              The reasons GCs, architects and owners award us the package.
            </h2>
            <div className="mt-10 space-y-8">
              {detail.whyChoose.map((item, i) => (
                <div key={i} className="flex gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail.services.length > 0 && (
        <section className="border-t border-border bg-muted px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Services applied
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold">
              Related capabilities on this sector.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {detail.services.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
                >
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold">{svc.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {svc.description}
                    </p>
                    <p className="mt-auto pt-4 text-sm font-medium text-brand transition group-hover:text-brand-light">
                      Read article <span aria-hidden="true">→</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        eyebrow="Ready to price a package?"
        title={detail.cta.heading}
        description={detail.cta.description}
        primaryHref="/contact"
        primaryLabel="Request a Quote"
        secondaryHref="/portfolio"
        secondaryLabel="See Projects"
      />

      {otherSectors.length > 0 && (
        <section className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Other sectors
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold">
              Explore more of what we serve.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {otherSectors.map(([s, sd]) => (
                <Link
                  key={s}
                  href={`/sectors/${s}`}
                  className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-surface-dark"
                >
                  <img
                    src={sd.image}
                    alt={sd.heading}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="relative z-10 p-4">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {sd.heading.replace(" Millwork", "")}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm text-brand">
                      Explore <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
