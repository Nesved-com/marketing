"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function CtaBanner({
  title = "Come see it on a real Friday night.",
  description = "We'll set up a demo outlet with your menu — POS, kitchen screen and the guest display — and let you try to break it.",
  primaryLabel = "Book a demo",
  primaryHref = "/contact",
  secondaryLabel = "Download the apps",
  secondaryHref = "/download",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-fg-on-ink">
      <div
        className="diagonal-accent pointer-events-none absolute -bottom-36 -left-20 size-[380px]"
        aria-hidden
      />
      <Container className="relative grid grid-cols-1 items-center gap-14 py-24 lg:grid-cols-2">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.h2
            variants={fadeInUp}
            className="max-w-[18ch] text-4xl font-black leading-[1.03] tracking-tighter sm:text-5xl"
          >
            {title}
          </motion.h2>
        </motion.div>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-8"
        >
          <motion.p variants={fadeInUp} className="max-w-[46ch] text-lg text-fg-on-ink-muted">
            {description}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col gap-3">
            <Button variant="primary" size="lg" className="w-fit" asChild>
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            <Button variant="secondary" size="lg" className="w-fit" asChild>
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
