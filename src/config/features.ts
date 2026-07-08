import {
  CalendarCheck,
  CalendarDays,
  CreditCard,
  Wallet,
  FileBarChart,
  Users,
  TrendingUp,
  Download,
  Repeat,
  BarChart3,
  Receipt,
  FileText,
  ShoppingCart,
  ClipboardList,
  Boxes,
  Truck,
  Package,
  WifiOff,
  CloudUpload,
  type LucideIcon,
} from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  label: string;
  description?: string;
}

export const quickbukFeatures: FeatureItem[] = [
  { icon: CalendarCheck, label: "Booking Management", description: "Capture and confirm bookings in seconds." },
  { icon: CalendarDays, label: "Calendar", description: "One shared calendar across venues and staff." },
  { icon: CreditCard, label: "Payments", description: "Collect advances and final payments instantly." },
  { icon: Wallet, label: "Expenses", description: "Track every cost against each booking." },
  { icon: FileBarChart, label: "Reports", description: "Daily, weekly and monthly reports, automatically." },
  { icon: Users, label: "Staff", description: "Assign and manage staff across events." },
  { icon: TrendingUp, label: "Profit & Loss", description: "Know your real margin on every booking." },
  { icon: Download, label: "Export", description: "Export clean, audit-ready data anytime." },
  { icon: Repeat, label: "Subscription Management", description: "Manage recurring billing with ease." },
  { icon: BarChart3, label: "Analytics", description: "Spot demand trends before they cost you." },
];

export const invobukFeatures: FeatureItem[] = [
  { icon: Receipt, label: "Invoice", description: "Create and send professional invoices in seconds." },
  { icon: FileText, label: "Quotation", description: "Turn quotes into invoices with one click." },
  { icon: ShoppingCart, label: "Purchase Orders", description: "Track every purchase from order to delivery." },
  { icon: ClipboardList, label: "Sales Orders", description: "Manage sales orders end to end." },
  { icon: Boxes, label: "Inventory", description: "Real-time stock tracking across locations." },
  { icon: Truck, label: "Delivery Challans", description: "Generate delivery challans instantly." },
  { icon: Users, label: "Customers", description: "A complete customer relationship history." },
  { icon: Package, label: "Products", description: "Organize your full product catalog." },
  { icon: FileBarChart, label: "Reports", description: "Financial reports whenever you need them." },
  { icon: WifiOff, label: "Offline Mode", description: "Keep working without an internet connection." },
  { icon: CloudUpload, label: "Google Drive Sync", description: "Automatic backups to your Drive." },
];
