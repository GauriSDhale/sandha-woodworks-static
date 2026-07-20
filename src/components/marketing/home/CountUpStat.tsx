"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

function formatStatValue(value: number, format?: "comma") {
  if (format === "comma") {
    return value.toLocaleString("en-CA");
  }
  return String(value);
}

interface CountUpStatProps {
  value: number | null;
  display?: string;
  suffix?: string;
  format?: "comma";
  label: string;
  description: string;
  emphasize?: boolean;
  delayMs?: number;
  active: boolean;
  className?: string;
}

export function CountUpStat({
  value,
  display,
  suffix = "",
  format,
  label,
  description,
  emphasize = false,
  delayMs = 0,
  active,
  className,
}: CountUpStatProps) {
  const reducedMotion = useReducedMotion();
  const finalDisplay =
    display ?? (value === null ? "" : `${formatStatValue(value, format)}${suffix}`);
  const [shown, setShown] = useState(finalDisplay);

  useEffect(() => {
    if (!active || value === null || display) {
      setShown(finalDisplay);
      return;
    }

    if (reducedMotion) {
      setShown(finalDisplay);
      return;
    }

    const target = value;
    setShown(`${formatStatValue(0, format)}${suffix}`);

    let frame = 0;
    let startTime: number | null = null;
    const duration = 1000;

    const timeout = window.setTimeout(() => {
      function tick(now: number) {
        if (startTime === null) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        setShown(`${formatStatValue(current, format)}${suffix}`);
        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
        }
      }
      frame = window.requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [active, value, display, suffix, format, finalDisplay, reducedMotion, delayMs]);

  return (
    <div
      className={cn(
        "group/stat flex flex-col outline-none transition-colors duration-300",
        className,
      )}
      tabIndex={0}
    >
      <p
        className={cn(
          "font-display font-medium leading-none text-cream transition-colors duration-300 group-hover/stat:text-white group-focus-visible/stat:text-white",
          emphasize
            ? "text-4xl sm:text-5xl"
            : "text-4xl sm:text-5xl",
        )}
      >
        {shown}
      </p>
      <p className="type-eyebrow mt-4 text-brand underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover/stat:decoration-brand/50 group-focus-visible/stat:decoration-brand/50">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-cream/60 transition-colors duration-300 group-hover/stat:text-cream/80 group-focus-visible/stat:text-cream/80">
        {description}
      </p>
    </div>
  );
}
