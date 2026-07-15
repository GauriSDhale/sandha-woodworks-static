"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { localeFromPathname, localizeHref } from "@/lib/i18n/routing";

type LinkProps = ComponentProps<typeof NextLink>;

/**
 * Locale-aware Link: keeps users on `/fr/...` when browsing the French tree.
 */
export function Link({ href, ...props }: LinkProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  let nextHref = href;
  if (typeof href === "string") {
    nextHref = localizeHref(href, locale);
  } else if (href && typeof href === "object" && "pathname" in href && href.pathname) {
    nextHref = { ...href, pathname: localizeHref(href.pathname, locale) };
  }

  return <NextLink href={nextHref} {...props} />;
}

export default Link;
