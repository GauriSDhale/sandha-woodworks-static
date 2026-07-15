import type { Metadata } from "next";
import { SectorsPageContent } from "@/components/marketing/SectorsPageContent";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export const metadata: Metadata = namespacePageMetadata("en", "/sectors", "sectors");

export default function SectorsPage() {
  return <SectorsPageContent />;
}
