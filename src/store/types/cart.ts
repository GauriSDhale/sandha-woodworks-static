export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  SKU: string;
  category: string;
}

export interface Coupon {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder?: number;
}

export interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  isDrawerOpen: boolean;
}

export const VALID_COUPONS: Coupon[] = [
  { code: "SANDHA10", type: "percentage", value: 10, minOrder: 500 },
  { code: "WELCOME15", type: "percentage", value: 15, minOrder: 1000 },
  { code: "SAVE200", type: "fixed", value: 200, minOrder: 2000 },
];
