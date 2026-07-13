import type { Metadata } from "next";
import { CareersApplicationForm } from "@/components/marketing/CareersApplicationForm";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { careersCulture, openPositions } from "@/lib/constants/about";
import { careersMedia, pageMedia } from "@/lib/constants/media";

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

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
            <div className="aspect-4/5 overflow-hidden rounded-2xl bg-muted">
              <img
                src={careersMedia.president}
                alt="Chamkaur Sandha, President of Sandha Woodworks"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="px-1 pb-2 pt-6">
              <SectionLabel className="text-brand">President</SectionLabel>
              <h2 className="font-display mt-3 text-3xl font-semibold">Chamkaur Sandha</h2>
            </div>
          </div>

          <div>
            <SectionLabel className="text-brand">Message from Our President</SectionLabel>
            <h3 className="font-display mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Join a team that takes pride in every project.
            </h3>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              At Sandha Woodworks, we believe exceptional millwork begins with a commitment to
              quality and a deep understanding of our clients&apos; vision. From concept to
              completion, our team brings precision, craftsmanship, and dedication to every project.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We&apos;re proud to serve commercial, institutional, and retail partners across North
              America with solutions that stand the test of time — and we&apos;re always looking for
              skilled tradespeople and office team members who share those values.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-10 sm:px-6 lg:px-8">
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

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Open Positions</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            We&apos;re currently hiring.
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Submit your application below if you&apos;re ready to help build high-quality
            architectural millwork for clients across Canada.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
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
                </article>
              ))}
            </div>

            <CareersApplicationForm />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Interested in joining our team?"
        description="Send us your background and experience through the application form above."
        primaryLabel="Contact HR"
        primaryHref="mailto:hr@sandhawoodworks.ca"
      />
    </>
  );
}
