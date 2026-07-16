import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentContent } from "@/components/marketing/LegalDocumentContent";
import {
  getLegalDocument,
  legalDocuments,
  legalSlugAliases,
  resolveLegalSlug,
} from "@/lib/constants/legal-documents";

const allSlugs = [
  ...legalDocuments.map((doc) => doc.slug),
  ...Object.keys(legalSlugAliases),
];

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) return { title: "Legal Document" };
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = resolveLegalSlug(slug);
  if (!getLegalDocument(resolved)) notFound();

  return <LegalDocumentContent slug={resolved} />;
}
