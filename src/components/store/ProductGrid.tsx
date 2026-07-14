"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Product } from "@/store/types/product";
import { ProductCard } from "./ProductCard";
import { SkeletonGrid } from "./SkeletonCard";
import { QuickView } from "./QuickView";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function ProductGrid({
  products,
  isLoading = false,
  skeletonCount = 8,
}: ProductGridProps) {
  const { t } = useTranslation("store");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (isLoading) return <SkeletonGrid count={skeletonCount} />;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-muted/30 py-20 text-center">
        <p className="text-xl font-display font-semibold text-foreground">
          {t("empty.noProducts")}
        </p>
        <p className="text-sm text-muted-foreground">
          {t("empty.noProductsHint")}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
              priority={idx < 4}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {quickViewProduct && (
          <QuickView
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
