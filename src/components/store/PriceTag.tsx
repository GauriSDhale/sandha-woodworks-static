"use client";

import { cn } from "@/lib/utils";
import { formatPrice, discountPercent } from "@/store/utils/format";

interface PriceTagProps {
  price: number;
  discountPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showBadge?: boolean;
}

export function PriceTag({
  price,
  discountPrice,
  size = "md",
  className,
  showBadge = true,
}: PriceTagProps) {
  const hasDiscount = discountPrice !== undefined && discountPrice < price;
  const pct = hasDiscount ? discountPercent(price, discountPrice!) : 0;

  const mainSize =
    size === "sm"
      ? "text-base font-semibold"
      : size === "lg"
        ? "text-2xl font-bold"
        : "text-lg font-semibold";

  const strikeSize =
    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn(mainSize, "text-foreground")}>
        {formatPrice(hasDiscount ? discountPrice! : price)}
      </span>
      {hasDiscount && (
        <>
          <span className={cn(strikeSize, "text-muted-foreground line-through")}>
            {formatPrice(price)}
          </span>
          {showBadge && (
            <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-xs font-semibold text-brand-red">
              -{pct}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
