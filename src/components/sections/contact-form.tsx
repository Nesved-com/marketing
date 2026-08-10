"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const businessTypes = ["Single restaurant", "Chain", "Hotel / banquet", "Accounts only"];

const fieldClass =
  "border-0 border-b-2 border-line bg-transparent px-0.5 py-2.5 text-[15px] text-fg-primary placeholder:text-fg-subtle focus:border-brand-500 focus:outline-none";

// Web3Forms access key — delivers submissions to contact@nesved.com.
const WEB3FORMS_KEY = "29ca0629-24ae-487a-b3a8-8515ac4ba09d";

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    type: "Single restaurant",
  });

  function updateField<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Nesved demo request from ${form.name} (${form.type})`,
          from_name: form.name,
          business: form.business,
          phone: form.phone,
          type: form.type,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-bg-raised p-8.5 shadow-card sm:p-9">
      {status === "sent" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="flex flex-col items-center gap-3 py-16 text-center"
        >
          <CheckCircle2 className="size-10 text-success" />
          <h3 className="text-lg font-extrabold">Request sent</h3>
          <p className="max-w-xs text-sm text-fg-muted">
            Thanks for reaching out — our team will get back to you within one business day to
            set up the demo.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5">
          {status === "error" && (
            <div className="flex items-center gap-2 border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              <AlertCircle className="size-4 shrink-0" />
              Something went wrong — please try again, or email us directly.
            </div>
          )}

          <label className="grid gap-2">
            <span className="label-mono text-fg-muted">Your name</span>
            <input
              required
              placeholder="Ramesh Kulkarni"
              className={fieldClass}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </label>

          <label className="grid gap-2">
            <span className="label-mono text-fg-muted">Business</span>
            <input
              required
              placeholder="Outlet, hotel or banquet name"
              className={fieldClass}
              value={form.business}
              onChange={(e) => updateField("business", e.target.value)}
            />
          </label>

          <label className="grid gap-2">
            <span className="label-mono text-fg-muted">Phone</span>
            <input
              required
              placeholder="+91"
              className={fieldClass}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </label>

          <div className="grid gap-2.5">
            <span className="label-mono text-fg-muted">What do you run?</span>
            <div className="flex flex-wrap gap-2">
              {businessTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateField("type", type)}
                  className={cn(
                    "border-2 px-4 py-2.5 text-[13.5px] font-bold transition-colors",
                    form.type === type
                      ? "border-brand-500 text-accent-deep"
                      : "border-line-soft text-fg-secondary hover:border-brand-500 hover:text-accent-deep"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-fit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Request the demo"}
          </Button>
        </form>
      )}
    </div>
  );
}
