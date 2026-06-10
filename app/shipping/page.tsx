import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlashLabel } from "@/components/ui/SlashLabel";

export const metadata: Metadata = {
  title: "Shipping info — Tennex Express",
  description: "Shipping rates, delivery times, and carrier information for Tennex Express orders.",
};

const RATES = [
  { method: "Standard", time: "2–5 business days", price: "$4.99", note: "Free on orders over $75" },
  { method: "Express", time: "1–2 business days", price: "$9.99", note: "Order before 3 PM ET" },
];

const FAQS = [
  {
    q: "When will my order ship?",
    a: "Orders placed before 3 PM ET on a business day ship the same day. Orders after 3 PM or on weekends ship the next business day.",
  },
  {
    q: "Do you ship internationally?",
    a: "Not yet — we currently ship within the continental United States only. We're working on Canada. Sign up to our newsletter to be notified when international shipping launches.",
  },
  {
    q: "Can I change my shipping address after ordering?",
    a: "Email hello@tennexexpress.com as soon as possible. We can update the address if the order hasn't been picked up by the carrier yet. Once it's with the carrier, we can't redirect it.",
  },
  {
    q: "What carrier do you use?",
    a: "We ship via UPS Ground for standard orders and UPS 2nd Day Air for express. You'll get a tracking number by email when your order ships.",
  },
  {
    q: "My tracking shows delivered but I didn't receive it. What do I do?",
    a: "Check with neighbors and any safe-drop spots the carrier might have used. If it's still missing after 24 hours, email us — we'll file a claim and sort it out.",
  },
];

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[780px] mx-auto px-6">
          {/* Header */}
          <div className="py-16 border-b border-hairline">
            <SlashLabel number="001" title="shipping" className="mb-4 block" />
            <h1 className="text-h1 text-ink mb-4">Shipping info</h1>
            <p className="text-[16px] text-muted leading-relaxed">
              All inventory is held in our US warehouse. Most orders leave the same day.
            </p>
          </div>

          {/* Rates */}
          <div className="py-12 border-b border-hairline">
            <SlashLabel number="002" title="rates & times" className="mb-8 block" />
            <div className="flex flex-col gap-3">
              {RATES.map((r) => (
                <div key={r.method} className="flex items-start justify-between gap-6 p-5 rounded-2xl border border-hairline">
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] font-medium text-ink">{r.method}</p>
                    <p className="text-[13px] text-muted">{r.time}</p>
                    <p className="text-[12px] text-muted">{r.note}</p>
                  </div>
                  <p className="text-[16px] font-medium text-ink flex-shrink-0">{r.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="py-12">
            <SlashLabel number="003" title="common questions" className="mb-8 block" />
            <div className="flex flex-col divide-y divide-hairline">
              {FAQS.map((item) => (
                <div key={item.q} className="py-6 flex flex-col gap-2">
                  <p className="text-[15px] font-medium text-ink">{item.q}</p>
                  <p className="text-[15px] text-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
