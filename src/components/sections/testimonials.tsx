"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  growth: string;
  before: string;
  after: string;
  accent: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Quickbuk turned our booking chaos into a single calendar. We stopped double-booking venues within the first week.",
    name: "Ritika Sharma",
    role: "Owner",
    company: "Urbanhall Venues",
    growth: "+42%",
    before: "18 bookings/mo",
    after: "26 bookings/mo",
    accent: "var(--brand-400)",
  },
  {
    quote:
      "Invobuk's offline mode is a lifesaver — our team keeps billing even when the internet drops mid-event.",
    name: "Arjun Mehta",
    role: "Founder",
    company: "Feastly Catering",
    growth: "+58%",
    before: "₹4.1L/mo revenue",
    after: "₹6.5L/mo revenue",
    accent: "var(--accent-cyan)",
  },
  {
    quote:
      "We manage every decor project, quote and vendor payment from Quickbuk now. Nothing falls through the cracks anymore.",
    name: "Priya Nair",
    role: "Creative Director",
    company: "Bloomcraft Decor",
    growth: "+35%",
    before: "12 projects/mo",
    after: "16 projects/mo",
    accent: "var(--accent-indigo)",
  },
  {
    quote:
      "Reports and profit & loss used to take our accountant two days. With Quickbuk it's instant, every single month.",
    name: "Vikram Singh",
    role: "Managing Director",
    company: "Nestbuild Construction",
    growth: "+27%",
    before: "3 sites tracked",
    after: "9 sites tracked",
    accent: "var(--brand-300)",
  },
];

function AnimatedStars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
        >
          <Star className="size-4 fill-warning text-warning" />
        </motion.span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const marqueeCards = [...testimonials, ...testimonials];

  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section)]">
      <div className="bg-mesh pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <Container className="relative flex flex-col gap-14">
        <SectionHeading
          eyebrow="Customer Stories"
          title="Real businesses. Real growth."
          description="See how venues, caterers, decorators and builders are growing faster with Nesved."
        />
      </Container>

      {/* Auto-scrolling testimonial row */}
      <div className="group relative mt-4 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max shrink-0 gap-6 py-2 animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeCards.map((t, i) => (
            <GlassCard
              key={`${t.name}-${i}`}
              hover
              className={cn("flex w-[380px] shrink-0 flex-col gap-5 p-7")}
            >
              <div className="flex items-center justify-between">
                <AnimatedStars />
                <span
                  className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: `${t.accent}22`, color: t.accent }}
                >
                  <TrendingUp className="size-3.5" />
                  {t.growth}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-fg-secondary">
                “{t.quote}”
              </p>

              <div className="flex items-center gap-3 border-t border-glass-border pt-4">
                <span
                  className="flex size-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${t.accent}, var(--accent-cyan))` }}
                >
                  {t.name.charAt(0)}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-fg-primary">{t.name}</span>
                  <span className="text-xs text-fg-muted">
                    {t.role}, {t.company}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="text-fg-subtle">Before</span>
                  <span className="font-medium text-fg-muted">{t.before}</span>
                </div>
                <div className="h-6 w-px bg-glass-border" />
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-fg-subtle">After</span>
                  <span className="font-medium" style={{ color: t.accent }}>
                    {t.after}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
