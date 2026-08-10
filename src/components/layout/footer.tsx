import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { footerConfig, siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-fg-on-ink">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/brand/nesved-logo.png"
              alt="Nesved"
              width={36}
              height={36}
              className="size-9 object-contain"
            />
            <span className="text-lg font-black tracking-tighter">NESVED</span>
          </Link>
          <p className="max-w-[30ch] text-sm text-fg-on-ink-muted">
            {siteConfig.description}
          </p>
        </div>

        {footerConfig.columns.map((column) => (
          <div key={column.title}>
            <div className="label-mono mb-3.5 text-fg-on-ink-muted">
              {column.title}
            </div>
            <ul className="flex flex-col gap-2.5 text-sm text-fg-on-ink-muted">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-fg-on-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-line-on-ink">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-fg-on-ink-muted sm:flex-row">
          <span className="label-mono">
            © {year} Nesved · {siteConfig.contact.email}
          </span>
          <div className="flex items-center gap-6">
            {footerConfig.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-fg-on-ink">
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
