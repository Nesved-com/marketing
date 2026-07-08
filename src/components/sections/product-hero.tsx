"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientBeams } from "@/components/effects/gradient-beams";
import { DeviceCarousel, type CarouselScreen } from "@/components/effects/device-carousel";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ProductHero({
  eyebrow,
  title,
  gradientWord,
  description,
  primaryHref,
  primaryLabel = "Start Free Trial",
  secondaryHref,
  secondaryLabel = "See Pricing",
  device,
  screens,
  accent,
  belowCta,
}: {
  eyebrow: string;
  title: string;
  gradientWord: string;
  description: string;
  primaryHref: string;
  primaryLabel?: string;
  secondaryHref: string;
  secondaryLabel?: string;
  device: "phone" | "laptop";
  screens: CarouselScreen[];
  accent: string;
  /** Optional content rendered below the CTA buttons, e.g. app store badges. */
  belowCta?: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-bg-base pt-18">
      <GradientBeams />

      <Container
        className={cn(
          "relative z-10 grid items-center gap-16 py-28",
          device === "laptop" ? "lg:grid-cols-[1fr_1.3fr]" : "lg:grid-cols-2"
        )}
      >
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="brand">{eyebrow}</Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-semibold tracking-tight text-fg-primary sm:text-5xl lg:text-6xl"
          >
            {title} <GradientText>{gradientWord}</GradientText>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            {description}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-2 flex flex-col gap-3 sm:flex-row">
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
          {belowCta && <motion.div variants={fadeInUp}>{belowCta}</motion.div>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex w-full justify-center"
        >
          <DeviceCarousel
            variant={device}
            screens={screens}
            accent={accent}
            className={device === "laptop" ? "max-w-[680px]" : undefined}
          />
        </motion.div>
      </Container>
    </section>
  );
}

