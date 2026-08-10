export const siteConfig = {
  name: "Nesved",
  tagline: "Run the whole floor on one calm system.",
  description:
    "Nesved ties the counter, the kitchen, the captain's hand and the guest's screen together — restaurant, hotel and banquet software for the loud hour, not the demo.",
  url: "https://www.nesved.com",
  contact: {
    email: "contact@nesved.com",
    phone: "+91 8806012475",
    website: "www.nesved.com",
  },
  links: {
    roomAndDine: "https://roomanddine.com",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navConfig: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Suite", href: "/suite" },
  { label: "POS", href: "/pos" },
  { label: "Nesved Live", href: "/live" },
  { label: "RoomAndDine", href: "/roomanddine" },
  { label: "Invobuk", href: "/products/invobuk" },
  { label: "Downloads", href: "/download" },
];

export const footerConfig = {
  columns: [
    {
      title: "Nesved",
      links: [
        { label: "Restaurant POS", href: "/pos" },
        { label: "Live display", href: "/live" },
        { label: "Kitchen", href: "/suite" },
        { label: "Captain", href: "/suite" },
        { label: "CloudMenu", href: "/suite" },
        { label: "Inventory", href: "/suite" },
      ],
    },
    {
      title: "Other products",
      links: [
        { label: "RoomAndDine", href: "/roomanddine" },
        { label: "Invobuk", href: "/products/invobuk" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Downloads", href: "/download" },
        { label: "Book a demo", href: "/contact" },
        { label: "About", href: "/about" },
      ],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
