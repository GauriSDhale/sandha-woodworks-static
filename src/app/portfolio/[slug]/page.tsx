import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/lib/constants/projects";
import { projectMedia } from "@/lib/constants/media";
import { siteConfig } from "@/lib/constants/site";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.name,
    description: project.scope,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <h1 className="font-display text-4xl font-semibold">Project not found</h1>
        <Link href="/portfolio" className="mt-6 text-brand hover:underline">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  const projectIndex = portfolioProjects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? portfolioProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < portfolioProjects.length - 1 ? portfolioProjects[projectIndex + 1] : null;

  const imageSrc =
    projectMedia[project.imageKey as keyof typeof projectMedia] || projectMedia.coffeeIsland;

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-24">
        <img
          src={imageSrc}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
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
            <div className="mt-10 overflow-hidden rounded-2xl">
              <img
                src={imageSrc}
                alt={project.name}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
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

            {project.galleryCount > 1 ? (
              <div className="mt-6 rounded-2xl border border-border bg-muted p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  This project has {project.galleryCount} photos in its full gallery.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Contact us to request the complete gallery.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

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
