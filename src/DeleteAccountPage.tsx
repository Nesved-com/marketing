import { LegalShell, Section, Body, Intro } from './LegalLayout';

export default function DeleteAccountPage() {
  return (
    <LegalShell
      title="Delete Your Account"
      effectiveDate="17 June 2026"
      description="How to request deletion of your Quickbuk account and associated data, with or without the app installed."
    >
      <Intro>
        Quickbuk (by NesVed) lets you request deletion of your account and associated personal data at any time —
        whether or not you currently have the app installed.
      </Intro>

      <Section>Option 1 — Delete from inside the app</Section>
      <Body>
        Open Quickbuk, go to <strong>Settings → Delete Account</strong>, and confirm. Your account is deactivated
        immediately and permanently deleted after a 30-day grace period.
      </Body>

      <Section>Option 2 — Request deletion without the app</Section>
      <Body>{`Email contact@nesved.com from the email address associated with your Quickbuk account, with the subject line "Delete my Quickbuk account". Include your registered phone number or email so we can locate your account.

We will deactivate your account within 5 business days and permanently delete it after the 30-day grace period described below.`}</Body>

      <Section>What gets deleted</Section>
      <Body>{`• Profile data: name, email, phone number, address — deleted or anonymised within 30 days of your request.
• Venue/vendor business details, services, and photos — deleted within 30 days.
• Push notification (FCM) tokens — deleted immediately on deactivation.
• Location data — never stored; used in real time only, so there is nothing to delete.`}</Body>

      <Section>What is retained, and why</Section>
      <Body>{`Booking and payment records are retained for a minimum of 7 years even after account deletion, as required under the GST Act and Indian tax regulations. This data is retained for legal compliance only and is not used for any other purpose after your account is deleted.`}</Body>

      <Section>Grace period</Section>
      <Body>
        For 30 days after a deletion request, your account is deactivated but not yet erased — during this window
        you can contact us at contact@nesved.com to restore it. After 30 days, deletion is permanent.
      </Body>

      <Section>Contact</Section>
      <Body>{`Email: contact@nesved.com
Website: www.nesved.com
Address: Pune, Maharashtra, India`}</Body>
    </LegalShell>
  );
}
