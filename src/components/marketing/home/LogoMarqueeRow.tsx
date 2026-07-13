"use client";

import { useState } from "react";
import type { PartnerLogo } from "@/lib/constants/partners";
import { partnerLogoSrc } from "@/lib/constants/partners";
import { cn } from "@/lib/utils";

interface LogoMarqueeRowProps {
  logos: readonly PartnerLogo[];
  reverse?: boolean;
  durationSec?: number;
  className?: string;
}

function PartnerLogoMark({
  logo,
  ariaHidden,
  isActive,
  onActivate,
  onDeactivate,
}: {
  logo: PartnerLogo;
  ariaHidden?: boolean;
  isActive?: boolean;
  onActivate?: (logo: PartnerLogo) => void;
  onDeactivate?: () => void;
}) {
  const [failed, setFailed] = useState(false);

  const interactionProps = {
    onMouseEnter: () => onActivate?.(logo),
    onMouseLeave: () => onDeactivate?.(),
    onFocus: () => onActivate?.(logo),
    onBlur: () => onDeactivate?.(),
  };

  if (failed) {
    return (
      <button
        type="button"
        aria-hidden={ariaHidden}
        aria-label={logo.name}
        tabIndex={ariaHidden ? -1 : 0}
        className={cn(
          "inline-flex h-8 max-w-[140px] items-center justify-center whitespace-nowrap rounded-md border border-warm-black/10 bg-white/70 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-warm-black/55 transition-all duration-300 sm:h-9 md:h-10",
          isActive && "border-brand/30 bg-white text-warm-black",
        )}
        {...interactionProps}
      >
        {logo.name}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-hidden={ariaHidden}
      aria-label={logo.name}
      tabIndex={ariaHidden ? -1 : 0}
      className={cn(
        "group/logo relative inline-flex h-8 items-center justify-center rounded-md px-1 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:h-9 md:h-10",
        isActive && "scale-105",
      )}
      {...interactionProps}
    >
      <img
        src={partnerLogoSrc(logo.file)}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
        className={cn(
          "h-full w-auto max-w-[120px] object-contain opacity-90 transition-all duration-500 md:max-w-[140px]",
          isActive
            ? "scale-105 opacity-100"
            : "group-hover/logo:scale-105 group-hover/logo:opacity-100",
        )}
      />
    </button>
  );
}

export function LogoMarqueeRow({
  logos,
  reverse = false,
  durationSec = 30,
  className,
}: LogoMarqueeRowProps) {
  const [activeLogo, setActiveLogo] = useState<PartnerLogo | null>(null);

  // Enough even copies so half the track is always wider than the viewport; -50% then loops seamlessly.
  const copies = Math.max(6, Math.ceil(24 / Math.max(logos.length, 1)));
  const evenCopies = copies % 2 === 0 ? copies : copies + 1;
  const track = Array.from({ length: evenCopies }, () => logos).flat();
  const half = track.length / 2;

  return (
    <div className={cn("relative", className)}>
      <div className="group/marquee relative overflow-hidden py-2">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28 md:w-40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28 md:w-40"
          aria-hidden="true"
        />
        <div
          className={cn(
            "flex w-max items-center gap-8 px-4 will-change-transform sm:gap-10 md:gap-12",
            reverse ? "animate-marquee-x-reverse" : "animate-marquee-x",
          )}
          style={{ animationDuration: `${durationSec}s` }}
        >
          {track.map((logo, index) => (
            <PartnerLogoMark
              key={`${logo.file}-${index}`}
              logo={logo}
              ariaHidden={index >= half}
              isActive={activeLogo?.file === logo.file}
              onActivate={setActiveLogo}
              onDeactivate={() => setActiveLogo(null)}
            />
          ))}
        </div>
      </div>

      <div
        className="mt-3 flex min-h-[1.25rem] items-center justify-center"
        aria-live="polite"
      >
        <p
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.28em] text-warm-black/55 transition-all duration-300",
            activeLogo
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-1 opacity-0",
          )}
        >
          {activeLogo?.name ?? "\u00A0"}
        </p>
      </div>
    </div>
  );
}

interface StaticLogoGridProps {
  logos: readonly PartnerLogo[];
  className?: string;
}

export function StaticLogoGrid({ logos, className }: StaticLogoGridProps) {
  const [activeLogo, setActiveLogo] = useState<PartnerLogo | null>(null);

  return (
    <div className={className}>
      <ul className="mx-auto grid max-w-4xl grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 md:grid-cols-5">
        {logos.map((logo) => (
          <li key={logo.file} className="flex items-center justify-center">
            <PartnerLogoMark
              logo={logo}
              isActive={activeLogo?.file === logo.file}
              onActivate={setActiveLogo}
              onDeactivate={() => setActiveLogo(null)}
            />
          </li>
        ))}
      </ul>
      <div
        className="mt-4 flex min-h-[1.25rem] items-center justify-center"
        aria-live="polite"
      >
        <p
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.28em] text-warm-black/55 transition-all duration-300",
            activeLogo
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-1 opacity-0",
          )}
        >
          {activeLogo?.name ?? "\u00A0"}
        </p>
      </div>
    </div>
  );
}
