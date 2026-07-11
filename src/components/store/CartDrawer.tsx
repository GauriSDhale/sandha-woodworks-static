"use client";

import Link from "next/link";
import { X, ShoppingBag, ArrowRight, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartCount,
  closeDrawer,
  selectIsDrawerOpen,
} from "@/store/slices/cartSlice";
import { CartItem } from "./CartItem";
import { formatPrice } from "@/store/utils/format";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsDrawerOpen);
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const count = useAppSelector(selectCartCount);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeDrawer())}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <h2 className="font-display font-semibold">
                  Cart
                  {count > 0 && (
                    <span className="ml-2 rounded-full bg-foreground px-2 py-0.5 text-xs font-bold text-cream">
                      {count}
                    </span>
                  )}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => dispatch(closeDrawer())}
                aria-label="Close cart"
                className="rounded-full p-1.5 transition hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
                  <p className="font-display font-semibold text-foreground">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add some products to get started.
                  </p>
                  <Link
                    href="/store"
                    onClick={() => dispatch(closeDrawer())}
                    className="mt-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-cream transition hover:bg-brand-red"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <AnimatePresence>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <CartItem key={item.productId} item={item} />
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-3">
                <div className="flex items-center justify-between font-display">
                  <span className="text-base font-semibold">Subtotal</span>
                  <span className="text-lg font-bold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  HST and shipping calculated at checkout.
                </p>
                <Link
                  href="/store/checkout"
                  onClick={() => dispatch(closeDrawer())}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 font-semibold text-cream transition hover:bg-brand-red"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/store/cart"
                  onClick={() => dispatch(closeDrawer())}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium transition hover:bg-muted"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
