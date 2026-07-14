"use client";

import { getTopLevelCategories } from "@/store/data/categories";
import { getProductsByCategory } from "@/store/data/products";
import { CategoryCard } from "@/components/store/CategoryCard";
import { Breadcrumb } from "@/components/store/Breadcrumb";
import { useTranslation } from "react-i18next";

export function CategoriesPageContent() {
  const { t } = useTranslation("store");
  const topCats = getTopLevelCategories();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: t("nav.categories") }]} />
      <h1 className="font-display text-3xl font-bold">{t("categories.pageTitle")}</h1>

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
