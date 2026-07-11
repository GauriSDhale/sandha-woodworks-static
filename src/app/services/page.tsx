import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wrench, Building2 } from "lucide-react";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { SectionAnchorNav } from "@/components/marketing/SectionAnchorNav";
import { serviceCategories, serviceStandards, servicesSectorLinks } from "@/lib/constants/services";
import { pageMedia } from "@/lib/constants/media";
import type { ServiceItem } from "@/lib/constants/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every millwork capability under one roof — pre-construction through warranty and aftercare.",
};

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
    >
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="font-display mt-2 text-lg font-semibold">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <p className="mt-auto pt-4 text-sm font-medium text-brand transition group-hover:text-brand-light">
          Read article <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  const categoryNavItems = serviceCategories.map((cat) => ({
    id: cat.id,
    label: cat.title,
  }));

  return (
    <>
      <PageHero
        eyebrow="Services & Capabilities · What we do"
        title="Every millwork capability, under one roof."
        description="Pre-construction, engineering, manufacturing, finishing, project management, logistics, installation and warranty. One accountable Canadian manufacturer."
        image={pageMedia.servicesHero}
      />

      <section className="border-b border-border bg-muted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Services vs. Sectors</SectionLabel>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                <Wrench className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">What we do</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every millwork capability we offer — from pre-construction engineering and
                manufacturing to finishing, project management, logistics, installation, and
                warranty.
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                <Building2 className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Where we do it</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                For the industries and building types we serve — healthcare, education, hospitality,
                retail, multi-residential, government and more — see the{" "}
                <Link href="/sectors" className="font-semibold underline">
                  Sectors page
                </Link>
                .
              </p>
              <Link
                href="/sectors"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
              >
                Explore sectors <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Standards we build to
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {serviceStandards.map((standard) => (
                <span
                  key={standard}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {standard}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionAnchorNav items={categoryNavItems} label="Service categories" />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-20">
          {serviceCategories.map((category) => (
            <article key={category.id} id={category.id} className="scroll-mt-28">
              <div className="border-b border-border pb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {category.number} · {category.count} services
                </p>
                <h2 className="font-display mt-2 text-3xl font-semibold">{category.title}</h2>
                <p className="mt-2 max-w-3xl text-muted-foreground">{category.description}</p>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service, index) => (
                  <ServiceCard key={service.slug} service={service} index={index} />
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesSectorLinks.map((sector) => (
              <Link
                key={sector.slug}
                href={`/sectors/${sector.slug}`}
                className="group relative flex items-end overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={sector.image}
                    alt={sector.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-lg font-semibold text-white">{sector.name}</h3>
                  <p className="mt-1 text-sm text-white/70">
                    Explore sector <span aria-hidden="true">→</span>
                  </p>
                </div>
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
