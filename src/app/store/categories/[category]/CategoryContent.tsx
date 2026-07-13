"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCategoryById } from "@/store/data/categories";
import { getProductsByCategory } from "@/store/data/products";
import { applyFilters } from "@/store/utils/filters";
import { useAppSelector } from "@/store/hooks";
import { selectFilters } from "@/store/slices/productsSlice";
import { ProductGrid } from "@/components/store/ProductGrid";
import { ProductFilters } from "@/components/store/ProductFilters";
import { Pagination } from "@/components/store/Pagination";
import { Breadcrumb } from "@/components/store/Breadcrumb";

const PAGE_SIZE = 12;

export function CategoryContent({ categorySlug }: { categorySlug: string }) {
  const filters = useAppSelector(selectFilters);
  const [page, setPage] = useState(1);

  const category = getCategoryById(categorySlug);
  const categoryProducts = useMemo(
    () => getProductsByCategory(categorySlug),
    [categorySlug],
  );

  const filtered = useMemo(
    () => applyFilters(categoryProducts, { ...filters, category: null }),
    [categoryProducts, filters],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="font-display text-xl font-semibold">Category not found</p>
        <Link href="/store/categories" className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-cream hover:bg-warm-black">
          View All Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Categories", href: "/store/categories" },
          { label: category.label },
        ]}
      />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl px-5 py-12 text-cream sm:px-8 sm:py-14"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="relative z-10 max-w-xl">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{category.label}</h1>
          <p className="mt-2 max-w-lg text-sm text-cream/80">{category.description}</p>
          <p className="mt-3 text-xs text-cream/60">{categoryProducts.length} products</p>
        </div>
      </motion.div>

      <div className="flex gap-8">
        <ProductFilters className="w-56 shrink-0 space-y-5" />
        <div className="flex-1 min-w-0 space-y-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> products
          </p>
          <ProductGrid products={paginated} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
