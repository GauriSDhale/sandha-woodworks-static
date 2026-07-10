import type { Metadata } from "next";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import {
  certifications,
  facilityFeatures,
  missionVision,
  teamMembers,
  timeline,
  values,
  whyChooseUs,
} from "@/lib/constants/about";
import { pageMedia, teamMedia } from "@/lib/constants/media";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Architectural millwork built on trust. Driven by quality. Learn about Sandha Woodworks.",
};

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sandha Woodworks"
        title="Architectural millwork built on trust. Driven by quality."
        image={pageMedia.aboutHero}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Our Journey</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">Timeline</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            From a small custom shop founded in {siteConfig.founded} to a certified architectural
            millwork manufacturer serving projects across North America.
          </p>
          <div className="mt-12 space-y-8 border-l border-border pl-8">
            {timeline.map((item) => (
              <article key={item.year} className="relative">
                <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full bg-black" />
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.year}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
              A principal who came up through experience — and built a shop around it.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Sandha Woodworks was founded in {siteConfig.founded} by Chamkaur Sandha, who came to
              architectural millwork through years of hands-on carpentry, site installation, and
              shop floor experience.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              From a small custom shop, Sandha Woodworks has grown into a full-service architectural
              millwork manufacturer serving general contractors, architects, developers, and
              institutional clients across Canada and into the U.S.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={pageMedia.aboutFacilityInterior}
              alt="Inside the Sandha Woodworks Ontario millwork facility"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Memberships & Certifications</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            Accredited by the industry bodies that set the standard.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <article key={cert.name} className="rounded-2xl border border-border bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {cert.year}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{cert.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cert.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark px-4 py-20 text-surface-cream sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {missionVision.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-surface-cream/70">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Our Values</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            The principles that guide every project.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>Facility Overview</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
              {siteConfig.facilitySqFt} sq. ft. of engineered manufacturing capacity.
            </h2>
            <ul className="mt-6 space-y-3">
              {facilityFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-white p-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl">
          <img
            src={pageMedia.aboutTeam}
            alt="The Sandha Woodworks team"
            className="aspect-[21/9] w-full object-cover"
          />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Meet Our Leadership Team</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            The people behind every project.
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Our leadership team brings together decades of experience in millwork, design, and
            project delivery — guiding Sandha Woodworks in delivering exceptional results for every
            client.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={teamMedia[member.avatarKey]}
                    alt={member.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-red">{member.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {member.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Ready when you are"
        title="Ready to bring your next commercial project to life?"
        secondaryLabel="See Projects"
        secondaryHref="/portfolio"
      />
    </>
  );
}
