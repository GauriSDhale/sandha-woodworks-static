"use client";

import { useEffect } from "react";
import Link from "@/components/i18n/Link";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentOrder } from "@/store/slices/ordersSlice";
import { formatDate, formatPrice } from "@/store/utils/format";
import { deliveryI18nKey } from "@/store/types/order";

export default function OrderSuccessPage() {
  const { t } = useTranslation("store");
  const order = useAppSelector(selectCurrentOrder);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const timeline = [
    { icon: CheckCircle2, label: t("orders.timeline.confirmed"), done: true },
    { icon: Package, label: t("orders.timeline.prepared"), done: false },
    { icon: Truck, label: t("orders.timeline.outForDelivery"), done: false },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100"
      >
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <h1 className="font-display text-3xl font-bold text-foreground">
          {t("orders.successTitle")}
        </h1>
        {order && (
          <p className="text-muted-foreground">
            {t("orders.successMessage", { orderNumber: order.orderNumber })}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          {t("orders.emailConfirmation")}
        </p>
      </motion.div>

      {order && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-lg rounded-3xl border border-border bg-background p-6 text-left space-y-5"
        >
          <h2 className="font-display font-semibold text-lg">{t("orders.summary")}</h2>

          <div className="space-y-2">
            {order.items.slice(0, 3).map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                <span className="font-medium">{formatPrice(item.subtotal)}</span>
              </div>
            ))}
            {order.items.length > 3 && (
              <p className="text-xs text-muted-foreground">
                {t("orders.moreItems", { count: order.items.length - 3 })}
              </p>
            )}
          </div>

          <div className="h-px bg-border" />

          <div className="flex justify-between font-display">
            <span className="font-semibold">{t("orders.totalPaid")}</span>
            <span className="text-xl font-bold">{formatPrice(order.total)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-muted/40 px-3 py-2">
              <p className="text-xs text-muted-foreground">{t("orders.placedOn")}</p>
              <p className="font-semibold">{formatDate(order.createdAt)}</p>
            </div>
            <div className="rounded-xl bg-muted/40 px-3 py-2">
              <p className="text-xs text-muted-foreground">{t("orders.delivery")}</p>
              <p className="font-semibold">
                {t(deliveryI18nKey(order.deliveryMethod.id, "estimatedDays"))}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {timeline.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <step.icon
                  className={`h-5 w-5 shrink-0 ${step.done ? "text-emerald-600" : "text-muted-foreground/30"}`}
                />
                <span className={`text-sm ${step.done ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
                {step.done && <span className="ml-auto text-xs text-emerald-600 font-medium">✓</span>}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap gap-3"
      >
        <Link
          href="/store/order-history"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition hover:bg-muted"
        >
          {t("orders.viewHistory")}
        </Link>
        <Link
          href="/store"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-cream transition hover:bg-warm-black"
        >
          {t("cart.continueShopping")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
