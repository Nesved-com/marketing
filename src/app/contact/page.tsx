import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { GradientBeams } from "@/components/effects/gradient-beams";
import { ContactForm } from "@/components/sections/contact-form";
import { GlassCard } from "@/components/ui/glass-card";
import { siteConfig } from "@/config/site";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Nesved",
  description:
    "Get in touch with Nesved — email, call, or send us a message. We're here to help with Quickbuk, Invobuk, pricing and support questions.",
  alternates: { canonical: "/contact" },
};

const businessHours = [
  { day: "Monday – Friday", hours: "9:30 AM – 6:30 PM IST" },
  { day: "Saturday", hours: "10:00 AM – 4:00 PM IST" },
  { day: "Sunday", hours: "Closed" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://x.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative w-full overflow-hidden pt-32 pb-[var(--spacing-section)]">
          <GradientBeams />
          <Container className="relative flex flex-col items-center gap-6 text-center">
            <Badge variant="brand">Contact {siteConfig.name}</Badge>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-fg-primary sm:text-5xl">
              Let&apos;s talk about your business.
            </h1>
            <p className="max-w-xl text-base text-fg-muted sm:text-lg">
              Questions about Quickbuk, Invobuk, pricing or support? Reach out — a real person will get back to you.
            </p>
          </Container>
        </section>

        <section className="relative w-full pb-[var(--spacing-section-lg)]">
          <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
            {/* Left column — contact details */}
            <div className="flex flex-col gap-6">
              <GlassCard variant="strong" className="flex flex-col gap-6 p-8">
                <div className="flex flex-col gap-4">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-glass-border-strong bg-white/[0.04] text-brand-300">
                      <Mail className="size-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-fg-muted">Email</span>
                      <span className="text-sm font-medium text-fg-primary group-hover:text-brand-200">
                        {siteConfig.contact.email}
                      </span>
                    </div>
                  </a>

                  <a
                    href="tel:+918806012475"
                    className="group flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-glass-border-strong bg-white/[0.04] text-brand-300">
                      <Phone className="size-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-fg-muted">Phone</span>
                      <span className="text-sm font-medium text-fg-primary group-hover:text-brand-200">
                        8806012475
                      </span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 rounded-xl p-2">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-glass-border-strong bg-white/[0.04] text-brand-300">
                      <MapPin className="size-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-fg-muted">Company</span>
                      <span className="text-sm font-medium text-fg-primary">Nesved</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-glass-border pt-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-fg-primary">
                    <Clock className="size-4 text-brand-300" />
                    Business Hours
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {businessHours.map((slot) => (
                      <li
                        key={slot.day}
                        className="flex items-center justify-between text-sm text-fg-muted"
                      >
                        <span>{slot.day}</span>
                        <span className="text-fg-secondary">{slot.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-glass-border pt-5">
                  <div className="mb-3 text-sm font-medium text-fg-primary">Follow us</div>
                  <div className="flex items-center gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-10 items-center justify-center rounded-full border border-glass-border-strong bg-white/[0.04] text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-300 hover:shadow-glow-blue"
                      >
                        <social.icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Map placeholder */}
              <GlassCard className="relative flex h-56 items-center justify-center overflow-hidden p-0">
                <div className="bg-mesh absolute inset-0 opacity-60" aria-hidden />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <MapPin className="size-6 text-brand-300" />
                  <span className="text-sm text-fg-muted">
                    Google Map placeholder — embed your office location here
                  </span>
                </div>
              </GlassCard>
            </div>

            {/* Right column — contact form */}
            <ContactForm />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
