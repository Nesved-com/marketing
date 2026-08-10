import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "label-mono inline-flex items-center gap-2 border px-3 py-1.5 font-medium",
  {
    variants: {
      variant: {
        default: "border-line-soft text-fg-muted",
        brand: "border-line text-accent-deep",
        outline: "border-line text-fg-secondary bg-transparent",
        onInk: "border-line-on-ink text-accent-soft",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
