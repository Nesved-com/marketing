import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({
  eyebrow,
  title,
  effectiveDate,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="border-b-2 border-line bg-bg-base py-17.5">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <Badge variant="brand">{eyebrow}</Badge>
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">{title}</h1>
          <p className="label-mono text-fg-subtle">Effective Date: {effectiveDate}</p>
        </div>

        <GlassCard variant="plain" className="flex flex-col gap-10 p-8 sm:p-12">
          <p className="text-base leading-relaxed text-fg-secondary">{intro}</p>

          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-3">
              <h2 className="text-xl font-extrabold">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="whitespace-pre-line text-sm leading-relaxed text-fg-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </GlassCard>
      </Container>
    </section>
  );
}
