import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "RoomAndDine — Hospitality Management",
  description:
    "Rooms, marriage halls, banquets, catering and the in-house restaurant on one calendar and one folio. A wedding is one event, not five spreadsheets.",
  alternates: { canonical: "/roomanddine" },
};

const modules = [
  {
    title: "Rooms",
    description: "Availability chart, rate plans and seasons, group blocks, ID and GST capture, folio posting from any outlet.",
  },
  {
    title: "Marriage hall",
    description: "Slot-wise calendar, advance schedule, cancellation terms and a printable function sheet.",
  },
  {
    title: "Banquet hall",
    description: "Per-pax packages with menu selection, seating layouts, staff plan and live cost-versus-quote.",
  },
  {
    title: "In-house restaurant",
    description: "The full Nesved POS floor, with room-post, guest signature and split billing between folio and cash.",
  },
  {
    title: "Catering",
    description: "Off-site orders with menu costing, vehicle and staff assignment, dispatch checklist and reconciliation.",
  },
  {
    title: "Inventory",
    description: "One store behind every ledger — housekeeping, kitchen raw material and hall linen, with indent approvals.",
  },
];

export default function RoomAndDinePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-ink text-fg-on-ink">
          <div
            className="diagonal-accent pointer-events-none absolute -bottom-30 -right-15 size-[360px]"
            aria-hidden
          />
          <Container className="relative py-18">
            <span className="label-mono mb-5.5 block text-accent-soft">RoomAndDine</span>
            <h1 className="mb-8 max-w-[20ch] text-4xl font-black leading-[1.02] tracking-tighter sm:text-5xl lg:text-6xl">
              Rooms, halls and the kitchen on one calendar.
            </h1>
            <p className="mb-8 max-w-[52ch] text-lg text-fg-on-ink-muted">
              A wedding is a hall booking, forty room-nights, a banquet menu and a catering
              run. RoomAndDine treats it as one event with one folio.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Book a property walkthrough</Link>
            </Button>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-base">
          <Container className="py-17.5">
            <h2 className="mb-8.5 text-[2.35rem] font-black tracking-tighter">
              One event, four ledgers, no double entry
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((mod) => (
                <GlassCard key={mod.title} hover className="p-7">
                  <h3 className="mb-2.5 text-xl font-extrabold">{mod.title}</h3>
                  <p className="text-[15px] text-fg-muted">{mod.description}</p>
                </GlassCard>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-raised">
          <Container className="py-16">
            <div className="label-mono mb-4.5 text-fg-subtle">Event calendar — placeholder</div>
            <div
              className="flex h-70 items-center justify-center border-2 border-line p-6 text-center font-mono text-[12.5px] leading-loose text-fg-subtle"
              style={{
                background: "repeating-linear-gradient(135deg,#e3e1e1 0 12px,#eae9e9 12px 24px)",
              }}
            >
              screenshot: RoomAndDine month view with hall slots
              <br />
              drop image here
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
