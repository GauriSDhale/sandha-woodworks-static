import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/marketing/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every millwork capability under one roof — pre-construction through warranty and aftercare.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
