import type { Metadata } from "next";
import { PortfolioPageContent } from "@/components/marketing/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected architectural millwork projects from across Canada.",
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
