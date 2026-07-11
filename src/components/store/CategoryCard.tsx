"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/store/types/product";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  productCount?: number;
  className?: string;
}

export function CategoryCard({
  category,
  productCount,
  className,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/store/categories/${category.slug}`}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg",
          className,
        )}
        aria-label={`Browse ${category.label}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <ProductImage
            src={category.image}
            alt={category.label}
            fill
            className="group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-display text-lg font-semibold text-white">
              {category.label}
            </h3>
            {productCount !== undefined && (
              <p className="text-sm text-white/80">{productCount} products</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {category.description}
          </p>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
