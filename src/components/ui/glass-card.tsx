import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Flat, hard-edged card primitive (kept the historical `GlassCard` name to
 * avoid touching every call site — visually it's now a plain bordered card,
 * not glass). `strong` gives the dark ink-on-ink treatment used for feature
 * tiles and pricing highlights.
 */
const glassCardVariants = cva("relative shadow-card transition-all duration-200", {
  variants: {
    variant: {
      default: "bg-bg-raised border-t-[3px] border-brand-500",
      strong: "bg-ink text-fg-on-ink",
      plain: "bg-bg-raised",
    },
    hover: {
      true: "hover:-translate-y-1.5 hover:shadow-card-lg",
      false: "",
    },
  },
  defaultVariants: { variant: "default", hover: false },
});

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(glassCardVariants({ variant, hover, className }))}
      {...props}
    />
  )
);
GlassCard.displayName = "GlassCard";

export { GlassCard, glassCardVariants };
