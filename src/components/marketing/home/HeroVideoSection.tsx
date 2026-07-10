"use client";

import { useEffect, useState } from "react";
import { HeroVideo } from "@/components/marketing/HeroVideo";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function HeroVideoSection() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [scrollHintVisible, setScrollHintVisible] = useState(true);

  useEffect(() => {
    function onScroll() {
      setScrollHintVisible(window.scrollY < 48);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-warm-black">
      <div
        className={cn(
          "absolute inset-0 will-change-transform",
          !reducedMotion && "hero-video-zoom",
        )}
      >
        <HeroVideo className="absolute inset-0 h-full w-full" />
      </div>

      <div
        className="hero-architectural-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[8vh] bg-gradient-to-b from-warm-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] bg-gradient-to-t from-warm-black via-warm-black/90 to-transparent" />

      <div className="pointer-events-none absolute inset-6 border border-cream/10 sm:inset-10" />

      <div
        className={cn(
          "absolute bottom-8 left-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-cream/70 transition-opacity duration-500 sm:left-8",
          scrollHintVisible ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" aria-hidden="true" />
        <span>{t.home.hero.reelLabel}</span>
      </div>

      <a
        href="#hero-intro"
        className={cn(
          "absolute bottom-8 right-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-cream/70 transition-all duration-500 hover:text-cream sm:right-8",
          scrollHintVisible ? "opacity-100" : "pointer-events-none opacity-0",
          !reducedMotion && "animate-scroll-bounce",
        )}
      >
        {t.home.hero.scrollHint}
      </a>
    </section>
  );
}
