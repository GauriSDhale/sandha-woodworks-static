import type { Metadata } from "next";
import { LegalPageContent } from "@/components/marketing/LegalPageContent";

export const metadata: Metadata = {
  title: "Legal Centre",
  description: "Legal and compliance documents for Sandha Woodworks Service Ltd.",
};

export default function LegalPage() {
  return <LegalPageContent />;
}
