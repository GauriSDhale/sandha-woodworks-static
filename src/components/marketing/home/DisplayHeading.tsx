import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingSize = "sm" | "md" | "lg" | "hero";
type HeadingTone = "dark" | "light";

interface DisplayHeadingProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: HeadingSize;
  tone?: HeadingTone;
}

const sizeClasses: Record<HeadingSize, string> = {
  sm: "text-3xl leading-[1.1] sm:text-4xl md:text-5xl",
  md: "text-3xl leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl",
  lg: "text-[13vw] leading-[0.92] sm:text-6xl md:text-7xl lg:text-[7rem]",
  hero: "text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl",
};

const toneClasses: Record<HeadingTone, string> = {
  dark: "text-warm-black",
  light: "text-cream",
};

export function DisplayHeading({
  as: Component = "h2",
  children,
  className,
  size = "md",
  tone = "dark",
}: DisplayHeadingProps) {
  return (
    <Component
      className={cn("font-display font-semibold", sizeClasses[size], toneClasses[tone], className)}
    >
      {children}
    </Component>
  );
}

interface DisplayHeadingAccentProps {
  children: ReactNode;
  className?: string;
}

export function DisplayHeadingAccent({ children, className }: DisplayHeadingAccentProps) {
  return <span className={cn("text-brand", className)}>{children}</span>;
}
