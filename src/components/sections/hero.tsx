"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { StatCounter } from "@/components/ui/stat-counter";
import { GradientBeams } from "@/components/effects/gradient-beams";
import { ParticleField } from "@/components/effects/particle-field";
import { VideoBackground } from "@/components/effects/video-background";
import { fadeInUp, staggerContainer, EASE_OUT_EXPO } from "@/lib/motion";

const stats = [
  { value: 500, suffix: "+", label: "Businesses" },
  { value: 20000, suffix: "+", label: "Bookings" },
  { value: 10, prefix: "₹", suffix: "Cr+", label: "Transactions" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-bg-base pt-18">
      {/* Cinematic looping video background — lazy-mounted, muted, no controls */}
      <VideoBackground
        webmSrc="/videos/hero-bg.webm"
        mp4Src="/videos/hero-bg.mp4"
        poster="/images/hero-poster.jpg"
      />

      {/* Ambient gradient beams + particle drift, layered above the video overlay */}
      <GradientBeams />
      <ParticleField density={70} />

      <Container className="relative z-10 flex flex-col items-center gap-14 py-32 text-center">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="flex max-w-4xl flex-col items-center gap-7"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="brand" className="gap-2">
              <Sparkles className="size-3.5" />
              Business automation, reimagined
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-semibold tracking-tight text-fg-primary sm:text-6xl lg:text-7xl"
          >
            Powering Modern Businesses
            <br />
            with <GradientText>Intelligent Software.</GradientText>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-balance text-base text-fg-muted sm:text-lg lg:text-xl"
          >
            Nesved builds software that helps businesses automate bookings,
            billing, payments, reports and business growth.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button size="lg" variant="primary" asChild>
              <Link href="/trial">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products/quickbuk">Explore Products</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="#demo">
                <PlayCircle className="size-4" />
                Watch Demo
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.6 }}
          className="glass-strong grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-8 rounded-2xl px-6 py-8 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </motion.div>
      </Container>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg-base" />
    </section>
  );
}
