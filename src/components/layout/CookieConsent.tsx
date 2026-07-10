"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";

export function CookieConsent() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!localStorage.getItem("sw-cookie-consent")) setVisible(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function accept(value: string) {
    localStorage.setItem("sw-cookie-consent", value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-4xl rounded-2xl border border-black/10 bg-white p-5 shadow-2xl sm:inset-x-6 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-semibold text-foreground">{t.cookies.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t.cookies.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={() => accept("customize")}
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-muted"
          >
            {t.cookies.customize}
          </button>
          <button
            type="button"
            onClick={() => accept("reject")}
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-muted"
          >
            {t.cookies.reject}
          </button>
          <button
            type="button"
            onClick={() => accept("accept")}
            className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-black/85"
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
