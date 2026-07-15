import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectors } from "@/lib/constants/sectors";
import { getMarketProjectSlides } from "@/lib/markets/project-gallery";
import enSectors from "@/locales/en/sectors.json";
import { MarketDetailContent } from "@/components/marketing/MarketDetailContent";

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.id === slug);
  if (!sector) return { title: "Market Not Found" };
  const copy = enSectors.markets[slug as keyof typeof enSectors.markets];
  return {
    title: `${copy?.title ?? slug} | Sandha Woodworks`,
    description: copy?.description,
  };
}

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.id === slug);
  if (!sector) notFound();

  const projectSlides = getMarketProjectSlides(slug);

  return <MarketDetailContent slug={slug} projectSlides={projectSlides} />;
}
