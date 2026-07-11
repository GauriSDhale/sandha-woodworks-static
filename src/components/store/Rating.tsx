"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export function Rating({
  value,
  count,
  size = "md",
  showCount = true,
  className,
}: RatingProps) {
  const starSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              starSize,
              star <= Math.round(value)
                ? "fill-amber-400 text-amber-400"
                : star - 0.5 <= value
                  ? "fill-amber-200 text-amber-400"
                  : "fill-none text-muted-foreground/30",
            )}
          />
        ))}
      </div>
      <span className={cn(textSize, "font-medium tabular-nums text-foreground/70")}>
        {value.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className={cn(textSize, "text-muted-foreground")}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
