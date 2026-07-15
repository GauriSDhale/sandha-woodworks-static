"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const { t } = useTranslation("store");
  if (totalPages <= 1) return null;

  const pages = getPagesToShow(currentPage, totalPages);

  return (
    <nav
      aria-label={t("a11y.pagination")}
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={t("a11y.prevPage")}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all hover:bg-muted disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page as number)}
            aria-label={t("a11y.pageN", { page })}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all",
              page === currentPage
                ? "bg-foreground text-cream shadow-sm"
                : "border border-border hover:bg-muted",
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={t("a11y.nextPage")}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all hover:bg-muted disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

function getPagesToShow(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}
