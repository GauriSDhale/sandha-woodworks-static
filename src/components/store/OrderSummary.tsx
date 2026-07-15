"use client";

import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import {
  selectCartSubtotal,
  selectCartDiscount,
  selectCartGST,
  selectCartItems,
} from "@/store/slices/cartSlice";
import { formatPrice } from "@/store/utils/format";
import { DELIVERY_METHODS, deliveryI18nKey } from "@/store/types/order";

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
  const { t } = useTranslation("store");
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const gst = useAppSelector(selectCartGST);

  const deliveryMethod = DELIVERY_METHODS.find((m) => m.id === deliveryMethodId);
  const shipping = deliveryMethod?.price ?? 0;
  const total = subtotal - discount + gst + shipping;
  const methodLabel = deliveryMethod
    ? t(deliveryI18nKey(deliveryMethod.id, "label"))
    : null;

  const rows = [
    { label: t("cart.subtotal"), value: formatPrice(subtotal) },
    ...(discount > 0
      ? [{ label: t("cart.discount"), value: `-${formatPrice(discount)}`, accent: true }]
      : []),
    { label: t("cart.hst"), value: formatPrice(gst) },
    {
      label: methodLabel
        ? t("cart.shippingWithMethod", { method: methodLabel })
        : t("cart.shipping"),
      value: shipping > 0 ? formatPrice(shipping) : t("cart.shippingTbd"),
    },
  ];

  const trustBadges = [
    t("cart.trust.secureCheckout"),
    t("cart.trust.freeReturns"),
    t("cart.trust.awmac"),
    t("cart.trust.warranty"),
  ];

  return (
    <div className={cn("rounded-2xl border border-border bg-background p-5 space-y-4", className)}>
      <h3 className="font-display font-semibold text-lg">{t("cart.orderSummary")}</h3>

      <p className="text-sm text-muted-foreground">
        {t("cart.itemsCount", {
          count: items.reduce((a, i) => a + i.quantity, 0),
        })}
      </p>

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

      <div className="h-px bg-border" />

      <div className="flex justify-between font-display">
        <span className="text-base font-semibold">{t("cart.total")}</span>
        <span className="text-xl font-bold">{formatPrice(total)}</span>
      </div>

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

      <div className="grid grid-cols-2 gap-2 pt-1">
        {trustBadges.map((badge) => (
          <div key={badge} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
