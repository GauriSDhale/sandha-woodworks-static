"use client";

import Link from "@/components/i18n/Link";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const { t } = useTranslation("store");
  const allItems: BreadcrumbItem[] = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.store"), href: "/store" },
    ...items,
  ];

  return (
    <nav aria-label={t("a11y.breadcrumb")} className={cn("", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1">
              {idx > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden="true" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {idx === 0 ? (
                    <Home className="h-3.5 w-3.5" aria-label={t("a11y.home")} />
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span
                  className={cn(isLast && "font-medium text-foreground")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: allItems.map((item, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: item.label,
              item: item.href
                ? `https://sandhawoodworks.ca${item.href}`
                : undefined,
            })),
          }),
        }}
      />
    </nav>
  );
}
