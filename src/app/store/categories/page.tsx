import type { Metadata } from "next";
import { categories, getTopLevelCategories } from "@/store/data/categories";
import { getProductsByCategory } from "@/store/data/products";
import { CategoryCard } from "@/components/store/CategoryCard";
import { Breadcrumb } from "@/components/store/Breadcrumb";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse all cabinet categories — kitchen, vanity, closets, office, and more.",
};

export default function CategoriesPage() {
  const topCats = getTopLevelCategories();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Categories" }]} />
      <h1 className="font-display text-3xl font-bold">All Categories</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topCats.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            productCount={getProductsByCategory(cat.id).length}
          />
        ))}
      </div>
    </div>
  );
}
