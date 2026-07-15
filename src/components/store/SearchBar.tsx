"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { localeFromPathname, localizeHref } from "@/lib/i18n/routing";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  openSearch,
  closeSearch,
  addSearchHistory,
  clearSearchHistory,
  selectSearchHistory,
  selectIsSearchOpen,
  setSearchQuery,
} from "@/store/slices/productsSlice";
import { searchProducts, POPULAR_SEARCHES } from "@/store/utils/filters";
import type { Product } from "@/store/types/product";

export function SearchBar() {
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const isOpen = useAppSelector(selectIsSearchOpen);
  const history = useAppSelector(selectSearchHistory);
  const recentSearches = history.slice(0, 10);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setSuggestions([]);
    }
  }, [isOpen]);

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setSuggestions(searchProducts(value, 6));
      }, 250);
    },
    [],
  );

  const handleSubmit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    dispatch(addSearchHistory(trimmed));
    dispatch(setSearchQuery(trimmed));
    dispatch(closeSearch());
    router.push(
      localizeHref(`/store?search=${encodeURIComponent(trimmed)}`, locale),
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dispatch(openSearch())}
        aria-label={t("a11y.openSearch")}
        className="flex min-w-[280px] items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2.5 text-sm text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">{t("search.placeholderShort")}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="sb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(closeSearch())}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              key="sb-panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-4 z-50 mx-auto max-w-3xl overflow-hidden rounded-2xl bg-background shadow-2xl"
              role="search"
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit(query);
                    if (e.key === "Escape") dispatch(closeSearch());
                  }}
                  placeholder={t("search.placeholder")}
                  className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                  aria-label={t("a11y.search")}
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => { setQuery(""); setSuggestions([]); }}
                    aria-label={t("a11y.clearSearch")}
                    className="rounded-full p-1 transition hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => dispatch(closeSearch())}
                  aria-label={t("a11y.closeSearch")}
                  className="rounded-full border border-border px-2 py-1 text-xs transition hover:bg-muted"
                >
                  {t("search.esc")}
                </button>
              </div>

              <div className="max-h-[75vh] overflow-y-auto p-4 space-y-4">
                {suggestions.length > 0 && (
                  <section>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("search.suggestions")}
                    </p>
                    <ul>
                      {suggestions.map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => handleSubmit(p.name)}
                            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition hover:bg-muted"
                          >
                            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <span className="flex-1">{p.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {t(`categories.${p.category}.label`)}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {query.length > 1 && suggestions.length === 0 && (
                  <div className="py-6 text-center">
                    <p className="text-sm font-medium text-foreground">
                      {t("search.noResults", { query })}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t("search.noResultsHint")}
                    </p>
                  </div>
                )}

                {!query && (
                  <>
                    {history.length > 0 && (
                      <section>
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {t("search.recent")}
                          </p>
                          <button
                            type="button"
                            onClick={() => dispatch(clearSearchHistory())}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            {t("search.clearHistory")}
                          </button>
                        </div>
                        <ul>
                          {recentSearches.map((h) => (
                            <li key={h}>
                              <button
                                type="button"
                                onClick={() => handleSubmit(h)}
                                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition hover:bg-muted"
                              >
                                <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                {h}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    <section>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("search.popular")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_SEARCHES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => handleSubmit(s.query)}
                            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-foreground/30 hover:bg-muted"
                          >
                            <TrendingUp className="h-3 w-3 text-brand-red" />
                            {t(`search.popularTerms.${s.id}`)}
                          </button>
                        ))}
                      </div>
                    </section>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
