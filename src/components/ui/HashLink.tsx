"use client";

import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { localeFromPathname, localizeHref, stripLocalePrefix } from "@/lib/i18n/routing";

type HashLinkProps = ComponentProps<typeof Link>;

function getHrefString(href: HashLinkProps["href"]) {
  if (typeof href === "string") return href;
  if (!href) return "";
  const path = href.pathname ?? "";
  const hash = href.hash ? href.hash.replace(/^#/, "") : "";
  return hash ? `${path}#${hash}` : path;
}

export function HashLink({ href, onClick, ...props }: HashLinkProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const hrefString = getHrefString(href);
    const hashIndex = hrefString.indexOf("#");
    if (hashIndex === -1) return;

    const rawPath = hrefString.slice(0, hashIndex) || pathname;
    const localizedPath = localizeHref(rawPath, locale);
    const hash = hrefString.slice(hashIndex + 1);
    if (
      !hash ||
      stripLocalePrefix(pathname) !== stripLocalePrefix(localizedPath)
    ) {
      return;
    }

    event.preventDefault();
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `${localizedPath}#${hash}`);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
