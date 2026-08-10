"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LiveBoard } from "@/components/sections/live-board";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const stats = [
  { value: "6", label: "Nesved modules" },
  { value: "3", label: "Desktop platforms" },
  { value: "Offline", label: "Bills through a cut" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-fg-on-ink">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="diagonal-accent pointer-events-none absolute -right-24 -top-32 size-[420px]"
        aria-hidden
      />

      <Container className="relative grid grid-cols-1 items-center gap-14 py-22 lg:grid-cols-2 lg:py-28">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2.5 border border-line-on-ink px-3.5 py-2 font-mono text-[11.5px] uppercase tracking-[0.13em]"
          >
            <span className="block size-1.5 bg-brand-500" />
            Restaurants · Hotels · Banquets
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 max-w-[15ch] text-[2.75rem] font-black leading-[1.03] tracking-tighter sm:text-6xl lg:text-[4.1rem]"
          >
            Run the whole floor on <span className="text-brand-400">one calm system</span>.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-9 max-w-[47ch] text-lg leading-relaxed text-fg-on-ink-muted"
          >
            Nesved ties the counter, the kitchen, the captain&apos;s hand and the guest&apos;s
            screen together. One order, one truth — from the moment it&apos;s taken to the
            moment it&apos;s served.
          </motion.p>

          <motion.div variants={fadeInUp} className="mb-11 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Book a 20-minute demo</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/suite">Explore the suite</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex w-full flex-wrap gap-11 border-t border-line-on-ink pt-7"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
                <div className="label-mono mt-1 text-fg-on-ink-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <LiveBoard />
        </motion.div>
      </Container>
    </section>
  );
}
