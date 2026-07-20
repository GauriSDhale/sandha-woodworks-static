"use client";

import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  FileText,
  Flag,
  Globe,
  Leaf,
  Lock,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  type LegalDocument,
  type LegalDocIcon,
} from "@/lib/constants/legal-documents";
import { useLegalDocuments } from "@/lib/hooks/useLegalDocuments";
import { cn } from "@/lib/utils";

const iconMap: Record<LegalDocIcon, LucideIcon> = {
  FileText,
  Leaf,
  Flag,
  ShieldCheck,
  Lock,
  Accessibility,
  Globe,
};

const categoryOrder: LegalDocument["category"][] = ["Terms", "Ethics", "Website"];

export function LegalPageContent() {
  const { t } = useTranslation("legal");
  const documents = useLegalDocuments();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-warm-black text-cream">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 0%, rgba(201,162,39,0.45), transparent 55%), radial-gradient(ellipse at 90% 40%, rgba(255,255,255,0.08), transparent 40%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
          <p className="type-eyebrow text-brand">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {t("hero.title")}
          </h1>
          <div className="mt-6 h-[3px] w-14 bg-brand" aria-hidden="true" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {t("hero.description")}
          </p>
        </div>
      </section>

      <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="type-eyebrow text-muted-foreground">
            {t("browseLabel")}
          </p>

          <div className="mt-10 space-y-14">
            {categoryOrder.map((category) => {
              const docs = documents.filter((doc) => doc.category === category);
              if (!docs.length) return null;

              return (
                <div key={category}>
                  <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {t(`categories.${category}`)}
                    </h2>
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {t(`categoryIntros.${category}`)}
                    </p>
                  </div>

                  <ul className="mt-6 divide-y divide-border">
                    {docs.map((doc) => {
                      const Icon = iconMap[doc.icon];
                      return (
                        <li key={doc.slug}>
                          <Link
                            href={`/legal/${doc.slug}`}
                            className="group flex flex-col gap-4 py-6 transition-colors sm:flex-row sm:items-start sm:gap-6"
                          >
                            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
                              <Icon className="size-5" aria-hidden="true" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-xl">
                                  {doc.shortLabel}
                                </h3>
                                <span className="type-eyebrow text-muted-foreground">
                                  {t("versionLabel", { version: doc.version })}
                                </span>
                              </div>
                              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                {doc.description}
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-2 self-start text-sm font-semibold text-foreground/70 transition-colors group-hover:text-brand sm:mt-1">
                              {t("readDocument")}
                              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalDocNav({
  activeSlug,
  className,
}: {
  activeSlug?: string;
  className?: string;
}) {
  const { t } = useTranslation("legal");
  const documents = useLegalDocuments();

  return (
    <nav
      aria-label={t("navAria")}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {documents.map((doc) => {
        const active = doc.slug === activeSlug;
        return (
          <Link
            key={doc.slug}
            href={`/legal/${doc.slug}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground/75 hover:border-foreground/50 hover:text-foreground",
            )}
          >
            {doc.shortLabel}
          </Link>
        );
      })}
    </nav>
  );
}
