"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectFilters,
  setPriceRange,
  setSortBy,
  resetFilters,
} from "@/store/slices/productsSlice";
import type { SortOption } from "@/store/types/product";
import { PRICE_RANGE } from "@/store/data/products";

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "popular", label: "Most Popular" },
  { id: "top-rated", label: "Top Rated" },
];

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-1 text-sm font-semibold uppercase tracking-wider text-foreground"
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

export function ProductFilters({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount = (filters.priceRange[0] !== PRICE_RANGE[0] || filters.priceRange[1] !== PRICE_RANGE[1]) ? 1 : 0;

  const FiltersContent = () => (
    <div className="space-y-5">
      {/* Sort (mobile — shown inside filters panel) */}
      <FilterSection title="Sort By">
        {SORT_OPTIONS.map((opt) => (
          <label key={opt.id} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="sortBy"
              checked={filters.sortBy === opt.id}
              onChange={() => dispatch(setSortBy(opt.id))}
              className="h-4 w-4 accent-foreground"
            />
            <span className={filters.sortBy === opt.id ? "font-medium text-foreground" : "text-muted-foreground"}>
              {opt.label}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price range */}
      <FilterSection title="Price Range (CAD)">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={50}
            value={filters.priceRange[1]}
            onChange={(e) =>
              dispatch(setPriceRange([filters.priceRange[0], Number(e.target.value)]))
            }
            className="w-full accent-foreground"
            aria-label="Maximum price"
          />
        </div>
      </FilterSection>

      {/* Reset */}
      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => dispatch(resetFilters())}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <X className="h-3.5 w-3.5" />
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeCount > 0 && (
          <span className="rounded-full bg-foreground px-1.5 py-0.5 text-[10px] font-bold text-cream">
            {activeCount}
          </span>
        )}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-background p-5 shadow-2xl lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display font-semibold">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close filters"
                className="rounded-full p-1.5 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <FiltersContent />
          </aside>
        </>
      )}

      {/* Desktop sidebar */}
      <aside className={cn("hidden lg:block", className)}>
        <FiltersContent />
      </aside>
    </>
  );
}
