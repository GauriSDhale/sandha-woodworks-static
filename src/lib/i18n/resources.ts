import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import enAbout from "@/locales/en/about.json";
import enContact from "@/locales/en/contact.json";
import enServices from "@/locales/en/services.json";
import enServiceDetails from "@/locales/en/serviceDetails.json";
import enSectors from "@/locales/en/sectors.json";
import enSectorDetails from "@/locales/en/sectorDetails.json";
import enPortfolio from "@/locales/en/portfolio.json";
import enCareers from "@/locales/en/careers.json";
import enInsight from "@/locales/en/insight.json";
import enLegal from "@/locales/en/legal.json";
import enStore from "@/locales/en/store.json";
import enStoreCatalog from "@/locales/en/storeCatalog.json";
import enCapabilityPdf from "@/locales/en/capabilityPdf.json";
import enCapabilityPdfDetails from "@/locales/en/capabilityPdfDetails.json";
import frCommon from "@/locales/fr/common.json";
import frHome from "@/locales/fr/home.json";
import frAbout from "@/locales/fr/about.json";
import frContact from "@/locales/fr/contact.json";
import frServices from "@/locales/fr/services.json";
import frServiceDetails from "@/locales/fr/serviceDetails.json";
import frSectors from "@/locales/fr/sectors.json";
import frSectorDetails from "@/locales/fr/sectorDetails.json";
import frPortfolio from "@/locales/fr/portfolio.json";
import frCareers from "@/locales/fr/careers.json";
import frInsight from "@/locales/fr/insight.json";
import frLegal from "@/locales/fr/legal.json";
import frStore from "@/locales/fr/store.json";
import frStoreCatalog from "@/locales/fr/storeCatalog.json";
import frCapabilityPdf from "@/locales/fr/capabilityPdf.json";
import frCapabilityPdfDetails from "@/locales/fr/capabilityPdfDetails.json";

/** Locale dictionaries only — safe to import from server metadata (no react-i18next). */
export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    contact: enContact,
    services: enServices,
    serviceDetails: enServiceDetails,
    sectors: enSectors,
    sectorDetails: enSectorDetails,
    portfolio: enPortfolio,
    careers: enCareers,
    insight: enInsight,
    legal: enLegal,
    store: enStore,
    storeCatalog: enStoreCatalog,
    capabilityPdf: enCapabilityPdf,
    capabilityPdfDetails: enCapabilityPdfDetails,
  },
  fr: {
    common: frCommon,
    home: frHome,
    about: frAbout,
    contact: frContact,
    services: frServices,
    serviceDetails: frServiceDetails,
    sectors: frSectors,
    sectorDetails: frSectorDetails,
    portfolio: frPortfolio,
    careers: frCareers,
    insight: frInsight,
    legal: frLegal,
    store: frStore,
    storeCatalog: frStoreCatalog,
    capabilityPdf: frCapabilityPdf,
    capabilityPdfDetails: frCapabilityPdfDetails,
  },
} as const;
