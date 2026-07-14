import { siteConfig } from "@/lib/constants/site";

/** Contact constants only — prose lives in capabilityPdf locales. */
export const pdfContact = {
  phone: siteConfig.phone,
  quote: siteConfig.estimatingEmail,
  general: siteConfig.email,
  address: siteConfig.address.full,
  web: "sandhawoodworks.ca",
  webUrl: siteConfig.url,
  linkedin: "linkedin.com/company/sandha-woodworks-service-ltd",
} as const;
