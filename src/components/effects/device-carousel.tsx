"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

export interface CarouselScreen {
  label: string;
  /** Optional screen-recording video (mp4/webm) — autoplays muted & looped. */
  video?: string;
  /** Fallback/placeholder UI shown when no video is supplied. */
  content?: React.ReactNode;
}

interface DeviceCarouselProps {
  variant: "phone" | "laptop";
  screens: CarouselScreen[];
  accent?: string;
  interval?: number;
  autoPlay?: boolean;
  className?: string;
}

/**
 * Premium, Apple-style animated device mockup:
 * - Continuous slow idle rotation (pure CSS, respects reduced-motion globally)
 * - Mouse-driven parallax tilt layered on top via Framer Motion springs
 * - Animated glass reflection sweeping across the screen
 * - Accent glow + soft shadow that grounds the device
 * - Auto-rotating screen carousel; each screen can autoplay a real screen
 *   recording (video) or fall back to a stylized placeholder UI.
 */
export function DeviceCarousel({
  variant,
  screens,
  accent = "var(--brand-400)",
  interval = 4000,
  autoPlay = true,
  className,
}: DeviceCarouselProps) {
  const [active, setActive] = useState(0);
  const isPhone = variant === "phone";

  const containerRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const parallaxIntensity = isPhone ? 10 : 6;
  const rotateX = useSpring(
    useTransform(py, [0, 1], [parallaxIntensity, -parallaxIntensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-parallaxIntensity, parallaxIntensity]),
    springConfig
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  useEffect(() => {
    if (!autoPlay || screens.length <= 1) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % screens.length);
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, screens.length]);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4",
        isPhone ? "w-fit" : "w-full max-w-[520px]",
        className
      )}
    >
      {/* Perspective + pointer-tracking layer */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("relative w-full", isPhone ? "w-[280px]" : "")}
        style={{ perspective: 1400 }}
      >
        {/* Grounding glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 animate-glow-pulse rounded-full opacity-30 blur-[70px]"
          style={{ backgroundColor: accent }}
          aria-hidden
        />

        {/* Idle sway (pure CSS, continuous) */}
        <div
          className={cn(
            "will-change-transform",
            isPhone ? "animate-device-sway-phone" : "animate-device-sway-laptop"
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Pointer parallax (Framer springs, layered on top) */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="will-change-transform"
          >
            <div
              className={cn(
                "glass-strong relative w-full overflow-hidden rounded-[1.75rem] shadow-card",
                isPhone
                  ? "aspect-[9/19] rounded-[2.25rem] p-3"
                  : "aspect-[1535/780] p-2"
              )}
              style={{
                boxShadow: `0 10px 40px -8px ${accent}55, 0 50px 110px -30px rgba(0,0,0,0.7), var(--shadow-card)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-bg-elevated">
                <div className="bg-mesh absolute inset-0 opacity-70" aria-hidden />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: isPhone ? 24 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isPhone ? -24 : -40 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    className={cn(
                      "relative h-full",
                      isPhone ? "flex flex-col gap-2 p-4" : ""
                    )}
                  >
                    {isPhone && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-tight text-fg-primary">
                          {screens[active].label}
                        </span>
                        <span
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
                        />
                      </div>
                    )}
                    <div
                      className={cn(
                        "relative overflow-hidden",
                        isPhone ? "flex flex-1 flex-col rounded-lg" : "h-full w-full"
                      )}
                    >
                      {screens[active].video ? (
                        <video
                          className="h-full w-full flex-1 rounded-lg object-cover"
                          src={screens[active].video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls={false}
                        />
                      ) : (
                        screens[active].content
                      )}
                    </div>

                    {!isPhone && (
                      <div className="pointer-events-none absolute left-4 top-3 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
                        <span
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
                        />
                        <span className="text-xs font-semibold tracking-tight text-white">
                          {screens[active].label}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Animated glass reflection sweep */}
                <div
                  className="animate-sheen pointer-events-none absolute -inset-y-1/2 left-0 h-[220%] w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent mix-blend-screen"
                  aria-hidden
                />
                {/* Static glass highlight along top edge */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent"
                  aria-hidden
                />
              </div>

              {isPhone && (
                <div className="absolute left-1/2 top-1.5 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/40" />
              )}
            </div>

            {!isPhone && (
              <div className="mx-auto h-3 w-[70%] rounded-b-xl bg-gradient-to-b from-white/10 to-white/[0.02]" />
            )}
          </motion.div>
        </div>
      </div>

      {screens.length > 1 && (
        <div className="flex items-center gap-2">
          {screens.map((screen, i) => (
            <button
              key={screen.label}
              onClick={() => setActive(i)}
              aria-label={`Show ${screen.label}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6" : "w-1.5 bg-white/15 hover:bg-white/30"
              )}
              style={i === active ? { backgroundColor: accent } : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
