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
  cream: "text-cream/60",
  creamMuted: "text-cream/50",
};

export function Eyebrow({ children, className, variant = "brand", id }: EyebrowProps) {
  return (
    <p
      id={id}
      className={cn(
        "text-xs font-semibold tracking-wide sm:text-sm",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </p>
  );
}
