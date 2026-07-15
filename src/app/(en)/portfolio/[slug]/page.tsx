import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { portfolioProjects } from "@/lib/constants/projects";
import type { AppLanguage } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";
import { ProjectDetailContent } from "./ProjectDetailContent";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function createProjectMetadata(locale: AppLanguage) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> {
    const { slug } = await params;
    const project = portfolioProjects.find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };
    const projects = resources[locale].portfolio.projects as Record<
      string,
      { scope?: string }
    >;
    const copy = projects[slug];
    return buildPageMetadata({
      locale,
      path: `/portfolio/${slug}`,
      title: project.name,
      description: copy?.scope,
    });
  };
}

export const generateMetadata = createProjectMetadata("en");

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  const detail = resources.en.portfolio.detail;

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <h1 className="font-display text-4xl font-semibold">{detail.notFoundTitle}</h1>
        <Link href="/portfolio" className="mt-6 text-brand hover:underline">
          {detail.notFoundBack}
        </Link>
      </div>
    );
  }

  const projectIndex = portfolioProjects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? portfolioProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < portfolioProjects.length - 1 ? portfolioProjects[projectIndex + 1] : null;

  return (
    <ProjectDetailContent
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
