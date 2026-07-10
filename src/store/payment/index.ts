/**
 * Payment provider factory.
 * Swap the active provider here when adding Stripe or PayPal.
 */
import type { PaymentProvider, PaymentProviderName } from "./types";
import { razorpayProvider } from "./razorpay";

// Stub providers — implement when migrating
const stripeProvider: PaymentProvider = {
  name: "stripe",
  async initiatePayment() {
    return { success: false, error: "Stripe integration not yet configured." };
  },
};

const paypalProvider: PaymentProvider = {
  name: "paypal",
  async initiatePayment() {
    return { success: false, error: "PayPal integration not yet configured." };
  },
};

const providers: Record<PaymentProviderName, PaymentProvider> = {
  razorpay: razorpayProvider,
  stripe: stripeProvider,
  paypal: paypalProvider,
};

/** Returns the requested payment provider. Defaults to Razorpay. */
export function getPaymentProvider(
  name: PaymentProviderName = "razorpay",
): PaymentProvider {
  return providers[name];
}

export type { PaymentProvider, PaymentProviderName, CreateOrderPayload, PaymentResult } from "./types";
