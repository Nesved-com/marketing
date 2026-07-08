"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  label: string;
  description: string;
  accent: string;
  /** Real screenshot path, e.g. /images/quickbuk/booking.png — lazy-loaded via next/image. */
  src?: string;
  /** "portrait" for mobile screenshots (default), "landscape" for desktop screenshots. */
  orientation?: "portrait" | "landscape";
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const isLandscape = item.orientation === "landscape";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      className="glass-strong group relative shrink-0 snap-center overflow-hidden rounded-[1.5rem] p-3"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-bg-elevated transition-transform duration-500 group-hover:scale-[1.03]",
          !item.src
            ? "aspect-[16/10] w-[300px] sm:w-[420px]"
            : isLandscape
              ? "aspect-[1535/780] w-[380px] sm:w-[480px]"
              : "aspect-[9/19] w-[220px]"
        )}
        style={{ boxShadow: `0 30px 80px -30px ${item.accent}55` }}
      >
        {item.src ? (
          <Image
            src={item.src}
            alt={item.label}
            fill
            loading="lazy"
            className="object-cover object-top"
            sizes={isLandscape ? "480px" : "220px"}
          />
        ) : (
          <div className="relative flex h-full flex-col gap-3 p-5">
            <div className="bg-mesh absolute inset-0 opacity-60" aria-hidden />
            <div className="relative h-16 w-full rounded-lg" style={{ background: `linear-gradient(135deg, ${item.accent}33, transparent)` }} />
            <div className="relative h-2.5 w-2/3 rounded-full bg-white/10" />
            <div className="relative h-2.5 w-1/2 rounded-full bg-white/[0.06]" />
            <div className="relative mt-auto grid grid-cols-3 gap-2">
              <div className="h-10 rounded-md bg-white/[0.06]" />
              <div className="h-10 rounded-md bg-white/[0.06]" />
              <div className="h-10 rounded-md" style={{ backgroundColor: `${item.accent}40` }} />
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col gap-1 px-2 pb-2 pt-4">
        <span className="text-sm font-medium text-fg-primary">{item.label}</span>
        <span className="text-xs text-fg-muted">{item.description}</span>
      </div>
    </motion.div>
  );
}

export function ScreenshotGallery({
  eyebrow = "Product Tour",
  title = "Every screen, crafted with care.",
  description = "Scroll through the interface — designed to be as simple to use as it is to look at.",
  items,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: GalleryItem[];
}) {
  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section)]">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      </Container>

      <div
        data-gallery-scroll
        className={cn(
          "no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1.25rem,calc((100vw-84rem)/2+1.25rem))] pb-6"
        )}
      >
        {items.map((item, i) => (
          <GalleryCard key={`${item.label}-${item.description}-${i}`} item={item} index={i} />
        ))}
        <div className="shrink-0" style={{ width: "1px" }} aria-hidden />
      </div>
    </section>
  );
}
