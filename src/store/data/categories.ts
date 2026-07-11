import type { Category } from "../types/product";

export const categories: Category[] = [
  {
    id: "kitchen-cabinets",
    label: "Kitchen Cabinets",
    slug: "kitchen-cabinets",
    description:
      "Premium custom kitchen cabinetry crafted in our Brantford facility. Designed for Canadian homes with precision engineering.",
    image: "/assets/products/kitchen/category-kitchen.jpg",
  },
  {
    id: "base-cabinets",
    label: "Base Cabinets",
    slug: "base-cabinets",
    description: "Sturdy base cabinets that form the foundation of your kitchen.",
    parent: "kitchen-cabinets",
    image: "/assets/products/kitchen/category-base.jpg",
  },
  {
    id: "wall-cabinets",
    label: "Wall Cabinets",
    slug: "wall-cabinets",
    description: "Space-saving wall-mounted cabinets to maximize kitchen storage.",
    parent: "kitchen-cabinets",
    image: "/assets/products/kitchen/category-wall.jpg",
  },
  {
    id: "corner-cabinets",
    label: "Corner Cabinets",
    slug: "corner-cabinets",
    description: "Intelligent corner cabinet solutions that eliminate wasted space.",
    parent: "kitchen-cabinets",
    image: "/assets/products/kitchen/category-corner.jpg",
  },
  {
    id: "tall-cabinets",
    label: "Tall Cabinets",
    slug: "tall-cabinets",
    description: "Full-height cabinets for maximum vertical storage.",
    parent: "kitchen-cabinets",
    image: "/assets/products/kitchen/category-tall.jpg",
  },
  {
    id: "pantry-cabinets",
    label: "Pantry Cabinets",
    slug: "pantry-cabinets",
    description: "Dedicated pantry storage systems for organized kitchens.",
    parent: "kitchen-cabinets",
    image: "/assets/products/kitchen/category-pantry.jpg",
  },
  {
    id: "bathroom-vanities",
    label: "Bathroom Vanities",
    slug: "bathroom-vanities",
    description:
      "Elegant bathroom vanity cabinets combining function with luxury aesthetics.",
    image: "/assets/products/vanity/category-vanity.jpg",
  },
  {
    id: "closets",
    label: "Closets & Wardrobes",
    slug: "closets",
    description: "Custom closet and wardrobe systems tailored to your space.",
    image: "/assets/products/closets/category-closets.jpg",
  },
  {
    id: "tv-units",
    label: "TV Units",
    slug: "tv-units",
    description: "Modern entertainment and TV unit solutions for living spaces.",
    image: "/assets/products/tv-units/category-tv.jpg",
  },
  {
    id: "office-cabinets",
    label: "Office Cabinets",
    slug: "office-cabinets",
    description: "Professional office cabinet systems for productive work environments.",
    image: "/assets/products/office/category-office.jpg",
  },
  {
    id: "laundry-cabinets",
    label: "Laundry Cabinets",
    slug: "laundry-cabinets",
    description: "Durable, moisture-resistant laundry room cabinet solutions.",
    image: "/assets/products/laundry/category-laundry.jpg",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getTopLevelCategories(): Category[] {
  return categories.filter((c) => !c.parent);
}

export function getChildCategories(parentId: string): Category[] {
  return categories.filter((c) => c.parent === parentId);
}
