"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientBeams } from "@/components/effects/gradient-beams";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function CtaBanner({
  title = "Ready to automate your business?",
  description = "Join hundreds of businesses already running on Nesved. Start your free trial today — no credit card required.",
  primaryLabel = "Start Free Trial",
  primaryHref = "/trial",
  secondaryLabel = "Talk to Sales",
  secondaryHref = "/contact",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section)]">
      <GradientBeams />
      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass-strong mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[2rem] px-8 py-16 text-center sm:px-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold tracking-tight text-fg-primary sm:text-4xl lg:text-5xl"
          >
            <GradientText>{title}</GradientText>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="max-w-xl text-base text-fg-muted sm:text-lg"
          >
            {description}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button size="lg" variant="primary" asChild>
              <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
