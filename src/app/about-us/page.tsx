import type { Metadata } from "next";
import { AboutUsContent } from "@/components/marketing/AboutUsContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Architectural millwork built on trust. Driven by quality. Learn about Sandha Woodworks.",
};

export default function AboutUsPage() {
  return <AboutUsContent />;
}
