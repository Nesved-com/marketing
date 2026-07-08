import * as React from "react";
import { cn } from "@/lib/utils";

export function GradientText({
  className,
  as: Comp = "span",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return (
    <Comp className={cn("text-gradient-brand", className)} {...props} />
  );
}
