export interface SectorDetail {
  heading: string;
  description: string;
  about: string;
  standards: string[];
  features: string[];
  whyChoose: { title: string; description: string }[];
  services: { name: string; slug: string; description: string }[];
  cta: { heading: string; description: string };
  otherSectors: { name: string; slug: string }[];
  image: string;
}

export const sectorDetails: Record<string, SectorDetail> = {
  healthcare: {
    heading: "Healthcare Millwork",
    description: "Hospital-grade millwork engineered for infection control, water resistance and low-disturbance install in live patient environments.",
    about: "Sandha Woodworks delivers whole-hospital millwork packages — from main-lobby reception and wayfinding walls to nurses' stations, exam rooms, medication and utility rooms, pharmacy compounding, patient rooms, staff lounges, cafeterias and sterile processing.\n\nEvery substrate, edge, hinge and finish is engineered against the project's ICRA / IPAC requirements, disinfectant chemistry list and moisture exposure profile — and every install is planned around med-pass, rounds and patient sleep cycles.",
    standards: [
      "CSA Z8000 · CSA Z317.13 · CSA Z317.2",
      "FGI Guidelines · USP <797> / <800>",
      "PIDAC / Public Health Ontario IPAC",
      "ULC S102 / ASTM E84 Class A on public-corridor paneling",
      "AWMAC Premium grade on all veneer",
    ],
    features: [
      "Lobby reception, wayfinding walls and public wood paneling",
      "Nurses' stations, physician charting alcoves and ED triage counters",
      "Exam-room, imaging and pre-op bay casework",
      "Medication rooms, clean/dirty utility, central sterile",
      "USP <797>/<800> pharmacy compounding rooms",
      "Patient-room overbed wardrobes, TV walls, integrated vanities",
      "Staff lounges, locker rooms, cafeteria servery",
      "Chapel, reflection rooms and hospital-foundation offices",
    ],
    whyChoose: [
      {
        title: "Disinfect-Safe Wood Program",
        description: "AWMAC Premium veneer sealed in hospital-grade catalyzed polyurethane, tested for quat, AHP, bleach (1:10), IPA and phenolic wipe-down. Ships with a chemical-compatibility datasheet and housekeeping protocol card.",
      },
      {
        title: "Live-Site Install Program",
        description: "After-hours crews, ICRA Class III/IV dust barriers, HEPA and negative-air enclosures, silent-fastener install, and IPAC clearance sign-off per CSA Z317.13.",
      },
      {
        title: "Water-resistant construction",
        description: "MR-MDF or NAUF phenolic core, six-side sealed, continuous 3mm PVC/ABS edgeband, silicone-bedded counters, thermoformed integral-bowl solid surface — no seam for water or biofilm.",
      },
      {
        title: "Whole-hospital scope",
        description: "One accountable manufacturer for public wood + clinical HPL/solid-surface + BOH stainless — no seam between trades.",
      },
    ],
    services: [
      { name: "Healthcare Millwork", slug: "healthcare-millwork", description: "Hospital-grade millwork engineered for infection control, water resistance, and low-disturbance install in live patient environments." },
      { name: "Pharmacy & Clinic Millwork", slug: "pharmacy-clinic-millwork", description: "Dispensary, exam and consultation-room casework." },
      { name: "Solid Surface & Glass", slug: "solid-surface-work", description: "Corian fabricated in-house, plus quartz, granite, marble and architectural glass — coordinated as one interior-millwork package." },
      { name: "In-House Finishing Department", slug: "finishing-paint", description: "Sanding → Cefla robotic flatline → manual booths → Sunspot dry room. Strictly for our own millwork." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a healthcare package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
      { name: "Financial Institutions", slug: "financial-institutions" },
    ],
    image: "/assets/sector-hero/healthcare.jpg",
  },
  "senior-living": {
    heading: "Senior Living Millwork",
    description: "Retirement, assisted living and long-term care millwork — hospitality warmth with healthcare durability.",
    about: "Senior-living millwork built to hospital-grade cleanability and AODA / ADA accessibility, finished with residential warmth — dining rooms, lounges, wellness rooms, memory-care suites and resident-room casework.\n\nWe coordinate accessibility clearances, contrast strips, and grab-bar blocking directly on the shop drawings.",
    standards: [
      "AWMAC Custom to Premium grade",
      "CSA B651 / AODA / ADA — public and resident-room accessibility",
      "CSA Z8000 / FGI guidelines for care areas",
    ],
    features: [
      "Lobby and lounge feature paneling",
      "Dining-room servery, buffet, waitstaff stations",
      "Bistro, café, and hair-salon millwork",
      "Wellness room and clinic casework",
      "Resident-room vanities, wardrobes, kitchenettes",
      "Memory-care wayfinding paneling",
      "Chapel and reflection rooms",
    ],
    whyChoose: [
      {
        title: "Healthcare + hospitality hybrid",
        description: "We combine our IPAC-aware clinical construction with hospitality-grade veneer finishing.",
      },
      {
        title: "AODA / ADA accessibility built in",
        description: "Toe-clearance, reach ranges, contrast strips and grab-bar blocking coordinated at shop-drawing stage.",
      },
      {
        title: "Live-facility install",
        description: "Off-hours and phased install so residents are never displaced.",
      },
    ],
    services: [
      { name: "Healthcare Millwork", slug: "healthcare-millwork", description: "Hospital-grade millwork engineered for infection control, water resistance, and low-disturbance install in live patient environments." },
      { name: "Hospitality Millwork", slug: "hospitality-millwork", description: "Premium-grade architectural millwork for luxury and full-service hotels." },
      { name: "Custom Residential Millwork", slug: "custom-cabinets", description: "Bespoke millwork and panelling for designer homes — not standard tender packages." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a senior living package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
    ],
    image: "/assets/sector-hero/senior-living.jpg",
  },
  education: {
    heading: "Education Millwork",
    description: "Casework and millwork for universities, primary and secondary schools, labs, libraries and administration.",
    about: "From primary schools to research universities, Sandha delivers millwork built for the abuse cycle of a public educational building — 30-year hardware, impact edges and finishes cleanable under school-board maintenance regimes.\n\nWe are approved on major Ontario school-board vendor lists and have delivered K-12 and post-secondary packages across Canada and the US.",
    standards: [
      "OBC / NBC · CSA B651 · AODA / ADA",
      "AWMAC Custom to Premium grade (NAAWS 4.0)",
      "ANSI/BHMA A156 Grade 1 hardware on classroom cabinetry",
      "CARB Phase 2 / TSCA Title VI panels",
    ],
    features: [
      "Classroom cabinetry, cubbies, teacher wall units",
      "Science lab casework with epoxy tops & integrated sinks",
      "Library circulation desks, stacks, study carrels",
      "Auditorium acoustic wood wall panels and balcony fascia",
      "Learning stairs, tiered wood cladding, feature bulkheads",
      "Reception, administration and principal-suite casework",
      "Student lockers, wardrobe units, corridor benches",
      "STEAM, music, art and maker-space feature walls",
    ],
    whyChoose: [
      {
        title: "Vendor-approved",
        description: "Named on Ontario school-board and college pre-qualified millwork lists.",
      },
      {
        title: "Summer-window delivery",
        description: "We build the schedule around the 8-week summer shutdown, with phased delivery and swing-space install.",
      },
      {
        title: "Public-space durability",
        description: "Grade 1 BHMA hardware, impact-resistant edges, cleanable HPL and stain-grade veneer — spec'd for a 20+ year life-cycle.",
      },
      {
        title: "Real project record",
        description: "Recent K-12 and post-secondary work across Ontario and Massachusetts — Robarts Library, Niagara College Marotta, Tiffany Hill, Tobin High School.",
      },
    ],
    services: [
      { name: "Education Millwork", slug: "education-millwork", description: "Millwork for every learning environment — daycare to university, existing and new-build." },
      { name: "Architectural Millwork", slug: "architectural-millwork", description: "Site-specific millwork engineered for commercial and institutional interiors." },
      { name: "Custom Residential Millwork", slug: "custom-cabinets", description: "Bespoke millwork and panelling for designer homes — not standard tender packages." },
      { name: "CNC Machining Department", slug: "cnc-manufacturing", description: "Multi-axis CNC production for tight-tolerance components." },
    ],
    cta: {
      heading: "Ready to price an education package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
      { name: "Financial Institutions", slug: "financial-institutions" },
    ],
    image: "/assets/sector-hero/education.jpg",
  },
  libraries: {
    heading: "Libraries Millwork",
    description: "Public, academic and school library millwork — circulation desks, stacks, study carrels, program rooms.",
    about: "Library millwork built for 30-year public use — circulation desks with integrated RFID, stack end-panels, quiet-study carrels, group-study pods, children's-zone millwork and program-room casework.\n\nWe coordinate with library-technology vendors for RFID pad rough-ins and self-checkout kiosks.",
    standards: [
      "AWMAC Custom to Premium grade",
      "CSA B651 / AODA / ADA counters and study spaces",
      "ULC S102 Class A on public paneling",
    ],
    features: [
      "Circulation desks with RFID pad integration",
      "Stack end-panels and reading-room paneling",
      "Individual study carrels and group-study pods",
      "Reference and reader-services counters",
      "Children's zone millwork and story-time bleachers",
      "Program rooms and maker-space casework",
      "Admin and staff-workroom casework",
    ],
    whyChoose: [
      {
        title: "Library-tech coordination",
        description: "RFID, self-checkout and security-gate rough-ins coordinated on the shop drawings.",
      },
      {
        title: "Heritage-sensitive integration",
        description: "Recent work at U of T Robarts and Valley Park Library — matched to existing millwork.",
      },
      {
        title: "Public-grade durability",
        description: "Grade 1 hardware, impact-rated edges, cleanable finishes.",
      },
    ],
    services: [
      { name: "Corporate, Bank & Institutional Millwork", slug: "corporate-institutional-millwork", description: "One millwork partner for banks, offices, libraries and every professional workplace." },
      { name: "Education Millwork", slug: "education-millwork", description: "Millwork for every learning environment — daycare to university, existing and new-build." },
      { name: "Architectural Millwork", slug: "architectural-millwork", description: "Site-specific millwork engineered for commercial and institutional interiors." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a libraries package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
    ],
    image: "/assets/sector-hero/libraries.jpg",
  },
  "corporate-offices": {
    heading: "Corporate Offices Millwork",
    description: "Reception, boardroom, workplace and executive-suite millwork for HQ fit-outs and tenant improvements.",
    about: "Head-office and tenant-improvement millwork built to project the client's brand — sequence-matched veneer feature walls, floating reception desks, boardrooms with integrated AV credenzas and executive-suite casework.\n\nWe coordinate directly with the interior designer, GC and AV integrator so what ships is what installs.",
    standards: [
      "AWMAC Custom to Premium grade",
      "ADA / CSA B651 / AODA reception and touchdown compliance",
      "CARB Phase 2 / TSCA Title VI · WELL Building Standard v2 X07",
    ],
    features: [
      "Reception desks and lobby feature walls",
      "Sequence-matched veneer boardroom paneling",
      "Executive office built-ins and credenzas",
      "Café / touchdown / phone-booth millwork",
      "Wellness room, mother's room, prayer-room millwork",
      "Reprographics and workroom casework",
      "Signage-integrated feature walls",
    ],
    whyChoose: [
      {
        title: "Design-assist from schematic",
        description: "We join at 50% DD to value-engineer the feature walls before they hit the CD set.",
      },
      {
        title: "AV & IT coordination",
        description: "Cable pathways, floor-box cutouts and monitor blocking coordinated on the shop drawings.",
      },
      {
        title: "Live-tenant install",
        description: "After-hours install for occupied floors — a Sandha standard, not an upcharge.",
      },
    ],
    services: [
      { name: "Corporate, Bank & Institutional Millwork", slug: "corporate-institutional-millwork", description: "One millwork partner for banks, offices, libraries and every professional workplace." },
      { name: "Architectural Millwork", slug: "architectural-millwork", description: "Site-specific millwork engineered for commercial and institutional interiors." },
      { name: "Millwork Shop Drawings & Engineering", slug: "shop-drawings-engineering", description: "In-house millwork drawing and engineering — from redlines to CNC-ready production files." },
      { name: "In-House Finishing Department", slug: "finishing-paint", description: "Sanding → Cefla robotic flatline → manual booths → Sunspot dry room. Strictly for our own millwork." },
    ],
    cta: {
      heading: "Ready to price a corporate offices package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
      { name: "Financial Institutions", slug: "financial-institutions" },
    ],
    image: "/assets/sector-hero/corporate-offices.jpg",
  },
  "commercial-interiors": {
    heading: "Commercial Interiors Millwork",
    description: "Turnkey millwork packages for tenant fit-outs, interior-design programs and design-build teams.",
    about: "Turnkey commercial-interior millwork packages — reception, meeting rooms, café, wellness and feature paneling — delivered for interior designers, design-build teams and GCs on tenant-improvement schedules.\n\nOne accountable millwork partner from schematic design through 12-month warranty walk.",
    standards: [
      "AWMAC Custom to Premium grade",
      "ADA / AODA / CSA B651",
      "WELL Building Standard v2 X07 · LEED v4/v4.1 MR/EQ",
    ],
    features: [
      "Reception desks and lobby paneling",
      "Meeting rooms and boardroom credenzas",
      "Café, kitchenette and touchdown millwork",
      "Phone booth and huddle-room casework",
      "Wellness and mother's-room millwork",
      "Signage-integrated feature walls",
      "Reprographics and workroom casework",
    ],
    whyChoose: [
      {
        title: "Designer-friendly",
        description: "We work in the language of ID sets, not shop drawings — samples, elevations, story-boards on request.",
      },
      {
        title: "Design-assist available",
        description: "Value engineering at 50% DD to hit budget without losing the design intent.",
      },
      {
        title: "One-PM accountability",
        description: "Named PM at award, one phone number, one deficiency log through closeout.",
      },
    ],
    services: [
      { name: "Architectural Millwork", slug: "architectural-millwork", description: "Site-specific millwork engineered for commercial and institutional interiors." },
      { name: "Corporate, Bank & Institutional Millwork", slug: "corporate-institutional-millwork", description: "One millwork partner for banks, offices, libraries and every professional workplace." },
      { name: "Custom Residential Millwork", slug: "custom-cabinets", description: "Bespoke millwork and panelling for designer homes — not standard tender packages." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a commercial interiors package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
    ],
    image: "/assets/sector-hero/commercial-interiors.jpg",
  },
  "financial-institutions": {
    heading: "Financial Institutions Millwork",
    description: "Bank branches, credit unions, private-banking suites and financial-services fit-outs.",
    about: "Branch and private-banking millwork built to the financial institution's national brand standards — teller counters with integrated cash trays, private-banking booths, ATM surrounds and security-coordinated back-of-house casework.\n\nWe coordinate directly with security integrators for cash handling, alarm rough-in and video cabling.",
    standards: [
      "AWMAC Custom to Premium grade",
      "AODA / ADA teller-counter compliance",
      "ULC S102 / ASTM E84 Class A on public-area finishes",
    ],
    features: [
      "Teller counters with integrated cash trays and privacy screens",
      "Private-banking booths and consultation rooms",
      "ATM surrounds and vestibule millwork",
      "Reception, greeter and concierge desks",
      "Executive suites, boardroom paneling",
      "Signage-integrated feature walls",
      "Secure BOH cash-room casework",
    ],
    whyChoose: [
      {
        title: "Brand-standard repeatability",
        description: "Identical fixtures rolled out to dozens of branches, palletized and QR-coded by location.",
      },
      {
        title: "Security-integrator coordination",
        description: "Cash-tray, alarm, camera and biometric rough-in coordinated on the shop drawings.",
      },
      {
        title: "Financial-grade finish",
        description: "AWMAC Premium veneer with catalyzed polyurethane for daily wipe-down.",
      },
    ],
    services: [
      { name: "Corporate, Bank & Institutional Millwork", slug: "corporate-institutional-millwork", description: "One millwork partner for banks, offices, libraries and every professional workplace." },
      { name: "Architectural Millwork", slug: "architectural-millwork", description: "Site-specific millwork engineered for commercial and institutional interiors." },
      { name: "Custom Residential Millwork", slug: "custom-cabinets", description: "Bespoke millwork and panelling for designer homes — not standard tender packages." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a financial institutions package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
    ],
    image: "/assets/sector-hero/financial-institutions.jpg",
  },
  "government-public-buildings": {
    heading: "Government & Public Buildings Millwork",
    description: "Courthouses, transit hubs, municipal and federal buildings — long-life civic millwork.",
    about: "Long-life millwork engineered for federal, provincial and municipal buildings — judicial benches, transit-station millwork, service-counter runs and public-corridor paneling built to civic-grade codes and 30-year durability specs.\n\nWe are eligible for Controlled Goods Program (CGP) work and comply with civic procurement documentation requirements.",
    standards: [
      "AWMAC Premium grade (NAAWS 4.0)",
      "NBC / OBC / CSA B651 / AODA / ADA",
      "Controlled Goods Program (CGP)",
      "ULC S102 Class A on public paneling",
    ],
    features: [
      "Judicial benches, jury boxes, courtroom paneling",
      "Transit-station service counters and wayfinding",
      "Municipal service counters and permit desks",
      "Council-chamber millwork and dais",
      "Public-corridor wood paneling",
      "Secure records and evidence casework",
    ],
    whyChoose: [
      {
        title: "CGP-eligible",
        description: "Controlled Goods Program registered — able to handle federal secure-scope work.",
      },
      {
        title: "Civic-grade durability",
        description: "AWMAC Custom+ grade, Grade 1 hardware, 20+ year life-cycle spec.",
      },
      {
        title: "Full procurement compliance",
        description: "MERX / BuyandSell tender-ready documentation, CCDC contracts, bonding available.",
      },
    ],
    services: [
      { name: "Corporate, Bank & Institutional Millwork", slug: "corporate-institutional-millwork", description: "One millwork partner for banks, offices, libraries and every professional workplace." },
      { name: "Architectural Millwork", slug: "architectural-millwork", description: "Site-specific millwork engineered for commercial and institutional interiors." },
      { name: "Millwork Shop Drawings & Engineering", slug: "shop-drawings-engineering", description: "In-house millwork drawing and engineering — from redlines to CNC-ready production files." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a government & public buildings package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
    ],
    image: "/assets/sector-hero/government-public-buildings.jpg",
  },
  hospitality: {
    heading: "Hospitality Millwork",
    description: "Five-star hotel millwork: front-of-house, guest rooms, F&B, ballroom, spa and back-of-house.",
    about: "Whole-hotel millwork engineered from lobby to back-of-house — sequence and grain-matched veneer walls, coffered wood ceilings, guest-room headboards and wardrobes, minibars, executive-lounge millwork, ballroom paneling and BOH pantries.\n\nWe work with international hotel chains and offer long-term maintenance packages that keep the millwork on-brand between PIP cycles.",
    standards: [
      "AWMAC Premium finish grade on public-facing veneer",
      "ULC S102 / ASTM E84 Class A on lobby and corridor paneling",
      "Hotel-chain PIP (Product Improvement Plan) compliance",
    ],
    features: [
      "Lobby reception, portecochère and concierge millwork",
      "Sequence-matched veneer walls, coffered ceilings",
      "Guest-room headboards, wardrobes, minibars, desks",
      "Bathroom vanities, wet-zone millwork",
      "F&B host stands, back bars, restaurant banquettes",
      "Ballroom, meeting-room and executive-lounge paneling",
      "Spa, fitness and change-room millwork",
      "BOH pantries, service stations, admin",
    ],
    whyChoose: [
      {
        title: "PIP-standard finishing",
        description: "AWMAC Premium finish on all public-facing veneer, brand-standard stains and laminates per hotel-chain PIP.",
      },
      {
        title: "Certified supply-chain integration",
        description: "Fire-rated doors and other specialty scopes supplied through audited certified partners while Sandha holds AWMAC, CKCA, WMCO and ISO 9001 in-house.",
      },
      {
        title: "Long-term maintenance program",
        description: "Scheduled inspections, touch-up and PIP-cycle refurbishment available on every hotel package.",
      },
    ],
    services: [
      { name: "Hospitality Millwork", slug: "hospitality-millwork", description: "Premium-grade architectural millwork for luxury and full-service hotels." },
      { name: "Architectural Millwork", slug: "architectural-millwork", description: "Site-specific millwork engineered for commercial and institutional interiors." },
      { name: "In-House Finishing Department", slug: "finishing-paint", description: "Sanding → Cefla robotic flatline → manual booths → Sunspot dry room. Strictly for our own millwork." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a hospitality package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
      { name: "Financial Institutions", slug: "financial-institutions" },
    ],
    image: "/assets/sector-hero/hospitality.jpg",
  },
  "restaurants-qsr": {
    heading: "Restaurants & QSR Millwork",
    description: "FOH, BOH and brand-standard fixture packages for restaurant chains and independents.",
    about: "Full turnkey restaurant and QSR build-outs — feature ceilings, custom bars, banquettes, cane-panel screens, wine displays, service stations, POS surrounds and BOH prep casework.\n\nWe manage the whole restaurant package under one PM, from millwork to stainless integration to install.",
    standards: [
      "AWMAC Custom to Premium grade",
      "NSF ANSI 2 & 51 on food-contact surfaces where applicable",
      "OBC food-service millwork provisions",
    ],
    features: [
      "Bars, back-bars, wine walls",
      "Banquettes, booth seating, arched portals",
      "Feature ceilings, bulkheads, cane-panel screens",
      "Host stands, POS surrounds",
      "Menu boards, illuminated signage backing",
      "Retail merchandising fixtures",
      "BOH prep counters, service stations",
      "Washroom vanities and stalls",
    ],
    whyChoose: [
      {
        title: "Turnkey build-out",
        description: "Millwork + stainless + service counter + signage backing + banquettes + BOH prep under one contract.",
      },
      {
        title: "Fast rollout capable",
        description: "Prototype-to-multi-location model tested with QSR chains.",
      },
      {
        title: "Recent restaurant record",
        description: "Mercato, Coffee Island, Scooped by Demetres — see portfolio.",
      },
    ],
    services: [
      { name: "Restaurant & QSR Millwork", slug: "restaurant-qsr-millwork", description: "Two organized scopes: bespoke full-service restaurants, and rollout-ready QSR programs." },
      { name: "Architectural Millwork", slug: "architectural-millwork", description: "Site-specific millwork engineered for commercial and institutional interiors." },
      { name: "Custom Residential Millwork", slug: "custom-cabinets", description: "Bespoke millwork and panelling for designer homes — not standard tender packages." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a restaurants & qsr package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Financial Institutions", slug: "financial-institutions" },
    ],
    image: "/assets/sector-hero/restaurants-qsr.jpg",
  },
  retail: {
    heading: "Retail Millwork",
    description: "Brand-consistent fixtures and store build-outs manufactured for national and multi-site rollouts.",
    about: "From flagship stores to national rollouts, we manufacture retail millwork that reproduces the brand standard store-to-store — wall systems, gondolas, cash wraps, display casework and feature ceilings.\n\nMulti-site rollouts are palletized store-by-store with a manifest and QR-coded install kit.",
    standards: [
      "AWMAC Custom grade or Brand Standard package",
      "ULC S102 / ASTM E84 Class A on public-area finishes",
      "Grade 1 BHMA hardware on high-touch fixtures",
    ],
    features: [
      "Storefront and portal millwork",
      "Cash-wrap counters, POS surrounds",
      "Wall systems, gondolas, slat-wall runs",
      "Custom display cases, jewellery vitrines",
      "Shoe walls, garment fixtures, denim tables",
      "Feature ceilings and bulkheads",
      "Fitting rooms and BOH casework",
    ],
    whyChoose: [
      {
        title: "Rollout-ready manufacturing",
        description: "Our CNC and finishing floor is scaled for identical-fixture repeatability across dozens of stores.",
      },
      {
        title: "Prototype-to-rollout program",
        description: "One prototype store, tolerance sheets, then repeatable delivery to the brand's PIP.",
      },
      {
        title: "Cross-border logistics",
        description: "Routine CUSMA shipments to US locations.",
      },
    ],
    services: [
      { name: "Retail Fixtures", slug: "retail-fixtures", description: "Rollout-ready fixtures produced with repeatable accuracy at scale." },
      { name: "Custom Residential Millwork", slug: "custom-cabinets", description: "Bespoke millwork and panelling for designer homes — not standard tender packages." },
      { name: "Delivery & Logistics", slug: "delivery-logistics", description: "Coordinated delivery for phased and multi-site rollouts." },
      { name: "CNC Machining Department", slug: "cnc-manufacturing", description: "Multi-axis CNC production for tight-tolerance components." },
    ],
    cta: {
      heading: "Ready to price a retail package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
      { name: "Financial Institutions", slug: "financial-institutions" },
    ],
    image: "/assets/sector-hero/retail.jpg",
  },
  "multi-residential": {
    heading: "Multi-Residential Millwork",
    description: "High-rise condo and rental-tower millwork: main-floor lobbies, amenity floors, and every unit.",
    about: "Whole-building millwork for high-rise residential — main-floor lobbies, concierge desks, mail rooms, elevator vestibules, amenity floors (party kitchens, co-working, theatre, fitness, pet spa), corridor wainscot and every in-suite kitchen, vanity, closet and media wall.\n\nOne accountable manufacturer for GCs and developers — no seam between the main-floor amenities and the unit-count millwork.",
    standards: [
      "AWMAC Custom grade on in-suite, Premium on main-floor",
      "OBC / NBC · Tarion / condo warranty coordination",
      "ULC S102 Class A on corridor paneling",
      "CARB Phase 2 / TSCA Title VI panels",
    ],
    features: [
      "Main-floor lobby, concierge, mail room",
      "Elevator vestibules and corridor paneling",
      "Amenity floors: kitchens, bars, co-working, theatre, pet spa, fitness",
      "Rooftop terrace bars and outdoor millwork",
      "In-suite kitchens, islands, pantries",
      "Bathroom vanities and linen towers",
      "Bedroom closets, walk-ins, laundry",
      "Media walls, entry benches, den built-ins",
    ],
    whyChoose: [
      {
        title: "Whole-building scope",
        description: "Public amenity + corridor + every unit under one supplier — a single QC standard from lobby to penthouse.",
      },
      {
        title: "Purchaser upgrade programs",
        description: "We run purchaser-upgrade portals — quartz, cabinetry, closet upgrades priced and delivered per unit.",
      },
      {
        title: "Unit-count manufacturing",
        description: "Our CNC and edge-banding capacity is sized for tower-scale kitchen and vanity runs on the developer's turnover schedule.",
      },
    ],
    services: [
      { name: "Multi-Residential Millwork", slug: "multi-residential-millwork", description: "One millwork division for the whole tower — lobby to penthouse." },
      { name: "Custom Residential Millwork", slug: "custom-cabinets", description: "Bespoke millwork and panelling for designer homes — not standard tender packages." },
      { name: "Solid Surface & Glass", slug: "solid-surface-work", description: "Corian fabricated in-house, plus quartz, granite, marble and architectural glass — coordinated as one interior-millwork package." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a multi-residential package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
    ],
    image: "/assets/sector-hero/multi-residential.jpg",
  },
  "community-recreation": {
    heading: "Community & Recreation Centres Millwork",
    description: "Rec centres, YMCAs, arenas and community facilities — durable millwork for high-traffic civic use.",
    about: "Community and rec-centre millwork built to survive a wet, chlorinated, multi-shift civic environment — lobby reception, wayfinding walls, change-room lockers, aquatic-facility casework, fitness-desk millwork and multipurpose-room built-ins.\n\nDelivered on municipal tender schedules with full procurement compliance.",
    standards: [
      "AWMAC Custom grade (NAAWS 4.0)",
      "NBC / OBC / CSA B651 / AODA",
      "Marine-grade construction in wet zones",
      "ULC S102 Class A on public paneling",
    ],
    features: [
      "Lobby reception, wayfinding walls, café millwork",
      "Change-room lockers and bench millwork (wet-rated)",
      "Aquatic-facility service counters",
      "Fitness/PT desks and program-room casework",
      "Multipurpose room built-ins and stage skirting",
      "Concession stands and arena BOH",
    ],
    whyChoose: [
      {
        title: "Wet-rated construction",
        description: "Marine-grade plywood and phenolic core in aquatic zones, six-side sealed with continuous edgeband.",
      },
      {
        title: "Civic tender-ready",
        description: "MERX / municipal procurement documentation, CCDC contracts, bonding available.",
      },
      {
        title: "Recent civic record",
        description: "Lake Country Co-op Leisure Centre and other municipal projects.",
      },
    ],
    services: [
      { name: "Corporate, Bank & Institutional Millwork", slug: "corporate-institutional-millwork", description: "One millwork partner for banks, offices, libraries and every professional workplace." },
      { name: "Custom Residential Millwork", slug: "custom-cabinets", description: "Bespoke millwork and panelling for designer homes — not standard tender packages." },
      { name: "Solid Surface & Glass", slug: "solid-surface-work", description: "Corian fabricated in-house, plus quartz, granite, marble and architectural glass — coordinated as one interior-millwork package." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price a community & recreation package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
    ],
    image: "/assets/sector-hero/community-recreation.jpg",
  },
  "cultural-civic": {
    heading: "Cultural & Civic Buildings Millwork",
    description: "Museums, galleries, performing-arts and civic buildings — feature millwork for landmark projects.",
    about: "Feature millwork for cultural landmarks — museum casework and gallery walls, performing-arts lobby paneling, back-of-house dressing rooms and box offices, and civic-building donor walls and ceremonial millwork.\n\nWe work directly with exhibit designers and specialty-lighting consultants.",
    standards: [
      "AWMAC Premium grade (NAAWS 4.0)",
      "Museum-conservator lighting/humidity specs",
      "ULC S102 Class A on public paneling",
    ],
    features: [
      "Museum display and vitrine casework",
      "Gallery wall systems and pedestal work",
      "Performing-arts lobby paneling and box office",
      "Dressing rooms and back-of-house casework",
      "Donor walls and ceremonial millwork",
      "Feature ceilings and acoustic panels",
    ],
    whyChoose: [
      {
        title: "Exhibit-designer coordination",
        description: "We fabricate to museum-conservator lighting and humidity specs.",
      },
      {
        title: "Premium-grade veneer capability",
        description: "Sequence and grain-matched veneer walls — the standard for landmark cultural buildings.",
      },
      {
        title: "Acoustic integration",
        description: "Slat-wood and perforated wood panels with acoustic backing coordinated with the consultant.",
      },
    ],
    services: [
      { name: "Architectural Millwork", slug: "architectural-millwork", description: "Site-specific millwork engineered for commercial and institutional interiors." },
      { name: "Corporate, Bank & Institutional Millwork", slug: "corporate-institutional-millwork", description: "One millwork partner for banks, offices, libraries and every professional workplace." },
      { name: "Custom & Assembly Department", slug: "custom-assembly", description: "In-house assembly line for high-volume casework plus a custom shop for the complex, one-of-one millwork." },
      { name: "In-House Finishing Department", slug: "finishing-paint", description: "Sanding → Cefla robotic flatline → manual booths → Sunspot dry room. Strictly for our own millwork." },
    ],
    cta: {
      heading: "Ready to price a cultural & civic package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
    ],
    image: "/assets/sector-hero/cultural-civic.jpg",
  },
  "industrial-manufacturing": {
    heading: "Industrial & Manufacturing Millwork",
    description: "Industrial office fit-outs, control rooms, plant-floor workstations and food/pharma processing millwork.",
    about: "Millwork for industrial and manufacturing facilities — plant-office fit-outs, quality-lab casework, control-room consoles, plant-floor workstations, cafeterias and food/pharma processing millwork.\n\nBuilt to the finish and durability spec of the industrial environment, from stainless BOH to phenolic lab tops.",
    standards: [
      "AWMAC Custom grade",
      "NSF ANSI 2 / 51 where food-contact",
      "OBC / NBC industrial-use provisions",
    ],
    features: [
      "Plant office and administration millwork",
      "QA/QC laboratory casework with phenolic tops",
      "Control-room curved consoles and screen walls",
      "Plant-floor supervisor workstations",
      "Employee cafeteria and locker-room millwork",
      "Food-processing millwork (NSF where required)",
      "Cleanroom-adjacent casework",
    ],
    whyChoose: [
      {
        title: "Heavy-duty spec",
        description: "Chemical-resistant laminate, phenolic tops, stainless where required, Grade 1 hardware — engineered for continuous shift use.",
      },
      {
        title: "Turnaround install",
        description: "Weekend and shutdown-window installs coordinated around production.",
      },
      {
        title: "One millwork partner across the plant",
        description: "Office + lab + cafeteria + BOH under one shop.",
      },
    ],
    services: [
      { name: "Custom Residential Millwork", slug: "custom-cabinets", description: "Bespoke millwork and panelling for designer homes — not standard tender packages." },
      { name: "Solid Surface & Glass", slug: "solid-surface-work", description: "Corian fabricated in-house, plus quartz, granite, marble and architectural glass — coordinated as one interior-millwork package." },
      { name: "Custom & Assembly Department", slug: "custom-assembly", description: "In-house assembly line for high-volume casework plus a custom shop for the complex, one-of-one millwork." },
      { name: "Installation Coordination", slug: "installation-coordination", description: "On-site coordination with your install trades." },
    ],
    cta: {
      heading: "Ready to price an industrial & manufacturing package?",
      description: "Send us your drawings. We'll return a line-item quote in one business day.",
    },
    otherSectors: [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Education", slug: "education" },
      { name: "Corporate Offices", slug: "corporate-offices" },
      { name: "Retail", slug: "retail" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Restaurants & QSR", slug: "restaurants-qsr" },
    ],
    image: "/assets/sector-hero/industrial-manufacturing.jpg",
  },
};

export const sectorDetailSlugs = Object.keys(sectorDetails);
