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

const socialIconPaths: Record<string, string> = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z",
  Facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  YouTube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  X: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  Pinterest:
    "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.361-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z",
  Reddit:
    "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.75.779 1.75 1.75 0 .482-.196.918-.513 1.235.663 1.154.97 2.49.97 3.834 0 3.37-3.887 6.093-8.688 6.093-4.801 0-8.688-2.723-8.688-6.093 0-1.344.307-2.68.97-3.834a1.744 1.744 0 0 1-.513-1.235c0-.971.782-1.75 1.75-1.75.477 0 .899.182 1.207.491 1.194-.856 2.85-1.418 4.674-1.488l-.8-3.747-2.597.547a1.25 1.25 0 0 1-2.498-.056 1.25 1.25 0 0 1 1.25-1.249c.202 0 .388.048.556.136l3.35.706c.145.03.29.046.435.046zM9.015 14.25c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75zm5.97 0c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75z",
};

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#111111] text-cream">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <Link href="/" className="inline-block" aria-label={`${siteConfig.name} — home`}>
              <img
                src={brandMedia.logo}
                alt={siteConfig.name}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-cream/70">
              {t.footer.description}
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-cream/50">
              {siteConfig.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
                {t.footer.followUs}
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
              {t.footer.company}
            </h3>
            <ul className="space-y-3 text-sm">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/85 transition-colors hover:text-cream">
                    {t.footer[companyLinkLabels[link.href]]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
              {t.footer.explore}
            </h3>
            <ul className="space-y-3 text-sm">
              {footerExploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/85 transition-colors hover:text-cream">
                    {t.footer[exploreLinkLabels[link.href]]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/75 transition-colors hover:text-cream">
                    {t.footer[legalLinkLabels[link.href]]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-cream/15 pt-10 md:grid-cols-3">
          <div className="text-sm text-cream/75">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cream/50">{t.footer.visit}</p>
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.line2}
          </div>
          <div className="text-sm text-cream/75">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cream/50">
              {t.footer.contactLabel}
            </p>
            <a href={siteConfig.phoneHref} className="block hover:text-cream">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="block hover:text-cream">
              {siteConfig.email}
            </a>
          </div>
          <div className="text-sm text-cream/75">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cream/50">{t.footer.hours}</p>
            {t.footer.hoursValue}
            <br />
            {t.footer.hoursTime}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 text-xs text-cream/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.legalName} {t.footer.rights}</p>
          <p className="uppercase tracking-[0.25em]">{siteConfig.certificationsFooter}</p>
        </div>
      </div>
    </footer>
  );
}
