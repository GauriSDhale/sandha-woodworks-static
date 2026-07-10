"use client";

import { heroMedia } from "@/lib/constants/media";

export function HeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
      aria-label="Sandha Woodworks factory reel"
    >
      <source src={heroMedia.factoryVideo} type="video/mp4" />
    </video>
  );
}
