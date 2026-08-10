import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { LiveBoard } from "@/components/sections/live-board";

export const metadata: Metadata = {
  title: "Nesved Live — Guest Order Display",
  description:
    "The guest screen: token, table and status moving New → Preparing → Ready, with a tile kept free for your own reel.",
  alternates: { canonical: "/live" },
};

const features = [
  {
    title: "Token or table",
    description: "Show whichever your floor uses — or both, as here.",
  },
  {
    title: "Ready, loudly",
    description: "Ready tokens invert to the brand red and can chime.",
  },
  {
    title: "Your reel",
    description: "One tile loops a 9:16 or 1:1 clip from a folder or URL.",
  },
  {
    title: "Zero staff work",
    description: "Nothing to operate. Plug in, pair to the outlet, done.",
  },
];

export default function LivePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-ink text-fg-on-ink">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden />
          <Container className="relative grid grid-cols-1 items-end gap-13 py-18 pb-10 lg:grid-cols-2">
            <div>
              <span className="label-mono mb-5 block text-accent-soft">
                Nesved Live · customer display
              </span>
              <h1 className="mb-5 text-4xl font-black leading-[1.03] tracking-tighter sm:text-5xl">
                The guest stops asking &ldquo;is it coming?&rdquo;
              </h1>
              <p className="max-w-[46ch] text-lg text-fg-on-ink-muted">
                Token and table on the tile, status in the column, and the last of the four
                tiles kept for your own reel — a dish, an offer, the chef&apos;s hands.
              </p>
            </div>
            <div className="font-mono text-[12.5px] leading-loose text-fg-on-ink-muted opacity-90">
              NEW → PREPARING → READY
              <br />
              Driven by the kitchen bump, not a timer
              <br />
              Any HDMI screen · portrait or landscape
            </div>
          </Container>
          <Container className="relative pb-18">
            <LiveBoard big />
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-base">
          <Container className="grid grid-cols-1 gap-6 py-17.5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <GlassCard key={f.title} hover className="p-7.5">
                <h3 className="mb-2 text-lg font-extrabold">{f.title}</h3>
                <p className="text-sm text-fg-muted">{f.description}</p>
              </GlassCard>
            ))}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
