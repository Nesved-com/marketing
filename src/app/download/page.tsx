import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { GradientBeams } from "@/components/effects/gradient-beams";
import {
  AppWindow,
  TerminalSquare,
  Apple,
  Download as DownloadIcon,
  Cpu,
  LifeBuoy,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Invobuk Download Center",
  description:
    "Download Invobuk for Windows or Linux, check system requirements, read release notes and browse version history. macOS support is coming soon.",
  alternates: { canonical: "/download" },
};

const platforms = [
  {
    icon: AppWindow,
    name: "Windows",
    detail: "Windows 10 & 11 (64-bit)",
    version: "v1.0.0",
    size: "128 MB",
    href: "https://github.com/Nesved-com/invobuk/releases/latest/download/Invobuk-Setup.exe",
    accent: "var(--brand-400)",
    available: true,
  },
  {
    icon: TerminalSquare,
    name: "Linux",
    detail: "AppImage · Ubuntu, Fedora, Debian",
    version: "v1.0.0",
    size: "177 MB",
    href: "https://github.com/Nesved-com/invobuk/releases/latest/download/Invobuk.AppImage",
    accent: "var(--accent-cyan)",
    available: true,
  },
  {
    icon: Apple,
    name: "macOS",
    detail: "Apple Silicon & Intel",
    version: "Coming Soon",
    size: "—",
    href: "#",
    accent: "var(--fg-subtle)",
    available: false,
  },
];

const resources = [
  {
    icon: Cpu,
    title: "System Requirements",
    description: "Minimum and recommended specs for a smooth experience.",
    href: "#system-requirements",
  },
  {
    icon: LifeBuoy,
    title: "Need Help?",
    description: "Reach out to our team for setup or licensing support.",
    href: "/contact",
  },
];

const systemRequirements = [
  { label: "OS", windows: "Windows 10 (64-bit) or later", linux: "Ubuntu 20.04+ / Fedora 36+ / Debian 11+" },
  { label: "Processor", windows: "1.6 GHz dual-core", linux: "1.6 GHz dual-core" },
  { label: "Memory", windows: "4 GB RAM minimum, 8 GB recommended", linux: "4 GB RAM minimum, 8 GB recommended" },
  { label: "Storage", windows: "500 MB available space", linux: "500 MB available space" },
];

export default function DownloadPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative w-full overflow-hidden pt-32 pb-[var(--spacing-section)]">
          <GradientBeams />
          <Container className="relative flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/invobuk-logo.png"
                alt="Invobuk"
                width={56}
                height={56}
                className="size-12 rounded-2xl sm:size-14"
              />
              <Badge variant="brand">Download Center</Badge>
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-fg-primary sm:text-5xl">
              Get Invobuk on your desktop.
            </h1>
            <p className="max-w-xl text-base text-fg-muted sm:text-lg">
              Desktop-grade invoicing, inventory and order management — available today for Windows and Linux, with macOS coming soon.
            </p>
          </Container>
        </section>

        <section className="relative w-full py-[var(--spacing-section-sm)]">
          <Container>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {platforms.map((platform) => (
                <GlassCard
                  key={platform.name}
                  variant="strong"
                  hover={platform.available}
                  className="flex flex-col gap-6 p-8"
                >
                  <span
                    className="flex size-12 items-center justify-center rounded-xl border border-glass-border-strong bg-black/[0.04]"
                    style={{ color: platform.accent }}
                  >
                    <platform.icon className="size-6" />
                  </span>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl font-semibold text-fg-primary">{platform.name}</h3>
                    <p className="text-sm text-fg-muted">{platform.detail}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-fg-subtle">
                    <span>{platform.version}</span>
                    {platform.available && (
                      <>
                        <span className="size-1 rounded-full bg-fg-subtle" />
                        <span>{platform.size}</span>
                      </>
                    )}
                  </div>

                  {platform.available ? (
                    <Button variant="primary" size="md" className="mt-auto w-full" asChild>
                      <a href={platform.href}>
                        <DownloadIcon className="size-4" />
                        Download for {platform.name}
                      </a>
                    </Button>
                  ) : (
                    <Button variant="secondary" size="md" className="mt-auto w-full" disabled>
                      <Clock className="size-4" />
                      Coming Soon
                    </Button>
                  )}
                </GlassCard>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative w-full py-[var(--spacing-section)]">
          <Container className="flex flex-col gap-14">
            <SectionHeading
              eyebrow="Resources"
              title="Everything you need before you install."
              description="System requirements and support, right where you need them."
            />
            <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
              {resources.map((resource) => (
                <Link key={resource.title} href={resource.href}>
                  <GlassCard hover className="group flex h-full flex-col gap-3 p-6">
                    <span className="flex size-10 items-center justify-center rounded-lg border border-glass-border-strong bg-black/[0.04] text-brand-300 transition-transform duration-300 group-hover:scale-110">
                      <resource.icon className="size-5" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold text-fg-primary">{resource.title}</h3>
                      <p className="text-sm leading-relaxed text-fg-muted">{resource.description}</p>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section id="system-requirements" className="relative w-full scroll-mt-24 py-[var(--spacing-section)]">
          <Container className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="System Requirements"
              title="Make sure your machine is ready."
              align="left"
            />
            <GlassCard className="overflow-x-auto p-0">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-glass-border text-fg-muted">
                    <th className="px-6 py-4 font-medium">Requirement</th>
                    <th className="px-6 py-4 font-medium">Windows</th>
                    <th className="px-6 py-4 font-medium">Linux</th>
                  </tr>
                </thead>
                <tbody>
                  {systemRequirements.map((row) => (
                    <tr key={row.label} className="border-b border-glass-border last:border-0">
                      <td className="px-6 py-4 font-medium text-fg-primary">{row.label}</td>
                      <td className="px-6 py-4 text-fg-muted">{row.windows}</td>
                      <td className="px-6 py-4 text-fg-muted">{row.linux}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
