import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { footerLegalLinks } from "@/lib/constants/site";
import enLegal from "@/locales/en/legal.json";
import { LegalDocumentContent } from "@/components/marketing/LegalDocumentContent";

const legalSlugs = footerLegalLinks
  .filter((link) => link.href !== "/legal")
  .map((link) => link.href.replace("/legal/", ""));

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = enLegal.docs[slug as keyof typeof enLegal.docs];
  if (!doc) return { title: "Legal Document" };
  return {
    title: doc.title,
    description: enLegal.meta.description,
  };
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!legalSlugs.includes(slug)) notFound();
  return <LegalDocumentContent slug={slug} />;
}
