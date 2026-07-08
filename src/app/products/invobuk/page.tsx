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
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { invobukPlans } from "@/config/pricing";
import { invobukFaq } from "@/config/faq";
import { invobukRealScreens } from "@/config/screens";

const ACCENT = "var(--accent-indigo)";

export const metadata: Metadata = {
  title: "Invobuk — Invoicing, Inventory & Order Management for SMEs",
  description:
    "Invobuk is Nesved's desktop invoicing and inventory platform for SMEs and retail businesses — invoices, quotations, purchase orders, inventory and offline mode with Google Drive sync.",
  alternates: { canonical: "/products/invobuk" },
  openGraph: {
    title: "Invobuk by Nesved",
    description:
      "Desktop-grade invoicing, inventory and order management — fast, offline-ready and always in sync.",
    url: "/products/invobuk",
  },
};

const galleryItems: GalleryItem[] = [
  { label: "Dashboard", description: "Sales, invoices and customers at a glance", accent: ACCENT, src: "/screenshots/invobuk-dashboard.jpg", orientation: "landscape" },
  { label: "Sign In", description: "Secure access to your business data", accent: "var(--brand-400)", src: "/screenshots/invobuk-signin.jpg", orientation: "landscape" },
];

export default function InvobukPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductHero
          eyebrow="Invoicing & Payments"
          title="Introducing"
          gradientWord="Invobuk"
          description="Desktop-grade invoicing, inventory and order management for SMEs and retail businesses — create, send and track invoices while staying in sync across every device."
          primaryHref="/download"
          primaryLabel="Download Now"
          secondaryHref="#pricing"
          secondaryLabel="See Pricing"
          device="laptop"
          screens={invobukRealScreens}
          accent={ACCENT}
        />

        <FeatureGrid
          eyebrow="Everything Included"
          title="Every tool your back office needs."
          description="Invoices, purchase orders, inventory and reports — all in one native desktop app."
          product="invobuk"
          accent={ACCENT}
        />

        <ScreenshotGallery
          eyebrow="Inside Invobuk"
          title="A closer look at the interface."
          description="Scroll through the screens that power day-to-day operations."
          items={galleryItems}
        />

        <Benefits
          eyebrow="Why Invobuk"
          title="Desktop-grade reliability, cloud-grade convenience."
          description="Invobuk combines the speed of a native app with the flexibility of the cloud."
          product="invobuk"
          accent={ACCENT}
        />

        <section id="pricing" className="relative w-full overflow-hidden py-[var(--spacing-section)]">
          <Container className="flex flex-col gap-14">
            <SectionHeading
              eyebrow="Pricing"
              title="One simple plan."
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
          eyebrow="Invobuk FAQ"
          title="Questions about Invobuk"
          items={invobukFaq}
        />

        <CtaBanner
          title="Ready to modernize your invoicing?"
          description="Download Invobuk for Windows or Linux and get started in minutes."
          primaryLabel="Download Now"
          primaryHref="/download"
        />
      </main>
      <Footer />
    </>
  );
}
