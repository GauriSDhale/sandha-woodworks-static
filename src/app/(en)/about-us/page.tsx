import type { Metadata } from "next";
import { AboutUsContent } from "@/components/marketing/AboutUsContent";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export const metadata: Metadata = namespacePageMetadata("en", "/about-us", "about");

export default function AboutUsPage() {
  return <AboutUsContent />;
}
