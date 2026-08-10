export interface NesvedTier {
  eyebrow: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

/** Nesved suite pricing — three outlet-based tiers, middle one raised/featured. */
export const nesvedTiers: NesvedTier[] = [
  {
    eyebrow: "Counter",
    price: "₹799",
    period: "/ outlet / month",
    features: ["Nesved POS", "Nesved Live (1 screen)", "CloudMenu", "Email support"],
    cta: "Start here",
  },
  {
    eyebrow: "Full floor · most chosen",
    price: "₹1,499",
    period: "/ outlet / month",
    features: [
      "Everything in Counter",
      "Kitchen (KDS) + Captain",
      "Inventory & recipe costing",
      "Live on unlimited screens",
      "Phone support",
    ],
    cta: "Book a demo",
    featured: true,
  },
  {
    eyebrow: "Chain",
    price: "Custom",
    period: "5+ outlets",
    features: [
      "Everything in Full floor",
      "Central item & price control",
      "Consolidated reporting",
      "On-site rollout & training",
      "Named account manager",
    ],
    cta: "Talk to us",
  },
];

export interface ProductPricing {
  name: string;
  price: string;
  period: string;
  description: string;
}

export const otherPricing: ProductPricing[] = [
  {
    name: "RoomAndDine",
    price: "₹2,499",
    period: "/ property / month",
    description: "Rooms, marriage & banquet halls, catering, in-house restaurant and stores.",
  },
  {
    name: "Invobuk",
    price: "₹399",
    period: "/ user / month",
    description: "Invoices, quotations, purchase and sales orders. Windows, Linux and macOS.",
  },
];
