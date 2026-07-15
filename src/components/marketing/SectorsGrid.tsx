"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { sectors } from "@/lib/constants/sectors";

export function SectorsGrid() {
  const { t } = useTranslation("sectors");

  return (
    <section className="relative z-10 px-4 pb-12 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector) => {
          const title = t(`markets.${sector.id}.title`);
          return (
            <Link
              key={sector.id}
              href={sector.href}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-surface-dark text-cream transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-2xl"
            >
              <img
                src={sector.image}
                alt={title}
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/60 to-surface-dark/10" />
              <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-surface-dark/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cream backdrop-blur">
                {sector.number} · {t(`markets.${sector.id}.label`)}
              </span>
              <div className="relative z-10 p-5 sm:p-6">
                <h3 className="font-display text-2xl sm:text-3xl">{title}</h3>
                <p className="mt-2 line-clamp-3 max-w-md text-xs text-cream/85 sm:text-sm">
                  {t(`markets.${sector.id}.description`)}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-cream/20 pt-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                    {t("grid.explore")}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-cream/70">
                    {t("grid.subSectors", { count: sector.subSectors })}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
