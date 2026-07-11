import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Wrench } from "lucide-react";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { SectorsGrid } from "@/components/marketing/SectorsGrid";
import { sectorApprovals } from "@/lib/constants/sectors";
import { pageMedia } from "@/lib/constants/media";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "Millwork engineered for every commercial market — eight core markets, one accountable manufacturer.",
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Markets We Serve"
        title="Millwork engineered for every commercial market."
        description="Eight core markets. One accountable manufacturer. Every package engineered to the codes, cleanability and life-cycle demands of its industry — and delivered on the schedule that industry runs on."
        image={pageMedia.sectorsHero}
      />

      <section className="border-b border-border bg-muted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Markets vs. Services</SectionLabel>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                <Building2 className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Who we serve</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                This page details every market we serve — healthcare, education, commercial,
                hospitality, retail, residential, public and specialty. Each with its own codes,
                standards and delivery model.
              </p>
              <Link
                href="/sectors"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
              >
                Explore all markets <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                <Wrench className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">What we do</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                For a breakdown of our capabilities — pre-construction, engineering, manufacturing,
                finishing, PM, logistics, installation and warranty — see the{" "}
                <Link href="/services" className="font-semibold underline">
                  Services page
                </Link>
                .
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Approved for
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {sectorApprovals.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectorsGrid />

      <CtaBanner
        eyebrow="One millwork partner. Every market."
        title="Send us your drawings. We'll return a line-item quote in one business day."
        secondaryLabel="See Projects By Market"
        secondaryHref="/portfolio"
      />
    </>
  );
}
