export interface SubSector {
  name: string;
  slug: string;
  description: string;
  portfolioPdf?: string;
}

export interface RelatedSector {
  name: string;
  slug: string;
  description: string;
}

export interface MarketDetail {
  overview: string;
  overviewBullets: string[];
  subSectors: SubSector[];
  relatedSectors: RelatedSector[];
  image: string;
}

export const sectors = [
  {
    id: "healthcare",
    number: "01",
    label: "Market",
    title: "Healthcare",
    description:
      "Hospital-grade millwork for every clinical, care and wellness environment.",
    subSectors: 7,
    href: "/markets/healthcare",
    image: "/assets/sectors/healthcare.jpg",
  },
  {
    id: "education",
    number: "02",
    label: "Market",
    title: "Education",
    description:
      "K-12, post-secondary and lifelong-learning millwork built for a 20+ year life-cycle.",
    subSectors: 7,
    href: "/markets/education",
    image: "/assets/sectors/education.jpg",
  },
  {
    id: "commercial",
    number: "03",
    label: "Market",
    title: "Commercial & Workplace",
    description:
      "Corporate, civic and financial fit-outs — reception through boardroom.",
    subSectors: 6,
    href: "/markets/commercial",
    image: "/assets/sectors/commercial.jpg",
  },
  {
    id: "hospitality",
    number: "04",
    label: "Market",
    title: "Hospitality & Food Service",
    description:
      "Hotels, restaurants, QSR and entertainment venues — turnkey FOH and BOH millwork.",
    subSectors: 7,
    href: "/markets/hospitality",
    image: "/assets/sectors/hospitality.jpg",
  },
  {
    id: "retail",
    number: "05",
    label: "Market",
    title: "Retail & Consumer",
    description:
      "Brand-consistent fixtures and store build-outs for national and multi-site rollouts.",
    subSectors: 7,
    href: "/markets/retail",
    image: "/assets/sectors/retail.jpg",
  },
  {
    id: "residential",
    number: "06",
    label: "Market",
    title: "Residential",
    description:
      "High-rise condo, rental and purpose-built rental — lobbies, amenity floors and every unit.",
    subSectors: 5,
    href: "/markets/residential",
    image: "/assets/sectors/residential.jpg",
  },
  {
    id: "public",
    number: "07",
    label: "Market",
    title: "Public & Community",
    description:
      "Community centres, libraries, museums and religious buildings — civic-grade millwork.",
    subSectors: 7,
    href: "/markets/public",
    image: "/assets/sectors/public-community.jpg",
  },
  {
    id: "specialty",
    number: "08",
    label: "Market",
    title: "Specialty Projects",
    description:
      "Custom architectural millwork, industrial, transit and one-of-a-kind builds.",
    subSectors: 5,
    href: "/markets/specialty",
    image: "/assets/sectors/specialty.jpg",
  },
] as const;

export const navSectorLinks = sectors.map((sector) => ({
  id: sector.id,
  href: sector.href,
  label: sector.title,
}));

export const sectorApprovals = [
  "General contractors & construction managers",
  "Developers & multi-res owner groups",
  "Architects & interior designers",
  "Healthcare, school-board & municipal procurement",
] as const;

