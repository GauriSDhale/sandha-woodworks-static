"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { searchProducts } from "@/store/utils/filters";
import { ProductGrid } from "@/components/store/ProductGrid";
import { Breadcrumb } from "@/components/store/Breadcrumb";
import { SkeletonGrid } from "@/components/store/SkeletonCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const results = useMemo(
    () => (query.trim() ? searchProducts(query.trim(), 48) : []),
    [query]
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: "Store", href: "/store" },
            { label: "Search" },
          ]}
        />

        <div className="mt-6 mb-8">
          <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
            {query ? (
              <>
                Search results for{" "}
                <span className="text-[var(--brand-red)]">
                  &ldquo;{query}&rdquo;
                </span>
              </>
            ) : (
              "Search"
            )}
          </h1>
          {query && (
            <p className="mt-1 text-[var(--muted-foreground)]">
              {results.length} {results.length === 1 ? "result" : "results"}{" "}
              found
            </p>
          )}
        </div>

        {!query && (
          <div className="text-center py-24">
            <p className="text-2xl font-display font-semibold text-[var(--muted-foreground)]">
              Enter a search term to find products.
            </p>
            <Link
              href="/store"
              className="mt-6 inline-block rounded-md bg-[var(--brand-red)] px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-24">
            <p className="text-2xl font-display font-semibold text-[var(--muted-foreground)]">
              No products found for &ldquo;{query}&rdquo;.
            </p>
            <p className="mt-2 text-[var(--muted-foreground)]">
              Try a different keyword or browse our categories.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/store"
                className="rounded-md bg-[var(--brand-red)] px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Browse All Products
              </Link>
              <Link
                href="/store/categories"
                className="rounded-md border border-[var(--border)] px-6 py-3 text-[var(--foreground)] font-semibold hover:bg-[var(--muted)] transition-colors"
              >
                View Categories
              </Link>
            </div>
          </div>
        )}

        {query && results.length > 0 && <ProductGrid products={results} />}
      </div>
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
