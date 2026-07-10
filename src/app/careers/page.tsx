import type { Metadata } from "next";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { careersCulture, openPositions } from "@/lib/constants/about";
import { careersMedia, pageMedia } from "@/lib/constants/media";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build a career in Canadian architectural millwork at Sandha Woodworks.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build a career in Canadian architectural millwork."
        description="We're growing our shop, office, and install teams. If you take pride in your craft and want long-term work with a supportive team, we'd love to meet you."
        image={pageMedia.careersHero}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>President</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-semibold">Chamkaur Sandha</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Message from Our President
            </p>
            <h3 className="mt-6 text-2xl font-semibold">
              Join a team that takes pride in every project.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              At Sandha Woodworks, we believe exceptional millwork begins with a commitment to
              quality and a deep understanding of our clients&apos; vision. From concept to
              completion, our team brings precision, craftsmanship, and dedication to every project.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={careersMedia.shopFloor}
              alt="Sandha Woodworks shop floor"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Our Culture</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            Skilled work, respected people, long-term careers.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {careersCulture.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Open Positions</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            We&apos;re currently hiring.
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Applications are accepted by email only — send your resume and the position you&apos;re
            applying for to{" "}
            <a href={`mailto:${siteConfig.hrEmail}`} className="font-semibold underline">
              {siteConfig.hrEmail}
            </a>
            .
          </p>
          <div className="mt-10 space-y-4">
            {openPositions.map((position) => (
              <article
                key={position.title}
                className="rounded-2xl border border-border bg-white p-6 transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{position.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{position.meta}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {position.description}
                </p>
                <button type="button" className="mt-4 text-sm font-semibold hover:underline">
                  View Details
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Interested in joining our team?"
        description="Email your resume and the position you're applying for."
        primaryLabel="Contact HR"
        primaryHref={`mailto:${siteConfig.hrEmail}`}
      />
    </>
  );
}
