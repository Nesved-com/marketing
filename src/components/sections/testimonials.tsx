"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "The guest screen ended the \"how long more?\" queue at the counter. Staff finally get to serve instead of explain.",
    name: "Owner name",
    context: "Restaurant · city",
  },
  {
    quote:
      "Closing stock used to be a Sunday job. Now it's a screen — the recipes take it out as we bill.",
    name: "Owner name",
    context: "Chain · 4 outlets",
  },
  {
    quote:
      "One wedding, one file: hall, rooms, banquet menu and catering. The accountant stopped calling me.",
    name: "Owner name",
    context: "Hotel & banquet",
  },
];

export function Testimonials() {
  return (
    <section className="border-b-2 border-line bg-bg-raised">
      <Container className="py-21">
        <span className="label-mono mb-4 block text-accent-deep">From the floor</span>
        <h2 className="mb-11 max-w-[18ch] text-3xl font-black leading-tight tracking-tighter sm:text-4xl">
          What owners say after a month.
        </h2>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.quote}
              variants={fadeInUp}
              className="border-2 border-line bg-bg-base p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-lg"
            >
              <div className="mb-4 text-5xl font-black leading-none text-brand-500">&ldquo;</div>
              <p className="mb-6 text-[16.5px] leading-relaxed">{t.quote}</p>
              <div className="flex items-center gap-3 border-t-2 border-line pt-4.5">
                <div
                  className="size-10 shrink-0"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg,#d7d3d3 0 6px,#e3e1e1 6px 12px)",
                  }}
                />
                <div>
                  <div className="text-sm font-extrabold">{t.name}</div>
                  <div className="label-mono text-fg-subtle">{t.context}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
