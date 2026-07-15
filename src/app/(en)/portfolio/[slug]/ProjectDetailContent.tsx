"use client";

import Link from "@/components/i18n/Link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PortfolioProject } from "@/lib/constants/projects";
import { projectGalleries } from "@/lib/constants/media";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { SiteImage } from "@/components/ui/SiteImage";

interface Props {
  project: PortfolioProject;
  prevProject: PortfolioProject | null;
  nextProject: PortfolioProject | null;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export function ProjectDetailContent({ project, prevProject, nextProject }: Props) {
  const { t } = useTranslation("portfolio");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gallery = projectGalleries[project.slug];
  const images = gallery
    ? gallery.gallery.map((src, i) => ({
        src,
        alt: t("detail.galleryAlt", { name: project.name, index: i + 1 }),
      }))
    : [];

  const materials = asStringArray(
    t(`projects.${project.slug}.specs.materials`, { returnObjects: true }),
  );

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-24">
        {images.length > 0 ? (
          <SiteImage
            src={images[0].src}
            alt={project.name}
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("detail.back")}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {t(`filters.${project.category}`, { defaultValue: project.category })}
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-3 text-lg text-white/75">{project.location}</p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold">{t("detail.overview")}</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t(`projects.${project.slug}.scope`)}
            </p>
            {project.clientPartner ? (
              <p className="mt-4 text-sm text-muted-foreground">
                {t("detail.client", { name: project.clientPartner })}
              </p>
            ) : null}
            {gallery && gallery.gallery.length > 0 ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {gallery.gallery.slice(0, 3).map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="group overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <SiteImage
                        src={src}
                        alt={t("detail.galleryAlt", { name: project.name, index: i + 1 })}
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <div className="rounded-2xl border border-border bg-muted p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {t("detail.specs")}
              </h3>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("detail.sector")}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">
                    {t(`projects.${project.slug}.specs.sector`)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("detail.delivery")}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">
                    {t(`projects.${project.slug}.specs.delivery`)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("detail.finish")}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">
                    {t(`projects.${project.slug}.specs.finish`)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("detail.materials")}
                  </dt>
                  <dd className="mt-1.5">
                    <ul className="space-y-2">
                      {materials.map((material) => (
                        <li
                          key={material}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                          {material}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {gallery && gallery.gallery.length > 0 ? (
        <section className="border-t border-border px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-2xl font-semibold">{t("detail.gallery")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {gallery.gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <SiteImage
                      src={src}
                      alt={t("detail.galleryAlt", { name: project.name, index: i + 1 })}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {lightboxIndex !== null && images.length > 0 ? (
        <GalleryLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + images.length) % images.length : 0,
            )
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0))
          }
        />
      ) : null}

      <section className="border-t border-border bg-muted px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {prevProject ? (
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="group flex items-center gap-3 text-sm font-medium transition hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground">{t("detail.previous")}</p>
                <p className="font-medium">{prevProject.name}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="group flex items-center gap-3 text-right text-sm font-medium transition hover:text-brand"
            >
              <div>
                <p className="text-xs text-muted-foreground">{t("detail.next")}</p>
                <p className="font-medium">{nextProject.name}</p>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-walnut via-warm-black to-warm-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.2),transparent_50%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              {t("detail.ctaEyebrow")}
            </p>
            <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold text-cream md:text-4xl">
              {t("detail.ctaTitle")}
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-cream transition hover:bg-warm-black"
          >
            {t("detail.requestQuote")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
