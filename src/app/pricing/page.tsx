import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { nesvedTiers, otherPricing } from "@/config/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Priced per outlet, not per feature. Nesved suite plans from ₹799/outlet/month, plus RoomAndDine and Invobuk pricing — every plan includes the desktop apps, updates and support.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink text-fg-on-ink">
          <Container className="py-17 pb-27">
            <h1 className="mb-4.5 text-4xl font-black tracking-tighter sm:text-5xl">
              Priced per outlet, not per feature.
            </h1>
            <p className="max-w-[52ch] text-lg text-fg-on-ink-muted">
              Every plan includes the desktop apps, updates and support. Indicative figures —
              the final quote comes after we see your floor.
            </p>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-base">
          <Container className="pb-19">
            <div className="relative z-10 -mt-18 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {nesvedTiers.map((tier) => (
                <div
                  key={tier.eyebrow}
                  className={cn(
                    "flex flex-col p-9.5 transition-all duration-200",
                    tier.featured
                      ? "-translate-y-3.5 bg-ink text-fg-on-ink shadow-card-lg"
                      : "bg-bg-raised shadow-card hover:-translate-y-1.5 hover:shadow-card-lg"
                  )}
                >
                  <span
                    className={cn(
                      "label-mono mb-4",
                      tier.featured ? "text-accent-soft" : "text-fg-subtle"
                    )}
                  >
                    {tier.eyebrow}
                  </span>
                  <div className="text-[2.75rem] font-black leading-none tracking-tighter">
                    {tier.price}
                  </div>
                  <div
                    className={cn(
                      "my-2 font-mono text-xs",
                      tier.featured ? "text-fg-on-ink-muted" : "text-fg-subtle"
                    )}
                  >
                    {tier.period}
                  </div>
                  <ul className="mb-6.5 mt-4 flex flex-col gap-2 text-sm">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className={cn(
                          "flex items-start gap-2",
                          tier.featured ? "text-fg-on-ink-muted" : "text-fg-secondary"
                        )}
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={tier.featured ? "primary" : "outline"}
                    size="md"
                    className="mt-auto"
                    asChild
                  >
                    <Link href="/contact">{tier.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {otherPricing.map((p) => (
                <div key={p.name} className="border-l-[3px] border-brand-500 bg-bg-raised p-8 shadow-card">
                  <h3 className="mb-2 text-xl font-extrabold">{p.name}</h3>
                  <div className="mb-2 text-[1.7rem] font-black tracking-tighter">
                    {p.price}{" "}
                    <span className="font-mono text-xs font-normal text-fg-subtle">
                      {p.period}
                    </span>
                  </div>
                  <p className="text-[15px] text-fg-muted">{p.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
