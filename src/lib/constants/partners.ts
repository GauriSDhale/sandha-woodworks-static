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
      { name: "Best Buy", file: "bestbuy.ca.svg" },
      { name: "Hudson's Bay", file: "thebay.com.svg" },
      { name: "Old Navy", file: "oldnavy.ca.svg" },
      { name: "KitchenAid", file: "kitchenaid.com.svg" },
      { name: "Mobile Klinik", file: "mobileklinik.ca.png" },
    ],
  },
  {
    id: "restaurants",
    reverse: true,
    durationSec: 42,
    logos: [
      { name: "McDonald's", file: "mcdonalds.com.svg" },
      { name: "Wendy's", file: "wendys.com.svg" },
      { name: "Harvey's", file: "harveys.ca.png" },
      { name: "Kelseys", file: "kelseys.ca.svg" },
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
      { name: "TD Bank", file: "td.com.svg" },
      { name: "Scotiabank", file: "scotiabank.com.svg" },
      { name: "BMO", file: "bmo.com.svg" },
      { name: "CIBC", file: "cibc.com.png" },
      { name: "RBC", file: "rbc.com.svg" },
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
