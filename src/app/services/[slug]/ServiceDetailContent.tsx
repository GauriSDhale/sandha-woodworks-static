"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import type { ServiceItem, ServiceCategory, ServiceDetail } from "@/lib/constants/services";
import { CtaBanner } from "@/components/marketing/PageSections";
import { SectionAnchorNav } from "@/components/marketing/SectionAnchorNav";

const defaultProcess = [
  { step: "Estimating", description: "Take-off from your drawings, specs and finish schedule. Line-item quote returned within one business day for most packages." },
  { step: "Engineering & Shop Drawings", description: "In-house team produces AWI/AWMAC-compliant shop drawings in AutoCAD, coordinated with Microvellum for direct-to-machine output." },
  { step: "Submittals & Samples", description: "Finish samples, hardware cut-sheets and drawing set submitted for architect/GC approval prior to release to production." },
  { step: "CNC Fabrication", description: "Panels nested and machined on multi-axis CNC. Solid-wood machining, edge-banding and dowel/confirmat assembly in dedicated cells." },
  { step: "Finishing", description: "Controlled-environment spray booths for stain, lacquer, conversion varnish, catalyzed polyurethane and low-VOC waterborne systems." },
  { step: "QC & Pre-Ship", description: "100% dimensional and finish inspection against the approved shop drawings. Pre-assembled where practical for site-fit certainty." },
  { step: "Delivery & Install Coordination", description: "Blanket-wrapped, phased delivery coordinated with your site schedule. Installation supervision available Canada-wide." },
];

const quality = [
  "AWMAC GIS third-party inspection available on request",
  "ISO 9001-aligned quality management",
  "Dimensional tolerances per NAAWS 4.0 grade (Custom or Premium)",
  "Finish sheen, colour and film-build verified against approved sample",
];

const sustainability = [
  "CARB Phase 2 / TSCA Title VI compliant panels standard; NAF/NAUF available on request",
  "FSC® Chain-of-Custody material available (CoC certificate on request)",
  "Low-VOC waterborne and GREENGUARD Gold finish systems available",
  "Supports LEED v4/v4.1 credits: MR (Sourcing of Raw Materials, EPDs, HPDs) and EQ (Low-Emitting Materials)",
  "Aligns with WELL Building Standard v2 X07 Materials Restrictions",
];

function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium transition hover:bg-muted/50"
          >
            <span>{faq.question}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const tocItems = [
  { id: "overview", label: "Overview" },
  { id: "best-for", label: "Best for" },
  { id: "process", label: "Process" },
  { id: "deliverables", label: "Deliverables" },
  { id: "gallery", label: "Gallery" },
  { id: "faqs", label: "FAQs" },
];

export function ServiceDetailContent({
  service,
  detail,
  category,
  related,
}: {
  service: ServiceItem;
  detail: ServiceDetail | null;
  category: ServiceCategory;
  related: ServiceItem[];
}) {
  const processSteps = detail?.process ?? defaultProcess;
  const show = (id: string) => {
    switch (id) {
      case "overview": return true;
      case "best-for": return !!detail?.bestFor?.length;
      case "process": return true;
      case "deliverables": return !!detail?.deliverables?.length;
      case "gallery": return !!detail?.gallery?.length;
      case "faqs": return !!detail?.faqs?.length;
      default: return false;
    }
  };

  const filteredToc = tocItems.filter((t) => show(t.id));

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-24">
        <img
          src={service.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All Services
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70 mt-6">
            {service.description}
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {service.name}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white/90"
            >
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#overview"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
            >
              Read the article <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <SectionAnchorNav items={filteredToc} label="Article sections" />

      <section id="overview" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-semibold">Overview</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {detail?.overview}
            </p>
          </div>
        </div>
      </section>

      {detail?.bestFor && detail.bestFor.length > 0 && (
        <section id="best-for" className="scroll-mt-28 border-t border-border bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-semibold">Best for</h2>
              <ul className="mt-6 space-y-3">
                {detail.bestFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section id="process" className="scroll-mt-28 border-t border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-semibold">Process — award to install</h2>
            <div className="mt-10 space-y-8">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.step}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {detail?.deliverables && detail.deliverables.length > 0 && (
        <section id="deliverables" className="scroll-mt-28 border-t border-border bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-semibold">What you receive</h2>
              <ul className="mt-6 space-y-3">
                {detail.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="mt-0.5 text-brand">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {detail?.gallery && detail.gallery.length > 0 && (
        <section id="gallery" className="scroll-mt-28 border-t border-border px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl font-semibold">Gallery</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detail.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-xl bg-muted">
                  <img
                    src={img}
                    alt={`${service.name} — reference ${i + 1}`}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail?.faqs && detail.faqs.length > 0 && (
        <section id="faqs" className="scroll-mt-28 border-t border-border bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-semibold">FAQs</h2>
              <div className="mt-8">
                <FaqAccordion faqs={detail.faqs} />
              </div>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl font-semibold">
              Explore more {category.title.toLowerCase()}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    <p className="mt-auto pt-4 text-sm font-medium text-brand transition group-hover:text-brand-light">
                      Learn more <span aria-hidden="true">→</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        eyebrow="Next step"
        title={`Have drawings for a ${service.name.toLowerCase()} package?`}
        description="Send us the set and finish schedule — we'll return a line-item quote within one business day."
        primaryHref="/contact"
        primaryLabel="Request a Quote"
        secondaryHref="/portfolio"
        secondaryLabel="See our work"
      />
    </>
  );
}
