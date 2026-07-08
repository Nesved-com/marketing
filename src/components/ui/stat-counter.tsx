"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  className?: string;
}) {
  const { ref, value: animated } = useCountUp(value, 1.8, decimals);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("flex flex-col items-center gap-1 text-center", className)}
    >
      <span className="text-3xl font-semibold tracking-tight text-fg-primary sm:text-4xl">
        {prefix}
        {decimals > 0 ? animated.toFixed(decimals) : formatNumber(animated)}
        {suffix}
      </span>
      <span className="text-sm text-fg-muted">{label}</span>
    </div>
  );
}
