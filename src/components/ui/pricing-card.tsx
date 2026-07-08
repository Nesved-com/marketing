"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBorder } from "@/components/effects/animated-border";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta?: string;
  href?: string;
  recommended?: boolean;
  accent?: string;
  /** Optional real product screenshot shown as a phone preview above the plan details. */
  screenshot?: string;
}

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const accent = plan.accent ?? "var(--brand-400)";

  const card = (
    <div
      className={cn(
        "group relative flex h-full flex-col gap-6 rounded-[1.7rem] p-8 transition-all duration-300",
        plan.recommended
          ? "bg-bg-elevated"
          : "glass hover:-translate-y-1.5 hover:border-glass-border-strong hover:shadow-glow-blue"
      )}
    >
      {plan.recommended && (
        <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-brand px-3.5 py-1 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(59,130,246,0.5)]">
          <Sparkles className="size-3.5" />
          Recommended
        </span>
      )}

      {plan.screenshot && (
        <div
          className="relative -mx-8 -mt-8 mb-1 aspect-[16/10] overflow-hidden rounded-t-[1.7rem]"
          style={{ boxShadow: `0 8px 30px -12px ${accent}55` }}
        >
          <Image
            src={plan.screenshot}
            alt={`${plan.name} dashboard preview`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 360px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent" />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-fg-muted">{plan.name}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight text-fg-primary">
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-sm text-fg-muted">/{plan.period}</span>
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-fg-muted">
          {plan.description}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 text-sm text-fg-secondary">
        {plan.features.map((feature) => (
          <span key={feature} className="flex items-center gap-2.5">
            <Check className="size-4 shrink-0" style={{ color: accent }} />
            {feature}
          </span>
        ))}
      </div>

      <Button
        variant={plan.recommended ? "primary" : "secondary"}
        size="md"
        className="mt-auto w-full"
        asChild
      >
        <Link href={plan.href ?? "/trial"}>
          {plan.cta ?? "Start Free Trial"}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );

  return (
    <motion.div variants={fadeInUp} className="h-full">
      {plan.recommended ? (
        <AnimatedBorder accent={accent} className="h-full scale-[1.03]">
          {card}
        </AnimatedBorder>
      ) : (
        card
      )}
    </motion.div>
  );
}
