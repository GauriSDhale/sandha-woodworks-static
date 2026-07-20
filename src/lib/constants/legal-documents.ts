/** Legal document metadata. Copy lives in `src/locales/{en,fr}/legal.json`. */
export type LegalCategory = "Terms" | "Ethics" | "Website";

export type LegalDocIcon =
  | "FileText"
  | "Leaf"
  | "Flag"
  | "ShieldCheck"
  | "Lock"
  | "Accessibility"
  | "Globe";

export type LegalSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type LegalDocumentCopy = {
  title: string;
  shortLabel: string;
  description: string;
  introduction: string;
  sections: LegalSection[];
};

export type LegalDocumentMeta = {
  slug: string;
  icon: LegalDocIcon;
  category: LegalCategory;
  version: string;
  updated: string;
};

export type LegalDocument = LegalDocumentMeta & LegalDocumentCopy;

export const LEGAL_VERSION = "2.0";
export const LEGAL_UPDATED = "January 2026";

export const legalDocumentMeta: LegalDocumentMeta[] = [
  {
    slug: "general-terms-and-conditions",
    icon: "FileText",
    category: "Terms",
    version: LEGAL_VERSION,
    updated: LEGAL_UPDATED,
  },
  {
    slug: "canada-terms-and-conditions",
    icon: "Leaf",
    category: "Terms",
    version: LEGAL_VERSION,
    updated: LEGAL_UPDATED,
  },
  {
    slug: "usa-terms-and-conditions",
    icon: "Flag",
    category: "Terms",
    version: LEGAL_VERSION,
    updated: LEGAL_UPDATED,
  },
  {
    slug: "code-of-conduct",
    icon: "ShieldCheck",
    category: "Ethics",
    version: LEGAL_VERSION,
    updated: LEGAL_UPDATED,
  },
  {
    slug: "privacy-policy",
    icon: "Lock",
    category: "Website",
    version: LEGAL_VERSION,
    updated: LEGAL_UPDATED,
  },
  {
    slug: "accessibility-statement",
    icon: "Accessibility",
    category: "Ethics",
    version: LEGAL_VERSION,
    updated: LEGAL_UPDATED,
  },
  {
    slug: "website-terms-of-use",
    icon: "Globe",
    category: "Website",
    version: LEGAL_VERSION,
    updated: LEGAL_UPDATED,
  },
];

/** @deprecated Prefer legalDocumentMeta — kept as alias for clarity in imports. */
export const legalDocuments = legalDocumentMeta;

export const legalSlugAliases: Record<string, string> = {
  "general-terms": "general-terms-and-conditions",
  "canada-terms": "canada-terms-and-conditions",
  "usa-terms": "usa-terms-and-conditions",
  privacy: "privacy-policy",
  accessibility: "accessibility-statement",
  "website-terms": "website-terms-of-use",
};

export function resolveLegalSlug(slug: string): string {
  return legalSlugAliases[slug] ?? slug;
}

export function getLegalDocumentMeta(slug: string): LegalDocumentMeta | undefined {
  const resolved = resolveLegalSlug(slug);
  return legalDocumentMeta.find((doc) => doc.slug === resolved);
}

/** @deprecated Use getLegalDocumentMeta + locale copy. */
export function getLegalDocument(slug: string): LegalDocumentMeta | undefined {
  return getLegalDocumentMeta(slug);
}
