import Image from "next/image";
import type { CarouselScreen } from "@/components/effects/device-carousel";
import { cn } from "@/lib/utils";

function Shot({
  src,
  alt,
  sizes = "280px",
  fit = "contain",
}: {
  src: string;
  alt: string;
  sizes?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <div className="relative h-full w-full flex-1">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "object-top",
          fit === "cover" ? "object-cover" : "object-contain"
        )}
      />
    </div>
  );
}

/** Real Quickbuk persona dashboards only (Venue Owner, Decorator, Caterer). */
export const quickbukPersonaScreens: CarouselScreen[] = [
  {
    label: "Venue Owner",
    content: (
      <Shot
        src="/screenshots/quickbuk-venue-owner-dashboard.jpg"
        alt="Quickbuk Venue Owner dashboard"
      />
    ),
  },
  {
    label: "Decorator",
    content: (
      <Shot
        src="/screenshots/quickbuk-decorator-dashboard.jpg"
        alt="Quickbuk Decorator dashboard"
      />
    ),
  },
  {
    label: "Caterer",
    content: (
      <Shot
        src="/screenshots/quickbuk-caterer-dashboard.jpg"
        alt="Quickbuk Caterer dashboard"
      />
    ),
  },
];

/** Real Quickbuk partner-platform screens (welcome/sign-in, calendar, payments). */
export const quickbukPartnerScreens: CarouselScreen[] = [
  {
    label: "Partner Platform",
    content: (
      <Shot
        src="/screenshots/quickbuk-partner-welcome.jpg"
        alt="Quickbuk partner platform welcome screen"
      />
    ),
  },
  {
    label: "Calendar",
    content: <Shot src="/screenshots/quickbuk-calendar.jpg" alt="Quickbuk calendar" />,
  },
  {
    label: "Payments",
    content: (
      <Shot src="/screenshots/quickbuk-payments-list.jpg" alt="Quickbuk payments" />
    ),
  },
];

/** Real Invobuk desktop screenshots, used across the hero, showcases and product page. */
export const invobukRealScreens: CarouselScreen[] = [
  {
    label: "Dashboard",
    content: (
      <Shot src="/screenshots/invobuk-dashboard.jpg" alt="Invobuk dashboard" sizes="680px" />
    ),
  },
  {
    label: "Sign In",
    content: <Shot src="/screenshots/invobuk-signin.jpg" alt="Invobuk sign in" sizes="680px" />,
  },
];
