import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientBeams } from "@/components/effects/gradient-beams";
import { TrialForm } from "@/components/sections/trial-form";
import { CheckCircle2, CalendarCheck, CreditCard, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Start Your Free Trial",
  description:
    "Start a free trial of Quickbuk — the all-in-one booking and billing platform for venue owners, decorators and caterers. No credit card required.",
  alternates: { canonical: "/trial" },
};

const highlights = [
  { icon: CalendarCheck, label: "Smart booking calendar, from day one" },
  { icon: CreditCard, label: "Integrated payments, no setup fees" },
  { icon: BarChart3, label: "Live revenue & booking analytics" },
];

export default function TrialPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative w-full overflow-hidden pt-32 pb-[var(--spacing-section)]">
          <GradientBeams />
          <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <Badge variant="brand">Free Trial</Badge>
              <h1 className="text-4xl font-semibold tracking-tight text-fg-primary sm:text-5xl">
                Start running your business{" "}
                <GradientText>smarter, today.</GradientText>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
                Tell us a bit about your business and our team will get you
                set up on Quickbuk — no credit card, no commitment.
              </p>

              <div className="flex flex-col gap-3">
                {highlights.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-lg border border-glass-border-strong bg-black/[0.04] text-brand-300">
                      <item.icon className="size-4" />
                    </span>
                    <span className="text-sm text-fg-secondary">{item.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-glass-border-strong bg-black/[0.04] text-brand-300">
                    <CheckCircle2 className="size-4" />
                  </span>
                  <span className="text-sm text-fg-secondary">
                    Priority support from your first day
                  </span>
                </div>
              </div>
            </div>

            <TrialForm />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
