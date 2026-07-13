"use client";

import { useState } from "react";
import { Tag, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartSubtotal,
  selectCartDiscount,
  selectCartGST,
  selectCartItems,
} from "@/store/slices/cartSlice";
import { formatPrice } from "@/store/utils/format";
import { DELIVERY_METHODS } from "@/store/types/order";

interface OrderSummaryProps {
  deliveryMethodId?: string;
  ctaLabel?: string;
  onCta?: () => void;
  ctaDisabled?: boolean;
  className?: string;
}

export function OrderSummary({
  deliveryMethodId,
  ctaLabel,
  onCta,
  ctaDisabled,
  className,
}: OrderSummaryProps) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const gst = useAppSelector(selectCartGST);
  const coupon = null;

  const deliveryMethod = DELIVERY_METHODS.find((m) => m.id === deliveryMethodId);
  const shipping = deliveryMethod?.price ?? 0;
  const total = subtotal - discount + gst + shipping;

  const handleApplyCoupon = () => {};

  const rows = [
    { label: "Subtotal", value: formatPrice(subtotal) },
    ...(discount > 0 ? [{ label: "Discount", value: `-${formatPrice(discount)}`, accent: true }] : []),
    { label: "HST (13%)", value: formatPrice(gst) },
    { label: deliveryMethod ? `Shipping (${deliveryMethod.label})` : "Shipping", value: shipping > 0 ? formatPrice(shipping) : "—" },
  ];

  return (
    <div className={cn("rounded-2xl border border-border bg-background p-5 space-y-4", className)}>
      <h3 className="font-display font-semibold text-lg">Order Summary</h3>

      {/* Items count */}
      <p className="text-sm text-muted-foreground">
        {items.reduce((a, i) => a + i.quantity, 0)} item(s)
      </p>

      {/* Line items */}
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{row.label}</span>
            <span className={cn("font-medium", row.accent && "text-emerald-600")}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Total */}
      <div className="flex justify-between font-display">
        <span className="text-base font-semibold">Total</span>
        <span className="text-xl font-bold">{formatPrice(total)}</span>
      </div>

      {/* CTA */}
      {ctaLabel && onCta && (
        <button
          type="button"
          onClick={onCta}
          disabled={ctaDisabled || items.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 font-semibold text-cream transition hover:bg-warm-black disabled:pointer-events-none disabled:opacity-40"
        >
          {ctaLabel}
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        {["Secure Checkout", "Free Returns", "AWMAC Certified", "5-Year Warranty"].map((badge) => (
          <div key={badge} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
