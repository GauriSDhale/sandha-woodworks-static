import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityPdfViewer } from "@/components/capability-pdf/CapabilityPdfViewer";
import {
  getAllSubSectorSlugs,
  getSubSectorStatement,
} from "@/lib/constants/sub-sector-statements";
import type { AppLanguage } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";

const TYPES = ["sub-sector", "sector"] as const;

export function generateStaticParams() {
  const subSectorParams = getAllSubSectorSlugs().map((slug) => ({
    type: "sub-sector",
    slug,
  }));
  return subSectorParams;
}

export function createCapabilityPdfMetadata(locale: AppLanguage) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ type: string; slug: string }>;
  }): Promise<Metadata> {
    const { type, slug } = await params;
    if (type === "sub-sector") {
      const sub = getSubSectorStatement(slug);
      const details = resources[locale].capabilityPdfDetails as Record<
        string,
        { name?: string; tagline?: string }
      >;
      const copy = details[slug];
      if (!sub || !copy?.name) {
        return { title: "Capability Statement", robots: { index: false } };
      }
      return buildPageMetadata({
        locale,
        path: `/capability-pdf/${type}/${slug}`,
        title: `${copy.name} Capability Statement`,
        description: copy.tagline,
        robots: { index: false },
      });
    }
    return { title: "Capability Statement", robots: { index: false } };
  };
}

export const generateMetadata = createCapabilityPdfMetadata("en");

export default async function CapabilityPdfPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;

  if (!TYPES.includes(type as (typeof TYPES)[number])) notFound();

  if (type === "sub-sector") {
    const sub = getSubSectorStatement(slug);
    if (!sub) notFound();
    return <CapabilityPdfViewer sub={sub} />;
  }

  notFound();
}
