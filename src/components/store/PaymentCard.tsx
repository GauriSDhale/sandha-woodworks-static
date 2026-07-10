"use client";

import { CreditCard, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentCardProps {
  provider: "razorpay" | "stripe" | "paypal";
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const PROVIDER_META = {
  razorpay: {
    label: "Razorpay",
    description: "Pay securely with card, UPI, net banking & more",
    badge: "Recommended",
    badgeColor: "bg-emerald-100 text-emerald-700",
    icon: "💳",
  },
  stripe: {
    label: "Stripe",
    description: "International cards — Visa, Mastercard, Amex",
    badge: "Coming soon",
    badgeColor: "bg-muted text-muted-foreground",
    icon: "🌐",
  },
  paypal: {
    label: "PayPal",
    description: "Pay with your PayPal balance or linked card",
    badge: "Coming soon",
    badgeColor: "bg-muted text-muted-foreground",
    icon: "🅿️",
  },
} as const;

export function PaymentCard({ provider, selected, onSelect, disabled }: PaymentCardProps) {
  const meta = PROVIDER_META[provider];

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all",
        selected
          ? "border-foreground bg-foreground/5 shadow-sm"
          : "border-border hover:border-foreground/30",
        disabled && "pointer-events-none opacity-40",
      )}
    >
      <span className="text-2xl" aria-hidden="true">{meta.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">{meta.label}</span>
          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", meta.badgeColor)}>
            {meta.badge}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{meta.description}</p>
      </div>
      <div
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 transition-all",
          selected
            ? "border-foreground bg-foreground"
            : "border-border",
        )}
        aria-hidden="true"
      />
    </button>
  );
}

export function PaymentSecurityBadge() {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
      <Shield className="h-4 w-4 shrink-0 text-emerald-600" />
      <span>All transactions are secured with 256-bit SSL encryption.</span>
    </div>
  );
}
