import type { Metadata } from "next";
import { HomePageContent } from "@/components/marketing/HomePageContent";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export const metadata: Metadata = namespacePageMetadata("en", "/", "home");

export default function HomePage() {
  return <HomePageContent />;
}
