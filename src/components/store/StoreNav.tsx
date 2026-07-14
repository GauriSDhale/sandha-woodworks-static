"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/slices/cartSlice";
import { selectWishlistCount } from "@/store/slices/wishlistSlice";
import { openDrawer } from "@/store/slices/cartSlice";
import { SearchBar } from "@/components/store/SearchBar";
import { categories } from "@/store/data/categories";

export function StoreNav() {
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  const topCats = categories.filter((c) => !c.parent).slice(0, 6);

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-[10px] py-3 sm:gap-4">
        <Link
          href="/store"
          className="shrink-0 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-brand"
        >
          {t("nav.store")}
        </Link>

        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/store/wishlist"
            aria-label={t("a11y.wishlistCount", { count: wishlistCount })}
            className="relative flex items-center justify-center rounded-full p-2 transition hover:bg-muted"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-cream">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => dispatch(openDrawer())}
            aria-label={t("a11y.cartCount", { count: cartCount })}
            className="relative flex items-center justify-center rounded-full p-2 transition hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-cream">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <nav
        aria-label={t("a11y.productCategories")}
        className="mx-auto w-full max-w-7xl overflow-x-auto overscroll-x-contain px-[10px] pb-3"
      >
        <ul className="flex w-max min-w-full gap-1 whitespace-nowrap">
          <li>
            <Link
              href="/store"
              className={cn(
                "inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
                pathname === "/store"
                  ? "bg-foreground text-cream"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {t("nav.all")}
            </Link>
          </li>
          {topCats.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/store/categories/${cat.slug}`}
                className={cn(
                  "inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
                  pathname === `/store/categories/${cat.slug}`
                    ? "bg-foreground text-cream"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {t(`categories.${cat.id}.label`)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/store/categories"
              className="inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-muted"
            >
              {t("nav.allCategories")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
