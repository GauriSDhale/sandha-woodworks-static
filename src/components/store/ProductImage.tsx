"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

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
  priority: _priority,
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={cn(
        "object-cover transition-transform duration-500",
        fill ? "absolute inset-0 h-full w-full" : "",
        className,
      )}
    />
  );
}
