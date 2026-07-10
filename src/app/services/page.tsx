import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { serviceCategories, serviceStandards, servicesSectorLinks } from "@/lib/constants/services";
import { pageMedia } from "@/lib/constants/media";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every millwork capability under one roof — pre-construction through warranty and aftercare.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & Capabilities · What we do"
        title="Every millwork capability, under one roof."
        description="Pre-construction, engineering, manufacturing, finishing, project management, logistics, installation and warranty. One accountable Canadian manufacturer."
        image={pageMedia.servicesHero}
      />

      <section className="border-b border-border bg-muted px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Services vs. Sectors</SectionLabel>
          <h2 className="mt-3 text-2xl font-semibold">This page is about what we do.</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            For the industries and building types we serve — healthcare, education, hospitality,
            retail, multi-residential, government and more — see the{" "}
            <Link href="/sectors" className="font-semibold underline">
              Sectors page
            </Link>
            .
          </p>
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Standards we build to:
            </p>
            <ul className="mt-3 space-y-2">
              {serviceStandards.map((standard) => (
                <li key={standard} className="text-sm text-muted-foreground">
                  · {standard}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          {serviceCategories.map((category) => (
            <article key={category.id} id={category.id}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {category.number} · {category.count} services
                  </p>
                  <h2 className="font-display mt-2 text-3xl font-semibold">{category.title}</h2>
                  <p className="mt-2 max-w-3xl text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {category.services.map((service, index) => (
                  <div
                    key={service}
                    className="rounded-2xl border border-border bg-muted/50 p-5 transition hover:bg-muted"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-semibold">{service}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Read article →</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Where we apply these capabilities</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">15 sectors served.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicesSectorLinks.map((sector) => (
              <Link
                key={sector}
                href="/sectors"
                className="rounded-2xl border border-border bg-white px-5 py-4 text-sm font-medium transition hover:border-black"
              >
                {sector}
                <span className="mt-1 block text-xs text-muted-foreground">Explore sector →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Ready when you are"
        title="Send us your drawings. We'll return a line-item quote in one business day."
        secondaryLabel="See Projects"
        secondaryHref="/portfolio"
      />
    </>
  );
}
