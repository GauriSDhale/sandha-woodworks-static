"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartCount } from "@/store/slices/cartSlice";
import { CartItem } from "@/components/store/CartItem";
import { OrderSummary } from "@/components/store/OrderSummary";
import { Breadcrumb } from "@/components/store/Breadcrumb";

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Cart" }]} />

      <div className="flex flex-wrap items-baseline gap-3">
        <h1 className="font-display text-3xl font-bold">Shopping Cart</h1>
        {count > 0 && (
          <span className="text-sm text-muted-foreground">
            ({count} item{count !== 1 ? "s" : ""})
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-muted/20 py-24 text-center"
        >
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <p className="font-display text-xl font-semibold">Your cart is empty</p>
          <p className="text-sm text-muted-foreground">
            Explore our premium millwork cabinet catalogue.
          </p>
          <Link
            href="/store"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-cream transition hover:bg-brand-red"
          >
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Items list */}
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </AnimatePresence>

            <div className="flex justify-between pt-2">
              <Link
                href="/store"
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <OrderSummary
            ctaLabel="Proceed to Checkout"
            onCta={() => {
              window.location.href = "/store/checkout";
            }}
          />
        </div>
      )}
    </div>
  );
}
