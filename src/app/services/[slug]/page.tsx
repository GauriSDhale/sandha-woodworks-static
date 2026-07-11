import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceCategories, serviceDetails } from "@/lib/constants/services";
import { ServiceDetailContent } from "./ServiceDetailContent";

function getService(slug: string) {
  for (const cat of serviceCategories) {
    const service = cat.services.find((s) => s.slug === slug);
    if (service) return { service, category: cat };
  }
  return null;
}

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
  return {
    title: `${found.service.name} | Sandha Woodworks`,
    description: found.service.description,
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
  const detail = serviceDetails[slug];

  const related = category.services.filter((s) => s.slug !== slug).slice(0, 6);

  return (
    <ServiceDetailContent
      service={service}
      detail={detail ?? null}
      category={category}
      related={related}
    />
  );
}
