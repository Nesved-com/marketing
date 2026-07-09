"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Sparkles,
  UtensilsCrossed,
  Store,
  Briefcase,
  Heart,
  HardHat,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const logos = [
  "Venuvo",
  "Celebra",
  "Platewise",
  "Markethub",
  "Bloomcraft",
  "Nestbuild",
  "Urbanhall",
  "Feastly",
] as const;

interface Industry {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const industries: Industry[] = [
  {
    icon: Building2,
    title: "Venue Owners",
    description: "Automate bookings, availability and payments in one place.",
    accent: "var(--brand-400)",
  },
  {
    icon: Sparkles,
    title: "Decorators",
    description: "Manage quotes, projects and client approvals effortlessly.",
    accent: "var(--accent-violet)",
  },
  {
    icon: UtensilsCrossed,
    title: "Caterers",
    description: "Plan menus, track orders and bill clients without the chaos.",
    accent: "var(--accent-cyan)",
  },
  {
    icon: Store,
    title: "Retail Stores",
    description: "Streamline billing, inventory and daily sales reporting.",
    accent: "var(--brand-300)",
  },
  {
    icon: Briefcase,
    title: "SMEs",
    description: "Run finance, invoicing and operations from a single dashboard.",
    accent: "var(--accent-indigo)",
  },
  {
    icon: Heart,
    title: "Wedding Businesses",
    description: "Coordinate vendors, bookings and payments seamlessly.",
    accent: "var(--brand-400)",
  },
  {
    icon: HardHat,
    title: "Construction Businesses",
    description: "Track projects, contractors and billing with full visibility.",
    accent: "var(--accent-cyan)",
  },
];

export function TrustedBy() {
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section)]">
      <div className="bg-mesh pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <Container className="relative flex flex-col gap-16">
        <SectionHeading
          eyebrow="Trusted Nationwide"
          title="Trusted by Businesses Across India"
          description="From venue owners to construction firms, Nesved powers day-to-day operations for hundreds of growing businesses."
        />

        {/* Animated logo marquee — two rows, opposite directions, pause on hover */}
        <div className="flex flex-col gap-4">
          <LogoRow logos={marqueeLogos} direction="left" />
          <LogoRow logos={[...marqueeLogos].reverse()} direction="right" />
        </div>

        {/* Industry cards */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((industry) => (
            <IndustryCard key={industry.title} {...industry} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function LogoRow({
  logos: rowLogos,
  direction,
}: {
  logos: readonly string[];
  direction: "left" | "right";
}) {
  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-10 py-2",
          direction === "left" ? "animate-marquee" : "animate-marquee [animation-direction:reverse]",
          "group-hover:[animation-play-state:paused]"
        )}
      >
        {[...rowLogos, ...rowLogos].map((logo, i) => (
          <span
            key={`${logo}-${i}`}
            className="shrink-0 text-xl font-semibold tracking-tight text-fg-subtle opacity-60 grayscale transition-all duration-300 hover:scale-105 hover:text-fg-primary hover:opacity-100 hover:grayscale-0"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}

function IndustryCard({ icon: Icon, title, description, accent }: Industry) {
  return (
    <motion.div variants={fadeInUp}>
      <GlassCard
        hover
        className="group relative flex h-full flex-col gap-4 overflow-hidden p-6"
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
          style={{ backgroundColor: accent }}
          aria-hidden
        />

        <div
          className="relative flex size-11 items-center justify-center rounded-xl border border-glass-border-strong bg-black/[0.04] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
          style={{ boxShadow: `0 0 0 1px ${accent}22` }}
        >
          <Icon className="size-5" style={{ color: accent }} />
        </div>

        <div className="relative flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-fg-primary">{title}</h3>
          <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
