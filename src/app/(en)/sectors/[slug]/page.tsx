import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectorDetails } from "@/lib/constants/sector-details";
import type { AppLanguage } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";
import { SectorDetailContent } from "./SectorDetailContent";

export function generateStaticParams() {
  return Object.keys(sectorDetails).map((slug) => ({ slug }));
}

export function createSectorDetailMetadata(locale: AppLanguage) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> {
    const { slug } = await params;
    const detail = sectorDetails[slug];
    if (!detail) return { title: "Sector Not Found" };
    const details = resources[locale].sectorDetails.details as Record<
      string,
      { heading?: string; description?: string }
    >;
    const copy = details[slug];
    return buildPageMetadata({
      locale,
      path: `/sectors/${slug}`,
      title: copy?.heading ?? slug,
      description: copy?.description,
    });
  };
}

export const generateMetadata = createSectorDetailMetadata("en");

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!sectorDetails[slug]) notFound();
  return <SectorDetailContent slug={slug} />;
}
