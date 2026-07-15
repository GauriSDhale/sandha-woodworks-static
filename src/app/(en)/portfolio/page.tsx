import type { Metadata } from "next";
import { PortfolioPageContent } from "@/components/marketing/PortfolioPageContent";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export const metadata: Metadata = namespacePageMetadata("en", "/portfolio", "portfolio");

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
