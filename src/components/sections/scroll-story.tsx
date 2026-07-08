"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  CalendarDays,
  CreditCard,
  FileBarChart,
  BarChart3,
  TrendingUp,
  Download,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Stage {
  icon: LucideIcon;
  label: string;
  headline: string;
  description: string;
  accent: string;
}

const stages: Stage[] = [
  {
    icon: CalendarCheck,
    label: "Booking",
    headline: "Capture every booking instantly.",
    description: "Leads convert into confirmed bookings in seconds, with zero double-booking risk.",
    accent: "var(--brand-400)",
  },
  {
    icon: CalendarDays,
    label: "Calendar",
    headline: "One calendar, every venue, every team.",
    description: "See availability across staff, spaces and equipment in a single unified view.",
    accent: "var(--brand-300)",
  },
  {
    icon: CreditCard,
    label: "Payments",
    headline: "Get paid the moment the deal closes.",
    description: "Collect advances, milestones and final payments without leaving the platform.",
    accent: "var(--accent-cyan)",
  },
  {
    icon: FileBarChart,
    label: "Reports",
    headline: "Every number, always up to date.",
    description: "Daily, weekly and monthly reports generate themselves in the background.",
    accent: "var(--accent-indigo)",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    headline: "Spot trends before they cost you.",
    description: "Track demand, seasonality and customer behaviour with built-in analytics.",
    accent: "var(--accent-violet)",
  },
  {
    icon: TrendingUp,
    label: "Profit",
    headline: "Know your margin on every booking.",
    description: "Automatic profit & loss tracking tells you exactly what you're really earning.",
    accent: "var(--brand-400)",
  },
  {
    icon: Download,
    label: "Export",
    headline: "Take your data anywhere.",
    description: "Export clean, audit-ready reports to Excel or PDF in a single click.",
    accent: "var(--brand-300)",
  },
];

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsap();
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const index = Math.min(
          stages.length - 1,
          Math.floor(self.progress * stages.length)
        );
        setActive(index);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const stage = stages[active];

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${stages.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* Background transitions with the active stage's accent */}
        <div
          className="absolute inset-0 -z-10 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${stage.accent}22, transparent 60%), var(--bg-base)`,
          }}
        />

        <Container className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Step indicator rail */}
          <div className="flex gap-3 lg:flex-col lg:gap-4">
            {stages.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    i === active
                      ? "border-transparent text-white"
                      : "border-glass-border-strong text-fg-muted"
                  )}
                  style={i === active ? { backgroundColor: s.accent } : undefined}
                >
                  <s.icon className="size-4" />
                </span>
                <span
                  className={cn(
                    "hidden text-sm transition-colors duration-300 lg:block",
                    i === active ? "font-medium text-fg-primary" : "text-fg-subtle"
                  )}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Active stage content */}
          <div className="relative min-h-[220px] max-w-xl flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="flex flex-col gap-4"
              >
                <span
                  className="w-fit rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: `${stage.accent}22`, color: stage.accent }}
                >
                  Step {active + 1} of {stages.length} — {stage.label}
                </span>
                <h3 className="text-3xl font-semibold tracking-tight text-fg-primary sm:text-4xl">
                  {stage.headline}
                </h3>
                <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
                  {stage.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </section>
  );
}
