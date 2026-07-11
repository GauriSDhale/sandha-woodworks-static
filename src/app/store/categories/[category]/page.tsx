import type { Metadata } from "next";
import { categories, getCategoryById } from "@/store/data/categories";
import { CategoryContent } from "./CategoryContent";

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
  return {
    title: cat?.label ?? "Category",
    description: cat?.description,
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
