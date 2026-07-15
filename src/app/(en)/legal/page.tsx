import type { Metadata } from "next";
import { LegalPageContent } from "@/components/marketing/LegalPageContent";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export const metadata: Metadata = namespacePageMetadata("en", "/legal", "legal");

export default function LegalPage() {
  return <LegalPageContent />;
}
