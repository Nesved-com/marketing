"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const topics = ["Quickbuk", "Invobuk", "Pricing", "Support", "Something else"];

const fieldClass =
  "w-full rounded-xl border border-glass-border bg-black/[0.03] px-4 py-3 text-sm text-fg-primary placeholder:text-fg-subtle transition-colors focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/30";

// Web3Forms access key — delivers submissions to contact@nesved.com.
// Same key used by the Nesved marketing site's own contact form.
const WEB3FORMS_KEY = "29ca0629-24ae-487a-b3a8-8515ac4ba09d";

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Quickbuk",
    message: "",
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
          subject: `New Nesved enquiry from ${form.name} (${form.topic})`,
          from_name: form.name,
          email: form.email,
          phone: form.phone,
          topic: form.topic,
          message: form.message,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
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
          <h3 className="text-lg font-semibold text-fg-primary">Message sent</h3>
          <p className="max-w-xs text-sm text-fg-muted">
            Thanks for reaching out — our team will get back to you within one business day.
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
              <label htmlFor="name" className="text-xs font-medium text-fg-muted">
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Aarav Sharma"
                className={fieldClass}
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-medium text-fg-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className={fieldClass}
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-xs font-medium text-fg-muted">
                Phone (optional)
              </label>
              <input
                id="phone"
                name="phone"
                placeholder="+91 00000 00000"
                className={fieldClass}
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="topic" className="text-xs font-medium text-fg-muted">
                I&apos;m interested in
              </label>
              <Select value={form.topic} onValueChange={(value) => updateField("topic", value)}>
                <SelectTrigger id="topic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-medium text-fg-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us a bit about your business and what you need..."
              className={cn(fieldClass, "resize-none")}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-fit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
            <Send className="size-4" />
          </Button>
        </form>
      )}
    </GlassCard>
  );
}
