"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/store/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Rating } from "./Rating";
import { PriceTag } from "./PriceTag";
import { WishlistButton } from "./WishlistButton";
import { ProductImage } from "./ProductImage";
import { availabilityLabel } from "@/store/utils/format";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, onQuickView, priority }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
        price: product.discountPrice ?? product.price,
        name: product.name,
        image: product.images[0],
        SKU: product.SKU,
        category: product.category,
      }),
    );
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <Link
        href={`/store/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
        aria-label={product.name}
        tabIndex={0}
      >
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          className="group-hover:scale-105"
        />

        {/* Action overlay */}
        <div className="absolute inset-0 flex items-end justify-center gap-2 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 pb-3">
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              aria-label="Quick view"
              className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </button>
          )}
        </div>

        {/* Wishlist overlay */}
        <div className="absolute right-2.5 top-2.5">
          <WishlistButton
            productId={product.id}
            size="sm"
            className="rounded-full bg-white/80 shadow backdrop-blur-sm hover:bg-white"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category */}
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category.replace(/-/g, " ")}
        </p>

        {/* Name */}
        <Link
          href={`/store/${product.slug}`}
          className="line-clamp-2 font-display font-semibold leading-snug text-foreground transition-colors hover:text-brand-red"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <Rating value={product.rating} count={product.reviews} size="sm" />

        {/* Availability */}
        <span
          className={cn(
            "text-xs font-medium",
            product.availability === "in-stock"
              ? "text-emerald-600"
              : product.availability === "made-to-order"
                ? "text-amber-600"
                : "text-red-500",
          )}
        >
          {availabilityLabel(product.availability)}
        </span>

        {/* Price + Cart */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <PriceTag
            price={product.price}
            discountPrice={product.discountPrice}
            size="sm"
          />
          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.93 }}
            aria-label="Add to cart"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all",
              adding
                ? "bg-emerald-600 text-white"
                : "bg-foreground text-cream hover:bg-warm-black",
            )}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {adding ? "Added!" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
