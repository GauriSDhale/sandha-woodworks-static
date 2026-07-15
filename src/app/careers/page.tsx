import type { Metadata } from "next";
import { CareersPageContent } from "@/components/marketing/CareersPageContent";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build a career in Canadian architectural millwork at Sandha Woodworks.",
};

export default function CareersPage() {
  return <CareersPageContent />;
}
