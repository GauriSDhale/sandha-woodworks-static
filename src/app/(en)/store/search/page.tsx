"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import Link from "@/components/i18n/Link";
import { useTranslation } from "react-i18next";
import { searchProducts } from "@/store/utils/filters";
import { ProductGrid } from "@/components/store/ProductGrid";
import { Breadcrumb } from "@/components/store/Breadcrumb";
import { SkeletonGrid } from "@/components/store/SkeletonCard";

function SearchResults() {
  const { t } = useTranslation("store");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const results = useMemo(
    () => (query.trim() ? searchProducts(query.trim(), 48) : []),
    [query]
  );

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: t("search.breadcrumb") },
        ]}
      />

      <div className="mb-2">
        <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
          {query
            ? t("search.resultsFor", { query })
            : t("search.title")}
        </h1>
        {query && (
          <p className="mt-1 text-[var(--muted-foreground)]">
            {t("search.resultsCount", { count: results.length })}
          </p>
        )}
      </div>

      {!query && (
        <div className="text-center py-24">
          <p className="text-2xl font-display font-semibold text-[var(--muted-foreground)]">
            {t("empty.searchPrompt")}
          </p>
          <Link
            href="/store"
            className="mt-6 inline-block rounded-md bg-[var(--brand-red)] px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {t("search.browseAll")}
          </Link>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-24">
          <p className="text-2xl font-display font-semibold text-[var(--muted-foreground)]">
            {t("empty.searchNoResults", { query })}
          </p>
          <p className="mt-2 text-[var(--muted-foreground)]">
            {t("empty.searchNoResultsHint")}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/store"
              className="rounded-md bg-[var(--brand-red)] px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {t("search.browseAll")}
            </Link>
            <Link
              href="/store/categories"
              className="rounded-md border border-[var(--border)] px-6 py-3 text-[var(--foreground)] font-semibold hover:bg-[var(--muted)] transition-colors"
            >
              {t("search.viewCategories")}
            </Link>
          </div>
        </div>
      )}

      {query && results.length > 0 && <ProductGrid products={results} />}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SkeletonGrid count={12} />}>
      <SearchResults />
    </Suspense>
  );
}
