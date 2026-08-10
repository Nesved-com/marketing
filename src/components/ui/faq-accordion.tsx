"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
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
    <div className={cn("w-full", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-col gap-0.5 bg-line"
      >
        <Accordion.Root type="single" collapsible className="contents">
          {items.map((item, index) => (
            <motion.div key={item.question} variants={fadeInUp}>
              <Accordion.Item value={`item-${index}`} className="bg-bg-raised">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-extrabold text-fg-primary transition-colors hover:text-brand-500 data-[state=open]:text-brand-500">
                    {item.question}
                    <span className="relative size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45">
                      <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 bg-current" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden px-6 text-[15.5px] leading-relaxed text-fg-muted data-[state=closed]:animate-[accordion-up_0.25s_ease] data-[state=open]:animate-[accordion-down_0.25s_ease]">
                  <div className="max-w-[62ch] pb-6">{item.answer}</div>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </motion.div>
    </div>
  );
}
