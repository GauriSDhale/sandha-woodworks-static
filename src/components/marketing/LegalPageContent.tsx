"use client";

import Link from "@/components/i18n/Link";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/marketing/PageSections";
import { footerLegalLinks } from "@/lib/constants/site";

/** Same href → common.footer key map used by Footer. */
const legalLinkLabels: Record<string, string> = {
  "/legal": "legalCentre",
  "/legal/general-terms": "generalTerms",
  "/legal/canada-terms": "canadaTerms",
  "/legal/usa-terms": "usaTerms",
  "/legal/code-of-conduct": "codeOfConduct",
  "/legal/privacy": "privacy",
  "/legal/accessibility": "accessibility",
  "/legal/website-terms": "websiteTerms",
};

export function LegalPageContent() {
  const { t } = useTranslation("legal");
  const { t: tc } = useTranslation("common");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          {footerLegalLinks.map((link) => {
            const key = legalLinkLabels[link.href];
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-2xl border border-border px-6 py-4 font-medium transition hover:border-black"
              >
                {key ? tc(`footer.${key}`) : link.label}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
