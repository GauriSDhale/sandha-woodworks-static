"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";
import { SiteImage } from "@/components/ui/SiteImage";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export function ProductImage({
  src,
  alt,
  className,
  priority = false,
  fill,
}: ProductImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground/40",
          fill ? "absolute inset-0" : "",
          className,
        )}
        aria-label={alt}
      >
        <Package className="h-10 w-10 opacity-30" />
        <span className="text-xs">No image</span>
      </div>
    );
  }

  return (
    <SiteImage
      src={src}
      alt={alt}
      priority={priority}
      sizes={fill ? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" : "100vw"}
      onError={() => setErrored(true)}
      className={cn(
        "object-cover transition-transform duration-500",
        fill ? "absolute inset-0 h-full w-full" : "",
        className,
      )}
    />
  );
}
