import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionPadding = "none" | "default" | "large";

interface SectionContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  padding?: SectionPadding;
  id?: string;
}

const paddingClasses: Record<SectionPadding, string> = {
  none: "",
  default: "section-padding",
  large: "section-padding-lg",
};

export function SectionContainer({
  as: Component = "section",
  children,
  className,
  innerClassName,
  padding = "default",
  id,
}: SectionContainerProps) {
  return (
    <Component id={id} className={cn(paddingClasses[padding], className)}>
      <div className={cn("container-tight", innerClassName)}>{children}</div>
    </Component>
  );
}
