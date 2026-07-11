import type { Product, ProductFilters } from "../types/product";
import { products } from "../data/products";

export function applyFilters(
  items: Product[],
  filters: ProductFilters,
): Product[] {
  let result = [...items];

  if (filters.category) {
    result = result.filter(
      (p) =>
        p.category === filters.category ||
        p.subCategory === filters.category,
    );
  }

  const [minPrice, maxPrice] = filters.priceRange;
  result = result.filter((p) => {
    const effective = p.discountPrice ?? p.price;
    return effective >= minPrice && effective <= maxPrice;
  });

  if (filters.materials.length > 0) {
    result = result.filter((p) => filters.materials.includes(p.material));
  }

  if (filters.finishes.length > 0) {
    result = result.filter((p) => filters.finishes.includes(p.finish));
  }

  if (filters.availability.length > 0) {
    result = result.filter((p) =>
      filters.availability.includes(p.availability),
    );
  }

  if (filters.minRating !== null) {
    result = result.filter((p) => p.rating >= (filters.minRating ?? 0));
  }

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q)),
    );
  }

  return sortProducts(result, filters.sortBy);
}

function sortProducts(items: Product[], sortBy: ProductFilters["sortBy"]): Product[] {
  const arr = [...items];
  switch (sortBy) {
    case "price-asc":
      return arr.sort(
        (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price),
      );
    case "price-desc":
      return arr.sort(
        (a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price),
      );
    case "popular":
      return arr.sort((a, b) => b.reviews - a.reviews);
    case "top-rated":
      return arr.sort((a, b) => b.rating - a.rating);
    case "newest":
    default:
      return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }
}

export function searchProducts(query: string, limit = 5): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q)),
    )
    .slice(0, limit);
}

export const POPULAR_SEARCHES = [
  "Kitchen cabinets",
  "Bathroom vanity",
  "Walk-in closet",
  "TV unit walnut",
  "White shaker base",
  "Office cabinet",
];
