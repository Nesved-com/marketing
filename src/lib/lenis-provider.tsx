"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { registerGsap } from "@/lib/gsap";

/**
 * Drives smooth scrolling for the whole app and keeps GSAP's ScrollTrigger
 * in sync by driving both off the same rAF loop via gsap.ticker.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const gsapInstance = registerGsap();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    gsapInstance.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsapInstance.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
