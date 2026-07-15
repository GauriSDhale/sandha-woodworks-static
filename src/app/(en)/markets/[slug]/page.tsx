import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectors } from "@/lib/constants/sectors";
import { getMarketProjectSlides } from "@/lib/markets/project-gallery";
import type { AppLanguage } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";
import { MarketDetailContent } from "@/components/marketing/MarketDetailContent";

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.id }));
}

export function createMarketMetadata(locale: AppLanguage) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> {
    const { slug } = await params;
    const sector = sectors.find((s) => s.id === slug);
    if (!sector) return { title: "Market Not Found" };
    const markets = resources[locale].sectors.markets as Record<
      string,
      { title?: string; description?: string }
    >;
    const copy = markets[slug];
    return buildPageMetadata({
      locale,
      path: `/markets/${slug}`,
      title: copy?.title ?? slug,
      description: copy?.description,
    });
  };
}

export const generateMetadata = createMarketMetadata("en");

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
