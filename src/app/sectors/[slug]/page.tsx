import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectorDetails } from "@/lib/constants/sector-details";
import enSectorDetails from "@/locales/en/sectorDetails.json";
import { SectorDetailContent } from "./SectorDetailContent";

export function generateStaticParams() {
  return Object.keys(sectorDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = sectorDetails[slug];
  if (!detail) return { title: "Sector Not Found" };
  const copy = enSectorDetails.details[slug as keyof typeof enSectorDetails.details];
  return {
    title: `${copy?.heading ?? slug} | Sandha Woodworks`,
    description: copy?.description,
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!sectorDetails[slug]) notFound();
  return <SectorDetailContent slug={slug} />;
}
