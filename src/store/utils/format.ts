/** Format a price in CAD */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Calculate discount percentage */
export function discountPercent(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100);
}

/** Generate a short random order number */
export function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SW-${ts}-${rnd}`;
}

/** Generate a random UUID (client-side fallback) */
export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/** Capitalize first letter of each word */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

const AVAILABILITY_FALLBACK: Record<string, string> = {
  "in-stock": "In Stock",
  "made-to-order": "Made to Order",
  "out-of-stock": "Out of Stock",
};

/** Map availability status to an i18n key under the `store` namespace. */
export function availabilityI18nKey(status: string): string {
  switch (status) {
    case "in-stock":
      return "availability.inStock";
    case "made-to-order":
      return "availability.madeToOrder";
    case "out-of-stock":
      return "availability.outOfStock";
    default:
      return status;
  }
}

/**
 * Format availability label.
 * Pass `t` from `useTranslation("store")` so labels follow the active language.
 */
export function availabilityLabel(
  status: string,
  t?: (key: string) => string,
): string {
  const key = availabilityI18nKey(status);
  if (t && key.startsWith("availability.")) {
    return t(key);
  }
  return AVAILABILITY_FALLBACK[status] ?? status;
}

/** Format date */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
