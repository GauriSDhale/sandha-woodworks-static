import type { ShippingAddress, DeliveryMethod } from "./order";

export type CheckoutStep = 1 | 2 | 3 | 4;

export interface CheckoutState {
  step: CheckoutStep;
  shippingAddress: ShippingAddress | null;
  deliveryMethod: DeliveryMethod | null;
  paymentMethod: "razorpay" | "stripe" | "paypal" | null;
  isProcessing: boolean;
  error: string | null;
}
