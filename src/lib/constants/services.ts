/** Structural services data. Copy lives in src/locales/{en,fr}/services.json + serviceDetails.json */

export interface ServiceItem {
  slug: string;
  image: string;
}

export interface ServiceCategory {
  id: string;
  number: string;
  count: number;
  services: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    "id": "pre-construction",
    "number": "01",
    "count": 4,
    "services": [
      {
        "slug": "design-assist",
        "image": "/assets/services/design-assist.jpg"
      },
      {
        "slug": "budget-estimating",
        "image": "/assets/services/estimating.jpg"
      },
      {
        "slug": "value-engineering",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "constructability-review",
        "image": "/assets/services/constructability.jpg"
      }
    ]
  },
  {
    "id": "engineering",
    "number": "02",
    "count": 3,
    "services": [
      {
        "slug": "shop-drawings-engineering",
        "image": "/assets/services/shop-drawings.jpg"
      },
      {
        "slug": "3d-modeling",
        "image": "/assets/services/3d-modeling.jpg"
      },
      {
        "slug": "architect-consultant-coordination",
        "image": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&auto=format&fit=crop"
      }
    ]
  },
  {
    "id": "manufacturing",
    "number": "03",
    "count": 7,
    "services": [
      {
        "slug": "cnc-manufacturing",
        "image": "/assets/services/cnc.jpg"
      },
      {
        "slug": "custom-fabrication",
        "image": "/assets/services/custom-assembly.jpg"
      },
      {
        "slug": "finishing-paint",
        "image": "/assets/services/finishing.jpg"
      },
      {
        "slug": "solid-surface-work",
        "image": "/assets/services/solid-surface.jpg"
      },
      {
        "slug": "plastic-laminate-fabrication",
        "image": "/assets/services/laminate.jpg"
      },
      {
        "slug": "veneer-hardwood-fabrication",
        "image": "/assets/services/veneer.jpg"
      },
      {
        "slug": "metal-integration",
        "image": "/assets/services/metal.jpg"
      }
    ]
  },
  {
    "id": "sector-scopes",
    "number": "04",
    "count": 9,
    "services": [
      {
        "slug": "healthcare-millwork",
        "image": "/assets/services/healthcare.jpg"
      },
      {
        "slug": "retail-fixtures",
        "image": "/assets/services/retail.jpg"
      },
      {
        "slug": "hospitality-millwork",
        "image": "/assets/services/hospitality.jpg"
      },
      {
        "slug": "multi-residential-millwork",
        "image": "/assets/services/multi-res.jpg"
      },
      {
        "slug": "restaurant-qsr-millwork",
        "image": "/assets/services/restaurant-qsr.jpg"
      },
      {
        "slug": "pharmacy-clinic-millwork",
        "image": "/assets/services/pharmacy.jpg"
      },
      {
        "slug": "education-millwork",
        "image": "/assets/services/education.jpg"
      },
      {
        "slug": "corporate-institutional-millwork",
        "image": "/assets/services/corp-inst.jpg"
      },
      {
        "slug": "custom-cabinets",
        "image": "/assets/services/residential.jpg"
      }
    ]
  },
  {
    "id": "project-management",
    "number": "05",
    "count": 5,
    "services": [
      {
        "slug": "project-management",
        "image": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "scheduling",
        "image": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "procurement",
        "image": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "site-coordination",
        "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "quality-assurance",
        "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85&auto=format&fit=crop"
      }
    ]
  },
  {
    "id": "logistics",
    "number": "06",
    "count": 4,
    "services": [
      {
        "slug": "delivery-logistics",
        "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "packaging",
        "image": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "just-in-time-delivery",
        "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "site-logistics",
        "image": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&q=85&auto=format&fit=crop"
      }
    ]
  },
  {
    "id": "installation",
    "number": "07",
    "count": 4,
    "services": [
      {
        "slug": "installation-coordination",
        "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "site-supervision",
        "image": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "deficiency-management",
        "image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "project-closeout",
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85&auto=format&fit=crop"
      }
    ]
  },
  {
    "id": "warranty",
    "number": "08",
    "count": 4,
    "services": [
      {
        "slug": "warranty-support",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "maintenance-repairs",
        "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "future-renovations",
        "image": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=85&auto=format&fit=crop"
      },
      {
        "slug": "service-requests",
        "image": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&auto=format&fit=crop"
      }
    ]
  }
];

export interface ServiceDetailMeta {
  gallery?: string[];
}

/** Non-copy detail fields (images). Body copy is in serviceDetails locale JSON. */
export const serviceDetailMeta: Record<string, ServiceDetailMeta> = {
  "design-assist": {
    gallery: ["/assets/services/design-assist.jpg"],
  },
  "cnc-manufacturing": {
    gallery: ["/assets/services/cnc.jpg"],
  },
  "healthcare-millwork": {
    gallery: ["/assets/services/healthcare.jpg"],
  },
  "retail-fixtures": {
    gallery: ["/assets/services/retail-hero.jpg"],
  },
  "hospitality-millwork": {
    gallery: ["/assets/services/hospitality.jpg"],
  },
  "multi-residential-millwork": {
    gallery: ["/assets/services/multi-res.jpg"],
  },
  "restaurant-qsr-millwork": {
    gallery: ["/assets/services/restaurant-qsr.jpg"],
  },
  "pharmacy-clinic-millwork": {
    gallery: ["/assets/services/pharmacy.jpg"],
  },
  "education-millwork": {
    gallery: ["/assets/services/education.jpg"],
  },
  "corporate-institutional-millwork": {
    gallery: ["/assets/services/corp-inst.jpg"],
  },
  "custom-cabinets": {
    gallery: ["/assets/services/residential.jpg"],
  },
  "project-management": {
    gallery: ["/assets/services/estimating.jpg"],
  },
};

export interface SectorLink {
  slug: string;
  image: string;
}

export const servicesSectorLinks: SectorLink[] = [
  {
    "slug": "healthcare",
    "image": "/assets/services/healthcare.jpg"
  },
  {
    "slug": "education",
    "image": "/assets/services/education.jpg"
  },
  {
    "slug": "corporate-offices",
    "image": "/assets/services/corp-inst.jpg"
  },
  {
    "slug": "retail",
    "image": "/assets/services/retail-hero.jpg"
  },
  {
    "slug": "hospitality",
    "image": "/assets/services/hospitality.jpg"
  },
  {
    "slug": "restaurants-qsr",
    "image": "/assets/services/sector-restaurant.jpg"
  },
  {
    "slug": "financial-institutions",
    "image": "/assets/services/sector-financial.jpg"
  },
  {
    "slug": "government-public-buildings",
    "image": "/assets/services/sector-government.jpg"
  },
  {
    "slug": "multi-residential",
    "image": "/assets/services/multi-res.jpg"
  },
  {
    "slug": "senior-living",
    "image": "/assets/services/healthcare.jpg"
  },
  {
    "slug": "community-recreation",
    "image": "/assets/services/education.jpg"
  },
  {
    "slug": "libraries",
    "image": "/assets/services/sector-library.jpg"
  },
  {
    "slug": "cultural-civic",
    "image": "/assets/services/sector-cultural.jpg"
  },
  {
    "slug": "industrial-manufacturing",
    "image": "/assets/services/custom-assembly.jpg"
  },
  {
    "slug": "commercial-interiors",
    "image": "/assets/services/sector-commercial.jpg"
  }
];

export function getService(slug: string) {
  for (const cat of serviceCategories) {
    const service = cat.services.find((s) => s.slug === slug);
    if (service) return { service, category: cat };
  }
  return null;
}
