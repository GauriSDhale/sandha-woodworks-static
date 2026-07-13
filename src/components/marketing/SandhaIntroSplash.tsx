"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const INTRO_SEEN_KEY = "sandha-intro-seen";
const INTRO_DURATION_MS = 4200;
const INTRO_SPLIT_MS = 3300;
const BRAND_WORD = "SANDHA";
const SUB_WORD = "WOODWORKS";

function IntroPanel({
  count,
  tagline,
  loading,
}: {
  count: number;
  tagline: string;
  loading: string;
}) {
  const year = new Date().getFullYear();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-warm-black text-cream">
      <div
        className="pointer-events-none absolute inset-0 text-cream opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          animation: "intro-grid-drift 6s linear infinite alternate",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-1/4 top-0 h-full w-[60%] origin-top-left"
          style={{
            transform: "rotate(-18deg)",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
            animation: "intro-sweep 2.4s 0.6s cubic-bezier(0.83,0,0.17,1) both",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

      <div className="absolute inset-x-0 top-6 flex items-center justify-between px-6 sm:top-10 sm:px-14">
        <div className="flex items-center gap-3 overflow-hidden">
          <span
            className="block h-2 w-2 bg-brand"
            style={{ animation: "intro-count 0.6s 0.2s ease-out both" }}
            aria-hidden="true"
          />
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.4em] text-cream/70"
            style={{ animation: "intro-rise 0.8s 0.25s ease-out both" }}
          >
            SW · 2010 — {year}
          </p>
        </div>
        <p
          className="hidden text-[10px] font-semibold uppercase tracking-[0.4em] text-cream/70 sm:block"
          style={{ animation: "intro-rise 0.8s 0.25s ease-out both" }}
        >
          Brantford · Ontario · Canada
        </p>
      </div>

      <div className="absolute left-0 right-0 top-[22%] flex justify-center">
        <div className="flex items-center gap-4 overflow-hidden">
          <span
            className="block h-px w-12 origin-left bg-cream/50"
            style={{ animation: "intro-line-x 0.8s 0.1s ease-out both" }}
            aria-hidden="true"
          />
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.55em] text-cream/70"
            style={{ animation: "intro-rise 0.9s 0.3s ease-out both" }}
          >
            {tagline}
          </p>
          <span
            className="block h-px w-12 origin-right bg-cream/50"
            style={{ animation: "intro-line-x 0.8s 0.1s ease-out both" }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1 className="flex overflow-hidden text-[22vw] font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-[16vw] md:text-[13vw]">
          {BRAND_WORD.split("").map((char, index) => (
            <span key={`${char}-${index}`} className="inline-block overflow-hidden pb-[0.05em]">
              <span
                className="inline-block will-change-transform"
                style={{
                  animation: `intro-char 1.1s ${0.4 + index * 0.09}s cubic-bezier(0.19,1,0.22,1) both`,
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </h1>
        <div className="mt-4 flex items-center gap-4 overflow-hidden sm:mt-6">
          <span
            className="block h-px w-16 origin-left bg-brand"
            style={{
              animation: "intro-line-x 1s 1.15s cubic-bezier(0.83,0,0.17,1) both",
            }}
            aria-hidden="true"
          />
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.7em] text-cream sm:text-sm"
            style={{ animation: "intro-rise 0.8s 1.25s ease-out both" }}
          >
            {SUB_WORD}
          </p>
          <span
            className="block h-px w-16 origin-right bg-brand"
            style={{
              animation: "intro-line-x 1s 1.15s cubic-bezier(0.83,0,0.17,1) both",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        className="absolute left-6 top-1/2 origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.5em] text-cream/50 sm:left-10"
        style={{ animation: "intro-rise 0.9s 1.5s ease-out both" }}
      >
        Precision · Craft · Delivery
      </div>
      <div
        className="absolute right-6 top-1/2 origin-right -translate-y-1/2 rotate-90 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.5em] text-cream/50 sm:right-10"
        style={{ animation: "intro-rise 0.9s 1.5s ease-out both" }}
      >
        Architectural Millwork
      </div>

      <div className="absolute inset-x-0 bottom-6 flex items-end justify-between px-6 sm:bottom-10 sm:px-14">
        <div
          className="flex items-baseline gap-2"
          style={{ animation: "intro-count 0.8s 0.5s ease-out both" }}
        >
          <span className="text-5xl font-black tabular-nums leading-none text-cream sm:text-6xl">
            {String(count).padStart(3, "0")}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-cream/50">%</span>
        </div>
        <div
          className="flex flex-col items-end gap-2"
          style={{ animation: "intro-count 0.8s 0.7s ease-out both" }}
        >
          <div className="h-px w-40 overflow-hidden bg-cream/15 sm:w-56">
            <div
              className="h-full bg-brand"
              style={{
                animation: "intro-loader 3s 0.4s cubic-bezier(0.16,1,0.3,1) both",
              }}
            />
          </div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.5em] text-cream/50">
            {loading}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SandhaIntroSplash() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion || sessionStorage.getItem(INTRO_SEEN_KEY)) return;

    setActive(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const countDuration = INTRO_SPLIT_MS - 300;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / countDuration);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const splitTimer = window.setTimeout(() => setSplitting(true), INTRO_SPLIT_MS);
    const doneTimer = window.setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(splitTimer);
      window.clearTimeout(doneTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  if (!active || done) return null;

  const tagline = t.intro.tagline;
  const loading = t.intro.loading;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          clipPath: "inset(0 0 50% 0)",
          transform: splitting ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1000ms cubic-bezier(0.83,0,0.17,1)",
        }}
      >
        <IntroPanel count={count} tagline={tagline} loading={loading} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          clipPath: "inset(50% 0 0 0)",
          transform: splitting ? "translateY(100%)" : "translateY(0)",
          transition: "transform 1000ms cubic-bezier(0.83,0,0.17,1)",
        }}
      >
        <IntroPanel count={count} tagline={tagline} loading={loading} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-[2px] -translate-y-1/2 overflow-hidden">
        <div
          className="h-full origin-center bg-brand"
          style={{
            animation: "intro-line-x 1.1s 0.15s cubic-bezier(0.83,0,0.17,1) both",
            transform: splitting ? "scaleX(0)" : undefined,
            transition: splitting
              ? "transform 700ms 200ms cubic-bezier(0.83,0,0.17,1)"
              : undefined,
          }}
        />
      </div>
    </div>
  );
}
