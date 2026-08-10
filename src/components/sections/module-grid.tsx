"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  MonitorSmartphone,
  LayoutGrid,
  ChefHat,
  Smartphone,
  QrCode,
  Boxes,
} from "lucide-react";

const steps = [
  { n: "01", label: "Set up in a day" },
  { n: "02", label: "Your menu, imported" },
  { n: "03", label: "Staff trained free" },
  { n: "04", label: "Support on the phone" },
];

interface ModuleCard {
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
  neutral?: boolean;
}

const modules: ModuleCard[] = [
  {
    icon: MonitorSmartphone,
    name: "Nesved POS",
    description: "Billing, KOTs, split bills, table map and a day-close that ties. Works offline and syncs back.",
    href: "/pos",
  },
  {
    icon: LayoutGrid,
    name: "Nesved Live",
    description: "The guest screen: token, table and status — with the fourth tile of four kept for your reel.",
    href: "/live",
  },
  {
    icon: ChefHat,
    name: "Nesved Kitchen",
    description: "Section-wise KDS with age colouring and recall. Bump a ticket and every screen knows.",
    href: "/suite",
    neutral: true,
  },
  {
    icon: Smartphone,
    name: "Nesved Captain",
    description: "Table-side ordering on the phone staff already carry. Modifiers, course firing, per-steward reports.",
    href: "/suite",
    neutral: true,
  },
  {
    icon: QrCode,
    name: "Nesved CloudMenu",
    description: "A QR menu fed by the same item master. Edit a price once, it changes everywhere.",
    href: "/suite",
    neutral: true,
  },
  {
    icon: Boxes,
    name: "Nesved Inventory",
    description: "Recipes deplete stock as you bill. Purchase, wastage, vendor rates and closing value.",
    href: "/suite",
    neutral: true,
  },
];

export function ModuleGrid() {
  return (
    <section className="border-b-2 border-line bg-bg-base">
      <Container>
        <div className="relative z-10 -mt-12 grid grid-cols-2 gap-px bg-line shadow-card-lg sm:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} className="bg-bg-raised px-6 py-6">
              <div className="label-mono mb-2 text-accent-deep">{step.n}</div>
              <div className="text-base font-extrabold">{step.label}</div>
            </div>
          ))}
        </div>

        <div className="py-21">
          <div className="mb-11 max-w-xl">
            <span className="label-mono mb-4 block text-accent-deep">The Nesved suite</span>
            <h2 className="mb-3.5 text-3xl font-black leading-tight tracking-tighter sm:text-4xl lg:text-[2.75rem]">
              Six modules. One order, one menu, one stock ledger.
            </h2>
            <p className="text-lg text-fg-muted">
              Start with the POS. Switch the rest on the week you need them — nothing to
              migrate, nothing to reconcile.
            </p>
          </div>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {modules.map((mod) => (
              <motion.div key={mod.name} variants={fadeInUp}>
                <GlassCard hover className="flex h-full flex-col gap-5 p-7">
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center",
                      mod.neutral ? "bg-bg-overlay text-fg-primary" : "bg-brand-100 text-brand-500"
                    )}
                  >
                    <mod.icon className="size-5" strokeWidth={2} />
                  </span>
                  <div className="flex flex-1 flex-col gap-2.5">
                    <h3 className="text-xl font-extrabold">{mod.name}</h3>
                    <p className="text-[15px] text-fg-muted">{mod.description}</p>
                  </div>
                  <Link
                    href={mod.href}
                    className="text-sm font-extrabold text-accent-deep hover:underline"
                  >
                    Learn more →
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
