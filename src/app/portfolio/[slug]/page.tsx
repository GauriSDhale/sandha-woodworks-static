import type { Metadata } from "next";
import Link from "next/link";
import { portfolioProjects } from "@/lib/constants/projects";
import enPortfolio from "@/locales/en/portfolio.json";
import { ProjectDetailContent } from "./ProjectDetailContent";

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
  const copy = enPortfolio.projects[slug as keyof typeof enPortfolio.projects];
  return {
    title: project.name,
    description: copy?.scope,
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
        <h1 className="font-display text-4xl font-semibold">
          {enPortfolio.detail.notFoundTitle}
        </h1>
        <Link href="/portfolio" className="mt-6 text-brand hover:underline">
          {enPortfolio.detail.notFoundBack}
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
