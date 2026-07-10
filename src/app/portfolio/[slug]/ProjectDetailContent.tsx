"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/constants/projects";
import { projectGalleries } from "@/lib/constants/media";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";

interface Props {
  project: PortfolioProject;
  prevProject: PortfolioProject | null;
  nextProject: PortfolioProject | null;
}

export function ProjectDetailContent({ project, prevProject, nextProject }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gallery = projectGalleries[project.slug];
  const images = gallery
    ? gallery.gallery.map((src) => ({ src, alt: project.name }))
    : [];

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-24">
        {images.length > 0 ? (
          <img
            src={images[0].src}
            alt={project.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Projects
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {project.category}
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-3 text-lg text-white/75">{project.location}</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold">Project Overview</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{project.scope}</p>
            {project.client ? (
              <p className="mt-4 text-sm text-muted-foreground">{project.client}</p>
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
                      <img
                        src={src}
                        alt={`${project.name} ${i + 1}`}
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
                Project Specs
              </h3>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sector
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">{project.specs.sector}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Delivery
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">{project.specs.delivery}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Finish
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">{project.specs.finish}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Materials
                  </dt>
                  <dd className="mt-1.5">
                    <ul className="space-y-2">
                      {project.specs.materials.map((material) => (
                        <li key={material} className="flex items-start gap-2 text-sm text-muted-foreground">
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
        <section className="border-t border-border px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-2xl font-semibold">Gallery</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {gallery.gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={src}
                      alt={`${project.name} ${i + 1}`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading={i < 4 ? "eager" : "lazy"}
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
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % images.length : 0,
            )
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
                <p className="text-xs text-muted-foreground">Previous</p>
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
                <p className="text-xs text-muted-foreground">Next</p>
                <p className="font-medium">{nextProject.name}</p>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-walnut via-warm-black to-warm-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.2),transparent_50%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Inspired by this project?
            </p>
            <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold text-cream md:text-4xl">
              Let&apos;s bring the same craftsmanship to your next build.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-brand-foreground transition hover:bg-brand-light"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
