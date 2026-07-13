import type { Metadata } from "next";
import { InsightPageContent } from "@/components/marketing/InsightPageContent";

export const metadata: Metadata = {
  title: "Insight",
  description: "Industry insight, project updates, and millwork knowledge from Sandha Woodworks.",
};

export default function InsightPage() {
  return <InsightPageContent />;
}
