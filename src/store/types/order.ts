import type { CartItem } from "./cart";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
}

export type DeliveryMethod = {
  id: string;
  label: string;
  description: string;
  price: number;
  estimatedDays: string;
};

/** Structural delivery options — labels/descriptions/estimatedDays resolve via `store.delivery.*`. */
export const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: "standard",
    label: "Standard Delivery",
    description: "Professional delivery & placement",
    price: 149,
    estimatedDays: "5–8 business days",
  },
  {
    id: "express",
    label: "Express Delivery",
    description: "Priority delivery & placement",
    price: 249,
    estimatedDays: "2–4 business days",
  },
  {
    id: "white-glove",
    label: "White Glove Service",
    description: "Premium delivery, assembly & removal of packaging",
    price: 399,
    estimatedDays: "3–5 business days (scheduled)",
  },
];

export function deliveryI18nKey(
  id: string,
  field: "label" | "description" | "estimatedDays",
): string {
  return `delivery.${id}.${field}`;
}

export interface OrderItem extends CartItem {
  subtotal: number;
}

export interface Transaction {
  id: string;
  provider: string;
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: "success" | "failed" | "refunded";
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  subtotal: number;
  gst: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  transaction?: Transaction;
  couponCode?: string;
  invoiceUrl?: string;
}
