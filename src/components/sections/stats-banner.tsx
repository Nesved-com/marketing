import { Container } from "@/components/ui/container";

const stats = [
  { value: "10 min", label: "install to first bill" },
  { value: "3 OS", label: "Windows · Linux · macOS" },
  { value: "3 products", label: "Nesved · RoomAndDine · Invobuk" },
  { value: "7 days", label: "free pilot on your floor" },
];

export function StatsBanner() {
  return (
    <section className="bg-brand-500 text-fg-on-ink">
      <Container className="grid grid-cols-2 gap-9 py-14 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-[2.75rem] font-black leading-none tracking-tighter">
              {stat.value}
            </div>
            <div className="label-mono mt-2 text-white/85">{stat.label}</div>
          </div>
        ))}
      </Container>
    </section>
  );
}
