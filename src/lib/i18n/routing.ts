import { supportedLngs, type AppLanguage } from "@/lib/i18n/config";

export const FR_PREFIX = "/fr";

export function isAppLanguage(value: string): value is AppLanguage {
  return (supportedLngs as readonly string[]).includes(value);
}

/** Locale encoded in the URL. EN stays unprefixed; FR uses `/fr/...`. */
export function localeFromPathname(pathname: string | null | undefined): AppLanguage {
  if (!pathname) return "en";
  if (pathname === FR_PREFIX || pathname.startsWith(`${FR_PREFIX}/`)) return "fr";
  return "en";
}

/** Strip the `/fr` prefix so callers can work with the shared path space. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === FR_PREFIX) return "/";
  if (pathname.startsWith(`${FR_PREFIX}/`)) {
    const stripped = pathname.slice(FR_PREFIX.length);
    return stripped.length > 0 ? stripped : "/";
  }
  return pathname;
}

/**
 * Prefix an internal path for the active locale.
 * Leaves absolute/external URLs, hash-only, and mailto/tel alone.
 */
export function localizeHref(href: string, locale: AppLanguage): string {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  const path = match?.[1] ?? href;
  const suffix = `${match?.[2] ?? ""}${match?.[3] ?? ""}`;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const bare = stripLocalePrefix(normalized);

  if (locale === "fr") {
    const frPath = bare === "/" ? FR_PREFIX : `${FR_PREFIX}${bare}`;
    return `${frPath}${suffix}`;
  }

  return `${bare}${suffix}`;
}

/** Switch the current path to the other locale (same page). */
export function swapLocalePath(pathname: string, nextLocale: AppLanguage): string {
  const bare = stripLocalePrefix(pathname);
  return localizeHref(bare, nextLocale);
}
