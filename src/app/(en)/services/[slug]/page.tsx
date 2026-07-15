import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, serviceCategories } from "@/lib/constants/services";
import type { AppLanguage } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";
import { ServiceDetailContent } from "./ServiceDetailContent";

export function generateStaticParams() {
  return serviceCategories.flatMap((cat) =>
    cat.services.map((s) => ({ slug: s.slug })),
  );
}

export function createServiceMetadata(locale: AppLanguage) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> {
    const { slug } = await params;
    const found = getService(slug);
    if (!found) return { title: "Service Not Found" };
    const items = resources[locale].services.items as Record<
      string,
      { name?: string; description?: string }
    >;
    const item = items[slug];
    return buildPageMetadata({
      locale,
      path: `/services/${slug}`,
      title: item?.name ?? slug,
      description: item?.description,
    });
  };
}

export const generateMetadata = createServiceMetadata("en");

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getService(slug);
  if (!found) notFound();

  const { service, category } = found;
  const related = category.services.filter((s) => s.slug !== slug).slice(0, 6);

  return (
    <ServiceDetailContent service={service} category={category} related={related} />
  );
}
