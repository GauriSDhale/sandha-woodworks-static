"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import type { AppLanguage } from "@/lib/i18n/i18n";

export function Providers({
  locale,
  children,
}: {
  locale: AppLanguage;
  children: ReactNode;
}) {
  return <I18nProvider locale={locale}>{children}</I18nProvider>;
}
