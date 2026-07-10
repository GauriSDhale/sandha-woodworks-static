export const serviceCategories = [
  {
    id: "pre-construction",
    number: "01",
    title: "Pre-Construction",
    description:
      "Design assist, budgets, VE and constructability review — before the CDs go out.",
    count: 4,
    services: [
      "Design Assist",
      "Millwork Budget Estimating",
      "Value Engineering",
      "Millwork Constructability Review",
    ],
  },
  {
    id: "engineering",
    number: "02",
    title: "Engineering",
    description:
      "Shop drawings, 3D models, Microvellum output and architect/consultant coordination.",
    count: 3,
    services: [
      "Millwork Shop Drawings & Engineering",
      "Millwork 3D Modeling & Visualization",
      "Architect & Consultant Coordination",
    ],
  },
  {
    id: "manufacturing",
    number: "03",
    title: "Manufacturing",
    description:
      "Custom architectural millwork, casework, CNC, laminate, veneer, solid surface, metal integration and in-house finishing.",
    count: 7,
    services: [
      "CNC Machining Department",
      "Custom & Assembly Department",
      "In-House Finishing Department",
      "Solid Surface & Glass",
      "Plastic Laminate Fabrication",
      "Veneer & Hardwood Fabrication",
      "Architectural Metal Integration",
    ],
  },
  {
    id: "sector-scopes",
    number: "04",
    title: "Sector Scopes",
    description:
      "Sector-specific millwork packages engineered to the codes of the environment.",
    count: 9,
    services: [
      "Healthcare Millwork",
      "Retail Fixtures",
      "Hospitality Millwork",
      "Multi-Residential Millwork",
      "Restaurant & QSR Millwork",
      "Pharmacy & Clinic Millwork",
      "Education Millwork",
      "Corporate, Bank & Institutional Millwork",
      "Custom Residential Millwork",
    ],
  },
  {
    id: "project-management",
    number: "05",
    title: "Project Management",
    description:
      "Dedicated PMs, scheduling, procurement, site coordination and QA.",
    count: 5,
    services: [
      "Project Management",
      "Scheduling",
      "Procurement",
      "Site Coordination",
      "Quality Assurance",
    ],
  },
  {
    id: "logistics",
    number: "06",
    title: "Logistics",
    description:
      "Packaging, delivery, JIT release and site logistics — Canada-wide plus CUSMA cross-border.",
    count: 4,
    services: [
      "Delivery & Logistics",
      "Packaging & Crating",
      "Just-In-Time Delivery",
      "Site Logistics",
    ],
  },
  {
    id: "installation",
    number: "07",
    title: "Installation",
    description:
      "Professional install, site supervision, deficiency management and closeout.",
    count: 4,
    services: [
      "Installation Coordination",
      "Site Supervision",
      "Deficiency Management",
      "Project Closeout",
    ],
  },
  {
    id: "warranty",
    number: "08",
    title: "Warranty & Aftercare",
    description:
      "Warranty support, maintenance, repairs, future renovations and service requests.",
    count: 4,
    services: [
      "Warranty Support",
      "Maintenance & Repairs",
      "Future Renovations",
      "Service Requests",
    ],
  },
] as const;

export const serviceStandards = [
  "AWMAC NAAWS 4.0 · AWMAC GIS third-party inspection",
  "AWI Architectural Woodwork Standards",
  "CSA / OBC / NBC · CSA B651 / AODA / ADA",
  "CARB Phase 2 / TSCA Title VI · LEED / WELL",
] as const;

export const servicesSectorLinks = [
  "Healthcare",
  "Education",
  "Corporate Offices",
  "Retail",
  "Hospitality",
  "Restaurants & QSR",
  "Financial Institutions",
  "Government & Public Buildings",
  "Multi-Residential",
  "Senior Living",
  "Community & Recreation Centres",
  "Libraries",
  "Cultural & Civic Buildings",
  "Industrial & Manufacturing",
  "Commercial Interiors",
] as const;
