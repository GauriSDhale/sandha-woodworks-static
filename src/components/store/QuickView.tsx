"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { Product } from "@/store/types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, selectCartItems } from "@/store/slices/cartSlice";
import { ProductGallery } from "./ProductGallery";
import { Rating } from "./Rating";
import { PriceTag } from "./PriceTag";
import { WishlistButton } from "./WishlistButton";
import { availabilityLabel } from "@/store/utils/format";
import { getProductLocalizedCopy } from "@/store/utils/productCopy";

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const { t } = useTranslation("store");
  const { t: tCatalog } = useTranslation("storeCatalog");
  const copy = getProductLocalizedCopy(product, tCatalog);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);

  const inCart = cartItems.some((item) => item.productId === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) {
      router.push("/store/cart");
      return;
    }

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
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-4 top-1/2 z-50 max-h-[90vh] -translate-y-1/2 overflow-y-auto rounded-3xl bg-background shadow-2xl md:inset-x-auto md:left-1/2 md:w-full md:max-w-3xl md:-translate-x-1/2"
        role="dialog"
        aria-modal="true"
        aria-label={t("a11y.quickViewNamed", { name: product.name })}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("a11y.closeQuickView")}
          className="absolute right-4 top-4 z-10 rounded-full bg-muted p-1.5 transition hover:bg-border"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t(`categories.${product.category}.label`)}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold text-foreground">
                {product.name}
              </h2>
            </div>

            <Rating value={product.rating} count={product.reviews} />
            <PriceTag price={product.price} discountPrice={product.discountPrice} />

            <span
              className={cn(
                "text-sm font-medium",
                product.availability === "in-stock"
                  ? "text-emerald-600"
                  : "text-amber-600",
              )}
            >
              {availabilityLabel(product.availability, t)}
            </span>

            <p className="line-clamp-3 text-sm text-muted-foreground">
              {copy.description}
            </p>

            <div className="mt-auto flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 font-semibold text-cream transition hover:bg-warm-black"
              >
                <ShoppingCart className="h-4 w-4" />
                {t("product.addToCart")}
              </button>
              <div className="flex gap-2">
                <WishlistButton
                  productId={product.id}
                  variant="button"
                  className="flex-1"
                />
                <Link
                  href={`/store/${product.slug}`}
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                >
                  {t("product.fullDetails")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
