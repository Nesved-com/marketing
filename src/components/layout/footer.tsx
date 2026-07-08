import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Globe } from "lucide-react";
import { Container } from "@/components/ui/container";
import { footerConfig, siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-glass-border bg-bg-raised">
      <div className="bg-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-brand"
        aria-hidden
      />

      <Container className="relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/brand/nesved-logo.png"
                alt="Nesved"
                width={32}
                height={32}
                className="size-8 object-contain drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
              />
              <span className="text-lg font-semibold tracking-tight text-fg-primary">
                Nesved
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
              {siteConfig.description}
            </p>

            <ul className="mt-2 flex flex-col gap-2.5 text-sm text-fg-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-fg-primary"
                >
                  <Mail className="size-4 text-brand-300" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-fg-primary"
                >
                  <Phone className="size-4 text-brand-300" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-fg-primary"
                >
                  <Globe className="size-4 text-brand-300" />
                  {siteConfig.contact.website}
                </a>
              </li>
            </ul>
          </div>

          {footerConfig.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3.5">
              <h3 className="text-sm font-semibold text-fg-primary">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 sm:flex-row">
          <p className="text-xs text-fg-subtle">
            © {year} Nesved. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerConfig.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-fg-subtle transition-colors hover:text-fg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
