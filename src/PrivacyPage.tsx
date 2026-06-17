import { LegalShell, Section, SubSection, Body, Intro } from './LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      effectiveDate="17 June 2026"
      description="Read how NesVed collects, uses, and protects your data on the Quickbuk venue, decorator, and caterer booking platform."
    >
      <Intro>
        NesVed ("we", "our", "us") operates the Quickbuk mobile application. This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you use our platform.
        By using Quickbuk, you agree to the practices described in this policy.
        This policy is compliant with the Digital Personal Data Protection Act 2023 (DPDP Act), the Information Technology Act 2000, and applicable Indian data protection regulations.
      </Intro>

      <Section>1. Information We Collect</Section>
      <SubSection>a) Information You Provide</SubSection>
      <Body>{`• Full name, email address, and phone number during registration.
• Business details (venue name, address, description, photos) for venue owners (Tenants).
• GSTIN (GST Identification Number) — optional, provided by Tenants and Vendors for display on receipts.
• UPI ID — optional, provided by Vendors for payment reference display on receipts.
• Booking and enquiry details including event type, date, guest count, and special requests.
• Customer address — collected at booking time for event logistics and receipt records.
• Payment information (processed via Razorpay — we do not store card details, CVV, or UPI PIN).
• Catering service selections and preferences submitted through bookings.
• Staff information (name, role, phone) added by venue administrators.`}</Body>

      <SubSection>b) Information Collected Automatically</SubSection>
      <Body>{`• Device information (device model, operating system version).
• Location data (with your permission) to show nearby venues on the Explore page.
• FCM (Firebase Cloud Messaging) tokens for push notifications.
• Usage data such as pages viewed, searches performed, and banners clicked.
• Sponsorship analytics: banner impressions, clicks, and venue profile views.`}</Body>

      <Section>2. How We Use Your Information</Section>
      <Body>{`• To create and manage your account and profile.
• To process bookings, payments, and event enquiries.
• To generate digital receipts and PDF invoices for completed bookings.
• To display your GSTIN on receipts when provided (Tenants and Vendors).
• To show nearby venues based on your location (Customers).
• To send push notifications about bookings, enquiries, payments, and promotions.
• To display sponsored venue banners in the Explore section.
• To provide venue owners with analytics on their sponsorship performance.
• To generate booking and revenue reports for venue administrators.
• To improve the platform through usage analytics and feedback.
• To comply with legal obligations under Indian law.`}</Body>

      <Section>3. GSTIN &amp; Tax Data</Section>
      <Body>
        GSTIN fields are optional and self-declared by Tenants and Vendors.
        We collect this data solely for display on booking receipts as a convenience to users who are GST-registered businesses.
        Quickbuk does not use this data to compute, file, or remit GST on your behalf.
        GSTIN data is stored securely in our database and is visible on the receipts of bookings associated with your account.
        We do not share your GSTIN with any third party other than as part of the receipt visible to the customer.
      </Body>

      <Section>4. Location Data</Section>
      <Body>
        We request access to your device's location solely to show venues near you on the Explore page.
        Location is used in real-time and is not continuously tracked or stored on our servers.
        You may deny location permission and manually browse venues instead.
        Disabling location will not affect core booking functionality.
      </Body>

      <Section>5. Push Notifications</Section>
      <Body>
        We use Firebase Cloud Messaging (FCM) to deliver notifications. Your FCM device token is stored in our database to route relevant alerts to your device.
        You can opt out of notifications at any time through your device's notification settings. Opting out will not affect your ability to use the app.
      </Body>

      <Section>6. Payments &amp; Financial Data</Section>
      <Body>{`All online payment transactions are handled by Razorpay, a PCI-DSS compliant, RBI-licensed payment aggregator. Quickbuk does not store, process, or have access to your full card number, CVV, net-banking credentials, or UPI PIN. We only store:
• Razorpay order and payment reference IDs.
• Transaction amount and currency.
• Payment method type (card/UPI/net-banking/cash).
• Payment status (pending/paid/refunded).

These records are retained for booking history and legal compliance purposes.`}</Body>

      <Section>7. Data Sharing</Section>
      <Body>{`We do not sell your personal data. We may share information only in the following circumstances:
• Venue owners (Tenants) — to process your booking, enquiry, or event request.
• Vendors (Decorators, Caterers) — your booking details when their services are included.
• Razorpay — to process and refund payments.
• Firebase / Google — for push notifications and usage analytics.
• Supabase — our backend cloud infrastructure provider for secure data storage and authentication.
• Law enforcement or regulators — if required by a court order or applicable Indian law.

All third-party service providers are bound by data processing agreements and are prohibited from using your data for their own purposes beyond what is necessary to deliver their service.`}</Body>

      <Section>8. Data Retention</Section>
      <Body>{`We retain your personal data for as long as your account is active or as needed to provide our services:
• Account data: deleted or anonymised within 30 days of account deletion request.
• Booking and payment records: retained for a minimum of 7 years as required under the GST Act and Indian tax regulations.
• FCM tokens: deleted when your account is deactivated.
• Location data: not stored — used in real-time only.

You may request a copy of your retained data at any time by contacting contact@nesved.com.`}</Body>

      <Section>9. Data Security</Section>
      <Body>{`We implement industry-standard security measures including:
• HTTPS/TLS encryption for all data in transit.
• Row-level security (RLS) policies on our database — each user can only access their own data.
• Role-based access control for venue staff.
• Supabase's secure cloud infrastructure hosted in compliant data centres.
• No storage of full payment credentials (PCI-DSS compliance via Razorpay).

No method of transmission over the internet is 100% secure. We cannot guarantee absolute security but take all reasonable and proportionate steps to protect your data.`}</Body>

      <Section>10. Your Rights (DPDP Act 2023)</Section>
      <Body>{`Under the Digital Personal Data Protection Act 2023 and applicable Indian law, you have the right to:
• Access the personal data we hold about you.
• Request correction of inaccurate or incomplete data.
• Request erasure (deletion) of your account and associated personal data.
• Withdraw consent for location access or push notifications at any time.
• Know the categories of data we have processed and the purposes of processing.
• Nominate a representative to exercise these rights on your behalf.
• Lodge a complaint with the Data Protection Board of India once operational.

To exercise any of these rights, contact us at contact@nesved.com. We will respond within 30 days.`}</Body>

      <Section>11. Children's Privacy</Section>
      <Body>
        Quickbuk is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from minors.
        If we discover that a minor has provided us with personal data, we will delete it promptly.
      </Body>

      <Section>12. Third-Party Links</Section>
      <Body>
        The app may contain links to third-party websites or services (e.g., Razorpay, venue websites).
        We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies separately.
      </Body>

      <Section>13. Cookies &amp; Analytics</Section>
      <Body>
        Quickbuk is a mobile application and does not use browser cookies.
        We use Firebase Analytics to collect anonymised usage data to improve the platform.
        This data is aggregated and does not identify you personally.
        You may opt out of analytics tracking through your device's privacy settings (Limit Ad Tracking / Opt out of Ads Personalisation).
      </Body>

      <Section>14. Changes to This Policy</Section>
      <Body>
        We may update this Privacy Policy from time to time to reflect changes in law, technology, or our services.
        We will notify you of significant changes via a push notification or an in-app alert.
        Continued use of the app after changes constitutes your acceptance of the updated policy.
        The effective date at the top of this page will always reflect the date of the latest revision.
      </Body>

      <Section>15. Contact Us</Section>
      <Body>{`If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out:
Email: contact@nesved.com
Website: www.nesved.com
Address: Pune, Maharashtra, India`}</Body>
    </LegalShell>
  );
}
