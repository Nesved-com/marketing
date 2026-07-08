import { cn } from "@/lib/utils";

/**
 * Static + gently animated blue light beams built from layered radial/conic
 * gradients. Pure CSS — zero JS cost, safe for LCP-critical hero sections.
 */
export function GradientBeams({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <div className="bg-mesh absolute inset-0 animate-mesh-drift will-change-transform" />

      <div className="absolute left-1/2 top-[-20%] h-[140%] w-[60%] -translate-x-1/2 animate-beam bg-gradient-to-b from-brand-400/25 via-brand-500/10 to-transparent blur-3xl" />

      <div
        className="absolute -left-[10%] top-1/3 h-[50%] w-[35%] animate-beam bg-gradient-to-br from-accent-cyan/20 to-transparent blur-3xl"
        style={{ animationDelay: "-2.5s" }}
      />

      <div
        className="absolute -right-[10%] bottom-0 h-[55%] w-[40%] animate-beam bg-gradient-to-tl from-accent-indigo/20 to-transparent blur-3xl"
        style={{ animationDelay: "-5s" }}
      />

      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-brand-500/20 blur-[120px]" />
    </div>
  );
}
