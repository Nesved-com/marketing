import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Nesved's Privacy Policy — how we collect, use, store, share and protect your personal information across Quickbuk and Invobuk.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    body: [
      "a) Information You Provide",
      "• Full name, email address, and phone number during registration.\n• Business details (venue name, address, description, photos) for venue owners (Tenants).\n• GSTIN (GST Identification Number) — optional, provided by Tenants and Vendors for display on receipts.\n• UPI ID — optional, provided by Vendors for payment reference display on receipts.\n• Booking and enquiry details including event type, date, guest count, and special requests.\n• Customer address — collected at booking time for event logistics and receipt records.\n• Payment information (processed via Razorpay — we do not store card details, CVV, or UPI PIN).\n• Catering service selections and preferences submitted through bookings.\n• Staff information (name, role, phone) added by venue administrators.",
      "b) Information Collected Automatically",
      "• Device information (device model, operating system version).\n• Location data (with your permission) to show nearby venues on the Explore page.\n• FCM (Firebase Cloud Messaging) tokens for push notifications.\n• Usage data such as pages viewed, searches performed, and banners clicked.\n• Sponsorship analytics: banner impressions, clicks, and venue profile views.",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    body: [
      "• To create and manage your account and profile.\n• To process bookings, payments, and event enquiries.\n• To generate digital receipts and PDF invoices for completed bookings.\n• To display your GSTIN on receipts when provided (Tenants and Vendors).\n• To show nearby venues based on your location (Customers).\n• To send push notifications about bookings, enquiries, payments, and promotions.\n• To display sponsored venue banners in the Explore section.\n• To provide venue owners with analytics on their sponsorship performance.\n• To generate booking and revenue reports for venue administrators.\n• To improve the platform through usage analytics and feedback.\n• To comply with legal obligations under Indian law.",
    ],
  },
  {
    heading: "3. GSTIN & Tax Data",
    body: [
      "GSTIN fields are optional and self-declared by Tenants and Vendors. We collect this data solely for display on booking receipts as a convenience to users who are GST-registered businesses. Quickbuk does not use this data to compute, file, or remit GST on your behalf. GSTIN data is stored securely in our database and is visible on the receipts of bookings associated with your account. We do not share your GSTIN with any third party other than as part of the receipt visible to the customer.",
    ],
  },
  {
    heading: "4. Location Data",
    body: [
      "We request access to your device's location solely to show venues near you on the Explore page. Location is used in real-time and is not continuously tracked or stored on our servers. You may deny location permission and manually browse venues instead. Disabling location will not affect core booking functionality.",
    ],
  },
  {
    heading: "5. Push Notifications",
    body: [
      "We use Firebase Cloud Messaging (FCM) to deliver notifications. Your FCM device token is stored in our database to route relevant alerts to your device. You can opt out of notifications at any time through your device's notification settings. Opting out will not affect your ability to use the app.",
    ],
  },
  {
    heading: "6. Payments & Financial Data",
    body: [
      "All online payment transactions are handled by Razorpay, a PCI-DSS compliant, RBI-licensed payment aggregator. Quickbuk does not store, process, or have access to your full card number, CVV, net-banking credentials, or UPI PIN. We only store:\n• Razorpay order and payment reference IDs.\n• Transaction amount and currency.\n• Payment method type (card/UPI/net-banking/cash).\n• Payment status (pending/paid/refunded).",
      "These records are retained for booking history and legal compliance purposes.",
    ],
  },
  {
    heading: "7. Data Sharing",
    body: [
      "We do not sell your personal data. We may share information only in the following circumstances:\n• Venue owners (Tenants) — to process your booking, enquiry, or event request.\n• Vendors (Decorators, Caterers) — your booking details when their services are included.\n• Razorpay — to process and refund payments.\n• Firebase / Google — for push notifications and usage analytics.\n• Supabase — our backend cloud infrastructure provider for secure data storage and authentication.\n• Law enforcement or regulators — if required by a court order or applicable Indian law.",
      "All third-party service providers are bound by data processing agreements and are prohibited from using your data for their own purposes beyond what is necessary to deliver their service.",
    ],
  },
  {
    heading: "8. Data Retention",
    body: [
      "We retain your personal data for as long as your account is active or as needed to provide our services:\n• Account data: deleted or anonymised within 30 days of account deletion request.\n• Booking and payment records: retained for a minimum of 7 years as required under the GST Act and Indian tax regulations.\n• FCM tokens: deleted when your account is deactivated.\n• Location data: not stored — used in real-time only.",
      "You may request a copy of your retained data at any time by contacting contact@nesved.com.",
    ],
  },
  {
    heading: "9. Data Security",
    body: [
      "We implement industry-standard security measures including:\n• HTTPS/TLS encryption for all data in transit.\n• Row-level security (RLS) policies on our database — each user can only access their own data.\n• Role-based access control for venue staff.\n• Supabase's secure cloud infrastructure hosted in compliant data centres.\n• No storage of full payment credentials (PCI-DSS compliance via Razorpay).",
      "No method of transmission over the internet is 100% secure. We cannot guarantee absolute security but take all reasonable and proportionate steps to protect your data.",
    ],
  },
  {
    heading: "10. Your Rights (DPDP Act 2023)",
    body: [
      "Under the Digital Personal Data Protection Act 2023 and applicable Indian law, you have the right to:\n• Access the personal data we hold about you.\n• Request correction of inaccurate or incomplete data.\n• Request erasure (deletion) of your account and associated personal data.\n• Withdraw consent for location access or push notifications at any time.\n• Know the categories of data we have processed and the purposes of processing.\n• Nominate a representative to exercise these rights on your behalf.\n• Lodge a complaint with the Data Protection Board of India once operational.",
      "To exercise any of these rights, contact us at contact@nesved.com. We will respond within 30 days.",
    ],
  },
  {
    heading: "11. Children's Privacy",
    body: [
      "Quickbuk is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from minors. If we discover that a minor has provided us with personal data, we will delete it promptly.",
    ],
  },
  {
    heading: "12. Third-Party Links",
    body: [
      "The app may contain links to third-party websites or services (e.g., Razorpay, venue websites). We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies separately.",
    ],
  },
  {
    heading: "13. Cookies & Analytics",
    body: [
      "Quickbuk is a mobile application and does not use browser cookies. We use Firebase Analytics to collect anonymised usage data to improve the platform. This data is aggregated and does not identify you personally. You may opt out of analytics tracking through your device's privacy settings (Limit Ad Tracking / Opt out of Ads Personalisation).",
    ],
  },
  {
    heading: "14. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in law, technology, or our services. We will notify you of significant changes via a push notification or an in-app alert. Continued use of the app after changes constitutes your acceptance of the updated policy. The effective date at the top of this page will always reflect the date of the latest revision.",
    ],
  },
  {
    heading: "15. Contact Us",
    body: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out:\nEmail: contact@nesved.com\nWebsite: www.nesved.com\nAddress: Pune, Maharashtra, India",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LegalPage
          eyebrow="Legal"
          title="Privacy Policy"
          effectiveDate="17 June 2026"
          intro={`NesVed ("we", "our", "us") operates the Quickbuk mobile application. This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you use our platform. By using Quickbuk, you agree to the practices described in this policy. This policy is compliant with the Digital Personal Data Protection Act 2023 (DPDP Act), the Information Technology Act 2000, and applicable Indian data protection regulations.`}
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
