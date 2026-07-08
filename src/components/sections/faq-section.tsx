import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq-accordion";

export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  description = "Everything you need to know about Quickbuk, Invobuk, pricing and support.",
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative w-full overflow-hidden py-[var(--spacing-section)]">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <FaqAccordion items={items} />
      </Container>
    </section>
  );
}
