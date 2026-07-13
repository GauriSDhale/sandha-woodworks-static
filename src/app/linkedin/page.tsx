import type { Metadata } from "next";
import { SociableKitLinkedInFeed } from "@/components/marketing/SociableKitLinkedInFeed";

export const metadata: Metadata = {
  title: "Insight",
  description: "Industry insight, project updates, and millwork knowledge from Sandha Woodworks.",
};

const linkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const whyFollowItems = [
  {
    number: "01",
    title: "Fresh project reveals",
    description:
      "See finished installs, renderings and shop drawings before they hit the portfolio page.",
  },
  {
    number: "02",
    title: "Hiring & culture",
    description:
      "Open roles, apprenticeship intake and the people making it happen — first look, LinkedIn only.",
  },
  {
    number: "03",
    title: "Behind-the-scenes video",
    description:
      "Drone flyovers, CNC time-lapses and finishing bay reels from our 40,000 sq. ft. facility.",
  },
  {
    number: "04",
    title: "Industry insight",
    description:
      "AWMAC, WMCO and ISO milestones plus what we're learning from every build.",
  },
];

export default function InsightPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#111111] pt-32 pb-10 text-cream sm:pt-40 sm:pb-14">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,#0A66C2_0%,transparent_45%),radial-gradient(circle_at_80%_60%,#0A66C2_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#4DA3E8]">
            <span className="h-px w-8 bg-[#4DA3E8]" />
            <span>Newsroom</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-[6rem]">
            Insights, articles
            <span className="block text-[#0A66C2]">&amp; company news.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            One place for everything happening at Sandha Woodworks — long-form insight from our team,
            milestones from the shop floor, and a live stream of company updates from LinkedIn.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/company/sandha-woodworks-service-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition-transform hover:scale-[1.02] hover:bg-warm-black"
            >
              {linkedInIcon}
              Follow on LinkedIn
            </a>
            <a
              href="https://www.linkedin.com/company/sandha-woodworks-service-ltd/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-cream/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition-colors hover:bg-cream hover:text-foreground"
            >
              View Latest Posts
            </a>
          </div>
        </div>
      </section>

      {/* ── Straight from LinkedIn — Header + Embed ── */}
      <section className="py-8 bg-muted sm:py-12">
        <div className="w-full sm:mx-auto sm:max-w-7xl sm:px-6">
          <div className="px-4 sm:px-0">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand">
                Live company updates
              </p>
              <h2 className="font-display text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
                Straight from LinkedIn.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Project reveals, hiring news and factory milestones — auto-synced from our LinkedIn
                company page so this feed stays current with zero maintenance.
              </p>
            </div>
          </div>
        </div>

        {/* SociableKIT LinkedIn Page Posts Widget */}
        <div className="mt-14 w-full sm:mx-auto sm:max-w-7xl sm:px-6">
          <SociableKitLinkedInFeed columns={2} posts={8} />
        </div>
      </section>

      {/* ── Stay in the Loop CTA ── */}
      <section className="py-10 bg-[#111111] text-cream sm:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#4DA3E8]">
            Stay in the loop
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            See what we&apos;re building next — before anyone else.
          </h2>
          <a
            href="https://www.linkedin.com/company/sandha-woodworks-service-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition-colors hover:bg-warm-black"
          >
            {linkedInIcon}
            Follow Sandha Woodworks
          </a>
        </div>
      </section>

      {/* ── Why Follow ── */}
      <section className="py-8 bg-cream sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand">
              Why follow
            </p>
            <h2 className="font-display text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
              Get the shop floor in your feed.
            </h2>
          </div>

          <ul className="mt-8 grid gap-4">
            {whyFollowItems.map((item) => (
              <li
                key={item.number}
                className="flex gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-[#0A66C2]/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                  {item.number}
                </div>
                <div>
                  <h4 className="font-display text-lg">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
