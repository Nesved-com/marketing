import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Twenty minutes, your menu, our screens. Tell us what you run and we'll bring a demo outlet set up like yours — POS, kitchen screen and the guest display.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="border-b-2 border-line bg-bg-base">
          <Container className="grid grid-cols-1 items-start gap-16 py-17.5 lg:grid-cols-2">
            <div>
              <span className="label-mono mb-4 block text-accent-deep">Book a demo</span>
              <h1 className="mb-4.5 max-w-[20ch] text-[2.75rem] font-black leading-[1.05] tracking-tighter">
                Twenty minutes, your menu, our screens.
              </h1>
              <p className="mb-8 max-w-[44ch] text-lg text-fg-muted">
                Tell us what you run and we&apos;ll bring a demo outlet set up like yours —
                POS, kitchen screen and the guest display.
              </p>
              <div className="bg-ink px-7 py-7.5 font-mono text-[13.5px] leading-loose text-fg-on-ink">
                {siteConfig.contact.email}
                <br />
                {siteConfig.contact.phone}
                <br />
                Mon–Sat · 10:00–19:00
              </div>
            </div>

            <ContactForm />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
