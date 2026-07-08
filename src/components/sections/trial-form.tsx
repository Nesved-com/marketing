"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { EASE_OUT_EXPO } from "@/lib/motion";

const fieldClass =
  "w-full rounded-xl border border-glass-border bg-white/[0.03] px-4 py-3 text-sm text-fg-primary placeholder:text-fg-subtle transition-colors focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/30";

// Same Web3Forms integration used by the Nesved marketing site's contact form.
const WEB3FORMS_KEY = "29ca0629-24ae-487a-b3a8-8515ac4ba09d";

type Status = "idle" | "submitting" | "sent" | "error";

const businessTypes = [
  "Venue Owner",
  "Decorator",
  "Caterer",
  "Invobuk (Retail/SME billing)",
  "Other",
];

export function TrialForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: businessTypes[0],
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
          subject: `New free trial signup — ${form.businessName} (${form.businessType})`,
          from_name: form.name,
          email: form.email,
          phone: form.phone,
          business_name: form.businessName,
          business_type: form.businessType,
          message: `Free trial request from ${form.name} at ${form.businessName}, a ${form.businessType}.`,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <GlassCard variant="strong" className="flex flex-col gap-6 p-8">
      {status === "sent" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="flex flex-col items-center gap-3 py-16 text-center"
        >
          <CheckCircle2 className="size-10 text-success" />
          <h3 className="text-lg font-semibold text-fg-primary">You&apos;re on the list</h3>
          <p className="max-w-xs text-sm text-fg-muted">
            Thanks for signing up — our team will reach out within one business day to get you started.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              <AlertCircle className="size-4 shrink-0" />
              Something went wrong — please try again, or email us directly.
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="trial-name" className="text-xs font-medium text-fg-muted">
                Full name
              </label>
              <input
                id="trial-name"
                required
                placeholder="Aarav Sharma"
                className={fieldClass}
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="trial-email" className="text-xs font-medium text-fg-muted">
                Work email
              </label>
              <input
                id="trial-email"
                type="email"
                required
                placeholder="you@business.com"
                className={fieldClass}
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="trial-phone" className="text-xs font-medium text-fg-muted">
                Phone
              </label>
              <input
                id="trial-phone"
                required
                placeholder="+91 00000 00000"
                className={fieldClass}
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="trial-business" className="text-xs font-medium text-fg-muted">
                Business name
              </label>
              <input
                id="trial-business"
                required
                placeholder="Grand Lawns & Banquets"
                className={fieldClass}
                value={form.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="trial-type" className="text-xs font-medium text-fg-muted">
              I am a...
            </label>
            <Select
              value={form.businessType}
              onValueChange={(value) => updateField("businessType", value)}
            >
              <SelectTrigger id="trial-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting..." : "Start Free Trial"}
            <ArrowRight className="size-4" />
          </Button>

          <p className="text-center text-xs text-fg-subtle">
            No credit card required. Cancel anytime.
          </p>
        </form>
      )}
    </GlassCard>
  );
}
