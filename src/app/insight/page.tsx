import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionLabel } from "@/components/marketing/PageSections";

export const metadata: Metadata = {
  title: "Insight",
  description: "Industry insight, project updates, and millwork knowledge from Sandha Woodworks.",
};

const insightPosts = [
  {
    title: "Spec-driven millwork for healthcare environments",
    category: "Healthcare",
    excerpt:
      "How infection-control requirements, cleanability standards, and live-site constraints shape hospital-grade casework delivery.",
  },
  {
    title: "Rollout-ready retail fixtures at national scale",
    category: "Retail",
    excerpt:
      "Repeatable accuracy across multi-site programs — from prototype approval through phased manufacturing and install.",
  },
  {
    title: "Engineering to CNC: reducing surprises in the shop",
    category: "Engineering",
    excerpt:
      "Why in-house Microvellum workflows and coordinated shop drawings keep complex commercial packages on schedule.",
  },
] as const;

export default function InsightPage() {
  return (
    <>
      <PageHero
        eyebrow="Insight"
        title="Millwork knowledge for builders, designers and procurement teams."
        description="Articles on sectors, services, standards, and delivery — from the team behind Sandha Woodworks."
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Latest Articles</SectionLabel>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {insightPosts.map((post) => (
              <article
                key={post.title}
                className="rounded-2xl border border-border bg-white p-6 transition hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {post.category}
                </p>
                <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <Link href="#" className="mt-4 inline-block text-sm font-semibold hover:underline">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
