"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { HashLink } from "@/components/ui/HashLink";
import { sectorMedia } from "@/lib/constants/media";
import { sectors } from "@/lib/constants/sectors";

export function SectorsGrid() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [pathname]);

  return (
    <section className="relative z-10 px-4 pb-24 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
        {sectors.map((sector) => (
          <div key={sector.id} id={sector.id} className="scroll-mt-28">
            <HashLink
              href={sector.href}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-surface-dark text-cream transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-2xl"
            >
              <img
                src={sectorMedia[sector.imageKey]}
                alt={sector.title}
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/60 to-surface-dark/10" />
              <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-surface-dark/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cream backdrop-blur">
                {sector.number} · {sector.label}
              </span>
              <div className="relative z-10 p-5 sm:p-6">
                <h3 className="font-display text-2xl sm:text-3xl">{sector.title}</h3>
                <p className="mt-2 line-clamp-3 max-w-md text-xs text-cream/85 sm:text-sm">
                  {sector.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-cream/20 pt-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                    Explore →
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-cream/70">
                    {sector.subSectors} sub-sectors
                  </span>
                </div>
              </div>
            </HashLink>
          </div>
        ))}
      </div>
    </section>
  );
}
