import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      sm: "py-[var(--spacing-section-sm)]",
      md: "py-[var(--spacing-section)]",
      lg: "py-[var(--spacing-section-lg)]",
      none: "",
    },
  },
  defaultVariants: { spacing: "md" },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div";
}

export function Section({
  className,
  spacing,
  as = "section",
  ...props
}: SectionProps) {
  const Comp = as;
  return (
    <Comp className={cn(sectionVariants({ spacing, className }))} {...props} />
  );
}
