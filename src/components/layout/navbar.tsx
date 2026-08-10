"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/use-scroll-position";
import { navConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Navbar() {
  const scrolled = useScrolled(8);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b-2 border-transparent bg-bg-base/95 backdrop-blur-sm transition-colors duration-300",
        scrolled && "border-line"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/brand/nesved-logo.png"
              alt="Nesved"
              width={36}
              height={36}
              priority
              className="size-9 object-contain mix-blend-multiply"
            />
            <span className="text-lg font-black tracking-tighter text-fg-primary">
              NESVED
            </span>
          </Link>

          <ul className="hidden flex-1 flex-wrap items-center gap-1 lg:flex">
            {navConfig.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block border-b-2 px-2.5 py-2 text-sm font-bold text-fg-primary transition-colors hover:border-brand-500 hover:text-accent-deep",
                      active ? "border-brand-500 text-accent-deep" : "border-transparent"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Button variant="primary" size="md" className="hidden shrink-0 lg:inline-flex" asChild>
            <Link href="/contact">Book a demo</Link>
          </Button>

          <button
            className="flex size-10 items-center justify-center text-fg-primary hover:bg-bg-overlay lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="overflow-hidden border-t-2 border-line bg-bg-base lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navConfig.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2 py-2.5 text-sm font-bold text-fg-primary hover:text-accent-deep"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button variant="primary" size="md" className="mt-3 w-full" asChild>
                <Link href="/contact">Book a demo</Link>
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
