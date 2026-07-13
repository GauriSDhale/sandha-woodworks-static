import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageSections";
import { footerLegalLinks } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Legal Centre",
  description: "Legal and compliance documents for Sandha Woodworks Service Ltd.",
};

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Compliance"
        title="Legal Centre"
        description="Policies, terms, and compliance documents governing use of this website and our services."
      />
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          {footerLegalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-2xl border border-border px-6 py-4 font-medium transition hover:border-black"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
