"use client";

import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  isHome?: boolean;
  className?: string;
}

export function LanguageSwitcher({ isHome = false, className }: LanguageSwitcherProps) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
        isHome ? "border-white/25" : "border-border",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "rounded-full px-2.5 py-1 font-semibold transition-colors ",
          lang === "en"
            ? "bg-foreground text-cream"
            : isHome
              ? "text-cream/60 hover:text-cream"
              : "text-foreground/60 hover:text-foreground",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
        className={cn(
          "rounded-full px-2.5 py-1 font-semibold transition-colors cursor-pointer",
          lang === "fr"
            ? "bg-foreground text-cream"
            : isHome
              ? "text-cream/60 hover:text-cream"
              : "text-foreground/60 hover:text-foreground",
        )}
      >
        FR
      </button>
    </div>
  );
}
