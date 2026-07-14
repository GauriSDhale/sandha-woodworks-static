"use client";

import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleWishlist, selectIsInWishlist } from "@/store/slices/wishlistSlice";

interface WishlistButtonProps {
  productId: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button";
  className?: string;
}

export function WishlistButton({
  productId,
  size = "md",
  variant = "icon",
  className,
}: WishlistButtonProps) {
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsInWishlist(productId));

  const iconSize =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(productId));
  };

  const ariaLabel = isInWishlist
    ? t("a11y.removeFromWishlist")
    : t("a11y.addToWishlist");

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
          isInWishlist
            ? "border-brand-red/30 bg-brand-red/5 text-brand-red"
            : "border-border hover:border-brand-red/30 hover:text-brand-red",
          className,
        )}
      >
        <Heart
          className={cn(iconSize, isInWishlist ? "fill-brand-red" : "")}
        />
        {isInWishlist ? t("wishlist.saved") : t("wishlist.save")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(
        "group/wish flex items-center justify-center rounded-full p-1.5 transition-all",
        isInWishlist
          ? "text-brand-red"
          : "text-muted-foreground hover:text-brand-red",
        className,
      )}
    >
      <Heart
        className={cn(
          iconSize,
          "transition-transform group-hover/wish:scale-110",
          isInWishlist ? "fill-brand-red" : "fill-none",
        )}
      />
    </button>
  );
}
