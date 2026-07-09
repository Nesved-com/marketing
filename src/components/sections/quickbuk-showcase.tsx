"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { GradientText } from "@/components/ui/gradient-text";
import { PricingCard } from "@/components/ui/pricing-card";
import { DeviceCarousel } from "@/components/effects/device-carousel";
import { quickbukPlans } from "@/config/pricing";
import { quickbukFeatures as features } from "@/config/features";
import { quickbukPartnerScreens } from "@/config/screens";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";

const ACCENT = "var(--brand-400)";

export function QuickbukShowcase() {
  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section-lg)]">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 animate-glow-pulse rounded-full opacity-20 blur-[140px]"
        style={{ backgroundColor: ACCENT }}
        aria-hidden
      />

      <Container className="relative flex flex-col gap-20">
        <SectionHeading
          eyebrow="Flagship Product"
          title={
            <span className="inline-flex items-center gap-3">
              <Image
                src="/brand/quickbuk-logo.png"
                alt=""
                width={40}
                height={40}
                className="size-9 rounded-xl sm:size-10"
              />
              Meet <GradientText>Quickbuk</GradientText>
            </span>
          }
          description="A single SaaS platform purpose-built for Venue Owners, Decorators and Caterers — bookings, payments, staff and reports, all in one place."
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <DeviceCarousel variant="phone" screens={quickbukPartnerScreens} accent={ACCENT} />
          </motion.div>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature) => (
              <motion.div key={feature.label} variants={fadeInUp}>
                <GlassCard hover className="group flex flex-col gap-3 p-5">
                  <span
                    className="flex size-9 items-center justify-center rounded-lg border border-glass-border-strong bg-black/[0.04] transition-transform duration-300 group-hover:scale-110"
                    style={{ color: ACCENT }}
                  >
                    <feature.icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-fg-primary">
                    {feature.label}
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pricing */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-3"
        >
          {quickbukPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
