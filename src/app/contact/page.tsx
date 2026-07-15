import type { Metadata } from "next";
import { ContactPageContent } from "@/components/marketing/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's talk about your next project. Request a quote or send a general inquiry.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
