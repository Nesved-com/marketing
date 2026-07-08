import {
  CalendarCheck,
  ShieldCheck,
  Smartphone,
  Headphones,
  Building2,
  Sparkles,
  WifiOff,
  CloudUpload,
  Zap,
  Users,
} from "lucide-react";
import type { Benefit } from "@/components/sections/benefits";

export const quickbukBenefits: Benefit[] = [
  {
    icon: CalendarCheck,
    title: "Zero double-bookings",
    description: "A single shared calendar keeps every venue, room and team member in sync.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade payment security",
    description: "Collect deposits and final payments with fully secure, PCI-compliant processing.",
  },
  {
    icon: Smartphone,
    title: "Runs anywhere",
    description: "Manage bookings from your phone at the venue or from the office dashboard.",
  },
  {
    icon: Headphones,
    title: "Priority support",
    description: "Real people, fast responses — every plan includes priority support.",
  },
  {
    icon: Building2,
    title: "Built for venues",
    description: "Purpose-built workflows for halls, resorts and event spaces of any size.",
  },
  {
    icon: Sparkles,
    title: "Loved by decorators & caterers",
    description: "Quotes, projects and menus tracked alongside every booking.",
  },
];

export const invobukBenefits: Benefit[] = [
  {
    icon: WifiOff,
    title: "Works completely offline",
    description: "Keep invoicing and managing inventory even without an internet connection.",
  },
  {
    icon: CloudUpload,
    title: "Automatic Google Drive sync",
    description: "Every change backs up automatically the moment you're back online.",
  },
  {
    icon: ShieldCheck,
    title: "Audit-ready reports",
    description: "Export clean financial reports your accountant will actually thank you for.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description: "A native desktop experience that stays fast even with years of data.",
  },
  {
    icon: Building2,
    title: "Multi-branch ready",
    description: "Scale from a single store to multiple branches without switching tools.",
  },
  {
    icon: Users,
    title: "One place for every customer",
    description: "Complete order and payment history for every customer relationship.",
  },
];
