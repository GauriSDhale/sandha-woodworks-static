import type { Metadata } from "next";
import Link from "next/link";
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

      <section className="border-b border-border bg-muted px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Markets vs. Services</SectionLabel>
          <h2 className="mt-3 text-2xl font-semibold">This page is about who we serve.</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            For a breakdown of what we do — pre-construction, engineering, manufacturing, finishing,
            PM, logistics, installation and warranty — see the{" "}
            <Link href="/services" className="font-semibold underline">
              Services page
            </Link>
            .
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Approved for:
          </p>
          <ul className="mt-3 space-y-2">
            {sectorApprovals.map((item) => (
              <li key={item} className="text-sm text-muted-foreground">
                · {item}
              </li>
            ))}
          </ul>
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
