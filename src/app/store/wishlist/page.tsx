"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectWishlistIds, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { products } from "@/store/data/products";
import { Breadcrumb } from "@/components/store/Breadcrumb";
import { ProductCard } from "@/components/store/ProductCard";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((p) => {
      dispatch(
        addToCart({
          productId: p.id,
          quantity: 1,
          price: p.discountPrice ?? p.price,
          name: p.name,
          image: p.images[0],
          SKU: p.SKU,
          category: p.category,
        }),
      );
      dispatch(removeFromWishlist(p.id));
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Wishlist" }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-3xl font-bold">Wishlist</h1>
          {wishlistProducts.length > 0 && (
            <span className="text-sm text-muted-foreground">
              ({wishlistProducts.length} item{wishlistProducts.length !== 1 ? "s" : ""})
            </span>
          )}
        </div>
        {wishlistProducts.length > 0 && (
          <button
            type="button"
            onClick={handleMoveAllToCart}
            className="flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-cream transition hover:bg-brand-red"
          >
            <ShoppingCart className="h-4 w-4" />
            Move All to Cart
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-muted/20 py-24 text-center"
        >
          <Heart className="h-16 w-16 text-muted-foreground/30" />
          <p className="font-display text-xl font-semibold">Your wishlist is empty</p>
          <p className="text-sm text-muted-foreground">
            Save products you love and come back to them later.
          </p>
          <Link
            href="/store"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-cream transition hover:bg-brand-red"
          >
            Browse Products
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
