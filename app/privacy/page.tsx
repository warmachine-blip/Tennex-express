import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlashLabel } from "@/components/ui/SlashLabel";

export const metadata: Metadata = {
  title: "Privacy policy — Tennex Express",
  description: "How Tennex Express collects, uses, and protects your personal information.",
};

const SECTIONS = [
  {
    number: "001",
    title: "what we collect",
    body: [
      "When you place an order we collect your name, email address, shipping address, and payment card details. Payment card data is processed by our payment processor (Stripe) and is not stored on our servers.",
      "When you browse the site we collect standard server logs — IP address, browser type, pages visited, and time of visit. We use this data to diagnose issues and improve the site.",
      "If you subscribe to our newsletter we collect your email address and, optionally, your first name.",
    ],
  },
  {
    number: "002",
    title: "how we use it",
    body: [
      "Order data is used to fulfill your purchase, send shipping notifications, and handle returns or support requests.",
      "Email addresses from newsletter sign-ups are used to send promotional emails and product updates. You can unsubscribe at any time via the link in any email we send.",
      "We do not sell, rent, or share your personal information with third parties for their own marketing purposes.",
    ],
  },
  {
    number: "003",
    title: "third-party services",
    body: [
      "We use Stripe for payment processing. Stripe's privacy policy governs their handling of your payment data.",
      "We use UPS for shipping. Your name and address are shared with UPS solely to deliver your order.",
      "We use standard analytics tools (server-side only) to understand aggregate traffic patterns. No third-party tracking pixels or cookies are used.",
    ],
  },
  {
    number: "004",
    title: "data retention",
    body: [
      "Order records are retained for 7 years for accounting and tax purposes.",
      "Newsletter subscriptions are retained until you unsubscribe. After unsubscribing your email is removed from our mailing list within 10 business days.",
    ],
  },
  {
    number: "005",
    title: "your rights",
    body: [
      "You may request a copy of the personal data we hold about you, ask us to correct inaccurate data, or request deletion of your data (subject to our legal retention obligations).",
      "To make a request, email hello@tennexexpress.com with the subject line \"Privacy request\". We will respond within 30 days.",
    ],
  },
  {
    number: "006",
    title: "changes to this policy",
    body: [
      "We may update this policy from time to time. The date of the most recent revision appears at the bottom of this page. Continued use of the site after a change constitutes acceptance of the updated policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="py-16 border-b border-hairline">
            <SlashLabel number="001" title="legal" className="mb-4 block" />
            <h1 className="text-h1 text-ink mb-4">Privacy policy</h1>
            <p className="text-[14px] text-muted">Last updated: May 1, 2026</p>
          </div>

          <div className="py-12 flex flex-col gap-12">
            {SECTIONS.map((section) => (
              <div key={section.number}>
                <SlashLabel number={section.number} title={section.title} className="mb-4 block" />
                <div className="flex flex-col gap-4">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-[15px] text-muted leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
