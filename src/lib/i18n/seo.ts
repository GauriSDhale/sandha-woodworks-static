import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants/site";
import type { AppLanguage } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";
import { localizeHref } from "@/lib/i18n/routing";

type MetaFields = { title: string; description: string };

/**
 * Build page metadata with locale-aware title/description, canonical, and hreflang.
 * EN URLs stay unprefixed; FR lives under `/fr/...`.
 *
 * Remaining client-only limit: in-page body copy still hydrates via react-i18next.
 * Crawlers get correct lang + meta + alternates on each locale HTML document.
 */
export function buildPageMetadata(options: {
  locale: AppLanguage;
  /** Shared path without `/fr` prefix, e.g. `/about-us` or `/`. */
  path: string;
  title: string;
  description?: string;
  robots?: Metadata["robots"];
  /** When true, skip the layout title template (for titles that already include the brand). */
  absoluteTitle?: boolean;
}): Metadata {
  const { locale, path, title, description, robots, absoluteTitle } = options;
  const bare = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const canonical = localizeHref(bare, locale);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    robots,
    alternates: {
      canonical,
      languages: {
        en: localizeHref(bare, "en"),
        fr: localizeHref(bare, "fr"),
        "x-default": localizeHref(bare, "en"),
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? ["en_CA"] : ["fr_CA"],
      url: canonical,
    },
  };
}

export function namespacePageMetadata(
  locale: AppLanguage,
  path: string,
  namespace: keyof (typeof resources)["en"],
): Metadata {
  const bag = resources[locale][namespace] as { meta?: MetaFields };
  const meta = bag.meta;
  if (!meta?.title) {
    return buildPageMetadata({ locale, path, title: siteConfig.name });
  }
  return buildPageMetadata({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    // Home (and similar) meta titles already include the brand name.
    absoluteTitle: path === "/" || namespace === "home",
  });
}
