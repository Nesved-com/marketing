"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { quickbukBenefits, invobukBenefits } from "@/config/benefits";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Accepts a `product` key rather than a raw items prop so this Client
 * Component resolves its own icon data — Lucide icon components (bare
 * functions) can't be passed as props from a Server Component page.
 */
export function Benefits({
  eyebrow = "Why Nesved",
  title,
  description,
  product,
  accent = "var(--brand-400)",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  product: "quickbuk" | "invobuk";
  accent?: string;
}) {
  const items = product === "quickbuk" ? quickbukBenefits : invobukBenefits;
  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section)]">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <motion.div key={item.title} variants={fadeInUp}>
              <GlassCard hover className="group flex h-full flex-col gap-4 p-6">
                <span
                  className="flex size-11 items-center justify-center rounded-xl border border-glass-border-strong bg-white/[0.04] transition-transform duration-300 group-hover:scale-110"
                  style={{ color: accent }}
                >
                  <item.icon className="size-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold text-fg-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
