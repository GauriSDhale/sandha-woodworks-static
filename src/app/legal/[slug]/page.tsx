import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageSections";
import { footerLegalLinks } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Legal Document",
};

export function generateStaticParams() {
  return footerLegalLinks
    .filter((link) => link.href !== "/legal")
    .map((link) => ({ slug: link.href.replace("/legal/", "") }));
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");
  return (
    <>
      <PageHero eyebrow="Legal & Compliance" title={title} />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-muted-foreground">
          <p>
            This is a static placeholder for legal content. In production, this page would contain
            the full policy or terms document for the selected legal page.
          </p>
        </div>
      </section>
    </>
  );
}
