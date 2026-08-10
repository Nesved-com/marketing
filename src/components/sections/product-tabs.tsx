"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabKey = "nesved" | "rnd" | "invobuk";

const tabs: { key: TabKey; label: string }[] = [
  { key: "nesved", label: "Nesved" },
  { key: "rnd", label: "RoomAndDine" },
  { key: "invobuk", label: "Invobuk" },
];

const panels: Record<
  TabKey,
  {
    title: string;
    description: string;
    cta: string;
    href: string;
    tiles: { title: string; description: string }[];
  }
> = {
  nesved: {
    title: "Nesved · the restaurant suite",
    description:
      "POS, Live, Kitchen, Captain, CloudMenu and Inventory — one install, one login, one price per outlet.",
    cta: "Open the suite",
    href: "/suite",
    tiles: [
      { title: "Restaurant POS", description: "Counter billing, offline-first." },
      { title: "Live display", description: "Status wall + your reel." },
      { title: "Kitchen KDS", description: "Section-wise tickets." },
      { title: "Captain", description: "Table-side ordering." },
      { title: "CloudMenu", description: "QR menu, always current." },
      { title: "Inventory", description: "Recipe-linked stock." },
    ],
  },
  rnd: {
    title: "RoomAndDine",
    description:
      "Rooms, marriage halls, banquets, catering and the in-house restaurant on one calendar and one folio.",
    cta: "Open RoomAndDine",
    href: "/roomanddine",
    tiles: [
      { title: "Rooms", description: "Rate plans, folio, check-in." },
      { title: "Marriage hall", description: "Slot bookings, advances." },
      { title: "Banquet hall", description: "Per-pax packages." },
      { title: "In-house restaurant", description: "Post to room, split bills." },
      { title: "Catering", description: "Off-site orders, costing." },
      { title: "Inventory", description: "One store behind it all." },
    ],
  },
  invobuk: {
    title: "Invobuk",
    description:
      "Quotations out, purchase orders in, sales orders tracked, invoices filed — on Windows, Linux and macOS.",
    cta: "Open Invobuk",
    href: "/products/invobuk",
    tiles: [
      { title: "Quotations", description: "Versioned, convertible." },
      { title: "Purchase orders", description: "Vendor rates, receipts." },
      { title: "Sales orders", description: "Order to dispatch." },
      { title: "Invoices", description: "Tax-ready, recurring." },
    ],
  },
};

export function ProductTabs() {
  const [tab, setTab] = useState<TabKey>("nesved");
  const panel = panels[tab];

  return (
    <section className="border-b-2 border-line bg-bg-base">
      <Container className="py-21">
        <div className="mb-10 max-w-xl">
          <span className="label-mono mb-4 block text-accent-deep">All of it, integrated</span>
          <h2 className="text-3xl font-black leading-tight tracking-tighter sm:text-4xl">
            Three products that already know each other.
          </h2>
        </div>

        <div className="mb-9 flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "mr-6 border-b-[3px] py-3 pr-5 text-left text-lg font-extrabold transition-colors",
                tab === t.key
                  ? "border-brand-500 text-fg-primary"
                  : "border-transparent text-fg-subtle hover:text-fg-secondary"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="flex flex-col justify-between gap-8 bg-ink p-10 text-fg-on-ink shadow-card">
            <div>
              <h3 className="mb-3.5 text-[1.85rem] font-black tracking-tighter">
                {panel.title}
              </h3>
              <p className="max-w-[40ch] text-base text-fg-on-ink-muted">{panel.description}</p>
            </div>
            <Button variant="primary" size="md" className="w-fit" asChild>
              <Link href={panel.href}>{panel.cta}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
            {panel.tiles.map((tile) => (
              <div key={tile.title} className="bg-bg-raised p-6">
                <div className="mb-1.5 font-extrabold">{tile.title}</div>
                <p className="text-sm text-fg-muted">{tile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
