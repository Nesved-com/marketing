import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { invobukFaq } from "@/config/faq";

export const metadata: Metadata = {
  title: "Invobuk — Quotations, Orders & Invoices",
  description:
    "Quote it, order it, invoice it, then forget it. Invobuk is Nesved's desktop invoicing and inventory platform for SMEs — quotations, purchase orders, sales orders and invoices on Windows, Linux and macOS.",
  alternates: { canonical: "/products/invobuk" },
  openGraph: {
    title: "Invobuk by Nesved",
    description: "Quote it, order it, invoice it. Then forget it.",
    url: "/products/invobuk",
  },
};

const invoiceLines = [
  { item: "Banquet package — silver", qty: "180", amount: "1,62,000" },
  { item: "Hall rent — evening slot", qty: "1", amount: "45,000" },
  { item: "Décor — mandap", qty: "1", amount: "28,500" },
];

const features = [
  { title: "Quotations", description: "Versioned, comparable, convertible to an order without retyping." },
  { title: "Purchase orders", description: "Vendor rate history, partial receipts, three-way matching." },
  { title: "Sales orders", description: "Order to dispatch to invoice, with pending-quantity views." },
  { title: "Invoices", description: "Tax-ready formats, recurring runs, receipts and ageing." },
];

export default function InvobukPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-ink text-fg-on-ink">
          <div
            className="diagonal-accent pointer-events-none absolute -left-24 -top-24 size-[340px]"
            aria-hidden
          />
          <Container className="relative grid grid-cols-1 items-center gap-14 py-18 lg:grid-cols-2">
            <div>
              <span className="label-mono mb-5 block text-accent-soft">Invobuk</span>
              <h1 className="mb-5 text-4xl font-black leading-[1.03] tracking-tighter sm:text-5xl">
                Quote it, order it, invoice it. Then forget it.
              </h1>
              <p className="mb-7.5 max-w-[46ch] text-lg text-fg-on-ink-muted">
                The paperwork half of the business: quotations, purchase orders, sales orders
                and invoices that all reference the same customers and items.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md" asChild>
                  <Link href="/download">Download Invobuk</Link>
                </Button>
                <Button variant="secondary" size="md" asChild>
                  <Link href="/pricing">See pricing</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white text-fg-primary shadow-deep">
              <div className="border-b-2 border-line-soft px-4.5 py-3.5 font-mono text-[11px] text-fg-subtle">
                INVOICE · INV-2026-0418
              </div>
              <div className="px-4.5 py-5.5">
                <div className="grid grid-cols-[1fr_70px_100px] gap-2 border-b-2 border-line-soft pb-2.5 font-mono text-[11px] text-fg-subtle">
                  <span>ITEM</span>
                  <span>QTY</span>
                  <span className="text-right">AMOUNT</span>
                </div>
                {invoiceLines.map((line) => (
                  <div
                    key={line.item}
                    className="grid grid-cols-[1fr_70px_100px] gap-2 border-b border-line-soft py-2.5 text-[14.5px]"
                  >
                    <span>{line.item}</span>
                    <span className="font-mono">{line.qty}</span>
                    <span className="text-right font-mono">{line.amount}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 text-lg font-black">
                  <span>Payable</span>
                  <span className="font-mono">₹2,63,700</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-line">
                <button className="bg-bg-overlay py-3.5 text-sm font-extrabold hover:bg-line-soft">
                  Export PDF
                </button>
                <button className="bg-brand-500 py-3.5 text-sm font-extrabold text-white hover:bg-brand-700">
                  Send
                </button>
              </div>
            </div>
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

        <FaqSection
          eyebrow="Invobuk FAQ"
          title="Questions about Invobuk"
          items={invobukFaq}
        />

        <CtaBanner
          title="Ready to modernize your invoicing?"
          description="Download Invobuk for Windows, Linux or macOS and get started in minutes."
          primaryLabel="Download Now"
          primaryHref="/download"
        />
      </main>
      <Footer />
    </>
  );
}
