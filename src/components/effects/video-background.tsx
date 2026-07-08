"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  webmSrc: string;
  mp4Src: string;
  poster?: string;
  className?: string;
  /** Root margin for the lazy-mount observer — start loading slightly before it's on screen. */
  rootMargin?: string;
}

/**
 * Cinematic looping hero video background.
 *
 * Perf strategy:
 * - The <video> element itself is not mounted until an IntersectionObserver
 *   confirms the hero is near the viewport, so it never blocks LCP/TBT.
 * - `preload="none"` + `poster` keeps initial payload at zero bytes of video.
 * - WebM is offered first (smaller), MP4 as a compatibility fallback.
 * - Respects prefers-reduced-motion by never autoplaying (poster stays static).
 */
export function VideoBackground({
  webmSrc,
  mp4Src,
  poster,
  className,
  rootMargin = "200px",
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          priority
          aria-hidden
          className={cn(
            "object-cover transition-opacity duration-700",
            loaded ? "opacity-0" : "opacity-100"
          )}
        />
      )}

      {shouldLoad && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0"
          )}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="none"
          poster={poster}
          onCanPlay={() => setLoaded(true)}
          aria-hidden
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* Cinematic dark gradient overlay — keeps foreground text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base/70 via-bg-base/60 to-bg-base" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-bg-base/40" />
      <div className="bg-mesh absolute inset-0 opacity-80 mix-blend-screen" />
    </div>
  );
}
