/**
 * Razorpay payment provider integration.
 *
 * Loads the Razorpay SDK dynamically (client-side only).
 * Replace RAZORPAY_KEY_ID with your actual key from the Razorpay Dashboard.
 *
 * Flow:
 *  1. Create order on your backend (or BFF) → receive razorpay_order_id
 *  2. Open Razorpay checkout popup with razorpay_order_id
 *  3. On success, verify signature server-side
 *  4. Store transaction details & generate invoice
 */

import type {
  PaymentProvider,
  CreateOrderPayload,
  PaymentResult,
} from "./types";

const RAZORPAY_KEY_ID =
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "rzp_test_placeholder";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open(): void;
  on(event: string, handler: () => void): void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

async function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (window.Razorpay) return true;

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export const razorpayProvider: PaymentProvider = {
  name: "razorpay",

  async initiatePayment(payload: CreateOrderPayload): Promise<PaymentResult> {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      return { success: false, error: "Failed to load payment gateway." };
    }

    return new Promise((resolve) => {
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: payload.amount, // in paise
        currency: payload.currency,
        name: "Sandha Woodworks",
        description: `Order #${payload.orderId}`,
        order_id: payload.orderId,
        prefill: {
          name: payload.customerName,
          email: payload.customerEmail,
          contact: payload.customerPhone,
        },
        theme: { color: "#C94030" }, // brand-red
        handler(response: RazorpayResponse) {
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss() {
            resolve({ success: false, error: "Payment cancelled by user." });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        resolve({ success: false, error: "Payment failed." });
      });
      rzp.open();
    });
  },

  verifyPayment(result: PaymentResult): boolean {
    // Signature verification must be done server-side in production.
    // Here we check that all required fields are present.
    return !!(result.paymentId && result.orderId && result.signature);
  },
};
