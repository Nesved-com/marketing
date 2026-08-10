import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq-accordion";

export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  description = "Everything you need to know, in plain terms.",
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-b-2 border-line bg-bg-base">
      <Container className="flex flex-col gap-11 py-21">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mx-auto w-full max-w-3xl">
          <FaqAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}
