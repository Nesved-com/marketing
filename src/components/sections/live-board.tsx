"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Order {
  id: number;
  token: string;
  table: string;
  status: 0 | 1 | 2;
}

const initialOrders: Order[] = [
  { id: 1, token: "A-12", table: "Table 4", status: 2 },
  { id: 2, token: "A-13", table: "Table 7", status: 1 },
  { id: 3, token: "P-07", table: "Parcel", status: 1 },
  { id: 4, token: "A-14", table: "Table 2", status: 0 },
];

const columns = [
  { label: "NEW", status: 0 as const, tint: "#4a9eff" },
  { label: "PREPARING", status: 1 as const, tint: "#f0a020" },
  { label: "READY", status: 2 as const, tint: "#37c06a" },
];

function clockFor(index: number) {
  const base = 19 * 60 + 25 + index * 7;
  const hh = Math.floor(base / 60) % 12 || 12;
  const mm = base % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")} pm`;
}

/**
 * Live simulation of the Nesved Live guest-facing order board — orders
 * cycle New → Preparing → Ready and a fresh one queues in behind them.
 * `big` renders the full-size /live page version; the default is the
 * compact hero-card size used on the homepage.
 */
export function LiveBoard({ big = false, showReel = true }: { big?: boolean; showReel?: boolean }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [, setSeq] = useState(4);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setOrders((prev) => {
        let next = prev.map((o) => ({ ...o }));
        const ready = next.filter((o) => o.status === 2);
        if (ready.length > 2) next = next.filter((o) => o.id !== ready[0].id);
        const move = next.find((o) => o.status < 2);
        if (move) move.status = (move.status + 1) as 0 | 1 | 2;

        if (next.filter((o) => o.status === 0).length < 2) {
          setSeq((s) => {
            const newSeq = s + 1;
            const t = 1 + (newSeq % 9);
            next.push({
              id: 1000 + newSeq,
              token: (newSeq % 4 === 0 ? "P-" : "A-") + (10 + newSeq),
              table: newSeq % 4 === 0 ? "Parcel" : `Table ${t}`,
              status: 0,
            });
            return newSeq;
          });
        }
        return next.slice(-8);
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border border-white/12 bg-[#050505] shadow-deep">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <span className="flex items-center gap-2.5 text-sm font-extrabold text-fg-on-ink">
          Nesved
          <span className="label-mono flex items-center gap-1.5 text-[#37c06a]">
            <span className="size-1.5 animate-pulsedot rounded-full bg-[#37c06a]" />
            LIVE
          </span>
        </span>
        <span className="text-base font-extrabold text-fg-on-ink">Demo Cafe</span>
        <span className="font-mono text-xs text-fg-on-ink-muted">07:25 pm · Mon, 10 Aug</span>
      </div>

      <div
        className={cn(
          "grid",
          showReel ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"
        )}
      >
        {columns.map((col) => {
          const rows = orders.filter((o) => o.status === col.status).slice(0, big ? 6 : 4);
          return (
            <div key={col.label} className="min-w-0 border-r border-white/10 p-4 last:border-r-0">
              <div className="flex items-center justify-between gap-2 border-b border-white/12 pb-3">
                <span
                  className="text-sm font-extrabold tracking-wide"
                  style={{ color: col.tint }}
                >
                  {col.label}
                </span>
                <span className="rounded-full bg-white/8 px-2 py-0.5 font-mono text-xs text-fg-on-ink-muted">
                  {rows.length}
                </span>
              </div>
              <div className="grid grid-cols-[1fr_1.1fr_auto] gap-2.5 py-2.5 font-mono text-[10px] tracking-wide text-white/35">
                <span>TIME</span>
                <span>TABLE</span>
                <span>TOKEN</span>
              </div>
              <div>
                {rows.map((o, i) => (
                  <div
                    key={o.id}
                    className="grid animate-slidein grid-cols-[1fr_1.1fr_auto] items-center gap-2.5 border-b border-white/8 py-3"
                  >
                    <span className="font-mono text-xs text-white/50">
                      {clockFor(i + o.status)}
                    </span>
                    <span className="text-sm font-extrabold text-fg-on-ink">
                      {o.table.toUpperCase()}
                    </span>
                    <span className="justify-self-end border border-[#3a1210] bg-[#170707] px-2.5 py-1.5 font-mono text-sm font-medium tracking-wide text-[#ff2f22]">
                      {o.token}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {showReel && (
          <div className="flex min-w-0 flex-col p-4">
            <div className="mb-3.5 flex items-center gap-2 border-b border-white/12 pb-3">
              <span className="text-sm font-extrabold tracking-wide text-white/80">
                FEATURED
              </span>
            </div>
            <div
              className="flex flex-1 items-center justify-center p-3.5 text-center"
              style={{
                minHeight: big ? 230 : 160,
                background: "repeating-linear-gradient(135deg,#181818 0 11px,#111 11px 22px)",
                border: "1px solid rgba(243,242,242,.1)",
              }}
            >
              <span className="whitespace-pre-line font-mono text-xs leading-relaxed text-white/40">
                {"reel · 9:16\nyour dish or offer"}
              </span>
            </div>
            <div className="mt-2.5 h-[3px] origin-left animate-reelbar bg-brand-500" />
          </div>
        )}
      </div>
    </div>
  );
}
