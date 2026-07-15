import type { Metadata } from "next";
import { InsightPageContent } from "@/components/marketing/InsightPageContent";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export const metadata: Metadata = namespacePageMetadata("en", "/linkedin", "insight");

export default function InsightPage() {
  return <InsightPageContent />;
}
