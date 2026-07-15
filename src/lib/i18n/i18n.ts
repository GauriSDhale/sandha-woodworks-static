import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultNS, supportedLngs } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";

export {
  LANG_STORAGE_KEY,
  supportedLngs,
  defaultNS,
  type AppLanguage,
} from "@/lib/i18n/config";
export { resources } from "@/lib/i18n/resources";

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    supportedLngs: [...supportedLngs],
    defaultNS,
    ns: [
      "common",
      "home",
      "about",
      "contact",
      "services",
      "serviceDetails",
      "sectors",
      "sectorDetails",
      "portfolio",
      "careers",
      "insight",
      "legal",
      "store",
      "storeCatalog",
      "capabilityPdf",
      "capabilityPdfDetails",
    ],
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
    react: {
      useSuspense: false,
    },
  });
}

export function syncDocumentLanguage(lang: string) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
}

export default i18n;
