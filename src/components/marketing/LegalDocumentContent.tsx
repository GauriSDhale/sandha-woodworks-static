"use client";

import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/marketing/PageSections";

export function LegalDocumentContent({ slug }: { slug: string }) {
  const { t } = useTranslation("legal");
  const title = t(`docs.${slug}.title`, {
    defaultValue: slug.replace(/-/g, " "),
  });

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={title} />
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-muted-foreground">
          <p>{t("placeholder")}</p>
        </div>
      </section>
    </>
  );
}
