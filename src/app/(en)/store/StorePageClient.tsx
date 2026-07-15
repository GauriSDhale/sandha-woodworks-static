"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectFilters,
  setSearchQuery,
  setSortBy,
} from "@/store/slices/productsSlice";
import { applyFilters } from "@/store/utils/filters";
import { products, getProductsByCategory } from "@/store/data/products";
import { getTopLevelCategories } from "@/store/data/categories";
import { ProductGrid } from "@/components/store/ProductGrid";
import { ProductFilters } from "@/components/store/ProductFilters";
import { CategoryCard } from "@/components/store/CategoryCard";
import { Pagination } from "@/components/store/Pagination";
import { Breadcrumb } from "@/components/store/Breadcrumb";
import { pageMedia } from "@/lib/constants/media";
import type { SortOption } from "@/store/types/product";
import Link from "@/components/i18n/Link";

const SORT_IDS: SortOption[] = [
  "newest",
  "price-asc",
  "price-desc",
  "popular",
  "top-rated",
];

function sortLabelKey(id: SortOption): string {
  switch (id) {
    case "newest":
      return "sort.newest";
    case "price-asc":
      return "sort.priceAsc";
    case "price-desc":
      return "sort.priceDesc";
    case "popular":
      return "sort.popular";
    case "top-rated":
      return "sort.topRated";
  }
}

const PAGE_SIZE = 12;

export default function StorePage() {
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const q = searchParams.get("search") ?? "";
    if (q !== filters.searchQuery) {
      dispatch(setSearchQuery(q));
    }
  }, [searchParams, dispatch, filters.searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const filtered = useMemo(() => applyFilters(products, filters), [filters]);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const topCategories = useMemo(() => getTopLevelCategories(), []);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[]} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl px-5 py-12 text-cream sm:px-8 sm:py-16 lg:py-20"
      >
        <img
          src={pageMedia.storeHero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="relative z-10 max-w-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            {t("hero.titleLine1")}<br />{t("hero.titleLine2")}
          </h1>
          <p className="mt-3 text-base text-cream/80">
            {t("hero.subtitle", { count: products.length })}
          </p>
        </div>
      </motion.div>

      <section aria-labelledby="store-categories-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2
              id="store-categories-heading"
              className="font-display text-2xl font-bold tracking-tight"
            >
              {t("catalog.shopByCategory")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("catalog.shopByCategoryHint")}
            </p>
          </div>
          <Link
            href="/store/categories"
            className="shrink-0 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          >
            {t("catalog.viewAll")}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              productCount={getProductsByCategory(cat.id).length}
            />
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <ProductFilters className="w-56 shrink-0 space-y-5" />

        <div className="min-w-0 flex-1 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {t("catalog.productsFound", { count: filtered.length })}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sortSelect" className="sr-only">{t("a11y.sortBy")}</label>
              <select
                id="sortSelect"
                value={filters.sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40"
              >
                {SORT_IDS.map((id) => (
                  <option key={id} value={id}>{t(sortLabelKey(id))}</option>
                ))}
              </select>
            </div>
          </div>

          <ProductGrid products={paginated} />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
