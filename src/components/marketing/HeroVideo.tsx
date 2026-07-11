"use client";

import { heroMedia } from "@/lib/constants/media";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  className?: string;
}

export function HeroVideo({ className }: HeroVideoProps) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={cn("h-full w-full object-cover", className)}
      aria-label="Sandha Woodworks factory reel"
    >
      <source src={heroMedia.factoryVideo} type="video/mp4" />
    </video>
  );
}
