"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Accordion FAQ that also emits FAQPage JSON-LD so search engines can render
 * rich results. Pass the same `items` used for display straight into this
 * component — the schema and the visible copy never drift apart.
 */
export function FaqAccordion({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
          {items.map((item, index) => (
            <motion.div key={item.question} variants={fadeInUp}>
              <Accordion.Item
                value={`item-${index}`}
                className="glass overflow-hidden rounded-2xl"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-medium text-fg-primary transition-colors hover:text-brand-200 sm:text-base">
                    {item.question}
                    <ChevronDown className="size-4 shrink-0 text-fg-muted transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-brand-300" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden px-6 text-sm leading-relaxed text-fg-muted data-[state=closed]:animate-[accordion-up_0.25s_ease] data-[state=open]:animate-[accordion-down_0.25s_ease]">
                  <div className="pb-5">{item.answer}</div>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </motion.div>
    </div>
  );
}
