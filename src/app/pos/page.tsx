import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { PosPreview } from "@/components/sections/pos-preview";

export const metadata: Metadata = {
  title: "Nesved POS — Restaurant Billing",
  description:
    "Billing that keeps up with a full house — three taps to a KOT, a table map, split bills, and a day-close report your accountant will stop arguing with.",
  alternates: { canonical: "/pos" },
};

const features = [
  {
    title: "Offline-first",
    description: "Bills, KOTs and payments queue locally and reconcile when the connection returns.",
  },
  {
    title: "Multi-outlet",
    description: "One item master, outlet-wise pricing, and a consolidated sales view for the owner.",
  },
  {
    title: "Audit trail",
    description: "Every void, discount and reprint is stamped with a user and a reason.",
  },
];

export default function PosPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-ink text-fg-on-ink">
          <div
            className="diagonal-accent pointer-events-none absolute -right-24 -top-24 size-[400px]"
            aria-hidden
          />
          <Container className="relative grid grid-cols-1 items-center gap-14 py-18 lg:grid-cols-2">
            <div>
              <span className="label-mono mb-5 block text-accent-soft">Nesved Restaurant POS</span>
              <h1 className="mb-5 text-4xl font-black leading-[1.03] tracking-tighter sm:text-5xl">
                Billing that keeps up with a full house.
              </h1>
              <p className="mb-7.5 max-w-[46ch] text-lg text-fg-on-ink-muted">
                Three taps to a KOT. Shortcuts for the regulars. And a day-close report your
                accountant will stop arguing with.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md" asChild>
                  <Link href="/contact">See it on your menu</Link>
                </Button>
                <Button variant="secondary" size="md" asChild>
                  <Link href="/download">Download</Link>
                </Button>
              </div>
            </div>
            <PosPreview />
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-base">
          <Container className="grid grid-cols-1 gap-6 py-17.5 sm:grid-cols-3">
            {features.map((f) => (
              <GlassCard key={f.title} hover className="p-8">
                <h3 className="mb-2.5 text-xl font-extrabold">{f.title}</h3>
                <p className="text-[15px] text-fg-muted">{f.description}</p>
              </GlassCard>
            ))}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
