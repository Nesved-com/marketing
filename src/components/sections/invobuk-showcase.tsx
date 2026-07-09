"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, AppWindow, TerminalSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { GradientText } from "@/components/ui/gradient-text";
import { PricingCard } from "@/components/ui/pricing-card";
import { DeviceCarousel } from "@/components/effects/device-carousel";
import { invobukPlans } from "@/config/pricing";
import { invobukFeatures as features } from "@/config/features";
import { invobukRealScreens } from "@/config/screens";
import { staggerContainer, fadeInUp, slideInRight, viewportOnce } from "@/lib/motion";

const ACCENT = "var(--accent-indigo)";

const platforms = [
  { icon: AppWindow, label: "Windows" },
  { icon: TerminalSquare, label: "Linux" },
];

export function InvobukShowcase() {
  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section-lg)]">
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] animate-glow-pulse rounded-full opacity-20 blur-[140px]"
        style={{ backgroundColor: ACCENT }}
        aria-hidden
      />

      <Container className="relative flex flex-col gap-20">
        <SectionHeading
          eyebrow="Invoicing & Payments"
          title={
            <span className="inline-flex items-center gap-3">
              <Image
                src="/brand/invobuk-logo.png"
                alt=""
                width={40}
                height={40}
                className="size-9 rounded-xl sm:size-10"
              />
              Introducing <GradientText>Invobuk</GradientText>
            </span>
          }
          description="Desktop-grade invoicing, inventory and order management for SMEs and retail businesses — fast, offline-ready and always in sync."
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-8 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <motion.div key={feature.label} variants={fadeInUp}>
                  <GlassCard hover className="group flex items-center gap-3 p-4">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-glass-border-strong bg-black/[0.04] transition-transform duration-300 group-hover:scale-110"
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
            </div>

            <motion.div variants={fadeInUp} className="flex flex-col gap-4">
              <span className="text-sm font-medium text-fg-muted">
                Supported Platforms
              </span>
              <div className="flex items-center gap-3">
                {platforms.map((platform) => (
                  <Badge key={platform.label} variant="outline" className="gap-2 py-2 text-sm">
                    <platform.icon className="size-4" />
                    {platform.label}
                  </Badge>
                ))}
              </div>

              <Button variant="primary" size="lg" className="mt-2 w-fit" asChild>
                <Link href="/download">
                  Download Now
                  <Download className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex w-full justify-center lg:order-2"
          >
            <DeviceCarousel variant="laptop" screens={invobukRealScreens} accent={ACCENT} />
          </motion.div>
        </div>

        {/* Pricing */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto grid w-full max-w-md grid-cols-1 gap-6 pt-4"
        >
          {invobukPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
