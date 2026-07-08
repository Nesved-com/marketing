import { cn } from "@/lib/utils";

/**
 * Slowly rotating conic-gradient border, layered behind the card content via
 * padding so only a thin animated ring is visible. Pure CSS, GPU-cheap.
 */
export function AnimatedBorder({
  children,
  className,
  accent = "var(--brand-400)",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={cn(
        "group relative w-full rounded-[1.75rem] p-px",
        className
      )}
    >
      <div
        className="absolute inset-0 animate-spin-slow rounded-[1.75rem] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${accent} 20%, transparent 40%)`,
        }}
        aria-hidden
      />
      <div className="relative w-full rounded-[1.75rem] bg-bg-raised">{children}</div>
    </div>
  );
}
