import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FileText, CreditCard, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { invobukFaq } from "@/config/faq";

export const metadata: Metadata = {
  title: "Invobuk — Smart Billing, Simple Business",
  description:
    "The smarter way to run your business. Invobuk is Nesved's offline-first invoicing app — invoices, purchase orders and delivery challans, all in one place.",
  alternates: { canonical: "/products/invobuk" },
  openGraph: {
    title: "Invobuk by Nesved",
    description: "Smart Billing, Simple Business.",
    url: "/products/invobuk",
  },
};

const valueProps = [
  {
    icon: FileText,
    title: "Create Professional Invoices",
    description: "Generate in seconds, send instantly.",
  },
  {
    icon: CreditCard,
    title: "Track Payments Easily",
    description: "Get paid faster with smart reminders.",
  },
  {
    icon: TrendingUp,
    title: "Business Reports & Insights",
    description: "Grow confidently with real-time data.",
  },
];

const features = [
  { title: "Invoicing", description: "Professional, GST-ready invoices generated and sent in seconds." },
  { title: "Purchase orders", description: "Vendor rate history, partial receipts, three-way matching." },
  { title: "Delivery challans", description: "Track goods out the door, linked back to the original order." },
  { title: "Reports & insights", description: "Real-time payment tracking and business reports." },
];

export default function InvobukPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section
          className="relative overflow-hidden text-fg-on-ink"
          style={{ background: "linear-gradient(160deg, #003828 0%, #0a2b22 60%, #131a24 100%)" }}
        >
          <div
            className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-white/5"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-10 size-64 rounded-full bg-white/5"
            aria-hidden
          />
          <Container className="relative grid grid-cols-1 items-center gap-14 py-18 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src="/brand/invobuk-logo.png"
                  alt="Invobuk"
                  width={44}
                  height={44}
                  className="size-11 rounded-xl"
                />
                <div>
                  <div className="text-lg font-black leading-tight">Invobuk</div>
                  <div className="text-xs text-fg-on-ink-muted">Smart Billing, Simple Business</div>
                </div>
              </div>
              <h1 className="mb-5 text-4xl font-black leading-[1.03] tracking-tighter sm:text-5xl">
                The smarter way to run your business.
              </h1>
              <p className="mb-7.5 max-w-[46ch] text-lg text-fg-on-ink-muted">
                Invoicing, purchase orders, and delivery challans — all in one place, fully
                offline.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md" className="bg-[#0c6b4a] hover:bg-[#003828]" asChild>
                  <Link href="/download">Download Invobuk</Link>
                </Button>
                <Button variant="secondary" size="md" asChild>
                  <Link href="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {valueProps.map((v) => (
                <div key={v.title} className="flex items-start gap-4 bg-white/5 p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center bg-[#0c6b4a]">
                    <v.icon className="size-5 text-white" />
                  </span>
                  <div>
                    <div className="font-extrabold">{v.title}</div>
                    <div className="text-sm text-fg-on-ink-muted">{v.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-base">
          <Container className="grid grid-cols-1 gap-6 py-17.5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <GlassCard key={f.title} hover className="border-t-[#0c6b4a] p-7.5">
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
