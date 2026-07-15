import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/marketing/ServicesPageContent";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export const metadata: Metadata = namespacePageMetadata("en", "/services", "services");

export default function ServicesPage() {
  return <ServicesPageContent />;
}
