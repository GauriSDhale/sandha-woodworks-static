"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/slices/cartSlice";
import { selectWishlistCount } from "@/store/slices/wishlistSlice";
import { openDrawer } from "@/store/slices/cartSlice";
import { SearchBar } from "@/components/store/SearchBar";
import { categories } from "@/store/data/categories";

export function StoreNav() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  const topCats = categories.filter((c) => !c.parent).slice(0, 6);

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Top bar: search + cart + wishlist */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/store"
          className="font-display text-sm font-semibold uppercase tracking-wider text-foreground hover:text-brand-red transition-colors shrink-0"
        >
          Store
        </Link>

        <div className="flex-1">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/store/wishlist"
            aria-label={`Wishlist (${wishlistCount} items)`}
            className="relative flex items-center justify-center rounded-full p-2 transition hover:bg-muted"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[9px] font-bold text-white">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => dispatch(openDrawer())}
            aria-label={`Shopping cart (${cartCount} items)`}
            className="relative flex items-center justify-center rounded-full p-2 transition hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[9px] font-bold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav
        aria-label="Product categories"
        className="mx-auto max-w-7xl overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8"
      >
        <ul className="flex gap-1 whitespace-nowrap">
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
              All
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
                {cat.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/store/categories"
              className="inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-red transition-all hover:bg-brand-red/10"
            >
              All Categories →
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
