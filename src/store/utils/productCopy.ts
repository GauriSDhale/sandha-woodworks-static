import type { TFunction } from "i18next";
import type { Product } from "@/store/types/product";

type CatalogGroup =
  | "materials"
  | "finishes"
  | "deliveries"
  | "specKeys"
  | "specValues"
  | "descriptions";

type CatalogT = TFunction<"storeCatalog">;

function lookup(t: CatalogT, group: CatalogGroup, key: string, fallback: string): string {
  const dict = t(group, { returnObjects: true });
  if (dict && typeof dict === "object" && !Array.isArray(dict) && key in dict) {
    const value = (dict as Record<string, unknown>)[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return fallback;
}

export type ProductLocalizedCopy = {
  description: string;
  material: string;
  finish: string;
  deliveryEstimate: string;
  specifications: Record<string, string>;
  warranty: string;
};

export function getProductLocalizedCopy(product: Product, t: CatalogT): ProductLocalizedCopy {
  const specifications = Object.fromEntries(
    Object.entries(product.specifications).map(([key, value]) => [
      lookup(t, "specKeys", key, key),
      lookup(t, "specValues", value, value),
    ]),
  );

  const warrantyRaw = product.specifications.Warranty;

  return {
    description: lookup(t, "descriptions", product.id, product.description),
    material: lookup(t, "materials", product.material, product.material),
    finish: lookup(t, "finishes", product.finish, product.finish),
    deliveryEstimate: lookup(
      t,
      "deliveries",
      product.deliveryEstimate,
      product.deliveryEstimate,
    ),
    specifications,
    warranty: warrantyRaw ? lookup(t, "specValues", warrantyRaw, warrantyRaw) : "",
  };
}

export type SampleReview = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

export function getSampleReviews(t: CatalogT): SampleReview[] {
  const reviews = t("sampleReviews", { returnObjects: true });
  if (!Array.isArray(reviews)) return [];
  return reviews.filter(
    (r): r is SampleReview =>
      !!r &&
      typeof r === "object" &&
      typeof (r as SampleReview).name === "string" &&
      typeof (r as SampleReview).date === "string" &&
      typeof (r as SampleReview).text === "string" &&
      typeof (r as SampleReview).rating === "number",
  );
}
