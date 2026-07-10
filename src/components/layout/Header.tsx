"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navSectorLinks } from "@/lib/constants/sectors";
import { navLinks, siteConfig } from "@/lib/constants/site";
import { brandMedia } from "@/lib/constants/media";
import { HashLink } from "@/components/ui/HashLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { getNavLabel, getSectorLabel } from "@/lib/i18n/nav";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const navLinkBase =
  "relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-medium tracking-wide transition-all duration-200 ease-out hover:bg-brand/10 active:scale-[0.92] active:bg-brand/25 active:shadow-inner";

function navLinkClasses(isHome: boolean, active: boolean) {
  return cn(
    navLinkBase,
    isHome
      ? "text-[15px] text-cream/90 hover:text-white active:text-white"
      : cn(
          "text-sm text-foreground/80 hover:text-brand active:text-brand",
          active && "text-brand",
        ),
  );
}

export function Header() {
  const pathname = usePathname();
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) setMobileSectorsOpen(false);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b font-normal transition-all duration-500",
        isHome
          ? "border-white/20 bg-white/15 text-cream"
          : "border-border/40 bg-background/85 text-foreground shadow-sm backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group shrink-0" aria-label={`${siteConfig.name} — home`}>
          <img src={brandMedia.logo} alt={siteConfig.name} className="h-10 w-auto sm:h-12" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            const isSectors = link.href === "/sectors";

            if (isSectors && "hasDropdown" in link && link.hasDropdown) {
              return (
                <div key={link.href} className="group relative">
                  <Link href={link.href} className={navLinkClasses(isHome, active)}>
                    {getNavLabel(link.href, t)}
                    <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute left-1/2 top-full z-50 hidden w-72 -translate-x-1/2 pt-2 group-hover:block">
                    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
                      <div className="max-h-[70vh] overflow-y-auto py-2">
                        {navSectorLinks.map((sector) => (
                          <HashLink
                            key={sector.href}
                            href={sector.href}
                            className="block px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-brand/10 hover:text-brand"
                          >
                            {getSectorLabel(sector.id, t)}
                          </HashLink>
                        ))}
                        <Link
                          href="/sectors"
                          className="mt-1 block border-t border-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand"
                        >
                          {t.nav.viewAllSectors}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link key={link.href} href={link.href} className={navLinkClasses(isHome, active)}>
                {getNavLabel(link.href, t)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-current transition-colors hover:text-brand"
            aria-label="Search the site"
          >
            <Search className="h-4 w-4" />
          </button>
          <LanguageSwitcher isHome={isHome} />
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-foreground font-semibold uppercase tracking-[0.15em] text-cream transition-all duration-500 hover:bg-brand",
              isHome ? "px-6 py-3 text-[11px]" : "px-5 py-2.5 text-[11px]",
            )}
          >
            {t.nav.requestQuote}
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-current xl:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          className={cn(
            "border-t px-4 py-6 xl:hidden",
            isHome
              ? "border-white/20 bg-black/80 text-cream backdrop-blur-md"
              : "border-black/10 bg-white text-foreground",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <LanguageSwitcher isHome={isHome} />
          </div>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              const isSectors = link.href === "/sectors";

              if (isSectors && "hasDropdown" in link && link.hasDropdown) {
                return (
                  <div key={link.href}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-3 font-medium tracking-wide",
                        isHome
                          ? "text-[15px] text-cream/90 hover:bg-white/10 hover:text-white"
                          : cn(
                              "text-sm text-foreground/80 hover:bg-brand/10 hover:text-brand",
                              active && "text-brand",
                            ),
                      )}
                      onClick={() => setMobileSectorsOpen((open) => !open)}
                      aria-expanded={mobileSectorsOpen}
                    >
                      {getNavLabel(link.href, t)}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 opacity-70 transition-transform",
                          mobileSectorsOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {mobileSectorsOpen ? (
                      <div className="ml-3 mt-1 space-y-1 border-l border-current/15 pl-3">
                        <Link
                          href="/sectors"
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm font-medium",
                            isHome
                              ? "text-cream/90 hover:bg-white/10 hover:text-white"
                              : "text-foreground/80 hover:bg-brand/10 hover:text-brand",
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          {t.nav.allSectors}
                        </Link>
                        {navSectorLinks.map((sector) => (
                          <HashLink
                            key={sector.href}
                            href={sector.href}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-sm",
                              isHome
                                ? "text-cream/80 hover:bg-white/10 hover:text-white"
                                : "text-foreground/70 hover:bg-brand/10 hover:text-brand",
                            )}
                            onClick={() => setMobileOpen(false)}
                          >
                            {getSectorLabel(sector.id, t)}
                          </HashLink>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-3 font-medium tracking-wide",
                    isHome
                      ? "text-[15px] text-cream/90 hover:bg-white/10 hover:text-white"
                      : cn(
                          "text-sm text-foreground/80 hover:bg-brand/10 hover:text-brand",
                          active && "text-brand",
                        ),
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {getNavLabel(link.href, t)}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-4 rounded-full bg-foreground px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-cream transition hover:bg-brand"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.requestQuote}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
