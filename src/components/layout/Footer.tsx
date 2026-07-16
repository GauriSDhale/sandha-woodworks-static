"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  footerCompanyLinks,
  footerExploreLinks,
  footerLegalLinks,
  siteConfig,
  socialLinks,
} from "@/lib/constants/site";
import { brandMedia } from "@/lib/constants/media";
import { socialIconPaths } from "@/lib/constants/socialIcons";

const companyLinkLabels: Record<string, string> = {
  "/about-us": "about",
  "/careers": "careers",
  "/contact": "contact",
};

/** Full i18n keys so explore links always resolve under footer.* */
const exploreLinkKeys: Record<string, string> = {
  "/services": "footer.services",
  "/sectors": "footer.sectors",
  "/portfolio": "footer.portfolio",
  "/store": "footer.store",
};

const legalLinkLabels: Record<string, string> = {
  "/legal": "legalCentre",
  "/legal/general-terms-and-conditions": "generalTerms",
  "/legal/canada-terms-and-conditions": "canadaTerms",
  "/legal/usa-terms-and-conditions": "usaTerms",
  "/legal/code-of-conduct": "codeOfConduct",
  "/legal/privacy-policy": "privacy",
  "/legal/accessibility-statement": "accessibility",
  "/legal/website-terms-of-use": "websiteTerms",
};

export function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-[#111111] text-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <Link href="/" className="inline-block" aria-label={`${siteConfig.name} — home`}>
              <img
                src={brandMedia.logo}
                alt={siteConfig.name}
                className="h-16 w-auto sm:h-20 brightness-0 invert"
              />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-cream/70">
              {t("footer.description")}
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-cream/50">
              {t("footer.taglineAlt")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
                {t("footer.followUs")}
              </span>
              {socialLinks.slice(0, 7).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in new tab)`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path d={socialIconPaths[social.label] ?? socialIconPaths.LinkedIn} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
              {t("footer.company")}
            </h3>
            <ul className="space-y-3 text-sm">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/85 transition-colors hover:text-cream">
                    {t(`footer.${companyLinkLabels[link.href]}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
              {t("footer.explore")}
            </h3>
            <ul className="space-y-3 text-sm">
              {footerExploreLinks.map((link) => {
                const translationKey = exploreLinkKeys[link.href];
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/85 transition-colors hover:text-cream"
                    >
                      {translationKey ? t(translationKey) : link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/75 transition-colors hover:text-cream">
                    {t(`footer.${legalLinkLabels[link.href]}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-cream/15 pt-10 md:grid-cols-3">
          <div className="text-sm text-cream/75">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cream/50">{t("footer.visit")}</p>
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.line2}
          </div>
          <div className="text-sm text-cream/75">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cream/50">
              {t("footer.contactLabel")}
            </p>
            <a href={siteConfig.phoneHref} className="block hover:text-cream">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="block hover:text-cream">
              {siteConfig.email}
            </a>
          </div>
          <div className="text-sm text-cream/75">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cream/50">{t("footer.hours")}</p>
            {t("footer.hoursValue")}
            <br />
            {t("footer.hoursTime")}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 text-xs text-cream/55 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName} {t("footer.rights")}
          </p>
          <p className="uppercase tracking-[0.25em]">{siteConfig.certificationsFooter}</p>
        </div>
      </div>
    </footer>
  );
}
