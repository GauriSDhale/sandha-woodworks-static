import type { Metadata } from "next";
import { SectorsPageContent } from "@/components/marketing/SectorsPageContent";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "Millwork engineered for every commercial market — eight core markets, one accountable manufacturer.",
};

export default function SectorsPage() {
  return <SectorsPageContent />;
}
