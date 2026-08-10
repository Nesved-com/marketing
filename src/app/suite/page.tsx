import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "The Nesved Suite",
  description:
    "Six modules, one order, one stock ledger — Nesved POS, Live, Kitchen, Captain, CloudMenu and Inventory, working off the same item master.",
  alternates: { canonical: "/suite" },
};

const modules = [
  {
    name: "Nesved POS",
    description:
      "Counter billing with a table map, KOT routing, split and merge, discounts with reason codes, cashier shifts and a day-close that actually ties.",
    meta: ["Windows · Linux · macOS", "Offline-first", "Thermal & A4 printing"],
  },
  {
    name: "Nesved Live",
    description:
      "The screen your guest watches: token, table and status moving New → Preparing → Ready. The fourth tile of four plays your reel.",
    meta: ["Any HDMI display", "Portrait or landscape", "Reel: 9:16 or 1:1"],
  },
  {
    name: "Nesved Kitchen",
    description:
      "Section-wise KDS with age colouring, recall and course firing. Bump a ticket and every other screen knows at once.",
    meta: ["Touch or bump bar", "Per-section routing", "Prep-time analytics"],
  },
  {
    name: "Nesved Captain",
    description:
      "Table-side ordering on the phone staff already carry. Modifiers, allergen notes and a running table total.",
    meta: ["Android & iOS", "Local Wi-Fi", "Per-steward reports"],
  },
  {
    name: "Nesved CloudMenu",
    description:
      "A QR menu fed by the same item master — photos, tags, timings and out-of-stock that hides itself.",
    meta: ["Hosted or your domain", "Multi-language", "Dine-in ordering optional"],
  },
  {
    name: "Nesved Inventory",
    description:
      "Recipe-linked consumption, purchase and wastage entry, vendor rate history and closing stock value on any date.",
    meta: ["Multi-store", "Recipe costing", "Variance reports"],
  },
];

export default function SuitePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-ink text-fg-on-ink">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden />
          <Container className="relative py-19 lg:py-16.5">
            <span className="label-mono mb-5 block text-accent-soft">Nesved suite</span>
            <h1 className="mb-4.5 max-w-[20ch] text-4xl font-black leading-[1.03] tracking-tighter sm:text-5xl lg:text-6xl">
              Six modules, one order, one stock ledger.
            </h1>
            <p className="max-w-[56ch] text-lg text-fg-on-ink-muted">
              Nothing here is a separate app you reconcile at night. A captain&apos;s tap
              becomes a kitchen ticket, a guest status line and a stock deduction in the same
              second.
            </p>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-raised">
          <Container className="flex flex-col gap-6 py-16.5">
            {modules.map((mod) => (
              <div
                key={mod.name}
                className="grid grid-cols-1 items-start gap-9 border-l-[3px] border-brand-500 bg-bg-base px-7.5 py-7 transition-transform duration-200 hover:translate-x-1 hover:shadow-card-lg sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)]"
              >
                <div className="text-[1.4rem] font-black tracking-tighter">{mod.name}</div>
                <p className="text-[15.5px] text-fg-secondary">{mod.description}</p>
                <div className="font-mono text-xs leading-loose text-fg-muted">
                  {mod.meta.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-base">
          <Container className="grid grid-cols-1 items-center gap-14 py-17.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="order-2 lg:order-1">
              <span className="label-mono mb-4 block text-accent-deep">On the floor</span>
              <h2 className="mb-5 text-3xl font-black leading-tight tracking-tighter sm:text-4xl">
                Captain, on the phone staff already carry.
              </h2>
              <p className="max-w-[46ch] text-lg text-fg-muted">
                A table map staff can read at a glance — occupied tables, running totals and
                guest counts — with orders taken and fired straight from the floor.
              </p>
            </div>
            <div className="order-1 mx-auto lg:order-2">
              <div className="relative aspect-[421/910] w-[240px] overflow-hidden rounded-[1.75rem] border-4 border-ink shadow-deep sm:w-[260px]">
                <Image
                  src="/screenshots/nesved-captain.png"
                  alt="Nesved Captain — table map with live occupancy and running totals, on a staff member's phone"
                  fill
                  className="object-cover object-top"
                  sizes="260px"
                />
              </div>
            </div>
          </Container>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
