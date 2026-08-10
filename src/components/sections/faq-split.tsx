import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq-accordion";

export function FaqSplit({ items }: { items: FaqItem[] }) {
  return (
    <section className="border-b-2 border-line bg-bg-base">
      <Container className="grid grid-cols-1 items-start gap-16 py-21 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <span className="label-mono mb-4 block text-accent-deep">Questions</span>
          <h2 className="mb-4.5 text-[2.4rem] font-black leading-tight tracking-tighter">
            The things everyone asks first.
          </h2>
          <p className="mb-5.5 text-base text-fg-muted">
            Anything else, ask us on the demo call — we bring the answers and the machine.
          </p>
          <Button variant="ink" size="md" asChild>
            <Link href="/contact">Ask us directly</Link>
          </Button>
        </div>
        <FaqAccordion items={items} />
      </Container>
    </section>
  );
}
