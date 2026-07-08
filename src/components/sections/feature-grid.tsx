"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { quickbukFeatures, invobukFeatures } from "@/config/features";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";

/**
 * Accepts a `product` key rather than a raw items prop so this Client
 * Component resolves its own icon data — Lucide icon components (bare
 * functions) can't be passed as props from a Server Component page.
 */
export function FeatureGrid({
  eyebrow = "Features",
  title,
  description,
  product,
  accent = "var(--brand-400)",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  product: "quickbuk" | "invobuk";
  accent?: string;
}) {
  const items = product === "quickbuk" ? quickbukFeatures : invobukFeatures;
  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section)]">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((feature) => (
            <motion.div key={feature.label} variants={fadeInUp}>
              <GlassCard hover className="group flex h-full flex-col gap-3 p-6">
                <span
                  className="flex size-10 items-center justify-center rounded-lg border border-glass-border-strong bg-white/[0.04] transition-transform duration-300 group-hover:scale-110"
                  style={{ color: accent }}
                >
                  <feature.icon className="size-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-fg-primary">
                    {feature.label}
                  </span>
                  {feature.description && (
                    <span className="text-sm leading-relaxed text-fg-muted">
                      {feature.description}
                    </span>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
