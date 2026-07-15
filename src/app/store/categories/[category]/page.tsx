import type { Metadata } from "next";
import { categories, getCategoryById } from "@/store/data/categories";
import { CategoryContent } from "./CategoryContent";
import enStore from "@/locales/en/store.json";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryById(category);
  const copy = cat
    ? enStore.categories[cat.id as keyof typeof enStore.categories]
    : null;
  const label =
    copy && typeof copy === "object" && "label" in copy
      ? copy.label
      : enStore.categories.notFoundFallback;
  const description =
    copy && typeof copy === "object" && "description" in copy
      ? copy.description
      : undefined;
  return {
    title: label,
    description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <CategoryContent categorySlug={category} />;
}
