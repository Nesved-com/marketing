import type { PricingPlan } from "@/components/ui/pricing-card";

export const quickbukPlans: PricingPlan[] = [
  {
    name: "Venue Owner",
    price: "₹9999",
    period: "year",
    description: "Full booking calendar, payments and staff management for venues.",
    features: [
      "Smart booking & calendar",
      "Integrated payments",
      "Staff management",
      "Priority support",
    ],
    accent: "var(--brand-400)",
    screenshot: "/screenshots/quickbuk-venue-owner-dashboard.jpg",
  },
  {
    name: "Decorator",
    price: "₹4999",
    period: "year",
    description: "Quotes, project tracking and client billing for decorators.",
    features: [
      "Project & quote tracking",
      "Client billing",
      "Reports & analytics",
      "Priority support",
    ],
    accent: "var(--accent-violet)",
    recommended: true,
    screenshot: "/screenshots/quickbuk-decorator-dashboard.jpg",
  },
  {
    name: "Caterer",
    price: "₹5999",
    period: "year",
    description: "Order planning, menus and invoicing built for caterers.",
    features: [
      "Menu & order planning",
      "Invoicing",
      "Expense tracking",
      "Priority support",
    ],
    accent: "var(--success)",
    screenshot: "/screenshots/quickbuk-caterer-dashboard.jpg",
  },
];

export const invobukPlans: PricingPlan[] = [
  {
    name: "Invobuk",
    price: "₹4999",
    period: "year",
    description: "The complete invoicing & inventory suite for SMEs and retail businesses.",
    features: [
      "Unlimited invoices & quotations",
      "Purchase orders & delivery challans",
      "Inventory management",
      "Offline mode + Google Drive sync",
      "Priority support",
    ],
    cta: "Download Now",
    href: "/download",
    accent: "var(--accent-indigo)",
  },
];
