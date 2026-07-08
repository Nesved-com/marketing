import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Nesved's Terms & Conditions governing use of Quickbuk and Invobuk — bookings, payments, tenant and vendor obligations, and liability.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "1. About Quickbuk",
    body: [
      "Quickbuk is a platform that connects customers with venues for events such as weddings, banquets, lawn parties, rooftop events, resort gatherings, conferences, and more. It provides venue owners (\"Tenants\") and event service businesses (\"Vendors\") with tools to manage bookings, staff, payments, catering, enquiries, and sponsorship. Quickbuk acts as a technology intermediary and does not own, operate, or manage any venue or vendor service listed on the platform.",
    ],
  },
  {
    heading: "2. Eligibility",
    body: [
      "You must be at least 18 years of age to use Quickbuk. By using this app, you represent and warrant that you are 18 or older and have the legal capacity to enter into these Terms.",
    ],
  },
  {
    heading: "3. Account Registration",
    body: [
      "To access certain features, you must register an account. You agree to:\n• Provide accurate and complete information during sign-up.\n• Keep your login credentials confidential.\n• Notify us immediately of any unauthorised access to your account.\n• Accept responsibility for all activity that occurs under your account.",
      "Accounts are role-based: Customer, Tenant (venue owner), Staff, Decorator, or Caterer. Each role has access only to the features and data relevant to that role.",
    ],
  },
  {
    heading: "4. Tenant (Venue Owner) Terms",
    body: [
      "By registering as a Tenant, you agree to:\n• Provide accurate venue details, pricing, and availability.\n• Honour confirmed bookings made through the platform.\n• Maintain appropriate licences and permissions to operate your venue.\n• Ensure your venue complies with all applicable local laws and safety regulations.\n• Provide your GSTIN (GST Identification Number) if you are a GST-registered business. This field is optional but, when filled, it will appear on all booking receipts issued through the platform.\n• Be solely responsible for your refund and cancellation policies communicated to customers.",
      "Quickbuk is not responsible for disputes between Tenants and their customers. By listing on Quickbuk, you grant us a non-exclusive licence to display your venue information within the app.",
    ],
  },
  {
    heading: "5. Vendor (Decorator & Caterer) Terms",
    body: [
      "Vendors are service providers (decorators, caterers, and similar) assigned by Tenants to their service catalogue on Quickbuk. By being assigned as a Vendor, you agree to:\n• Provide accurate service details and pricing to the assigning Tenant.\n• Honour service commitments for confirmed bookings.\n• Maintain all professional licences, FSSAI registration (for caterers), and any other permits applicable to your trade.\n• Provide your GSTIN if you are a GST-registered business. This field is optional but, when filled, it will appear on booking receipts that include your services.\n• Comply with applicable GST filing and invoicing obligations independently — Quickbuk does not file GST on your behalf.",
      "The contractual relationship for vendor services is between the Vendor and the Tenant or customer. Quickbuk is not a party to that agreement.",
    ],
  },
  {
    heading: "6. GST & Tax Compliance",
    body: [
      "Quickbuk provides optional GSTIN fields for Tenants and Vendors to display their GST registration numbers on digital receipts. The platform does not compute, collect, remit, or file Goods and Services Tax on behalf of any user. All tax obligations under the Goods and Services Tax Act, 2017 remain solely with the respective Tenant or Vendor. The GSTIN shown on a receipt is self-declared by the user; Quickbuk does not verify its accuracy or validity. Users are advised to consult a qualified tax professional for compliance guidance.",
    ],
  },
  {
    heading: "7. Bookings",
    body: [
      "All bookings are subject to venue availability and the Tenant's policies. A booking is confirmed once the advance or deposit payment is recorded — either online via Razorpay or as a manual cash entry by the Tenant. Quickbuk generates a digital receipt for every booking as a record of the transaction. Quickbuk is not responsible for disputes, cancellations, or service quality issues between customers and Tenants or Vendors.",
    ],
  },
  {
    heading: "8. Payments",
    body: [
      "Online payments on Quickbuk are processed securely via Razorpay, a Reserve Bank of India (RBI) licensed payment aggregator. By making a payment, you also agree to Razorpay's Terms of Service available at razorpay.com/terms.",
      "• Quickbuk does not store your card number, CVV, net-banking credentials, or UPI PIN.\n• We only store transaction references, amounts, payment method type, and payment status for booking records.\n• Cash payments are recorded manually by the Tenant and are not processed through Razorpay.\n• Quickbuk is not liable for payment failures caused by your bank, card issuer, UPI app, or the Razorpay gateway.\n• If a payment is debited but the booking is not confirmed due to a gateway error, the amount will be automatically reversed by Razorpay within 5–7 business days per their refund policy.",
    ],
  },
  {
    heading: "9. Cancellations & Refunds",
    body: [
      "Cancellation and refund policies are set independently by each Tenant (venue owner). Quickbuk does not enforce a universal refund policy across all venues.",
      "• When a Tenant records a cancellation in Quickbuk, any associated refund amount is recorded in the system.\n• For online payments made via Razorpay: refunds are initiated through Razorpay back to the original payment method. Credits typically appear within 5–7 business days depending on your bank.\n• For cash payments: refunds are handled directly between the customer and the Tenant.\n• Quickbuk is not liable for any Tenant's failure to issue a refund or for delays in processing by Razorpay or your bank.\n• In case of an unresolved refund dispute, you may contact us at contact@nesved.com and we will attempt to mediate in good faith.",
    ],
  },
  {
    heading: "10. Sponsored Listings",
    body: [
      "Venues may pay to appear as sponsored listings in the Explore section. Sponsored placement is paid advertising and does not imply any endorsement, guarantee of quality, or partnership with Quickbuk beyond the advertising arrangement. Sponsorship fees are non-refundable once the campaign period has begun.",
    ],
  },
  {
    heading: "11. User Conduct",
    body: [
      "You agree not to:\n• Use the platform for any unlawful purpose.\n• Submit false, misleading, or fraudulent bookings or enquiries.\n• Interfere with or disrupt the platform's infrastructure.\n• Attempt to gain unauthorised access to other users' accounts or data.\n• Post offensive, abusive, or harmful content.\n• Use the platform to evade tax obligations or engage in financial fraud.",
    ],
  },
  {
    heading: "12. Account Deletion",
    body: [
      "You may request deletion of your account from the app (Settings → Delete Account). Account deletion is a soft-delete: your account is deactivated immediately and permanently deleted after a 30-day grace period, during which you may contact us to restore it. Financial transaction records may be retained beyond 30 days as required under applicable Indian law, including the GST Act and the Information Technology Act 2000.",
    ],
  },
  {
    heading: "13. Intellectual Property",
    body: [
      "All content, branding, logos, UI designs, and software within Quickbuk are the intellectual property of NesVed and its licensors. You may not copy, reproduce, distribute, or create derivative works without our explicit written permission.",
    ],
  },
  {
    heading: "14. Notifications",
    body: [
      "By enabling push notifications, you consent to receive alerts about new enquiries, booking updates, payment confirmations, and promotional offers. You may disable notifications at any time via your device settings.",
    ],
  },
  {
    heading: "15. Limitation of Liability",
    body: [
      "To the maximum extent permitted by applicable law, Quickbuk and NesVed shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of revenue, data, or goodwill, arising from your use of or inability to use the platform. Our aggregate liability for any claim shall not exceed the amount you paid to Quickbuk (if any) in the three months preceding the claim.",
    ],
  },
  {
    heading: "16. Termination",
    body: [
      "We reserve the right to suspend or terminate your account at any time, with or without notice, if you violate these Terms or engage in conduct that we deem harmful to other users or the platform.",
    ],
  },
  {
    heading: "17. Changes to Terms",
    body: [
      "We may update these Terms from time to time. Continued use of the app after any changes constitutes your acceptance of the updated Terms. We encourage you to review this page periodically.",
    ],
  },
  {
    heading: "18. Governing Law & Dispute Resolution",
    body: [
      "These Terms are governed by and construed in accordance with the laws of India, including the Information Technology Act 2000, the Consumer Protection Act 2019, and the Digital Personal Data Protection Act 2023. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra. Before initiating legal proceedings, both parties agree to attempt resolution through good-faith negotiation for at least 30 days.",
    ],
  },
  {
    heading: "19. Contact Us",
    body: [
      "For questions or concerns about these Terms, please contact us at:\nEmail: contact@nesved.com\nWebsite: www.nesved.com\nAddress: Pune, Maharashtra, India",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LegalPage
          eyebrow="Legal"
          title="Terms & Conditions"
          effectiveDate="17 June 2026"
          intro={`Welcome to Quickbuk ("we", "our", "us"), a Venue & Event Operations Platform developed by NesVed. By downloading, installing, or using the Quickbuk mobile application, you agree to be bound by these Terms & Conditions. Please read them carefully before use.`}
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
