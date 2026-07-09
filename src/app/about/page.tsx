import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { GlassCard } from "@/components/ui/glass-card";
import { StatCounter } from "@/components/ui/stat-counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { GradientBeams } from "@/components/effects/gradient-beams";
import { CtaBanner } from "@/components/sections/cta-banner";
import { siteConfig } from "@/config/site";
import {
  Target,
  ShieldCheck,
  Zap,
  Heart,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Nesved",
  description:
    "Nesved builds Quickbuk and Invobuk — software that makes running a business simple. Learn about our mission, our products, and the team behind them.",
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
    title: "Purpose-built, not generic",
    description:
      "Quickbuk and Invobuk are designed around how venues, decorators, caterers and SMEs actually work — not retrofitted from a one-size-fits-all template.",
  },
  {
    icon: ShieldCheck,
    title: "Your data, protected",
    description:
      "Bank-grade payment security via Razorpay, row-level database security, and full compliance with India's Digital Personal Data Protection Act.",
  },
  {
    icon: Zap,
    title: "Fast, offline-ready",
    description:
      "From real-time booking calendars to a fully offline desktop billing app — built to keep working even when your connection doesn't.",
  },
  {
    icon: Heart,
    title: "Support that responds",
    description:
      "Every plan includes priority support, with a one-business-day response commitment — because software is only as good as the help behind it.",
  },
];

const products = [
  {
    name: "Quickbuk",
    logo: "/brand/quickbuk-logo.png",
    tagline: "Event booking, simplified.",
    description:
      "All-in-one platform for venues, decorators & caterers — bookings, payments, staff and reports in one app.",
    href: "/products/quickbuk",
    accent: "var(--brand-400)",
  },
  {
    name: "Invobuk",
    logo: "/brand/invobuk-logo.png",
    tagline: "Billing & invoicing, simplified.",
    description:
      "A desktop app for invoices, quotations, purchase orders and delivery challans — fully offline, one-time licence.",
    href: "/products/invobuk",
    accent: "var(--accent-indigo)",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full overflow-hidden pt-32 pb-[var(--spacing-section)]">
          <GradientBeams />
          <Container className="relative flex flex-col items-center gap-6 text-center">
            <Badge variant="brand">About Nesved</Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg-primary sm:text-5xl lg:text-6xl">
              Software that makes running your{" "}
              <GradientText>business simple.</GradientText>
            </h1>
            <p className="max-w-2xl text-base text-fg-muted sm:text-lg">
              Nesved builds two products: Quickbuk for event bookings, and
              Invobuk for billing &amp; invoicing — each purpose-built for the
              businesses that rely on them every day.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="primary" asChild>
                <Link href="/products/quickbuk">
                  Explore Products
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Talk to Us</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="relative w-full pb-[var(--spacing-section)]">
          <Container>
            <GlassCard
              variant="strong"
              className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-10 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </GlassCard>
          </Container>
        </section>

        {/* Mission */}
        <section className="relative w-full pb-[var(--spacing-section)]">
          <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <Badge variant="brand" className="w-fit">
                Two Products, One Mission
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-fg-primary sm:text-4xl">
                Built by people who&apos;ve run these businesses.
              </h2>
              <p className="text-base leading-relaxed text-fg-muted">
                Nesved started with a simple observation: venues, decorators,
                caterers and small retail businesses were stitching together
                spreadsheets, WhatsApp groups and paper receipts to run
                day-to-day operations. We build software that replaces all of
                that with one dependable system — designed to disappear into
                the workflow, not complicate it.
              </p>
              <p className="text-base leading-relaxed text-fg-muted">
                Today, Quickbuk and Invobuk power hundreds of businesses across
                India, from wedding venues in Pune to retail stores tracking
                every invoice offline.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {products.map((product) => (
                <Link key={product.name} href={product.href}>
                  <GlassCard hover className="group flex h-full flex-col gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.logo}
                        alt=""
                        width={40}
                        height={40}
                        className="size-9 rounded-xl"
                      />
                      <span className="text-lg font-semibold text-fg-primary">
                        {product.name}
                      </span>
                    </div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: product.accent }}
                    >
                      {product.tagline}
                    </p>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {product.description}
                    </p>
                    <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-brand-300 transition-transform duration-300 group-hover:translate-x-1">
                      Learn more
                      <ArrowRight className="size-3.5" />
                    </span>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className="relative w-full pb-[var(--spacing-section)]">
          <Container className="flex flex-col gap-14">
            <SectionHeading
              eyebrow="What We Believe"
              title="The principles behind everything we build."
              description="Four commitments that shape every product decision at Nesved."
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <GlassCard
                  key={value.title}
                  hover
                  className="group flex flex-col gap-4 p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl border border-glass-border-strong bg-black/[0.04] text-brand-300 transition-transform duration-300 group-hover:scale-110">
                    <value.icon className="size-5" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold text-fg-primary">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {value.description}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </Container>
        </section>

        {/* Location / contact strip */}
        <section className="relative w-full pb-[var(--spacing-section)]">
          <Container>
            <GlassCard
              variant="strong"
              className="flex flex-col items-center gap-6 p-10 text-center sm:flex-row sm:justify-between sm:text-left"
            >
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center justify-center gap-2 text-sm font-medium text-fg-primary sm:justify-start">
                  <MapPin className="size-4 text-brand-300" />
                  Pune, Maharashtra, India
                </span>
                <p className="text-sm text-fg-muted">
                  Reach out any time — a real person will get back to you.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-brand-200"
                >
                  <Mail className="size-4 text-brand-300" />
                  {siteConfig.contact.email}
                </a>
                <a
                  href="tel:+918806012475"
                  className="flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-brand-200"
                >
                  <Phone className="size-4 text-brand-300" />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </GlassCard>
          </Container>
        </section>

        <CtaBanner
          title="Ready to run your business smarter?"
          description="Start your free trial of Quickbuk, or download Invobuk today."
        />
      </main>
      <Footer />
    </>
  );
}
