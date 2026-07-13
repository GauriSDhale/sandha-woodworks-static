"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navSectorLinks } from "@/lib/constants/sectors";
import { navLinks, siteConfig } from "@/lib/constants/site";
import { brandMedia } from "@/lib/constants/media";
import { HashLink } from "@/components/ui/HashLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { SiteSearch, useSiteSearchHotkey } from "@/components/layout/SiteSearch";
import { getNavLabel, getSectorLabel } from "@/lib/i18n/nav";
import { translations } from "@/lib/i18n/translations";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const navLinkBase =
  "relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-base font-semibold tracking-wide transition-colors duration-200 ease-out hover:bg-brand/10 active:scale-[0.98] active:bg-brand/25";

function navLinkClasses(lightOnDark: boolean, active: boolean) {
  return cn(
    navLinkBase,
    lightOnDark
      ? "text-white/90 hover:text-white active:text-white"
      : cn("text-foreground/80 hover:text-brand active:text-brand", active && "text-brand"),
  );
}

/** Keep CTA width stable across EN/FR so the quote button doesn't jump. */
function StableCtaLabel({ label }: { label: string }) {
  const en = translations.en.nav.requestQuote;
  const fr = translations.fr.nav.requestQuote;
  const wider = fr.length >= en.length ? fr : en;

  return (
    <span className="inline-grid justify-items-center">
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {wider}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap">{label}</span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  /** Transparent header over hero video — only at top of homepage */
  const lightOnDark = isHome && !scrolled;

  const openSearch = useCallback(() => {
    setMobileOpen(false);
    setSearchOpen(true);
  }, []);

  useSiteSearchHotkey(openSearch);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (!mobileOpen) setMobileSectorsOpen(false);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b font-normal transition-[background-color,border-color,box-shadow,color] duration-300",
        lightOnDark
          ? "border-transparent bg-transparent text-white shadow-none"
          : "border-border/40 bg-white text-foreground shadow-sm",
      )}
    >
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-5 lg:px-6">
        <Link href="/" className="group shrink-0" aria-label={`${siteConfig.name} — home`}>
          <img
            src={brandMedia.logo}
            alt={siteConfig.name}
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-2 xl:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              const isSectors = link.href === "/sectors";

              if (isSectors && "hasDropdown" in link && link.hasDropdown) {
                return (
                  <div key={link.href} className="group relative">
                    <Link href={link.href} className={navLinkClasses(lightOnDark, active)}>
                      <span className="whitespace-nowrap">{getNavLabel(link.href, t)}</span>
                      <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70 transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="absolute right-0 top-full z-50 hidden w-72 pt-2 group-hover:block">
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
                <Link key={link.href} href={link.href} className={navLinkClasses(lightOnDark, active)}>
                  <span className="whitespace-nowrap">{getNavLabel(link.href, t)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <button
              type="button"
              onClick={openSearch}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-current transition-colors hover:text-brand"
              aria-label="Search the site"
            >
              <Search className="h-4 w-4" />
            </button>
            <LanguageSwitcher isHome={lightOnDark} />
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-cream transition-colors duration-300 hover:bg-warm-black"
            >
              <StableCtaLabel label={t.nav.requestQuote} />
            </Link>
          </div>

          <div className="flex items-center gap-1 xl:hidden">
            <button
              type="button"
              onClick={openSearch}
              className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-current"
              aria-label="Search the site"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-current"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div
          className={cn(
            "border-t px-4 py-6 xl:hidden",
            lightOnDark
              ? "border-white/20 bg-black/80 text-cream backdrop-blur-md"
              : "border-black/10 bg-white text-foreground",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <LanguageSwitcher isHome={lightOnDark} />
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
                        "flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-semibold tracking-wide",
                        lightOnDark
                          ? "text-cream/90 hover:bg-white/10 hover:text-white"
                          : cn(
                              "text-foreground/80 hover:bg-brand/10 hover:text-brand",
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
                            lightOnDark
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
                              lightOnDark
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
                    "rounded-lg px-3 py-3 text-base font-semibold tracking-wide",
                    lightOnDark
                      ? "text-cream/90 hover:bg-white/10 hover:text-white"
                      : cn(
                          "text-foreground/80 hover:bg-brand/10 hover:text-brand",
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
              className="mt-4 rounded-full bg-foreground px-5 py-3 text-center text-sm font-semibold text-cream transition-colors hover:bg-warm-black"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.requestQuote}
            </Link>
          </nav>
        </div>
      ) : null}

      <SiteSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
