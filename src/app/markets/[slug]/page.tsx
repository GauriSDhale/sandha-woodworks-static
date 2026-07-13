import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { sectors, marketDetails } from "@/lib/constants/sectors";
import { sectorDetails } from "@/lib/constants/sector-details";
import { getMarketProjectSlides } from "@/lib/markets/project-gallery";
import { CtaBanner } from "@/components/marketing/PageSections";
import { MarketProjectCarousel } from "@/components/marketing/MarketProjectCarousel";

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.id === slug);
  if (!sector) return { title: "Market Not Found" };
  return {
    title: `${sector.title} | Sandha Woodworks`,
    description: sector.description,
  };
}

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.id === slug);
  if (!sector) notFound();

  const detail = marketDetails[slug];
  const otherMarkets = sectors.filter((s) => s.id !== slug);
  const projectSlides = getMarketProjectSlides(slug);

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-24">
        <img
          src={sector.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <Link
            href="/sectors"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Markets We Serve
          </Link>
          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {sector.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/75">
            {sector.description}
          </p>
          <p className="mt-3 text-sm text-white/50">
            {detail?.subSectors.length} unique capability statements below ↓
          </p>
        </div>
      </section>

      {detail && (
        <>
          <section className="scroll-mt-28 border-b border-border bg-muted px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl">
                <h2 className="font-display text-2xl font-semibold">About this market</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {detail.overview}
                </p>
                <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Overview
                </h3>
                <ul className="mt-4 space-y-3">
                  {detail.overviewBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Sub-sector capability statements
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold">
                One unique capability per {sector.title.toLowerCase()} sub-sector.
              </h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Each capability statement is engineered specifically for its industry — with its own
                scope, product library, standards, install approach and photography. Nothing is shared
                between sub-sectors.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {detail.subSectors.map((sub) => (
                  <div
                    key={sub.slug}
                    className="flex flex-col rounded-xl border border-border bg-card p-6"
                  >
                    <h3 className="font-display text-lg font-semibold">{sub.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {sub.description}
                    </p>
                    {sub.portfolioPdf && (
                      <a
                        href={sub.portfolioPdf}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
                      >
                        Explore {sub.name} Portfolio <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <MarketProjectCarousel
            marketTitle={sector.title}
            slides={projectSlides}
          />

          {detail.relatedSectors.length > 0 && (
            <section className="border-t border-border bg-muted px-4 py-20 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Detailed sector pages
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold">
                  Read the deep sector pages within {sector.title}.
                </h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {detail.relatedSectors.map((rs) => {
                    const sd = sectorDetails[rs.slug];
                    return (
                      <Link
                        key={rs.slug}
                        href={`/sectors/${rs.slug}`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-muted">
                          <img
                            src={sd?.image ?? sector.image}
                            alt={rs.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-display text-lg font-semibold">{rs.name}</h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {rs.description}
                          </p>
                          <p className="mt-auto pt-4 text-sm font-medium text-brand transition group-hover:text-brand-light">
                            Read sector page <span aria-hidden="true">→</span>
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {otherMarkets.length > 0 && (
        <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Other markets
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold">
              Explore more of what we serve.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {otherMarkets.map((m) => (
                <Link
                  key={m.id}
                  href={m.href}
                  className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-surface-dark"
                >
                  <img
                    src={m.image}
                    alt={m.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="relative z-10 p-4">
                    <h3 className="font-display text-lg font-semibold text-white">{m.title}</h3>
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

      <CtaBanner
        eyebrow="Ready to price a package?"
        title={`Have drawings for a ${sector.title.toLowerCase()} package?`}
        description="Send us the set and finish schedule — we'll return a line-item quote within one business day."
        primaryHref="/contact"
        primaryLabel="Request a Quote"
        secondaryHref="/portfolio"
        secondaryLabel="See Projects"
      />
    </>
  );
}
