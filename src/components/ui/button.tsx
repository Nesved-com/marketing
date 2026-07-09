import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-brand text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-6px_rgba(29,78,216,0.55)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_10px_32px_-6px_rgba(59,130,246,0.7)] hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "glass text-fg-primary hover:glass-strong hover:-translate-y-0.5",
        outline:
          "border border-glass-border-strong text-fg-primary bg-transparent hover:bg-black/5 hover:-translate-y-0.5",
        ghost: "text-fg-secondary hover:text-fg-primary hover:bg-black/5",
        link: "text-brand-300 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
