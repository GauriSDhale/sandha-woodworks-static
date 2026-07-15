import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { footerLegalLinks } from "@/lib/constants/site";
import type { AppLanguage } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";
import { LegalDocumentContent } from "@/components/marketing/LegalDocumentContent";

const legalSlugs = footerLegalLinks
  .filter((link) => link.href !== "/legal")
  .map((link) => link.href.replace("/legal/", ""));

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export function createLegalDocMetadata(locale: AppLanguage) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> {
    const { slug } = await params;
    const docs = resources[locale].legal.docs as Record<string, { title?: string }>;
    const doc = docs[slug];
    if (!doc) return { title: "Legal Document" };
    return buildPageMetadata({
      locale,
      path: `/legal/${slug}`,
      title: doc.title ?? slug,
      description: resources[locale].legal.meta.description,
    });
  };
}

export const generateMetadata = createLegalDocMetadata("en");

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!legalSlugs.includes(slug)) notFound();
  return <LegalDocumentContent slug={slug} />;
}