export const marketDetails: Record<string, MarketDetail> = {
  healthcare: {
    overview: "From acute-care hospitals to long-term care and senior wellness communities, we deliver infection-control-ready millwork engineered for the codes, cleanability and life-cycle demands of healthcare.",
    overviewBullets: [
      "IPAC / ICRA-aware manufacturing and install for live patient environments.",
      "Disinfect-safe finishes tested against hospital chemistry.",
      "Whole-facility scope: public wood, clinical HPL, solid-surface and BOH stainless.",
    ],
    image: "/assets/sectors/healthcare.jpg",
    subSectors: [
      { name: "Hospitals", slug: "hospitals", description: "Acute-care millwork engineered for infection control, chemical wipe-down and live-site install. Delivered on live hospital sites across Ontario and the northeastern United States.", portfolioPdf: "/capability-pdf/sub-sector/hospitals" },
      { name: "Medical Clinics", slug: "medical-clinics", description: "Walk-in, family-health-team, dental and specialty-clinic millwork — clean, warm, cleanable. Family-health teams, private practices and multi-location dental groups.", portfolioPdf: "/capability-pdf/sub-sector/medical-clinics" },
      { name: "Laboratories", slug: "laboratories", description: "Chemical-resistant lab casework, workstations and research fit-outs for wet, dry and analytical labs. Wet-lab, dry-lab and analytical fit-outs for hospital, university and private research clients.", portfolioPdf: "/capability-pdf/sub-sector/laboratories" },
      { name: "Long-Term Care", slug: "long-term-care", description: "Resident-scale millwork — warm finishes, accessible fixtures, and daily-cleanable durability. Ministry-of-Health LTC redevelopments and private-operator new builds across Ontario.", portfolioPdf: "/capability-pdf/sub-sector/long-term-care" },
      { name: "Senior Living", slug: "senior-living", description: "Independent-living and premium retirement-community millwork — residential warmth, hospitality craft. Branded retirement chains and independent-operator premium communities.", portfolioPdf: "/capability-pdf/sub-sector/senior-living" },
      { name: "Retirement Communities", slug: "retirement-communities", description: "Full-campus millwork packages for multi-building retirement communities. Master-planned retirement campuses across Canada.", portfolioPdf: "/capability-pdf/sub-sector/retirement-communities" },
      { name: "Assisted Living", slug: "assisted-living", description: "Assisted-living millwork — accessible, warm and quietly clinical. Assisted-living residences and continuing-care communities.", portfolioPdf: "/capability-pdf/sub-sector/assisted-living" },
    ],
    relatedSectors: [
      { name: "Healthcare", slug: "healthcare", description: "Hospital-grade millwork engineered for infection control, water resistance and low-disturbance install in live patient environments." },
      { name: "Senior Living", slug: "senior-living", description: "Retirement, assisted living and long-term care millwork — hospitality warmth with healthcare durability." },
    ],
  },
  education: {
    overview: "Approved on Ontario school-board and college vendor lists — we deliver classroom, lab, library and learning-space millwork sized for the summer construction window.",
    overviewBullets: [
      "School-board and post-secondary vendor-approved.",
      "Summer-window phased delivery and swing-space install.",
      "Grade 1 hardware, impact-rated edges, cleanable finishes.",
    ],
    image: "/assets/sectors/education.jpg",
    subSectors: [
      { name: "Schools", slug: "schools", description: "K-12 casework built for a 20-year classroom lifecycle and an 8-week summer window. Ontario public school boards and Massachusetts K-12 builds.", portfolioPdf: "/capability-pdf/sub-sector/schools" },
      { name: "Colleges", slug: "colleges", description: "Applied-learning millwork — trades bays, teaching kitchens, health-sim and classrooms. Recent work at Niagara College (Marotta Family Innovation Complex).", portfolioPdf: "/capability-pdf/sub-sector/colleges" },
      { name: "Universities", slug: "universities", description: "Research-grade university millwork — labs, libraries, studios and admin fit-outs. Recent work at the University of Toronto Robarts Library Study Commons.", portfolioPdf: "/capability-pdf/sub-sector/universities" },
      { name: "Libraries", slug: "libraries", description: "Public, academic and specialty library millwork — circulation, stacks, study, story-time. Recent work at Valley Park Library, Hamilton and U of T Robarts Library.", portfolioPdf: "/capability-pdf/sub-sector/libraries" },
      { name: "Daycares", slug: "daycares", description: "Child-safe daycare millwork — soft-close, captive hardware, cleanable finishes. Municipal and independent licensed daycare operators.", portfolioPdf: "/capability-pdf/sub-sector/daycares" },
      { name: "Learning Centres", slug: "learning-centres", description: "Tutoring, after-school and enrichment-centre millwork — flexible, brand-consistent, kid-safe. Multi-location learning-centre franchises.", portfolioPdf: "/capability-pdf/sub-sector/learning-centres" },
      { name: "Training Facilities", slug: "training-facilities", description: "Corporate and trades training millwork — classrooms, sim-labs and hands-on bays. Corporate, union and government training facilities.", portfolioPdf: "/capability-pdf/sub-sector/training-facilities" },
    ],
    relatedSectors: [
      { name: "Education", slug: "education", description: "Casework and millwork for universities, primary and secondary schools, labs, libraries and administration." },
      { name: "Libraries", slug: "libraries", description: "Public, academic and school library millwork — circulation desks, stacks, study carrels, program rooms." },
    ],
  },
  commercial: {
    overview: "Head-office, tenant-improvement and institutional workplace packages — feature walls, boardrooms, executive suites and civic service counters, coordinated with the designer, AV and security integrators.",
    overviewBullets: [
      "Design-assist from schematic through construction documents.",
      "Live-tenant / after-hours install for occupied floors.",
      "AV, IT and security-integrator coordination on the shop drawings.",
    ],
    image: "/assets/sectors/commercial.jpg",
    subSectors: [
      { name: "Corporate Offices", slug: "corporate-offices", description: "HQ, tower and tenant-improvement millwork — reception, boardroom, executive suites. Corporate HQ, tower fit-outs and multi-tenant TI projects.", portfolioPdf: "/capability-pdf/sub-sector/corporate-offices" },
      { name: "Commercial Interiors", slug: "commercial-interiors", description: "Multi-tenant TI and workplace millwork for downtown and suburban commercial buildings.", portfolioPdf: "/capability-pdf/sub-sector/commercial-interiors" },
      { name: "Financial Institutions", slug: "financial-institutions", description: "Bank branches, credit unions and private-banking suites — brand-standard, secure, repeatable.", portfolioPdf: "/capability-pdf/sub-sector/financial-institutions" },
      { name: "Government Offices", slug: "government-offices", description: "Municipal, provincial and federal office fit-outs — long-life, compliance-driven.", portfolioPdf: "/capability-pdf/sub-sector/government-offices" },
      { name: "Civic Buildings", slug: "civic-buildings", description: "City halls, service centres and civic-landmark millwork — 30-year public-realm durability.", portfolioPdf: "/capability-pdf/sub-sector/civic-buildings" },
      { name: "Professional Offices", slug: "professional-offices", description: "Law-firm, accounting and consulting-office millwork — refined, quiet, client-facing.", portfolioPdf: "/capability-pdf/sub-sector/professional-offices" },
    ],
    relatedSectors: [
      { name: "Corporate Offices", slug: "corporate-offices", description: "Reception, boardroom, workplace and executive-suite millwork for HQ fit-outs and tenant improvements." },
      { name: "Commercial Interiors", slug: "commercial-interiors", description: "Turnkey millwork packages for tenant fit-outs, interior-design programs and design-build teams." },
      { name: "Financial Institutions", slug: "financial-institutions", description: "Bank branches, credit unions, private-banking suites and financial-services fit-outs." },
      { name: "Government & Public Buildings", slug: "government-public-buildings", description: "Courthouses, transit hubs, municipal and federal buildings — long-life civic millwork." },
    ],
  },
  hospitality: {
    overview: "Whole-property packages from lobby to back-of-house — sequence-matched veneer walls, guest-room casework, bars, banquettes, feature ceilings and service stations, delivered on hospitality PIP standards.",
    overviewBullets: [
      "AWMAC Premium finish on public-facing veneer.",
      "One PM: millwork + stainless + service counters + banquettes.",
      "Fast prototype-to-rollout for multi-location chains.",
    ],
    image: "/assets/sectors/hospitality.jpg",
    subSectors: [
      { name: "Hotels", slug: "hotels", description: "Whole-hotel millwork — lobby, guest rooms, F&B and BOH under one PM. International hotel-chain and boutique-hotel packages.", portfolioPdf: "/capability-pdf/sub-sector/hotels" },
      { name: "Resorts", slug: "resorts", description: "Destination-resort millwork — hospitality craft with weather-graded outdoor detail. Destination ski, lake and beachfront resort projects.", portfolioPdf: "/capability-pdf/sub-sector/resorts" },
      { name: "Restaurants", slug: "restaurants", description: "Full-service restaurant millwork — bars, banquettes, hosts, feature ceilings, BOH prep. Recent work: Mercato Mississauga, Scooped by Demetres, Coffee Island Toronto.", portfolioPdf: "/capability-pdf/sub-sector/restaurants" },
      { name: "Quick Service Restaurants (QSR)", slug: "quick-service-restaurants", description: "Brand-standard QSR fixture packages — front counters, digital menus, BOH kitting. National QSR chain rollouts.", portfolioPdf: "/capability-pdf/sub-sector/quick-service-restaurants" },
      { name: "Cafés", slug: "cafes", description: "Espresso-bar and specialty-café millwork — pastry cases, coffee bars, retail merchandising.", portfolioPdf: "/capability-pdf/sub-sector/cafes" },
      { name: "Bars", slug: "bars", description: "Cocktail-bar, sports-bar and hotel-lounge millwork — the room's centre of gravity.", portfolioPdf: "/capability-pdf/sub-sector/bars" },
      { name: "Entertainment Venues", slug: "entertainment-venues", description: "Theatre-lobby, cinema, concert-venue and arcade millwork — durable, dramatic, brand-forward.", portfolioPdf: "/capability-pdf/sub-sector/entertainment-venues" },
    ],
    relatedSectors: [
      { name: "Hospitality", slug: "hospitality", description: "Five-star hotel millwork: front-of-house, guest rooms, F&B, ballroom, spa and back-of-house." },
      { name: "Restaurants & QSR", slug: "restaurants-qsr", description: "FOH, BOH and brand-standard fixture packages for restaurant chains and independents." },
    ],
  },
  retail: {
    overview: "From flagship stores to national rollouts — wall systems, cash wraps, display casework and specialty fixtures reproduced store-to-store on the brand PIP, palletized and QR-coded per location.",
    overviewBullets: [
      "CNC and finishing floor scaled for identical-fixture repeatability.",
      "Prototype-to-rollout with tolerance sheets and manifest.",
      "Cross-border logistics (CUSMA) to US locations.",
    ],
    image: "/assets/sectors/retail.jpg",
    subSectors: [
      { name: "Retail Stores", slug: "retail-stores", description: "Flagship and national-rollout store millwork — cash wraps, wall systems, feature displays. Recent work: Scooped by Demetres, AM Hair & Beauty.", portfolioPdf: "/capability-pdf/sub-sector/retail-stores" },
      { name: "Shopping Centres", slug: "shopping-centres", description: "Mall common-area, guest-services and food-court millwork. Enclosed-mall and lifestyle-centre common-area programs.", portfolioPdf: "/capability-pdf/sub-sector/shopping-centres" },
      { name: "Luxury Retail", slug: "luxury-retail", description: "Watch, jewellery and luxury-goods casework — museum-grade craft.", portfolioPdf: "/capability-pdf/sub-sector/luxury-retail" },
      { name: "Showrooms", slug: "showrooms", description: "Auto, appliance and home-goods showroom millwork — display-driven, brand-forward.", portfolioPdf: "/capability-pdf/sub-sector/showrooms" },
      { name: "Pharmacies", slug: "pharmacies", description: "Retail-pharmacy millwork — dispensing, consultation, front-store retail.", portfolioPdf: "/capability-pdf/sub-sector/pharmacies" },
      { name: "Grocery", slug: "grocery", description: "Full-format and specialty-grocery millwork — service counters, back-of-house, brand feature walls.", portfolioPdf: "/capability-pdf/sub-sector/grocery" },
      { name: "Convenience Stores", slug: "convenience-stores", description: "C-store fixture packages — front counters, coffee bars, cooler surrounds, fuel-forecourt kiosks.", portfolioPdf: "/capability-pdf/sub-sector/convenience-stores" },
    ],
    relatedSectors: [
      { name: "Retail", slug: "retail", description: "Brand-consistent fixtures and store build-outs manufactured for national and multi-site rollouts." },
    ],
  },
  residential: {
    overview: "Whole-building millwork for multi-residential — main-floor lobbies, amenity floors and every in-suite kitchen, vanity and closet. One accountable manufacturer from public spaces to penthouse.",
    overviewBullets: [
      "Public amenity + corridor + every unit under one supplier.",
      "Purchaser-upgrade portals for quartz, cabinetry and closets.",
      "Unit-count manufacturing on developer turnover schedules.",
    ],
    image: "/assets/sectors/residential.jpg",
    subSectors: [
      { name: "Multi-Residential", slug: "multi-residential", description: "High-rise millwork — lobbies, amenity floors and every unit under one manufacturer.", portfolioPdf: "/capability-pdf/sub-sector/multi-residential" },
      { name: "Apartments", slug: "apartments", description: "Purpose-built rental millwork — in-suite scope repeated at unit count.", portfolioPdf: "/capability-pdf/sub-sector/apartments" },
      { name: "Condominiums", slug: "condominiums", description: "Condo tower millwork — public amenities and every in-suite kitchen, vanity and closet.", portfolioPdf: "/capability-pdf/sub-sector/condominiums" },
      { name: "Student Housing", slug: "student-housing", description: "Purpose-built student accommodation millwork — in-suite and shared-amenity.", portfolioPdf: "/capability-pdf/sub-sector/student-housing" },
      { name: "Luxury Residential Common Areas", slug: "luxury-residential-common-areas", description: "Ultra-luxury tower lobbies, amenity floors and resident-lounge millwork.", portfolioPdf: "/capability-pdf/sub-sector/luxury-residential-common-areas" },
    ],
    relatedSectors: [
      { name: "Multi-Residential", slug: "multi-residential", description: "High-rise condo and rental-tower millwork: main-floor lobbies, amenity floors, and every unit." },
    ],
  },
  public: {
    overview: "Durable millwork for civic and community landmarks — rec centres, YMCAs, libraries, museums, cultural centres and places of worship, delivered under municipal procurement compliance.",
    overviewBullets: [
      "Wet-rated construction for aquatic and change-room environments.",
      "MERX / municipal tender-ready with CCDC contracts and bonding.",
      "Heritage-sensitive integration for landmark buildings.",
    ],
    image: "/assets/sectors/public-community.jpg",
    subSectors: [
      { name: "Community Centres", slug: "community-centres", description: "Multi-generational community-centre millwork — reception, program rooms, wet spaces.", portfolioPdf: "/capability-pdf/sub-sector/community-centres" },
      { name: "YMCA", slug: "ymca", description: "YMCA and Y-family facility millwork — welcome desks, program rooms, wet spaces.", portfolioPdf: "/capability-pdf/sub-sector/ymca" },
      { name: "Recreation Centres", slug: "recreation-centres", description: "Municipal-recreation millwork — arenas, fitness centres, aquatic complexes.", portfolioPdf: "/capability-pdf/sub-sector/recreation-centres" },
      { name: "Libraries", slug: "public-libraries", description: "Branch and central-library millwork — circulation, community programming, maker-spaces.", portfolioPdf: "/capability-pdf/sub-sector/public-libraries" },
      { name: "Museums", slug: "museums", description: "Museum-grade millwork — exhibit casework, artefact storage, reception and café.", portfolioPdf: "/capability-pdf/sub-sector/museums" },
      { name: "Cultural Centres", slug: "cultural-centres", description: "Community cultural, arts and multi-faith centre millwork.", portfolioPdf: "/capability-pdf/sub-sector/cultural-centres" },
      { name: "Religious Buildings", slug: "religious-buildings", description: "Church, mosque, temple and synagogue millwork — sanctuary, gathering, ceremonial detail.", portfolioPdf: "/capability-pdf/sub-sector/religious-buildings" },
    ],
    relatedSectors: [
      { name: "Community & Recreation Centres", slug: "community-recreation", description: "Rec centres, YMCAs, arenas and community facilities — durable millwork for high-traffic civic use." },
      { name: "Libraries", slug: "libraries", description: "Public, academic and school library millwork — circulation desks, stacks, study carrels, program rooms." },
      { name: "Cultural & Civic Buildings", slug: "cultural-civic", description: "Museums, galleries, performing-arts and civic buildings — feature millwork for landmark projects." },
    ],
  },
  specialty: {
    overview: "For projects that don't fit a category — custom architectural millwork, manufacturing plants, transit hubs, airport concessions and specialty fabrication.",
    overviewBullets: [
      "Heavy-duty spec: chemical-resistant laminate, phenolic tops, stainless.",
      "Turnaround install coordinated around production windows.",
      "CGP-eligible for federal secure-scope work.",
    ],
    image: "/assets/sectors/specialty.jpg",
    subSectors: [
      { name: "Custom Architectural Millwork", slug: "custom-architectural-millwork", description: "Bespoke architectural detail — feature walls, ceilings, staircases, one-off scope.", portfolioPdf: "/capability-pdf/sub-sector/custom-architectural-millwork" },
      { name: "Manufacturing Facilities", slug: "manufacturing-facilities", description: "Industrial-manufacturing millwork — office fronts, break-rooms, QA labs, training rooms.", portfolioPdf: "/capability-pdf/sub-sector/manufacturing-facilities" },
      { name: "Airports", slug: "airports", description: "Airport-concession, gate-agent and terminal millwork — 24/7 durability under public traffic.", portfolioPdf: "/capability-pdf/sub-sector/airports" },
      { name: "Transit", slug: "transit", description: "Transit-hub, station and terminal millwork — public-transit-grade durability.", portfolioPdf: "/capability-pdf/sub-sector/transit" },
      { name: "Special Projects", slug: "special-projects", description: "One-of-a-kind millwork — anything that doesn't fit a category.", portfolioPdf: "/capability-pdf/sub-sector/special-projects" },
    ],
    relatedSectors: [
      { name: "Industrial & Manufacturing", slug: "industrial-manufacturing", description: "Industrial office fit-outs, control rooms, plant-floor workstations and food/pharma processing millwork." },
      { name: "Cultural & Civic Buildings", slug: "cultural-civic", description: "Museums, galleries, performing-arts and civic buildings — feature millwork for landmark projects." },
    ],
  },
};
