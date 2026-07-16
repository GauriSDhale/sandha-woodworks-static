"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LegalDocNav } from "@/components/marketing/LegalPageContent";
import type { LegalDocument, LegalSection } from "@/lib/constants/legal-documents";
import {
  useLegalDisclaimer,
  useLegalDocument,
} from "@/lib/hooks/useLegalDocuments";
import { siteConfig } from "@/lib/constants/site";

function LegalSectionBlock({ section }: { section: LegalSection }) {
  return (
    <section className="scroll-mt-28">
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {section.heading}
      </h3>
      {section.body ? (
        <p className="mt-3 text-base leading-relaxed text-foreground/85 md:text-lg">
          {section.body}
        </p>
      ) : null}
      {section.bullets?.length ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/85 marker:text-brand md:text-lg">
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function LegalDocumentArticle({ doc }: { doc: LegalDocument }) {
  const { t } = useTranslation("legal");
  const disclaimer = useLegalDisclaimer();

  return (
    <article className="mx-auto max-w-4xl">
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {t(`categories.${doc.category}`)}
        </p>
        <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {doc.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span>{t("versionLabel", { version: doc.version })}</span>
          <span>{t("updatedLabel", { date: t("updatedDate") })}</span>
          <span>{t("issuedBy")}</span>
        </div>
      </header>

      <div className="mt-10 space-y-10">
        <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
          {doc.introduction}
        </p>

        {doc.sections.map((section) => (
          <LegalSectionBlock key={section.heading} section={section} />
        ))}
      </div>

      <aside className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
          {t("importantNotice")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {disclaimer}
        </p>
      </aside>

      <footer className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          {t("contactPrompt")}{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>
        <p className="text-xs uppercase tracking-[0.2em]">{t("footerAddress")}</p>
      </footer>
    </article>
  );
}

export function LegalDocumentContent({ slug }: { slug: string }) {
  const { t } = useTranslation("legal");
  const doc = useLegalDocument(slug);

  if (!doc) {
    return (
      <section className="px-4 py-24 text-center sm:px-6 lg:px-8">
        <Link href="/legal" className="inline-flex text-brand underline-offset-4 hover:underline">
          {t("backToCentre")}
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-background pt-24">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t("backToCentre")}
          </Link>
        </div>
      </section>

      <section
        id="legal-document-nav"
        className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur sm:top-[4.5rem]"
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <LegalDocNav activeSlug={doc.slug} />
        </div>
      </section>

      <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <LegalDocumentArticle doc={doc} />
      </section>
    </>
  );
}
