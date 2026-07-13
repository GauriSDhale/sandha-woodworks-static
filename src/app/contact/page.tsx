import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";
import { PageHero, SectionLabel } from "@/components/marketing/PageSections";
import { pageMedia } from "@/lib/constants/media";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's talk about your next project. Request a quote or send a general inquiry.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your next project."
        description="Whether you're a general contractor, architect, developer, or commercial client — our estimating team is ready to help."
        image={pageMedia.contactHero}
      />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <ContactForm />
          </div>

          <aside className="space-y-8">
            <div>
              <SectionLabel>Contact Details</SectionLabel>
              <ul className="mt-6 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">Address</p>
                    <address className="mt-1 not-italic text-sm leading-relaxed text-muted-foreground">
                      {siteConfig.address.line1}
                      <br />
                      {siteConfig.address.line2}
                    </address>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">Phone</p>
                    <a
                      href={siteConfig.phoneHref}
                      className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-muted p-6">
              <p className="text-sm font-semibold">Hours</p>
              <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                {siteConfig.hours}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Sandha Woodworks location map"
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-2xl border border-border bg-muted p-6">
              <p className="text-sm font-semibold">For GCs, Architects & Developers</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Add us to your bid list — we&apos;d love to quote your next project.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
