import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { QuickbukShowcase } from "@/components/sections/quickbuk-showcase";
import { ScrollStory } from "@/components/sections/scroll-story";
import { InvobukShowcase } from "@/components/sections/invobuk-showcase";
import { ScreenshotGallery, type GalleryItem } from "@/components/sections/screenshot-gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { CinematicDemo } from "@/components/sections/cinematic-demo";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { allFaq } from "@/config/faq";

const galleryItems: GalleryItem[] = [
  { label: "Dashboard", description: "Quickbuk · Mobile", accent: "var(--brand-400)", src: "/screenshots/quickbuk-venue-owner-dashboard.jpg" },
  { label: "Bookings", description: "Quickbuk · Mobile", accent: "var(--brand-300)", src: "/screenshots/quickbuk-bookings-events.jpg" },
  { label: "Payments", description: "Quickbuk · Mobile", accent: "var(--accent-cyan)", src: "/screenshots/quickbuk-payments-list.jpg" },
  { label: "Dashboard", description: "Invobuk · Desktop", accent: "var(--accent-indigo)", src: "/screenshots/invobuk-dashboard.jpg", orientation: "landscape" },
  { label: "Sign In", description: "Invobuk · Desktop", accent: "var(--brand-400)", src: "/screenshots/invobuk-signin.jpg", orientation: "landscape" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <ProductsShowcase />
        <QuickbukShowcase />
        <ScrollStory />
        <InvobukShowcase />
        <ScreenshotGallery items={galleryItems} />
        <Testimonials />
        <CinematicDemo />
        <FaqSection items={allFaq} />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
