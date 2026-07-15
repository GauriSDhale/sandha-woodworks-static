import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, serviceCategories } from "@/lib/constants/services";
import enServices from "@/locales/en/services.json";
import { ServiceDetailContent } from "./ServiceDetailContent";

export function generateStaticParams() {
  return serviceCategories.flatMap((cat) =>
    cat.services.map((s) => ({ slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = getService(slug);
  if (!found) return { title: "Service Not Found" };
  const item = enServices.items[slug as keyof typeof enServices.items];
  return {
    title: `${item?.name ?? slug} | Sandha Woodworks`,
    description: item?.description,
  };
}

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
