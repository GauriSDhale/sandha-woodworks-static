import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityPdfViewer } from "@/components/capability-pdf/CapabilityPdfViewer";
import {
  getAllSubSectorSlugs,
  getSubSectorStatement,
} from "@/lib/constants/sub-sector-statements";
import enDetails from "@/locales/en/capabilityPdfDetails.json";

const TYPES = ["sub-sector", "sector"] as const;

export function generateStaticParams() {
  const subSectorParams = getAllSubSectorSlugs().map((slug) => ({
    type: "sub-sector",
    slug,
  }));
  return subSectorParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<Metadata> {
  const { type, slug } = await params;
  if (type === "sub-sector") {
    const sub = getSubSectorStatement(slug);
    const copy = (enDetails as Record<string, { name?: string; tagline?: string }>)[slug];
    if (!sub || !copy?.name) return { title: "Capability Statement", robots: { index: false } };
    return {
      title: `${copy.name} Capability Statement`,
      description: copy.tagline,
      robots: { index: false },
    };
  }
  return { title: "Capability Statement", robots: { index: false } };
}

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
