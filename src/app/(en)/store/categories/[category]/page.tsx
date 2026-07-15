import type { Metadata } from "next";
import { categories, getCategoryById } from "@/store/data/categories";
import type { AppLanguage } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";
import { CategoryContent } from "./CategoryContent";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function createCategoryMetadata(locale: AppLanguage) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ category: string }>;
  }): Promise<Metadata> {
    const { category } = await params;
    const cat = getCategoryById(category);
    const cats = resources[locale].store.categories as Record<
      string,
      { label?: string; description?: string } | string
    >;
    const copy = cat ? cats[cat.id] : null;
    const label =
      copy && typeof copy === "object" && "label" in copy
        ? copy.label
        : String(cats.notFoundFallback ?? category);
    const description =
      copy && typeof copy === "object" && "description" in copy
        ? copy.description
        : undefined;
    return buildPageMetadata({
      locale,
      path: `/store/categories/${category}`,
      title: label ?? category,
      description,
    });
  };
}

export const generateMetadata = createCategoryMetadata("en");

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <CategoryContent categorySlug={category} />;
}
