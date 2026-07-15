"use client";

import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { CheckoutStep } from "@/store/types/checkout";

const STEP_KEYS = [
  { step: 1 as CheckoutStep, key: "shipping" },
  { step: 2 as CheckoutStep, key: "delivery" },
  { step: 3 as CheckoutStep, key: "payment" },
  { step: 4 as CheckoutStep, key: "review" },
] as const;

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
  className?: string;
}

export function CheckoutStepper({ currentStep, className }: CheckoutStepperProps) {
  const { t } = useTranslation("store");

  return (
    <nav
      aria-label={t("a11y.checkoutSteps")}
      className={cn("relative flex items-center justify-between", className)}
    >
      <div className="absolute inset-x-0 top-4 h-px bg-border" aria-hidden="true" />
      <div
        className="absolute top-4 h-px bg-foreground transition-all duration-500"
        style={{ left: 0, width: `${((currentStep - 1) / (STEP_KEYS.length - 1)) * 100}%` }}
        aria-hidden="true"
      />

      {STEP_KEYS.map(({ step, key }) => {
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
              {t(`checkout.steps.${key}`)}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
