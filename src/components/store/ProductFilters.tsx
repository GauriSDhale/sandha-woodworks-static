"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
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

const SORT_IDS: SortOption[] = [
  "newest",
  "price-asc",
  "price-desc",
  "popular",
  "top-rated",
];

function sortLabelKey(id: SortOption): string {
  switch (id) {
    case "newest":
      return "sort.newest";
    case "price-asc":
      return "sort.priceAsc";
    case "price-desc":
      return "sort.priceDesc";
    case "popular":
      return "sort.popular";
    case "top-rated":
      return "sort.topRated";
  }
}

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
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount = (filters.priceRange[0] !== PRICE_RANGE[0] || filters.priceRange[1] !== PRICE_RANGE[1]) ? 1 : 0;

  const FiltersContent = () => (
    <div className="space-y-5">
      <FilterSection title={t("filters.sortBy")}>
        {SORT_IDS.map((id) => (
          <label key={id} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="sortBy"
              checked={filters.sortBy === id}
              onChange={() => dispatch(setSortBy(id))}
              className="h-4 w-4 accent-foreground"
            />
            <span className={filters.sortBy === id ? "font-medium text-foreground" : "text-muted-foreground"}>
              {t(sortLabelKey(id))}
            </span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title={t("filters.category")}>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="radio"
            name="category"
            checked={filters.category === null}
            onChange={() => dispatch(setCategory(null))}
            className="h-4 w-4 accent-foreground"
          />
          <span className={!filters.category ? "font-medium text-foreground" : "text-muted-foreground"}>
            {t("filters.allProducts")}
          </span>
        </label>
        {topCategories.map((cat) => (
          <label key={cat.id} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="category"
              checked={filters.category === cat.id}
              onChange={() => dispatch(setCategory(cat.id as CategoryId))}
              className="h-4 w-4 accent-foreground"
            />
            <span className={filters.category === cat.id ? "font-medium text-foreground" : "text-muted-foreground"}>
              {t(`categories.${cat.id}.label`)}
            </span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title={t("filters.priceRange")}>
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
            aria-label={t("a11y.maxPrice")}
          />
        </div>
      </FilterSection>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => dispatch(resetFilters())}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <X className="h-3.5 w-3.5" />
          {t("filters.clearAll", { count: activeCount })}
        </button>
      )}
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        {t("filters.title")}
        {activeCount > 0 && (
          <span className="rounded-full bg-foreground px-1.5 py-0.5 text-[10px] font-bold text-cream">
            {activeCount}
          </span>
        )}
      </button>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-background p-5 shadow-2xl lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display font-semibold">{t("filters.title")}</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t("a11y.closeFilters")}
                className="rounded-full p-1.5 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <FiltersContent />
          </aside>
        </>
      )}

      <aside className={cn("hidden lg:block", className)}>
        <FiltersContent />
      </aside>
    </>
  );
}
