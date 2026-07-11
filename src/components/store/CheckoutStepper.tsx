"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CheckoutStep } from "@/store/types/checkout";

const STEPS = [
  { step: 1 as CheckoutStep, label: "Shipping" },
  { step: 2 as CheckoutStep, label: "Delivery" },
  { step: 3 as CheckoutStep, label: "Payment" },
  { step: 4 as CheckoutStep, label: "Review" },
];

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
  className?: string;
}

export function CheckoutStepper({ currentStep, className }: CheckoutStepperProps) {
  return (
    <nav
      aria-label="Checkout steps"
      className={cn("relative flex items-center justify-between", className)}
    >
      {/* Progress track */}
      <div className="absolute inset-x-0 top-4 h-px bg-border" aria-hidden="true" />
      <div
        className="absolute top-4 h-px bg-foreground transition-all duration-500"
        style={{ left: 0, width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        aria-hidden="true"
      />

      {STEPS.map(({ step, label }) => {
        const done = currentStep > step;
        const active = currentStep === step;
        return (
          <div key={step} className="relative flex flex-col items-center gap-2">
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                done
                  ? "border-foreground bg-foreground text-cream"
                  : active
                    ? "border-foreground bg-foreground text-cream shadow-sm"
                    : "border-border bg-background text-muted-foreground",
              )}
              aria-current={active ? "step" : undefined}
            >
              {done ? <Check className="h-4 w-4" /> : step}
            </div>
            <span
              className={cn(
                "text-xs font-medium transition-colors",
                active ? "text-foreground" : done ? "text-foreground/70" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
