import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentContent } from "@/components/marketing/LegalDocumentContent";
import {
  getLegalDocumentMeta,
  legalDocumentMeta,
  legalSlugAliases,
  resolveLegalSlug,
} from "@/lib/constants/legal-documents";
import enLegal from "@/locales/en/legal.json";

const allSlugs = [
  ...legalDocumentMeta.map((doc) => doc.slug),
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
  const meta = getLegalDocumentMeta(slug);
  if (!meta) return { title: "Legal Document" };
  const copy = enLegal.documents[meta.slug as keyof typeof enLegal.documents];
  return {
    title: copy?.title ?? meta.slug,
    description: copy?.description ?? enLegal.meta.description,
  };
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = resolveLegalSlug(slug);
  if (!getLegalDocumentMeta(resolved)) notFound();

  return <LegalDocumentContent slug={resolved} />;
}
