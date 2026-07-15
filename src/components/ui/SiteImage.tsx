import type { ImgHTMLAttributes } from "react";
import imageManifest from "@/lib/generated/image-manifest.json";

type ManifestEntry = {
  width: number;
  height: number;
  srcSet: string;
};

type SiteImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  priority?: boolean;
};

const manifest = imageManifest as Record<string, ManifestEntry>;

export function SiteImage({
  src,
  alt,
  priority = false,
  loading,
  decoding = "async",
  sizes = "100vw",
  width,
  height,
  ...props
}: SiteImageProps) {
  const optimized = manifest[src];

  return (
    <picture className="contents">
      {optimized ? <source type="image/webp" srcSet={optimized.srcSet} sizes={sizes} /> : null}
      <img
        {...props}
        src={src}
        alt={alt}
        width={width ?? optimized?.width}
        height={height ?? optimized?.height}
        sizes={sizes}
        loading={loading ?? (priority ? "eager" : "lazy")}
        fetchPriority={priority ? "high" : "auto"}
        decoding={decoding}
      />
    </picture>
  );
}
