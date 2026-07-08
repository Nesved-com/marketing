import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/sections/product-hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Benefits } from "@/components/sections/benefits";
import { ScreenshotGallery, type GalleryItem } from "@/components/sections/screenshot-gallery";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PricingCard } from "@/components/ui/pricing-card";
import { StoreBadges } from "@/components/ui/store-badges";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { quickbukPlans } from "@/config/pricing";
import { quickbukFaq } from "@/config/faq";
import { quickbukPersonaScreens } from "@/config/screens";
import { siteConfig } from "@/config/site";

const ACCENT = "var(--brand-400)";

export const metadata: Metadata = {
  title: "Quickbuk — Booking & Billing Automation for Venues, Decorators & Caterers",
  description:
    "Quickbuk is Nesved's flagship SaaS platform for Venue Owners, Decorators and Caterers — manage bookings, calendar, payments, staff, reports and profit & loss in one place.",
  alternates: { canonical: "/products/quickbuk" },
  openGraph: {
    title: "Quickbuk by Nesved",
    description:
      "Booking, payments, staff and reports — the all-in-one platform for venues, decorators and caterers.",
    url: "/products/quickbuk",
  },
};

const galleryItems: GalleryItem[] = [
  { label: "Dashboard", description: "Revenue, bookings and activity at a glance", accent: "var(--brand-400)", src: "/screenshots/quickbuk-venue-owner-dashboard.jpg" },
  { label: "Bookings", description: "Manage every booking in one calendar", accent: "var(--brand-300)", src: "/screenshots/quickbuk-bookings-events.jpg" },
  { label: "Payments", description: "Collect advances and final payments", accent: "var(--accent-cyan)", src: "/screenshots/quickbuk-payments-list.jpg" },
];

export default function QuickbukPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductHero
          eyebrow="Flagship Product"
          title="Meet"
          gradientWord="Quickbuk"
          description="The all-in-one booking and billing automation platform for Venue Owners, Decorators and Caterers — bookings, payments, staff and reports, all in one place."
          primaryHref="/trial"
          secondaryHref="#pricing"
          secondaryLabel="See Pricing"
          device="phone"
          screens={quickbukPersonaScreens}
          accent={ACCENT}
          belowCta={<StoreBadges googlePlayHref={siteConfig.links.quickbukGooglePlay} />}
        />

        <FeatureGrid
          eyebrow="Everything Included"
          title="Every feature you need to run bookings."
          description="From first enquiry to final payment — Quickbuk covers the entire lifecycle of a booking."
          product="quickbuk"
          accent={ACCENT}
        />

        <ScreenshotGallery
          eyebrow="Inside Quickbuk"
          title="A closer look at the interface."
          description="Swipe through the screens your team will use every day."
          items={galleryItems}
        />

        <Benefits
          eyebrow="Why Quickbuk"
          title="Built for how venues, decorators and caterers actually work."
          description="Not a generic tool retrofitted for your industry — Quickbuk was designed around your workflow from day one."
          product="quickbuk"
          accent={ACCENT}
        />

        <section id="pricing" className="relative w-full overflow-hidden py-[var(--spacing-section)]">
          <Container className="flex flex-col gap-14">
            <SectionHeading
              eyebrow="Pricing"
              title="Simple, per-business pricing."
              description="One flat annual price based on your business type — no hidden fees, no per-seat charges."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {quickbukPlans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </Container>
        </section>

        <FaqSection
          eyebrow="Quickbuk FAQ"
          title="Questions about Quickbuk"
          items={quickbukFaq}
        />

        <CtaBanner
          title="Ready to simplify your bookings?"
          description="Start your free trial of Quickbuk today — no credit card required."
        />
      </main>
      <Footer />
    </>
  );
}
