import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import enAbout from "@/locales/en/about.json";
import enContact from "@/locales/en/contact.json";
import frCommon from "@/locales/fr/common.json";
import frHome from "@/locales/fr/home.json";
import frAbout from "@/locales/fr/about.json";
import frContact from "@/locales/fr/contact.json";

export const LANG_STORAGE_KEY = "sandha-lang";
export const supportedLngs = ["en", "fr"] as const;
export type AppLanguage = (typeof supportedLngs)[number];

export const defaultNS = "common";
export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    contact: enContact,
  },
  fr: {
    common: frCommon,
    home: frHome,
    about: frAbout,
    contact: frContact,
  },
} as const;

function readStoredLanguage(): AppLanguage {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "en" || stored === "fr") return stored;
  } catch {
    // ignore
  }
  return "en";
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    supportedLngs: [...supportedLngs],
    defaultNS,
    ns: ["common", "home", "about", "contact"],
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

export function changeAppLanguage(lang: AppLanguage) {
  void i18n.changeLanguage(lang);
  syncDocumentLanguage(lang);
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // ignore
  }
}

export function hydrateAppLanguage() {
  const lang = readStoredLanguage();
  if (i18n.language !== lang) {
    void i18n.changeLanguage(lang);
  }
  syncDocumentLanguage(lang);
  return lang;
}

export default i18n;
