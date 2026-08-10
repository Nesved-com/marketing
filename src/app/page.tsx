import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { ModuleGrid } from "@/components/sections/module-grid";
import { LoudHour } from "@/components/sections/loud-hour";
import { StatsBanner } from "@/components/sections/stats-banner";
import { ProductTabs } from "@/components/sections/product-tabs";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSplit } from "@/components/sections/faq-split";
import { CtaBanner } from "@/components/sections/cta-banner";
import { homeFaq } from "@/config/faq";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ModuleGrid />
        <LoudHour />
        <StatsBanner />
        <ProductTabs />
        <Testimonials />
        <FaqSplit items={homeFaq} />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
