import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassCardVariants = cva("relative rounded-2xl transition-all duration-300", {
  variants: {
    variant: {
      default: "glass",
      strong: "glass-strong",
    },
    hover: {
      true: "hover:border-glass-border-strong hover:-translate-y-1 hover:shadow-glow-blue",
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
