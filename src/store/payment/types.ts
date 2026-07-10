/**
 * Payment Gateway Architecture
 *
 * Sandha Woodworks Store — Payment Provider Abstraction Layer
 *
 * Design: All providers implement the PaymentProvider interface.
 * Switching providers is a single-line change in getPaymentProvider().
 */

export type PaymentProviderName = "razorpay" | "stripe" | "paypal";

export interface CreateOrderPayload {
  amount: number; // in smallest currency unit (paise for Razorpay, cents for Stripe)
  currency: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

export interface PaymentProvider {
  name: PaymentProviderName;
  initiatePayment(payload: CreateOrderPayload): Promise<PaymentResult>;
  verifyPayment?(result: PaymentResult): boolean;
}
