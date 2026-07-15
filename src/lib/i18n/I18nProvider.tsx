"use client";

import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, {
  LANG_STORAGE_KEY,
  syncDocumentLanguage,
  type AppLanguage,
} from "@/lib/i18n/i18n";

export function I18nProvider({
  locale,
  children,
}: {
  locale: AppLanguage;
  children: ReactNode;
}) {
  // Per-tree instance so static generation of EN/FR pages does not share lng state.
  const [instance] = useState(() => i18n.cloneInstance({ lng: locale }));

  useEffect(() => {
    void instance.changeLanguage(locale);
    syncDocumentLanguage(locale);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [instance, locale]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
