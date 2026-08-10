import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Native desktop builds for Nesved and Invobuk. Install, pair to your outlet, and you're billing in ten minutes.",
  alternates: { canonical: "/download" },
};

interface PlatformBuild {
  os: string;
  detail: string;
  href?: string;
}

const nesvedBuilds: PlatformBuild[] = [
  { os: "Windows", detail: "10 / 11 · x64 — coming soon" },
  { os: "Linux", detail: "deb · rpm · AppImage — coming soon" },
  { os: "macOS", detail: "13+ · universal — coming soon" },
];

const invobukBuilds: PlatformBuild[] = [
  {
    os: "Windows",
    detail: "10 / 11 · x64 · 128 MB",
    href: "https://github.com/Nesved-com/invobuk/releases/latest/download/Invobuk-Setup.exe",
  },
  {
    os: "Linux",
    detail: "AppImage · 151 MB",
    href: "https://github.com/Nesved-com/invobuk/releases/latest/download/Invobuk.AppImage",
  },
  { os: "macOS", detail: "Apple Silicon & Intel — coming soon" },
];

function ProductDownloads({
  name,
  version,
  builds,
  featured,
}: {
  name: string;
  version: string;
  builds: PlatformBuild[];
  featured?: boolean;
}) {
  return (
    <div className="mb-14 last:mb-0">
      <div className="mb-5.5 flex items-baseline gap-3.5">
        <h2 className="text-3xl font-black">{name}</h2>
        <span className="font-mono text-xs text-fg-subtle">{version}</span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {builds.map((b) => (
          <GlassCard
            key={b.os}
            hover
            className={cn("p-8", !featured && "border-t-line")}
          >
            <div className="mb-1.5 text-2xl font-black">{b.os}</div>
            <div className="mb-5.5 font-mono text-[11.5px] text-fg-subtle">{b.detail}</div>
            <Button
              variant={featured && b.href ? "primary" : "outline"}
              size="md"
              className="w-full"
              disabled={!b.href}
              asChild={Boolean(b.href)}
            >
              {b.href ? (
                <a href={b.href}>Download</a>
              ) : (
                <span>Coming soon</span>
              )}
            </Button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink text-fg-on-ink">
          <Container className="py-15">
            <h1 className="mb-4.5 text-4xl font-black tracking-tighter sm:text-5xl">
              Downloads
            </h1>
            <p className="max-w-[50ch] text-lg text-fg-on-ink-muted">
              Native desktop builds. Install, pair to your outlet, and you&apos;re billing in
              ten minutes.
            </p>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-raised">
          <Container className="py-14">
            <ProductDownloads
              name="Nesved"
              version="Suite — coming soon"
              builds={nesvedBuilds}
            />
            <ProductDownloads
              name="Invobuk"
              version="v1.2.1 · released 08 Jul 2026"
              builds={invobukBuilds}
              featured
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
