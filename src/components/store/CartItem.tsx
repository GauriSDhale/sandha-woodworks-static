"use client";

import { Trash2, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { CartItem as CartItemType } from "@/store/types/cart";
import { useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { addToWishlist } from "@/store/slices/wishlistSlice";
import { QuantitySelector } from "./QuantitySelector";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/store/utils/format";

interface CartItemProps {
  item: CartItemType;
  compact?: boolean;
}

export function CartItem({ item, compact = false }: CartItemProps) {
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 rounded-xl border border-border bg-background p-3"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
        <ProductImage
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {item.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {t("product.skuLabel")} {item.SKU}
        </p>

        {!compact && (
          <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
            <QuantitySelector
              value={item.quantity}
              onChange={(q) =>
                dispatch(updateQuantity({ productId: item.productId, quantity: q }))
              }
              size="sm"
            />
            <span className="font-semibold text-foreground">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        )}

        {compact && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {t("cart.qty")} {item.quantity}
            </span>
            <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
          </div>
        )}

        {!compact && (
          <div className="mt-1 flex gap-2">
            <button
              type="button"
              onClick={() => {
                dispatch(addToWishlist(item.productId));
                dispatch(removeFromCart(item.productId));
              }}
              className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
            >
              <MoveRight className="h-3 w-3" />
              {t("cart.moveToWishlist")}
            </button>
            <button
              type="button"
              onClick={() => dispatch(removeFromCart(item.productId))}
              className="ml-auto flex items-center gap-1 text-xs text-red-500 transition hover:text-red-600"
            >
              <Trash2 className="h-3 w-3" />
              {t("cart.remove")}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
