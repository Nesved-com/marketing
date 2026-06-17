import { LegalShell, Section, Body, Intro } from './LegalLayout';

export default function TermsPage() {
  return (
    <LegalShell title="Terms & Conditions" effectiveDate="17 June 2026">
      <Intro>
        Welcome to Quickbuk ("we", "our", "us"), a Venue &amp; Event Operations Platform developed by NesVed.
        By downloading, installing, or using the Quickbuk mobile application, you agree to be bound by these Terms &amp; Conditions.
        Please read them carefully before use.
      </Intro>

      <Section>1. About Quickbuk</Section>
      <Body>
        Quickbuk is a platform that connects customers with venues for events such as weddings, banquets, lawn parties, rooftop events, resort gatherings, conferences, and more.
        It provides venue owners ("Tenants") and event service businesses ("Vendors") with tools to manage bookings, staff, payments, catering, enquiries, and sponsorship.
        Quickbuk acts as a technology intermediary and does not own, operate, or manage any venue or vendor service listed on the platform.
      </Body>

      <Section>2. Eligibility</Section>
      <Body>
        You must be at least 18 years of age to use Quickbuk. By using this app, you represent and warrant that you are 18 or older and have the legal capacity to enter into these Terms.
      </Body>

      <Section>3. Account Registration</Section>
      <Body>{`To access certain features, you must register an account. You agree to:
• Provide accurate and complete information during sign-up.
• Keep your login credentials confidential.
• Notify us immediately of any unauthorised access to your account.
• Accept responsibility for all activity that occurs under your account.

Accounts are role-based: Customer, Tenant (venue owner), Staff, Decorator, or Caterer. Each role has access only to the features and data relevant to that role.`}</Body>

      <Section>4. Tenant (Venue Owner) Terms</Section>
      <Body>{`By registering as a Tenant, you agree to:
• Provide accurate venue details, pricing, and availability.
• Honour confirmed bookings made through the platform.
• Maintain appropriate licences and permissions to operate your venue.
• Ensure your venue complies with all applicable local laws and safety regulations.
• Provide your GSTIN (GST Identification Number) if you are a GST-registered business. This field is optional but, when filled, it will appear on all booking receipts issued through the platform.
• Be solely responsible for your refund and cancellation policies communicated to customers.

Quickbuk is not responsible for disputes between Tenants and their customers. By listing on Quickbuk, you grant us a non-exclusive licence to display your venue information within the app.`}</Body>

      <Section>5. Vendor (Decorator &amp; Caterer) Terms</Section>
      <Body>{`Vendors are service providers (decorators, caterers, and similar) assigned by Tenants to their service catalogue on Quickbuk. By being assigned as a Vendor, you agree to:
• Provide accurate service details and pricing to the assigning Tenant.
• Honour service commitments for confirmed bookings.
• Maintain all professional licences, FSSAI registration (for caterers), and any other permits applicable to your trade.
• Provide your GSTIN if you are a GST-registered business. This field is optional but, when filled, it will appear on booking receipts that include your services.
• Comply with applicable GST filing and invoicing obligations independently — Quickbuk does not file GST on your behalf.

The contractual relationship for vendor services is between the Vendor and the Tenant or customer. Quickbuk is not a party to that agreement.`}</Body>

      <Section>6. GST &amp; Tax Compliance</Section>
      <Body>
        Quickbuk provides optional GSTIN fields for Tenants and Vendors to display their GST registration numbers on digital receipts.
        The platform does not compute, collect, remit, or file Goods and Services Tax on behalf of any user.
        All tax obligations under the Goods and Services Tax Act, 2017 remain solely with the respective Tenant or Vendor.
        The GSTIN shown on a receipt is self-declared by the user; Quickbuk does not verify its accuracy or validity.
        Users are advised to consult a qualified tax professional for compliance guidance.
      </Body>

      <Section>7. Bookings</Section>
      <Body>
        All bookings are subject to venue availability and the Tenant's policies.
        A booking is confirmed once the advance or deposit payment is recorded — either online via Razorpay or as a manual cash entry by the Tenant.
        Quickbuk generates a digital receipt for every booking as a record of the transaction.
        Quickbuk is not responsible for disputes, cancellations, or service quality issues between customers and Tenants or Vendors.
      </Body>

      <Section>8. Payments</Section>
      <Body>{`Online payments on Quickbuk are processed securely via Razorpay, a Reserve Bank of India (RBI) licensed payment aggregator. By making a payment, you also agree to Razorpay's Terms of Service available at razorpay.com/terms.

• Quickbuk does not store your card number, CVV, net-banking credentials, or UPI PIN.
• We only store transaction references, amounts, payment method type, and payment status for booking records.
• Cash payments are recorded manually by the Tenant and are not processed through Razorpay.
• Quickbuk is not liable for payment failures caused by your bank, card issuer, UPI app, or the Razorpay gateway.
• If a payment is debited but the booking is not confirmed due to a gateway error, the amount will be automatically reversed by Razorpay within 5–7 business days per their refund policy.`}</Body>

      <Section>9. Cancellations &amp; Refunds</Section>
      <Body>{`Cancellation and refund policies are set independently by each Tenant (venue owner). Quickbuk does not enforce a universal refund policy across all venues.

• When a Tenant records a cancellation in Quickbuk, any associated refund amount is recorded in the system.
• For online payments made via Razorpay: refunds are initiated through Razorpay back to the original payment method. Credits typically appear within 5–7 business days depending on your bank.
• For cash payments: refunds are handled directly between the customer and the Tenant.
• Quickbuk is not liable for any Tenant's failure to issue a refund or for delays in processing by Razorpay or your bank.
• In case of an unresolved refund dispute, you may contact us at contact@nesved.com and we will attempt to mediate in good faith.`}</Body>

      <Section>10. Sponsored Listings</Section>
      <Body>
        Venues may pay to appear as sponsored listings in the Explore section. Sponsored placement is paid advertising and does not imply any endorsement, guarantee of quality, or partnership with Quickbuk beyond the advertising arrangement.
        Sponsorship fees are non-refundable once the campaign period has begun.
      </Body>

      <Section>11. User Conduct</Section>
      <Body>{`You agree not to:
• Use the platform for any unlawful purpose.
• Submit false, misleading, or fraudulent bookings or enquiries.
• Interfere with or disrupt the platform's infrastructure.
• Attempt to gain unauthorised access to other users' accounts or data.
• Post offensive, abusive, or harmful content.
• Use the platform to evade tax obligations or engage in financial fraud.`}</Body>

      <Section>12. Account Deletion</Section>
      <Body>
        You may request deletion of your account from the app (Settings → Delete Account).
        Account deletion is a soft-delete: your account is deactivated immediately and permanently deleted after a 30-day grace period, during which you may contact us to restore it.
        Financial transaction records may be retained beyond 30 days as required under applicable Indian law, including the GST Act and the Information Technology Act 2000.
      </Body>

      <Section>13. Intellectual Property</Section>
      <Body>
        All content, branding, logos, UI designs, and software within Quickbuk are the intellectual property of NesVed and its licensors.
        You may not copy, reproduce, distribute, or create derivative works without our explicit written permission.
      </Body>

      <Section>14. Notifications</Section>
      <Body>
        By enabling push notifications, you consent to receive alerts about new enquiries, booking updates, payment confirmations, and promotional offers.
        You may disable notifications at any time via your device settings.
      </Body>

      <Section>15. Limitation of Liability</Section>
      <Body>
        To the maximum extent permitted by applicable law, Quickbuk and NesVed shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of revenue, data, or goodwill, arising from your use of or inability to use the platform.
        Our aggregate liability for any claim shall not exceed the amount you paid to Quickbuk (if any) in the three months preceding the claim.
      </Body>

      <Section>16. Termination</Section>
      <Body>
        We reserve the right to suspend or terminate your account at any time, with or without notice, if you violate these Terms or engage in conduct that we deem harmful to other users or the platform.
      </Body>

      <Section>17. Changes to Terms</Section>
      <Body>
        We may update these Terms from time to time. Continued use of the app after any changes constitutes your acceptance of the updated Terms. We encourage you to review this page periodically.
      </Body>

      <Section>18. Governing Law &amp; Dispute Resolution</Section>
      <Body>
        These Terms are governed by and construed in accordance with the laws of India, including the Information Technology Act 2000, the Consumer Protection Act 2019, and the Digital Personal Data Protection Act 2023.
        Any disputes shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra.
        Before initiating legal proceedings, both parties agree to attempt resolution through good-faith negotiation for at least 30 days.
      </Body>

      <Section>19. Contact Us</Section>
      <Body>{`For questions or concerns about these Terms, please contact us at:
Email: contact@nesved.com
Website: www.nesved.com
Address: Pune, Maharashtra, India`}</Body>
    </LegalShell>
  );
}
