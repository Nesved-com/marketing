export const siteConfig = {
  name: "Nesved",
  tagline: "Powering Modern Businesses with Intelligent Software.",
  description:
    "Nesved builds software that helps businesses automate bookings, billing, payments, reports and business growth.",
  url: "https://www.nesved.com",
  contact: {
    email: "contact@nesved.com",
    phone: "+91 8806012475",
    website: "www.nesved.com",
  },
  links: {
    quickbukGooglePlay:
      "https://play.google.com/store/apps/details?id=com.nesved.quickbuk",
  },
} as const;

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const navConfig: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    children: [
      {
        label: "Quickbuk",
        href: "/products/quickbuk",
        description: "Flagship booking & billing automation platform.",
      },
      {
        label: "Invobuk",
        href: "/products/invobuk",
        description: "Smart invoicing and payments, simplified.",
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerConfig = {
  columns: [
    {
      title: "Products",
      links: [
        { label: "Quickbuk", href: "/products/quickbuk" },
        { label: "Invobuk", href: "/products/invobuk" },
        { label: "Pricing", href: "/pricing" },
        { label: "Download", href: "/download" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Start Free Trial", href: "/trial" },
      ],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
