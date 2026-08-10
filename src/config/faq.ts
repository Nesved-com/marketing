import type { FaqItem } from "@/components/ui/faq-accordion";

export const homeFaq: FaqItem[] = [
  {
    question: "Does billing stop if the internet goes?",
    answer:
      "No. Nesved POS is offline-first — bills, KOTs and payments are written locally and reconcile the moment the line is back. The guest display and Captain run on your local network too.",
  },
  {
    question: "Can we keep our existing printers and machines?",
    answer:
      "Usually yes. Thermal and A4 printers, cash drawers and touch monitors that work on Windows, Linux or macOS work with Nesved.",
  },
  {
    question: "How long does setup take?",
    answer:
      "A day for a single outlet, including menu import and staff training. Chains are rolled out outlet by outlet with an on-site engineer.",
  },
  {
    question: "Do we have to take all six modules?",
    answer:
      "No. Start with the POS and CloudMenu; add Kitchen, Captain, Live and Inventory when the floor is ready. Pricing follows the plan, not the module count.",
  },
  {
    question: "Is RoomAndDine separate from Nesved?",
    answer:
      "It is its own product for properties with rooms, marriage and banquet halls and catering — and its in-house restaurant runs the same POS floor you already know.",
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
      "Invobuk is available for Windows, Linux and macOS. You can download the latest version from our Download Center.",
  },
];
