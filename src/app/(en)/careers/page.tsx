import type { Metadata } from "next";
import { CareersPageContent } from "@/components/marketing/CareersPageContent";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export const metadata: Metadata = namespacePageMetadata("en", "/careers", "careers");

export default function CareersPage() {
  return <CareersPageContent />;
}
