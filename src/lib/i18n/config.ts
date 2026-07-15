export const LANG_STORAGE_KEY = "sandha-lang";
export const supportedLngs = ["en", "fr"] as const;
export type AppLanguage = (typeof supportedLngs)[number];
export const defaultNS = "common";
