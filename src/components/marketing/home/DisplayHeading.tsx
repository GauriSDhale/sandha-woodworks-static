import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingSize = "sm" | "md" | "lg" | "hero";
type HeadingTone = "dark" | "light";

interface DisplayHeadingProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: HeadingSize;
  tone?: HeadingTone;
  style?: CSSProperties;
}

const sizeClasses: Record<HeadingSize, string> = {
  sm: "text-3xl leading-[1.1] sm:text-4xl md:text-5xl",
  md: "text-3xl leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl",
  lg: "text-[clamp(2.5rem,9vw,7rem)] leading-[0.94] sm:leading-[0.92]",
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
  style,
}: DisplayHeadingProps) {
  return (
    <Component
      className={cn("font-display font-semibold", sizeClasses[size], toneClasses[tone], className)}
      style={style}
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
