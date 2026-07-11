import { siteConfig } from "@/lib/constants/site";

export const underOneRoof = [
  "Engineering & shop drawings",
  "CNC fabrication",
  "Finishing & spray booths",
  "Project management",
  "Logistics & delivery",
  "Site installation",
  "Warranty & service",
] as const;

export const atAGlance = [
  "Head office & manufacturing — Brantford, Ontario",
  "In-house engineering, CNC, finishing, PM, install",
  "Serving Canada + United States",
  "Made in Canada · AWMAC-aligned · ISO-aligned QA",
  "One project manager — from award through warranty",
] as const;

export const companyCommitments = `We built the company around three commitments: build to the spec, hit the schedule, and answer the phone after the job is closed. Everything else — the CNC line, the finishing booths, the install crews, the PMs — exists to make those three commitments true on every job we sign.`;

export const projectFlow = [
  {
    n: "01",
    t: "Project award",
    d: "Contract signed, dedicated PM assigned, kickoff scheduled with GC and design team.",
  },
  {
    n: "02",
    t: "Kickoff & site review",
    d: "Scope, spec, schedule, submittal log and site conditions confirmed with all trades.",
  },
  {
    n: "03",
    t: "Engineering",
    d: "In-house engineers translate the architect's intent into buildable, code-compliant assemblies.",
  },
  {
    n: "04",
    t: "Shop drawings",
    d: "Full-set drawings issued for review — sections, elevations, hardware, finish schedule.",
  },
  {
    n: "05",
    t: "Approvals & samples",
    d: "Finish samples, mock-ups and revisions cycled until signed off by architect and owner.",
  },
  {
    n: "06",
    t: "Procurement",
    d: "Materials, veneers, stone, hardware, appliances released against long-lead schedule.",
  },
  {
    n: "07",
    t: "Manufacturing",
    d: "CNC cutting, edge-banding, solid-surface work and assembly on our shop floor.",
  },
  {
    n: "08",
    t: "Finishing",
    d: "In-house spray booths — stain, catalyzed lacquer, conversion varnish, factory-cured.",
  },
  {
    n: "09",
    t: "Quality control",
    d: "Every unit checked against approved shop drawings before it leaves the building.",
  },
  {
    n: "10",
    t: "Packaging & logistics",
    d: "Blanket-wrapped, crated where required, sequenced to the site install schedule.",
  },
  {
    n: "11",
    t: "Delivery",
    d: "Direct-to-site delivery windows coordinated with GC and building management.",
  },
  {
    n: "12",
    t: "Installation",
    d: "Sandha install crews — no third-party subs — set, scribe and commission every piece.",
  },
  {
    n: "13",
    t: "Deficiency & punch-list",
    d: "PM walks the space with GC and consultant, tracks and closes every item.",
  },
  {
    n: "14",
    t: "Close-out",
    d: "As-builts, O&M manuals, finish schedules, warranty documents and touch-up kits handed over.",
  },
  {
    n: "15",
    t: "Warranty & after-care",
    d: "1-year standard warranty (custom terms per contract) — same PM answers service calls.",
  },
] as const;

export const closeOutItems = [
  {
    t: "Substantial completion",
    d: "Final walk with GC, consultant and owner. Every deficiency logged and dated.",
  },
  {
    t: "Deficiency close-out",
    d: "Sandha crews return until the punch-list is zero — no partial hand-offs.",
  },
  {
    t: "Close-out package",
    d: "As-built drawings, O&M manuals, finish schedules, cleaning instructions, touch-up kits, MSDS and warranty certificates handed over on completion.",
  },
  {
    t: "Standard warranty",
    d: "12-month warranty on materials, finishes, hardware and workmanship, effective from substantial completion.",
  },
  {
    t: "Custom warranty terms",
    d: "Extended terms — 2, 5 or project-specific — are honoured per the executed contract for that scope. Whatever we signed, we stand behind.",
  },
  {
    t: "After-care service",
    d: "During and after the warranty period, service calls route to the same Project Manager who built the job. One number. Fast response. Documented follow-up.",
  },
] as const;

export const pdfContact = {
  phone: siteConfig.phone,
  quote: siteConfig.estimatingEmail,
  general: siteConfig.email,
  address: siteConfig.address.full,
  web: "sandhawoodworks.ca",
  webUrl: siteConfig.url,
  linkedin: "linkedin.com/company/sandha-woodworks-service-ltd",
} as const;
