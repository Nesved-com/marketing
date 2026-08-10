"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fadeInUp, slideInLeft, slideInRight, viewportOnce } from "@/lib/motion";

const points = [
  {
    title: "Offline-first billing",
    description: "Bills, KOTs and payments queue locally and reconcile the moment the line returns.",
  },
  {
    title: "One item master",
    description: "POS, CloudMenu, Captain and Inventory read the same menu and the same prices.",
  },
  {
    title: "Every void has a name",
    description: "Discounts, voids and reprints are stamped with a user and a reason code.",
  },
];

export function LoudHour() {
  return (
    <section className="border-b-2 border-line bg-bg-raised">
      <Container className="grid grid-cols-1 items-center gap-16 py-21 lg:grid-cols-2">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative"
        >
          <div className="relative h-[420px] overflow-hidden border-2 border-line shadow-card">
            <Image
              src="/screenshots/nesved-pos-tables.png"
              alt="Nesved POS table map — live occupancy, guest counts and running totals for every table"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 max-w-[220px] bg-brand-500 px-7 py-6 text-fg-on-ink shadow-card-lg">
            <div className="text-[2.1rem] font-black leading-none tracking-tighter">
              3 taps
            </div>
            <div className="label-mono mt-1.5 text-white/85">from order to KOT</div>
          </div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <span className="label-mono mb-4 block text-accent-deep">Why kitchens keep it</span>
          <h2 className="mb-5 text-3xl font-black leading-tight tracking-tighter sm:text-4xl">
            Built for the loud hour, not the demo.
          </h2>
          <div className="mb-8 flex flex-col gap-5">
            {points.map((point) => (
              <motion.div key={point.title} variants={fadeInUp} className="flex gap-3.5">
                <Check className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={2.4} />
                <div>
                  <div className="mb-1 text-[17px] font-extrabold">{point.title}</div>
                  <p className="text-[15px] text-fg-muted">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="ink" size="lg" asChild>
            <Link href="/pos">See the POS</Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
