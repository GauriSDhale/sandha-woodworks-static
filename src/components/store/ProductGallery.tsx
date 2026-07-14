"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { ProductImage } from "./ProductImage";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const { t } = useTranslation("store");
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-muted",
          zoomed ? "cursor-zoom-out" : "cursor-zoom-in",
        )}
        style={{ aspectRatio: "4/3" }}
        onClick={() => setZoomed((z) => !z)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setZoomed((z) => !z);
          if (e.key === "ArrowLeft") prev();
          if (e.key === "ArrowRight") next();
        }}
        tabIndex={0}
        role="img"
        aria-label={t("a11y.imageOf", {
          name,
          index: activeIdx + 1,
          total: images.length,
        })}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: zoomed ? 1.35 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <ProductImage
              src={images[activeIdx]}
              alt={`${name} ${activeIdx + 1}`}
              fill
              priority={activeIdx === 0}
              className={cn(
                "transition-transform duration-300",
                zoomed ? "scale-110" : "",
              )}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/70 p-1.5 shadow backdrop-blur-sm">
          <ZoomIn className="h-4 w-4 text-foreground/60" />
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={t("a11y.prevImage")}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={t("a11y.nextImage")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-2.5 py-0.5 text-xs text-white/90 backdrop-blur-sm">
          {activeIdx + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label={t("a11y.imageThumbnails")}>
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIdx}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                i === activeIdx
                  ? "border-foreground shadow-sm"
                  : "border-transparent opacity-60 hover:opacity-90",
              )}
              aria-label={t("a11y.viewImage", { index: i + 1 })}
            >
              <ProductImage
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
