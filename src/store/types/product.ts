export type CategoryId =
  | "kitchen-cabinets"
  | "base-cabinets"
  | "wall-cabinets"
  | "corner-cabinets"
  | "tall-cabinets"
  | "pantry-cabinets"
  | "bathroom-vanities"
  | "closets"
  | "tv-units"
  | "office-cabinets"
  | "laundry-cabinets";

export type Material =
  | "Solid Maple"
  | "Solid Oak"
  | "Solid Walnut"
  | "Solid Birch"
  | "MDF"
  | "Plywood"
  | "Engineered Wood";

export type Finish =
  | "Natural"
  | "Stained Oak"
  | "Stained Walnut"
  | "Painted White"
  | "Painted Grey"
  | "Painted Blue"
  | "Gloss White"
  | "Matte Black"
  | "Cream"
  | "Charcoal";

export type Availability = "in-stock" | "made-to-order" | "out-of-stock";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "popular"
  | "top-rated";

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
  unit: "in" | "cm";
}

export interface ProductSpecification {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  subCategory?: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  dimensions: ProductDimensions;
  material: Material;
  finish: Finish;
  availability: Availability;
  SKU: string;
  images: string[];
  specifications: ProductSpecification;
  deliveryEstimate: string;
  stock: number;
  isNew?: boolean;
  isBestseller?: boolean;
  tags?: string[];
}

export interface Category {
  id: CategoryId;
  label: string;
  slug: string;
  description: string;
  parent?: CategoryId;
  image: string;
  productCount?: number;
}

export interface ProductFilters {
  category: CategoryId | null;
  priceRange: [number, number];
  materials: Material[];
  finishes: Finish[];
  availability: Availability[];
  minRating: number | null;
  sortBy: SortOption;
  searchQuery: string;
}

export interface SearchState {
  query: string;
  history: string[];
  isOpen: boolean;
}
