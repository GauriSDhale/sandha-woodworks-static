import type { Category } from "../types/product";

/** Structural category data only — labels/descriptions live in `store` locale JSON. */
export const categories: Category[] = [
  {
    id: "kitchen-cabinets",
    slug: "kitchen-cabinets",
    image: "/assets/subsectors/condominiums/2.jpg",
  },
  {
    id: "base-cabinets",
    slug: "base-cabinets",
    parent: "kitchen-cabinets",
    image: "/assets/subsectors/apartments/2.jpg",
  },
  {
    id: "wall-cabinets",
    slug: "wall-cabinets",
    parent: "kitchen-cabinets",
    image: "/assets/subsectors/apartments/3.jpg",
  },
  {
    id: "corner-cabinets",
    slug: "corner-cabinets",
    parent: "kitchen-cabinets",
    image:
      "/images/products/yl-wer2442_wall_easy_reach_corner_cabinet_24w_x_42h_2.webp",
  },
  {
    id: "tall-cabinets",
    slug: "tall-cabinets",
    parent: "kitchen-cabinets",
    image: "/images/products/28a212d6927e5c195147d5f32cfdb842.jpg",
  },
  {
    id: "pantry-cabinets",
    slug: "pantry-cabinets",
    parent: "kitchen-cabinets",
    image: "/images/products/81eu5pSon5L.jpg",
  },
  {
    id: "bathroom-vanities",
    slug: "bathroom-vanities",
    image: "/assets/subsectors/hotels/3.jpg",
  },
  {
    id: "closets",
    slug: "closets",
    image: "/assets/subsectors/hotels/2.jpg",
  },
  {
    id: "tv-units",
    slug: "tv-units",
    image: "/assets/subsectors/hotels/4.jpg",
  },
  {
    id: "office-cabinets",
    slug: "office-cabinets",
    image: "/assets/subsectors/professional-offices/1.jpg",
  },
  {
    id: "laundry-cabinets",
    slug: "laundry-cabinets",
    image: "/assets/subsectors/apartments/4.jpg",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id || c.slug === id);
}

export function getTopLevelCategories(): Category[] {
  return categories.filter((c) => !c.parent);
}

export function getChildCategories(parentId: string): Category[] {
  return categories.filter((c) => c.parent === parentId);
}
