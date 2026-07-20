"use client";

import { useTranslation } from "react-i18next";
import {
  getLegalDocumentMeta,
  legalDocumentMeta,
  type LegalDocument,
  type LegalDocumentCopy,
} from "@/lib/constants/legal-documents";

function isDocumentCopy(value: unknown): value is LegalDocumentCopy {
  if (!value || typeof value !== "object") return false;
  const doc = value as LegalDocumentCopy;
  return (
    typeof doc.title === "string" &&
    typeof doc.shortLabel === "string" &&
    typeof doc.description === "string" &&
    typeof doc.introduction === "string" &&
    Array.isArray(doc.sections)
  );
}

export function useLegalDocuments(): LegalDocument[] {
  const { t } = useTranslation("legal");

  return legalDocumentMeta.map((meta) => {
    const copy = t(`documents.${meta.slug}`, { returnObjects: true });
    if (!isDocumentCopy(copy)) {
      return {
        ...meta,
        title: meta.slug,
        shortLabel: meta.slug,
        description: "",
        introduction: "",
        sections: [],
      };
    }
    return { ...meta, ...copy };
  });
}

export function useLegalDocument(slug: string): LegalDocument | undefined {
  const { t } = useTranslation("legal");
  const meta = getLegalDocumentMeta(slug);
  if (!meta) return undefined;

  const copy = t(`documents.${meta.slug}`, { returnObjects: true });
  if (!isDocumentCopy(copy)) return undefined;
  return { ...meta, ...copy };
}

export function useLegalDisclaimer(): string {
  const { t } = useTranslation("legal");
  return t("disclaimer");
}

export type { LegalDocument };
