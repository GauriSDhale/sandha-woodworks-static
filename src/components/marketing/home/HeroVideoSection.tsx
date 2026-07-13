"use client";

import { HeroVideo } from "@/components/marketing/HeroVideo";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function HeroVideoSection() {
  const reducedMotion = useReducedMotion();

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

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.35)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[8vh] bg-gradient-to-b from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
}
