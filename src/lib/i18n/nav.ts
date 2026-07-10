import type { Translations } from "@/lib/i18n/translations";

const navHrefKeys: Record<string, keyof Translations["nav"]> = {
  "/about-us": "about",
  "/services": "services",
  "/sectors": "sectors",
  "/portfolio": "portfolio",
  "/insight": "insight",
  "/careers": "careers",
  "/contact": "contact",
};

export function getNavLabel(href: string, t: Translations) {
  const key = navHrefKeys[href];
  return key ? t.nav[key] : href;
}

export function getSectorLabel(sectorId: string, t: Translations) {
  const key = sectorId as keyof Translations["sectors"];
  return t.sectors[key] ?? sectorId;
}
