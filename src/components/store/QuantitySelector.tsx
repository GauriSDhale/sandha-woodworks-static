"use client";

import { Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const { t } = useTranslation("store");
  const btnBase = cn(
    "flex items-center justify-center rounded-full border border-border transition-all hover:border-foreground/40 active:scale-95",
    size === "sm" ? "h-7 w-7" : size === "lg" ? "h-10 w-10" : "h-8 w-8",
  );
  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const numSize = size === "sm" ? "min-w-[1.5rem] text-sm" : size === "lg" ? "min-w-[2.5rem] text-lg" : "min-w-[2rem] text-base";

  return (
    <div className={cn("flex items-center gap-2", className)} role="group" aria-label={t("a11y.quantitySelector")}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={t("a11y.decreaseQuantity")}
        className={cn(btnBase, "disabled:pointer-events-none disabled:opacity-30")}
      >
        <Minus className={iconSize} />
      </button>
      <span
        className={cn(
          numSize,
          "select-none text-center font-semibold tabular-nums",
        )}
        aria-live="polite"
        aria-label={t("a11y.quantityValue", { count: value })}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={t("a11y.increaseQuantity")}
        className={cn(btnBase, "disabled:pointer-events-none disabled:opacity-30")}
      >
        <Plus className={iconSize} />
      </button>
    </div>
  );
}
