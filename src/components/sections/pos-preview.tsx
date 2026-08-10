const tables = [
  { name: "Table 1", amount: "₹262.50", guests: 4, occupied: true },
  { name: "Table 2", amount: "₹73.50", guests: 1, occupied: true },
  { name: "Table 3", amount: "₹997.50", guests: 8, occupied: true },
  { name: "Table 4", amount: "₹126.00", guests: 1, occupied: true },
  { name: "Table 5", amount: undefined, guests: undefined, occupied: false },
  { name: "Table 6", amount: "₹231.00", guests: 2, occupied: true },
  { name: "Table 7", amount: undefined, guests: undefined, occupied: false },
  { name: "Table 8", amount: "₹120.75", guests: 3, occupied: true },
];

const orderItems = [
  { name: "Cheese Masala Dosa", price: 110, qty: 5, total: "₹550.00" },
  { name: "Ghee Podi Masala Dosa", price: 130, qty: 1, total: "₹130.00" },
  { name: "Ghee Podi Plain Dosa", price: 120, qty: 1, total: "₹120.00" },
];

/** A stylized, representative preview of the Nesved POS table map + order
 * panel — not a literal 1:1 screenshot, but the same visual language as
 * the real app (rounded UI chrome against the flat marketing shell). */
export function PosPreview() {
  return (
    <div className="bg-white text-fg-primary shadow-deep">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft px-4 py-3.5">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-extrabold">Tables</span>
          <span className="text-[11.5px] text-fg-subtle">8 tables</span>
        </div>
        <div className="flex flex-wrap items-center gap-3.5 text-[11px] text-fg-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm border border-line-soft" /> Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-brand-100" /> Occupied
          </span>
          <span className="rounded-[7px] bg-brand-500 px-3 py-1.5 text-[11.5px] font-bold text-white">
            + Add table
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 bg-[#fbfafa] p-4 sm:grid-cols-4">
        {tables.map((t) => (
          <div
            key={t.name}
            className={`relative flex min-h-[104px] flex-col items-center gap-1.5 rounded-[10px] border p-3.5 ${
              t.occupied ? "border-[#e7c8d1] bg-[#f9eef1]" : "border-line-soft bg-white"
            }`}
          >
            <span
              className={`flex size-6.5 items-center justify-center rounded-[7px] ${
                t.occupied ? "bg-[#f4e5e9]" : "bg-bg-overlay"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e0f1f" strokeWidth="2">
                <path d="M3 7h18M5 7l1 13M19 7l-1 13M8 7v13M16 7v13" />
              </svg>
            </span>
            <span className="text-[11.5px] font-bold">{t.name}</span>
            {t.amount && <span className="font-mono text-[10.5px] text-brand-500">{t.amount}</span>}
            {t.guests && (
              <span className="absolute bottom-2 right-2 flex size-[18px] items-center justify-center rounded-full bg-[#8e0f1f] text-[9.5px] font-bold text-white">
                {t.guests}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 border-t border-line-soft sm:grid-cols-2">
        <div className="border-b border-line-soft p-4.5 sm:border-b-0 sm:border-r">
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-baseline gap-2 rounded-[8px] bg-[#7d0e20] px-3.5 py-1.5 text-white">
              <span className="text-[10.5px] font-bold tracking-wide">MASALA DOSA</span>
              <span className="text-[10px] opacity-65">4 items</span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {["Benne", "Butter", "Cheese", "Plain"].map((variant) => (
              <div
                key={variant}
                className="flex flex-col items-center gap-1.5 rounded-[10px] border border-line-soft bg-white p-2.5 text-center"
              >
                <span className="flex size-7 items-center justify-center rounded-[8px] bg-[#f7e9ec]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e0f1f" strokeWidth="2">
                    <circle cx="9" cy="20" r="1" />
                    <circle cx="18" cy="20" r="1" />
                    <path d="M2 3h3l2.6 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" />
                  </svg>
                </span>
                <span className="text-[10px] font-medium leading-tight">{variant} Dosa</span>
                <span className="font-mono text-[10px] text-brand-500">₹110</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col p-4.5">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-sm font-extrabold">
              Current order{" "}
              <span className="font-mono text-[11px] font-normal text-fg-subtle">Bill #43</span>
            </span>
          </div>
          {orderItems.map((item) => (
            <div key={item.name} className="flex items-center gap-2.5 border-b border-line-soft py-2.5">
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-semibold">{item.name}</div>
                <div className="font-mono text-[10px] text-fg-subtle">₹{item.price} each</div>
              </div>
              <div className="rounded-[6px] bg-[#faf1f3] px-2 py-1 text-[11px] font-bold">
                {item.qty}
              </div>
              <div className="w-16 text-right font-mono text-[11.5px] font-semibold">
                {item.total}
              </div>
            </div>
          ))}
          <div className="mt-auto pt-4">
            <div className="flex items-baseline justify-between py-3">
              <span className="text-sm font-extrabold tracking-wide">TOTAL</span>
              <span className="font-mono text-2xl font-bold">₹950.00</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button className="rounded-[8px] bg-[#7d0e20] py-3 text-[13px] font-bold text-white">
                Print KOT
              </button>
              <button className="rounded-[8px] bg-[#1c6b3c] py-3 text-[13px] font-bold text-white">
                Pay &amp; Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
