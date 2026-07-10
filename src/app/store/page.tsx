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
import { products } from "@/store/data/products";
import { ProductGrid } from "@/components/store/ProductGrid";
import { ProductFilters } from "@/components/store/ProductFilters";
import { Pagination } from "@/components/store/Pagination";
import { Breadcrumb } from "@/components/store/Breadcrumb";
import type { SortOption } from "@/store/types/product";

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

  return (
    <div className="space-y-6">
      <Breadcrumb items={[]} />

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-surface-dark px-8 py-12 text-cream"
      >
        <div className="relative z-10 max-w-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
            Sandha Woodworks — Cabinet Store
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight">
            Premium Custom<br />Millwork Cabinets
          </h1>
          <p className="mt-3 text-base text-cream/70">
            {products.length} products · Crafted in Brantford, ON · AWMAC Certified
          </p>
        </div>
        {/* Decorative */}
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="absolute bottom-0 right-24 h-32 w-32 rounded-full bg-cream/5 blur-2xl" />
      </motion.div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <ProductFilters className="w-56 shrink-0 space-y-5" />

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-5">
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
