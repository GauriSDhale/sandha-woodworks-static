import type { Metadata } from "next";
import { ContactPageContent } from "@/components/marketing/ContactPageContent";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export const metadata: Metadata = namespacePageMetadata("en", "/contact", "contact");

export default function ContactPage() {
  return <ContactPageContent />;
}
