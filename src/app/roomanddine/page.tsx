import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, Receipt, UtensilsCrossed, Boxes, Users } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/sections/faq-section";

export const metadata: Metadata = {
  title: "RoomAndDine — Rooms and Dining, Run as One",
  description:
    "RoomAndDine is a single platform for hotels, banquet halls, and restaurants — bookings, GST invoicing, dine-in POS, inventory, and staff, all in one place.",
  alternates: { canonical: "/roomanddine" },
};

const RND_FROM = "#4c1d96";
const RND_VIA = "#6d28d9";
const RND_TO = "#3b82f6";

const featureStrip = ["Bookings", "GST Invoicing", "Dine-in POS", "Inventory", "Staff"];

const modules = [
  {
    icon: CalendarCheck,
    title: "Room bookings",
    description:
      "Real-time availability, double-booking prevention, check-in/out and quotations — all from one calendar.",
  },
  {
    icon: UtensilsCrossed,
    title: "Dine-in POS",
    description: "Table management, KOT and guest orders that flow straight into one revenue view.",
  },
  {
    icon: Receipt,
    title: "GST invoicing",
    description: "Quotations, catering and GST-compliant bills with CGST/SGST splitting, built in.",
  },
  {
    icon: Boxes,
    title: "Inventory",
    description: "One store behind rooms, kitchen and housekeeping — stock that reconciles itself.",
  },
  {
    icon: Users,
    title: "Staff",
    description: "Role-based access and activity logs, so every account only sees what it needs to.",
  },
];

const faq = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes — every new signup gets a 3-day free trial on the plan you pick, with full access to that plan's features. No credit card required to start.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, anytime from Plans & Billing inside the app. Switching takes effect immediately, and if your payment method supports it, no new checkout is needed.",
  },
  {
    question: "Do I need separate software for my restaurant and my rooms?",
    answer:
      "No — that's the point. The All Inclusive plan covers both under one login, including charging restaurant orders straight to a guest's room bill.",
  },
  {
    question: "Are the invoices GST-compliant?",
    answer:
      "Yes — invoices, receipts, and quotations support GST numbers, configurable tax rates, and CGST/SGST splitting.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data stays yours. You can export what you need before cancelling, and your account simply stops being billed going forward.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes — passwords are hashed, sessions are server-side, and every account is scoped strictly to your own venue's data.",
  },
];

export default function RoomAndDinePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section
          className="relative overflow-hidden text-white"
          style={{ background: `linear-gradient(135deg, ${RND_FROM} 0%, ${RND_VIA} 55%, ${RND_TO} 100%)` }}
        >
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
          <Container className="relative py-18">
            <div className="mb-6 flex items-center gap-3.5">
              <Image
                src="/brand/roomanddine-logo.png"
                alt="RoomAndDine"
                width={52}
                height={52}
                className="size-13 rounded-2xl shadow-deep"
              />
              <div>
                <div className="text-xl font-black leading-tight">
                  Room<span className="opacity-70">and</span>Dine
                </div>
                <div className="text-xs text-white/70">Rooms and dining, run as one.</div>
              </div>
            </div>
            <h1 className="mb-6 max-w-[22ch] text-4xl font-black leading-[1.02] tracking-tighter sm:text-5xl lg:text-6xl">
              Rooms, banquets &amp; dining — in one place.
            </h1>
            <p className="mb-8 max-w-[54ch] text-lg text-white/80">
              RoomAndDine brings room reservations, banquet events, and restaurant table
              orders into a single, elegant booking platform your team will actually love.
            </p>
            <div className="mb-9 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white text-[#4c1d96] hover:bg-white/90"
                asChild
              >
                <a href="https://app.roomanddine.com" target="_blank" rel="noopener noreferrer">
                  Start free trial
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="https://www.roomanddine.com" target="_blank" rel="noopener noreferrer">
                  Visit roomanddine.com
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {featureStrip.map((f) => (
                <span
                  key={f}
                  className="border border-white/25 px-3 py-1.5 text-xs font-bold text-white/85"
                >
                  {f}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-base">
          <Container className="py-17.5">
            <div className="relative aspect-[1536/831] w-full overflow-hidden border border-line shadow-deep">
              <Image
                src="/screenshots/roomanddine-dashboard.png"
                alt="RoomAndDine dashboard — bookings, revenue, and enquiries at a glance"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1300px) 100vw, 1232px"
              />
            </div>
          </Container>
        </section>

        <section className="border-b-2 border-line bg-bg-raised">
          <Container className="py-17.5">
            <h2 className="mb-2.5 text-[2.35rem] font-black tracking-tighter">
              Occupancy, upcoming events, and live table turnover —
            </h2>
            <p className="mb-8.5 max-w-[56ch] text-lg text-fg-muted">
              in a single command center. Make faster decisions with numbers that update in
              real time.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((mod) => (
                <GlassCard key={mod.title} hover className="border-t-[#6d28d9] p-7">
                  <span
                    className="mb-4 flex size-11 items-center justify-center text-white"
                    style={{ background: `linear-gradient(135deg, ${RND_VIA}, ${RND_TO})` }}
                  >
                    <mod.icon className="size-5" />
                  </span>
                  <h3 className="mb-2.5 text-xl font-extrabold">{mod.title}</h3>
                  <p className="text-[15px] text-fg-muted">{mod.description}</p>
                </GlassCard>
              ))}
            </div>
          </Container>
        </section>

        <FaqSection
          eyebrow="Questions"
          title="Everything you need to know"
          description="Straight from the RoomAndDine team."
          items={faq}
        />
      </main>
      <Footer />
    </>
  );
}
