"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoBackground } from "@/components/effects/video-background";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function CinematicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <section id="demo" className="relative w-full overflow-hidden py-[var(--spacing-section)] scroll-mt-24">
      <Container className="relative flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="See It In Action"
          title="Watch Nesved come to life."
          description="A two-minute walkthrough of Quickbuk and Invobuk running a real business — bookings, invoices and reports, end to end."
        />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <motion.button
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              className="group relative aspect-video w-full max-w-4xl overflow-hidden rounded-[1.75rem] shadow-card"
            >
              {/* Blurred cinematic preview background */}
              <VideoBackground
                webmSrc="/videos/demo-preview.webm"
                mp4Src="/videos/demo-preview.mp4"
                poster="/images/demo-poster.jpg"
                className="scale-105 blur-[2px] transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient lighting */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-brand-500/10" />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-brand-400/30 blur-[90px]"
                aria-hidden
              />

              {/* Floating play button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex items-center justify-center">
                  <span className="absolute size-24 animate-ping rounded-full bg-brand-400/20" />
                  <span className="glass-strong flex size-20 items-center justify-center rounded-full border-2 border-glass-border-strong shadow-glow-blue transition-transform duration-300 group-hover:scale-110">
                    <Play className="size-7 translate-x-0.5 fill-brand-500 text-brand-500" />
                  </span>
                </span>
              </span>

              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-fg-secondary">
                Click to watch the full demo
              </span>
            </motion.button>
          </Dialog.Trigger>

          <AnimatePresence>
            {open && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2"
                  >
                    <Dialog.Title className="sr-only">
                      Nesved product demo
                    </Dialog.Title>
                    <div className="relative aspect-video overflow-hidden rounded-2xl shadow-card">
                      <video
                        className="h-full w-full object-cover"
                        src="/videos/demo-full.mp4"
                        controls
                        autoPlay
                        playsInline
                      />
                    </div>
                    <Dialog.Close asChild>
                      <button
                        aria-label="Close demo"
                        className="absolute -top-12 right-0 flex size-9 items-center justify-center rounded-full glass text-fg-primary transition-colors hover:bg-black/10"
                      >
                        <X className="size-4" />
                      </button>
                    </Dialog.Close>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>

        <Button size="lg" variant="secondary" onClick={() => setOpen(true)}>
          Watch Complete Demo
        </Button>
      </Container>
    </section>
  );
}
