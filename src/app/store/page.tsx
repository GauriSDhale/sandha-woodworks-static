"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
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
import Link from "next/link";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  popular: "Most Popular",
  "top-rated": "Top Rated",
};

const PAGE_SIZE = 12;

export default function StorePage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  // Sync URL search param to store
  useEffect(() => {
    const q = searchParams.get("search") ?? "";
    if (q !== filters.searchQuery) {
      dispatch(setSearchQuery(q));
    }
  }, [searchParams, dispatch, filters.searchQuery]);

  // Reset page on filter change
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

      {/* Hero banner */}
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
            Sandha Woodworks — Cabinet Store
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Premium Custom<br />Millwork Cabinets
          </h1>
          <p className="mt-3 text-base text-cream/80">
            {products.length} products · Crafted in Brantford, ON · AWMAC Certified
          </p>
        </div>
      </motion.div>

      {/* Categories */}
      <section aria-labelledby="store-categories-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2
              id="store-categories-heading"
              className="font-display text-2xl font-bold tracking-tight"
            >
              Shop by category
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Kitchen, vanities, closets, and more — crafted in Brantford.
            </p>
          </div>
          <Link
            href="/store/categories"
            className="shrink-0 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          >
            View all
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
        {/* Sidebar filters (mobile toggle stacks above; desktop sidebar beside) */}
        <ProductFilters className="w-56 shrink-0 space-y-5" />

        {/* Main content */}
        <div className="min-w-0 flex-1 space-y-5">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              products found
            </p>
            <div className="flex items-center gap-2">
              {/* Mobile filters toggle rendered inside ProductFilters */}
              <label htmlFor="sortSelect" className="sr-only">Sort by</label>
              <select
                id="sortSelect"
                value={filters.sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40"
              >
                {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
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
