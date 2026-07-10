export type PartnerCategoryId = "retail" | "restaurants" | "financial" | "education";

export interface PartnerLogo {
  name: string;
  /** Local filename under /assets/partners/ */
  file: string;
}

export interface PartnerCategory {
  id: PartnerCategoryId;
  reverse: boolean;
  durationSec: number;
  logos: readonly PartnerLogo[];
}

export function partnerLogoSrc(file: string) {
  return `/assets/partners/${file}`;
}

export const partnerCategories: readonly PartnerCategory[] = [
  {
    id: "retail",
    reverse: false,
    durationSec: 30,
    logos: [
      { name: "Best Buy", file: "bestbuy.ca.png" },
      { name: "Hudson's Bay", file: "thebay.com.png" },
      { name: "Old Navy", file: "oldnavy.ca.png" },
      { name: "KitchenAid", file: "kitchenaid.com.png" },
      { name: "Mobile Klinik", file: "mobileklinik.ca.png" },
    ],
  },
  {
    id: "restaurants",
    reverse: true,
    durationSec: 42,
    logos: [
      { name: "McDonald's", file: "mcdonalds.com.png" },
      { name: "Wendy's", file: "wendys.com.png" },
      { name: "Harvey's", file: "harveys.ca.png" },
      { name: "Kelseys", file: "kelseys.ca.png" },
      { name: "BarBurrito", file: "barburrito.ca.png" },
      { name: "Coffee Island", file: "coffeeisland.com.png" },
      { name: "Mercatto", file: "mercatto.ca.png" },
    ],
  },
  {
    id: "financial",
    reverse: false,
    durationSec: 30,
    logos: [
      { name: "TD Bank", file: "td.com.png" },
      { name: "Scotiabank", file: "scotiabank.com.png" },
      { name: "BMO", file: "bmo.com.png" },
      { name: "CIBC", file: "cibc.com.png" },
      { name: "RBC", file: "rbc.com.png" },
    ],
  },
  {
    id: "education",
    reverse: true,
    durationSec: 30,
    logos: [
      { name: "Mohawk College", file: "mohawkcollege.ca.png" },
      { name: "Niagara College", file: "niagaracollege.ca.png" },
      { name: "University of Toronto", file: "utoronto.ca.png" },
      { name: "Hamilton-Wentworth DSB", file: "hwdsb.on.ca.png" },
      { name: "Toronto DSB", file: "tdsb.on.ca.png" },
    ],
  },
] as const;
