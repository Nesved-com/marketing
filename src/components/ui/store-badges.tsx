import { PlayCircle, Apple } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoreBadgeProps {
  icon: typeof PlayCircle;
  eyebrow: string;
  label: string;
  href?: string;
}

function StoreBadge({ icon: Icon, eyebrow, label, href }: StoreBadgeProps) {
  const available = Boolean(href);

  const content = (
    <>
      <Icon className="size-6 shrink-0" />
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-fg-subtle">
          {eyebrow}
        </span>
        <span className="text-sm font-semibold text-fg-primary">{label}</span>
      </div>
    </>
  );

  const className = cn(
    "flex items-center gap-2.5 rounded-xl border border-glass-border-strong bg-white/[0.04] px-4 py-2.5 transition-all duration-300",
    available
      ? "hover:-translate-y-0.5 hover:border-brand-400/40 hover:shadow-glow-blue"
      : "cursor-not-allowed opacity-60"
  );

  if (!available) {
    return (
      <span className={className} aria-disabled="true" title="Coming soon">
        {content}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  );
}

/**
 * Google Play / App Store badges. Pass `googlePlayHref` once Quickbuk is
 * published — until then the badge renders as a non-interactive "Coming soon"
 * pill (matching the state of the live nesved.com site).
 */
export function StoreBadges({
  googlePlayHref,
  appStoreHref,
}: {
  googlePlayHref?: string;
  appStoreHref?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <StoreBadge
        icon={PlayCircle}
        eyebrow="Get it on"
        label="Google Play"
        href={googlePlayHref}
      />
      <StoreBadge icon={Apple} eyebrow="Download on the" label="App Store" href={appStoreHref} />
    </div>
  );
}
