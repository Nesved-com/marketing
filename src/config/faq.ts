import type { FaqItem } from "@/components/ui/faq-accordion";

export const quickbukFaq: FaqItem[] = [
  {
    question: "What is Quickbuk and who is it built for?",
    answer:
      "Quickbuk is Nesved's flagship booking and billing automation platform, purpose-built for venue owners, decorators and caterers who need to manage bookings, payments, staff and reports in one place.",
  },
  {
    question: "Can I manage multiple venues or staff members in Quickbuk?",
    answer:
      "Yes. Quickbuk includes a shared calendar across venues and teams, along with dedicated staff management so you can assign bookings, track availability and avoid double-booking.",
  },
  {
    question: "Does Quickbuk handle payments and invoicing?",
    answer:
      "Quickbuk has integrated payments, expense tracking and profit & loss reporting, so you can collect payments and understand your margins without switching tools.",
  },
];

export const invobukFaq: FaqItem[] = [
  {
    question: "What does Invobuk do?",
    answer:
      "Invobuk is Nesved's invoicing and inventory management product for SMEs and retail businesses, covering invoices, quotations, purchase orders, sales orders and delivery challans.",
  },
  {
    question: "Does Invobuk work offline?",
    answer:
      "Yes. Invobuk includes a full offline mode so you can keep creating invoices and managing inventory without an internet connection — changes sync automatically once you're back online.",
  },
  {
    question: "Which platforms does Invobuk support?",
    answer:
      "Invobuk is available for Windows and Linux today, with macOS support coming soon. You can download the latest version from our Download Center.",
  },
];

export const pricingFaq: FaqItem[] = [
  {
    question: "How is Quickbuk priced?",
    answer:
      "Quickbuk is priced per business type: ₹9,999/year for Venue Owners, ₹4,999/year for Decorators, and ₹5,999/year for Caterers — each plan includes full feature access and priority support.",
  },
  {
    question: "How is Invobuk priced?",
    answer:
      "Invobuk is available for a single flat price of ₹4,999/year — full feature access, no tiers, no per-seat charges.",
  },
  {
    question: "Can I switch plans or cancel anytime?",
    answer:
      "Absolutely. You can upgrade, downgrade or cancel your subscription at any time from your account dashboard — there are no long-term lock-in contracts.",
  },
];

export const supportFaq: FaqItem[] = [
  {
    question: "What support does Nesved provide?",
    answer:
      "Every plan includes priority support via email and chat, with a one-business-day response commitment.",
  },
  {
    question: "Is my data synced across devices?",
    answer:
      "Yes. Quickbuk syncs in real time across web and mobile, and Invobuk supports Google Drive sync so your invoices and inventory stay consistent across every device you use.",
  },
];

export const allFaq: FaqItem[] = [
  ...quickbukFaq,
  ...invobukFaq,
  ...pricingFaq,
  ...supportFaq,
];
