"use client";

import { useEffect, useState } from "react";
import { HashLink } from "@/components/ui/HashLink";
import { cn } from "@/lib/utils";

export interface SectionAnchorItem {
  id: string;
  label: string;
}

interface SectionAnchorNavProps {
  items: SectionAnchorItem[];
  label?: string;
}

export function SectionAnchorNav({
  items,
  label = "Page sections",
}: SectionAnchorNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const itemIds = items.map((item) => item.id).join("|");

  useEffect(() => {
    const ids = itemIds.split("|").filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextId = visible[0]?.target.id;
        if (nextId) setActiveId(nextId);
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0, 0.2, 0.45, 0.75],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [itemIds]);

  return (
    <nav
      aria-label={label}
      className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <HashLink
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "inline-flex shrink-0 cursor-pointer items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2",
                isActive
                  ? "bg-brand text-brand-foreground shadow-sm"
                  : "border border-border bg-white text-muted-foreground hover:border-brand/40 hover:bg-brand/5 hover:text-foreground active:scale-[0.97]",
              )}
            >
              {item.label}
            </HashLink>
          );
        })}
      </div>
    </nav>
  );
}
