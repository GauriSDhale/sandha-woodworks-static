"use client";

import {
  FeaturedProjectsSection,
  HeroVideoSection,
  SectorsSection,
  TestimonialsSection,
  TrustedPartnersSection,
  WhyChooseUsSection,
} from "@/components/marketing/home";
import { SandhaIntroSplash } from "@/components/marketing/SandhaIntroSplash";

export function HomePageContent() {
  return (
    <>
      <SandhaIntroSplash />
      <HeroVideoSection />
      <WhyChooseUsSection />
      <SectorsSection />
      <TrustedPartnersSection />
      <FeaturedProjectsSection />
      <TestimonialsSection />
    </>
  );
}
