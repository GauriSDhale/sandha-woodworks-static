import type { Metadata } from "next";
import { LegalPageContent } from "@/components/marketing/LegalPageContent";
import enLegal from "@/locales/en/legal.json";

export const metadata: Metadata = {
  title: enLegal.meta.title,
  description: enLegal.meta.description,
};

export default function LegalPage() {
  return <LegalPageContent />;
}
