import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityPdfViewer } from "@/components/capability-pdf/CapabilityPdfViewer";
import {
  getAllSubSectorSlugs,
  getSubSectorStatement,
} from "@/lib/constants/sub-sector-statements";

const TYPES = ["sub-sector", "sector"] as const;

export function generateStaticParams() {
  const subSectorParams = getAllSubSectorSlugs().map((slug) => ({
    type: "sub-sector",
    slug,
  }));
  // Sector-level templates can be added later; keep param space valid for static export.
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
    if (!sub) return { title: "Capability Statement", robots: { index: false } };
    return {
      title: `${sub.name} Capability Statement`,
      description: sub.tagline,
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

  // Sector-level docs not ported yet
  notFound();
}
