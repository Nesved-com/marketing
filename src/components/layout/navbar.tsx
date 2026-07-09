"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/use-scroll-position";
import { navConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Navbar() {
  const scrolled = useScrolled(32);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-strong border-b border-glass-border-strong"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-18 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <NesvedMark />
            <span className="text-lg font-semibold tracking-tight text-fg-primary">
              Nesved
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navConfig.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => item.children && setOpenDropdown(null)}
              >
                <Link
                  href={item.href ?? "#"}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-fg-secondary transition-colors hover:bg-black/5 hover:text-fg-primary"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-300",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                      className="glass-strong absolute left-0 top-full mt-2 w-72 rounded-2xl p-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex flex-col gap-0.5 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-black/5"
                        >
                          <span className="text-sm font-medium text-fg-primary">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="text-xs text-fg-muted">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button variant="primary" size="md" asChild>
              <Link href="/trial">Start Free Trial</Link>
            </Button>
          </div>

          <button
            className="flex size-10 items-center justify-center rounded-full text-fg-primary transition-colors hover:bg-black/5 lg:hidden"
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
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="glass-strong overflow-hidden border-t border-glass-border lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navConfig.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href ?? "#"}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-fg-secondary hover:bg-black/5 hover:text-fg-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 flex flex-col gap-0.5 border-l border-glass-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-black/5 hover:text-fg-primary"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button variant="primary" size="md" className="mt-3 w-full" asChild>
                <Link href="/trial">Start Free Trial</Link>
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NesvedMark() {
  return (
    <span className="relative flex size-8 shrink-0 items-center justify-center drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
      <Image src="/brand/nesved-logo.png" alt="Nesved" width={32} height={32} priority className="size-8 object-contain" />
    </span>
  );
}
