"use client";

import Link from "next/link";
import {
  footerCompanyLinks,
  footerExploreLinks,
  footerLegalLinks,
  siteConfig,
  socialLinks,
} from "@/lib/constants/site";
import { brandMedia } from "@/lib/constants/media";
import { useLang } from "@/lib/i18n/LanguageProvider";

const companyLinkLabels: Record<string, keyof ReturnType<typeof useLang>["t"]["footer"]> = {
  "/about-us": "about",
  "/careers": "careers",
  "/contact": "contact",
};

const exploreLinkLabels: Record<string, keyof ReturnType<typeof useLang>["t"]["footer"]> = {
  "/services": "services",
  "/sectors": "sectors",
  "/portfolio": "portfolio",
};

const legalLinkLabels: Record<string, keyof ReturnType<typeof useLang>["t"]["footer"]> = {
  "/legal": "legalCentre",
  "/legal/general-terms": "generalTerms",
  "/legal/canada-terms": "canadaTerms",
  "/legal/usa-terms": "usaTerms",
  "/legal/code-of-conduct": "codeOfConduct",
  "/legal/privacy": "privacy",
  "/legal/accessibility": "accessibility",
  "/legal/website-terms": "websiteTerms",
};

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-surface-dark text-surface-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <img src={brandMedia.logo} alt={siteConfig.name} className="h-10 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-surface-cream/65">
              {t.footer.description}
            </p>
            <p className="mt-4 text-sm font-medium text-surface-cream/80">{t.footer.tagline}</p>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-surface-cream/50">
                {t.footer.followUs}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialLinks.slice(0, 4).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-surface-cream/70 transition hover:border-white/25 hover:text-white"
                    aria-label={`${social.label} (opens in new tab)`}
                  >
                    {social.label.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-surface-cream">
              {t.footer.company}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-cream/65 transition hover:text-white"
                  >
                    {t.footer[companyLinkLabels[link.href]]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-surface-cream">
              {t.footer.explore}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerExploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-cream/65 transition hover:text-white"
                  >
                    {t.footer[exploreLinkLabels[link.href]]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-surface-cream">
              {t.footer.legal}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-cream/65 transition hover:text-white"
                  >
                    {t.footer[legalLinkLabels[link.href]]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-surface-cream/50">
              {t.footer.visit}
            </p>
            <address className="mt-3 not-italic text-sm leading-relaxed text-surface-cream/70">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
            </address>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-surface-cream/50">
              {t.footer.contactLabel}
            </p>
            <div className="mt-3 space-y-1 text-sm text-surface-cream/70">
              <a href={siteConfig.phoneHref} className="block transition hover:text-white">
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block transition hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-surface-cream/50">
              {t.footer.hours}
            </p>
            <p className="mt-3 text-sm text-surface-cream/70">
              {t.footer.hoursValue}
              <br />
              {t.footer.hoursTime}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-surface-cream/45 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName} {t.footer.rights}
          </p>
          <p>{siteConfig.certificationsFooter}</p>
        </div>
      </div>
    </footer>
  );
}
