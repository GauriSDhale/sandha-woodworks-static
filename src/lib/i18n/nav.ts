import type { TFunction } from "i18next";

const navHrefKeys: Record<string, string> = {
  "/about-us": "nav.about",
  "/services": "nav.services",
  "/sectors": "nav.sectors",
  "/portfolio": "nav.portfolio",
  "/store": "nav.store",
  "/linkedin": "nav.insight",
  "/careers": "nav.careers",
  "/contact": "nav.contact",
};

export function getNavLabel(href: string, t: TFunction<"common">) {
  const key = navHrefKeys[href];
  return key ? t(key) : href;
}

export function getSectorLabel(sectorId: string, t: TFunction<"common">) {
  return t(`sectors.${sectorId}`, { defaultValue: sectorId });
}
