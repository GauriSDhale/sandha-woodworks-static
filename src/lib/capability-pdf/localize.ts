import type { TFunction } from "i18next";
import type { SubSectorStatementMeta } from "@/lib/constants/sub-sector-statements";

export type StatementCopy = {
  name: string;
  tagline: string;
  messaging: string;
  intro: string[];
  capabilities: string[];
  products: string[];
  manufacturingFocus: string[];
  qualityStandards: string[];
  installationNotes: string[];
  audience: string[];
  clientNote: string;
};

export type LocalizedStatement = SubSectorStatementMeta & StatementCopy;

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function asFlowSteps(value: unknown): { n: string; t: string; d: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v) => v && typeof v === "object")
    .map((v) => {
      const row = v as Record<string, unknown>;
      return {
        n: typeof row.n === "string" ? row.n : "",
        t: typeof row.t === "string" ? row.t : "",
        d: typeof row.d === "string" ? row.d : "",
      };
    })
    .filter((row) => row.n && row.t);
}

function asCloseOutItems(value: unknown): { t: string; d: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v) => v && typeof v === "object")
    .map((v) => {
      const row = v as Record<string, unknown>;
      return {
        t: typeof row.t === "string" ? row.t : "",
        d: typeof row.d === "string" ? row.d : "",
      };
    })
    .filter((row) => row.t);
}

function interpolate(template: string, vars: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");
}

export function getLocalizedStatement(
  meta: SubSectorStatementMeta,
  tDetails: TFunction<"capabilityPdfDetails">,
): LocalizedStatement {
  const block = tDetails(meta.slug, { returnObjects: true }) as Partial<StatementCopy> | string;

  if (!block || typeof block === "string") {
    return {
      ...meta,
      name: meta.slug,
      tagline: "",
      messaging: "",
      intro: [],
      capabilities: [],
      products: [],
      manufacturingFocus: [],
      qualityStandards: [],
      installationNotes: [],
      audience: [],
      clientNote: "",
    };
  }

  return {
    ...meta,
    name: typeof block.name === "string" ? block.name : meta.slug,
    tagline: typeof block.tagline === "string" ? block.tagline : "",
    messaging: typeof block.messaging === "string" ? block.messaging : "",
    intro: asStringArray(block.intro),
    capabilities: asStringArray(block.capabilities),
    products: asStringArray(block.products),
    manufacturingFocus: asStringArray(block.manufacturingFocus),
    qualityStandards: asStringArray(block.qualityStandards),
    installationNotes: asStringArray(block.installationNotes),
    audience: asStringArray(block.audience),
    clientNote: typeof block.clientNote === "string" ? block.clientNote : "",
  };
}

export type PdfUiCopy = {
  documentTitle: string;
  footerBrand: string;
  coverMeta: string;
  sections: Record<string, string>;
  eyebrows: Record<string, string>;
  headlines: Record<string, string>;
  underOneRoofTitle: string;
  processNote: string;
  serviceLine: string;
  contactLabels: Record<string, string>;
  whatWeWillDoBody: string[];
  whatWeWillDoPanel: string[];
  underOneRoof: string[];
  atAGlance: string[];
  companyCommitments: string;
  projectFlow: { n: string; t: string; d: string }[];
  closeOutItems: { t: string; d: string }[];
};

export function getPdfUiCopy(t: TFunction<"capabilityPdf">, name: string): PdfUiCopy {
  const nameLower = name.toLowerCase();

  const sections = (t("document.sections", { returnObjects: true }) || {}) as Record<string, string>;
  const eyebrowsRaw = (t("document.eyebrows", { returnObjects: true }) || {}) as Record<string, string>;
  const headlinesRaw = (t("document.headlines", { returnObjects: true }) || {}) as Record<
    string,
    string
  >;
  const contactLabels = (t("document.contactLabels", { returnObjects: true }) || {}) as Record<
    string,
    string
  >;

  return {
    documentTitle: interpolate(t("document.title"), { name }),
    footerBrand: t("document.footerBrand"),
    coverMeta: t("document.coverMeta"),
    sections,
    eyebrows: {
      ...eyebrowsRaw,
      capabilities: interpolate(eyebrowsRaw.capabilities ?? "", { name }),
    },
    headlines: {
      intro: interpolate(headlinesRaw.intro ?? "", { name }),
      capabilities: headlinesRaw.capabilities ?? "",
      products: interpolate(headlinesRaw.products ?? "", { name: nameLower }),
      manufacturing: interpolate(headlinesRaw.manufacturing ?? "", { name: nameLower }),
      standards: headlinesRaw.standards ?? "",
      installation: headlinesRaw.installation ?? "",
      selectedWork: headlinesRaw.selectedWork ?? "",
      audience: interpolate(headlinesRaw.audience ?? "", { name: nameLower }),
      about: headlinesRaw.about ?? "",
      whatWeWillDo: headlinesRaw.whatWeWillDo ?? "",
      process: headlinesRaw.process ?? "",
      closeOut: headlinesRaw.closeOut ?? "",
      contact: interpolate(headlinesRaw.contact ?? "", { name: nameLower }),
    },
    underOneRoofTitle: t("document.underOneRoofTitle"),
    processNote: t("document.processNote"),
    serviceLine: t("document.serviceLine"),
    contactLabels,
    whatWeWillDoBody: asStringArray(t("document.whatWeWillDoBody", { returnObjects: true })).map(
      (p) => interpolate(p, { name: nameLower }),
    ),
    whatWeWillDoPanel: asStringArray(t("document.whatWeWillDoPanel", { returnObjects: true })),
    underOneRoof: asStringArray(t("shared.underOneRoof", { returnObjects: true })),
    atAGlance: asStringArray(t("shared.atAGlance", { returnObjects: true })),
    companyCommitments: t("shared.companyCommitments"),
    projectFlow: asFlowSteps(t("shared.projectFlow", { returnObjects: true })),
    closeOutItems: asCloseOutItems(t("shared.closeOutItems", { returnObjects: true })),
  };
}
