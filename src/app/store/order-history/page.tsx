"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, ArrowRight, Package } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectOrders } from "@/store/slices/ordersSlice";
import { formatDate, formatPrice } from "@/store/utils/format";
import { Breadcrumb } from "@/components/store/Breadcrumb";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  confirmed: "bg-emerald-100 text-emerald-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-amber-100 text-amber-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-500",
};

export default function OrderHistoryPage() {
  const orders = useAppSelector(selectOrders);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Order History" }]} />
      <h1 className="font-display text-3xl font-bold">Order History</h1>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-muted/20 py-24 text-center"
        >
          <ClipboardList className="h-16 w-16 text-muted-foreground/30" />
          <p className="font-display text-xl font-semibold">No orders yet</p>
          <p className="text-sm text-muted-foreground">
            Your order history will appear here once you&apos;ve placed an order.
          </p>
          <Link
            href="/store"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-cream transition hover:bg-warm-black"
          >
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-2xl border border-border bg-background p-5 space-y-4"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Order Number</p>
                  <p className="font-display font-bold text-foreground">{order.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Placed</p>
                  <p className="text-sm font-medium">{formatDate(order.createdAt)}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold capitalize",
                    STATUS_STYLES[order.status] ?? STATUS_STYLES.pending,
                  )}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-1.5">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.productId} className="flex items-center gap-3 text-sm">
                    <Package className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 text-muted-foreground line-clamp-1">{item.name}</span>
                    <span className="font-medium">×{item.quantity}</span>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className="text-xs text-muted-foreground pl-7">+{order.items.length - 2} more item(s)</p>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-display font-bold">{formatPrice(order.total)}</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground self-center">
                    via {order.deliveryMethod.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
