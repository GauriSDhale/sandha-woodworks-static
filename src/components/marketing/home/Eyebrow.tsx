import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowVariant = "default" | "brand" | "cream" | "creamMuted";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  variant?: EyebrowVariant;
  id?: string;
}

const variantClasses: Record<EyebrowVariant, string> = {
  default: "text-muted-foreground",
  brand: "text-brand",
  cream: "text-cream/70",
  creamMuted: "text-cream/55",
};

export function Eyebrow({ children, className, variant = "brand", id }: EyebrowProps) {
  return (
    <p id={id} className={cn("type-eyebrow", variantClasses[variant], className)}>
      {children}
    </p>
  );
}
