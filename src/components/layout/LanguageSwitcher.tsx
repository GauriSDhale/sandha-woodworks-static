"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { type AppLanguage } from "@/lib/i18n/i18n";
import { localeFromPathname, swapLocalePath } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  isHome?: boolean;
  className?: string;
}

export function LanguageSwitcher({ isHome = false, className }: LanguageSwitcherProps) {
  const { t } = useTranslation("common");
  const pathname = usePathname() || "/";
  const router = useRouter();
  const lang = localeFromPathname(pathname);

  function selectLanguage(next: AppLanguage) {
    if (next === lang) return;
    router.push(swapLocalePath(pathname, next));
  }

  return (
    <div
      className={cn(
        "inline-flex h-8 shrink-0 items-center rounded-full border p-0.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
        isHome ? "border-white/30" : "border-border",
        className,
      )}
      role="group"
      aria-label={t("footer.language")}
    >
      <button
        type="button"
        onClick={() => selectLanguage("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "inline-flex h-7 min-w-[2.25rem] cursor-pointer items-center justify-center rounded-full px-2.5 transition-colors",
          lang === "en"
            ? "bg-foreground text-cream"
            : isHome
              ? "text-white/60 hover:text-white"
              : "text-foreground/60 hover:text-foreground",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => selectLanguage("fr")}
        aria-pressed={lang === "fr"}
        className={cn(
          "inline-flex h-7 min-w-[2.25rem] cursor-pointer items-center justify-center rounded-full px-2.5 transition-colors",
          lang === "fr"
            ? "bg-foreground text-cream"
            : isHome
              ? "text-white/60 hover:text-white"
              : "text-foreground/60 hover:text-foreground",
        )}
      >
        FR
      </button>
    </div>
  );
}
