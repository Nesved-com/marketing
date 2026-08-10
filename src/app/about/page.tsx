import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { StatCounter } from "@/components/ui/stat-counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBanner } from "@/components/sections/cta-banner";
import { siteConfig } from "@/config/site";
import { Target, ShieldCheck, Zap, Headphones, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "About Nesved",
  description:
    "Nesved builds software for the loud hour — restaurants, hotels and banquets, plus the paperwork behind them. Learn about our mission and products.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: 500, suffix: "+", label: "Businesses" },
  { value: 20000, suffix: "+", label: "Bookings" },
  { value: 10, prefix: "₹", suffix: "Cr+", label: "Transactions" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
] as const;

const values = [
  {
    icon: Target,
    title: "Built for the floor, not the demo",
    description:
      "Every Nesved module is designed around the loud hour — a full house, a queue at the counter — not retrofitted from a one-size-fits-all template.",
  },
  {
    icon: ShieldCheck,
    title: "Your data, protected",
    description:
      "Bank-grade payment security via Razorpay, row-level database security, and full compliance with India's Digital Personal Data Protection Act.",
  },
  {
    icon: Zap,
    title: "Offline-first",
    description:
      "Bills, KOTs and invoices are written locally and reconcile the moment the connection returns — nothing stops for a dropped Wi-Fi signal.",
  },
  {
    icon: Headphones,
    title: "Support that responds",
    description:
      "Every plan includes priority support, with a one-business-day response commitment — because software is only as good as the help behind it.",
  },
];

const products = [
  {
    name: "Nesved",
    tagline: "The restaurant suite.",
    description: "POS, Live, Kitchen, Captain, CloudMenu and Inventory — one install, one login.",
    href: "/suite",
  },
  {
    name: "RoomAndDine",
    tagline: "Hospitality, one folio.",
    description: "Rooms, halls, banquets and catering under one calendar.",
    href: "/roomanddine",
  },
  {
    name: "Invobuk",
    tagline: "Billing & invoicing.",
    description: "Quotations, purchase orders, sales orders and invoices, offline-ready.",
    href: "/products/invobuk",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-ink text-fg-on-ink">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden />
          <Container className="relative flex flex-col items-center gap-6 py-19 text-center">
            <Badge variant="onInk">About Nesved</Badge>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl">
              Software that makes running your{" "}
              <span className="text-brand-400">business simple.</span>
            </h1>
            <p className="max-w-2xl text-lg text-fg-on-ink-muted">
              Nesved builds a growing family of products — the restaurant suite, RoomAndDine
              for hospitality, and Invobuk for billing — each purpose-built for the businesses
              that rely on them every day.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="primary" asChild>
                <Link href="/suite">Explore the suite</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Talk to Us</Link>
              </Button>
            </div>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-base">
          <Container className="py-17.5">
            <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-8 border-2 border-line bg-bg-raised px-6 py-10 shadow-card sm:grid-cols-4">
              {stats.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-raised">
          <Container className="py-17.5">
            <div className="mb-11 max-w-2xl">
              <Badge variant="brand" className="mb-5 w-fit">
                One Family, One Mission
              </Badge>
              <h2 className="mb-4 text-3xl font-black leading-tight tracking-tighter sm:text-4xl">
                Built by people who&apos;ve run these businesses.
              </h2>
              <p className="mb-3.5 text-base leading-relaxed text-fg-muted">
                Nesved started with a simple observation: restaurants, hotels, banquets and
                small businesses were stitching together spreadsheets, WhatsApp groups and
                paper receipts to run day-to-day operations. We build software that replaces
                all of that with one dependable system — designed to disappear into the
                workflow, not complicate it.
              </p>
              <p className="text-base leading-relaxed text-fg-muted">
                Today, Nesved, RoomAndDine and Invobuk power hundreds of businesses across
                India.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {products.map((product) => (
                <Link key={product.name} href={product.href}>
                  <GlassCard hover className="group flex h-full flex-col gap-3 p-7">
                    <h3 className="text-xl font-extrabold">{product.name}</h3>
                    <p className="text-sm font-bold text-accent-deep">{product.tagline}</p>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {product.description}
                    </p>
                    <span className="mt-auto text-sm font-extrabold text-accent-deep transition-transform duration-200 group-hover:translate-x-1">
                      Learn more →
                    </span>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-base">
          <Container className="flex flex-col gap-11 py-17.5">
            <SectionHeading
              eyebrow="What We Believe"
              title="The principles behind everything we build."
              description="Four commitments that shape every product decision at Nesved."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <GlassCard key={value.title} hover className="flex flex-col gap-4 p-7">
                  <span className="flex size-11 items-center justify-center bg-brand-100 text-brand-500">
                    <value.icon className="size-5" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-extrabold">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {value.description}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-raised">
          <Container className="py-14">
            <div className="flex flex-col items-center gap-6 bg-ink p-10 text-center text-fg-on-ink sm:flex-row sm:justify-between sm:text-left">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-bold">Pune, Maharashtra, India</span>
                <p className="text-sm text-fg-on-ink-muted">
                  Reach out any time — a real person will get back to you.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-sm text-fg-on-ink-muted transition-colors hover:text-fg-on-ink"
                >
                  <Mail className="size-4" />
                  {siteConfig.contact.email}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-sm text-fg-on-ink-muted transition-colors hover:text-fg-on-ink"
                >
                  <Phone className="size-4" />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </Container>
        </section>

        <CtaBanner
          title="Ready to run your business smarter?"
          description="Book a demo of the full suite, or download Invobuk today."
        />
      </main>
      <Footer />
    </>
  );
}
