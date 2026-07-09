"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, CreditCard, FileSpreadsheet, Receipt } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/effects/tilt-card";
import { AnimatedBorder } from "@/components/effects/animated-border";
import { DeviceCarousel, type CarouselScreen } from "@/components/effects/device-carousel";
import { quickbukPersonaScreens, invobukRealScreens } from "@/config/screens";
import { slideInLeft, slideInRight, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProductDefinition {
  name: string;
  logo: string;
  tagline: string;
  description: string;
  accent: string;
  href: string;
  device: "phone" | "laptop";
  screens: CarouselScreen[];
  highlights: { icon: typeof CalendarCheck; label: string }[];
}

const products: ProductDefinition[] = [
  {
    name: "Quickbuk",
    logo: "/brand/quickbuk-logo.png",
    tagline: "Flagship Product",
    description:
      "The all-in-one booking and billing platform for venue owners, decorators and caterers — manage schedules, payments, staff and reports from a single, beautifully simple dashboard.",
    accent: "var(--brand-400)",
    href: "/products/quickbuk",
    device: "phone",
    screens: quickbukPersonaScreens,
    highlights: [
      { icon: CalendarCheck, label: "Smart calendar & bookings" },
      { icon: CreditCard, label: "Integrated payments" },
    ],
  },
  {
    name: "Invobuk",
    logo: "/brand/invobuk-logo.png",
    tagline: "Invoicing & Payments",
    description:
      "Smart invoicing, quotations and inventory management built for SMEs and retail businesses — create, send and track invoices while staying in sync across every device.",
    accent: "var(--accent-indigo)",
    href: "/products/invobuk",
    device: "laptop",
    screens: invobukRealScreens,
    highlights: [
      { icon: Receipt, label: "Invoices & quotations" },
      { icon: FileSpreadsheet, label: "Inventory & reports" },
    ],
  },
];

export function ProductsShowcase() {
  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section-lg)]">
      <div className="bg-mesh pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <Container className="relative flex flex-col gap-24 lg:gap-32">
        <SectionHeading
          eyebrow="Our Products"
          title="Built to feel effortless."
          description="Two focused products, engineered with the same obsession for detail — designed to disappear into your workflow."
        />

        <div className="flex flex-col gap-24 lg:gap-32">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} reverse={index % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductCard({
  product,
  reverse,
}: {
  product: ProductDefinition;
  reverse: boolean;
}) {
  const textVariant = reverse ? slideInRight : slideInLeft;
  const deviceVariant = reverse ? slideInLeft : slideInRight;

  return (
    <div
      className={cn(
        "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
        reverse && "lg:[&>*:first-child]:order-2"
      )}
    >
      <motion.div
        variants={textVariant}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-col items-start gap-6"
      >
        <Badge variant="brand">{product.tagline}</Badge>
        <h3 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-fg-primary sm:text-4xl lg:text-5xl">
          <Image src={product.logo} alt="" width={44} height={44} className="size-9 rounded-xl sm:size-11" />
          {product.name}
        </h3>
        <p className="max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
          {product.description}
        </p>

        <div className="flex flex-col gap-3">
          {product.highlights.map((highlight) => (
            <div key={highlight.label} className="flex items-center gap-3">
              <span
                className="flex size-8 items-center justify-center rounded-lg border border-glass-border-strong bg-black/[0.04]"
                style={{ color: product.accent }}
              >
                <highlight.icon className="size-4" />
              </span>
              <span className="text-sm text-fg-secondary">{highlight.label}</span>
            </div>
          ))}
        </div>

        <Button variant="primary" size="lg" className="mt-2" asChild>
          <Link href={product.href}>
            Explore {product.name}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </motion.div>

      <motion.div
        variants={deviceVariant}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative flex w-full max-w-[560px] justify-center"
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 -z-10 animate-glow-pulse rounded-full blur-[100px]"
          style={{ backgroundColor: product.accent, opacity: 0.25 }}
          aria-hidden
        />

        <AnimatedBorder accent={product.accent} className="animate-float-slow">
          <TiltCard className="w-full p-8 sm:p-10" intensity={8}>
            <DeviceCarousel
              variant={product.device}
              screens={product.screens}
              accent={product.accent}
            />
          </TiltCard>
        </AnimatedBorder>
      </motion.div>
    </div>
  );
}
