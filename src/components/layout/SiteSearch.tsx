"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Search, X } from "lucide-react";
import { searchSite, type SearchItem, type SearchKind } from "@/lib/search";
import { cn } from "@/lib/utils";

const kindStyles: Record<SearchKind, string> = {
  Page: "bg-muted text-muted-foreground",
  Service: "bg-brand/15 text-brand-dark",
  Sector: "bg-emerald-500/15 text-emerald-800",
  Project: "bg-amber-500/15 text-amber-900",
};

interface SiteSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SiteSearch({ open, onOpenChange }: SiteSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchSite(query), [query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) =>
          results.length === 0 ? 0 : (index + 1) % results.length,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) =>
          results.length === 0
            ? 0
            : (index - 1 + results.length) % results.length,
        );
        return;
      }

      if (event.key === "Enter") {
        const item = results[activeIndex];
        if (!item) return;
        event.preventDefault();
        navigateTo(item);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, results, activeIndex, onOpenChange]);

  function navigateTo(item: SearchItem) {
    onOpenChange(false);
    router.push(item.url);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className="mx-auto mt-[10vh] w-full max-w-2xl px-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services, sectors, projects, pages…"
              className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              aria-autocomplete="list"
              aria-controls={listId}
              aria-activedescendant={
                results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined
              }
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex cursor-pointer items-center justify-center rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div id={listId} role="listbox" className="max-h-[60vh] overflow-y-auto py-2">
            {!query.trim() ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                Try “healthcare millwork”, “CNC”, “Robarts”, “finishing”, “multi-residential”…
              </p>
            ) : results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                No results for “{query.trim()}”.
              </p>
            ) : (
              results.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    id={`${listId}-${item.id}`}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => navigateTo(item)}
                    className={cn(
                      "flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left transition-colors",
                      isActive ? "bg-brand/10" : "hover:bg-muted/70",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
                        kindStyles[item.kind],
                      )}
                    >
                      {item.kind}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-foreground">{item.title}</span>
                      <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 transition-colors",
                        isActive ? "text-brand" : "text-muted-foreground/50",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
            <span>Search across the whole site</span>
            <span className="hidden sm:inline">↑↓ Navigate · Enter Open · Esc Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useSiteSearchHotkey(onOpen: () => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        const target = event.target as HTMLElement | null;
        const tag = target?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
          return;
        }
        event.preventDefault();
        onOpen();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);
}
