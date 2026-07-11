export const siteConfig = {
  name: "Sandha Woodworks",
  legalName: "Sandha Woodworks Service Ltd.",
  tagline: "Built on Trust · Driven by Quality",
  heroTagline: "Sandha Woodworks · Est. Canada",
  heroLocation: "Brantford, ON — CA",
  description:
    "A full-service Canadian architectural millwork manufacturer for general contractors, architects, and developers — from engineered shop drawings to finished install.",
  footerDescription:
    "Precision architectural millwork, commercial casework, and custom fabrication for general contractors, architects, and developers across Canada.",
  url: "https://sandhawoodworks.ca",
  phone: "+1 226 381 0023",
  phoneHref: "tel:+12263810023",
  email: "info@sandhawoodworks.ca",
  estimatingEmail: "estimating@sandhawoodworks.ca",
  hrEmail: "hr@sandhawoodworks.ca",
  address: {
    line1: "121 Roy Blvd.",
    line2: "Brantford, Ontario, Canada N3R 7K1",
    full: "121 Roy Blvd., Brantford, Ontario, Canada N3R 7K1",
  },
  hours: "Monday – Friday\n8:00 am – 5:00 pm ET",
  hoursShort: "Mon – Fri · 8:00 am – 5:00 pm ET",
  founded: 2014,
  facilitySqFt: "40,000",
  estRange: "2010 — 2026",
  certificationsFooter: "AWMAC GIS · ISO 9001 · WMCO · CGP",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.8!2d-80.25!3d43.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDA4JzI0LjAiTiA4MMKwMTUnMDAuMCJX!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca",
} as const;

export const navLinks = [
  { href: "/about-us", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Sectors", hasDropdown: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/insight", label: "Insight" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerCompanyLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerExploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/store", label: "Cabinet Store" },
  { href: "/portfolio", label: "Portfolio" },
] as const;

export const footerLegalLinks = [
  { href: "/legal", label: "Legal Centre" },
  { href: "/legal/general-terms", label: "General Terms & Conditions" },
  { href: "/legal/canada-terms", label: "Canada Ts & Cs" },
  { href: "/legal/usa-terms", label: "USA Ts & Cs" },
  { href: "/legal/code-of-conduct", label: "Code of Conduct" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/accessibility", label: "Accessibility" },
  { href: "/legal/website-terms", label: "Website Terms of Use" },
] as const;

export const socialLinks = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://www.facebook.com", label: "Facebook" },
  { href: "https://www.youtube.com", label: "YouTube" },
  { href: "https://x.com", label: "X" },
  { href: "https://www.pinterest.com", label: "Pinterest" },
  { href: "https://www.reddit.com", label: "Reddit" },
] as const;

export const capabilityPills = [
  "40,000 sq. ft. Facility",
  "In-House Engineering",
  "CNC Manufacturing",
  "Premium Finishing",
  "Project Management",
  "Delivery & Logistics",
  "AWMAC GIS Member",
  "ISO 9001 Certified",
  "WMCO Member",
  "Controlled Goods Program",
  "Made in Canada",
] as const;

export const homeStats = [
  {
    value: "2014",
    label: "Founded",
    description: "Over a decade of architectural millwork",
  },
  {
    value: "40,000+",
    label: "Sq Ft Facility",
    description: "Purpose-built manufacturing in Brantford, ON",
  },
  {
    value: "500+",
    label: "Projects Delivered",
    description: "Commercial · Institutional · Healthcare",
  },
] as const;

export const aboutStats = [
  { value: "40,000", label: "sq. ft. facility" },
  { value: "100+", label: "Active clients" },
  { value: "21+", label: "Service lines" },
  { value: "12", label: "Sectors served" },
] as const;

export const trustedPartnerSectors = [
  "Retail",
  "Restaurants & QSR",
  "Financial",
  "Education",
] as const;

export const homeSectors = [
  { href: "/sectors#healthcare", label: "Healthcare", imageKey: "healthcare" as const },
  { href: "/sectors#retail", label: "Retail", imageKey: "retail" as const },
  { href: "/sectors#hospitality", label: "Hospitality", imageKey: "hospitality" as const },
  { href: "/sectors#corporate", label: "Corporate", imageKey: "corporate" as const },
  { href: "/sectors#education", label: "Education", imageKey: "education" as const },
  { href: "/sectors#institutional", label: "Institutional", imageKey: "institutional" as const },
] as const;

export const manufacturingBullets = [
  "Made in Canada",
  "Engineering → Manufacturing → Installation",
  "Commercial · Healthcare · Hospitality · Education · Retail",
] as const;
