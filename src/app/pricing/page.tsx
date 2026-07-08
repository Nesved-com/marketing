import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/ui/gradient-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCard } from "@/components/ui/pricing-card";
import { GradientBeams } from "@/components/effects/gradient-beams";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { quickbukPlans, invobukPlans } from "@/config/pricing";
import { pricingFaq } from "@/config/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, honest pricing for Quickbuk and Invobuk. Per-business annual plans for venue owners, decorators and caterers, plus one flat plan for Invobuk.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative w-full overflow-hidden pt-32 pb-[var(--spacing-section-sm)]">
          <GradientBeams />
          <Container className="relative flex flex-col items-center gap-6 text-center">
            <Badge variant="brand">Pricing</Badge>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-fg-primary sm:text-5xl">
              Honest pricing, <GradientText>no surprises.</GradientText>
            </h1>
            <p className="max-w-xl text-base text-fg-muted sm:text-lg">
              Two products, two simple pricing models — pick the one that fits
              your business.
            </p>
          </Container>
        </section>

        <section className="relative w-full py-[var(--spacing-section)]">
          <Container className="flex flex-col gap-14">
            <SectionHeading
              eyebrow="Quickbuk"
              title="Choose your role"
              description="One flat annual price based on your business type — no hidden fees, no per-seat charges."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {quickbukPlans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </Container>
        </section>

        <section className="relative w-full py-[var(--spacing-section)]">
          <Container className="flex flex-col gap-14">
            <SectionHeading
              eyebrow="Invobuk"
              title="One simple plan"
              description="Everything you need to run invoicing, inventory and orders — no tiers, no per-seat charges."
            />
            <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-6">
              {invobukPlans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </Container>
        </section>

        <FaqSection
          eyebrow="Pricing FAQ"
          title="Questions about pricing"
          items={pricingFaq}
        />

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
